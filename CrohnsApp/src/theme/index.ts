import { useColorScheme } from 'react-native';
import { colors, type ThemeColors, type ColorScheme } from './colors';
import { spacing, sizing, typography, elevation, motion } from './spacing';
import {
  THEME_PRESETS,
  THEME_PRESET_ORDER,
  DEFAULT_PRESET,
  type ThemePresetId,
  type ThemePreset,
  type ThemeFlavor,
  type ColorMode,
} from './presets';
import { useAppStore } from '../store/useAppStore';

export { colors, spacing, sizing, typography, elevation, motion };
export { THEME_PRESETS, THEME_PRESET_ORDER, DEFAULT_PRESET };
export type {
  ThemeColors, ColorScheme,
  ThemePresetId, ThemePreset, ThemeFlavor, ColorMode,
};

/**
 * Returns the active color theme based on the user's selected preset
 * and current color mode (light/dark from system, overridden by preset lock).
 */
export function useThemeColors(): ThemeColors {
  const systemScheme = useColorScheme();
  const presetId = useAppStore((s) => s.themePreset) ?? DEFAULT_PRESET;
  const preset = THEME_PRESETS[presetId] ?? THEME_PRESETS[DEFAULT_PRESET];
  const mode: ColorMode =
    preset.fixedColorMode ?? (systemScheme === 'dark' ? 'dark' : 'light');
  return mode === 'dark' ? preset.dark : preset.light;
}

/** Returns the full active preset (for components that need flavor flags). */
export function useThemePreset(): ThemePreset {
  const presetId = useAppStore((s) => s.themePreset) ?? DEFAULT_PRESET;
  return THEME_PRESETS[presetId] ?? THEME_PRESETS[DEFAULT_PRESET];
}

/** Returns the active color mode, accounting for preset locks. */
export function useColorMode(): ColorMode {
  const systemScheme = useColorScheme();
  const presetId = useAppStore((s) => s.themePreset) ?? DEFAULT_PRESET;
  const preset = THEME_PRESETS[presetId] ?? THEME_PRESETS[DEFAULT_PRESET];
  return preset.fixedColorMode ?? (systemScheme === 'dark' ? 'dark' : 'light');
}

/** Returns true when dark mode is active (either by system or preset lock). */
export function useIsDark(): boolean {
  return useColorMode() === 'dark';
}
