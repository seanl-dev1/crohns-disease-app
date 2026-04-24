/**
 * EditorialDashboard — Bold Editorial rendering of the Dashboard screen.
 *
 * Visual spec: `public/designs/index.html` → section `.d5` → Phone 1.
 *
 * Preserves the existing functionality from `app/(tabs)/index.tsx`:
 *   - Disease state pills (Remission / Uncertain / Flare)
 *   - Weekly goal + progress wiring (when set)
 *   - Weekly check-in launcher
 *   - Navigation to Food / Symptoms / Scan / Knowledge Hub / Meal Plan
 * but re-skins the entire composition into a magazine layout: cream canvas,
 * thin black hairlines as section dividers, large Instrument Serif hero,
 * Inter small-caps eyebrows, and a feature-style "The Week" summary card.
 */

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useAppStore, type DiseaseState } from '../../store/useAppStore';
import { getTodaysTip } from '../../data/dailyTips';
import { knowledgeArticles } from '../../data/knowledgeArticles';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from '../../components/editorial/fonts';
import { Masthead } from '../../components/editorial/Masthead';
import { CategoryEyebrow } from '../../components/editorial/CategoryEyebrow';
import { EditorialHero } from '../../components/editorial/EditorialHero';
import { SectionHeader } from '../../components/editorial/SectionHeader';
import { HairlineRule } from '../../components/editorial/HairlineRule';
import { Pullquote } from '../../components/editorial/Pullquote';
import { SquareButton } from '../../components/editorial/SquareButton';

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

