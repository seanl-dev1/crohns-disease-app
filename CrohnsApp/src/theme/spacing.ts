/**
 * Spacing, sizing, typography, and elevation tokens — 2026 modernization.
 *
 * Design intent:
 * - 4pt grid with more steps (granular control without ad-hoc values)
 * - Touch targets >= 48dp (Material + HIG baseline), 56dp preferred for primary actions
 * - Typography: Inter-like modern sans, weight/size/line-height locked to scale
 * - Elevation: 3-tier shadow system (subtle, raised, modal) with warm-tinted color
 * - Radii: 4/8/12/16/20/24/999 — 16 is the default card radius, 12 for inputs
 */

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  smd: 12,
  md: 16,
  lmd: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 56,
  xxxxl: 72,
} as const;

export const sizing = {
  // Touch targets
  tapTarget: 48,              // Material + HIG minimum
  tapTargetLarge: 56,         // Primary CTAs, FABs
  tapTargetSmall: 44,         // iOS minimum, use sparingly

  // Icons
  iconXs: 16,
  iconSmall: 20,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 40,

  // Border radius — 2026 uses softer, more consistent curves
  radiusXs: 4,                // Micro elements, chips
  radiusSmall: 8,             // Small buttons, tags
  radiusMedium: 12,           // Inputs, small cards
  radiusLarge: 16,            // Default cards
  radiusXL: 20,               // Bottom sheets, large cards
  radiusXXL: 24,              // Hero cards, modal containers
  radiusRound: 999,           // Pills, avatars

  // Font sizes — 16 is baseline; 14 minimum for body; no smaller than 11 ever
  fontMicro: 11,
  fontXs: 12,
  fontSm: 14,
  fontBase: 16,
  fontMd: 17,                 // iOS native body size
  fontLg: 18,
  fontXl: 20,
  fontXxl: 24,
  fontHeading: 28,
  fontHero: 34,
  fontDisplay: 44,

  // Line heights — ratio-based (tight for display, looser for body)
  lineHeightTight: 1.15,
  lineHeightSnug: 1.3,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.6,
} as const;

export const typography = {
  // Weights — 500 for UI labels, 600 for emphasis, 700 for headings, 400 for body
  weightRegular: '400' as const,
  weightMedium: '500' as const,
  weightSemibold: '600' as const,
  weightBold: '700' as const,

  // Letter spacing — subtle, in em-ish pt values for RN
  tracking: {
    tight: -0.4,
    snug: -0.2,
    normal: 0,
    wide: 0.2,
    wider: 0.4,
  },

  // Font family hint — system-ui variants.
  // iOS: San Francisco (SF Pro). Android: Roboto. Both render warm modern sans by default.
  // No custom font to keep bundle size small and startup fast.
  fontFamily: {
    system: undefined,        // Let RN pick the system font
    mono: 'Menlo',            // Only used for code/PMIDs
  },
} as const;

/**
 * Elevation tokens — 2026 style: subtle, warm-tinted shadows.
 * Use via StyleSheet spread: `...elevation.raised`
 * iOS uses shadowColor/offset/opacity/radius; Android uses `elevation`.
 */
export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#1C1B17',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  raised: {
    shadowColor: '#1C1B17',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  modal: {
    shadowColor: '#1C1B17',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  floating: {
    // Tab bar, FABs — lifted with slightly higher y-offset for grounding
    shadowColor: '#1C1B17',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

/**
 * Animation timing tokens.
 * 2026 pattern: fast + springy, respects reduced motion.
 */
export const motion = {
  duration: {
    instant: 100,
    fast: 180,
    normal: 240,
    slow: 320,
    slower: 480,
  },
  spring: {
    // Gentle — for general entries, cards, modals
    gentle: { damping: 20, stiffness: 180, mass: 0.8 },
    // Snappy — for button presses, toggles, taps
    snappy: { damping: 18, stiffness: 300, mass: 0.6 },
    // Bouncy — for playful elements (rarely used in medical app)
    bouncy: { damping: 12, stiffness: 220, mass: 0.8 },
  },
} as const;
