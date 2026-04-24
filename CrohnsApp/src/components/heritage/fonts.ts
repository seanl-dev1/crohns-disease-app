/**
 * Heritage Apothecary — centralized font family constants.
 *
 * expo-font registers the fonts under the names we pass to useFonts() in
 * app/_layout.tsx. On web, expo-font converts these to <link> tags pointing
 * at the bundled Google Fonts files, so the same strings work both sides.
 *
 * Four font families build the Heritage voice:
 * - Playfair Display — large serif headlines ("Good afternoon, Sean.")
 * - Cormorant Garamond — elegant italic body / subtitles
 * - Lora — readable long-form serif body (article paragraphs)
 * - Oswald — small-caps labels, roman numerals, masthead
 */

export const HERITAGE_FONTS = {
  // Playfair Display — headlines
  serifRegular: 'PlayfairDisplay_400Regular',
  serifMedium: 'PlayfairDisplay_500Medium',
  serifSemiBold: 'PlayfairDisplay_600SemiBold',
  serifBold: 'PlayfairDisplay_700Bold',
  serifItalic: 'PlayfairDisplay_400Regular_Italic',
  serifMediumItalic: 'PlayfairDisplay_500Medium_Italic',

  // Cormorant Garamond — elegant subtitles / body accents
  elegantRegular: 'CormorantGaramond_400Regular',
  elegantItalic: 'CormorantGaramond_400Regular_Italic',
  elegantMedium: 'CormorantGaramond_500Medium',
  elegantMediumItalic: 'CormorantGaramond_500Medium_Italic',
  elegantSemiBold: 'CormorantGaramond_600SemiBold',

  // Lora — long-form body text
  bodyRegular: 'Lora_400Regular',
  bodyItalic: 'Lora_400Regular_Italic',
  bodyMedium: 'Lora_500Medium',
  bodySemiBold: 'Lora_600SemiBold',

  // Oswald — small-caps labels, masthead
  labelLight: 'Oswald_300Light',
  labelRegular: 'Oswald_400Regular',
  labelMedium: 'Oswald_500Medium',
  labelSemiBold: 'Oswald_600SemiBold',
} as const;

/**
 * Heritage color palette (duplicates preset, centralized for quick reference).
 * These map 1:1 to THEME_PRESETS['heritage-apothecary'].light.
 */
export const HERITAGE_COLORS = {
  cream: '#EFE8D6',
  creamDark: '#E3DBC4',
  paper: '#F7F1E0',
  paperWarm: '#F5EFDD',
  navy: '#1B2A3E',
  navyDark: '#0E1826',
  copper: '#A06A2D',
  ink: '#3E2F1C',
  inkSoft: '#6B5A3E',
  inkFaint: '#9E8F6F',
  sage: '#4E6E45',
  crimson: '#9B3B3B',
  hairline: '#D3CBB4',
  dottedLine: 'rgba(27,42,62,0.3)',
  innerFrame: 'rgba(27,42,62,0.22)',
} as const;
