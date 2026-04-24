/**
 * SectionHeader — small-caps Inter eyebrow with optional right-aligned
 * terracotta numeral.
 *
 * Mockup spec: `.d5-sect-head` —
 *   "— THE WEEK"     "NO. 17"    (left small-caps black, right small-caps terracotta)
 *
 * The header itself sits ABOVE a soft hairline that the parent screen draws
 * via <HairlineRule weight="soft" />. We deliberately don't draw a rule here
 * so consumers can compose their own spacing.
 */

import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from './fonts';

interface SectionHeaderProps {
  /** Left-side label (e.g. "The Week"). Em-dash auto-prefixed. */
  label: string;
  /** Right-side suffix (e.g. "NO. 17", "03 ITEMS"). Optional. */
  suffix?: string;
  /** Skip the em-dash that precedes the label. */
  noDash?: boolean;
  style?: ViewStyle;
}

export function SectionHeader({
  label,
  suffix,
  noDash = false,
  style,
}: SectionHeaderProps) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.label}>
        {noDash ? '' : '\u2014 '}
        {label}
      </Text>
      {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  label: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.ink,
  },
  suffix: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 1,
    color: EDITORIAL_COLORS.terracotta,
    fontVariant: ['tabular-nums'],
    textTransform: 'uppercase',
  },
});
