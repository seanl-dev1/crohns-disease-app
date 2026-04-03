/**
 * Food Diary screen — Log meals, view today's entries, browse history.
 *
 * Design:
 * - Today's meals grouped by meal type (Breakfast → Dinner → Snack)
 * - One-tap "Log Meal" FAB
 * - Empty state is compassionate, not guilt-inducing
 * - Entries show food name, time, optional nutrition summary
 * - Pull-to-refresh
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
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing, type ThemeColors } from '../../src/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { insertRow, queryRows, deleteRows } from '../../src/db/database';
import { MealLogModal, type MealLogData } from '../../src/components/MealLogModal';
import { MEAL_TYPES, type FoodEntry, type MealType } from '../../src/types/food';

// Group entries by meal type in display order
const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

interface MealGroup {
  mealType: MealType;
  label: string;
  icon: string;
  entries: FoodEntry[];
}

function groupByMealType(entries: FoodEntry[]): MealGroup[] {
  const groups: MealGroup[] = [];
  for (const mt of MEAL_ORDER) {
    const matching = entries.filter((e) => e.meal_type === mt);
    if (matching.length > 0) {
      const info = MEAL_TYPES.find((m) => m.value === mt)!;
      groups.push({
        mealType: mt,
        label: info.label,
        icon: info.icon,
        entries: matching,
      });
    }
  }
  return groups;
}

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

export default function FoodScreen() {
  const c = useThemeColors();
  const { setToday } = useAppStore();

  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loadEntries = useCallback(async () => {
    try {
      const { start, end } = getTodayDateRange();
      const rows = await queryRows<FoodEntry>(
        'SELECT * FROM food_entries WHERE timestamp >= ? AND timestamp < ? ORDER BY timestamp DESC',
        [start, end]
      );
      setEntries(rows);
      // Update dashboard summary
      setToday({ mealsLogged: rows.length });
    } catch (err) {
      console.error('Failed to load food entries:', err);
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

  const handleSave = async (data: MealLogData) => {
    try {
      const now = new Date().toISOString();
      await insertRow('food_entries', {
        timestamp: now,
        meal_type: data.meal_type,
        food_name: data.food_name,
        serving_size: data.serving_size ?? null,
        calories: data.calories ?? null,
        protein_g: data.protein_g ?? null,
        fat_g: data.fat_g ?? null,
        carbs_g: data.carbs_g ?? null,
        fiber_g: data.fiber_g ?? null,
        notes: data.notes ?? null,
      });
      setShowModal(false);
      await loadEntries();
    } catch (err) {
      console.error('Failed to save food entry:', err);
      Alert.alert('Error', 'Could not save your meal. Please try again.');
    }
  };

  const handleDelete = (entry: FoodEntry) => {
    Alert.alert(
      'Delete Entry',
      `Remove "${entry.food_name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRows('DELETE FROM food_entries WHERE id = ?', [entry.id]);
              await loadEntries();
            } catch (err) {
              console.error('Failed to delete food entry:', err);
            }
          },
        },
      ]
    );
  };

  const groups = groupByMealType(entries);
  const s = createStyles(c);

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      {entries.length === 0 ? (
        <View style={s.emptyState}>
          <Ionicons name="restaurant-outline" size={64} color={c.textTertiary} />
          <Text style={[s.emptyTitle, { color: c.text }]}>Food Diary</Text>
          <Text style={[s.emptySubtitle, { color: c.textSecondary }]}>
            Track what you eat to discover patterns.{'\n'}
            Just the food name is enough to start.
          </Text>
          <TouchableOpacity
            style={[s.emptyButton, { backgroundColor: c.primary }]}
            onPress={() => router.push('/scan')}
            accessibilityLabel="Scan a barcode"
            accessibilityRole="button"
          >
            <Ionicons name="barcode-outline" size={24} color="#FFFFFF" />
            <Text style={s.emptyButtonText}>Scan Barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.emptyButton, { backgroundColor: c.safe, marginTop: spacing.md }]}
            onPress={() => setShowModal(true)}
            accessibilityLabel="Log your first meal"
            accessibilityRole="button"
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={s.emptyButtonText}>Log a Meal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.mealType}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={s.listContent}
          renderItem={({ item: group }) => (
            <View style={[s.mealGroup, { backgroundColor: c.card, borderColor: c.border }]}>
              {/* Meal type header */}
              <View style={s.mealHeader}>
                <Ionicons name={group.icon as any} size={20} color={c.primary} />
                <Text style={[s.mealHeaderText, { color: c.text }]}>
                  {group.label}
                </Text>
                <Text style={[s.mealCount, { color: c.textTertiary }]}>
                  {group.entries.length} {group.entries.length === 1 ? 'item' : 'items'}
                </Text>
              </View>

              {/* Entries */}
              {group.entries.map((entry, idx) => (
                <FoodEntryRow
                  key={entry.id}
                  entry={entry}
                  isLast={idx === group.entries.length - 1}
                  onDelete={() => handleDelete(entry)}
                  themeColors={c}
                />
              ))}
            </View>
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

      {/* Floating Action Buttons */}
      {entries.length > 0 && (
        <>
          <TouchableOpacity
            style={[s.fab, s.fabScan, { backgroundColor: c.primary }]}
            onPress={() => router.push('/scan')}
            accessibilityLabel="Scan barcode"
            accessibilityRole="button"
          >
            <Ionicons name="barcode-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.fab, { backgroundColor: c.safe }]}
            onPress={() => setShowModal(true)}
            accessibilityLabel="Log a meal"
            accessibilityRole="button"
          >
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </>
      )}

      {/* Meal Log Modal */}
      <MealLogModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </View>
  );
}

