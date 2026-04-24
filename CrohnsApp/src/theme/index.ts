import { useColorScheme } from 'react-native';
import { colors, type ThemeColors, type ColorScheme } from './colors';
import { spacing, sizing, typography, elevation, motion } from './spacing';

export { colors, spacing, sizing, typography, elevation, motion };
export type { ThemeColors, ColorScheme };

/**
 * Hook to get current theme colors based on system setting.
 * Respects user's OS dark/light mode preference.
 */
export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? colors.dark : colors.light;
}

/**
 * Hook to check if dark mode is active.
 */
export function useIsDark(): boolean {
  const scheme = useColorScheme();
  return scheme === 'dark';
}
