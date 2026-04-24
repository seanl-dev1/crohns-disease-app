/**
 * DoubleRuleCard — card with double-line borders on aged-cream background.
 *
 * Mockup CSS: `.d10-card::before { inset: 4px; border: 1px solid rgba(27,42,62,0.22) }`
 * We replicate with an outer View (primary border) wrapping a positioned inner
 * View (inset faint border), so both are visible in all RN/Web render paths.
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { HERITAGE_COLORS } from './fonts';

interface DoubleRuleCardProps {
  children: ReactNode;
  /** Background color (default paper = aged cream) */
  background?: string;
  /** Border color for outer rule (default navy) */
  borderColor?: string;
  /** Inset border color (default faint navy) */
  innerColor?: string;
  style?: ViewStyle;
}

export function DoubleRuleCard({
  children,
  background = HERITAGE_COLORS.paperWarm,
  borderColor = HERITAGE_COLORS.navy,
  innerColor = HERITAGE_COLORS.innerFrame,
  style,
}: DoubleRuleCardProps) {
  return (
    <View
      style={[
        styles.outer,
        { backgroundColor: background, borderColor },
        style,
      ]}
    >
      <View
        pointerEvents="none"
        style={[styles.inner, { borderColor: innerColor }]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderWidth: 1,
    padding: 18,
    position: 'relative',
    marginVertical: 8,
  },
  inner: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderWidth: 1,
  },
});