// --- Food Entry Row ---

function FoodEntryRow({
  entry,
  isLast,
  onDelete,
  themeColors: c,
}: {
  entry: FoodEntry;
  isLast: boolean;
  onDelete: () => void;
  themeColors: ThemeColors;
}) {
  const hasNutrition = entry.calories != null;

  return (
    <TouchableOpacity
      style={[
        rowStyles.container,
        !isLast && { borderBottomWidth: 1, borderBottomColor: c.divider },
      ]}
      onLongPress={onDelete}
      accessibilityLabel={`${entry.food_name}, logged at ${formatTime(entry.timestamp)}`}
      accessibilityHint="Long press to delete"
      accessibilityRole="button"
    >
      <View style={rowStyles.main}>
        <Text style={[rowStyles.foodName, { color: c.text }]} numberOfLines={1}>
          {entry.food_name}
        </Text>
        <View style={rowStyles.details}>
          <Text style={[rowStyles.time, { color: c.textTertiary }]}>
            {formatTime(entry.timestamp)}
          </Text>
          {entry.serving_size ? (
            <Text style={[rowStyles.serving, { color: c.textTertiary }]}>
              {' · '}{entry.serving_size}
            </Text>
          ) : null}
        </View>
      </View>

      {hasNutrition && (
        <View style={rowStyles.nutrition}>
          <Text style={[rowStyles.nutritionText, { color: c.textSecondary }]}>
            {entry.calories} cal
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const rowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: sizing.tapTarget,
  },
  main: {
    flex: 1,
  },
  foodName: {
    fontSize: sizing.fontBase,
    fontWeight: '500',
  },
  details: {
    flexDirection: 'row',
    marginTop: 2,
  },
  time: {
    fontSize: sizing.fontSm,
  },
  serving: {
    fontSize: sizing.fontSm,
  },
  nutrition: {
    marginLeft: spacing.md,
  },
  nutritionText: {
    fontSize: sizing.fontSm,
    fontWeight: '500',
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
      paddingBottom: 100, // Room for FAB
    },
    mealGroup: {
      borderRadius: sizing.radiusLarge,
      borderWidth: 1,
      marginBottom: spacing.md,
      overflow: 'hidden',
    },
    mealHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      gap: spacing.sm,
    },
    mealHeaderText: {
      fontSize: sizing.fontBase,
      fontWeight: '600',
      flex: 1,
    },
    mealCount: {
      fontSize: sizing.fontSm,
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
    fabScan: {
      bottom: 90,
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
