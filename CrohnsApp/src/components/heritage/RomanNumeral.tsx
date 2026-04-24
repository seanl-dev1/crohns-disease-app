/**
 * RomanNumeral — small italic copper roman numeral used as enumeration prefix.
 *
 * Mockup usage: i., ii., iii. before each reason in the Scan result screen;
 * i, ii, iii on the quick-action tiles in the Dashboard.
 */

import { Text, StyleSheet, type TextStyle } from 'react-native';
import { HERITAGE_COLORS, HERITAGE_FONTS } from './fonts';

const NUMERALS = ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
const UPPERCASE = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

interface RomanNumeralProps {
  /** 1 → i, 2 → ii, etc. */
  value: number;
  /** Uppercase variant (I / II / III) — used on the tab bar */
  uppercase?: boolean;
  /** Add trailing period (i.) — used on scan reasons */
  withPeriod?: boolean;
  size?: number;
  color?: string;
  style?: TextStyle;
}

export function RomanNumeral({
  value,
  uppercase = false,
  withPeriod = false,
  size = 20,
  color = HERITAGE_COLORS.copper,
  style,
}: RomanNumeralProps) {
  const base = uppercase
    ? UPPERCASE[value] ?? String(value)
    : NUMERALS[value] ?? String(value);
  const text = withPeriod ? `${base}.` : base;
  return (
    <Text
      style={[
        styles.numeral,
        { color, fontSize: size, lineHeight: size * 1.05 },
        style,
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  numeral: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    letterSpacing: 0,
  },
});
