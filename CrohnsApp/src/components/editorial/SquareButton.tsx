/**
 * SquareButton — sharp-cornered black button with terracotta pressed state.
 *
 * The bold-editorial preset declares `flavor.buttonShape = 'square'` and
 * `radiusScale = 'tight'` — every CTA in the mockup has zero corner radius
 * and crisp 1px borders.
 *
 * Three tones map to the three CTA jobs in the mockup:
 *   - "primary"   black fill, cream label  (e.g. "Save", "Examine another")
 *   - "ghost"     transparent fill, ink border + ink label
 *   - "accent"    transparent fill, terracotta border + terracotta label
 *                 (used for secondary actions / "revise")
 *
 * On press, primary darkens slightly and ghost/accent flip to terracotta
 * to reinforce the accent color as the universal interaction signal.
 */

import { useState, type ReactNode } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
  type GestureResponderEvent,
} from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from './fonts';

type Tone = 'primary' | 'ghost' | 'accent';

interface SquareButtonProps {
  children: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  tone?: Tone;
  /** Fill the available row width (default false). */
  block?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

export function SquareButton({
  children,
  onPress,
  tone = 'primary',
  block = false,
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}: SquareButtonProps) {
  const [pressed, setPressed] = useState(false);

  const visualState = pressed ? PRESSED_BY_TONE[tone] : RESTING_BY_TONE[tone];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ??
        (typeof children === 'string' ? children : undefined)
      }
      style={[
        styles.btn,
        {
          backgroundColor: visualState.bg,
          borderColor: visualState.border,
        },
        block ? styles.block : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.label,
            { color: visualState.label },
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const RESTING_BY_TONE: Record<Tone, { bg: string; border: string; label: string }> = {
  primary: {
    bg: EDITORIAL_COLORS.ink,
    border: EDITORIAL_COLORS.ink,
    label: EDITORIAL_COLORS.cream,
  },
  ghost: {
    bg: 'transparent',
    border: EDITORIAL_COLORS.ink,
    label: EDITORIAL_COLORS.ink,
  },
  accent: {
    bg: 'transparent',
    border: EDITORIAL_COLORS.terracotta,
    label: EDITORIAL_COLORS.terracotta,
  },
};

const PRESSED_BY_TONE: Record<Tone, { bg: string; border: string; label: string }> = {
  primary: {
    bg: EDITORIAL_COLORS.terracotta,
    border: EDITORIAL_COLORS.terracotta,
    label: EDITORIAL_COLORS.cream,
  },
  ghost: {
    bg: 'transparent',
    border: EDITORIAL_COLORS.terracotta,
    label: EDITORIAL_COLORS.terracotta,
  },
  accent: {
    bg: EDITORIAL_COLORS.terracottaSoft,
    border: EDITORIAL_COLORS.terracotta,
    label: EDITORIAL_COLORS.terracotta,
  },
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 0, // sharp corners — flavor.buttonShape = 'square'
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontFamily: EDITORIAL_FONTS.bodyBold,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
});
