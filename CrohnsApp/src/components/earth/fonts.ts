/**
 * Nature-Grounded Earth Tones — centralized font family + color constants.
 *
 * Visual spec: `public/designs/index.html` → section `.d6` selectors.
 *
 * Two font families build the Field-Journal voice:
 * - Fraunces — display serif with optional tracking and italic variants for
 *   hero, masthead, card titles. The mockup uses Fraunces 500 + Fraunces italic.
 * - Inter — utilitarian sans for body copy, small-caps labels, and chrome.
 *
 * If the @expo-google-fonts packages for Fraunces / Inter are not installed
 * the fontFamily strings fall through to system serif / sans-serif on web,
 * which is a graceful degradation matching the mockup mood.
 */

export const EARTH_FONTS = {
  // Fraunces — serif headlines, card titles, italic accents.
  serifRegular: 'Fraunces_400Regular',
  serifMedium: 'Fraunces_500Medium',
  serifSemiBold: 'Fraunces_600SemiBold',
  serifItalic: 'Fraunces_400Regular_Italic',

  // Inter — body, labels, footers.
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
} as const;

/**
 * Earth Tones color palette — duplicates `THEME_PRESETS['earth-tones'].light`
 * for fast reference inside primitive components without importing the whole
 * preset registry.
 *
 * Names map 1:1 to the CSS swatches in the d6 mockup:
 * - oatmeal     #F0EADC  base canvas
 * - paperWarm   #E9E0CE  card surface
 * - hairline    #C9BEA5  card borders / dividers
 * - tabRail     #D7C8A9  tab bar background
 * - forest      #2B4A3F  primary serif accent + buttons
 * - forestDeep  #1E3A32  gradient pair for the dark "tip" card
 * - clay        #B56638  eyebrow labels + flourishes
 * - clayLight   #D7A97F  muted clay (eyebrow on dark surfaces)
 * - ink         #1E1B15  body text
 * - bark        #5C4033  secondary body / sub-text
 * - bark2       #7A6A4E  inactive tab labels
 * - cream       #F0EADC  text on dark surfaces (matches oatmeal)
 * - tipBodySoft #D7C8A9  body color on dark tip card
 * - alertBg     #F5DDD0  pale clay for alert chip bg
 * - alertBorder #D9A894  pale clay border
 * - alertInk    #8A2F1E  red-clay text on alert chip
 */
export const EARTH_COLORS = {
  oatmeal: '#F0EADC',
  paperWarm: '#E9E0CE',
  hairline: '#C9BEA5',
  tabRail: '#D7C8A9',
  forest: '#2B4A3F',
  forestDeep: '#1E3A32',
  forestSoft: '#3E6556',
  clay: '#B56638',
  clayLight: '#D7A97F',
  ink: '#1E1B15',
  bark: '#5C4033',
  bark2: '#7A6A4E',
  cream: '#F0EADC',
  tipBodySoft: '#D7C8A9',
  alertBg: '#F5DDD0',
  alertBorder: '#D9A894',
  alertInk: '#8A2F1E',
  /** Light-on-dark tip eyebrow tint */
  clayOnDark: '#D7A97F',
  /** Tabbar separator */
  tabRailBorder: '#5C4033',
} as const;
