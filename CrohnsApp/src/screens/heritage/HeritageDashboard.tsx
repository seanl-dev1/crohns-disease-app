/**
 * HeritageDashboard — Victorian-apothecary rendering of the Dashboard screen.
 *
 * Visual spec: `public/designs/index.html` → section `.d10` → Phone 1.
 *
 * Preserves existing functionality from app/(tabs)/index.tsx:
 *   - Disease state tabs (remission / uncertain / flare)
 *   - Weekly goal / check-in wiring
 *   - Navigation to Scan, Meal Plan, Knowledge Hub
 * but re-skins the composition entirely with Heritage primitives.
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
import { HERITAGE_COLORS, HERITAGE_FONTS } from '../../components/heritage/fonts';
import { Masthead } from '../../components/heritage/Masthead';
import { Fleuron } from '../../components/heritage/Fleuron';
import { SmallCapsLabel } from '../../components/heritage/SmallCapsLabel';
import { SerifHero } from '../../components/heritage/SerifHero';
import { DoubleRule } from '../../components/heritage/DoubleRule';
import { DoubleRuleCard } from '../../components/heritage/DoubleRuleCard';
import { LedgerRow } from '../../components/heritage/LedgerRow';
import { RomanNumeral } from '../../components/heritage/RomanNumeral';

const DISEASE_STATES: { value: DiseaseState; label: string }[] = [
  { value: 'remission', label: 'Remission' },
  { value: 'uncertain', label: 'Uncertain' },
  { value: 'flare', label: 'Flare' },
];

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

function getGreeting(): { dayLabel: string; partOfDay: string } {
  const partOfDay = getPartOfDay();
  const weekday = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return {
    dayLabel: `${weekday} \u00b7 ${partOfDay[0].toUpperCase()}${partOfDay.slice(1)}`,
    partOfDay,
  };
}

/** Phrase that adapts to check-in history. Mockup default: "Four good days, one soft." */
function getWeeklyNarrative(checkinFeeling?: number): {
  leading: string;
  accent: string;
  trailing: string;
  body: string;
} {
  if (checkinFeeling === undefined) {
    return {
      leading: 'A ',
      accent: 'quiet ',
      trailing: 'week so far.',
      body: 'No check-in yet. When the moment feels right, record a note below.',
    };
  }
  if (checkinFeeling >= 4) {
    return {
      leading: 'Four ',
      accent: 'good ',
      trailing: 'days, one soft.',
      body: 'Low-trigger meals logged; steady rhythm. You are very much on course.',
    };
  }
  if (checkinFeeling === 3) {
    return {
      leading: 'A ',
      accent: 'middling ',
      trailing: 'stretch.',
      body: 'Two rough mornings; mostly manageable. Keep to the gentle lane this week.',
    };
  }
  return {
    leading: 'A ',
    accent: 'tender ',
    trailing: 'week.',
    body: 'Your last note leaned difficult. Rest, hydrate, and keep portions small.',
  };
}

// ─── Main Screen ──────────────────────────────────────────

