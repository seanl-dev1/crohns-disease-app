/**
 * Theme presets — 10 distinct visual directions users can pick.
 *
 * Phase 1 scope (this file): color palette + radii + shadow style + flavor flags.
 * Phase 2 (follow-up): custom font loading per preset.
 * Phase 3 (polish): per-preset component variants (glass panels, thick borders, etc.).
 *
 * Every screen in the app reads from useThemeColors() which returns the
 * active preset's colors. Radii and elevation come from the preset too.
 * Flavor flags let specific components opt into preset-specific treatments.
 */

import type { ThemeColors } from './colors';

export type ThemePresetId =
  | 'warm-minimalist'
  | 'wellness-night'
  | 'clinical-modern'
  | 'soft-pastel'
  | 'bold-editorial'
  | 'earth-tones'
  | 'japandi'
  | 'neobrutalist'
  | 'liquid-glass'
  | 'heritage-apothecary';

export type ColorMode = 'light' | 'dark';

export interface ThemeFlavor {
  /** Button shape identity */
  buttonShape: 'rounded' | 'pill' | 'square';
  /** Card border style */
  cardBorder: 'none' | 'hairline' | 'thick-black' | 'double-line';
  /** Card shadow style */
  cardShadow: 'none' | 'soft' | 'hard-offset' | 'glass-blur';
  /** Radius sizing preference */
  radiusScale: 'tight' | 'standard' | 'generous' | 'ultra';
  /** Typography identity */
  heroTypeStyle: 'sans-modern' | 'serif-elegant' | 'serif-display' | 'grotesque-bold';
  /** Decorative accent style (used where ornament makes sense) */
  ornament: 'none' | 'botanical' | 'fleurons' | 'geometric' | 'minimal-line';
  /** Overall surface treatment */
  surfaceTreatment: 'flat' | 'elevated' | 'glass' | 'bordered' | 'textured';
}

export interface ThemePreset {
  id: ThemePresetId;
  name: string;
  tagline: string;
  description: string;
  /** Some presets lock to a single color mode; others follow system */
  fixedColorMode?: ColorMode;
  /** Light-mode colors (required for every preset) */
  light: ThemeColors;
  /** Dark-mode colors (required for every preset, even dark-only ones) */
  dark: ThemeColors;
  flavor: ThemeFlavor;
  /** Preview swatches shown in the theme picker (usually 4 colors) */
  previewSwatches: [string, string, string, string];
}

// ─── Helpers for consistent preset construction ─────────────────────────────

const STANDARD_RADIUS = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, round: 999 };

// ─── Preset 1: Warm Minimalist Health ───────────────────────────────────────

const warmMinimalist: ThemePreset = {
  id: 'warm-minimalist',
  name: 'Warm Minimalist',
  tagline: 'Sage-teal on warm off-white',
  description: 'Calm, breathing, healing. Generous whitespace, soft elevation.',
  light: {
    background: '#FAFAF7', surface: '#F3F1EC', surfaceElevated: '#FFFFFF', card: '#FFFFFF',
    text: '#1C1B17', textSecondary: '#5F5B54', textTertiary: '#9A948A', textInverse: '#FAFAF7',
    primary: '#2F6F6A', primaryLight: '#DDEBE8', primaryDark: '#1F524E',
    safe: '#5C9B7A', safeBackground: '#E6F0EA',
    caution: '#D18B4A', cautionBackground: '#FAEFDE',
    danger: '#CA5A4A', dangerBackground: '#FAE6E1',
    feelingGreat: '#5C9B7A', feelingGood: '#7FB088', feelingOkay: '#D4A45E',
    feelingBad: '#D07F54', feelingTerrible: '#CA5A4A',
    border: '#E6E3DB', borderLight: '#EFEDE6', divider: '#EDEAE1',
    disabled: '#BFBAB1', placeholder: '#9A948A', icon: '#6B665D', iconActive: '#2F6F6A',
    tabBar: '#FFFFFF', tabBarBorder: '#E6E3DB', tabActive: '#2F6F6A', tabInactive: '#9A948A',
    inputBackground: '#F3F1EC', inputBorder: '#E6E3DB', inputFocusBorder: '#2F6F6A',
    shadowColor: '#1C1B17',
  },
  dark: {
    background: '#000000', surface: '#15130F', surfaceElevated: '#1E1B16', card: '#1E1B16',
    text: '#E8E4DB', textSecondary: '#A8A296', textTertiary: '#6F6A60', textInverse: '#1C1B17',
    primary: '#5FB3AB', primaryLight: '#1C2E2B', primaryDark: '#3D8F87',
    safe: '#7DBD97', safeBackground: '#1B2B22',
    caution: '#E8A867', cautionBackground: '#2E2318',
    danger: '#E17A6B', dangerBackground: '#2E1B18',
    feelingGreat: '#7DBD97', feelingGood: '#97D1A3', feelingOkay: '#E8BE7F',
    feelingBad: '#E59874', feelingTerrible: '#E17A6B',
    border: '#2B2822', borderLight: '#1F1D18', divider: '#25221D',
    disabled: '#4A463E', placeholder: '#6F6A60', icon: '#A8A296', iconActive: '#5FB3AB',
    tabBar: '#0B0A08', tabBarBorder: '#2B2822', tabActive: '#5FB3AB', tabInactive: '#6F6A60',
    inputBackground: '#1E1B16', inputBorder: '#2B2822', inputFocusBorder: '#5FB3AB',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'pill', cardBorder: 'none', cardShadow: 'soft',
    radiusScale: 'standard', heroTypeStyle: 'sans-modern',
    ornament: 'none', surfaceTreatment: 'elevated',
  },
  previewSwatches: ['#FAFAF7', '#2F6F6A', '#5C9B7A', '#CA5A4A'],
};

