/**
 * LeafDivider — horizontal hairline rule with a small centered leaf glyph.
 *
 * Visual spec: the d6 mockup uses a `border-bottom: 1px solid #C9BEA5` rule
 * between sections (e.g. `.d6 .d6-masthead`, `.d6 .scan-header`,
 * `.d6 .art-hero`). This component adds a centered Unicode leaf inside the
 * rule — a quiet ornamental break that reads "field journal" without
 * needing react-native-svg.
 *
 * Modes:
 *   - 'rule'    plain hairline (no glyph)
 *   - 'leaf'    hairline split by a centered ❧
 *   - 'branch'  three-glyph spread for major section breaks
 */

import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { EARTH_COLORS } from './fonts';

interface LeafDividerProps {
  /** Visual variant. Default 'leaf'. */
  variant?: 'rule' | 'leaf' | 'branch';
  /** Color of the rule + glyph (default hairline). */
  color?: string;
  /** Color override for the centered glyph (default forest). */
  glyphColor?: string;
  /** Vertical spacing above + below. Default 14. */
  margin?: number;
  style?: ViewStyle;
}

export function LeafDivider({
  variant = 'leaf',
  color = EARTH_COLORS.hairline,
  glyphColor = EARTH_COLORS.forest,
  margin = 14,
  style,
}: LeafDividerProps) {
  if (variant === 'rule') {
    return (
      <View
        style={[
          styles.ruleOnly,
          { backgroundColor: color, marginVertical: margin },
          style,
        ]}
      />
    );
  }

  const glyph = variant === 'branch' ? '\u2767  \u2767  \u2767' : '\u2767';
  return (
    <View style={[styles.row, { marginVertical: margin }, style]}>
      <View style={[styles.line, { backgroundColor: color }]} />
      <Text
        style={[
          styles.glyph,
          {
            color: glyphColor,
            fontSize: variant === 'branch' ? 12 : 14,
            letterSpacing: variant === 'branch' ? 4 : 0,
          },
        ]}
      >
        {glyph}
      </Text>
      <View style={[styles.line, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
  },
  ruleOnly: {
    width: '100%',
    height: 1,
  },
  glyph: {
    paddingHorizontal: 4,
    opacity: 0.7,
  },
});
