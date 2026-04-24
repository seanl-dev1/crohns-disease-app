/**
 * StatCard — dark-mode elevated card with warm sand accents.
 *
 * Mockup CSS: `.d2 .d2-card` — soft surface (#15110B) over the deeper canvas
 * (#0A0908), with a hairline border in #22190F to suggest elevation. Surfaces
 * ELEVATE upward in luminance (lighter than the canvas), the opposite of a
 * light-mode shadow card.
 *
 * Variant 'tip' switches to a subtle warm-lit gradient corner for the daily
 * tip card (mockup `.d2-tip`).
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { WELLNESS_NIGHT_COLORS } from './fonts';

interface StatCardProps {
  children: ReactNode;
  /** 'standard' = flat surface, 'tip' = warm gradient (mockup `.d2-tip`) */
  variant?: 'standard' | 'tip';
  /** Padding override (default 20) */
  padding?: number;
  /** Background override */
  background?: string;
  /** Border color override */
  borderColor?: string;
  style?: ViewStyle;
}

export function StatCard({
  children,
  variant = 'standard',
  padding = 20,
  background,
  borderColor,
  style,
}: StatCardProps) {
  const bg =
    background ??
    (variant === 'tip' ? WELLNESS_NIGHT_COLORS.surfaceTint : WELLNESS_NIGHT_COLORS.surface);
  const bd =
    borderColor ??
    (variant === 'tip' ? WELLNESS_NIGHT_COLORS.borderWarm : WELLNESS_NIGHT_COLORS.border);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bg,
          borderColor: bd,
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    // RN's ShadowColor on a dark surface looks wrong; we rely on hairline +
    // luminance-up to suggest elevation, matching the mockup.
  },
});