// ─── Preset 2: Premium Wellness Night ───────────────────────────────────────

const wellnessNight: ThemePreset = {
  id: 'wellness-night',
  name: 'Wellness Night',
  tagline: 'OLED dark with warm sand accents',
  description: 'Cinematic, premium, calm-at-night. Elegant serif heros.',
  fixedColorMode: 'dark',
  light: {
    background: '#F6F0E6', surface: '#EBE3D2', surfaceElevated: '#FFFFFF', card: '#FFFFFF',
    text: '#2A2520', textSecondary: '#6B6258', textTertiary: '#A89F93', textInverse: '#F6F0E6',
    primary: '#8B5E2B', primaryLight: '#F0E4D0', primaryDark: '#5F3D15',
    safe: '#6B8E5F', safeBackground: '#EDF2E6',
    caution: '#B88B3A', cautionBackground: '#F4E9D1',
    danger: '#B55A4A', dangerBackground: '#F5E2DD',
    feelingGreat: '#6B8E5F', feelingGood: '#8CA87B', feelingOkay: '#C59A55',
    feelingBad: '#C07F5C', feelingTerrible: '#B55A4A',
    border: '#DDD2BE', borderLight: '#E8DFCE', divider: '#E4D9C3',
    disabled: '#BDB4A6', placeholder: '#A89F93', icon: '#6B6258', iconActive: '#8B5E2B',
    tabBar: '#FFFFFF', tabBarBorder: '#DDD2BE', tabActive: '#8B5E2B', tabInactive: '#A89F93',
    inputBackground: '#EBE3D2', inputBorder: '#DDD2BE', inputFocusBorder: '#8B5E2B',
    shadowColor: '#2A2520',
  },
  dark: {
    background: '#0A0908', surface: '#141210', surfaceElevated: '#1C1A17', card: '#1C1A17',
    text: '#E8DFD0', textSecondary: '#B0A593', textTertiary: '#6F6558', textInverse: '#0A0908',
    primary: '#D4AF8C', primaryLight: '#2A1F14', primaryDark: '#A07F5C',
    safe: '#94C583', safeBackground: '#1D2B1B',
    caution: '#E8B865', cautionBackground: '#2D2316',
    danger: '#E27A68', dangerBackground: '#2E1A17',
    feelingGreat: '#94C583', feelingGood: '#ABD59A', feelingOkay: '#E8BE7F',
    feelingBad: '#E59874', feelingTerrible: '#E27A68',
    border: '#2A2620', borderLight: '#1F1C18', divider: '#26231D',
    disabled: '#4F4A42', placeholder: '#6F6558', icon: '#B0A593', iconActive: '#D4AF8C',
    tabBar: '#0F0D0B', tabBarBorder: '#2A2620', tabActive: '#D4AF8C', tabInactive: '#6F6558',
    inputBackground: '#1C1A17', inputBorder: '#2A2620', inputFocusBorder: '#D4AF8C',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'pill', cardBorder: 'none', cardShadow: 'soft',
    radiusScale: 'generous', heroTypeStyle: 'serif-elegant',
    ornament: 'minimal-line', surfaceTreatment: 'elevated',
  },
  previewSwatches: ['#0A0908', '#D4AF8C', '#E8DFD0', '#94C583'],
};

// ─── Preset 3: Clinical Modern (Apple Health style) ─────────────────────────

