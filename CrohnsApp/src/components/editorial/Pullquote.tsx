/**
 * Pullquote — large italic serif quote with terracotta hairline above.
 *
 * Mockup CSS: `.d5-quote` —
 *   short terracotta `bar` (40px wide) above the quote
 *   Instrument Serif italic body, near-black ink
 *   small-caps Inter attribution underneath in mid-grey
 *
 * The HairlineRule below is optional and matches the section dividers used
 * elsewhere in the dashboard.
 */

import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from './fonts';

interface PullquoteProps {
  /** The quoted line itself — wrapped in curly quotes by default. */
  quote: string;
  /** Attribution / source line (e.g. "— on living with Crohn's, 2024"). */
  attribution?: string;
  /** Skip the leading terracotta bar. */
  hideBar?: boolean;
  style?: ViewStyle;
}

export function Pullquote({
  quote,
  attribution,
  hideBar = false,
  style,
}: PullquoteProps) {
  return (
    <View style={[styles.wrap, style]}>
      {hideBar ? null : <View style={styles.bar} />}
      <Text style={styles.quote}>
        {`\u201C${quote}\u201D`}
      </Text>
      {attribution ? <Text style={styles.attribution}>{attribution}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 18,
    paddingBottom: 4,
  },
  bar: {
    width: 40,
    height: 1,
    backgroundColor: EDITORIAL_COLORS.terracotta,
    marginBottom: 14,
  },
  quote: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    fontSize: 19,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 10,
  },
  attribution: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.inkMid,
  },
});
