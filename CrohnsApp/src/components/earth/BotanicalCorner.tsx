/**
 * BotanicalCorner — line-illustration leaf/twig glyph anchored to a corner.
 *
 * Visual spec: `.d6 .d6-leaf`, `.d6 .d6-prod-leaf`, `.d6 .art-hero-leaf`.
 *
 * The mockup uses inline SVG `<path>` strokes for these flourishes. Without
 * `react-native-svg` in the project, this component renders a stack of
 * Unicode botanical glyphs that read as foliage at small sizes. The position
 * is absolute so callers can pin it to any corner of a card.
 *
 * The glyph stack uses curved characters (❧, ❦, ✦, ⁂) at low opacity to
 * approximate the inked-twig feel of the SVG flourish in the mockup.
 */

import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { EARTH_COLORS } from './fonts';

interface BotanicalCornerProps {
  /** Where to anchor the flourish on the parent surface. Default 'top-right'. */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
  /** Color of the line glyph (default forest). */
  color?: string;
  /** Opacity 0-1 (default 0.5 like the mockup's `.d6-leaf`). */
  opacity?: number;
  /** Visual size — sm for cards, md for product hero, lg for article hero. */
  size?: 'sm' | 'md' | 'lg';
  /** Variant of glyph cluster — leaf (default), branch, frond. */
  variant?: 'leaf' | 'branch' | 'frond';
  style?: ViewStyle;
}

const GLYPHS = {
  // ❧ — rotated fleuron reads as a curling leaf
  leaf: '\u2767',
  // ⚘ — flora glyph
  branch: '\u2698',
  // ❦ + ✦ stacked reads like a fern frond
  frond: '\u2766',
} as const;

export function BotanicalCorner({
  position = 'top-right',
  color = EARTH_COLORS.forest,
  opacity = 0.5,
  size = 'sm',
  variant = 'leaf',
  style,
}: BotanicalCornerProps) {
  const sz = sizeMap[size];
  const glyph = GLYPHS[variant];
  const wrapStyle: ViewStyle | null =
    position === 'inline' ? null : positionMap[position];

  return (
    <View
      pointerEvents="none"
      style={[
        styles.wrap,
        wrapStyle,
        style,
      ]}
    >
      <Text
        style={[
          styles.glyph,
          {
            color,
            opacity,
            fontSize: sz.fontSize,
            lineHeight: sz.lineHeight,
            letterSpacing: sz.letterSpacing,
          },
        ]}
      >
        {glyph}
      </Text>
    </View>
  );
}

const sizeMap = {
  sm: { fontSize: 22, lineHeight: 22, letterSpacing: 1 },
  md: { fontSize: 42, lineHeight: 42, letterSpacing: 1 },
  lg: { fontSize: 52, lineHeight: 52, letterSpacing: 1 },
} as const;

const positionMap = StyleSheet.create({
  'top-right': {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  'top-left': {
    position: 'absolute',
    top: 8,
    left: 10,
  },
  'bottom-right': {
    position: 'absolute',
    right: -2,
    bottom: -8,
  },
  'bottom-left': {
    position: 'absolute',
    left: -2,
    bottom: -8,
  },
});

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    textAlign: 'center',
  },
});
