/**
 * Wellness Night — centralized font family constants.
 *
 * expo-font registers the fonts under the names we pass to useFonts() in
 * app/_layout.tsx. On web, expo-font converts these to <link> tags pointing
 * at the bundled Google Fonts files, so the same strings work both sides.
 *
 * Two font families build the Wellness Night voice:
 * - Instrument Serif — large italic serif heros ("Good afternoon, Sean.")
 * - Inter — body, small-caps labels, UI chrome
 */

export const WELLNESS_NIGHT_FONTS = {
  // Instrument Serif — heros and italic accents
  serifRegular: 'InstrumentSerif_400Regular',
  serifItalic: 'InstrumentSerif_400Regular_Italic',

  // Inter — body and labels
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
} as const;

/**
 * Wellness Night palette (duplicates preset, centralized for quick reference).
 * These map 1:1 to THEME_PRESETS['wellness-night'].dark with a few mockup-only
 * deeper-bg swatches for nested layers (canvas / surface / surfaceDeep).
 */
export const WELLNESS_NIGHT_COLORS = {
  // Canvas (deepest) → surface (cards) → surfaceDeep (inner pills/bars)
  canvas: '#0A0908',
  surface: '#15110B',
  surfaceWarm: '#16120D',
  surfaceDeep: '#22190F',
  surfaceTint: '#1F170E',

  // Borders
  border: '#22190F',
  borderWarm: '#2B2014',
  borderSoft: '#201A13',

  // Text
  textBright: '#F2E9D8',
  text: '#E8DFD0',
  textMuted: '#C4B79F',
  textSubtle: '#A69987',
  textFaint: '#8A7D6A',
  textDim: '#6E6354',

  // Accents
  sand: '#D4AF8C',
  sandLight: '#E8C9A8',
  sandDeep: '#A07F5C',

  // Verdict / status
  sage: '#7FAE8E',
  sageBg: 'rgba(127,174,142,0.14)',
  amber: '#E8B865',
  warnBg: '#2E1814',
  warnText: '#E8A8A0',
  warnBorder: '#4A2620',
} as const;
