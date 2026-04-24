/**
 * SerifHero — Playfair Display hero headline with optional italic accent.
 *
 * Mockup usage: "Good afternoon, Sean." — italic+copper "Sean." span
 *               "Chunky Monkey" — italic+copper "Monkey"
 *               "Smoking & Crohn's." — italic+copper "Crohn's."
 *
 * Renders as [leading]<accent>[trailing]  where accent is italic + copper.
 */

import { Text, StyleSheet, type TextStyle } from 'react-native';
import { HERITAGE_COLORS, HERITAGE_FONTS } from './fonts';

interface SerifHeroProps {
  leading?: string;
  accent?: string;
  trailing?: string;
  size?: number;
  align?: 'left' | 'center' | 'right';
  color?: string;
  accentColor?: string;
  style?: TextStyle;
}

export function SerifHero({
  leading = '',
  accent = '',
  trailing = '',
  size = 30,
  align = 'center',
  color = HERITAGE_COLORS.navy,
  accentColor = HERITAGE_COLORS.copper,
  style,
}: SerifHeroProps) {
  return (
    <Text
      style={[
        styles.hero,
        { fontSize: size, lineHeight: size * 1.1, color, textAlign: align },
        style,
      ]}
    >
      {leading}
      {accent ? (
        <Text
          style={[
            styles.accent,
            { fontSize: size, lineHeight: size * 1.1, color: accentColor },
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
    fontFamily: HERITAGE_FONTS.serifMedium,
    letterSpacing: -0.3,
  },
  accent: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
  },
});