const clinicalModern: ThemePreset = {
  id: 'clinical-modern',
  name: 'Clinical Modern',
  tagline: 'Apple Health style — data forward',
  description: 'Crisp whites, iOS blue, big stats. Trustworthy and medical.',
  light: {
    background: '#F2F2F7', surface: '#FFFFFF', surfaceElevated: '#FFFFFF', card: '#FFFFFF',
    text: '#000000', textSecondary: '#3C3C43', textTertiary: '#8E8E93', textInverse: '#FFFFFF',
    primary: '#007AFF', primaryLight: '#E5F0FF', primaryDark: '#0051D5',
    safe: '#34C759', safeBackground: '#E8F9EC',
    caution: '#FF9500', cautionBackground: '#FFF1DD',
    danger: '#FF3B30', dangerBackground: '#FFE4E1',
    feelingGreat: '#34C759', feelingGood: '#5EC97F', feelingOkay: '#FF9500',
    feelingBad: '#FF6B35', feelingTerrible: '#FF3B30',
    border: '#D1D1D6', borderLight: '#E5E5EA', divider: '#E5E5EA',
    disabled: '#C7C7CC', placeholder: '#8E8E93', icon: '#8E8E93', iconActive: '#007AFF',
    tabBar: '#FFFFFF', tabBarBorder: '#D1D1D6', tabActive: '#007AFF', tabInactive: '#8E8E93',
    inputBackground: '#FFFFFF', inputBorder: '#D1D1D6', inputFocusBorder: '#007AFF',
    shadowColor: '#000000',
  },
  dark: {
    background: '#000000', surface: '#1C1C1E', surfaceElevated: '#2C2C2E', card: '#1C1C1E',
    text: '#FFFFFF', textSecondary: '#EBEBF5', textTertiary: '#8E8E93', textInverse: '#000000',
    primary: '#0A84FF', primaryLight: '#0A2E5C', primaryDark: '#0051D5',
    safe: '#30D158', safeBackground: '#1F3A27',
    caution: '#FF9F0A', cautionBackground: '#3A2D16',
    danger: '#FF453A', dangerBackground: '#3A1B1A',
    feelingGreat: '#30D158', feelingGood: '#5CD97A', feelingOkay: '#FF9F0A',
    feelingBad: '#FF7A45', feelingTerrible: '#FF453A',
    border: '#38383A', borderLight: '#2C2C2E', divider: '#38383A',
    disabled: '#48484A', placeholder: '#8E8E93', icon: '#8E8E93', iconActive: '#0A84FF',
    tabBar: '#1C1C1E', tabBarBorder: '#38383A', tabActive: '#0A84FF', tabInactive: '#8E8E93',
    inputBackground: '#1C1C1E', inputBorder: '#38383A', inputFocusBorder: '#0A84FF',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'rounded', cardBorder: 'none', cardShadow: 'soft',
    radiusScale: 'standard', heroTypeStyle: 'sans-modern',
    ornament: 'none', surfaceTreatment: 'flat',
  },
  previewSwatches: ['#F2F2F7', '#007AFF', '#34C759', '#FF3B30'],
};

// ─── Preset 4: Soft Organic Pastel ──────────────────────────────────────────

