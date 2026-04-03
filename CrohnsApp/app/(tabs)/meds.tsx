/**
 * Medications screen — List active meds, log taken/skipped, add new.
 *
 * Design:
 * - Active medications as cards with one-tap "Take" / "Skip" buttons
 * - Today's adherence summary at top
 * - FAB to add new medication
 * - Long-press to edit/delete
 */

import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, spacing, sizing, type ThemeColors } from '../../src/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { insertRow, queryRows, deleteRows } from '../../src/db/database';
import { AddMedModal, type AddMedData } from '../../src/components/AddMedModal';
import { type Medication, type MedicationLog } from '../../src/types/medications';

function getTodayDateRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

export default function MedsScreen() {
  const c = useThemeColors();
  const { setToday } = useAppStore();

  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayLogs, setTodayLogs] = useState<MedicationLog[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const meds = await queryRows<Medication>(
        'SELECT * FROM medications WHERE active = 1 ORDER BY name ASC'
      );
      setMedications(meds);

      const { start, end } = getTodayDateRange();
      const logs = await queryRows<MedicationLog>(
        'SELECT * FROM medication_logs WHERE timestamp >= ? AND timestamp < ?',
        [start, end]
      );
      setTodayLogs(logs);

      // Update dashboard
      const taken = logs.filter((l) => l.status === 'taken').length;
      setToday({ medicationsTaken: taken, medicationsTotal: meds.length });
    } catch (err) {
      console.error('Failed to load medications:', err);
    }
  }, [setToday]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleAddMed = async (data: AddMedData) => {
    try {
      await insertRow('medications', {
        name: data.name,
        dosage: data.dosage ?? null,
        frequency: data.frequency ?? null,
        time_of_day: data.time_of_day ?? null,
        category: data.category ?? null,
        active: 1,
      });
      setShowAddModal(false);
      await loadData();
    } catch (err) {
      console.error('Failed to add medication:', err);
      Alert.alert('Error', 'Could not save medication. Please try again.');
    }
  };

  const handleLogMed = async (
    med: Medication,
    status: 'taken' | 'skipped'
  ) => {
    try {
      await insertRow('medication_logs', {
        medication_id: med.id,
        timestamp: new Date().toISOString(),
        status,
      });
      await loadData();
    } catch (err) {
      console.error('Failed to log medication:', err);
    }
  };

  const handleDeleteMed = (med: Medication) => {
    Alert.alert(
      'Remove Medication',
      `Stop tracking "${med.name}"? Your history will be preserved.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              // Soft delete — mark inactive
              const { updateRows } = await import('../../src/db/database');
              await updateRows(
                'UPDATE medications SET active = 0 WHERE id = ?',
                [med.id]
              );
              await loadData();
            } catch (err) {
              console.error('Failed to remove medication:', err);
            }
          },
        },
      ]
    );
  };

  const getLogStatus = (medId: number): string | null => {
    const log = todayLogs.find((l) => l.medication_id === medId);
    return log ? log.status : null;
  };

  const takenCount = todayLogs.filter((l) => l.status === 'taken').length;
  const s = createStyles(c);

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      {medications.length === 0 ? (
        <View style={s.emptyState}>
          <Ionicons name="medical-outline" size={64} color={c.textTertiary} />
          <Text style={[s.emptyTitle, { color: c.text }]}>Medications</Text>
          <Text style={[s.emptySubtitle, { color: c.textSecondary }]}>
            Track your medications and never miss a dose.
          </Text>
          <TouchableOpacity
            style={[s.emptyButton, { backgroundColor: c.safe }]}
            onPress={() => setShowAddModal(true)}
            accessibilityLabel="Add medication"
            accessibilityRole="button"
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={s.emptyButtonText}>Add Medication</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={s.listContent}
          ListHeaderComponent={
            <View style={[s.summaryCard, { backgroundColor: c.card, borderColor: c.border }]}>
              <Ionicons name="checkmark-circle-outline" size={24} color={c.safe} />
              <Text style={[s.summaryText, { color: c.text }]}>
                {takenCount} of {medications.length} taken today
              </Text>
            </View>
          }
          renderItem={({ item: med }) => (
            <MedCard
              med={med}
              logStatus={getLogStatus(med.id)}
              onTake={() => handleLogMed(med, 'taken')}
              onSkip={() => handleLogMed(med, 'skipped')}
              onDelete={() => handleDeleteMed(med)}
              themeColors={c}
            />
          )}
        />
      )}

      {/* FAB */}
      {medications.length > 0 && (
        <TouchableOpacity
          style={[s.fab, { backgroundColor: c.safe }]}
          onPress={() => setShowAddModal(true)}
          accessibilityLabel="Add medication"
          accessibilityRole="button"
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      <AddMedModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddMed}
      />
    </View>
  );
}

// --- Med Card ---

function MedCard({
  med,
  logStatus,
  onTake,
  onSkip,
  onDelete,
  themeColors: c,
}: {
  med: Medication;
  logStatus: string | null;
  onTake: () => void;
  onSkip: () => void;
  onDelete: () => void;
  themeColors: ThemeColors;
}) {
  const isTaken = logStatus === 'taken';
  const isSkipped = logStatus === 'skipped';
  const isLogged = isTaken || isSkipped;

  return (
    <TouchableOpacity
      style={[
        medStyles.card,
        {
          backgroundColor: c.card,
          borderColor: isTaken ? c.safe : isSkipped ? c.textTertiary : c.border,
          opacity: isSkipped ? 0.6 : 1,
        },
      ]}
      onLongPress={onDelete}
      accessibilityLabel={`${med.name}${med.dosage ? `, ${med.dosage}` : ''}`}
      accessibilityHint="Long press to remove"
      accessibilityRole="button"
    >
      {/* Info */}
      <View style={medStyles.info}>
        <View style={medStyles.nameRow}>
          {isTaken && (
            <Ionicons name="checkmark-circle" size={20} color={c.safe} />
          )}
          {isSkipped && (
            <Ionicons name="close-circle" size={20} color={c.textTertiary} />
          )}
          <Text
            style={[
              medStyles.name,
              { color: c.text },
              isSkipped && { textDecorationLine: 'line-through' },
            ]}
            numberOfLines={1}
          >
            {med.name}
          </Text>
        </View>
        <View style={medStyles.details}>
          {med.dosage ? (
            <Text style={[medStyles.detail, { color: c.textSecondary }]}>
              {med.dosage}
            </Text>
          ) : null}
          {med.category ? (
            <Text style={[medStyles.detail, { color: c.textTertiary }]}>
              {med.dosage ? ' · ' : ''}
              {med.category}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Action buttons */}
      {!isLogged ? (
        <View style={medStyles.actions}>
          <TouchableOpacity
            style={[medStyles.actionButton, { backgroundColor: c.safe + '15' }]}
            onPress={onTake}
            accessibilityLabel={`Mark ${med.name} as taken`}
            accessibilityRole="button"
          >
            <Ionicons name="checkmark" size={22} color={c.safe} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[medStyles.actionButton, { backgroundColor: c.inputBackground }]}
            onPress={onSkip}
            accessibilityLabel={`Skip ${med.name}`}
            accessibilityRole="button"
          >
            <Ionicons name="close" size={22} color={c.textTertiary} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={medStyles.statusBadge}>
          <Text
            style={[
              medStyles.statusText,
              { color: isTaken ? c.safe : c.textTertiary },
            ]}
          >
            {isTaken ? 'Taken' : 'Skipped'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const medStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizing.radiusLarge,
    borderWidth: 1.5,
    padding: spacing.md,
    marginBottom: spacing.md,
    minHeight: sizing.tapTargetLarge,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
  },
  details: {
    flexDirection: 'row',
    marginTop: 2,
  },
  detail: {
    fontSize: sizing.fontSm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginLeft: spacing.md,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    marginLeft: spacing.md,
  },
  statusText: {
    fontSize: sizing.fontSm,
    fontWeight: '600',
  },
});

// --- Main Styles ---

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1 },
    listContent: {
      padding: spacing.md,
      paddingBottom: 100,
    },
    summaryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.md,
      borderRadius: sizing.radiusLarge,
      borderWidth: 1,
      marginBottom: spacing.md,
    },
    summaryText: {
      fontSize: sizing.fontBase,
      fontWeight: '600',
    },
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    emptyTitle: {
      fontSize: sizing.fontXl,
      fontWeight: '700',
      marginTop: spacing.md,
    },
    emptySubtitle: {
      fontSize: sizing.fontBase,
      textAlign: 'center',
      marginTop: spacing.sm,
      lineHeight: 24,
    },
    emptyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.lg,
      gap: spacing.sm,
      minHeight: sizing.tapTargetLarge,
    },
    emptyButtonText: {
      color: '#FFFFFF',
      fontSize: sizing.fontBase,
      fontWeight: '600',
    },
  });
}
