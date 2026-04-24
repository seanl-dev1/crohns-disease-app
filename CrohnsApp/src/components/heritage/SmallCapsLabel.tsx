/**
 * SmallCapsLabel — Oswald uppercase label with tight letter-spacing.
 *
 * Mockup usage: "WEEKLY LEDGER", "THE VERDICT", "FILED IN ICE CREAM",
 * "THURSDAY · AFTERNOON", "PRESCRIPTION FOR TODAY".
 */

import { Text, StyleSheet, type TextStyle } from 'react-native';
import { HERITAGE_COLORS, HERITAGE_FONTS } from './fonts';

interface SmallCapsLabelProps {
  children: string;
  /** Color override (default is copper) */
  color?: string;
  /** Font size override (default 10) */
  size?: number;
  /** Letter-spacing override (default 2.4) */
  tracking?: number;
  /** Text-align override (default center) */
  align?: 'left' | 'center' | 'right';
  /** Wrap label text in em-dashes on both sides — matches "— The verdict —" style */
  withDashes?: boolean;
  style?: TextStyle;
}

export function SmallCapsLabel({
  children,
  color = HERITAGE_COLORS.copper,
  size = 10,
  tracking = 2.4,
  align = 'center',
  withDashes = false,
  style,
}: SmallCapsLabelProps) {
  const text = withDashes ? `\u2014 ${children} \u2014` : children;
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
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    textTransform: 'uppercase',
  },
});