const softPastel: ThemePreset = {
  id: 'soft-pastel',
  name: 'Soft Pastel',
  tagline: 'Playful peach + mint + lavender',
  description: 'Cozy, friendly, not intimidating. Rounded everything.',
  light: {
    background: '#FFF8F0', surface: '#FFE8D6', surfaceElevated: '#FFFFFF', card: '#FFFFFF',
    text: '#4A3728', textSecondary: '#816A56', textTertiary: '#B0957B', textInverse: '#FFF8F0',
    primary: '#E99465', primaryLight: '#FFE8D6', primaryDark: '#C47141',
    safe: '#8DC498', safeBackground: '#E0F0E3',
    caution: '#EEC788', cautionBackground: '#FCF1DC',
    danger: '#E58B7F', dangerBackground: '#FCE5E1',
    feelingGreat: '#8DC498', feelingGood: '#B3D9B5', feelingOkay: '#EEC788',
    feelingBad: '#EEA688', feelingTerrible: '#E58B7F',
    border: '#F5DFC8', borderLight: '#FBEDDB', divider: '#F2E2CC',
    disabled: '#D4BFA5', placeholder: '#B0957B', icon: '#816A56', iconActive: '#E99465',
    tabBar: '#FFFFFF', tabBarBorder: '#F5DFC8', tabActive: '#E99465', tabInactive: '#B0957B',
    inputBackground: '#FFE8D6', inputBorder: '#F5DFC8', inputFocusBorder: '#E99465',
    shadowColor: '#4A3728',
  },
  dark: {
    background: '#1F1814', surface: '#2B1F17', surfaceElevated: '#382A1F', card: '#382A1F',
    text: '#FCE4CC', textSecondary: '#C9AE93', textTertiary: '#8A7663', textInverse: '#1F1814',
    primary: '#F5A477', primaryLight: '#3D2619', primaryDark: '#C47141',
    safe: '#A6D4AE', safeBackground: '#1F2B22',
    caution: '#F4D39E', cautionBackground: '#2D2418',
    danger: '#F29A8E', dangerBackground: '#2D1B18',
    feelingGreat: '#A6D4AE', feelingGood: '#BFE1C2', feelingOkay: '#F4D39E',
    feelingBad: '#F2B797', feelingTerrible: '#F29A8E',
    border: '#3B2B1F', borderLight: '#2F2318', divider: '#362818',
    disabled: '#5A463A', placeholder: '#8A7663', icon: '#C9AE93', iconActive: '#F5A477',
    tabBar: '#261C15', tabBarBorder: '#3B2B1F', tabActive: '#F5A477', tabInactive: '#8A7663',
    inputBackground: '#382A1F', inputBorder: '#3B2B1F', inputFocusBorder: '#F5A477',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'pill', cardBorder: 'none', cardShadow: 'soft',
    radiusScale: 'ultra', heroTypeStyle: 'sans-modern',
    ornament: 'minimal-line', surfaceTreatment: 'elevated',
  },
  previewSwatches: ['#FFF8F0', '#E99465', '#8DC498', '#D1C4E9'],
};

// ─── Preset 5: Bold Editorial ───────────────────────────────────────────────

const boldEditorial: ThemePreset = {
  id: 'bold-editorial',
  name: 'Bold Editorial',
  tagline: 'Magazine feel — cream + terracotta',
  description: 'Premium publication aesthetic. Serif heros, drop caps, hairlines.',
  light: {
    background: '#F7F3EC', surface: '#EFE8D8', surfaceElevated: '#FFFFFF', card: '#FFFFFF',
    text: '#1A1A1A', textSecondary: '#4A4540', textTertiary: '#87817A', textInverse: '#F7F3EC',
    primary: '#C85A3E', primaryLight: '#F5DDD2', primaryDark: '#8A3E28',
    safe: '#527C5F', safeBackground: '#E0ECDE',
    caution: '#B07B2F', cautionBackground: '#F3E6CC',
    danger: '#A04030', dangerBackground: '#F3D9CF',
    feelingGreat: '#527C5F', feelingGood: '#779973', feelingOkay: '#B07B2F',
    feelingBad: '#B85B3A', feelingTerrible: '#A04030',
    border: '#1A1A1A', borderLight: '#D6CFC0', divider: '#D6CFC0',
    disabled: '#A89F92', placeholder: '#87817A', icon: '#4A4540', iconActive: '#C85A3E',
    tabBar: '#F7F3EC', tabBarBorder: '#1A1A1A', tabActive: '#C85A3E', tabInactive: '#87817A',
    inputBackground: '#EFE8D8', inputBorder: '#1A1A1A', inputFocusBorder: '#C85A3E',
    shadowColor: '#1A1A1A',
  },
  dark: {
    background: '#1A1814', surface: '#22201B', surfaceElevated: '#2B2822', card: '#2B2822',
    text: '#F7F3EC', textSecondary: '#BDB5A6', textTertiary: '#726B5D', textInverse: '#1A1814',
    primary: '#E47A5C', primaryLight: '#3A1F15', primaryDark: '#B04A30',
    safe: '#7FA58C', safeBackground: '#1F2B24',
    caution: '#D4A55F', cautionBackground: '#2D2418',
    danger: '#C86456', dangerBackground: '#2D1B17',
    feelingGreat: '#7FA58C', feelingGood: '#9EBBA6', feelingOkay: '#D4A55F',
    feelingBad: '#D47E5F', feelingTerrible: '#C86456',
    border: '#F7F3EC', borderLight: '#3B3830', divider: '#3B3830',
    disabled: '#4F4A42', placeholder: '#726B5D', icon: '#BDB5A6', iconActive: '#E47A5C',
    tabBar: '#1A1814', tabBarBorder: '#F7F3EC', tabActive: '#E47A5C', tabInactive: '#726B5D',
    inputBackground: '#2B2822', inputBorder: '#F7F3EC', inputFocusBorder: '#E47A5C',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'square', cardBorder: 'hairline', cardShadow: 'none',
    radiusScale: 'tight', heroTypeStyle: 'serif-display',
    ornament: 'fleurons', surfaceTreatment: 'bordered',
  },
  previewSwatches: ['#F7F3EC', '#1A1A1A', '#C85A3E', '#527C5F'],
};

