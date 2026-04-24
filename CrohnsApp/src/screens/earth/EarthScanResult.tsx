/**
 * EarthScanResult — Earth Tones rendering of a scan outcome.
 *
 * Visual spec: `public/designs/index.html` → section `.d6` → Phone 2.
 *
 * Receives the existing `ClassificationResult` from the food engine and maps:
 *   - overallRating GREEN/YELLOW/RED → tone good / caution / warn
 *   - allFlags (danger + warning) → numbered "lay of the land" reasons
 *   - productReplacements → "Gentler alternatives" rows
 * while preserving the scan-again / back flow.
 *
 * Mockup callouts hit:
 *   - `.d6 .scan-header` top nav
 *   - `.d6 .d6-prod` product hero with botanical leaf at top right
 *   - `.d6 .d6-rating` clay-on-rose alert chip
 *   - `.d6 .d6-reasons` paper-warm card with numbered list
 *   - `.d6 .d6-repl` replacement rows with avatar + chevron
 */

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
import { EARTH_COLORS, EARTH_FONTS } from '../../components/earth/fonts';
import { PaperTexture } from '../../components/earth/PaperTexture';
import { TanLabel } from '../../components/earth/TanLabel';
import { EarthHero } from '../../components/earth/EarthHero';
import { EarthCard } from '../../components/earth/EarthCard';
import { LeafDivider } from '../../components/earth/LeafDivider';
import { ForestButton } from '../../components/earth/ForestButton';
import { GroundedListRow } from '../../components/earth/GroundedListRow';
import { BotanicalCorner } from '../../components/earth/BotanicalCorner';

interface EarthScanResultProps {
  result: ClassificationResult;
  onScanAgain: () => void;
  onGoBack: () => void;
}

interface RatingSummary {
  chipBg: string;
  chipBorder: string;
  chipInk: string;
  chipDot: string;
  chipText: string;
  reasonsHeading: string;
  reasonsSubtitle: (count: number) => string;
}

function ratingSummaryFor(rating: Rating): RatingSummary {
  switch (rating) {
    case 'GREEN':
      return {
        chipBg: EARTH_COLORS.paperWarm,
        chipBorder: EARTH_COLORS.forest,
        chipInk: EARTH_COLORS.forest,
        chipDot: EARTH_COLORS.forest,
        chipText: 'Likely agrees with you',
        reasonsHeading: 'In its favour',
        reasonsSubtitle: (n) =>
          n === 1 ? 'One factor noted' : `${spellCount(n)} factors noted`,
      };
    case 'YELLOW':
      return {
        chipBg: '#F2E5C9',
        chipBorder: EARTH_COLORS.clay,
        chipInk: EARTH_COLORS.clay,
        chipDot: EARTH_COLORS.clay,
        chipText: 'Moderate \u2014 measured portions',
        reasonsHeading: 'The lay of the land',
        reasonsSubtitle: (n) => `${spellCount(n)} factors flagged`,
      };
    case 'RED':
    default:
      return {
        chipBg: EARTH_COLORS.alertBg,
        chipBorder: EARTH_COLORS.alertBorder,
        chipInk: EARTH_COLORS.alertInk,
        chipDot: EARTH_COLORS.alertInk,
        chipText: 'Often a trigger for you',
        reasonsHeading: 'The lay of the land',
        reasonsSubtitle: (n) => `${spellCount(n)} factors flagged`,
      };
  }
}

function spellCount(n: number): string {
  switch (n) {
    case 0:
      return 'No';
    case 1:
      return 'One';
    case 2:
      return 'Two';
    case 3:
      return 'Three';
    case 4:
      return 'Four';
    case 5:
      return 'Five';
    default:
      return String(n);
  }
}

/** Split product name so the final word becomes italic forest. */
function splitProductName(raw: string): { head: string; tail: string } {
  const cleaned = raw.replace(/\s+/g, ' ').trim();
  const parts = cleaned.split(' ');
  if (parts.length === 1) return { head: '', tail: cleaned + '.' };
  if (parts.length === 2) return { head: parts[0] + ' ', tail: parts[1] + '.' };
  return {
    head: parts.slice(0, -1).join(' ') + ' ',
    tail: parts[parts.length - 1] + '.',
  };
}

