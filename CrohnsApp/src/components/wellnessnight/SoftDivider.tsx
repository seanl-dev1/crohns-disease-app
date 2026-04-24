/**
 * SoftDivider — delicate hairline divider on dark canvas.
 *
 * The Wellness Night design uses one-pixel separators inside cards and
 * between list rows. They sit a single luminance step above the surface
 * color — never the cream/black of a light theme.
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import { WELLNESS_NIGHT_COLORS } from './fonts';

interface SoftDividerProps {
  /** Color override (default: warm border) */
  color?: string;
  /** Vertical margin above + below the line */
  margin?: number;
  /** Inset from the leading edge (e.g. 0 for full-width, 14 for indent) */
  inset?: number;
  style?: ViewStyle;
}

export function SoftDivider({
  color = WELLNESS_NIGHT_COLORS.border,
  margin = 0,
  inset = 0,
  style,
}: SoftDividerProps) {
  return (
    <View
      style={[
        styles.line,
        {
          backgroundColor: color,
          marginVertical: margin,
          marginLeft: inset,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
  },
});
