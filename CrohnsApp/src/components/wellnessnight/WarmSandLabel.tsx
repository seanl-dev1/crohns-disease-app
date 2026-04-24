/**
 * WarmSandLabel — small-caps Inter label in muted sand color.
 *
 * Mockup usage: `.d2-eye`, `.d2-tip-eye`, `.d2-prod-brand`, `.d2-repl-t`,
 * `.art-meta`, `.art-nav-t`. Always uppercase, generous tracking, sand-tone.
 */

import { Text, StyleSheet, type TextStyle } from 'react-native';
import { WELLNESS_NIGHT_COLORS, WELLNESS_NIGHT_FONTS } from './fonts';

interface WarmSandLabelProps {
  children: string;
  /** Color override (default sand) */
  color?: string;
  /** Font size override (default 10.5) */
  size?: number;
  /** Letter-spacing override (default 2) */
  tracking?: number;
  /** Text-align override (default left) */
  align?: 'left' | 'center' | 'right';
  /** Weight override (default 600 = SemiBold) */
  weight?: '400' | '500' | '600';
  style?: TextStyle;
}

export function WarmSandLabel({
  children,
  color = WELLNESS_NIGHT_COLORS.sand,
  size = 10.5,
  tracking = 2,
  align = 'left',
  weight = '600',
  style,
}: WarmSandLabelProps) {
  const fontFamily =
    weight === '500'
      ? WELLNESS_NIGHT_FONTS.bodyMedium
      : weight === '400'
      ? WELLNESS_NIGHT_FONTS.bodyRegular
      : WELLNESS_NIGHT_FONTS.bodySemiBold;
  return (
    <Text
      style={[
        styles.label,
        {
          color,
          fontSize: size,
          letterSpacing: tracking,
          textAlign: align,
          fontFamily,
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
    textTransform: 'uppercase',
  },
});
