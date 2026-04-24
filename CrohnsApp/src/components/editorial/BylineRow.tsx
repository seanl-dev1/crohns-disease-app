/**
 * BylineRow — small-caps "BY · DATE · 8 MIN READ" metadata row.
 *
 * Mockup spec: `.d5 .art-meta-row` —
 *   "8 MIN  ·  APR 26  ·  CLINICALLY REVIEWED"
 * with a 3px terracotta dot between items, all set in Inter 600 small caps,
 * sitting above a 1px-soft hairline that the parent draws.
 */

import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from './fonts';

interface BylineRowProps {
  /** Items to render with bullet separators (e.g. ["8 MIN", "APR 26"]). */
  items: string[];
  /** Color override for the bullet/dot separator. */
  dotColor?: string;
  /** Color override for the text labels. */
  textColor?: string;
  style?: ViewStyle;
}

export function BylineRow({
  items,
  dotColor = EDITORIAL_COLORS.inkMid,
  textColor = EDITORIAL_COLORS.inkMid,
  style,
}: BylineRowProps) {
  return (
    <View style={[styles.row, style]}>
      {items.map((label, idx) => (
        <View key={`${idx}-${label}`} style={styles.item}>
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
          {idx < items.length - 1 ? (
            <View
              style={[styles.dot, { backgroundColor: dotColor }]}
              accessibilityElementsHidden
            />
          ) : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontVariant: ['tabular-nums'],
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginHorizontal: 8,
  },
});
