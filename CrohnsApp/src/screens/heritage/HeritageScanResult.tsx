/**
 * HeritageScanResult — Heritage-styled rendering of a scan outcome.
 *
 * Visual spec: `public/designs/index.html` → section `.d10` → Phone 2.
 *
 * Receives the existing `ClassificationResult` from the food engine and maps:
 *   - overallRating RED/YELLOW/GREEN → tone warn/caution/good
 *   - result.allFlags (danger + warning) → numbered reasons
 *   - productReplacements → gentler alternatives list
 * while preserving the scan-again / back flow.
 */

import { useState } from 'react';
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
import { HERITAGE_COLORS, HERITAGE_FONTS } from '../../components/heritage/fonts';
import { SmallCapsLabel } from '../../components/heritage/SmallCapsLabel';
import { Fleuron } from '../../components/heritage/Fleuron';
import { VerdictBox } from '../../components/heritage/VerdictBox';
import { SectionHeading } from '../../components/heritage/SectionHeading';
import { RomanNumeral } from '../../components/heritage/RomanNumeral';

interface HeritageScanResultProps {
  result: ClassificationResult;
  onScanAgain: () => void;
  onGoBack: () => void;
}

// Map engine rating → Heritage verdict triplet + tone.
function verdictFor(rating: Rating): {
  leading: string;
  accent: string;
  trailing: string;
  eyebrow: string;
  body: string;
  tone: 'good' | 'caution' | 'warn';
} {
  switch (rating) {
    case 'GREEN':
      return {
        leading: '',
        accent: 'Agreeable ',
        trailing: 'with the house.',
        eyebrow: 'The verdict',
        body: 'Nothing in the ledger suggests caution. Proceed with pleasure.',
        tone: 'good',
      };
    case 'YELLOW':
      return {
        leading: '',
        accent: 'Measured ',
        trailing: 'enjoyment.',
        eyebrow: 'The verdict',
        body: 'Small portions, attentive listening \u2014 it may suit in quieter weeks.',
        tone: 'caution',
      };
    case 'RED':
    default:
      return {
        leading: '',
        accent: 'Often ',
        trailing: 'a trigger.',
        eyebrow: 'The verdict',
        body: 'Several factors compound for a resected bowel. Respectfully: not recommended.',
        tone: 'warn',
      };
  }
}

/** Try to detect a two-word product family for italic styling. */
function splitProductName(raw: string): { head: string; tail: string } {
  const cleaned = raw.replace(/\s+/g, ' ').trim();
  const parts = cleaned.split(' ');
  if (parts.length === 1) return { head: '', tail: cleaned };
  if (parts.length === 2) return { head: parts[0] + ' ', tail: parts[1] };
  // First two words as head, remainder as italic tail.
  return { head: parts.slice(0, -1).join(' ') + ' ', tail: parts[parts.length - 1] };
}

/** Rough category label — derived from the engine category on flags when available. */
function inferCategory(result: ClassificationResult): string {
  const cat = result.allFlags.find((f) => f.category)?.category;
  if (cat) return `Filed in ${cat.toLowerCase()}`;
  return 'From the dispensary';
}

