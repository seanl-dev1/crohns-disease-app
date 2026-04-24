/**
 * EarthHero — Fraunces serif hero with optional italic forest accent.
 *
 * Visual spec:
 *   `.d6 .d6-hero` — 30 / 1.08 / -0.6 / weight 500
 *   `.d6 .d6-hero em` — italic + forest #2B4A3F
 *   `.d6 .d6-prod-name`, `.d6 .art-title` — same pattern at the same size.
 *
 * Renders [leading]<accent>[trailing]. Accent is italic forest by default.
 * Caller may override the size / colors / alignment.
 */

import { Text, StyleSheet, type TextStyle } from 'react-native';
import { EARTH_COLORS, EARTH_FONTS } from './fonts';

interface EarthHeroProps {
  leading?: string;
  accent?: string;
  trailing?: string;
  /** Font size in px (default 30, matching the d6 hero). */
  size?: number;
  /** Color of the non-accent portion (default ink). */
  color?: string;
  /** Color of the italic accent (default forest). */
  accentColor?: string;
  /** Text alignment — default left to match the d6 mockup hero. */
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
}

export function EarthHero({
  leading = '',
  accent = '',
  trailing = '',
  size = 30,
  color = EARTH_COLORS.ink,
  accentColor = EARTH_COLORS.forest,
  align = 'left',
  style,
}: EarthHeroProps) {
  return (
    <Text
      style={[
        styles.hero,
        {
          fontSize: size,
          lineHeight: size * 1.08,
          color,
          textAlign: align,
        },
        style,
      ]}
    >
      {leading}
      {accent ? (
        <Text
          style={[
            styles.accent,
            { fontSize: size, lineHeight: size * 1.08, color: accentColor },
          ]}
        >
          {accent}
        </Text>
      ) : null}
      {trailing}
    </Text>
  );
}

const styles = StyleSheet.create({
  hero: {
    fontFamily: EARTH_FONTS.serifMedium,
    letterSpacing: -0.6,
  },
  accent: {
    fontFamily: EARTH_FONTS.serifItalic,
  },
});
