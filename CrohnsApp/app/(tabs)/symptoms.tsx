/**
 * Symptom Tracker screen — Log symptoms, view today's entries, track patterns.
 *
 * Design:
 * - Today's symptom entries in reverse chronological order
 * - Each entry shows feeling, Bristol scale, pain, symptom tags
 * - FAB for quick logging
 * - Compassionate empty state
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
import {
  SymptomLogModal,
  type SymptomLogData,
} from '../../src/components/SymptomLogModal';
import { type SymptomEntry, BRISTOL_SCALE } from '../../src/types/symptoms';

const FEELING_EMOJIS = ['', '😣', '😞', '😐', '🙂', '😊'];
const FEELING_LABELS = ['', 'Terrible', 'Bad', 'Okay', 'Good', 'Great'];

function getTodayDateRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

function formatTime(timestamp: string): string {
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function SymptomsScreen() {
  const c = useThemeColors();
  const { setToday } = useAppStore();

  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loadEntries = useCallback(async () => {
    try {
      const { start, end } = getTodayDateRange();
      const rows = await queryRows<SymptomEntry>(
        'SELECT * FROM symptom_entries WHERE timestamp >= ? AND timestamp < ? ORDER BY timestamp DESC',
        [start, end]
      );
      setEntries(rows);
      setToday({ symptomsLogged: rows.length });
    } catch (err) {
      console.error('Failed to load symptom entries:', err);
    }
  }, [setToday]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadEntries();
    setRefreshing(false);
  }, [loadEntries]);

  const handleSave = async (data: SymptomLogData) => {
    try {
      const now = new Date().toISOString();
      await insertRow('symptom_entries', {
        timestamp: now,
        overall_feeling: data.overall_feeling,
        bristol_scale: data.bristol_scale ?? null,
        bowel_movement_count: data.bowel_movement_count ?? null,
        pain_level: data.pain_level ?? null,
        energy_level: data.energy_level ?? null,
        symptoms: data.symptoms ? JSON.stringify(data.symptoms) : null,
        notes: data.notes ?? null,
      });
      setShowModal(false);
      await loadEntries();
    } catch (err) {
      console.error('Failed to save symptom entry:', err);
      Alert.alert('Error', 'Could not save your symptoms. Please try again.');
    }
  };

  const handleDelete = (entry: SymptomEntry) => {
    Alert.alert(
      'Delete Entry',
      'Remove this symptom log?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRows('DELETE FROM symptom_entries WHERE id = ?', [
                entry.id,
              ]);
              await loadEntries();
            } catch (err) {
              console.error('Failed to delete symptom entry:', err);
            }
          },
        },
      ]
    );
  };

  const s = createStyles(c);
  const feelingColors = [
    '',
    c.feelingTerrible,
    c.feelingBad,
    c.feelingOkay,
    c.feelingGood,
    c.feelingGreat,
  ];

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      {entries.length === 0 ? (
        <View style={s.emptyState}>
          <Ionicons name="pulse-outline" size={64} color={c.textTertiary} />
          <Text style={[s.emptyTitle, { color: c.text }]}>Symptom Tracker</Text>
          <Text style={[s.emptySubtitle, { color: c.textSecondary }]}>
            Log symptoms to find patterns and track your health over time.
          </Text>
          <TouchableOpacity
            style={[s.emptyButton, { backgroundColor: c.caution }]}
            onPress={() => setShowModal(true)}
            accessibilityLabel="Log symptoms"
            accessibilityRole="button"
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={s.emptyButtonText}>Log Symptoms</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={s.listContent}
          renderItem={({ item: entry }) => (
            <SymptomEntryCard
              entry={entry}
              onDelete={() => handleDelete(entry)}
              themeColors={c}
              feelingColors={feelingColors}
            />
          )}
          ListFooterComponent={
            <View style={s.footer}>
              <Text style={[s.footerText, { color: c.textTertiary }]}>
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'} today
              </Text>
            </View>
          }
        />
      )}

      {/* FAB */}
      {entries.length > 0 && (
        <TouchableOpacity
          style={[s.fab, { backgroundColor: c.caution }]}
          onPress={() => setShowModal(true)}
          accessibilityLabel="Log symptoms"
          accessibilityRole="button"
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Symptom Log Modal */}
      <SymptomLogModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </View>
  );
}

// --- Symptom Entry Card ---

