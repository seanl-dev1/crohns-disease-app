/**
 * Theme registry — maps theme preset IDs to their full-fidelity component
 * implementations.
 *
 * A theme entry is OPTIONAL. When a preset has no entry here (or the entry
 * is null), the app renders the default (Phase-1 color-token) screens for
 * that preset. When a preset HAS an entry, its Dashboard / ScanResult /
 * Article components replace the defaults, and its tab-bar + header style
 * overrides are applied by the Tabs layout.
 *
 * This lets each theme build (Heritage, Wellness Night, Bold Editorial,
 * Earth Tones, etc.) live in its own folder and register via a single
 * import line here — no edits across multiple shared files.
 */

import type { ComponentType } from 'react';
import type { ThemePresetId } from '../theme/presets';
import type { TextStyle, ViewStyle } from 'react-native';

// ─── Registered themes ──────────────────────────────────────────────────────
// Uncomment each line as the theme's src/themes/<id>/index.ts lands.

import { heritageTheme } from './heritage-apothecary';
import { wellnessNightTheme } from './wellness-night';
import { boldEditorialTheme } from './bold-editorial';
import { earthTonesTheme } from './earth-tones';
// import { clinicalModernTheme } from './clinical-modern';
// import { softPastelTheme } from './soft-pastel';
// import { japandiTheme } from './japandi';
// import { neobrutalistTheme } from './neobrutalist';
// import { liquidGlassTheme } from './liquid-glass';
// import { warmMinimalistTheme } from './warm-minimalist';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ThemeTabBarOverride {
  backgroundColor?: string;
  borderTopColor?: string;
  borderTopWidth?: number;
  activeTintColor?: string;
  inactiveTintColor?: string;
  labelFontFamily?: string;
  labelLetterSpacing?: number;
  labelTextTransform?: TextStyle['textTransform'];
  labelFontSize?: number;
  extraStyle?: ViewStyle;
}

export interface ThemeHeaderOverride {
  backgroundColor?: string;
  tintColor?: string;
  titleFontFamily?: string;
  titleColor?: string;
  titleFontSize?: number;
  /** If true, screen ships its own masthead and the native header is hidden */
  hidden?: boolean;
}

export interface ThemeFontImport {
  pkg: string;
  names: string[];
}

export interface ThemeFontsManifest {
  families: string[];
  imports: ThemeFontImport[];
}

export interface ThemeRegistryEntry {
  id: ThemePresetId;
  /** Dashboard takes no props (reads from store internally) */
  Dashboard: ComponentType<any>;
  /** ScanResult receives the ClassificationResult + scanner control callbacks */
  ScanResult: ComponentType<any>;
  /** Article receives the full KnowledgeArticle or an articleId */
  Article: ComponentType<any>;
  fonts?: ThemeFontsManifest;
  tabBarStyle?: ThemeTabBarOverride;
  header?: ThemeHeaderOverride;
}

export type ThemeRegistry = Partial<Record<ThemePresetId, ThemeRegistryEntry>>;

// ─── The registry ───────────────────────────────────────────────────────────

export const THEME_REGISTRY: ThemeRegistry = {
  'heritage-apothecary': heritageTheme,
  'wellness-night': wellnessNightTheme as any,
  'bold-editorial': boldEditorialTheme as any,
  'earth-tones': earthTonesTheme as any,
  // 'clinical-modern': clinicalModernTheme,
  // 'soft-pastel': softPastelTheme,
  // 'japandi': japandiTheme,
  // 'neobrutalist': neobrutalistTheme,
  // 'liquid-glass': liquidGlassTheme,
  // 'warm-minimalist': warmMinimalistTheme,
};

/** Look up a theme entry; returns undefined if no full-fidelity build exists. */
export function getThemeImpl(
  id: ThemePresetId,
): ThemeRegistryEntry | undefined {
  return THEME_REGISTRY[id];
}
