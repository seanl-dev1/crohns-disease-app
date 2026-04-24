/**
 * Masthead — top banner with double-rule top/bottom borders.
 *
 * Layout: [EST. MMXXVI] [Apothecary (serif italic)] [NO. 108]
 * Matches mockup `.d10-rx-top`, `.scan-top`, and `.art-top` selectors.
 */

import { View, Text, StyleSheet } from 'react-native';
import { HERITAGE_COLORS, HERITAGE_FONTS } from './fonts';

interface MastheadProps {
  left: string;
  center: string;
  right: string;
  /** Whether the center label is italic serif (true for "Apothecary") */
  centerItalic?: boolean;
  /** Optional: override left text color (e.g. ink for back arrow) */
  leftColor?: string;
  /** Optional: override right text color (e.g. copper for "Rx") */
  rightColor?: string;
}

export function Masthead({
  left,
  center,
  right,
  centerItalic = true,
  leftColor,
  rightColor,
}: MastheadProps) {
  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.sideLabel,
          { color: leftColor ?? HERITAGE_COLORS.navy },
        ]}
      >
        {left}
      </Text>
      <Text
        style={[
          styles.centerLabel,
          centerItalic && { fontFamily: HERITAGE_FONTS.serifMediumItalic },
        ]}
      >
        {center}
      </Text>
      <Text
        style={[
          styles.sideLabel,
          { color: rightColor ?? HERITAGE_COLORS.navy },
        ]}
      >
        {right}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: HERITAGE_COLORS.navy,
    marginTop: 6,
  },
  sideLabel: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  centerLabel: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 16,
    color: HERITAGE_COLORS.navy,
  },
});
