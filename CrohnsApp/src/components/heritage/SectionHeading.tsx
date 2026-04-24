/**
 * SectionHeading — small-caps eyebrow with optional serif italic tail.
 *
 * Mockup CSS: `.d10-sh` —
 *   "— The Three Reasons         no. 03"
 *   Oswald small-caps + copper on the left, Playfair italic navy on the right.
 */

import { View, Text, StyleSheet } from 'react-native';
import { HERITAGE_COLORS, HERITAGE_FONTS } from './fonts';

interface SectionHeadingProps {
  label: string;
  /** Right-side count or "No. 03" serif italic tail (optional) */
  suffix?: string;
  /** Prefix an em-dash (matches "— The Three Reasons" style) */
  withLeadingDash?: boolean;
  color?: string;
}

export function SectionHeading({
  label,
  suffix,
  withLeadingDash = true,
  color = HERITAGE_COLORS.copper,
}: SectionHeadingProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color }]}>
        {withLeadingDash ? '\u2014 ' : ''}
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
    marginBottom: 12,
  },
  label: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  suffix: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    fontSize: 13,
    color: HERITAGE_COLORS.navy,
  },
});