function SymptomEntryCard({
  entry,
  onDelete,
  themeColors: c,
  feelingColors,
}: {
  entry: SymptomEntry;
  onDelete: () => void;
  themeColors: ThemeColors;
  feelingColors: string[];
}) {
  const feelingColor = feelingColors[entry.overall_feeling] || c.textSecondary;
  const parsedSymptoms: string[] = entry.symptoms
    ? JSON.parse(entry.symptoms)
    : [];

  const bristolInfo = entry.bristol_scale
    ? BRISTOL_SCALE.find((b) => b.value === entry.bristol_scale)
    : null;

  return (
    <TouchableOpacity
      style={[
        cardStyles.container,
        { backgroundColor: c.card, borderColor: c.border },
      ]}
      onLongPress={onDelete}
      accessibilityLabel={`Symptom log at ${formatTime(entry.timestamp)}`}
      accessibilityHint="Long press to delete"
      accessibilityRole="button"
    >
      {/* Header: feeling + time */}
      <View style={cardStyles.header}>
        <View style={cardStyles.feelingRow}>
          <Text style={cardStyles.emoji}>
            {FEELING_EMOJIS[entry.overall_feeling]}
          </Text>
          <Text style={[cardStyles.feelingText, { color: feelingColor }]}>
            {FEELING_LABELS[entry.overall_feeling]}
          </Text>
        </View>
        <Text style={[cardStyles.time, { color: c.textTertiary }]}>
          {formatTime(entry.timestamp)}
        </Text>
      </View>

      {/* Metrics row */}
      <View style={cardStyles.metricsRow}>
        {bristolInfo && (
          <View style={[cardStyles.metric, { backgroundColor: c.inputBackground }]}>
            <Text style={[cardStyles.metricLabel, { color: c.textTertiary }]}>
              Stool
            </Text>
            <Text style={[cardStyles.metricValue, { color: c.text }]}>
              {bristolInfo.emoji} {bristolInfo.label}
            </Text>
          </View>
        )}
        {entry.pain_level != null && (
          <View style={[cardStyles.metric, { backgroundColor: c.inputBackground }]}>
            <Text style={[cardStyles.metricLabel, { color: c.textTertiary }]}>
              Pain
            </Text>
            <Text style={[cardStyles.metricValue, { color: c.text }]}>
              {entry.pain_level}/10
            </Text>
          </View>
        )}
        {entry.bowel_movement_count != null && (
          <View style={[cardStyles.metric, { backgroundColor: c.inputBackground }]}>
            <Text style={[cardStyles.metricLabel, { color: c.textTertiary }]}>
              BMs
            </Text>
            <Text style={[cardStyles.metricValue, { color: c.text }]}>
              {entry.bowel_movement_count}
            </Text>
          </View>
        )}
        {entry.energy_level != null && (
          <View style={[cardStyles.metric, { backgroundColor: c.inputBackground }]}>
            <Text style={[cardStyles.metricLabel, { color: c.textTertiary }]}>
              Energy
            </Text>
            <Text style={[cardStyles.metricValue, { color: c.text }]}>
              {entry.energy_level}/5
            </Text>
          </View>
        )}
      </View>

      {/* Symptom chips */}
      {parsedSymptoms.length > 0 && (
        <View style={cardStyles.symptomsRow}>
          {parsedSymptoms.map((s) => (
            <View
              key={s}
              style={[
                cardStyles.symptomChip,
                { backgroundColor: c.cautionBackground },
              ]}
            >
              <Text style={[cardStyles.symptomChipText, { color: c.caution }]}>
                {s}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Notes */}
      {entry.notes ? (
        <Text
          style={[cardStyles.notes, { color: c.textSecondary }]}
          numberOfLines={2}
        >
          {entry.notes}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    borderRadius: sizing.radiusLarge,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feelingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  emoji: {
    fontSize: 24,
  },
  feelingText: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
  },
  time: {
    fontSize: sizing.fontSm,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    flexWrap: 'wrap',
  },
  metric: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: sizing.radiusSmall,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: sizing.fontXs,
  },
  metricValue: {
    fontSize: sizing.fontSm,
    fontWeight: '600',
    marginTop: 2,
  },
  symptomsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  symptomChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: sizing.radiusRound,
  },
  symptomChipText: {
    fontSize: sizing.fontXs,
    fontWeight: '500',
  },
  notes: {
    fontSize: sizing.fontSm,
    marginTop: spacing.md,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

// --- Main Styles ---

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    listContent: {
      padding: spacing.md,
      paddingBottom: 100,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: spacing.lg,
    },
    footerText: {
      fontSize: sizing.fontSm,
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