// ─── Preset 6: Nature-Grounded Earth Tones ──────────────────────────────────

const earthTones: ThemePreset = {
  id: 'earth-tones',
  name: 'Earth Tones',
  tagline: 'Forest + clay + warm browns',
  description: 'Grounded, hiking-magazine, connected to nature.',
  light: {
    background: '#F0EADC', surface: '#E5DCC9', surfaceElevated: '#FAF4E7', card: '#FAF4E7',
    text: '#1E1B15', textSecondary: '#4E4736', textTertiary: '#8A8170', textInverse: '#F0EADC',
    primary: '#2B4A3F', primaryLight: '#D6E2DB', primaryDark: '#1A2F28',
    safe: '#3F6E4A', safeBackground: '#DAE8DE',
    caution: '#B56638', cautionBackground: '#F0D9C8',
    danger: '#B03A28', dangerBackground: '#F0D3CD',
    feelingGreat: '#3F6E4A', feelingGood: '#668A6C', feelingOkay: '#B58741',
    feelingBad: '#B56638', feelingTerrible: '#B03A28',
    border: '#D0C5AE', borderLight: '#DED4BE', divider: '#D4CAB4',
    disabled: '#B0A58F', placeholder: '#8A8170', icon: '#4E4736', iconActive: '#2B4A3F',
    tabBar: '#FAF4E7', tabBarBorder: '#D0C5AE', tabActive: '#2B4A3F', tabInactive: '#8A8170',
    inputBackground: '#E5DCC9', inputBorder: '#D0C5AE', inputFocusBorder: '#2B4A3F',
    shadowColor: '#1E1B15',
  },
  dark: {
    background: '#121210', surface: '#1A1A17', surfaceElevated: '#24231E', card: '#24231E',
    text: '#E8E2CE', textSecondary: '#ADA593', textTertiary: '#706A5B', textInverse: '#121210',
    primary: '#6FA58C', primaryLight: '#1F2B24', primaryDark: '#4A7A64',
    safe: '#7FB084', safeBackground: '#1F2B22',
    caution: '#E09466', cautionBackground: '#2D2116',
    danger: '#DA6A54', dangerBackground: '#2D1815',
    feelingGreat: '#7FB084', feelingGood: '#A0C8A5', feelingOkay: '#E0B078',
    feelingBad: '#E09466', feelingTerrible: '#DA6A54',
    border: '#2D2B23', borderLight: '#211F1A', divider: '#27251E',
    disabled: '#4E4A3F', placeholder: '#706A5B', icon: '#ADA593', iconActive: '#6FA58C',
    tabBar: '#16150F', tabBarBorder: '#2D2B23', tabActive: '#6FA58C', tabInactive: '#706A5B',
    inputBackground: '#24231E', inputBorder: '#2D2B23', inputFocusBorder: '#6FA58C',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'rounded', cardBorder: 'hairline', cardShadow: 'soft',
    radiusScale: 'standard', heroTypeStyle: 'serif-display',
    ornament: 'botanical', surfaceTreatment: 'textured',
  },
  previewSwatches: ['#F0EADC', '#2B4A3F', '#B56638', '#5C4033'],
};

// ─── Preset 7: Japandi Minimal ──────────────────────────────────────────────

