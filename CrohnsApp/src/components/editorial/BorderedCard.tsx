/**
 * BorderedCard — magazine card framed by a 1px hairline, no shadow.
 *
 * Bold-editorial declares `flavor.cardBorder = 'hairline'` and
 * `cardShadow = 'none'`. Most "cards" in the d5 mockup are actually just
 * sectioned regions divided by hairlines (`.d5-sect`). When something does
 * need a true bordered surface — the verdict box, the article in-piece nav
 * — we use this primitive.
 *
 * The mockup `.d5-verdict` uses a top hairline + bottom soft hairline rather
 * than four borders. Pass `topOnly` to draw only the top + bottom strokes
 * (the verdict pattern); default is a full 1px frame on all four sides.
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { EDITORIAL_COLORS } from './fonts';

interface BorderedCardProps {
  children: ReactNode;
  /** Background color (default cream). */
  background?: string;
  /** Border color (default near-black ink). */
  borderColor?: string;
  /** Use the verdict-style top+bottom borders only (no left/right). */
  topOnly?: boolean;
  /** Use a soft hairline (#D9D0BE) for the bottom border. */
  softBottom?: boolean;
  /** Padding override. */
  padding?: number;
  style?: ViewStyle;
}

export function BorderedCard({
  children,
  background = 'transparent',
  borderColor = EDITORIAL_COLORS.hairline,
  topOnly = false,
  softBottom = false,
  padding = 18,
  style,
}: BorderedCardProps) {
  const baseStyle: ViewStyle = topOnly
    ? {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: borderColor,
        borderBottomColor: softBottom
          ? EDITORIAL_COLORS.hairlineSoft
          : borderColor,
      }
    : {
        borderWidth: 1,
        borderColor,
      };

  return (
    <View
      style={[
        styles.card,
        baseStyle,
        { backgroundColor: background, padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0, // tight radius scale
  },
});
