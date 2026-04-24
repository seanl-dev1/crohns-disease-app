/**
 * EarthDashboard — Nature-Grounded Earth Tones rendering of the Dashboard.
 *
 * Visual spec: `public/designs/index.html` → section `.d6` → Phone 1.
 *
 * Preserves all functionality from the default Dashboard:
 *   - Disease state tabs (remission / uncertain / flare)
 *   - Weekly goal + progress bar
 *   - Weekly check-in
 *   - Navigation to scan, food, symptoms, meal-plan, knowledge-hub
 * but reskins the composition with Earth Tones primitives:
 *   - PaperTexture canvas
 *   - Fraunces serif hero with italic forest accent
 *   - Tan small-caps eyebrows
 *   - Paper-warm cards with botanical corner flourishes
 *   - Forest-green tip card with clay flourish
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
import { EARTH_COLORS, EARTH_FONTS } from '../../components/earth/fonts';
import { PaperTexture } from '../../components/earth/PaperTexture';
import { EarthHero } from '../../components/earth/EarthHero';
import { EarthCard } from '../../components/earth/EarthCard';
import { TanLabel } from '../../components/earth/TanLabel';
import { LeafDivider } from '../../components/earth/LeafDivider';
import { ForestButton } from '../../components/earth/ForestButton';
import { GroundedListRow } from '../../components/earth/GroundedListRow';
import { BotanicalCorner } from '../../components/earth/BotanicalCorner';

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

function formatMastheadDate(): string {
  const now = new Date();
  const weekday = now
    .toLocaleDateString('en-US', { weekday: 'short' })
    .toUpperCase();
  const day = now.getDate();
  const month = now
    .toLocaleDateString('en-US', { month: 'short' })
    .toUpperCase();
  return `${weekday} ${day} ${month}`;
}

/**
 * Adapt the weekly card narrative to the latest check-in. Mockup default:
 * "Four good days, one soft." with a "soft" italic forest accent.
 */
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
      body: 'No check-in yet. When the moment feels right, jot a short note below.',
    };
  }
  if (checkinFeeling >= 4) {
    return {
      leading: 'Four good days, one ',
      accent: 'soft.',
      trailing: '',
      body: 'Five low-trigger meals logged, two scans. You\u2019re on rhythm.',
    };
  }
  if (checkinFeeling === 3) {
    return {
      leading: 'A ',
      accent: 'middling',
      trailing: ' stretch.',
      body: 'Two rough mornings; mostly manageable. Stay in the gentle lane.',
    };
  }
  return {
    leading: 'A ',
    accent: 'tender',
    trailing: ' week.',
    body: 'Last note leaned difficult. Rest, hydrate, keep portions small.',
  };
}

function getProgressPct(progress: number, target: number): number {
  if (!target) return 0;
  return Math.min(100, Math.round((progress / target) * 100));
}

// ─── Main Screen ──────────────────────────────────────────