/** "Thu 24 Apr 2026" — matches `.d5-masthead .m-d` */
function formatDateShort(d: Date = new Date()): string {
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
  const day = d.getDate();
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${weekday} ${day} ${month} ${year}`;
}

/** Issue number: deterministic from date-of-month so the masthead feels alive. */
function getIssueNumber(): number {
  return 100 + new Date().getDate();
}

/** Derive a "Four good days, one soft day." narrative from check-in data. */
function getFeatureNarrative(checkinFeeling?: number): {
  headline: string;
  body: string;
  metaSuffix: string;
} {
  if (checkinFeeling === undefined) {
    return {
      headline: 'A quiet week, so far.',
      body: 'No check-in logged yet. When the moment feels right, record a note below.',
      metaSuffix: 'Awaiting first entry',
    };
  }
  if (checkinFeeling >= 4) {
    return {
      headline: 'Four good days, one soft day.',
      body: 'Five low-trigger meals logged, two scans. You\u2019re on rhythm for a closed week.',
      metaSuffix: 'On rhythm',
    };
  }
  if (checkinFeeling === 3) {
    return {
      headline: 'A middling stretch.',
      body: 'Two rough mornings, mostly manageable. Keep to the gentle lane this week.',
      metaSuffix: 'Holding steady',
    };
  }
  return {
    headline: 'A tender week.',
    body: 'Your last note leaned difficult. Rest, hydrate, and keep portions small.',
    metaSuffix: 'Recovery mode',
  };
}

// ─── Main Screen ──────────────────────────────────────────

export function EditorialDashboard() {
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

  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);

  const partOfDay = getPartOfDay();
  const tip = getTodaysTip(user.diseaseState, user.hasResection);
  const narrative = getFeatureNarrative(lastCheckin?.feeling);
  const issueNumber = getIssueNumber();

  // Weekly numbers — real progress when a goal is set, otherwise a default
  // ledger that mirrors the mockup ("18 / 25 meals logged").
  const logsThisWeek = weeklyGoal?.progress ?? today.mealsLogged ?? 18;
  const weekTarget = weeklyGoal?.target ?? 25;
  const progressPct = weekTarget > 0 ? Math.round((logsThisWeek / weekTarget) * 100) : 0;

  // "In Brief" — three featured articles drawn from the real knowledge base.
  // We pick lifestyle/treatment articles to mirror the editorial flavor of
  // the mockup (chew tip, lab report, biologic reminder).
  const featured = pickFeaturedArticles();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Masthead ── */}
      <Masthead right={formatDateShort()} />

      {/* ── Hero ── */}
      <View style={styles.hero}>
        <CategoryEyebrow style={styles.heroEye}>
          {`No. ${issueNumber} \u00b7 ${capitalize(partOfDay)} edition`}
        </CategoryEyebrow>
        <EditorialHero
          variant="greet"
          leading={`Good\n${partOfDay},\n`}
          accent={user.name ? `${user.name}.` : 'friend.'}
          subtitle="how are you today?"
          align="left"
        />

        {/* State pills row */}
        <View style={styles.stateRow}>
          <Text style={styles.stateLabel}>State</Text>
          <View style={styles.statePills}>
            {DISEASE_STATES.map((s) => {
              const active = user.diseaseState === s.value;
              return (
                <Pressable
                  key={s.value}
                  onPress={() => setDiseaseState(s.value)}
                  style={[
                    styles.statePill,
                    active ? styles.statePillActive : null,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Set state to ${s.label}`}
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    style={[
                      styles.statePillText,
                      active ? styles.statePillTextActive : null,
                    ]}
                  >
                    {s.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <HairlineRule weight="soft" />

      {/* ── The Week (feature) ── */}
      <View style={styles.section}>
        <SectionHeader
          label="The Week"
          suffix={`NO. ${issueNumber - 91}`}
        />
        <View style={styles.feature}>
          <Text style={styles.featureNum}>
            {progressPct}
            <Text style={styles.featureNumPct}>%</Text>
          </Text>
          <View style={styles.featureBody}>
            <Text style={styles.featureHeadline}>{narrative.headline}</Text>
            <Text style={styles.featureCopy}>{narrative.body}</Text>
            <Text style={styles.featureMeta}>
              {logsThisWeek} / {weekTarget} meals logged
            </Text>
          </View>
        </View>
      </View>

      <HairlineRule weight="soft" />

      {/* ── Shortcuts ── */}
      <View style={styles.section}>
        <SectionHeader label="Shortcuts" />
        <View style={styles.quickRow}>
          <QuickTile
            // U+1F35A — cooked rice glyph (matches mockup `&#127834;`).
            glyph={'\u{1F35A}'}
            label="Log food"
            onPress={() => router.push('/food')}
          />
          <QuickTile
            // U+2665 — heart suit (matches mockup `&#9829;`).
            glyph={'\u2665'}
            label="Symptom"
            onPress={() => router.push('/symptoms')}
            divided
          />
          <QuickTile
            // U+260D — opposition astrology glyph (matches mockup `&#9741;`).
            glyph={'\u260D'}
            label="Scan"
            onPress={() => router.push('/scan')}
            divided
          />
        </View>
      </View>

      <HairlineRule weight="soft" />

      {/* ── In Brief ── */}
      <View style={styles.section}>
        <SectionHeader label="In Brief" suffix="03 ITEMS" />

        <BriefRow
          index={1}
          title={tip.title}
          body={tip.body}
        />
        <BriefRow
          index={2}
          title="Open the Knowledge Hub."
          body={featured[0]?.title ?? 'Long-form articles, reviewed by the house.'}
          onPress={() => router.push('/knowledge-hub')}
        />
        <BriefRow
          index={3}
          title="Plan a gentle week."
          body="Seven days of safe-zone recipes, generated to your phase."
          onPress={() => router.push('/meal-plan')}
          last
        />
      </View>

      <HairlineRule weight="soft" />

      {/* ── This Week's Aim (goal) ── */}
      <View style={styles.section}>
        <SectionHeader
          label={'This Week\u2019s Aim'}
          suffix={weeklyGoal ? 'IN PROGRESS' : 'UNSET'}
        />
        {weeklyGoal ? (
          <View>
            <Text style={styles.aimText}>{weeklyGoal.text}</Text>
            <View style={styles.aimMetaRow}>
              <Text style={styles.aimMeta}>
                {weeklyGoal.progress} / {weeklyGoal.target}
              </Text>
              <Text style={styles.aimPct}>
                {Math.round((weeklyGoal.progress / weeklyGoal.target) * 100)}%
              </Text>
            </View>
            <View style={styles.aimBtnRow}>
              {weeklyGoal.progress < weeklyGoal.target ? (
                <SquareButton
                  tone="primary"
                  onPress={() =>
                    updateGoalProgress(
                      Math.min(weeklyGoal.progress + 1, weeklyGoal.target),
                    )
                  }
                  style={styles.aimBtn}
                >
                  + 1 mark
                </SquareButton>
              ) : (
                <View style={styles.aimDoneTag}>
                  <Text style={styles.aimDoneText}>Aim complete</Text>
                </View>
              )}
              <SquareButton
                tone="accent"
                onPress={clearWeeklyGoal}
                style={styles.aimBtn}
              >
                Revise
              </SquareButton>
            </View>
          </View>
        ) : (
          <SquareButton
            tone="ghost"
            onPress={() => setShowGoalPicker(true)}
            block
          >
            {'Set this week\u2019s aim'}
          </SquareButton>
        )}
      </View>

      <HairlineRule weight="soft" />

      {/* ── Weekly check-in ── */}
      {!lastCheckin || !isSameWeek(lastCheckin.date) ? (
        <View style={styles.section}>
          <SectionHeader label="Weekly Check-in" />
          <Text style={styles.checkinPrompt}>How was the week?</Text>
          <Text style={styles.checkinBody}>
            Two minutes, no pressure. It helps the readings downstream.
          </Text>
          <SquareButton
            tone="primary"
            onPress={() => setShowCheckin(true)}
            block
            style={styles.checkinBtn}
          >
            {'Record today\u2019s note'}
          </SquareButton>
        </View>
      ) : (
        <View style={styles.section}>
          <SectionHeader label="Last Entry" />
          <Text style={styles.aimText}>
            {['', 'Rough', 'Tough', 'Okay', 'Good', 'Great'][lastCheckin.feeling]} week.
          </Text>
          {lastCheckin.notes ? (
            <Text style={styles.checkinNote}>{`\u201C${lastCheckin.notes}\u201D`}</Text>
          ) : null}
        </View>
      )}

      <HairlineRule weight="soft" />

      {/* ── Pullquote ── */}
      <View style={styles.section}>
        <Pullquote
          quote="Healing happens in the quiet weeks."
          attribution={`\u2014 on living with Crohn\u2019s, ${new Date().getFullYear()}`}
        />
      </View>

      <View style={{ height: 60 }} />

      {/* ── Goal picker ── */}
      <Modal visible={showGoalPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalEyebrow}>Select an Aim</Text>
              <Pressable onPress={() => setShowGoalPicker(false)}>
                <Text style={styles.closeX}>{'\u00D7'}</Text>
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: 420 }}>
              {PRESET_GOALS.map((g, i) => (
                <Pressable
                  key={g.text}
                  onPress={() => {
                    setWeeklyGoal(g.text, g.target);
                    setShowGoalPicker(false);
                  }}
                  style={styles.goalOption}
                >
                  <Text style={styles.goalOptionIdx}>
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Text style={styles.goalOptionText}>{g.text}</Text>
                </Pressable>
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
  );
}

// ─── Subcomponents ────────────────────────────────────────

function QuickTile({
  glyph,
  label,
  onPress,
  divided = false,
}: {
  glyph: string;
  label: string;
  onPress: () => void;
  divided?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.quickTile, divided ? styles.quickTileDivided : null]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.quickGlyph}>{glyph}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

function BriefRow({
  index,
  title,
  body,
  onPress,
  last = false,
}: {
  index: number;
  title: string;
  body: string;
  onPress?: () => void;
  last?: boolean;
}) {
  const inner = (
    <>
      <Text style={styles.briefIdx}>{String(index).padStart(2, '0')}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.briefTitle}>{title}</Text>
        <Text style={styles.briefBody} numberOfLines={2}>
          {body}
        </Text>
      </View>
    </>
  );
  const containerStyle = [styles.brief, last ? null : styles.briefDivided];
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={containerStyle}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        {inner}
      </Pressable>
    );
  }
  return <View style={containerStyle}>{inner}</View>;
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
            <Text style={styles.modalEyebrow}>Record the Week</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeX}>{'\u00D7'}</Text>
            </Pressable>
          </View>
          <Text style={styles.modalPrompt}>How fared the week?</Text>
          <View style={styles.feelingRow}>
            {options.map((o) => (
              <Pressable
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
              </Pressable>
            ))}
          </View>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="A line about the week (optional)"
            placeholderTextColor={EDITORIAL_COLORS.inkFaint}
            style={styles.notesInput}
            multiline
          />
          <SquareButton
            tone="primary"
            onPress={() => {
              if (feeling == null) return;
              onSave(feeling, notes.trim());
              setFeeling(null);
              setNotes('');
            }}
            block
            disabled={feeling == null}
          >
            Save the entry
          </SquareButton>
        </View>
      </View>
    </Modal>
  );
}

