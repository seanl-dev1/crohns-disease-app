/**
 * LedgerRow — "MEALS LOGGED ... 18 / 25" row with dotted baseline.
 *
 * Mockup CSS: `.d10-stat-row` — Oswald small-caps key on the left, Playfair
 * Display number on the right, dotted bottom border except for the last row.
 */

import { View, Text, StyleSheet } from 'react-native';
import { HERITAGE_COLORS, HERITAGE_FONTS } from './fonts';

interface LedgerRowProps {
  label: string;
  value: string | number;
  /** Omit the bottom divider (for the last row in a card) */
  last?: boolean;
  /** Override the value color (e.g. crimson for out-of-range labs) */
  valueColor?: string;
}

export function LedgerRow({
  label,
  value,
  last = false,
  valueColor,
}: LedgerRowProps) {
  return (
    <View
      style={[
        styles.row,
        last ? null : styles.withDivider,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.value,
          { color: valueColor ?? HERITAGE_COLORS.navy },
        ]}
      >
        {String(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 8,
  },
  withDivider: {
    borderBottomWidth: 1,
    // RN StyleSheet doesn't support `borderBottomStyle: 'dotted'` on web reliably,
    // so we use a 1px solid hairline in the exact dotted-line color from the mockup.
    borderBottomColor: HERITAGE_COLORS.dottedLine,
  },
  label: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.ink,
  },
  value: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 16,
    letterSpacing: -0.2,
  },
});
