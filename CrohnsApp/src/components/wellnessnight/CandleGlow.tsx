/**
 * CandleGlow — optional warm-lit corner glow for hero cards.
 *
 * The mockup tip card (`.d2-tip`) uses a 160deg linear gradient from a warmer
 * surface tone (#1F170E) into the standard surface (#15110B). RN doesn't ship
 * a gradient out of the box, but we approximate with two stacked translucent
 * View layers — a soft sand-tinted glow in the top-left, a deeper warm tone
 * along the top edge — both pointer-events: none so they don't block touches.
 *
 * Used as `<CandleGlow>` inside a `StatCard variant="tip">` to add the cinematic
 * "candle in the corner" feel without requiring expo-linear-gradient.
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import { WELLNESS_NIGHT_COLORS } from './fonts';

interface CandleGlowProps {
  /** Corner the warm glow originates from */
  corner?: 'top-left' | 'top-right';
  /** Intensity multiplier (0 - 1, default 0.55) */
  intensity?: number;
  style?: ViewStyle;
}

export function CandleGlow({
  corner = 'top-left',
  intensity = 0.55,
  style,
}: CandleGlowProps) {
  const tl = corner === 'top-left';
  return (
    <>
      {/* Soft warm wash along the top edge */}
      <View
        pointerEvents="none"
        style={[
          styles.wash,
          { opacity: intensity * 0.5 },
          style,
        ]}
      />
      {/* Concentrated glow in the chosen top corner */}
      <View
        pointerEvents="none"
        style={[
          styles.glow,
          tl ? { left: -20, top: -20 } : { right: -20, top: -20 },
          { opacity: intensity },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: WELLNESS_NIGHT_COLORS.surfaceTint,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor: WELLNESS_NIGHT_COLORS.sand,
    // RN doesn't have a true blur on an arbitrary View, but we lean on a low
    // opacity + large radius so it reads as ambient light over the corner.
    opacity: 0.05,
  },
});