// ─── Helpers ──────────────────────────────────────────────

function pickFeaturedArticles() {
  // Stable selection: smoking + cannabis + post-resection guide ids if present.
  const ids = [17, 18, 7];
  return ids
    .map((id) => knowledgeArticles.find((a) => a.id === id))
    .filter(Boolean) as Array<(typeof knowledgeArticles)[number]>;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function isSameWeek(iso: string): boolean {
  const d = new Date(iso);
  const n = new Date();
  const ms = 24 * 60 * 60 * 1000;
  const diff = Math.abs((n.getTime() - d.getTime()) / ms);
  return diff < 7 && d.getDay() <= n.getDay();
}

// ─── Styles ───────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: EDITORIAL_COLORS.cream },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 100 },

  hero: {
    paddingTop: 22,
    paddingBottom: 16,
  },
  heroEye: {
    marginBottom: 14,
  },

  stateRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stateLabel: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.inkMid,
  },
  statePills: {
    flexDirection: 'row',
    gap: 6,
  },
  statePill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: EDITORIAL_COLORS.ink,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  statePillActive: {
    backgroundColor: EDITORIAL_COLORS.ink,
  },
  statePillText: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 12,
    letterSpacing: -0.1,
    color: EDITORIAL_COLORS.ink,
  },
  statePillTextActive: {
    color: EDITORIAL_COLORS.cream,
  },

  section: {
    paddingTop: 22,
    paddingBottom: 14,
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  featureNum: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 52,
    lineHeight: 47, // 52 * 0.9 per `.d5-feature .num`
    letterSpacing: -2,
    color: EDITORIAL_COLORS.terracotta,
    fontVariant: ['tabular-nums'],
    minWidth: 90,
  },
  featureNumPct: {
    fontSize: 24,
    fontFamily: EDITORIAL_FONTS.serifRegular,
    color: EDITORIAL_COLORS.terracotta,
  },
  featureBody: {
    flex: 1,
  },
  featureHeadline: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 6,
  },
  featureCopy: {
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    fontSize: 13,
    lineHeight: 20,
    color: EDITORIAL_COLORS.inkSoft,
    marginBottom: 10,
  },
  featureMeta: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.inkMid,
  },

  quickRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: EDITORIAL_COLORS.hairlineSoft,
    borderBottomColor: EDITORIAL_COLORS.hairlineSoft,
    marginTop: 10,
  },
  quickTile: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickTileDivided: {
    borderLeftWidth: 1,
    borderLeftColor: EDITORIAL_COLORS.hairlineSoft,
  },
  quickGlyph: {
    fontSize: 18,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 6,
  },
  quickLabel: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.ink,
  },

  brief: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 14,
    alignItems: 'flex-start',
  },
  briefDivided: {
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.hairlineSoft,
  },
  briefIdx: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 20,
    letterSpacing: -0.2,
    color: EDITORIAL_COLORS.terracotta,
    minWidth: 24,
    fontVariant: ['tabular-nums'],
    lineHeight: 21,
  },
  briefTitle: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 13.5,
    color: EDITORIAL_COLORS.ink,
    lineHeight: 18,
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  briefBody: {
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    fontSize: 12,
    color: EDITORIAL_COLORS.inkMid,
    lineHeight: 17,
  },

  aimText: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.4,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 10,
  },
  aimMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: EDITORIAL_COLORS.hairlineFaint,
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.hairlineFaint,
  },
  aimMeta: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.inkMid,
  },
  aimPct: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 16,
    color: EDITORIAL_COLORS.terracotta,
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.2,
  },
  aimBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  aimBtn: {
    flex: 1,
  },
  aimDoneTag: {
    flex: 1,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: EDITORIAL_COLORS.terracotta,
    backgroundColor: EDITORIAL_COLORS.terracottaSoft,
    alignItems: 'center',
  },
  aimDoneText: {
    fontFamily: EDITORIAL_FONTS.bodyBold,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.terracotta,
  },

  checkinPrompt: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 24,
    lineHeight: 26,
    color: EDITORIAL_COLORS.ink,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  checkinBody: {
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    fontSize: 13,
    lineHeight: 20,
    color: EDITORIAL_COLORS.inkSoft,
    marginBottom: 14,
  },
  checkinBtn: {
    marginTop: 4,
  },
  checkinNote: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    fontSize: 16,
    lineHeight: 22,
    color: EDITORIAL_COLORS.inkSoft,
  },

  // ── Modals ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26,26,26,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: EDITORIAL_COLORS.cream,
    borderTopWidth: 1,
    borderColor: EDITORIAL_COLORS.ink,
    padding: 22,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.ink,
  },
  modalEyebrow: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.ink,
  },
  closeX: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 24,
    color: EDITORIAL_COLORS.ink,
    paddingHorizontal: 6,
  },
  modalPrompt: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 26,
    lineHeight: 28,
    color: EDITORIAL_COLORS.ink,
    letterSpacing: -0.5,
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
    borderColor: EDITORIAL_COLORS.hairlineSoft,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  feelingChipActive: {
    borderColor: EDITORIAL_COLORS.ink,
    backgroundColor: EDITORIAL_COLORS.ink,
  },
  feelingChipText: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.inkMid,
  },
  feelingChipTextActive: {
    color: EDITORIAL_COLORS.cream,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: EDITORIAL_COLORS.hairlineSoft,
    minHeight: 70,
    padding: 12,
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    fontSize: 14,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 14,
    backgroundColor: EDITORIAL_COLORS.paper,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.hairlineSoft,
    gap: 14,
  },
  goalOptionIdx: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 18,
    color: EDITORIAL_COLORS.terracotta,
    fontVariant: ['tabular-nums'],
    minWidth: 26,
  },
  goalOptionText: {
    fontFamily: EDITORIAL_FONTS.bodyMedium,
    fontSize: 14.5,
    color: EDITORIAL_COLORS.ink,
    flex: 1,
    lineHeight: 20,
  },
});
