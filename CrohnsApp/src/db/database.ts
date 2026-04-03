/**
 * Database initialization and access layer.
 * All reads/writes go through SQLite first (offline-first).
 */

import * as SQLite from 'expo-sqlite';
import { CREATE_TABLES_SQL } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  db = await SQLite.openDatabaseAsync('crohnsapp.db');

  // Enable WAL mode for better concurrent read performance
  await db.execAsync('PRAGMA journal_mode = WAL;');

  // Create all tables
  await db.execAsync(CREATE_TABLES_SQL);

  return db;
}

/**
 * Helper: Insert a row and return the new ID.
 */
export async function insertRow(
  table: string,
  data: Record<string, any>
): Promise<number> {
  const db = await getDatabase();
  const keys = Object.keys(data);
  const placeholders = keys.map(() => '?').join(', ');
  const values = Object.values(data);

  const result = await db.runAsync(
    `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`,
    ...values
  );

  return result.lastInsertRowId;
}

/**
 * Helper: Query rows from a table.
 */
export async function queryRows<T>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const db = await getDatabase();
  return db.getAllAsync<T>(sql, ...params);
}

/**
 * Helper: Get a single row.
 */
export async function queryOne<T>(
  sql: string,
  params: any[] = []
): Promise<T | null> {
  const db = await getDatabase();
  return db.getFirstAsync<T>(sql, ...params);
}

/**
 * Helper: Update rows.
 */
export async function updateRows(
  sql: string,
  params: any[] = []
): Promise<number> {
  const db = await getDatabase();
  const result = await db.runAsync(sql, ...params);
  return result.changes;
}

/**
 * Helper: Delete rows.
 */
export async function deleteRows(
  sql: string,
  params: any[] = []
): Promise<number> {
  const db = await getDatabase();
  const result = await db.runAsync(sql, ...params);
  return result.changes;
}
