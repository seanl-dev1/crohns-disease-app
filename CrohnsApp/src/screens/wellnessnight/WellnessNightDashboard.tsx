/**
 * WellnessNightDashboard — premium-cinematic dark rendering of the Dashboard.
 *
 * Visual spec: `public/designs/index.html` -> section `.d2` -> Phone 1.
 *
 * Real wiring (no mock data):
 *   - Greeting + day label come from the local clock + user.name
 *   - State-line "Currently" pulls user.diseaseState (toggle by tap)
 *   - Weekly card shows weeklyGoal progress + days-left
 *   - Quick-action grid routes to /food, /symptoms, /scan
 *   - Tonight's note pulls from getTodaysTip(state, hasResection)
 *   - Disease-state toggle opens an inline picker sheet
 */

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useAppStore, type DiseaseState } from '../../store/useAppStore';
import { getTodaysTip } from '../../data/dailyTips';
import {
  WELLNESS_NIGHT_COLORS,
  WELLNESS_NIGHT_FONTS,
} from '../../components/wellnessnight/fonts';
import { HeroSerif } from '../../components/wellnessnight/HeroSerif';
import { StatCard } from '../../components/wellnessnight/StatCard';
import { CandleGlow } from '../../components/wellnessnight/CandleGlow';
import { WarmSandLabel } from '../../components/wellnessnight/WarmSandLabel';
import { NightButton } from '../../components/wellnessnight/NightButton';

const DISEASE_STATE_LABELS: Record<DiseaseState, string> = {
  remission: 'Remission',
  uncertain: 'Holding steady',
  flare: 'Active flare',
};

const PRESET_GOALS = [
  { text: 'Try 2 new safe recipes', target: 2 },
  { text: 'Scan 5 foods at the grocery store', target: 5 },
  { text: 'Drink 8 cups of water 3 days this week', target: 3 },
  { text: 'Do a 10-minute walk 4 days this week', target: 4 },
  { text: 'Practice breathing exercises 3 times', target: 3 },
  { text: 'Read 2 articles in the Knowledge Hub', target: 2 },
];

// ─── Helpers ──────────────────────────────────────────────

