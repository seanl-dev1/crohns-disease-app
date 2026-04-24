/**
 * EditorialHero — magazine article-style hero title.
 *
 * Two flavors composed by `variant`:
 *
 * - "greet" — Dashboard greeting "Good\nafternoon,\n*Sean.*" set in
 *   38px Instrument Serif over three lines. Italic terracotta on the
 *   final word. Subtitle below is italic Instrument Serif in mid-grey.
 *
 * - "scan"  — Product hero "Chunky\n*Monkey.*" set in 32px Instrument
 *   Serif. Italic terracotta on the second line.
 *
 * - "article" — Hero title "Smoking\n& *Crohn's.*" set in 42px Instrument
 *   Serif. Italic terracotta on the final word.
 *
 * For every variant the structure is the same: a `leading` chunk in roman,
 * an italic terracotta `accent` chunk, and an optional `trailing` chunk
 * after the accent.
 */

import { View, Text, StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from './fonts';

type Variant = 'greet' | 'scan' | 'article';

interface EditorialHeroProps {
  variant?: Variant;
  /** Roman portion before the italic accent (e.g. "Good\nafternoon,\n"). */
  leading?: string;
  /** Italic terracotta accent (e.g. "Sean."). */
  accent?: string;
  /** Roman portion after the accent (rare, e.g. "Crohn's. ahead"). */
  trailing?: string;
  /** Optional italic Instrument Serif subtitle below the hero (variant = "greet"). */
  subtitle?: string;
  /** Override the title text-align. Default left. */
  align?: 'left' | 'center' | 'right';
  style?: ViewStyle;
}

export function EditorialHero({
  variant = 'greet',
  leading = '',
  accent = '',
  trailing = '',
  subtitle,
  align = 'left',
  style,
}: EditorialHeroProps) {
  const sizes = SIZE_BY_VARIANT[variant];
  return (
    <View style={style}>
      <Text
        style={[
          styles.title,
          {
            fontSize: sizes.fontSize,
            lineHeight: sizes.lineHeight,
            letterSpacing: sizes.letterSpacing,
            textAlign: align,
          },
        ]}
      >
        {leading}
        {accent ? (
          <Text
            style={[
              styles.accent,
              { fontSize: sizes.fontSize, lineHeight: sizes.lineHeight },
            ]}
          >
            {accent}
          </Text>
        ) : null}
        {trailing}
      </Text>
      {subtitle ? <Text style={[styles.subtitle, { textAlign: align }]}>{subtitle}</Text> : null}
    </View>
  );
}

const SIZE_BY_VARIANT: Record<Variant, {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}> = {
  // .d5-greet { font-size:38px; line-height:0.95; letter-spacing:-1px }
  greet:   { fontSize: 38, lineHeight: 36, letterSpacing: -1 },
  // .d5-scan-name { font-size:32px; line-height:1; letter-spacing:-0.8px }
  scan:    { fontSize: 32, lineHeight: 32, letterSpacing: -0.8 },
  // .art-title { font-size:42px; line-height:0.95; letter-spacing:-1.2px }
  article: { fontSize: 42, lineHeight: 40, letterSpacing: -1.2 },
};

const styles = StyleSheet.create({
  title: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    color: EDITORIAL_COLORS.ink,
    fontWeight: '400',
  } as TextStyle,
  accent: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    color: EDITORIAL_COLORS.ink, // mockup keeps accent ink-coloured on greet/scan/article — terracotta only on the masthead apostrophe + verdict.
  } as TextStyle,
  subtitle: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: EDITORIAL_COLORS.inkMid,
    marginTop: 8,
    fontWeight: '400',
  } as TextStyle,
});
