/**
 * EditorialScanResult — Bold Editorial rendering of a scan outcome.
 *
 * Visual spec: `public/designs/index.html` → section `.d5` → Phone 2.
 *
 * Renders the registry-typed scan props (productName + rating + reasons +
 * replacements) with the magazine treatment:
 *   - Top bar: "‹ Back     Scan     Save"  with a 1px black hairline underneath
 *   - Category eyebrow + brand small-caps + 32px Instrument Serif product name
 *   - Verdict block — top + soft-bottom hairlines, "THE VERDICT" eyebrow,
 *     italic terracotta accent on the central word ("Often a trigger.")
 *   - "The N reasons" — Roman-numeral list, 1px hairlines between items
 *   - "Gentler alternatives" — numeric list with serif titles
 */

import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from '../../components/editorial/fonts';
import { CategoryEyebrow } from '../../components/editorial/CategoryEyebrow';
import { EditorialHero } from '../../components/editorial/EditorialHero';
import { SectionHeader } from '../../components/editorial/SectionHeader';
import { HairlineRule } from '../../components/editorial/HairlineRule';
import { SquareButton } from '../../components/editorial/SquareButton';

type Rating = 'green' | 'yellow' | 'red';

interface EditorialScanResultProps {
  /** Product name from the scan. */
  productName: string;
  /** Engine verdict. */
  rating: Rating;
  /** Reasons the engine flagged this food. */
  reasons: string[];
  /** Suggested safer replacements (name + why). */
  replacements: { name: string; why: string }[];
  /** Optional brand label (e.g. "Ben & Jerry's · 473 ml"). */
  brand?: string;
  /** Optional inferred category (e.g. "Filed under ice cream"). */
  category?: string;
  /** Back navigation. */
  onGoBack?: () => void;
  /** Scan-again navigation. */
  onScanAgain?: () => void;
  /** Save action. */
  onSave?: () => void;
}

interface VerdictCopy {
  eyebrow: string;
  leading: string;
  accent: string;
  trailing: string;
  body: string;
}

function getVerdictCopy(rating: Rating): VerdictCopy {
  switch (rating) {
    case 'green':
      return {
        eyebrow: 'The verdict',
        leading: '',
        accent: 'Generally',
        trailing: ' fine for you.',
        body: 'Nothing in the read raises a flag. Trust the rest of the meal to round it out.',
      };
    case 'yellow':
      return {
        eyebrow: 'The verdict',
        leading: '',
        accent: 'Sometimes',
        trailing: ' a problem for you.',
        body: 'A small portion may be tolerable. Watch how it lands and adjust the rest of the day around it.',
      };
    case 'red':
    default:
      return {
        eyebrow: 'The verdict',
        leading: '',
        accent: 'Often',
        trailing: ' a trigger for you.',
        body: 'Three factors compound here. For a resected bowel, this is a heavy lift on all of them at once.',
      };
  }
}

/** Split product name on the last word so the closing word renders italic. */
function splitProductName(raw: string): { head: string; tail: string } {
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  if (!trimmed) return { head: '', tail: '' };
  const parts = trimmed.split(' ');
  if (parts.length === 1) return { head: '', tail: parts[0] + '.' };
  return {
    head: parts.slice(0, -1).join(' ') + '\n',
    tail: parts[parts.length - 1] + '.',
  };
}

/** Convert 1 → "I", 2 → "II", up to 10. */
function toRomanUpper(n: number): string {
  const table = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  return table[n] ?? String(n);
}