export function EarthDashboard() {
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

  const partOfDay = getPartOfDay();
  const partOfDayCap = partOfDay[0].toUpperCase() + partOfDay.slice(1);
  const tip = getTodaysTip(user.diseaseState, user.hasResection);
  const narrative = getWeeklyNarrative(lastCheckin?.feeling);

  const logsThisWeek = weeklyGoal?.progress ?? 0;
  const weekTarget = weeklyGoal?.target ?? 25;
  const progressPct = getProgressPct(logsThisWeek, weekTarget);
  const daysToClose = Math.max(0, 7 - new Date().getDay());

  return (
    <View style={styles.outer}>
      <PaperTexture />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Masthead ── */}
        <View style={styles.masthead}>
          <Text style={styles.mastheadTitle}>Field Journal</Text>
          <Text style={styles.mastheadDate}>{formatMastheadDate()}</Text>
        </View>

        {/* ── Greet ── */}
        <View style={styles.greet}>
          <TanLabel
            color={EARTH_COLORS.clay}
            size={10.5}
            tracking={2.4}
            align="left"
            style={{ marginBottom: 10 }}
          >
            {`${partOfDayCap} entry`}
          </TanLabel>
          <EarthHero
            leading={`Good ${partOfDay}, `}
            accent={user.name ? `${user.name}.` : 'friend.'}
            size={30}
            align="left"
          />
          <Text style={styles.greetSub}>
            A quiet check-in on how you&rsquo;re tracking today.
          </Text>
        </View>

        {/* ── State Tabs ── */}
        <View style={styles.stateRow}>
          {DISEASE_STATES.map((s) => {
            const isActive = user.diseaseState === s.value;
            return (
              <TouchableOpacity
                key={s.value}
                onPress={() => setDiseaseState(s.value)}
                style={[
                  styles.stateChip,
                  isActive ? styles.stateChipActive : null,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Set state to ${s.label}`}
              >
                <Text
                  style={[
                    styles.stateLabel,
                    isActive ? styles.stateLabelActive : null,
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Weekly card ── */}
        <EarthCard flourish="top-right">
          <TanLabel
            color={EARTH_COLORS.clay}
            size={10}
            tracking={2}
            style={{ marginBottom: 8 }}
          >
            This week
          </TanLabel>
          <Text style={styles.cardTitle}>
            {narrative.leading}
            <Text style={styles.italicAccent}>{narrative.accent}</Text>
            {narrative.trailing}
          </Text>
          <Text style={styles.cardBody}>{narrative.body}</Text>
          {/* progress bar */}
          <View style={styles.bar}>
            <View
              style={[
                styles.barFill,
                { width: `${weeklyGoal ? progressPct : 0}%` },
              ]}
            />
          </View>
          <View style={styles.barMetaRow}>
            <Text style={styles.barMeta}>
              {weeklyGoal ? `${progressPct}% to goal` : 'no goal yet'}
            </Text>
            <Text style={styles.barMeta}>
              {daysToClose === 0 ? 'closing today' : `${daysToClose} days left`}
            </Text>
          </View>
        </EarthCard>

        {/* ── Quick actions ── */}
        <View style={styles.quickGrid}>
          <QuickAction
            glyph={'\u{1F33E}'}
            label="LOG FOOD"
            onPress={() => router.push('/food')}
          />
          <QuickAction
            glyph={'\u2665'}
            label="SYMPTOM"
            onPress={() => router.push('/symptoms')}
          />
          <QuickAction
            glyph={'\u2723'}
            label="SCAN"
            onPress={() => router.push('/scan')}
          />
        </View>

        {/* ── Tip card (forest gradient) ── */}
        <EarthCard variant="tip" flourish="bottom-right" padding={18}>
          <TanLabel
            color={EARTH_COLORS.clayLight}
            size={10}
            tracking={2}
            style={{ marginBottom: 6 }}
          >
            Gentle reminder
          </TanLabel>
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipBody}>{tip.body}</Text>
        </EarthCard>

        {/* ── Goal card ── */}
        <EarthCard flourish={false}>
          <TanLabel
            color={EARTH_COLORS.clay}
            size={10}
            tracking={2}
            style={{ marginBottom: 8 }}
          >
            This week&rsquo;s aim
          </TanLabel>
          {weeklyGoal ? (
            <>
              <Text style={[styles.cardTitle, { fontSize: 16 }]}>
                {weeklyGoal.text}
              </Text>
              <View style={styles.bar}>
                <View
                  style={[styles.barFill, { width: `${progressPct}%` }]}
                />
              </View>
              <View style={styles.barMetaRow}>
                <Text style={styles.barMeta}>
                  {`${weeklyGoal.progress} / ${weeklyGoal.target}`}
                </Text>
                <Text style={styles.barMeta}>
                  {weeklyGoal.progress >= weeklyGoal.target
                    ? 'aim complete'
                    : `${weeklyGoal.target - weeklyGoal.progress} to go`}
                </Text>
              </View>
              <View style={styles.btnRow}>
                {weeklyGoal.progress < weeklyGoal.target ? (
                  <ForestButton
                    label="+1 mark"
                    onPress={() =>
                      updateGoalProgress(
                        Math.min(weeklyGoal.progress + 1, weeklyGoal.target),
                      )
                    }
                    style={{ flex: 1 }}
                  />
                ) : (
                  <View style={[styles.completeBadge, { flex: 1 }]}>
                    <Text style={styles.completeBadgeText}>
                      {'\u2713 aim complete'}
                    </Text>
                  </View>
                )}
                <ForestButton
                  label="Revise"
                  variant="ghost"
                  onPress={clearWeeklyGoal}
                  style={{ flex: 1 }}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.cardTitle, { fontSize: 16 }]}>
                Pick something small.
              </Text>
              <Text style={styles.cardBody}>
                A weekly aim keeps the rhythm without making it feel like a chore.
              </Text>
              <ForestButton
                label="Set this week's aim"
                onPress={() => setShowGoalPicker(true)}
                style={{ marginTop: 4 }}
              />
            </>
          )}
        </EarthCard>

        {/* ── Weekly check-in ── */}
        {!lastCheckin || !isSameWeek(lastCheckin.date) ? (
          <EarthCard>
            <TanLabel
              color={EARTH_COLORS.clay}
              size={10}
              tracking={2}
              style={{ marginBottom: 8 }}
            >
              Weekly note
            </TanLabel>
            <Text style={[styles.cardTitle, { fontSize: 16 }]}>
              How was the week?
            </Text>
            <Text style={styles.cardBody}>
              Two minutes, no pressure &mdash; it sharpens the readings downstream.
            </Text>
            <ForestButton
              label="Record today's note"
              onPress={() => setShowCheckin(true)}
              style={{ marginTop: 4 }}
            />
          </EarthCard>
        ) : (
          <EarthCard>
            <TanLabel
              color={EARTH_COLORS.clay}
              size={10}
              tracking={2}
              style={{ marginBottom: 8 }}
            >
              Last entry
            </TanLabel>
            <Text style={[styles.cardTitle, { fontSize: 16 }]}>
              {['', 'Rough', 'Tough', 'Okay', 'Good', 'Great'][lastCheckin.feeling]}
              {' '}
              <Text style={styles.italicAccent}>week.</Text>
            </Text>
            {lastCheckin.notes ? (
              <Text style={styles.cardBody}>
                &ldquo;{lastCheckin.notes}&rdquo;
              </Text>
            ) : null}
          </EarthCard>
        )}

        {/* ── Recent labs (mockup ships this) ── */}
        <EarthCard>
          <BotanicalCorner
            position="top-right"
            color={EARTH_COLORS.forest}
            opacity={0.4}
            size="sm"
          />
          <TanLabel
            color={EARTH_COLORS.clay}
            size={10}
            tracking={2}
            style={{ marginBottom: 8 }}
          >
            Recent labs
          </TanLabel>
          <Text style={[styles.cardTitle, { fontSize: 15 }]}>
            CRP 2.1 &middot; Calprotectin 68
          </Text>
          <Text style={[styles.cardBody, styles.cardBodyForest]}>
            {'\u2713 Both within range.'}
          </Text>
        </EarthCard>

        <LeafDivider variant="branch" margin={18} />

        {/* ── Tools shelf ── */}
        <EarthCard>
          <TanLabel
            color={EARTH_COLORS.clay}
            size={10}
            tracking={2}
            style={{ marginBottom: 8 }}
          >
            Field tools
          </TanLabel>
          <GroundedListRow
            title="Meal plan"
            subtitle="seven days of gentle cookery"
            marker={<MarkerNumeral n={1} />}
            onPress={() => router.push('/meal-plan')}
            titleSerif
          />
          <GroundedListRow
            title="Knowledge hub"
            subtitle="articles, reviewed by the house"
            marker={<MarkerNumeral n={2} />}
            onPress={() => router.push('/knowledge-hub')}
            titleSerif
          />
          <GroundedListRow
            title="Dietary guide"
            subtitle="phases of recovery, explained"
            marker={<MarkerNumeral n={3} />}
            onPress={() => router.push('/dietary-guide')}
            titleSerif
            last
          />
        </EarthCard>

        <Text style={styles.footer}>
          Walked-in entries. Refreshed each morning. Not medical advice.
        </Text>

        <View style={{ height: 60 }} />

        {/* ── Goal picker modal ── */}
        <Modal visible={showGoalPicker} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <TanLabel
                  size={10}
                  tracking={2}
                  align="left"
                  color={EARTH_COLORS.forest}
                >
                  Choose an aim
                </TanLabel>
                <TouchableOpacity onPress={() => setShowGoalPicker(false)}>
                  <Text style={styles.closeX}>&times;</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 380 }}>
                {PRESET_GOALS.map((g, i) => (
                  <GroundedListRow
                    key={i}
                    title={g.text}
                    marker={<MarkerNumeral n={i + 1} />}
                    onPress={() => {
                      setWeeklyGoal(g.text, g.target);
                      setShowGoalPicker(false);
                    }}
                    last={i === PRESET_GOALS.length - 1}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* ── Check-in sheet ── */}
        <CheckinSheet
          visible={showCheckin}
          onClose={() => setShowCheckin(false)}
          onSave={(feeling, notes) => {
            saveCheckin(feeling, notes);
            setShowCheckin(false);
          }}
        />
      </ScrollView>
    </View>
  );
}

// ─── Subcomponents ────────────────────────────────────────

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

function MarkerNumeral({ n }: { n: number }) {
  return <Text style={styles.markerNumeral}>{String(n).padStart(2, '0')}</Text>;
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
            <TanLabel
              size={10}
              tracking={2}
              align="left"
              color={EARTH_COLORS.forest}
            >
              Record the week
            </TanLabel>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeX}>&times;</Text>
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
                    feeling === o.value ? styles.feelingChipTextActive : null,
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
            placeholderTextColor={EARTH_COLORS.bark2}
            style={styles.notesInput}
            multiline
          />
          <ForestButton
            label="Save the entry"
            disabled={feeling == null}
            onPress={() => {
              if (feeling == null) return;
              onSave(feeling, notes.trim());
              setFeeling(null);
              setNotes('');
            }}
            style={{ marginTop: 4 }}
          />
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
  outer: { flex: 1, backgroundColor: EARTH_COLORS.oatmeal },
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 100 },
  masthead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: EARTH_COLORS.hairline,
  },
  mastheadTitle: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 20,
    color: EARTH_COLORS.forest,
    letterSpacing: -0.3,
  },
  mastheadDate: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 10,
    color: EARTH_COLORS.bark,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  greet: { paddingTop: 22, paddingBottom: 6 },
  greetSub: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 13.5,
    color: EARTH_COLORS.bark,
    marginTop: 6,
    marginBottom: 4,
    lineHeight: 21,
  },
  stateRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
    marginTop: 10,
  },
  stateChip: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
    backgroundColor: EARTH_COLORS.paperWarm,
    borderRadius: 4,
    alignItems: 'center',
  },
  stateChipActive: {
    backgroundColor: EARTH_COLORS.forest,
    borderColor: EARTH_COLORS.forest,
  },
  stateLabel: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 11.5,
    color: EARTH_COLORS.bark,
    letterSpacing: 0.1,
  },
  stateLabelActive: {
    color: EARTH_COLORS.oatmeal,
  },
  cardTitle: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 18,
    color: EARTH_COLORS.ink,
    letterSpacing: -0.3,
    lineHeight: 22,
    marginBottom: 4,
  },
  italicAccent: {
    fontFamily: EARTH_FONTS.serifItalic,
    color: EARTH_COLORS.forest,
  },
  cardBody: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 12.5,
    color: EARTH_COLORS.bark,
    lineHeight: 19,
    marginTop: 0,
  },
  cardBodyForest: {
    color: EARTH_COLORS.forest,
    fontFamily: EARTH_FONTS.bodySemiBold,
    marginTop: 4,
  },
  bar: {
    height: 5,
    backgroundColor: EARTH_COLORS.hairline,
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: EARTH_COLORS.forest,
    borderRadius: 3,
  },
  barMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  barMeta: {
    fontFamily: EARTH_FONTS.bodyMedium,
    fontSize: 11,
    color: EARTH_COLORS.bark,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
    marginBottom: 12,
  },
  quickCell: {
    flex: 1,
    backgroundColor: EARTH_COLORS.paperWarm,
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  quickGlyph: {
    fontSize: 20,
    color: EARTH_COLORS.forest,
    marginBottom: 4,
  },
  quickLabel: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 10.5,
    color: EARTH_COLORS.ink,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  tipTitle: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 18,
    color: EARTH_COLORS.oatmeal,
    letterSpacing: -0.3,
    lineHeight: 22,
    marginBottom: 6,
  },
  tipBody: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 12.5,
    color: EARTH_COLORS.tipBodySoft,
    lineHeight: 19,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  completeBadge: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    backgroundColor: EARTH_COLORS.paperWarm,
    borderWidth: 1,
    borderColor: EARTH_COLORS.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeBadgeText: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: EARTH_COLORS.forest,
  },
  markerNumeral: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 16,
    color: EARTH_COLORS.clay,
    letterSpacing: 0.5,
  },
  footer: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 11.5,
    color: EARTH_COLORS.bark2,
    textAlign: 'center',
    marginTop: 18,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30,27,21,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: EARTH_COLORS.oatmeal,
    borderTopWidth: 1,
    borderColor: EARTH_COLORS.forest,
    padding: 22,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: EARTH_COLORS.hairline,
    marginBottom: 14,
  },
  closeX: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 24,
    color: EARTH_COLORS.forest,
    paddingHorizontal: 8,
  },
  modalPrompt: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 22,
    color: EARTH_COLORS.ink,
    letterSpacing: -0.3,
    marginBottom: 14,
  },
  feelingRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  feelingChip: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
    backgroundColor: EARTH_COLORS.paperWarm,
    borderRadius: 4,
    alignItems: 'center',
  },
  feelingChipActive: {
    borderColor: EARTH_COLORS.forest,
    backgroundColor: EARTH_COLORS.forest,
  },
  feelingChipText: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: EARTH_COLORS.bark,
  },
  feelingChipTextActive: {
    color: EARTH_COLORS.oatmeal,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
    backgroundColor: EARTH_COLORS.paperWarm,
    borderRadius: 4,
    minHeight: 70,
    padding: 10,
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 14,
    color: EARTH_COLORS.ink,
    marginBottom: 14,
  },
});

export default EarthDashboard;
