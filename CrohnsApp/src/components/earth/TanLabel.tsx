/**
 * TanLabel — small-caps Inter label in warm clay/brown.
 *
 * Visual spec:
 *   `.d6 .d6-eye`        10.5 / 600 / 2.4 tracking / clay #B56638
 *   `.d6 .d6-card-eye`   10   / 600 / 2   tracking / clay #B56638
 *   `.d6 .d6-prod-brand` 10.5 / 600 / 2   tracking / clay #B56638
 *   `.d6 .d6-mast-d`     10   / 600 / 2   tracking / bark #5C4033
 *
 * Used as eyebrow text above hero titles, card titles, masthead dates, and
 * inside the dark "tip" card (where the tint switches to clayLight).
 */

import { Text, StyleSheet, type TextStyle } from 'react-native';
import { EARTH_COLORS, EARTH_FONTS } from './fonts';

interface TanLabelProps {
  children: string;
  /** Color override (default clay). */
  color?: string;
  /** Font size override (default 10.5). */
  size?: number;
  /** Letter-spacing override (default 2.4). */
  tracking?: number;
  /** Text alignment (default left, matching d6 hero eyebrow). */
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
}

export function TanLabel({
  children,
  color = EARTH_COLORS.clay,
  size = 10.5,
  tracking = 2.4,
  align = 'left',
  style,
}: TanLabelProps) {
  return (
    <Text
      style={[
        styles.label,
        {
          color,
          fontSize: size,
          letterSpacing: tracking,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    textTransform: 'uppercase',
  },
});
