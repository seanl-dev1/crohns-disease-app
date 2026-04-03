/**
 * Spacing and sizing tokens
 *
 * Designed for accessibility:
 * - Minimum tap target: 48x48 (Material Design guideline)
 * - Large tap targets for fatigued users
 * - Generous padding for readability
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const sizing = {
  // Tap targets — minimum 48, prefer larger for health app
  tapTarget: 48,
  tapTargetLarge: 56,

  // Icons
  iconSmall: 20,
  iconMedium: 24,
  iconLarge: 32,

  // Border radius
  radiusSmall: 8,
  radiusMedium: 12,
  radiusLarge: 16,
  radiusRound: 999,

  // Font sizes — 16px base, scalable
  fontXs: 12,
  fontSm: 14,
  fontBase: 16,
  fontLg: 18,
  fontXl: 22,
  fontXxl: 28,
  fontHeading: 34,
} as const;
