/**
 * Tiny wrapper around expo-haptics so the rest of the app doesn't have to
 * import from expo-haptics directly, and so we can no-op on web where
 * haptics aren't supported.
 *
 * Usage:
 *   const haptic = useHaptic();
 *   haptic.light();     // button presses, tab taps
 *   haptic.medium();    // toggles, important actions
 *   haptic.success();   // save, log complete
 *   haptic.warning();   // caution food rating
 *   haptic.error();     // red food rating, failed save
 *   haptic.selection(); // picker/slider movement
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const noop = () => {};

export function useHaptic() {
  if (Platform.OS === 'web') {
    return {
      light: noop,
      medium: noop,
      heavy: noop,
      success: noop,
      warning: noop,
      error: noop,
      selection: noop,
    };
  }

  return {
    light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
    success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
    error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
    selection: () => Haptics.selectionAsync(),
  };
}