const japandi: ThemePreset = {
  id: 'japandi',
  name: 'Japandi Minimal',
  tagline: 'Zen restraint — near monochrome',
  description: 'Extreme whitespace, hairlines only, single tan accent.',
  light: {
    background: '#F4F0EB', surface: '#EBE5DC', surfaceElevated: '#FAF6F0', card: '#FAF6F0',
    text: '#2A2824', textSecondary: '#6B6558', textTertiary: '#A49D8F', textInverse: '#F4F0EB',
    primary: '#8F6B3F', primaryLight: '#ECE2CE', primaryDark: '#624928',
    safe: '#6B7F5E', safeBackground: '#E2E6D9',
    caution: '#9F7838', cautionBackground: '#EEDFC2',
    danger: '#9A4E3E', dangerBackground: '#ECD4CD',
    feelingGreat: '#6B7F5E', feelingGood: '#8FA382', feelingOkay: '#9F7838',
    feelingBad: '#A66A47', feelingTerrible: '#9A4E3E',
    border: '#D6CFC0', borderLight: '#E0D9CA', divider: '#DCD4C4',
    disabled: '#B2AB9C', placeholder: '#A49D8F', icon: '#6B6558', iconActive: '#8F6B3F',
    tabBar: '#FAF6F0', tabBarBorder: '#D6CFC0', tabActive: '#8F6B3F', tabInactive: '#A49D8F',
    inputBackground: '#EBE5DC', inputBorder: '#D6CFC0', inputFocusBorder: '#8F6B3F',
    shadowColor: '#2A2824',
  },
  dark: {
    background: '#111110', surface: '#1A1A18', surfaceElevated: '#22211E', card: '#22211E',
    text: '#ECE6D8', textSecondary: '#AAA494', textTertiary: '#726B5D', textInverse: '#111110',
    primary: '#C6A472', primaryLight: '#28241C', primaryDark: '#8F6B3F',
    safe: '#9BB58B', safeBackground: '#1F2B21',
    caution: '#D9AD68', cautionBackground: '#2B2316',
    danger: '#D38270', dangerBackground: '#2B1C17',
    feelingGreat: '#9BB58B', feelingGood: '#B9CDA9', feelingOkay: '#D9AD68',
    feelingBad: '#D69278', feelingTerrible: '#D38270',
    border: '#2B2822', borderLight: '#211F1A', divider: '#26231D',
    disabled: '#4A463D', placeholder: '#726B5D', icon: '#AAA494', iconActive: '#C6A472',
    tabBar: '#18171A', tabBarBorder: '#2B2822', tabActive: '#C6A472', tabInactive: '#726B5D',
    inputBackground: '#22211E', inputBorder: '#2B2822', inputFocusBorder: '#C6A472',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'square', cardBorder: 'hairline', cardShadow: 'none',
    radiusScale: 'tight', heroTypeStyle: 'serif-elegant',
    ornament: 'minimal-line', surfaceTreatment: 'flat',
  },
  previewSwatches: ['#F4F0EB', '#2A2824', '#8F6B3F', '#6B7F5E'],
};

// ─── Preset 8: Neobrutalist Pop ─────────────────────────────────────────────

const neobrutalist: ThemePreset = {
  id: 'neobrutalist',
  name: 'Neobrutalist Pop',
  tagline: 'Thick black borders, bright pops',
  description: 'Confident, indie, personality-forward. Hard-offset shadows.',
  light: {
    background: '#FFFAEF', surface: '#FFFFFF', surfaceElevated: '#FFFFFF', card: '#FFFFFF',
    text: '#0A0A0A', textSecondary: '#2C2C2C', textTertiary: '#6A6A6A', textInverse: '#FFFAEF',
    primary: '#FF6B1A', primaryLight: '#FFE4D1', primaryDark: '#C84D08',
    safe: '#B8E01A', safeBackground: '#F2FBD3',
    caution: '#FFB800', cautionBackground: '#FFF1C4',
    danger: '#E91E63', dangerBackground: '#FCDCE8',
    feelingGreat: '#B8E01A', feelingGood: '#7FCD30', feelingOkay: '#FFB800',
    feelingBad: '#FF6B1A', feelingTerrible: '#E91E63',
    border: '#0A0A0A', borderLight: '#E0E0E0', divider: '#E0E0E0',
    disabled: '#B0B0B0', placeholder: '#6A6A6A', icon: '#0A0A0A', iconActive: '#FF6B1A',
    tabBar: '#FFFAEF', tabBarBorder: '#0A0A0A', tabActive: '#FF6B1A', tabInactive: '#0A0A0A',
    inputBackground: '#FFFFFF', inputBorder: '#0A0A0A', inputFocusBorder: '#FF6B1A',
    shadowColor: '#0A0A0A',
  },
  dark: {
    background: '#0A0A0A', surface: '#141414', surfaceElevated: '#1C1C1C', card: '#1C1C1C',
    text: '#FFFAEF', textSecondary: '#C4C4C4', textTertiary: '#8A8A8A', textInverse: '#0A0A0A',
    primary: '#FF8040', primaryLight: '#2B1813', primaryDark: '#E0610D',
    safe: '#CBF053', safeBackground: '#252E14',
    caution: '#FFC829', cautionBackground: '#2E2610',
    danger: '#FF4A87', dangerBackground: '#2E1520',
    feelingGreat: '#CBF053', feelingGood: '#9FDF45', feelingOkay: '#FFC829',
    feelingBad: '#FF8040', feelingTerrible: '#FF4A87',
    border: '#FFFAEF', borderLight: '#2A2A2A', divider: '#2A2A2A',
    disabled: '#404040', placeholder: '#8A8A8A', icon: '#FFFAEF', iconActive: '#FF8040',
    tabBar: '#0A0A0A', tabBarBorder: '#FFFAEF', tabActive: '#FF8040', tabInactive: '#FFFAEF',
    inputBackground: '#1C1C1C', inputBorder: '#FFFAEF', inputFocusBorder: '#FF8040',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'square', cardBorder: 'thick-black', cardShadow: 'hard-offset',
    radiusScale: 'tight', heroTypeStyle: 'grotesque-bold',
    ornament: 'geometric', surfaceTreatment: 'bordered',
  },
  previewSwatches: ['#FFFAEF', '#0A0A0A', '#FF6B1A', '#1AB8E0'],
};