export function HeritageDashboard() {
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

  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);

  const greeting = getGreeting();
  const tip = getTodaysTip(user.diseaseState, user.hasResection);
  const narrative = getWeeklyNarrative(lastCheckin?.feeling);

  // Ledger figures — real meal-log counts when we have them.
  const logsThisWeek = weeklyGoal?.progress ?? 0;
  const weekTarget = weeklyGoal?.target ?? 25;
  const progressPct = weekTarget ? Math.round((logsThisWeek / weekTarget) * 100) : 0;
  const daysToClose = Math.max(0, 7 - new Date().getDay());

  // Issue number — deterministic from the current ISO week, decorative only.
  const issueNo = 100 + new Date().getDate();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Masthead ── */}
      <Masthead
        left="Est. MMXXVI"
        center="Apothecary"
        right={`No. ${issueNo}`}
      />

      <Fleuron count={3} size="md" style={{ paddingTop: 14 }} />

      {/* ── Greeting ── */}
      <View style={styles.greet}>
        <SmallCapsLabel
          color={HERITAGE_COLORS.copper}
          size={10}
          tracking={3}
          align="center"
          style={{ marginBottom: 10 }}
        >
          {greeting.dayLabel}
        </SmallCapsLabel>
        <SerifHero
          leading={`Good ${greeting.partOfDay}, `}
          accent={user.name ? `${user.name}.` : 'friend.'}
          size={30}
        />
        <Text style={styles.greetSubtitle}>
          a quiet check &mdash; how fares the day?
        </Text>
      </View>

      <DoubleRule margin={14} />

      {/* ── Disease State Tabs ── */}
      <View style={styles.stateRow}>
        {DISEASE_STATES.map((s) => {
          const isActive = user.diseaseState === s.value;
          return (
            <TouchableOpacity
              key={s.value}
              onPress={() => setDiseaseState(s.value)}
              style={styles.stateBtn}
              accessibilityRole="button"
              accessibilityLabel={`Set state to ${s.label}`}
            >
              <Text
                style={[
                  styles.stateLabel,
                  isActive
                    ? { color: HERITAGE_COLORS.navy, fontFamily: HERITAGE_FONTS.labelMedium }
                    : { color: HERITAGE_COLORS.ink },
                ]}
              >
                {s.label}
              </Text>
              {isActive ? <View style={styles.stateUnderline} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Weekly Ledger ── */}
      <DoubleRuleCard>
        <SmallCapsLabel
          size={9.5}
          tracking={2.4}
          align="left"
          withDashes
          style={{ marginBottom: 8 }}
        >
          Weekly ledger
        </SmallCapsLabel>
        <Text style={styles.cardTitle}>
          {narrative.leading}
          <Text style={styles.italicAccent}>{narrative.accent}</Text>
          {narrative.trailing}
        </Text>
        <Text style={styles.cardBody}>{narrative.body}</Text>
        <View style={{ height: 4 }} />
        <LedgerRow label="Meals logged" value={`${logsThisWeek} / ${weekTarget}`} />
        <LedgerRow label="Days to close" value={daysToClose} />
        <LedgerRow label="Progress" value={`${progressPct}%`} last />
      </DoubleRuleCard>

      {/* ── Quick Actions — three-square ledger grid ── */}
      <View style={styles.quickGrid}>
        <QuickAction numeral={1} glyph={'\u273D'} label="Food" onPress={() => router.push('/food')} />
        <QuickAction numeral={2} glyph={'\u2665'} label="Symptom" onPress={() => router.push('/symptoms')} />
        <QuickAction numeral={3} glyph={'\u2723'} label="Scan" onPress={() => router.push('/scan')} last />
      </View>

      {/* ── Prescription for today (daily tip) ── */}
      <View style={styles.note}>
        <SmallCapsLabel
          size={9.5}
          tracking={3}
          align="center"
          withDashes
          style={{ marginBottom: 10 }}
        >
          Prescription for today
        </SmallCapsLabel>
        <Text style={styles.noteTitle}>{tip.title}</Text>
        <Text style={styles.noteBody}>{tip.body}</Text>
        <Fleuron count={2} size="sm" style={{ paddingTop: 12 }} />
      </View>

      {/* ── Weekly Goal ── */}
      <DoubleRuleCard>
        <SmallCapsLabel
          size={9.5}
          tracking={2.4}
          align="left"
          withDashes
          style={{ marginBottom: 8 }}
        >
          This week's aim
        </SmallCapsLabel>
        {weeklyGoal ? (
          <>
            <Text style={styles.cardTitle}>{weeklyGoal.text}</Text>
            <View style={{ height: 10 }} />
            <LedgerRow
              label="Progress"
              value={`${weeklyGoal.progress} / ${weeklyGoal.target}`}
              last
            />
            <View style={styles.btnRow}>
              {weeklyGoal.progress < weeklyGoal.target ? (
                <TouchableOpacity
                  onPress={() =>
                    updateGoalProgress(Math.min(weeklyGoal.progress + 1, weeklyGoal.target))
                  }
                  style={styles.squareBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Mark one step complete"
                >
                  <Text style={styles.squareBtnText}>+ 1 mark</Text>
                </TouchableOpacity>
              ) : (
                <Text style={[styles.squareBtnText, { color: HERITAGE_COLORS.sage }]}>
                  {'\u2713 aim complete'}
                </Text>
              )}
              <TouchableOpacity
                onPress={clearWeeklyGoal}
                style={[styles.squareBtn, styles.squareBtnLight]}
                accessibilityRole="button"
                accessibilityLabel="Change goal"
              >
                <Text style={[styles.squareBtnText, { color: HERITAGE_COLORS.copper }]}>
                  revise
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => setShowGoalPicker(true)}
            style={styles.setGoalBtn}
            accessibilityRole="button"
          >
            <Text style={styles.setGoalText}>Set this week's aim</Text>
            <RomanNumeral value={1} withPeriod />
          </TouchableOpacity>
        )}
      </DoubleRuleCard>

      {/* ── Weekly Check-in ── */}
      {!lastCheckin || !isSameWeek(lastCheckin.date) ? (
        <DoubleRuleCard>
          <SmallCapsLabel
            size={9.5}
            tracking={2.4}
            align="left"
            withDashes
            style={{ marginBottom: 8 }}
          >
            Weekly consultation
          </SmallCapsLabel>
          <Text style={styles.cardTitle}>How was the week?</Text>
          <Text style={styles.cardBody}>
            Two minutes, no pressure &mdash; it helps the readings downstream.
          </Text>
          <TouchableOpacity
            onPress={() => setShowCheckin(true)}
            style={styles.setGoalBtn}
            accessibilityRole="button"
          >
            <Text style={styles.setGoalText}>Record today's note</Text>
            <RomanNumeral value={2} withPeriod />
          </TouchableOpacity>
        </DoubleRuleCard>
      ) : (
        <DoubleRuleCard>
          <SmallCapsLabel size={9.5} tracking={2.4} align="left" withDashes style={{ marginBottom: 8 }}>
            Last entry
          </SmallCapsLabel>
          <Text style={styles.cardTitle}>
            {['', 'Rough', 'Tough', 'Okay', 'Good', 'Great'][lastCheckin.feeling]}
            {' '}
            <Text style={styles.italicAccent}>week.</Text>
          </Text>
          {lastCheckin.notes ? (
            <Text style={styles.cardBody}>&ldquo;{lastCheckin.notes}&rdquo;</Text>
          ) : null}
        </DoubleRuleCard>
      )}

      {/* ── Tools shelf (Meal Plan / Learn / Wellness) ── */}
      <DoubleRuleCard>
        <SmallCapsLabel
          size={9.5}
          tracking={2.4}
          align="left"
          withDashes
          style={{ marginBottom: 8 }}
        >
          The dispensary
        </SmallCapsLabel>
        <ShelfRow
          numeral={1}
          title="Meal Plan"
          subtitle="seven days of gentle cookery"
          onPress={() => router.push('/meal-plan')}
        />
        <ShelfRow
          numeral={2}
          title="The Compendium"
          subtitle="articles, reviewed by the house"
          onPress={() => router.push('/knowledge-hub')}
        />
        <ShelfRow
          numeral={3}
          title="Dietary Guide"
          subtitle="phases of recovery, explained"
          onPress={() => router.push('/dietary-guide')}
          last
        />
      </DoubleRuleCard>

      <Fleuron count={3} size="md" style={{ paddingVertical: 14 }} />

      <Text style={styles.footerColophon}>
        Printed locally, refreshed daily. Not medical advice.
      </Text>

      <View style={{ height: 40 }} />

      {/* ── Goal Picker ── */}
      <Modal visible={showGoalPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <SmallCapsLabel size={10} tracking={2.4} align="left" color={HERITAGE_COLORS.navy}>
                Select an aim
              </SmallCapsLabel>
              <TouchableOpacity onPress={() => setShowGoalPicker(false)}>
                <Text style={styles.closeX}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 400 }}>
              {PRESET_GOALS.map((g, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setWeeklyGoal(g.text, g.target);
                    setShowGoalPicker(false);
                  }}
                  style={styles.goalOption}
                >
                  <RomanNumeral value={i + 1} size={14} withPeriod />
                  <Text style={styles.goalOptionText}>{g.text}</Text>
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

// ─── Small subcomponents (local, screen-specific) ───────────

function QuickAction({
  numeral,
  glyph,
  label,
  onPress,
  last = false,
}: {
  numeral: number;
  glyph: string;
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.quickCell, last ? null : styles.quickCellDivider]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <RomanNumeral
        value={numeral}
        size={11}
        style={styles.quickNumeral}
      />
      <Text style={styles.quickGlyph}>{glyph}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function ShelfRow({
  numeral,
  title,
  subtitle,
  onPress,
  last = false,
}: {
  numeral: number;
  title: string;
  subtitle: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.shelfRow, last ? null : styles.shelfRowBorder]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={styles.shelfNumeral}>{String(numeral).padStart(2, '0')}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.shelfTitle}>{title}</Text>
        <Text style={styles.shelfSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.shelfArrow}>&rsaquo;</Text>
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
            <SmallCapsLabel size={10} tracking={2.4} align="left" color={HERITAGE_COLORS.navy}>
              Record the week
            </SmallCapsLabel>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeX}>×</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalPrompt}>How fared the week?</Text>
          <View style={styles.feelingRow}>
            {options.map((o) => (
              <TouchableOpacity
                key={o.value}
                onPress={() => setFeeling(o.value)}
                style={[
                  styles.feelingChip,
                  feeling === o.value ? styles.feelingChipActive : null,
                ]}
              >
                <Text
                  style={[
                    styles.feelingChipText,
                    feeling === o.value ? { color: HERITAGE_COLORS.navy } : null,
                  ]}
                >
                  {o.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="a line about the week (optional)"
            placeholderTextColor={HERITAGE_COLORS.inkFaint}
            style={styles.notesInput}
            multiline
          />
          <TouchableOpacity
            onPress={() => {
              if (feeling == null) return;
              onSave(feeling, notes.trim());
              setFeeling(null);
              setNotes('');
            }}
            disabled={feeling == null}
            style={[styles.saveBtn, feeling == null && { opacity: 0.4 }]}
          >
            <Text style={styles.saveBtnText}>Seal the entry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function isSameWeek(iso: string): boolean {
  const d = new Date(iso);
  const n = new Date();
  const ms = 24 * 60 * 60 * 1000;
  const diff = Math.abs((n.getTime() - d.getTime()) / ms);
  return diff < 7 && d.getDay() <= n.getDay();
}

// ─── Styles ────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HERITAGE_COLORS.cream },
  content: { paddingHorizontal: 22, paddingTop: 24, paddingBottom: 120 },
  greet: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingTop: 8,
    paddingBottom: 18,
  },
  greetSubtitle: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 16,
    color: HERITAGE_COLORS.ink,
    marginTop: 6,
    textAlign: 'center',
  },
  stateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 22,
    marginVertical: 8,
  },
  stateBtn: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    alignItems: 'center',
    position: 'relative',
  },
  stateLabel: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  stateUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 1.5,
    left: 0,
    right: 0,
    backgroundColor: HERITAGE_COLORS.copper,
  },
  cardTitle: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 20,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  italicAccent: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    color: HERITAGE_COLORS.copper,
  },
  cardBody: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 14,
    color: HERITAGE_COLORS.ink,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 10,
  },
  quickGrid: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: HERITAGE_COLORS.navy,
    backgroundColor: HERITAGE_COLORS.paperWarm,
    marginVertical: 12,
  },
  quickCell: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  quickCellDivider: {
    borderRightWidth: 1,
    borderRightColor: HERITAGE_COLORS.navy,
  },
  quickNumeral: {
    position: 'absolute',
    top: 4,
    left: 6,
  },
  quickGlyph: {
    fontSize: 18,
    color: HERITAGE_COLORS.navy,
    marginBottom: 4,
  },
  quickLabel: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 9.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.ink,
  },
  note: {
    padding: 18,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: HERITAGE_COLORS.hairline,
    backgroundColor: HERITAGE_COLORS.cream,
    marginVertical: 8,
  },
  noteTitle: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    fontSize: 19,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.2,
    lineHeight: 22,
    textAlign: 'center',
  },
  noteBody: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 14,
    color: HERITAGE_COLORS.ink,
    lineHeight: 20,
    marginTop: 6,
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },
  squareBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: HERITAGE_COLORS.navy,
    backgroundColor: HERITAGE_COLORS.cream,
    alignItems: 'center',
  },
  squareBtnLight: {
    borderColor: HERITAGE_COLORS.copper,
    backgroundColor: 'transparent',
  },
  squareBtnText: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.navy,
  },
  setGoalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: HERITAGE_COLORS.dottedLine,
    marginTop: 6,
  },
  setGoalText: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    fontSize: 15,
    color: HERITAGE_COLORS.copper,
  },
  shelfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 14,
  },
  shelfRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: HERITAGE_COLORS.dottedLine,
  },
  shelfNumeral: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10,
    color: HERITAGE_COLORS.copper,
    letterSpacing: 2,
    width: 26,
  },
  shelfTitle: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 16,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.2,
  },
  shelfSubtitle: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 13,
    color: HERITAGE_COLORS.ink,
    marginTop: 1,
  },
  shelfArrow: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 22,
    color: HERITAGE_COLORS.copper,
  },
  footerColophon: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 12,
    color: HERITAGE_COLORS.inkFaint,
    textAlign: 'center',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27,42,62,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: HERITAGE_COLORS.cream,
    borderTopWidth: 1,
    borderColor: HERITAGE_COLORS.navy,
    padding: 22,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: HERITAGE_COLORS.navy,
    marginBottom: 14,
  },
  closeX: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 22,
    color: HERITAGE_COLORS.navy,
    paddingHorizontal: 8,
  },
  modalPrompt: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 22,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.3,
    marginBottom: 14,
    textAlign: 'center',
  },
  feelingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 14,
  },
  feelingChip: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: HERITAGE_COLORS.hairline,
    alignItems: 'center',
  },
  feelingChipActive: {
    borderColor: HERITAGE_COLORS.navy,
    backgroundColor: HERITAGE_COLORS.paperWarm,
  },
  feelingChipText: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.ink,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: HERITAGE_COLORS.hairline,
    minHeight: 70,
    padding: 10,
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 15,
    color: HERITAGE_COLORS.ink,
    marginBottom: 14,
    backgroundColor: HERITAGE_COLORS.paperWarm,
  },
  saveBtn: {
    backgroundColor: HERITAGE_COLORS.navy,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.cream,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: HERITAGE_COLORS.dottedLine,
    gap: 14,
  },
  goalOptionText: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 15,
    color: HERITAGE_COLORS.navy,
    flex: 1,
  },
});
