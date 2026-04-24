/**
 * NightMasthead — top banner for non-tab screens (scan / article).
 *
 * Mockup CSS: `.d2 .scan-header` — back chip on the left, small-caps muted
 * title in the center, right-side spacer. Never bordered (the dark canvas
 * already provides separation).
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WELLNESS_NIGHT_COLORS, WELLNESS_NIGHT_FONTS } from './fonts';

interface NightMastheadProps {
  title: string;
  onBack?: () => void;
  /** Optional right-side glyph (e.g. a star or a kebab) */
  right?: string;
  onRightPress?: () => void;
}

export function NightMasthead({
  title,
  onBack,
  right,
  onRightPress,
}: NightMastheadProps) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.chip}
        >
          <Text style={styles.chipText}>{'\u2039'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.chipSpacer} />
      )}

      <Text style={styles.title}>{title}</Text>

      {right ? (
        <TouchableOpacity
          onPress={onRightPress}
          accessibilityRole="button"
          style={styles.chip}
        >
          <Text style={styles.chipText}>{right}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.chipSpacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 14,
  },
  chip: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: WELLNESS_NIGHT_COLORS.surface,
    borderWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSpacer: {
    width: 36,
    height: 36,
  },
  chipText: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 14,
    color: WELLNESS_NIGHT_COLORS.text,
  },
  title: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 12.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: WELLNESS_NIGHT_COLORS.textSubtle,
  },
});
