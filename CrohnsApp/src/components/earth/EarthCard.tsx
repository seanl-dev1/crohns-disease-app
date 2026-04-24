/**
 * EarthCard — paper-warm card surface with hairline border and optional
 * botanical corner flourish.
 *
 * Visual spec:
 *   `.d6 .d6-card`     bg #E9E0CE · 1px #C9BEA5 · radius 6 · pad 16
 *   `.d6 .d6-reasons`  same recipe with pad 18
 *   `.d6 .d6-quick > .d6-q` smaller variant with pad 12 6
 *
 * The variant 'tip' switches to a forest-green gradient surface used for the
 * "Gentle reminder" callout (`.d6 .d6-tip`). It stays a single ViewStyle
 * (no react-native-linear-gradient available in the project) — we lay a
 * solid forest base and overlay a faint forestDeep panel at the top to
 * suggest the gradient direction in the mockup.
 *
 * The variant 'hero' is borderless / transparent — used inside the
 * masthead + greet blocks where the card recipe shouldn't apply.
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { EARTH_COLORS } from './fonts';
import { BotanicalCorner } from './BotanicalCorner';

interface EarthCardProps {
  children: ReactNode;
  /** Card visual variant. Default 'paper'. */
  variant?: 'paper' | 'tip' | 'hero';
  /** Render a small leaf flourish in a corner. */
  flourish?: false | 'top-right' | 'bottom-right';
  /** Padding override (default 16 for paper, 18 for tip). */
  padding?: number;
  style?: ViewStyle;
}

export function EarthCard({
  children,
  variant = 'paper',
  flourish = false,
  padding,
  style,
}: EarthCardProps) {
  const isTip = variant === 'tip';
  const isHero = variant === 'hero';

  return (
    <View
      style={[
        styles.base,
        isHero ? styles.hero : isTip ? styles.tip : styles.paper,
        { padding: padding ?? (isTip ? 18 : 16) },
        style,
      ]}
    >
      {/* Tip variant: layer a darker panel on top to fake the gradient */}
      {isTip ? (
        <View pointerEvents="none" style={styles.tipGradientTop} />
      ) : null}

      {flourish && !isHero ? (
        <BotanicalCorner
          position={flourish}
          color={isTip ? EARTH_COLORS.clayLight : EARTH_COLORS.forest}
          opacity={isTip ? 0.18 : 0.5}
          size={flourish === 'bottom-right' ? 'md' : 'sm'}
        />
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  paper: {
    backgroundColor: EARTH_COLORS.paperWarm,
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
  },
  tip: {
    backgroundColor: EARTH_COLORS.forest,
    borderWidth: 1,
    borderColor: EARTH_COLORS.forest,
  },
  tipGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: EARTH_COLORS.forestDeep,
    opacity: 0.22,
  },
  hero: {
    backgroundColor: 'transparent',
  },
});
