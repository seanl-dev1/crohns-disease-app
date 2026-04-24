/**
 * CategoryEyebrow — small-caps terracotta eyebrow used above heros.
 *
 * Mockup uses three near-identical patterns, all rendered with this one
 * primitive:
 *   - `.d5-eye`         "— No. 108 · Afternoon edition"      (dashboard)
 *   - `.d5-scan-eye`    "— Filed under ice cream"            (scan)
 *   - `.art-eye`        "— Lifestyle"                        (article)
 *
 * The leading em-dash is added automatically; pass `noDash` to skip it.
 * Tracking and weight match Inter 600 small-caps in terracotta.
 */

import { Text, StyleSheet, type TextStyle } from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from './fonts';

interface CategoryEyebrowProps {
  children: string;
  /** Tracking — defaults to 2.5 for `.d5-eye` parity. Article heros use 2.8. */
  tracking?: number;
  /** Skip the leading em-dash. */
  noDash?: boolean;
  /** Color override (default terracotta). */
  color?: string;
  style?: TextStyle;
}

export function CategoryEyebrow({
  children,
  tracking = 2.5,
  noDash = false,
  color = EDITORIAL_COLORS.terracotta,
  style,
}: CategoryEyebrowProps) {
  const text = noDash ? children : `\u2014 ${children}`;
  return (
    <Text style={[styles.eyebrow, { letterSpacing: tracking, color }, style]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    textTransform: 'uppercase',
    fontVariant: ['tabular-nums'],
  },
});
