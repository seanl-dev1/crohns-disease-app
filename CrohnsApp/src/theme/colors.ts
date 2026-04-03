/**
 * CrohnsApp Design Token System
 * Dark mode from day one. OLED-friendly.
 *
 * Rules:
 * - Dark mode uses true black (#000) for OLED battery savings
 * - Text in dark mode is #E0E0E0 (not pure white — prevents halation)
 * - Color is never the sole indicator — always paired with icon + label
 * - Colorblind-safe palette (avoids red-green as sole distinction)
 */

export const colors = {
  light: {
    // Backgrounds
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceElevated: '#FFFFFF',
    card: '#FFFFFF',

    // Text
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#FFFFFF',

    // Brand
    primary: '#4A90D9',        // Calm blue — trust, health
    primaryLight: '#E8F1FB',
    primaryDark: '#2E6BB0',

    // Status — colorblind safe (blue/orange/red instead of green/yellow/red)
    safe: '#2E8B57',           // Sea green — "safe" foods
    safeBackground: '#E8F5EC',
    caution: '#D4870E',        // Amber — "caution" foods
    cautionBackground: '#FFF3E0',
    danger: '#C0392B',         // Red — "avoid" foods
    dangerBackground: '#FDEDEC',

    // Feeling scale
    feelingGreat: '#2E8B57',
    feelingGood: '#5BA86B',
    feelingOkay: '#D4870E',
    feelingBad: '#D35400',
    feelingTerrible: '#C0392B',

    // UI
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    divider: '#EEEEEE',
    disabled: '#BDBDBD',
    placeholder: '#9E9E9E',
    icon: '#757575',
    iconActive: '#4A90D9',

    // Tab bar
    tabBar: '#FFFFFF',
    tabBarBorder: '#E0E0E0',
    tabActive: '#4A90D9',
    tabInactive: '#999999',

    // Input
    inputBackground: '#F5F5F5',
    inputBorder: '#E0E0E0',
    inputFocusBorder: '#4A90D9',
  },

  dark: {
    // Backgrounds — true OLED black
    background: '#000000',
    surface: '#121212',
    surfaceElevated: '#1E1E1E',
    card: '#1E1E1E',

    // Text — slightly muted white to prevent halation
    text: '#E0E0E0',
    textSecondary: '#A0A0A0',
    textTertiary: '#707070',
    textInverse: '#1A1A1A',

    // Brand
    primary: '#5B9FE8',
    primaryLight: '#1A2E44',
    primaryDark: '#3D7CC4',

    // Status
    safe: '#4CAF76',
    safeBackground: '#1A2E20',
    caution: '#E8A020',
    cautionBackground: '#2E2510',
    danger: '#E05A4F',
    dangerBackground: '#2E1A18',

    // Feeling scale
    feelingGreat: '#4CAF76',
    feelingGood: '#6BC480',
    feelingOkay: '#E8A020',
    feelingBad: '#E07040',
    feelingTerrible: '#E05A4F',

    // UI
    border: '#333333',
    borderLight: '#222222',
    divider: '#2A2A2A',
    disabled: '#555555',
    placeholder: '#666666',
    icon: '#A0A0A0',
    iconActive: '#5B9FE8',

    // Tab bar
    tabBar: '#121212',
    tabBarBorder: '#333333',
    tabActive: '#5B9FE8',
    tabInactive: '#666666',

    // Input
    inputBackground: '#1E1E1E',
    inputBorder: '#333333',
    inputFocusBorder: '#5B9FE8',
  },
};

export type ThemeColors = {
  [K in keyof typeof colors.light]: string;
};
export type ColorScheme = 'light' | 'dark';
