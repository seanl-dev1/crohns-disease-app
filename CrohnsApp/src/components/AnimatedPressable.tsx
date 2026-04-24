/**
 * AnimatedPressable — shared press-animation wrapper.
 *
 * Every interactive element should use this instead of raw TouchableOpacity
 * or Pressable. Gives every press:
 *  - Spring scale animation (0.98 on press-in, 1 on release)
 *  - Haptic light-impact feedback (no-op on web)
 *  - Consistent accessibility defaults
 *
 * Usage:
 *   <AnimatedPressable onPress={handlePress} style={styles.button}>
 *     <Text>Tap me</Text>
 *   </AnimatedPressable>
 *
 * Why springs not timing curves: 2025-2026 design consensus favors
 * physics-based motion. Feels more natural, self-correcting under
 * interrupts, and easier to tune.
 */

import { forwardRef, type PropsWithChildren, type Ref } from 'react';
import {
  Pressable,
  type PressableProps,
  type View,
  type ViewStyle,
  type StyleProp,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { useHaptic } from '../hooks/useHaptic';
import { motion } from '../theme';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

export interface AnimatedPressableProps extends PressableProps {
  /** Scale factor applied on press (default 0.98 — gentle) */
  pressScale?: number;
  /** Whether to fire haptic on press-in (default true) */
  enableHaptic?: boolean;
  /** Haptic strength (default 'light') */
  hapticStrength?: 'light' | 'medium' | 'selection';
  style?: StyleProp<ViewStyle>;
}

export const AnimatedPressable = forwardRef(function AnimatedPressable(
  {
    children,
    pressScale = 0.98,
    enableHaptic = true,
    hapticStrength = 'light',
    style,
    onPressIn,
    onPressOut,
    ...rest
  }: PropsWithChildren<AnimatedPressableProps>,
  ref: Ref<View>,
) {
  const scale = useSharedValue(1);
  const haptic = useHaptic();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableBase
      ref={ref as any}
      style={[animatedStyle, style]}
      onPressIn={(e) => {
        scale.value = withSpring(pressScale, motion.spring.snappy);
        if (enableHaptic && Platform.OS !== 'web') {
          haptic[hapticStrength]();
        }
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, motion.spring.snappy);
        onPressOut?.(e);
      }}
      {...rest}
    >
      {children}
    </AnimatedPressableBase>
  );
});
