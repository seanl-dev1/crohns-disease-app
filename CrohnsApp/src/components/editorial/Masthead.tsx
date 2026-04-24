/**
 * Masthead — magazine-style banner across the top of the dashboard.
 *
 * Mockup spec: `.d5-masthead` —
 *   [Crohn's. (serif w/ italic apostrophe)]   [THU 24 APR 2026 (small caps)]
 * with a 1px black hairline directly under the row.
 *
 * The `name` is rendered in Instrument Serif, with an `accent` substring
 * styled italic + terracotta — the mockup splits `Crohn's.` so the
 * apostrophe sits in italic terracotta. The small-caps date sits flush
 * right with tabular numerals.
 */

import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from './fonts';
import { HairlineRule } from './HairlineRule';

interface MastheadProps {
  /** Lead-in title text (e.g. "Crohn"). Rendered Instrument Serif regular. */
  leading?: string;
  /** Italic terracotta accent (e.g. "'" for "Crohn's."). */
  accent?: string;
  /** Trailing text after the accent (e.g. "s."). */
  trailing?: string;
  /** Right-side date / issue label. Small-caps Inter 600. */
  right: string;
  style?: ViewStyle;
}

export function Masthead({
  leading = 'Crohn',
  accent = "\u2019",
  trailing = 's.',
  right,
  style,
}: MastheadProps) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.row}>
        <Text style={styles.title}>
          {leading}
          {accent ? <Text style={styles.titleAccent}>{accent}</Text> : null}
          {trailing}
        </Text>
        <Text style={styles.right}>{right}</Text>
      </View>
      <HairlineRule weight="bold" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 10,
  },
  title: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 22,
    letterSpacing: -0.4,
    color: EDITORIAL_COLORS.ink,
    lineHeight: 26,
  },
  titleAccent: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    color: EDITORIAL_COLORS.terracotta,
  },
  right: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.inkMid,
    // RN style — `font-variant: tabular-nums` is web-only; harmless on native.
    fontVariant: ['tabular-nums'],
  },
});
