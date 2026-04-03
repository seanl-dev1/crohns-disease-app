/**
 * Dashboard — the home screen.
 *
 * Design principles applied:
 * - Morning check-in: "How are you feeling?" (one tap)
 * - Disease state toggle (flare/remission/uncertain)
 * - Today's summary at a glance
 * - No guilt — compassionate tone
 * - Large tap targets for fatigued users
 */

import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing } from '../../src/theme';
import { useAppStore, type DiseaseState } from '../../src/store/useAppStore';

// Feeling options — one tap to check in
const FEELINGS = [
  { value: 1, label: 'Terrible', emoji: '😣' },
  { value: 2, label: 'Bad', emoji: '😞' },
  { value: 3, label: 'Okay', emoji: '😐' },
  { value: 4, label: 'Good', emoji: '🙂' },
  { value: 5, label: 'Great', emoji: '😊' },
];

const DISEASE_STATES: { value: DiseaseState; label: string; icon: string }[] = [
  { value: 'remission', label: 'Remission', icon: 'sunny-outline' },
  { value: 'uncertain', label: 'Uncertain', icon: 'help-circle-outline' },
  { value: 'flare', label: 'Flare', icon: 'flame-outline' },
];

export default function DashboardScreen() {
  const c = useThemeColors();
  const { user, today, setDiseaseState, setToday } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  const feelingColors = [
    c.feelingTerrible,
    c.feelingBad,
    c.feelingOkay,
    c.feelingGood,
    c.feelingGreat,
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: Refresh today's summary from database
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const handleFeeling = (value: number) => {
    setToday({ feeling: value });
    // TODO: Save to database
  };

  const handleDiseaseState = (state: DiseaseState) => {
    setDiseaseState(state);
    // TODO: Save to database
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const styles = createStyles(c);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Greeting */}
      <Text style={styles.greeting}>
        {getGreeting()}{user.name ? `, ${user.name}` : ''} 👋
      </Text>

      {/* Check-in Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How are you feeling?</Text>
        <View style={styles.feelingRow}>
          {FEELINGS.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[
                styles.feelingButton,
                today.feeling === f.value && {
                  backgroundColor: feelingColors[f.value - 1] + '20',
                  borderColor: feelingColors[f.value - 1],
                },
              ]}
              onPress={() => handleFeeling(f.value)}
              accessibilityLabel={`Feeling ${f.label}`}
              accessibilityRole="button"
            >
              <Text style={styles.feelingEmoji}>{f.emoji}</Text>
              <Text
                style={[
                  styles.feelingLabel,
                  today.feeling === f.value && {
                    color: feelingColors[f.value - 1],
                    fontWeight: '600',
                  },
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Disease State Toggle */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current state</Text>
        <View style={styles.stateRow}>
          {DISEASE_STATES.map((s) => {
            const isActive = user.diseaseState === s.value;
            const stateColor =
              s.value === 'remission'
                ? c.safe
                : s.value === 'flare'
                ? c.danger
                : c.caution;
            return (
              <TouchableOpacity
                key={s.value}
                style={[
                  styles.stateButton,
                  isActive && {
                    backgroundColor: stateColor + '15',
                    borderColor: stateColor,
                  },
                ]}
                onPress={() => handleDiseaseState(s.value)}
                accessibilityLabel={`Disease state: ${s.label}`}
                accessibilityRole="button"
              >
                <Ionicons
                  name={s.icon as any}
                  size={24}
                  color={isActive ? stateColor : c.textTertiary}
                />
                <Text
                  style={[
                    styles.stateLabel,
                    isActive && { color: stateColor, fontWeight: '600' },
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Today's Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today&apos;s summary</Text>
        <View style={styles.summaryGrid}>
          <SummaryItem
            icon="restaurant-outline"
            label="Meals"
            value={`${today.mealsLogged}`}
            color={c.primary}
            themeColors={c}
          />
          <SummaryItem
            icon="pulse-outline"
            label="Symptoms"
            value={`${today.symptomsLogged}`}
            color={c.caution}
            themeColors={c}
          />
          <SummaryItem
            icon="medical-outline"
            label="Meds"
            value={
              today.medicationsTotal > 0
                ? `${today.medicationsTaken}/${today.medicationsTotal}`
                : '—'
            }
            color={c.safe}
            themeColors={c}
          />
          <SummaryItem
            icon="water-outline"
            label="Water"
            value={today.waterMl > 0 ? `${Math.round(today.waterMl / 250)} cups` : '—'}
            color={c.primary}
            themeColors={c}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick actions</Text>
        <View style={styles.actionsRow}>
          <QuickAction
            icon="barcode-outline"
            label="Scan Food"
            color={c.primary}
            themeColors={c}
            onPress={() => router.push('/scan')}
          />
          <QuickAction
            icon="fitness-outline"
            label="Log Symptom"
            color={c.caution}
            themeColors={c}
            onPress={() => {
              // TODO: Navigate to symptom tracker
            }}
          />
          <QuickAction
            icon="water-outline"
            label="Log Water"
            color={c.primary}
            themeColors={c}
            onPress={() => {
              // TODO: Quick water log
            }}
          />
        </View>
      </View>

      {/* Compassionate empty state */}
      {today.mealsLogged === 0 && today.symptomsLogged === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No entries yet today — and that&apos;s okay.{'\n'}
            Log whenever you&apos;re ready. No pressure.
          </Text>
        </View>
      )}

      {/* Bottom padding for scroll */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// --- Sub-components ---

function SummaryItem({
  icon,
  label,
  value,
  color,
  themeColors: c,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
  themeColors: any;
}) {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
    }}>
      <Ionicons name={icon as any} size={22} color={color} />
      <Text style={{
        fontSize: sizing.fontLg,
        fontWeight: '700',
        color: c.text,
        marginTop: 4,
      }}>
        {value}
      </Text>
      <Text style={{
        fontSize: sizing.fontSm,
        color: c.textSecondary,
        marginTop: 2,
      }}>
        {label}
      </Text>
    </View>
  );
}

function QuickAction({
  icon,
  label,
  color,
  themeColors: c,
  onPress,
}: {
  icon: string;
  label: string;
  color: string;
  themeColors: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.md,
        marginHorizontal: spacing.xs,
        backgroundColor: color + '10',
        borderRadius: sizing.radiusMedium,
        minHeight: sizing.tapTargetLarge,
        justifyContent: 'center',
      }}
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Ionicons name={icon as any} size={28} color={color} />
      <Text style={{
        fontSize: sizing.fontSm,
        color: color,
        marginTop: 4,
        fontWeight: '500',
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// --- Styles ---

function createStyles(c: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background,
    },
    content: {
      padding: spacing.md,
    },
    greeting: {
      fontSize: sizing.fontXxl,
      fontWeight: '700',
      color: c.text,
      marginBottom: spacing.md,
      marginTop: spacing.sm,
    },
    card: {
      backgroundColor: c.card,
      borderRadius: sizing.radiusLarge,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: c.border,
    },
    cardTitle: {
      fontSize: sizing.fontBase,
      fontWeight: '600',
      color: c.textSecondary,
      marginBottom: spacing.md,
    },
    feelingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    feelingButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
      marginHorizontal: 2,
      borderRadius: sizing.radiusMedium,
      borderWidth: 2,
      borderColor: 'transparent',
      minHeight: sizing.tapTargetLarge,
      justifyContent: 'center',
    },
    feelingEmoji: {
      fontSize: 28,
    },
    feelingLabel: {
      fontSize: sizing.fontXs,
      color: c.textSecondary,
      marginTop: 4,
    },
    stateRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    stateButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderRadius: sizing.radiusMedium,
      borderWidth: 2,
      borderColor: 'transparent',
      minHeight: sizing.tapTargetLarge,
      justifyContent: 'center',
    },
    stateLabel: {
      fontSize: sizing.fontSm,
      color: c.textSecondary,
      marginTop: 4,
    },
    summaryGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
    emptyText: {
      fontSize: sizing.fontBase,
      color: c.textTertiary,
      textAlign: 'center',
      lineHeight: 24,
    },
  });
}