export function EarthScanResult({
  result,
  onScanAgain,
  onGoBack,
}: EarthScanResultProps) {
  const { head, tail } = splitProductName(result.productName);
  const summary = ratingSummaryFor(result.overallRating);

  const dangers = result.allFlags.filter((f) => f.type === 'danger');
  const warnings = result.allFlags.filter((f) => f.type === 'warning');
  const positives = result.allFlags.filter((f) => f.type === 'positive');
  const reasons =
    result.overallRating === 'GREEN'
      ? positives.slice(0, 3)
      : [...dangers, ...warnings].slice(0, 3);
  const replacements =
    result.overallRating !== 'GREEN'
      ? getProductReplacements(result.productName)
      : null;

  const totalReasons =
    result.overallRating === 'GREEN' ? positives.length : dangers.length + warnings.length;

  return (
    <View style={styles.outer}>
      <PaperTexture />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Top nav ── */}
        <View style={styles.scanHeader}>
          <TouchableOpacity
            onPress={onGoBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backArrow}>{'\u2039'}</Text>
          </TouchableOpacity>
          <Text style={styles.scanTitle}>Scan result</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* ── Product hero ── */}
        <View style={styles.prodBlock}>
          <BotanicalCorner
            position="top-right"
            color={EARTH_COLORS.forest}
            opacity={0.35}
            size="md"
            variant="frond"
            style={{ top: 18, right: 0 }}
          />
          {result.brand ? (
            <TanLabel
              color={EARTH_COLORS.clay}
              size={10.5}
              tracking={2}
              style={{ marginBottom: 6 }}
            >
              {result.brand}
            </TanLabel>
          ) : null}
          <EarthHero leading={head} accent={tail} size={30} align="left" />
          <View
            style={[
              styles.ratingChip,
              {
                backgroundColor: summary.chipBg,
                borderColor: summary.chipBorder,
              },
            ]}
          >
            <View
              style={[styles.ratingDot, { backgroundColor: summary.chipDot }]}
            />
            <Text style={[styles.ratingText, { color: summary.chipInk }]}>
              {summary.chipText}
            </Text>
          </View>
          {result.summary ? (
            <Text style={styles.prodSummary}>{result.summary}</Text>
          ) : null}
        </View>

        {/* ── Reasons card ── */}
        {reasons.length > 0 ? (
          <EarthCard padding={18}>
            <Text style={styles.reasonsTitle}>{summary.reasonsHeading}</Text>
            <Text style={styles.reasonsSubtitle}>
              {summary.reasonsSubtitle(totalReasons)}
            </Text>
            {reasons.map((flag, i) => (
              <View
                key={i}
                style={[
                  styles.reasonRow,
                  i === reasons.length - 1 ? null : styles.reasonRowDivider,
                ]}
              >
                <Text style={styles.reasonNumeral}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reasonTitleText}>{flag.title}</Text>
                  <Text style={styles.reasonBodyText}>{flag.detail}</Text>
                </View>
              </View>
            ))}
          </EarthCard>
        ) : null}

        {/* ── Replacements ── */}
        {replacements && replacements.replacements.length > 0 ? (
          <View style={{ marginTop: 4 }}>
            <Text style={styles.replHeading}>Gentler alternatives</Text>
            {replacements.replacements.slice(0, 3).map((r, i) => (
              <View key={i} style={styles.replCard}>
                <View style={styles.replAvatar}>
                  <Text style={styles.replAvatarGlyph}>{'\u{1F33F}'}</Text>
                </View>
                <View style={styles.replBody}>
                  <Text style={styles.replTitle}>{r.name}</Text>
                  <Text style={styles.replSub}>{r.why}</Text>
                </View>
                <Text style={styles.replChev}>{'\u203A'}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* ── Positives footer (when red/yellow but had positives too) ── */}
        {result.overallRating !== 'GREEN' && positives.length > 0 ? (
          <EarthCard>
            <TanLabel
              color={EARTH_COLORS.clay}
              size={10}
              tracking={2}
              style={{ marginBottom: 8 }}
            >
              In its favour
            </TanLabel>
            {positives.slice(0, 2).map((flag, i) => (
              <GroundedListRow
                key={i}
                title={flag.title}
                subtitle={flag.detail}
                marker={
                  <Text style={styles.positiveMarker}>{'\u2713'}</Text>
                }
                trailing={null}
                last={i === Math.min(positives.length, 2) - 1}
              />
            ))}
          </EarthCard>
        ) : null}

        <LeafDivider variant="leaf" margin={18} />

        {/* ── Footer actions ── */}
        <View style={styles.actionsRow}>
          <ForestButton
            label="Scan another"
            onPress={onScanAgain}
            style={{ flex: 1 }}
          />
          <ForestButton
            label="Back to today"
            variant="ghost"
            onPress={onGoBack}
            style={{ flex: 1 }}
          />
        </View>

        <Text style={styles.disclaimer}>
          Educational only. Talk to your gastroenterologist about diet decisions.
        </Text>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: EARTH_COLORS.oatmeal },
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 100 },
  scanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: EARTH_COLORS.hairline,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: EARTH_COLORS.paperWarm,
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 18,
    color: EARTH_COLORS.ink,
    lineHeight: 22,
  },
  scanTitle: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 16,
    color: EARTH_COLORS.ink,
  },
  prodBlock: {
    paddingTop: 20,
    paddingBottom: 12,
    position: 'relative',
  },
  prodSummary: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 13,
    color: EARTH_COLORS.bark,
    marginTop: 12,
    lineHeight: 19,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 14,
  },
  ratingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  ratingText: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 12,
    letterSpacing: 0.1,
  },
  reasonsTitle: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 16,
    color: EARTH_COLORS.ink,
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  reasonsSubtitle: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 11,
    color: EARTH_COLORS.clay,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  reasonRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 10,
  },
  reasonRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: EARTH_COLORS.hairline,
  },
  reasonNumeral: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 20,
    color: EARTH_COLORS.forest,
    minWidth: 24,
    lineHeight: 22,
  },
  reasonTitleText: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 13.5,
    color: EARTH_COLORS.ink,
    marginBottom: 2,
  },
  reasonBodyText: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 12,
    color: EARTH_COLORS.bark,
    lineHeight: 18,
  },
  replHeading: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 16,
    color: EARTH_COLORS.ink,
    letterSpacing: -0.2,
    marginTop: 6,
    marginBottom: 10,
  },
  replCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
    backgroundColor: EARTH_COLORS.paperWarm,
    marginBottom: 8,
  },
  replAvatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: EARTH_COLORS.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replAvatarGlyph: {
    fontSize: 18,
    color: EARTH_COLORS.oatmeal,
  },
  replBody: { flex: 1 },
  replTitle: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 13.5,
    color: EARTH_COLORS.ink,
  },
  replSub: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 11.5,
    color: EARTH_COLORS.bark,
    marginTop: 1,
  },
  replChev: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 22,
    color: EARTH_COLORS.clay,
  },
  positiveMarker: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 18,
    color: EARTH_COLORS.forest,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  disclaimer: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontStyle: 'italic',
    fontSize: 11.5,
    color: EARTH_COLORS.bark2,
    textAlign: 'center',
    marginTop: 18,
  },
});

export default EarthScanResult;