// ─── Preset 9: Liquid Glass Premium ─────────────────────────────────────────

const liquidGlass: ThemePreset = {
  id: 'liquid-glass',
  name: 'Liquid Glass',
  tagline: 'iOS 26 frosted panels',
  description: 'Translucent layers over gradient. Premium and futuristic.',
  light: {
    background: '#E8DEF5', surface: 'rgba(255,255,255,0.55)', surfaceElevated: 'rgba(255,255,255,0.7)', card: 'rgba(255,255,255,0.65)',
    text: '#1B1330', textSecondary: '#44386B', textTertiary: '#7D72A8', textInverse: '#FFFFFF',
    primary: '#8E82E8', primaryLight: 'rgba(142,130,232,0.15)', primaryDark: '#5A4EB8',
    safe: '#6DCAA9', safeBackground: 'rgba(109,202,169,0.15)',
    caution: '#F0A95C', cautionBackground: 'rgba(240,169,92,0.18)',
    danger: '#EC6F8C', dangerBackground: 'rgba(236,111,140,0.15)',
    feelingGreat: '#6DCAA9', feelingGood: '#8BD5C0', feelingOkay: '#F0A95C',
    feelingBad: '#EE8474', feelingTerrible: '#EC6F8C',
    border: 'rgba(255,255,255,0.45)', borderLight: 'rgba(255,255,255,0.25)', divider: 'rgba(255,255,255,0.35)',
    disabled: 'rgba(125,114,168,0.5)', placeholder: '#7D72A8', icon: '#44386B', iconActive: '#8E82E8',
    tabBar: 'rgba(255,255,255,0.6)', tabBarBorder: 'rgba(255,255,255,0.35)', tabActive: '#8E82E8', tabInactive: '#7D72A8',
    inputBackground: 'rgba(255,255,255,0.5)', inputBorder: 'rgba(255,255,255,0.4)', inputFocusBorder: '#8E82E8',
    shadowColor: '#4A3A7C',
  },
  dark: {
    background: '#1E1340', surface: 'rgba(40,25,80,0.6)', surfaceElevated: 'rgba(60,40,110,0.7)', card: 'rgba(60,40,110,0.65)',
    text: '#F0EBFF', textSecondary: '#BFAFE8', textTertiary: '#8577B0', textInverse: '#1E1340',
    primary: '#A89FFF', primaryLight: 'rgba(168,159,255,0.2)', primaryDark: '#6D5ECC',
    safe: '#84E0C5', safeBackground: 'rgba(132,224,197,0.2)',
    caution: '#F7BC6F', cautionBackground: 'rgba(247,188,111,0.2)',
    danger: '#F2879E', dangerBackground: 'rgba(242,135,158,0.2)',
    feelingGreat: '#84E0C5', feelingGood: '#A5E8D4', feelingOkay: '#F7BC6F',
    feelingBad: '#F59A85', feelingTerrible: '#F2879E',
    border: 'rgba(255,255,255,0.18)', borderLight: 'rgba(255,255,255,0.1)', divider: 'rgba(255,255,255,0.14)',
    disabled: 'rgba(133,119,176,0.45)', placeholder: '#8577B0', icon: '#BFAFE8', iconActive: '#A89FFF',
    tabBar: 'rgba(30,19,64,0.7)', tabBarBorder: 'rgba(255,255,255,0.15)', tabActive: '#A89FFF', tabInactive: '#8577B0',
    inputBackground: 'rgba(60,40,110,0.5)', inputBorder: 'rgba(255,255,255,0.18)', inputFocusBorder: '#A89FFF',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'pill', cardBorder: 'hairline', cardShadow: 'glass-blur',
    radiusScale: 'ultra', heroTypeStyle: 'sans-modern',
    ornament: 'none', surfaceTreatment: 'glass',
  },
  previewSwatches: ['#E8DEF5', '#8E82E8', '#F29BB0', '#6DCAA9'],
};

