/**
 * WellnessNightScanResult — premium dark rendering of the scan outcome.
 *
 * Visual spec: `public/designs/index.html` -> section `.d2` -> Phone 2.
 *
 * Real wiring:
 *   - Receives the existing `ClassificationResult` from `foodClassifier.ts`
 *   - overallRating GREEN/YELLOW/RED -> tone good/caution/warn
 *   - Engine flags (danger + warning) become the numbered "short of it" reasons
 *   - getProductReplacements() drives the "Similar, gentler" list
 *   - Back / Scan again preserve the existing flow from app/scan.tsx
 */

import { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type {
  ClassificationResult,
  Rating,
} from '../../engine/foodClassifier';
import { getProductReplacements } from '../../engine/productReplacements';
import {
  WELLNESS_NIGHT_COLORS,
  WELLNESS_NIGHT_FONTS,
} from '../../components/wellnessnight/fonts';
import { NightMasthead } from '../../components/wellnessnight/NightMasthead';
import { VerdictBlockNight } from '../../components/wellnessnight/VerdictBlockNight';
import { StatCard } from '../../components/wellnessnight/StatCard';
import { WarmSandLabel } from '../../components/wellnessnight/WarmSandLabel';
import { NightButton } from '../../components/wellnessnight/NightButton';
import type { VerdictTone } from '../../components/wellnessnight/VerdictBlockNight';

interface WellnessNightScanResultProps {
  result: ClassificationResult;
  onScanAgain: () => void;
  onGoBack: () => void;
}

// Map engine rating -> Wellness Night verdict copy + tone.
function verdictFor(rating: Rating): {
  tone: VerdictTone;
  ratingText: string;
} {
  switch (rating) {
    case 'GREEN':
      return {
        tone: 'good',
        ratingText: 'Agreeable for you',
      };
    case 'YELLOW':
      return {
        tone: 'caution',
        ratingText: 'Worth pausing',
      };
    case 'RED':
    default:
      return {
        tone: 'warn',
        ratingText: 'Often a trigger for you',
      };
  }
}

/** Split the product name on its last word, so we can italicize it. */
function splitProductName(raw: string): { head: string; tail: string } {
  const cleaned = raw.replace(/\s+/g, ' ').trim();
  if (!cleaned) return { head: '', tail: '' };
  const parts = cleaned.split(' ');
  if (parts.length === 1) return { head: parts[0], tail: '' };
  return {
    head: parts.slice(0, -1).join(' '),
    tail: parts[parts.length - 1],
  };
}

export function WellnessNightScanResult({
  result,
  onScanAgain,
  onGoBack,
}: WellnessNightScanResultProps) {
  const v = useMemo(() => verdictFor(result.overallRating), [result.overallRating]);
  const nameParts = useMemo(
    () => splitProductName(result.productName),
    [result.productName]
  );

  const dangers = result.allFlags.filter((f) => f.type === 'danger');
  const warnings = result.allFlags.filter((f) => f.type === 'warning');
  const positives = result.allFlags.filter((f) => f.type === 'positive');
  const reasons = [...dangers, ...warnings].slice(0, 3);

  const replacements =
    result.overallRating !== 'GREEN'
      ? getProductReplacements(result.productName)
      : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <NightMasthead title="Scan result" onBack={onGoBack} />

      {/* ── Product identity + verdict pill ── */}
      <VerdictBlockNight
        brand={result.brand || undefined}
        productName={nameParts.head || result.productName}
        productAccent={nameParts.tail || undefined}
        ratingText={v.ratingText}
        tone={v.tone}
        subtitle={result.summary}
      />

      {/* ── The short of it (numbered reasons) ── */}
      {reasons.length > 0 ? (
        <StatCard padding={18}>
          <Text style={styles.sectionHeading}>The short of it</Text>
          {reasons.map((flag, i) => {
            const last = i === reasons.length - 1;
            return (
              <View
                key={i}
                style={[styles.reason, last ? null : styles.reasonDivider]}
              >
                <View style={styles.reasonChip}>
                  <Text style={styles.reasonChipText}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reasonTitle}>{flag.title}</Text>
                  <Text style={styles.reasonBody}>{flag.detail}</Text>
                </View>
              </View>
            );
          })}
        </StatCard>
      ) : null}

      {/* ── Replacements (similar, gentler) ── */}
      {replacements && replacements.replacements.length > 0 ? (
        <View style={{ marginTop: 4 }}>
          <WarmSandLabel
            size={10.5}
            tracking={2}
            align="left"
            style={{ marginBottom: 10, marginTop: 6 }}
          >
            Similar, gentler
          </WarmSandLabel>
          {replacements.replacements.slice(0, 3).map((r, i) => (
            <View key={i} style={styles.repl}>
              <View style={styles.replAvatar}>
                <Text style={styles.replGlyph}>{'\u{1F368}'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.replTitle}>{r.name}</Text>
                <Text style={styles.replSub}>{r.why}</Text>
              </View>
              <Text style={styles.replChev}>{'\u203A'}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* ── In its favour (positives) ── */}
      {positives.length > 0 ? (
        <StatCard padding={18} style={{ marginTop: 12 }}>
          <Text style={[styles.sectionHeading, { color: WELLNESS_NIGHT_COLORS.sage }]}>
            In its favour
          </Text>
          {positives.map((flag, i) => {
            const last = i === positives.length - 1;
            return (
              <View
                key={i}
                style={[styles.reason, last ? null : styles.reasonDivider]}
              >
                <View
                  style={[
                    styles.reasonChip,
                    {
                      backgroundColor: 'rgba(127,174,142,0.14)',
                      borderColor: 'rgba(127,174,142,0.4)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.reasonChipText,
                      { color: WELLNESS_NIGHT_COLORS.sage },
                    ]}
                  >
                    {i + 1}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reasonTitle}>{flag.title}</Text>
                  <Text style={styles.reasonBody}>{flag.detail}</Text>
                </View>
              </View>
            );
          })}
        </StatCard>
      ) : null}

      {/* ── Footer actions ── */}
      <View style={styles.actionsRow}>
        <NightButton
          label="Scan another"
          variant="primary"
          onPress={onScanAgain}
          fullWidth
        />
        <View style={{ height: 10 }} />
        <NightButton
          label="Back to today"
          variant="ghost"
          onPress={onGoBack}
          fullWidth
        />
      </View>

      <Text style={styles.disclaimer}>
        Informational. Talk with your gastroenterologist before changing your diet.
      </Text>
      <View style={{ height: 40 }} />
    </ScrollView>
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
    paddingBottom: 100,
  },
  sectionHeading: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 18,
    lineHeight: 22,
    color: WELLNESS_NIGHT_COLORS.textBright,
    fontWeight: '400',
    letterSpacing: -0.2,
    marginBottom: 12,
  },
  reason: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  reasonDivider: {
    borderBottomWidth: 1,
    borderBottomColor: WELLNESS_NIGHT_COLORS.border,
  },
  reasonChip: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: WELLNESS_NIGHT_COLORS.warnBg,
    borderWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.warnBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  reasonChipText: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 11,
    color: WELLNESS_NIGHT_COLORS.warnText,
  },
  reasonTitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 13.5,
    color: WELLNESS_NIGHT_COLORS.text,
    lineHeight: 18,
  },
  reasonBody: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 11.5,
    color: WELLNESS_NIGHT_COLORS.textFaint,
    marginTop: 3,
    lineHeight: 17,
  },
  repl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: WELLNESS_NIGHT_COLORS.surface,
    borderWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
  },
  replAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: WELLNESS_NIGHT_COLORS.surfaceDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replGlyph: {
    fontSize: 18,
    color: WELLNESS_NIGHT_COLORS.sand,
  },
  replTitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 13.5,
    color: WELLNESS_NIGHT_COLORS.text,
  },
  replSub: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 11.5,
    color: WELLNESS_NIGHT_COLORS.textFaint,
    marginTop: 2,
  },
  replChev: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 18,
    color: WELLNESS_NIGHT_COLORS.textDim,
  },
  actionsRow: {
    marginTop: 18,
  },
  disclaimer: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifItalic,
    fontStyle: 'italic',
    fontSize: 12,
    color: WELLNESS_NIGHT_COLORS.textDim,
    textAlign: 'center',
    marginTop: 22,
  },
});
