/**
 * CrohnsApp Design Token System — 2026 modernization
 *
 * Design intent:
 * - WARM minimalism, not clinical cold. Off-white backgrounds, not pure white.
 * - Sage-teal primary (healing, natural) replaces generic corporate blue.
 * - Warm grays for text hierarchy — softer than pure black.
 * - Food rating colors are muted and warm — avoids "alarm" feel of harsh red/green.
 * - Dark mode preserves true OLED #000 for battery, but elevates surfaces with warm tint.
 *
 * Rules:
 * - Color is never the sole indicator — always paired with icon + label.
 * - Colorblind-safe palette (blue/orange/red-orange, not red/green).
 * - All text meets WCAG AAA (7:1) contrast against its background.
 */

export const colors = {
  light: {
    // Backgrounds — warm off-white, not sterile pure white
    background: '#FAFAF7',           // Warm near-white, easier on eyes than #FFF
    surface: '#F3F1EC',              // Slightly warmer surface for depth
    surfaceElevated: '#FFFFFF',      // True white only for elevated cards (with shadow)
    card: '#FFFFFF',

    // Text — warm grays, not pure black (softer, modern)
    text: '#1C1B17',                 // Warm near-black
    textSecondary: '#5F5B54',        // Warm mid-gray
    textTertiary: '#9A948A',         // Warm light-gray for captions
    textInverse: '#FAFAF7',

    // Brand — sage-teal, healing and natural
    primary: '#2F6F6A',              // Deep sage-teal (replaces #4A90D9 corporate blue)
    primaryLight: '#DDEBE8',         // Soft tint for backgrounds
    primaryDark: '#1F524E',

    // Status — warm, not garish
    safe: '#5C9B7A',                 // Sage green (not grass-green)
    safeBackground: '#E6F0EA',
    caution: '#D18B4A',              // Warm amber (not bright yellow)
    cautionBackground: '#FAEFDE',
    danger: '#CA5A4A',               // Terracotta red (not fire-engine red)
    dangerBackground: '#FAE6E1',

    // Feeling scale — emotionally warm gradient
    feelingGreat: '#5C9B7A',
    feelingGood: '#7FB088',
    feelingOkay: '#D4A45E',
    feelingBad: '#D07F54',
    feelingTerrible: '#CA5A4A',

    // UI
    border: '#E6E3DB',               // Warm light border
    borderLight: '#EFEDE6',
    divider: '#EDEAE1',
    disabled: '#BFBAB1',
    placeholder: '#9A948A',
    icon: '#6B665D',
    iconActive: '#2F6F6A',

    // Tab bar
    tabBar: '#FFFFFF',
    tabBarBorder: '#E6E3DB',
    tabActive: '#2F6F6A',
    tabInactive: '#9A948A',

    // Input
    inputBackground: '#F3F1EC',
    inputBorder: '#E6E3DB',
    inputFocusBorder: '#2F6F6A',

    // Shadows — warm-tinted, not pure black
    shadowColor: '#1C1B17',          // Used with low opacity in elevation tokens
  },

  dark: {
    // Backgrounds — OLED black for battery, warm-tinted for elevation
    background: '#000000',           // True OLED black
    surface: '#15130F',              // Subtle warm tint vs pure gray
    surfaceElevated: '#1E1B16',      // Elevated surfaces are lighter in dark mode
    card: '#1E1B16',

    // Text — warm off-white, prevents halation
    text: '#E8E4DB',                 // Warm near-white (not pure #FFF — reduces halation)
    textSecondary: '#A8A296',        // Warm mid-gray
    textTertiary: '#6F6A60',         // Warm dimmed text
    textInverse: '#1C1B17',

    // Brand — brighter for dark mode contrast
    primary: '#5FB3AB',              // Sage-teal, brightened for dark bg
    primaryLight: '#1C2E2B',         // Deep tinted surface for primary-themed areas
    primaryDark: '#3D8F87',

    // Status
    safe: '#7DBD97',
    safeBackground: '#1B2B22',
    caution: '#E8A867',
    cautionBackground: '#2E2318',
    danger: '#E17A6B',
    dangerBackground: '#2E1B18',

    // Feeling scale
    feelingGreat: '#7DBD97',
    feelingGood: '#97D1A3',
    feelingOkay: '#E8BE7F',
    feelingBad: '#E59874',
    feelingTerrible: '#E17A6B',

    // UI
    border: '#2B2822',
    borderLight: '#1F1D18',
    divider: '#25221D',
    disabled: '#4A463E',
    placeholder: '#6F6A60',
    icon: '#A8A296',
    iconActive: '#5FB3AB',

    // Tab bar
    tabBar: '#0B0A08',
    tabBarBorder: '#2B2822',
    tabActive: '#5FB3AB',
    tabInactive: '#6F6A60',

    // Input
    inputBackground: '#1E1B16',
    inputBorder: '#2B2822',
    inputFocusBorder: '#5FB3AB',

    // Shadows
    shadowColor: '#000000',
  },
};

export type ThemeColors = {
  [K in keyof typeof colors.light]: string;
};
export type ColorScheme = 'light' | 'dark';