export function HeritageScanResult({
  result,
  onScanAgain,
  onGoBack,
}: HeritageScanResultProps) {
  const [showAlternatives] = useState(true);
  const v = verdictFor(result.overallRating);
  const { head, tail } = splitProductName(result.productName);
  const dangers = result.allFlags.filter((f) => f.type === 'danger');
  const warnings = result.allFlags.filter((f) => f.type === 'warning');
  const positives = result.allFlags.filter((f) => f.type === 'positive');
  const reasons = [...dangers, ...warnings].slice(0, 3);
  const replacements =
    result.overallRating !== 'GREEN'
      ? getProductReplacements(result.productName)
      : null;

  const totalReasons = result.allFlags.filter(
    (f) => f.type === 'danger' || f.type === 'warning'
  ).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Masthead / Top nav ── */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onGoBack} accessibilityRole="button" accessibilityLabel="Go back">
          <Text style={styles.backLabel}>&lsaquo; Back</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Examination</Text>
        <Text style={styles.rxLabel}>Rx</Text>
      </View>

      {/* ── Product identity ── */}
      <View style={styles.prodBlock}>
        <SmallCapsLabel
          size={10}
          tracking={3}
          align="center"
          withDashes
          style={{ marginBottom: 8 }}
        >
          {inferCategory(result)}
        </SmallCapsLabel>
        {result.brand ? (
          <Text style={styles.brand}>{result.brand}</Text>
        ) : null}
        <Text style={styles.prodName}>
          {head}
          <Text style={styles.prodNameAccent}>{tail}</Text>
        </Text>
        <Text style={styles.prodSub}>{result.summary}</Text>
      </View>

      <Fleuron count={3} size="md" />

      {/* ── Verdict ── */}
      <VerdictBox
        eyebrow={v.eyebrow}
        leading={v.leading}
        accent={v.accent}
        trailing={v.trailing}
        body={v.body}
        tone={v.tone}
      />

      {/* ── The Reasons ── */}
      {reasons.length > 0 ? (
        <View style={styles.section}>
          <SectionHeading
            label={
              reasons.length === 1
                ? 'The First Reason'
                : reasons.length === 2
                ? 'The Two Reasons'
                : 'The Three Reasons'
            }
            suffix={`no. ${String(totalReasons).padStart(2, '0')}`}
          />
          {reasons.map((flag, i) => (
            <View
              key={i}
              style={[
                styles.reasonRow,
                i === reasons.length - 1 ? null : styles.reasonRowDivider,
              ]}
            >
              <RomanNumeral value={i + 1} size={20} withPeriod style={styles.reasonNumeral} />
              <View style={{ flex: 1 }}>
                <Text style={styles.reasonTitle}>{flag.title}</Text>
                <Text style={styles.reasonBody}>{flag.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}

      {/* ── Gentler Alternatives ── */}
      {replacements && showAlternatives ? (
        <View style={[styles.section, { borderTopWidth: 1, borderTopColor: HERITAGE_COLORS.navy, paddingTop: 14 }]}>
          <SectionHeading
            label="Gentler Alternatives"
            suffix={`no. ${String(replacements.replacements.length).padStart(2, '0')}`}
          />
          {replacements.replacements.slice(0, 3).map((r, i) => (
            <View
              key={i}
              style={[
                styles.replRow,
                i === Math.min(replacements.replacements.length, 3) - 1
                  ? null
                  : styles.reasonRowDivider,
              ]}
            >
              <Text style={styles.replNumeral}>{String(i + 1).padStart(2, '0')}</Text>
              <View style={styles.replAvatar}>
                <Text style={{ fontSize: 18, color: HERITAGE_COLORS.navy }}>&#127846;</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.replTitle}>{r.name}</Text>
                <Text style={styles.replSub}>{r.why}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}

      {/* ── Positives (quiet acknowledgement) ── */}
      {positives.length > 0 ? (
        <View style={[styles.section, { borderTopWidth: 1, borderTopColor: HERITAGE_COLORS.navy, paddingTop: 14 }]}>
          <SectionHeading
            label="In its favour"
            suffix={`no. ${String(positives.length).padStart(2, '0')}`}
            color={HERITAGE_COLORS.sage}
          />
          {positives.map((flag, i) => (
            <View
              key={i}
              style={[
                styles.reasonRow,
                i === positives.length - 1 ? null : styles.reasonRowDivider,
              ]}
            >
              <Text style={[styles.reasonNumeral, { color: HERITAGE_COLORS.sage }]}>
                {String(i + 1).padStart(2, '0')}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.reasonTitle}>{flag.title}</Text>
                <Text style={styles.reasonBody}>{flag.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}

      {/* ── Footer actions ── */}
      <Fleuron count={2} size="sm" style={{ paddingVertical: 14 }} />
      <View style={styles.actionsRow}>
        <TouchableOpacity
          onPress={onScanAgain}
          style={[styles.actionBtn, styles.actionBtnPrimary]}
          accessibilityRole="button"
        >
          <Text style={styles.actionBtnPrimaryText}>Examine another</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onGoBack}
          style={[styles.actionBtn, styles.actionBtnGhost]}
          accessibilityRole="button"
        >
          <Text style={styles.actionBtnGhostText}>Return to today</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        Informational. Consult your gastroenterologist for dietary decisions.
      </Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HERITAGE_COLORS.cream },
  content: { paddingHorizontal: 22, paddingTop: 24, paddingBottom: 100 },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: HERITAGE_COLORS.navy,
    marginTop: 6,
  },
  backLabel: {
    fontFamily: HERITAGE_FONTS.labelMedium,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.navy,
  },
  topTitle: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    fontSize: 16,
    color: HERITAGE_COLORS.navy,
  },
  rxLabel: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.copper,
  },
  prodBlock: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  brand: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 14,
    color: HERITAGE_COLORS.ink,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  prodName: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 32,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 34,
  },
  prodNameAccent: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    color: HERITAGE_COLORS.copper,
  },
  prodSub: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 13,
    color: HERITAGE_COLORS.ink,
    marginTop: 6,
    textAlign: 'center',
  },
  section: {
    paddingVertical: 14,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    gap: 14,
  },
  reasonRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: HERITAGE_COLORS.dottedLine,
  },
  reasonNumeral: {
    minWidth: 26,
  },
  reasonTitle: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 15,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.2,
    lineHeight: 19,
    marginBottom: 3,
  },
  reasonBody: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 13.5,
    color: HERITAGE_COLORS.ink,
    lineHeight: 18,
  },
  replRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 14,
  },
  replNumeral: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10,
    letterSpacing: 2,
    color: HERITAGE_COLORS.copper,
    minWidth: 26,
  },
  replAvatar: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: HERITAGE_COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replTitle: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 15,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.2,
  },
  replSub: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 13,
    color: HERITAGE_COLORS.ink,
    marginTop: 2,
  },
  actionsRow: {
    gap: 10,
    marginTop: 8,
  },
  actionBtn: {
    paddingVertical: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionBtnPrimary: {
    backgroundColor: HERITAGE_COLORS.navy,
    borderColor: HERITAGE_COLORS.navy,
  },
  actionBtnPrimaryText: {
    fontFamily: HERITAGE_FONTS.labelMedium,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.cream,
  },
  actionBtnGhost: {
    borderColor: HERITAGE_COLORS.copper,
    backgroundColor: 'transparent',
  },
  actionBtnGhostText: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.copper,
  },
  disclaimer: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 12,
    color: HERITAGE_COLORS.inkFaint,
    textAlign: 'center',
    marginTop: 20,
  },
});