export function EditorialScanResult({
  productName,
  rating,
  reasons,
  replacements,
  brand,
  category = 'From the scanner',
  onGoBack,
  onScanAgain,
  onSave,
}: EditorialScanResultProps) {
  const verdict = useMemo(() => getVerdictCopy(rating), [rating]);
  const { head, tail } = useMemo(() => splitProductName(productName), [productName]);
  const safeReasons = (reasons ?? []).slice(0, 3);
  const safeReplacements = (replacements ?? []).slice(0, 3);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <Pressable
          onPress={onGoBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
        >
          <Text style={styles.topBack}>{'\u2039 Back'}</Text>
        </Pressable>
        <Text style={styles.topTitle}>Scan</Text>
        <Pressable
          onPress={onSave}
          accessibilityRole="button"
          accessibilityLabel="Save"
          hitSlop={8}
        >
          <Text style={styles.topSave}>Save</Text>
        </Pressable>
      </View>
      <HairlineRule weight="bold" />

      {/* ── Product identity ── */}
      <View style={styles.idBlock}>
        <CategoryEyebrow style={styles.idEye}>{category}</CategoryEyebrow>
        {brand ? <Text style={styles.brand}>{brand}</Text> : null}
        <EditorialHero
          variant="scan"
          leading={head}
          accent={tail}
          align="left"
        />
      </View>

      {/* ── Verdict ── */}
      <View style={styles.verdict}>
        <CategoryEyebrow tracking={2.5} noDash style={styles.verdictEyebrow}>
          {verdict.eyebrow}
        </CategoryEyebrow>
        <Text style={styles.verdictHeadline}>
          <Text style={styles.verdictAccent}>{verdict.accent}</Text>
          {verdict.trailing}
        </Text>
        <Text style={styles.verdictBody}>{verdict.body}</Text>
      </View>

      {/* ── The N reasons ── */}
      {safeReasons.length > 0 ? (
        <View style={styles.scanSect}>
          <SectionHeader
            label={
              safeReasons.length === 1
                ? 'The reason'
                : safeReasons.length === 2
                ? 'The two reasons'
                : 'The three reasons'
            }
            suffix={String(safeReasons.length).padStart(2, '0')}
            noDash
            style={styles.scanSectHead}
          />
          {safeReasons.map((reason, i) => {
            const { title, detail } = splitReason(reason);
            return (
              <View
                key={`reason-${i}`}
                style={[
                  styles.reasonRow,
                  i === safeReasons.length - 1 ? null : styles.reasonRowDivided,
                ]}
              >
                <Text style={styles.reasonNumeral}>{toRomanUpper(i + 1)}</Text>
                <View style={styles.reasonBody}>
                  <Text style={styles.reasonTitle}>{title}</Text>
                  {detail ? (
                    <Text style={styles.reasonDetail}>{detail}</Text>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      ) : null}

      {/* ── Gentler alternatives ── */}
      {safeReplacements.length > 0 ? (
        <View style={styles.scanSect}>
          <SectionHeader
            label="Gentler alternatives"
            suffix={String(safeReplacements.length).padStart(2, '0')}
            noDash
            style={styles.scanSectHead}
          />
          {safeReplacements.map((r, i) => (
            <View
              key={`repl-${i}`}
              style={[
                styles.replRow,
                i === safeReplacements.length - 1 ? null : styles.reasonRowDivided,
              ]}
            >
              <Text style={styles.replNumeral}>
                {String(i + 1).padStart(2, '0')}
              </Text>
              <View style={styles.replBody}>
                <Text style={styles.replTitle}>{r.name}</Text>
                <Text style={styles.replWhy}>{r.why}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}

      {/* ── Footer actions ── */}
      <View style={styles.actions}>
        {onScanAgain ? (
          <SquareButton tone="primary" onPress={onScanAgain} block>
            Scan another
          </SquareButton>
        ) : null}
        {onGoBack ? (
          <SquareButton
            tone="ghost"
            onPress={onGoBack}
            block
            style={{ marginTop: 10 }}
          >
            Return to today
          </SquareButton>
        ) : null}
      </View>

      <Text style={styles.disclaimer}>
        Informational. Not a medical recommendation.
      </Text>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

// ─── Helpers ──────────────────────────────────────────────

/**
 * Reasons may arrive as either short titles ("High saturated fat — 24g")
 * or "title — detail" sentences. Split on the first em-dash, otherwise
 * fall back to no detail (whole string is the title).
 */
function splitReason(reason: string): { title: string; detail: string } {
  const m = reason.match(/^(.+?)[\u2014\u2013\-:]\s+(.+)$/);
  if (m) return { title: m[1].trim(), detail: m[2].trim() };
  return { title: reason.trim(), detail: '' };
}

// ─── Styles ───────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: EDITORIAL_COLORS.cream },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 100 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 10,
  },
  topBack: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 12.5,
    color: EDITORIAL_COLORS.ink,
    letterSpacing: 0.2,
  },
  topTitle: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 16,
    color: EDITORIAL_COLORS.ink,
  },
  topSave: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 12,
    color: EDITORIAL_COLORS.ink,
  },

  idBlock: {
    paddingTop: 18,
    paddingBottom: 6,
  },
  idEye: {
    marginBottom: 10,
  },
  brand: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 11.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.inkMid,
    marginBottom: 4,
  },

  // Verdict block — `.d5-verdict { border-top:1px solid #1A1A1A; border-bottom:1px solid #D9D0BE }`
  verdict: {
    paddingVertical: 18,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: EDITORIAL_COLORS.hairline,
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.hairlineSoft,
  },
  verdictEyebrow: {
    marginBottom: 8,
  },
  verdictHeadline: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -0.5,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 6,
  },
  verdictAccent: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    color: EDITORIAL_COLORS.terracotta,
  },
  verdictBody: {
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    fontSize: 13,
    lineHeight: 20,
    color: EDITORIAL_COLORS.inkSoft,
  },

  scanSect: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.hairlineSoft,
  },
  scanSectHead: {
    marginBottom: 14,
  },

  reasonRow: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  reasonRowDivided: {
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.hairlineFaint,
  },
  reasonNumeral: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 22,
    lineHeight: 22,
    color: EDITORIAL_COLORS.terracotta,
    minWidth: 28,
    fontVariant: ['tabular-nums'],
  },
  reasonBody: {
    flex: 1,
  },
  reasonTitle: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 13.5,
    lineHeight: 18,
    color: EDITORIAL_COLORS.ink,
    letterSpacing: -0.1,
    marginBottom: 2,
  },
  reasonDetail: {
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    fontSize: 12,
    lineHeight: 18,
    color: EDITORIAL_COLORS.inkMid,
  },

  replRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    gap: 14,
    alignItems: 'flex-start',
  },
  replNumeral: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 18,
    lineHeight: 20,
    color: EDITORIAL_COLORS.terracotta,
    minWidth: 24,
    fontVariant: ['tabular-nums'],
  },
  replBody: {
    flex: 1,
  },
  replTitle: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 17,
    lineHeight: 19.5,
    letterSpacing: -0.2,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 2,
  },
  replWhy: {
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    fontSize: 11.5,
    lineHeight: 17,
    color: EDITORIAL_COLORS.inkMid,
  },

  actions: {
    paddingTop: 24,
  },
  disclaimer: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    fontSize: 12,
    color: EDITORIAL_COLORS.inkFaint,
    textAlign: 'center',
    marginTop: 22,
  },
});
