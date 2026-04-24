/**
 * HairlineRule — a single 1px horizontal divider.
 *
 * Mockup CSS analogue: `border-bottom:1px solid #1A1A1A` on `.d5-masthead`
 * and `border-bottom:1px solid #D9D0BE` on `.d5-sect`.
 *
 * Two `weight` choices mirror the mockup's two divider tones:
 *   - 'bold' → near-black hairline, used at top of page + above scan/article
 *   - 'soft' → cream-warm hairline, used between in-page sections
 *   - 'faint' → row-divider tone (#E6DFCE) used inside tight lists
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import { EDITORIAL_COLORS } from './fonts';

interface HairlineRuleProps {
  /** Divider strength — see CSS analogue notes. */
  weight?: 'bold' | 'soft' | 'faint';
  /** Vertical breathing space above + below the rule (default 0). */
  margin?: number;
  /** Custom color override (wins over `weight`). */
  color?: string;
  style?: ViewStyle;
}

export function HairlineRule({
  weight = 'bold',
  margin = 0,
  color,
  style,
}: HairlineRuleProps) {
  const resolved = color ?? COLOR_BY_WEIGHT[weight];
  return (
    <View
      style={[
        styles.rule,
        { backgroundColor: resolved, marginVertical: margin },
        style,
      ]}
    />
  );
}

const COLOR_BY_WEIGHT: Record<NonNullable<HairlineRuleProps['weight']>, string> = {
  bold: EDITORIAL_COLORS.hairline,
  soft: EDITORIAL_COLORS.hairlineSoft,
  faint: EDITORIAL_COLORS.hairlineFaint,
};

const styles = StyleSheet.create({
  rule: {
    height: 1,
    width: '100%',
  },
});
