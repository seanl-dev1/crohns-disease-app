/**
 * ForestButton — rounded button in forest green, clay accent on press.
 *
 * Visual spec: the d6 mockup doesn't ship a single button class, but the
 * style follows the rest of the field-journal palette:
 *   - solid: forest #2B4A3F bg, oatmeal #F0EADC text
 *   - ghost: transparent bg, hairline #C9BEA5 border, ink #1E1B15 text
 *   - clay : clay  #B56638 bg, oatmeal text — used for "Gentler alternative"
 *
 * Press state shifts the solid variant to clay (#B56638) — a quiet visual
 * cue that the surface is alive without the harshness of a flat hover.
 *
 * Text is Inter SemiBold uppercase with 1.6 tracking, matching the small
 * caps used elsewhere in the d6 system.
 */

import { useState } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { EARTH_COLORS, EARTH_FONTS } from './fonts';

interface ForestButtonProps {
  label: string;
  onPress?: () => void;
  /** Visual variant. Default 'solid'. */
  variant?: 'solid' | 'ghost' | 'clay';
  /** Disable press handling and dim the surface. */
  disabled?: boolean;
  /** Accessibility label. Defaults to `label`. */
  accessibilityLabel?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ForestButton({
  label,
  onPress,
  variant = 'solid',
  disabled = false,
  accessibilityLabel,
  style,
  textStyle,
}: ForestButtonProps) {
  const [pressed, setPressed] = useState(false);

  const surfaceStyles =
    variant === 'ghost'
      ? styles.ghost
      : variant === 'clay'
      ? styles.clay
      : pressed
      ? styles.solidPressed
      : styles.solid;

  const labelStyles =
    variant === 'ghost' ? styles.labelGhost : styles.labelInverse;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      style={({ pressed: rnPressed }) => [
        styles.base,
        surfaceStyles,
        rnPressed && variant === 'solid' ? styles.solidPressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <Text style={[styles.label, labelStyles, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: EARTH_COLORS.forest,
    borderWidth: 1,
    borderColor: EARTH_COLORS.forest,
  },
  solidPressed: {
    backgroundColor: EARTH_COLORS.clay,
    borderWidth: 1,
    borderColor: EARTH_COLORS.clay,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
  },
  clay: {
    backgroundColor: EARTH_COLORS.clay,
    borderWidth: 1,
    borderColor: EARTH_COLORS.clay,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  labelInverse: {
    color: EARTH_COLORS.oatmeal,
  },
  labelGhost: {
    color: EARTH_COLORS.ink,
  },
});
