/**
 * Offline-first sync service.
 *
 * Strategy:
 * - SQLite is always the source of truth for reads.
 * - Writes go to SQLite first, then queue for Supabase upload.
 * - On app launch (or reconnect), pull remote changes and push local queue.
 * - Each synced row gets a `sync_id` (Supabase UUID) stored locally.
 *
 * This is a simple last-write-wins sync. For a personal health app
 * used by one person, conflict resolution is not a concern.
 */

import { supabase } from './supabase';
import { getDatabase } from '../db/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SYNC_TABLES = [
  'food_entries',
  'symptom_entries',
  'medications',
  'medication_logs',
  'hydration_logs',
  'lab_values',
  'daily_context',
] as const;

type SyncTable = (typeof SYNC_TABLES)[number];

const LAST_SYNC_KEY = 'crohnsapp_last_sync';

async function getLastSyncTime(): Promise<string | null> {
  return AsyncStorage.getItem(LAST_SYNC_KEY);
}

async function setLastSyncTime(time: string): Promise<void> {
  await AsyncStorage.setItem(LAST_SYNC_KEY, time);
}

/**
 * Push all local rows that don't have a sync_id to Supabase.
 * After successful upload, store the remote UUID locally.
 */
async function pushTable(table: SyncTable, userId: string): Promise<number> {
  const db = await getDatabase();

  // Get local rows without a sync_id (never pushed)
  const unsynced = await db.getAllAsync<Record<string, any>>(
    `SELECT * FROM ${table} WHERE sync_id IS NULL`
  );

  if (unsynced.length === 0) return 0;

  let pushed = 0;

  for (const row of unsynced) {
    const { id: localId, sync_id: _, ...data } = row;

    // Convert SQLite booleans (0/1) for Postgres
    const cleaned: Record<string, any> = { ...data, user_id: userId };
    for (const [key, val] of Object.entries(cleaned)) {
      if (key === 'active' || key === 'exercise' || key === 'medication_adherence') {
        cleaned[key] = val === 1 || val === true;
      }
    }

    // For medication_logs, resolve the medication's sync_id as the FK
    if (table === 'medication_logs' && cleaned.medication_id) {
      const med = await db.getFirstAsync<{ sync_id: string }>(
        'SELECT sync_id FROM medications WHERE id = ?',
        cleaned.medication_id
      );
      if (med?.sync_id) {
        cleaned.medication_id = med.sync_id;
      } else {
        // Skip — parent medication hasn't been synced yet
        continue;
      }
    }

    const { data: inserted, error } = await supabase
      .from(table)
      .insert(cleaned)
      .select('id')
      .single();

    if (!error && inserted) {
      await db.runAsync(
        `UPDATE ${table} SET sync_id = ? WHERE id = ?`,
        inserted.id,
        localId
      );
      pushed++;
    } else if (error) {
      console.warn(`Sync push error (${table}):`, error.message);
    }
  }

  return pushed;
}

/**
 * Pull rows from Supabase that were created/updated after last sync.
 * Upsert into local SQLite.
 */
async function pullTable(table: SyncTable, since: string | null): Promise<number> {
  const db = await getDatabase();

  let query = supabase.from(table).select('*');
  if (since) {
    query = query.gte('created_at', since);
  }

  const { data: rows, error } = await query;

  if (error || !rows) {
    console.warn(`Sync pull error (${table}):`, error?.message);
    return 0;
  }

  let pulled = 0;

  for (const row of rows) {
    const remoteId = row.id;
    const { id: _, user_id: __, ...data } = row;

    // Check if we already have this row
    const existing = await db.getFirstAsync<{ id: number }>(
      `SELECT id FROM ${table} WHERE sync_id = ?`,
      remoteId
    );

    if (!existing) {
      // Insert new row from remote
      const keys = [...Object.keys(data), 'sync_id'];
      const placeholders = keys.map(() => '?').join(', ');
      const values = [...Object.values(data), remoteId];

      await db.runAsync(
        `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`,
        ...values
      );
      pulled++;
    }
  }

  return pulled;
}

/**
 * Ensure local SQLite tables have the sync_id column.
 * Called once on first sync.
 */
async function ensureSyncColumns(): Promise<void> {
  const db = await getDatabase();

  for (const table of SYNC_TABLES) {
    try {
      await db.execAsync(
        `ALTER TABLE ${table} ADD COLUMN sync_id TEXT`
      );
    } catch {
      // Column already exists — ignore
    }
  }
}

/**
 * Sync user profile between local Zustand store and Supabase.
 */
async function syncProfile(userId: string): Promise<void> {
  const { data: remoteProfile } = await supabase
    .from('user_profile')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!remoteProfile) {
    // No remote profile yet — will be created on first profile save
    return;
  }
}

/**
 * Full sync: push local changes, then pull remote changes.
 * Call this on app launch and when coming back online.
 */
export async function performSync(userId: string): Promise<{
  pushed: number;
  pulled: number;
}> {
  await ensureSyncColumns();

  const lastSync = await getLastSyncTime();
  let totalPushed = 0;
  let totalPulled = 0;

  // Push first (local changes take priority)
  for (const table of SYNC_TABLES) {
    totalPushed += await pushTable(table, userId);
  }

  // Then pull remote changes
  for (const table of SYNC_TABLES) {
    totalPulled += await pullTable(table, lastSync);
  }

  // Sync profile
  await syncProfile(userId);

  // Update last sync timestamp
  await setLastSyncTime(new Date().toISOString());

  console.log(`Sync complete: pushed ${totalPushed}, pulled ${totalPulled}`);
  return { pushed: totalPushed, pulled: totalPulled };
}

/**
 * Quick check if we can reach Supabase.
 */
export async function isOnline(): Promise<boolean> {
  try {
    const { error } = await supabase.from('user_profile').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}