// ─── Preset 10: Heritage Apothecary ─────────────────────────────────────────

const heritageApothecary: ThemePreset = {
  id: 'heritage-apothecary',
  name: 'Heritage Apothecary',
  tagline: 'Aged cream + navy + copper',
  description: 'Old-world pharmacy, Victorian-medical, elegant craft.',
  light: {
    background: '#EFE8D6', surface: '#E3DBC4', surfaceElevated: '#F7F1E0', card: '#F7F1E0',
    text: '#3E2F1C', textSecondary: '#6B5A3E', textTertiary: '#9E8F6F', textInverse: '#EFE8D6',
    primary: '#1B2A3E', primaryLight: '#D3DAE2', primaryDark: '#0E1826',
    safe: '#4E6E45', safeBackground: '#DCE5D7',
    caution: '#A06A2D', cautionBackground: '#E9D9BD',
    danger: '#9B3B3B', dangerBackground: '#E9CFCF',
    feelingGreat: '#4E6E45', feelingGood: '#738B6A', feelingOkay: '#A06A2D',
    feelingBad: '#A84C3E', feelingTerrible: '#9B3B3B',
    border: '#1B2A3E', borderLight: '#D3CBB4', divider: '#D3CBB4',
    disabled: '#ADA48A', placeholder: '#9E8F6F', icon: '#6B5A3E', iconActive: '#1B2A3E',
    tabBar: '#F7F1E0', tabBarBorder: '#1B2A3E', tabActive: '#A06A2D', tabInactive: '#9E8F6F',
    inputBackground: '#E3DBC4', inputBorder: '#6B5A3E', inputFocusBorder: '#A06A2D',
    shadowColor: '#3E2F1C',
  },
  dark: {
    background: '#14181F', surface: '#1C222B', surfaceElevated: '#232A36', card: '#232A36',
    text: '#EFE8D6', textSecondary: '#BDB08F', textTertiary: '#7E7458', textInverse: '#14181F',
    primary: '#D3B27E', primaryLight: '#2B2319', primaryDark: '#A08559',
    safe: '#8AB07F', safeBackground: '#1F2B21',
    caution: '#D09A5A', cautionBackground: '#2B2316',
    danger: '#C56A6A', dangerBackground: '#2B1818',
    feelingGreat: '#8AB07F', feelingGood: '#A5C597', feelingOkay: '#D09A5A',
    feelingBad: '#C8846A', feelingTerrible: '#C56A6A',
    border: '#D3B27E', borderLight: '#2A3240', divider: '#2A3240',
    disabled: '#4E4D45', placeholder: '#7E7458', icon: '#BDB08F', iconActive: '#D3B27E',
    tabBar: '#181D24', tabBarBorder: '#D3B27E', tabActive: '#D3B27E', tabInactive: '#7E7458',
    inputBackground: '#232A36', inputBorder: '#BDB08F', inputFocusBorder: '#D3B27E',
    shadowColor: '#000000',
  },
  flavor: {
    buttonShape: 'square', cardBorder: 'double-line', cardShadow: 'none',
    radiusScale: 'tight', heroTypeStyle: 'serif-display',
    ornament: 'fleurons', surfaceTreatment: 'bordered',
  },
  previewSwatches: ['#EFE8D6', '#1B2A3E', '#A06A2D', '#9B3B3B'],
};

// ─── Export all presets ─────────────────────────────────────────────────────

export const THEME_PRESETS: Record<ThemePresetId, ThemePreset> = {
  'warm-minimalist': warmMinimalist,
  'wellness-night': wellnessNight,
  'clinical-modern': clinicalModern,
  'soft-pastel': softPastel,
  'bold-editorial': boldEditorial,
  'earth-tones': earthTones,
  'japandi': japandi,
  'neobrutalist': neobrutalist,
  'liquid-glass': liquidGlass,
  'heritage-apothecary': heritageApothecary,
};

export const THEME_PRESET_ORDER: ThemePresetId[] = [
  'warm-minimalist',
  'wellness-night',
  'clinical-modern',
  'soft-pastel',
  'bold-editorial',
  'earth-tones',
  'japandi',
  'neobrutalist',
  'liquid-glass',
  'heritage-apothecary',
];

export const DEFAULT_PRESET: ThemePresetId = 'warm-minimalist';
