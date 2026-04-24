/**
 * NightButton — pill button used across the Wellness Night theme.
 *
 * Variants:
 *   - 'primary' : filled warm-sand on dark, dark text inside the pill
 *   - 'ghost'   : transparent surface, sand-toned border, sand label
 *   - 'subtle'  : surface-elevated background, muted text
 *
 * Mockup references: the daily-tip CTA at the bottom of `.d2-tip`,
 * the "Examine another / Return" footer on the scan result mockup,
 * and the inline next/prev pills inside articles.
 */

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { WELLNESS_NIGHT_COLORS, WELLNESS_NIGHT_FONTS } from './fonts';

interface NightButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'ghost' | 'subtle';
  /** Override the label color */
  labelColor?: string;
  /** Optional trailing glyph (e.g. "›") */
  trailing?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function NightButton({
  label,
  onPress,
  variant = 'primary',
  labelColor,
  trailing,
  style,
  labelStyle,
  disabled = false,
  fullWidth = false,
}: NightButtonProps) {
  const palette = STYLES[variant];
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        styles.base,
        palette.container,
        fullWidth && { alignSelf: 'stretch' },
        disabled && { opacity: 0.45 },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          palette.label,
          labelColor ? { color: labelColor } : null,
          labelStyle,
        ]}
      >
        {label}
        {trailing ? (
          <Text style={styles.trailing}>
            {'  '}
            {trailing}
          </Text>
        ) : null}
      </Text>
    </TouchableOpacity>
  );
}

const STYLES: Record<
  'primary' | 'ghost' | 'subtle',
  { container: ViewStyle; label: TextStyle }
> = {
  primary: {
    container: {
      backgroundColor: WELLNESS_NIGHT_COLORS.sand,
      borderColor: WELLNESS_NIGHT_COLORS.sandLight,
      borderWidth: 1,
    },
    label: {
      color: WELLNESS_NIGHT_COLORS.canvas,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
      borderColor: WELLNESS_NIGHT_COLORS.sand,
      borderWidth: 1,
    },
    label: {
      color: WELLNESS_NIGHT_COLORS.sand,
    },
  },
  subtle: {
    container: {
      backgroundColor: WELLNESS_NIGHT_COLORS.surface,
      borderColor: WELLNESS_NIGHT_COLORS.border,
      borderWidth: 1,
    },
    label: {
      color: WELLNESS_NIGHT_COLORS.text,
    },
  },
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 12.5,
    letterSpacing: 0.5,
  },
  trailing: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
  },
});
