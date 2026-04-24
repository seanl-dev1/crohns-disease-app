/**
 * Hedged rating language for food/meal safety indicators — 2026 patient-UX pattern.
 *
 * WHY: Traditional "Safe / Warning / Danger" labels feel binary and shaming when
 * applied to food. A patient whose scan returns "DANGER" for a food they just
 * ate feels judged. Individual tolerance varies — a food that flares one person
 * is fine for another. The language should reflect that uncertainty.
 *
 * 2026 consensus (from health-app research): hedge the language, keep the
 * color coding for at-a-glance scan, and pair with actionable "what to do" text.
 *
 * Usage:
 *   import { RATING_LABELS, RATING_DESCRIPTIONS } from '../theme/ratingLanguage';
 *   <Text>{RATING_LABELS.red}</Text>
 *   <Text>{RATING_DESCRIPTIONS.red}</Text>
 */

export type FoodRating = 'green' | 'yellow' | 'red';

export const RATING_LABELS: Record<FoodRating, string> = {
  green: 'Usually fine',
  yellow: 'Watch for triggers',
  red: 'Often a trigger',
};

export const RATING_DESCRIPTIONS: Record<FoodRating, string> = {
  green:
    'Most Crohn\'s patients tolerate this well. Your mileage may vary — log how you feel afterward.',
  yellow:
    'Some patients react to this. Worth watching, especially during a flare. Small portions may be fine.',
  red:
    'This often triggers symptoms in Crohn\'s. Not a verdict — if you\'ve tolerated it before, trust your track record. If unsure, skip it today.',
};

/** Icon names (Ionicons) paired with each rating — reinforces color for colorblind users */
export const RATING_ICONS: Record<FoodRating, string> = {
  green: 'checkmark-circle',
  yellow: 'alert-circle',
  red: 'warning',
};

/** For grouping in UI (e.g., "Not a trigger for me" personalization) */
export const RATING_LONG_LABELS: Record<FoodRating, string> = {
  green: 'Usually fine for Crohn\'s',
  yellow: 'Watch for triggers',
  red: 'Commonly a trigger',
};
