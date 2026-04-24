/**
 * Fleuron — centered ornamental divider using the ❦ Unicode glyph.
 *
 * Mockup usage:
 * - Three fleurons "❦ ❦ ❦" between sections (`.d10-fleuron`, `.d10-fleur-center`)
 * - Two fleurons "❦ ❦" inside small notes (`.d10-fleuron-sm`)
 * - Size param tunes for tight vs airy placement
 */

import { Text, StyleSheet, View, type ViewStyle } from 'react-native';
import { HERITAGE_COLORS } from './fonts';

interface FleuronProps {
  count?: 1 | 2 | 3;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Fleuron({ count = 3, size = 'md', style }: FleuronProps) {
  const glyphs = '\u2767 '.repeat(count).trim();
  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.glyph, sizes[size]]}>{glyphs}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  glyph: {
    color: HERITAGE_COLORS.copper,
    textAlign: 'center',
  },
});

const sizes = StyleSheet.create({
  sm: { fontSize: 12, letterSpacing: 6 },
  md: { fontSize: 14, letterSpacing: 8 },
  lg: { fontSize: 16, letterSpacing: 10 },
});
