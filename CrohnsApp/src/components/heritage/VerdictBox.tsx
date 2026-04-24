/**
 * VerdictBox — "THE VERDICT" block with small-caps header + italic verdict.
 *
 * Mockup CSS: `.d10-verdict` — cream-paper inner frame, Oswald eyebrow,
 * Playfair Display italic verdict statement, Cormorant body.
 *
 * Verdict types color the eyebrow:
 *   good     → sage
 *   caution  → copper
 *   warn     → crimson (default, matches mockup)
 */

import { View, Text, StyleSheet } from 'react-native';
import { HERITAGE_COLORS, HERITAGE_FONTS } from './fonts';
import { SmallCapsLabel } from './SmallCapsLabel';
import { DoubleRuleCard } from './DoubleRuleCard';

export type VerdictTone = 'good' | 'caution' | 'warn';

interface VerdictBoxProps {
  /** Small-caps eyebrow label (usually "THE VERDICT") */
  eyebrow?: string;
  /** Leading words before the italic accent (e.g. "") */
  leading?: string;
  /** Italic accent phrase (mockup: "Often" in "Often a trigger.") */
  accent: string;
  /** Trailing words after the accent (e.g. "a trigger.") */
  trailing?: string;
  /** Plain prose below the headline — Cormorant italic */
  body?: string;
  tone?: VerdictTone;
}

const TONE_COLORS: Record<VerdictTone, string> = {
  good: HERITAGE_COLORS.sage,
  caution: HERITAGE_COLORS.copper,
  warn: HERITAGE_COLORS.crimson,
};

export function VerdictBox({
  eyebrow = 'The verdict',
  leading = '',
  accent,
  trailing = '',
  body,
  tone = 'warn',
}: VerdictBoxProps) {
  const toneColor = TONE_COLORS[tone];
  return (
    <DoubleRuleCard style={styles.card}>
      <SmallCapsLabel
        color={toneColor}
        size={9.5}
        tracking={3}
        withDashes
        style={styles.eyebrow}
      >
        {eyebrow}
      </SmallCapsLabel>
      <Text style={styles.headline}>
        {leading ? <Text style={{ color: HERITAGE_COLORS.navy }}>{leading}</Text> : null}
        <Text style={[styles.accent, { color: toneColor }]}>{accent}</Text>
        {trailing ? <Text style={{ color: HERITAGE_COLORS.navy }}>{trailing}</Text> : null}
      </Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
    </DoubleRuleCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  eyebrow: {
    marginBottom: 10,
  },
  headline: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 22,
    lineHeight: 26,
    color: HERITAGE_COLORS.navy,
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  accent: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
  },
  body: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 14,
    lineHeight: 22,
    color: HERITAGE_COLORS.ink,
    textAlign: 'center',
  },
});
