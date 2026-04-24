/**
 * Dashboard — Your Crohn's Companion
 *
 * Design philosophy:
 * - Guidance-first, not tracking-first
 * - Valuable with zero logging — tips, tools, knowledge
 * - Weekly check-ins instead of daily pressure
 * - Every section has a clear title + plain-language description
 * - Warm, supportive tone throughout — no guilt
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
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing, type ThemeColors } from '../../src/theme';
import { useAppStore, type DiseaseState } from '../../src/store/useAppStore';
import { getTodaysTip, TIP_CATEGORY_LABELS } from '../../src/data/dailyTips';
import { HeritageDashboard } from '../../src/screens/heritage/HeritageDashboard';

// ─── Disease State Options ────────────────────────────────

const DISEASE_STATES: {
  value: DiseaseState;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: 'remission',
    label: 'Remission',
    description: 'Symptoms are manageable',
    icon: 'sunny-outline',
  },
  {
    value: 'uncertain',
    label: 'Uncertain',
    description: 'Not sure right now',
    icon: 'help-circle-outline',
  },
  {
    value: 'flare',
    label: 'Flare',
    description: 'Active symptoms',
    icon: 'flame-outline',
  },
];

// ─── Preset Goals ─────────────────────────────────────────

const PRESET_GOALS = [
  { text: 'Try 2 new safe recipes', target: 2 },
  { text: 'Scan 5 foods at the grocery store', target: 5 },
  { text: 'Drink 8 cups of water 3 days this week', target: 3 },
  { text: 'Do a 10-minute walk 4 days this week', target: 4 },
  { text: 'Practice breathing exercises 3 times', target: 3 },
  { text: 'Read 2 articles in the Knowledge Hub', target: 2 },
  { text: 'Cook at home 5 days this week', target: 5 },
  { text: 'Get 7+ hours of sleep 5 nights', target: 5 },
];

// ─── Main Screen ──────────────────────────────────────────

export default function DashboardScreen() {
  // Theme gate: Heritage Apothecary preset renders a completely different screen.
  // All other presets fall through to the default dashboard.
  // We delegate to a separate component so hook-ordering stays stable when
  // the user toggles presets at runtime.
  const themePreset = useAppStore((s) => s.themePreset);
  if (themePreset === 'heritage-apothecary') {
    return <HeritageDashboard />;
  }
  return <DefaultDashboard />;
}

function DefaultDashboard() {
  const c = useThemeColors();
  const {
    user,
    weeklyGoal,
    lastCheckin,
    setDiseaseState,
    setWeeklyGoal,
    updateGoalProgress,
    clearWeeklyGoal,
    saveCheckin,
  } = useAppStore();

  const [refreshing, setRefreshing] = useState(false);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const tip = getTodaysTip(user.diseaseState, user.hasResection);
  const tipMeta = TIP_CATEGORY_LABELS[tip.category];
  const s = createStyles(c);

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* ── App Identity & Greeting ── */}
      <View style={s.heroSection}>
        <Text style={[s.greeting, { color: c.text }]}>
          {getGreeting()}{user.name ? `, ${user.name}` : ''}
        </Text>
        <Text style={[s.subtitle, { color: c.textSecondary }]}>
          Your Crohn's Companion
        </Text>
      </View>

      {/* ── Disease State ── */}
      <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
        <Text style={[s.cardTitle, { color: c.text }]}>How are things today?</Text>
        <Text style={[s.cardDescription, { color: c.textSecondary }]}>
          This adjusts all recommendations to match your current state
        </Text>
        <View style={s.stateRow}>
          {DISEASE_STATES.map((ds) => {
            const isActive = user.diseaseState === ds.value;
            const stateColor =
              ds.value === 'remission'
                ? c.safe
                : ds.value === 'flare'
                ? c.danger
                : c.caution;
            return (
              <TouchableOpacity
                key={ds.value}
                style={[
                  s.stateButton,
                  {
                    borderColor: isActive ? stateColor : c.border,
                    backgroundColor: isActive ? stateColor + '15' : 'transparent',
                  },
                ]}
                onPress={() => setDiseaseState(ds.value)}
                accessibilityLabel={`Disease state: ${ds.label} — ${ds.description}`}
                accessibilityRole="button"
              >
                <Ionicons
                  name={ds.icon as any}
                  size={22}
                  color={isActive ? stateColor : c.textTertiary}
                />
                <Text
                  style={[
                    s.stateLabel,
                    { color: isActive ? stateColor : c.textSecondary },
                    isActive && { fontWeight: '600' },
                  ]}
                >
                  {ds.label}
                </Text>
                <Text
                  style={[
                    s.stateDescription,
                    { color: isActive ? stateColor + 'CC' : c.textTertiary },
                  ]}
                >
                  {ds.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── Daily Tip ── */}
      <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
        <View style={s.cardHeader}>
          <Ionicons name="bulb-outline" size={20} color={c.caution} />
          <Text style={[s.cardTitle, { color: c.text, marginBottom: 0 }]}>
            Today's Tip
          </Text>
        </View>
        <Text style={[s.cardDescription, { color: c.textSecondary }]}>
          Personalized to your current state — a new tip every day
        </Text>
        <View style={[s.tipBody, { backgroundColor: c.cautionBackground }]}>
          <Text style={[s.tipTitle, { color: c.text }]}>{tip.title}</Text>
          <Text style={[s.tipText, { color: c.textSecondary }]}>{tip.body}</Text>
          {tip.source && (
            <View style={s.tipSourceRow}>
              <Ionicons name="document-text-outline" size={12} color={c.textTertiary} />
              <Text style={[s.tipSource, { color: c.textTertiary }]}>
                {tip.source}
              </Text>
            </View>
          )}
          <View style={s.tipCategoryRow}>
            <Ionicons
              name={(tipMeta.icon || 'information-circle-outline') as any}
              size={14}
              color={c.textTertiary}
            />
            <Text style={[s.tipCategory, { color: c.textTertiary }]}>
              {tipMeta.label}
            </Text>
          </View>
        </View>
      </View>

      {/* ── Weekly Goal ── */}
      <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
        <View style={s.cardHeader}>
          <Ionicons name="flag-outline" size={20} color={c.primary} />
          <Text style={[s.cardTitle, { color: c.text, marginBottom: 0 }]}>
            Weekly Goal
          </Text>
        </View>
        <Text style={[s.cardDescription, { color: c.textSecondary }]}>
          Set a simple, achievable goal for the week — no pressure
        </Text>

        {weeklyGoal ? (
          <View>
            <Text style={[s.goalText, { color: c.text }]}>{weeklyGoal.text}</Text>
            {/* Progress bar */}
            <View style={s.progressRow}>
              <View
                style={[s.progressBarBg, { backgroundColor: c.inputBackground }]}
              >
                <View
                  style={[
                    s.progressBarFill,
                    {
                      backgroundColor: c.primary,
                      width: `${Math.min(
                        100,
                        (weeklyGoal.progress / weeklyGoal.target) * 100,
                      )}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[s.progressLabel, { color: c.textSecondary }]}>
                {weeklyGoal.progress}/{weeklyGoal.target}
              </Text>
            </View>
            {/* Goal actions */}
            <View style={s.goalActions}>
              {weeklyGoal.progress < weeklyGoal.target && (
                <TouchableOpacity
                  style={[s.goalActionButton, { backgroundColor: c.primary + '15' }]}
                  onPress={() =>
                    updateGoalProgress(
                      Math.min(weeklyGoal.progress + 1, weeklyGoal.target),
                    )
                  }
                  accessibilityLabel="Mark one step complete"
                  accessibilityRole="button"
                >
                  <Ionicons name="add-circle-outline" size={18} color={c.primary} />
                  <Text style={[s.goalActionText, { color: c.primary }]}>
                    +1 Done
                  </Text>
                </TouchableOpacity>
              )}
              {weeklyGoal.progress >= weeklyGoal.target && (
                <View style={[s.goalComplete, { backgroundColor: c.safeBackground }]}>
                  <Ionicons name="checkmark-circle" size={18} color={c.safe} />
                  <Text style={[s.goalActionText, { color: c.safe }]}>
                    Goal complete!
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={clearWeeklyGoal}
                style={s.goalResetButton}
                accessibilityLabel="Clear goal"
                accessibilityRole="button"
              >
                <Text style={[s.goalResetText, { color: c.textTertiary }]}>
                  Change goal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={[s.setGoalButton, { borderColor: c.primary, backgroundColor: c.primary + '08' }]}
            onPress={() => setShowGoalPicker(true)}
            accessibilityLabel="Set a weekly goal"
            accessibilityRole="button"
          >
            <Ionicons name="add-circle-outline" size={22} color={c.primary} />
            <Text style={[s.setGoalText, { color: c.primary }]}>
              Set a goal for this week
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Quick Tools ── */}
      <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
        <Text style={[s.cardTitle, { color: c.text }]}>Tools</Text>
        <Text style={[s.cardDescription, { color: c.textSecondary }]}>
          Quick access to the features that help you the most
        </Text>
        <View style={s.toolsGrid}>
          <ToolCard
            icon="barcode-outline"
            label="Scan Food"
            description="Check if a product is safe for you"
            color={c.primary}
            themeColors={c}
            onPress={() => router.push('/scan')}
          />
          <ToolCard
            icon="restaurant-outline"
            label="Meal Plan"
            description="Recipes filtered to your needs"
            color={c.safe}
            themeColors={c}
            onPress={() => router.push('/meal-plan')}
          />
          <ToolCard
            icon="book-outline"
            label="Learn"
            description="Understand your disease better"
            color={c.caution}
            themeColors={c}
            onPress={() => router.push('/knowledge-hub')}
          />
          <ToolCard
            icon="leaf-outline"
            label="Wellness"
            description="Evidence-rated natural approaches"
            color={c.primary}
            themeColors={c}
            onPress={() => router.push('/dietary-guide')}
          />
        </View>
      </View>

      {/* ── Weekly Check-in ── */}
      <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
        <View style={s.cardHeader}>
          <Ionicons name="chatbox-ellipses-outline" size={20} color={c.safe} />
          <Text style={[s.cardTitle, { color: c.text, marginBottom: 0 }]}>
            Weekly Check-in
          </Text>
        </View>
        <Text style={[s.cardDescription, { color: c.textSecondary }]}>
          Take 2 minutes to reflect on your week — no daily logging required
        </Text>

        {lastCheckin && isThisWeek(lastCheckin.date) ? (
          <View style={[s.checkinDone, { backgroundColor: c.safeBackground }]}>
            <View style={s.checkinDoneHeader}>
              <Ionicons name="checkmark-circle" size={18} color={c.safe} />
              <Text style={[s.checkinDoneLabel, { color: c.safe }]}>
                Checked in this week
              </Text>
            </View>
            <Text style={[s.checkinDoneFeeling, { color: c.text }]}>
              Feeling: {['', 'Rough', 'Tough', 'Okay', 'Good', 'Great'][lastCheckin.feeling]}
            </Text>
            {lastCheckin.notes ? (
              <Text style={[s.checkinDoneNotes, { color: c.textSecondary }]}>
                "{lastCheckin.notes}"
              </Text>
            ) : null}
          </View>
        ) : (
          <TouchableOpacity
            style={[s.checkinButton, { backgroundColor: c.safe + '12' }]}
            onPress={() => setShowCheckin(true)}
            accessibilityLabel="Start weekly check-in"
            accessibilityRole="button"
          >
            <Ionicons name="create-outline" size={20} color={c.safe} />
            <Text style={[s.checkinButtonText, { color: c.safe }]}>
              How was your week?
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Supportive Footer ── */}
      <View style={s.footer}>
        <Text style={[s.footerText, { color: c.textTertiary }]}>
          This app is here when you need it — not to add to your to-do list.{'\n'}
          Use it your way, at your pace.
        </Text>
      </View>

      <View style={{ height: 40 }} />

      {/* ── Goal Picker Modal ── */}
      <GoalPickerModal
        visible={showGoalPicker}
        onClose={() => setShowGoalPicker(false)}
        onSelect={(text, target) => {
          setWeeklyGoal(text, target);
          setShowGoalPicker(false);
        }}
        themeColors={c}
      />

      {/* ── Check-in Modal ── */}
      <CheckinModal
        visible={showCheckin}
        onClose={() => setShowCheckin(false)}
        onSave={(feeling, notes) => {
          saveCheckin(feeling, notes);
          setShowCheckin(false);
        }}
        themeColors={c}
      />
    </ScrollView>
  );
}

// ─── Tool Card ────────────────────────────────────────────

function ToolCard({
  icon,
  label,
  description,
  color,
  themeColors: c,
  onPress,
}: {
  icon: string;
  label: string;
  description: string;
  color: string;
  themeColors: ThemeColors;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[toolStyles.card, { backgroundColor: color + '0A' }]}
      onPress={onPress}
      accessibilityLabel={`${label}: ${description}`}
      accessibilityRole="button"
    >
      <Ionicons name={icon as any} size={28} color={color} />
      <Text style={[toolStyles.label, { color: c.text }]}>{label}</Text>
      <Text style={[toolStyles.description, { color: c.textTertiary }]}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const toolStyles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: sizing.radiusMedium,
    padding: spacing.md,
    marginBottom: spacing.sm,
    minHeight: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: sizing.fontXs,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 16,
  },
});

// ─── Goal Picker Modal ───────────────────────────────────

function GoalPickerModal({
  visible,
  onClose,
  onSelect,
  themeColors: c,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (text: string, target: number) => void;
  themeColors: ThemeColors;
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={modalStyles.overlay}>
        <View
          style={[
            modalStyles.sheet,
            { backgroundColor: c.card, borderColor: c.border },
          ]}
        >
          <View style={modalStyles.header}>
            <Text style={[modalStyles.title, { color: c.text }]}>
              Pick a goal for this week
            </Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close">
              <Ionicons name="close" size={24} color={c.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={[modalStyles.subtitle, { color: c.textSecondary }]}>
            Choose one that feels achievable — small wins matter
          </Text>
          <ScrollView style={modalStyles.list}>
            {PRESET_GOALS.map((goal, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  modalStyles.goalOption,
                  { borderColor: c.border, backgroundColor: c.inputBackground },
                ]}
                onPress={() => onSelect(goal.text, goal.target)}
                accessibilityLabel={goal.text}
                accessibilityRole="button"
              >
                <Text style={[modalStyles.goalOptionText, { color: c.text }]}>
                  {goal.text}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={c.textTertiary} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ─── Check-in Modal ───────────────────────────────────────

const CHECKIN_FEELINGS = [
  { value: 1, label: 'Rough', emoji: '😣', description: 'A hard week' },
  { value: 2, label: 'Tough', emoji: '😞', description: 'Had some struggles' },
  { value: 3, label: 'Okay', emoji: '😐', description: 'Getting by' },
  { value: 4, label: 'Good', emoji: '🙂', description: 'Mostly positive' },
  { value: 5, label: 'Great', emoji: '😊', description: 'Feeling strong' },
];

function CheckinModal({
  visible,
  onClose,
  onSave,
  themeColors: c,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (feeling: number, notes: string) => void;
  themeColors: ThemeColors;
}) {
  const [feeling, setFeeling] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (feeling === null) return;
    onSave(feeling, notes.trim());
    setFeeling(null);
    setNotes('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={modalStyles.overlay}>
        <View
          style={[
            modalStyles.sheet,
            { backgroundColor: c.card, borderColor: c.border },
          ]}
        >
          <View style={modalStyles.header}>
            <Text style={[modalStyles.title, { color: c.text }]}>
              Weekly Check-in
            </Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close">
              <Ionicons name="close" size={24} color={c.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={[modalStyles.subtitle, { color: c.textSecondary }]}>
            How was your week overall? There are no wrong answers.
          </Text>

          <View style={modalStyles.feelingRow}>
            {CHECKIN_FEELINGS.map((f) => (
              <TouchableOpacity
                key={f.value}
                style={[
                  modalStyles.feelingButton,
                  {
                    borderColor: feeling === f.value ? c.primary : 'transparent',
                    backgroundColor:
                      feeling === f.value ? c.primary + '15' : 'transparent',
                  },
                ]}
                onPress={() => setFeeling(f.value)}
                accessibilityLabel={`${f.label}: ${f.description}`}
                accessibilityRole="button"
              >
                <Text style={modalStyles.feelingEmoji}>{f.emoji}</Text>
                <Text
                  style={[
                    modalStyles.feelingLabel,
                    {
                      color: feeling === f.value ? c.primary : c.textSecondary,
                      fontWeight: feeling === f.value ? '600' : '400',
                    },
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={[
              modalStyles.notesInput,
              {
                backgroundColor: c.inputBackground,
                borderColor: c.inputBorder,
                color: c.text,
              },
            ]}
            placeholder="Anything you want to note? (optional)"
            placeholderTextColor={c.placeholder}
            value={notes}
            onChangeText={setNotes}
            multiline
            maxLength={300}
          />

          <TouchableOpacity
            style={[
              modalStyles.saveButton,
              {
                backgroundColor: feeling !== null ? c.primary : c.disabled,
              },
            ]}
            onPress={handleSave}
            disabled={feeling === null}
            accessibilityLabel="Save check-in"
            accessibilityRole="button"
          >
            <Text style={modalStyles.saveButtonText}>Save Check-in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Helpers ──────────────────────────────────────────────

function isThisWeek(dateStr: string): boolean {
  const checkinDate = new Date(dateStr);
  const now = new Date();
  // Get Monday of current week
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - day + (day === 0 ? -6 : 1));
  monday.setHours(0, 0, 0, 0);
  return checkinDate >= monday;
}

// ─── Shared Modal Styles ──────────────────────────────────

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: sizing.radiusLarge,
    borderTopRightRadius: sizing.radiusLarge,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: sizing.fontXl,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: sizing.fontSm,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  list: {
    maxHeight: 400,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginBottom: spacing.sm,
    minHeight: sizing.tapTargetLarge,
  },
  goalOptionText: {
    fontSize: sizing.fontBase,
    flex: 1,
    marginRight: spacing.sm,
  },
  feelingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  feelingButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginHorizontal: 2,
    borderRadius: sizing.radiusMedium,
    borderWidth: 2,
    minHeight: sizing.tapTargetLarge,
    justifyContent: 'center',
  },
  feelingEmoji: {
    fontSize: 28,
  },
  feelingLabel: {
    fontSize: sizing.fontXs,
    marginTop: 4,
  },
  notesInput: {
    borderWidth: 1,
    borderRadius: sizing.radiusMedium,
    padding: spacing.md,
    fontSize: sizing.fontBase,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: spacing.lg,
  },
  saveButton: {
    paddingVertical: spacing.md,
    borderRadius: sizing.radiusMedium,
    alignItems: 'center',
    minHeight: sizing.tapTargetLarge,
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: sizing.fontBase,
    fontWeight: '600',
  },
});

// ─── Main Styles ──────────────────────────────────────────

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background,
    },
    content: {
      padding: spacing.md,
    },

    // Hero
    heroSection: {
      marginTop: spacing.sm,
      marginBottom: spacing.md,
    },
    greeting: {
      fontSize: sizing.fontHeading,
      fontWeight: '700',
    },
    subtitle: {
      fontSize: sizing.fontBase,
      marginTop: 2,
    },

    // Cards
    card: {
      borderRadius: sizing.radiusLarge,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.xs,
    },
    cardTitle: {
      fontSize: sizing.fontLg,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    cardDescription: {
      fontSize: sizing.fontSm,
      lineHeight: 20,
      marginBottom: spacing.md,
    },

    // Disease state
    stateRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    stateButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xs,
      borderRadius: sizing.radiusMedium,
      borderWidth: 2,
      minHeight: sizing.tapTargetLarge + 16,
      justifyContent: 'center',
    },
    stateLabel: {
      fontSize: sizing.fontSm,
      marginTop: 6,
    },
    stateDescription: {
      fontSize: 11,
      marginTop: 2,
      textAlign: 'center',
    },

    // Daily tip
    tipBody: {
      borderRadius: sizing.radiusMedium,
      padding: spacing.md,
    },
    tipTitle: {
      fontSize: sizing.fontBase,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    tipText: {
      fontSize: sizing.fontSm,
      lineHeight: 22,
    },
    tipSourceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: spacing.sm,
    },
    tipSource: {
      fontSize: sizing.fontXs,
      fontStyle: 'italic',
    },
    tipCategoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: spacing.xs,
    },
    tipCategory: {
      fontSize: sizing.fontXs,
    },

    // Weekly goal
    goalText: {
      fontSize: sizing.fontBase,
      fontWeight: '500',
      marginBottom: spacing.sm,
    },
    progressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    progressBarBg: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 4,
    },
    progressLabel: {
      fontSize: sizing.fontSm,
      fontWeight: '600',
      minWidth: 30,
      textAlign: 'right',
    },
    goalActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.md,
      gap: spacing.md,
    },
    goalActionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: sizing.radiusMedium,
      minHeight: sizing.tapTarget,
    },
    goalActionText: {
      fontSize: sizing.fontSm,
      fontWeight: '600',
    },
    goalComplete: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: sizing.radiusMedium,
    },
    goalResetButton: {
      paddingVertical: spacing.sm,
    },
    goalResetText: {
      fontSize: sizing.fontSm,
    },
    setGoalButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.md,
      borderRadius: sizing.radiusMedium,
      borderWidth: 1,
      borderStyle: 'dashed',
      minHeight: sizing.tapTargetLarge,
    },
    setGoalText: {
      fontSize: sizing.fontBase,
      fontWeight: '500',
    },

    // Tools grid
    toolsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    // Check-in
    checkinButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.md,
      borderRadius: sizing.radiusMedium,
      minHeight: sizing.tapTargetLarge,
    },
    checkinButtonText: {
      fontSize: sizing.fontBase,
      fontWeight: '500',
    },
    checkinDone: {
      borderRadius: sizing.radiusMedium,
      padding: spacing.md,
    },
    checkinDoneHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: spacing.xs,
    },
    checkinDoneLabel: {
      fontSize: sizing.fontSm,
      fontWeight: '600',
    },
    checkinDoneFeeling: {
      fontSize: sizing.fontBase,
      fontWeight: '500',
    },
    checkinDoneNotes: {
      fontSize: sizing.fontSm,
      marginTop: 4,
      fontStyle: 'italic',
      lineHeight: 20,
    },

    // Footer
    footer: {
      alignItems: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    footerText: {
      fontSize: sizing.fontSm,
      textAlign: 'center',
      lineHeight: 22,
    },
  });
}
