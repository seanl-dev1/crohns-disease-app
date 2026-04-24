/**
 * PaperTexture — soft paper-grain canvas that sits behind a screen body.
 *
 * Visual spec: the d6 mockup adds a fractal-noise SVG overlay with
 * mix-blend-mode multiply on `.d6 .phone-screen::before`. We can't run an
 * inline SVG filter without react-native-svg, so we approximate the
 * paper-grain feel with stacked translucent oatmeal layers and a single
 * subtle warm-brown tint.
 *
 * It's purely decorative — pointer events disabled, content placed on top.
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import { EARTH_COLORS } from './fonts';

interface PaperTextureProps {
  /** Base canvas color (default oatmeal). */
  background?: string;
  /** Tint strength 0-1 — how visible the warm grain is. Default 0.05. */
  tint?: number;
  style?: ViewStyle;
}

export function PaperTexture({
  background = EARTH_COLORS.oatmeal,
  tint = 0.05,
  style,
}: PaperTextureProps) {
  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: background },
        style,
      ]}
    >
      {/* Layer 1: very soft warm tint to break flat color */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: EARTH_COLORS.bark,
            opacity: tint * 0.35,
          },
        ]}
      />
      {/* Layer 2: faint diagonal vignette to suggest grain falloff */}
      <View
        pointerEvents="none"
        style={[
          styles.vignette,
          { opacity: tint * 0.6 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: EARTH_COLORS.hairline,
    opacity: 0.04,
  },
});