function getPartOfDay(): 'morning' | 'afternoon' | 'evening' {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

function getDayLabel(): string {
  const today = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
  const month = today.toLocaleDateString('en-US', { month: 'long' });
  const day = today.getDate();
  return `${weekday} \u00b7 ${month} ${day}`;
}

function daysSinceCheckin(iso?: string): number | null {
  if (!iso) return null;
  const ms = 24 * 60 * 60 * 1000;
  const diff = (new Date().getTime() - new Date(iso).getTime()) / ms;
  return Math.max(0, Math.round(diff));
}

function dotColor(state: DiseaseState): string {
  if (state === 'flare') return WELLNESS_NIGHT_COLORS.warnText;
  if (state === 'uncertain') return WELLNESS_NIGHT_COLORS.amber;
  return WELLNESS_NIGHT_COLORS.sage;
}

function isSameWeek(iso: string): boolean {
  const d = new Date(iso);
  const n = new Date();
  const ms = 24 * 60 * 60 * 1000;
  const diff = Math.abs((n.getTime() - d.getTime()) / ms);
  return diff < 7 && d.getDay() <= n.getDay();
}

// ─── Main Screen ──────────────────────────────────────────

export function WellnessNightDashboard() {
  const {
    user,
    weeklyGoal,
    lastCheckin,
    today,
    setDiseaseState,
    setWeeklyGoal,
    updateGoalProgress,
    clearWeeklyGoal,
    saveCheckin,
  } = useAppStore();

  const [showStatePicker, setShowStatePicker] = useState(false);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);

  const partOfDay = getPartOfDay();
  const dayLabel = getDayLabel();
  const tip = getTodaysTip(user.diseaseState, user.hasResection);

  // Weekly numbers — pulled from real store fields with sensible defaults.
  const logsThisWeek = weeklyGoal?.progress ?? 0;
  const weekTarget = weeklyGoal?.target ?? 25;
  const progressPct = Math.min(100, Math.round((logsThisWeek / weekTarget) * 100));
  const daysLeft = Math.max(0, 7 - new Date().getDay());

  // Currently — copy adapts to the active state.
  const sinceDays = daysSinceCheckin(lastCheckin?.date);
  const stateSince =
    user.diseaseState === 'remission'
      ? sinceDays != null
        ? `${DISEASE_STATE_LABELS.remission}, ${sinceDays} days`
        : DISEASE_STATE_LABELS.remission
      : DISEASE_STATE_LABELS[user.diseaseState];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Eyebrow + greeting hero ── */}
      <Text style={styles.eyebrow}>{dayLabel}</Text>
      <HeroSerif
        leading={`Good ${partOfDay}, `}
        accent={user.name ? user.name : 'friend'}
        trailing={'.'}
        size={32}
        align="left"
      />
      <Text style={styles.sub}>A quiet window for how you&apos;re feeling today.</Text>

      {/* ── State line ── */}
      <TouchableOpacity
        onPress={() => setShowStatePicker(true)}
        accessibilityRole="button"
        accessibilityLabel="Update how you feel today"
        style={styles.stateLine}
      >
        <View style={{ flex: 1 }}>
          <WarmSandLabel
            color={WELLNESS_NIGHT_COLORS.textFaint}
            size={10.5}
            tracking={1.4}
            align="left"
            style={{ marginBottom: 4 }}
          >
            Currently
          </WarmSandLabel>
          <View style={styles.stateRow}>
            <View
              style={[
                styles.stateDot,
                { backgroundColor: dotColor(user.diseaseState) },
              ]}
            />
            <Text style={styles.stateValue}>{stateSince}</Text>
          </View>
        </View>
        <Text style={styles.stateChevron}>{'\u203A'}</Text>
      </TouchableOpacity>

      {/* ── This week, in rhythm ── */}
      <StatCard>
        <Text style={styles.cardTitle}>This week, in rhythm</Text>
        <Text style={styles.cardSub}>
          {weeklyGoal
            ? `${logsThisWeek} of ${weekTarget} steps logged toward your aim.`
            : 'Set an aim to see this week shape itself.'}
        </Text>
        <View style={styles.bar}>
          <View
            style={[
              styles.barFill,
              { width: `${weeklyGoal ? progressPct : 0}%` },
            ]}
          />
        </View>
        <View style={styles.barMeta}>
          <Text style={styles.barMetaText}>
            {weeklyGoal ? `${progressPct}% to goal` : 'No aim set yet'}
          </Text>
          <Text style={styles.barMetaText}>
            {`${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left`}
          </Text>
        </View>
        {!weeklyGoal ? (
          <View style={{ marginTop: 14 }}>
            <NightButton
              label="Set this week's aim"
              variant="primary"
              onPress={() => setShowGoalPicker(true)}
              fullWidth
            />
          </View>
        ) : weeklyGoal.progress < weeklyGoal.target ? (
          <View style={styles.goalBtnRow}>
            <NightButton
              label="Mark a step"
              variant="primary"
              onPress={() =>
                updateGoalProgress(Math.min(weeklyGoal.progress + 1, weeklyGoal.target))
              }
              style={{ flex: 1 }}
            />
            <NightButton
              label="Revise"
              variant="ghost"
              onPress={clearWeeklyGoal}
              style={{ flex: 1 }}
            />
          </View>
        ) : (
          <Text style={styles.goalDone}>{'\u2713 aim complete'}</Text>
        )}
      </StatCard>

      {/* ── Quick actions ── */}
      <View style={styles.quickGrid}>
        <QuickAction
          glyph={'\u{1F33E}'}
          label="Log food"
          onPress={() => router.push('/food')}
        />
        <QuickAction
          glyph={'\u2665'}
          label="Symptom"
          onPress={() => router.push('/symptoms')}
        />
        <QuickAction
          glyph={'\u2723'}
          label="Scan"
          onPress={() => router.push('/scan')}
        />
      </View>

      {/* ── Tonight's note (daily tip) ── */}
      <StatCard variant="tip">
        <CandleGlow corner="top-left" intensity={0.55} />
        <View>
          <WarmSandLabel
            size={10.5}
            tracking={2}
            align="left"
            style={{ marginBottom: 10 }}
          >
            {partOfDay === 'evening' ? "Tonight's note" : "Today's note"}
          </WarmSandLabel>
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipBody}>{tip.body}</Text>
        </View>
      </StatCard>

      {/* ── Today's quick stats — meals / scans / symptoms ── */}
      <StatCard>
        <Text style={styles.smallCardTitle}>Today, so far</Text>
        <Text style={styles.cardSub}>
          {today.mealsLogged} meals logged, {today.symptomsLogged} symptom notes,
          {' '}{today.medicationsTaken}/{Math.max(today.medicationsTotal, today.medicationsTaken)} meds.
        </Text>
        <View style={styles.todayRow}>
          <TouchableOpacity
            onPress={() => router.push('/scan')}
            style={styles.todayCta}
          >
            <Text style={styles.todayCtaText}>Open scanner</Text>
            <Text style={styles.todayCtaArrow}>{'\u203A'}</Text>
          </TouchableOpacity>
        </View>
      </StatCard>

      {/* ── Tools shelf ── */}
      <StatCard>
        <WarmSandLabel
          size={10.5}
          tracking={2}
          align="left"
          style={{ marginBottom: 10 }}
        >
          For later
        </WarmSandLabel>
        <ShelfRow
          title="Meal Plan"
          subtitle="seven days of gentle cookery"
          onPress={() => router.push('/meal-plan')}
        />
        <ShelfRow
          title="Knowledge Hub"
          subtitle="articles, written for you"
          onPress={() => router.push('/knowledge-hub')}
        />
        <ShelfRow
          title="Dietary guide"
          subtitle="phases of recovery, explained"
          onPress={() => router.push('/dietary-guide')}
          last
        />
      </StatCard>

      {/* ── Weekly check-in nudge — only if no entry this week ── */}
      {!lastCheckin || !isSameWeek(lastCheckin.date) ? (
        <StatCard variant="tip">
          <CandleGlow corner="top-right" intensity={0.4} />
          <View>
            <WarmSandLabel
              size={10.5}
              tracking={2}
              align="left"
              style={{ marginBottom: 10 }}
            >
              Weekly note
            </WarmSandLabel>
            <Text style={styles.tipTitle}>How was the week?</Text>
            <Text style={styles.tipBody}>
              Two minutes, no pressure &mdash; it helps the readings downstream.
            </Text>
            <View style={{ marginTop: 14 }}>
              <NightButton
                label="Record a note"
                variant="primary"
                onPress={() => setShowCheckin(true)}
                fullWidth
              />
            </View>
          </View>
        </StatCard>
      ) : null}

      <Text style={styles.colophon}>
        Cared for, not measured. Not medical advice.
      </Text>

      <View style={{ height: 40 }} />

      {/* ── State picker ── */}
      <Modal visible={showStatePicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <WarmSandLabel size={10} tracking={2}>How are you, today?</WarmSandLabel>
              <TouchableOpacity onPress={() => setShowStatePicker(false)}>
                <Text style={styles.closeX}>&times;</Text>
              </TouchableOpacity>
            </View>
            {(['remission', 'uncertain', 'flare'] as DiseaseState[]).map((s) => {
              const active = user.diseaseState === s;
              return (
                <TouchableOpacity
                  key={s}
                  onPress={() => {
                    setDiseaseState(s);
                    setShowStatePicker(false);
                  }}
                  style={[
                    styles.modalOption,
                    active && styles.modalOptionActive,
                  ]}
                >
                  <View
                    style={[
                      styles.stateDot,
                      { backgroundColor: dotColor(s) },
                    ]}
                  />
                  <Text style={styles.modalOptionText}>
                    {DISEASE_STATE_LABELS[s]}
                  </Text>
                  {active ? (
                    <Text style={styles.modalCheck}>{'\u2713'}</Text>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>

      {/* ── Goal picker ── */}
      <Modal visible={showGoalPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <WarmSandLabel size={10} tracking={2}>Choose an aim</WarmSandLabel>
              <TouchableOpacity onPress={() => setShowGoalPicker(false)}>
                <Text style={styles.closeX}>&times;</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 380 }}>
              {PRESET_GOALS.map((g, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setWeeklyGoal(g.text, g.target);
                    setShowGoalPicker(false);
                  }}
                  style={styles.modalOption}
                >
                  <Text style={styles.modalIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Text style={[styles.modalOptionText, { flex: 1 }]}>
                    {g.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ── Check-in ── */}
      <CheckinSheet
        visible={showCheckin}
        onClose={() => setShowCheckin(false)}
        onSave={(feeling, notes) => {
          saveCheckin(feeling, notes);
          setShowCheckin(false);
        }}
      />
    </ScrollView>
  );
}

// ─── Subcomponents ─────────────────────────────────────────

function QuickAction({
  glyph,
  label,
  onPress,
}: {
  glyph: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.quickCell}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.quickGlyph}>{glyph}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function ShelfRow({
  title,
  subtitle,
  onPress,
  last = false,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.shelfRow, last ? null : styles.shelfRowDivider]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.shelfTitle}>{title}</Text>
        <Text style={styles.shelfSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.shelfArrow}>{'\u203A'}</Text>
    </TouchableOpacity>
  );
}

function CheckinSheet({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (feeling: number, notes: string) => void;
}) {
  const [feeling, setFeeling] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const options: { value: number; label: string }[] = [
    { value: 1, label: 'Rough' },
    { value: 2, label: 'Tough' },
    { value: 3, label: 'Okay' },
    { value: 4, label: 'Good' },
    { value: 5, label: 'Great' },
  ];
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHeader}>
            <WarmSandLabel size={10} tracking={2}>Record the week</WarmSandLabel>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeX}>&times;</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalPrompt}>
            How <Text style={styles.italicAccent}>fared</Text> the week?
          </Text>
          <View style={styles.feelingRow}>
            {options.map((o) => {
              const active = feeling === o.value;
              return (
                <TouchableOpacity
                  key={o.value}
                  onPress={() => setFeeling(o.value)}
                  style={[
                    styles.feelingChip,
                    active && styles.feelingChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.feelingChipText,
                      active && { color: WELLNESS_NIGHT_COLORS.canvas },
                    ]}
                  >
                    {o.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="A line about the week (optional)"
            placeholderTextColor={WELLNESS_NIGHT_COLORS.textDim}
            style={styles.notesInput}
            multiline
          />
          <NightButton
            label="Save the note"
            variant="primary"
            disabled={feeling == null}
            onPress={() => {
              if (feeling == null) return;
              onSave(feeling, notes.trim());
              setFeeling(null);
              setNotes('');
            }}
            fullWidth
          />
        </View>
      </View>
    </Modal>
  );
}

// ─── Styles ────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WELLNESS_NIGHT_COLORS.canvas,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 120,
  },
  eyebrow: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: WELLNESS_NIGHT_COLORS.sand,
    marginTop: 26,
    marginBottom: 10,
  },
  sub: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 13.5,
    color: WELLNESS_NIGHT_COLORS.textSubtle,
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 21,
  },
  stateLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: WELLNESS_NIGHT_COLORS.surfaceWarm,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.borderSoft,
    marginBottom: 16,
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stateDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    // Native shadow on a single dark dot looks subtle but we keep the
    // declaration mild; the glow comes from the brighter color tone.
  },
  stateValue: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 14,
    color: WELLNESS_NIGHT_COLORS.text,
  },
  stateChevron: {
    color: WELLNESS_NIGHT_COLORS.sand,
    fontSize: 18,
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
  },
  cardTitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 22,
    lineHeight: 26,
    color: WELLNESS_NIGHT_COLORS.textBright,
    fontWeight: '400',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  smallCardTitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 18,
    lineHeight: 22,
    color: WELLNESS_NIGHT_COLORS.textBright,
    fontWeight: '400',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  cardSub: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 12.5,
    color: WELLNESS_NIGHT_COLORS.textSubtle,
    marginBottom: 14,
    lineHeight: 18,
  },
  bar: {
    height: 6,
    borderRadius: 999,
    backgroundColor: WELLNESS_NIGHT_COLORS.surfaceDeep,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: WELLNESS_NIGHT_COLORS.sand,
    borderRadius: 999,
  },
  barMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  barMetaText: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 11,
    color: WELLNESS_NIGHT_COLORS.textFaint,
  },
  goalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  goalDone: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1,
    color: WELLNESS_NIGHT_COLORS.sage,
    marginTop: 14,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  quickCell: {
    flex: 1,
    backgroundColor: WELLNESS_NIGHT_COLORS.surface,
    borderWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.border,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  quickGlyph: {
    fontSize: 18,
    color: WELLNESS_NIGHT_COLORS.sand,
    marginBottom: 6,
  },
  quickLabel: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 11.5,
    color: WELLNESS_NIGHT_COLORS.textMuted,
    letterSpacing: -0.1,
  },
  tipTitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 20,
    lineHeight: 24,
    color: WELLNESS_NIGHT_COLORS.textBright,
    fontWeight: '400',
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  tipBody: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 13,
    color: WELLNESS_NIGHT_COLORS.textSubtle,
    lineHeight: 20,
  },
  todayRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  todayCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  todayCtaText: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: WELLNESS_NIGHT_COLORS.sand,
  },
  todayCtaArrow: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    color: WELLNESS_NIGHT_COLORS.sand,
    fontSize: 14,
  },
  shelfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  shelfRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: WELLNESS_NIGHT_COLORS.border,
  },
  shelfTitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 17,
    color: WELLNESS_NIGHT_COLORS.textBright,
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  shelfSubtitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 12.5,
    color: WELLNESS_NIGHT_COLORS.textFaint,
    marginTop: 2,
  },
  shelfArrow: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 22,
    color: WELLNESS_NIGHT_COLORS.sand,
  },
  colophon: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifItalic,
    fontStyle: 'italic',
    fontSize: 12,
    color: WELLNESS_NIGHT_COLORS.textDim,
    textAlign: 'center',
    marginTop: 12,
  },
  italicAccent: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifItalic,
    fontStyle: 'italic',
    color: WELLNESS_NIGHT_COLORS.sand,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: WELLNESS_NIGHT_COLORS.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.borderWarm,
    padding: 22,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: WELLNESS_NIGHT_COLORS.border,
    marginBottom: 14,
  },
  closeX: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 22,
    color: WELLNESS_NIGHT_COLORS.text,
    paddingHorizontal: 6,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: WELLNESS_NIGHT_COLORS.border,
    gap: 12,
  },
  modalOptionActive: {
    backgroundColor: WELLNESS_NIGHT_COLORS.surfaceWarm,
  },
  modalOptionText: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 16,
    color: WELLNESS_NIGHT_COLORS.textBright,
  },
  modalIndex: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.4,
    color: WELLNESS_NIGHT_COLORS.sand,
    width: 22,
  },
  modalCheck: {
    color: WELLNESS_NIGHT_COLORS.sand,
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 16,
  },
  modalPrompt: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 22,
    color: WELLNESS_NIGHT_COLORS.textBright,
    fontWeight: '400',
    letterSpacing: -0.3,
    marginBottom: 14,
    textAlign: 'center',
  },
  feelingRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  feelingChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.border,
    alignItems: 'center',
  },
  feelingChipActive: {
    borderColor: WELLNESS_NIGHT_COLORS.sandLight,
    backgroundColor: WELLNESS_NIGHT_COLORS.sand,
  },
  feelingChipText: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: WELLNESS_NIGHT_COLORS.text,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.border,
    backgroundColor: WELLNESS_NIGHT_COLORS.surfaceWarm,
    borderRadius: 14,
    minHeight: 70,
    padding: 12,
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 14,
    color: WELLNESS_NIGHT_COLORS.text,
    marginBottom: 14,
  },
});
