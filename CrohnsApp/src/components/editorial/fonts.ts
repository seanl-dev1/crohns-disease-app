/**
 * Bold Editorial — centralized font family + color constants.
 *
 * The "magazine / NYT Cooking" voice rests on two type families:
 * - Instrument Serif — large display heros and section headings, with an
 *   italic cut for terracotta accents ("Sean.", "Crohn's.", "Monkey.").
 * - Inter — every body, label, and small-caps eyebrow. The 500/600/700
 *   weights handle metadata and CTAs.
 *
 * The bold-editorial preset color palette is duplicated here so the screens
 * never have to walk back to `src/theme/presets.ts` for a hex value.
 */

export const EDITORIAL_FONTS = {
  // Instrument Serif — display + heros
  serifRegular: 'InstrumentSerif_400Regular',
  serifItalic: 'InstrumentSerif_400Regular_Italic',

  // Inter — body, labels, CTAs
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

/**
 * Bold Editorial palette — mirrors `THEME_PRESETS['bold-editorial'].light`.
 *
 * Cream canvas, near-black ink, terracotta as the single accent. Two
 * gentler hairline tones (`hairline` / `hairlineSoft`) cover the structural
 * dividers in the mockup (`#1A1A1A` for masthead/section breaks,
 * `#D9D0BE` for in-section dividers, `#E6DFCE` for tightest row dividers).
 */
export const EDITORIAL_COLORS = {
  cream: '#F7F3EC',
  paper: '#EFE8D8',
  ink: '#1A1A1A',
  inkSoft: '#3D362C',
  inkMid: '#6B6459',
  inkFaint: '#87817A',
  inkPale: '#B2A78F',
  terracotta: '#C85A3E',
  terracottaSoft: '#F5DDD2',
  hairline: '#1A1A1A',
  hairlineSoft: '#D9D0BE',
  hairlineFaint: '#E6DFCE',
} as const;
