/**
 * HeroSerif — Instrument Serif hero headline with optional italic accent.
 *
 * Mockup usage:
 *   "Good afternoon, Sean." — italic+sand accent on "Sean"
 *   "Chunky Monkey, 473 ml" — single line, no accent
 *   "Smoking and Crohn's: the one lifestyle change that truly moves the disease."
 *     — italic+sand accent on "one"
 *
 * Renders [leading]<accent>[trailing]. Accent is italic in sand color.
 */

import { Text, StyleSheet, type TextStyle } from 'react-native';
import { WELLNESS_NIGHT_COLORS, WELLNESS_NIGHT_FONTS } from './fonts';

interface HeroSerifProps {
  leading?: string;
  accent?: string;
  trailing?: string;
  size?: number;
  align?: 'left' | 'center' | 'right';
  color?: string;
  accentColor?: string;
  style?: TextStyle;
}

export function HeroSerif({
  leading = '',
  accent = '',
  trailing = '',
  size = 32,
  align = 'left',
  color = WELLNESS_NIGHT_COLORS.textBright,
  accentColor = WELLNESS_NIGHT_COLORS.sand,
  style,
}: HeroSerifProps) {
  return (
    <Text
      style={[
        styles.hero,
        {
          fontSize: size,
          lineHeight: Math.round(size * 1.08),
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
            {
              fontSize: size,
              lineHeight: Math.round(size * 1.08),
              color: accentColor,
            },
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
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    letterSpacing: -0.5,
    fontWeight: '400',
  },
  accent: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifItalic,
    fontStyle: 'italic',
  },
});
