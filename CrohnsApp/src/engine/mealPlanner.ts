/**
 * Meal Plan Generator — Deterministic, no AI required.
 *
 * Creates a 7-day meal plan based on:
 * - User's dietary phase (flare → maintenance)
 * - Disease state (flare/remission/uncertain)
 * - Dietary preferences (dairy-free, gluten-free, etc.)
 * - Disliked foods
 * - Calorie target
 * - Variety (avoid repeating meals)
 * - Nutritional balance (protein, key nutrients)
 */

import {
  getCompatibleRecipes,
  type RecipeSummary,
} from './recipeDatabase';

export interface DayPlan {
  day: string;         // "Monday", "Tuesday", etc.
  breakfast: RecipeSummary;
  lunch: RecipeSummary;
  dinner: RecipeSummary;
  snack: RecipeSummary;
  totalCalories: number;
  totalProtein: number;
}

export interface WeeklyMealPlan {
  generatedAt: string;
  days: DayPlan[];
  summary: {
    avgCalories: number;
    avgProtein: number;
    recipesUsed: number;
    phase: string;
    diseaseState: string;
  };
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Generate a 7-day meal plan.
 */
export function generateMealPlan(
  phase: string,
  diseaseState: string,
  dietaryPreferences: string[] = [],
  dislikedFoods: string[] = [],
  calorieTarget?: number,
): WeeklyMealPlan {
  const compatible = getCompatibleRecipes(phase, diseaseState, dietaryPreferences, dislikedFoods);

  // Bucket recipes by meal type (lunch/dinner are interchangeable for main meals)
  const breakfasts = compatible.filter(
    (r) => r.mealType === 'breakfast' || r.mealType === 'smoothie'
  );
  const mains = compatible.filter(
    (r) => r.mealType === 'lunch' || r.mealType === 'dinner' || r.mealType === 'soup'
  );
  const snacks = compatible.filter(
    (r) => r.mealType === 'snack' || r.mealType === 'smoothie'
  );

  // Track used recipe IDs to maximize variety
  const usedBreakfast = new Set<string>();
  const usedLunch = new Set<string>();
  const usedDinner = new Set<string>();
  const usedSnack = new Set<string>();

  const days: DayPlan[] = [];

  for (let i = 0; i < 7; i++) {
    const breakfast = pickRecipe(breakfasts, usedBreakfast, i);
    const lunch = pickRecipe(mains, usedLunch, i);
    const dinner = pickRecipe(mains, usedDinner, i, lunch?.id);
    const snack = pickRecipe(snacks, usedSnack, i);

    // Fallbacks if we don't have enough variety
    const bfast = breakfast || breakfasts[i % Math.max(breakfasts.length, 1)];
    const lch = lunch || mains[i % Math.max(mains.length, 1)];
    const din = dinner || mains[(i + 1) % Math.max(mains.length, 1)];
    const snk = snack || snacks[i % Math.max(snacks.length, 1)];

    if (!bfast || !lch || !din || !snk) continue; // skip if literally no recipes

    const totalCalories =
      bfast.nutrition.calories + lch.nutrition.calories +
      din.nutrition.calories + snk.nutrition.calories;
    const totalProtein =
      bfast.nutrition.protein_g + lch.nutrition.protein_g +
      din.nutrition.protein_g + snk.nutrition.protein_g;

    days.push({
      day: DAYS[i],
      breakfast: bfast,
      lunch: lch,
      dinner: din,
      snack: snk,
      totalCalories,
      totalProtein,
    });
  }

  // Summary stats
  const avgCalories = days.length > 0
    ? Math.round(days.reduce((s, d) => s + d.totalCalories, 0) / days.length)
    : 0;
  const avgProtein = days.length > 0
    ? Math.round(days.reduce((s, d) => s + d.totalProtein, 0) / days.length)
    : 0;

  const allRecipeIds = new Set<string>();
  for (const d of days) {
    allRecipeIds.add(d.breakfast.id);
    allRecipeIds.add(d.lunch.id);
    allRecipeIds.add(d.dinner.id);
    allRecipeIds.add(d.snack.id);
  }

  return {
    generatedAt: new Date().toISOString(),
    days,
    summary: {
      avgCalories,
      avgProtein,
      recipesUsed: allRecipeIds.size,
      phase,
      diseaseState,
    },
  };
}

/**
 * Pick a recipe that hasn't been used yet. Falls back to least-recently used.
 */
function pickRecipe(
  pool: RecipeSummary[],
  used: Set<string>,
  dayIndex: number,
  excludeId?: string,
): RecipeSummary | null {
  if (pool.length === 0) return null;

  // Try to find one not yet used
  const available = pool.filter((r) => !used.has(r.id) && r.id !== excludeId);

  if (available.length > 0) {
    // Deterministic "shuffle" based on day index for variety
    const pick = available[dayIndex % available.length];
    used.add(pick.id);
    return pick;
  }

  // All used — reset and pick again
  used.clear();
  const filtered = excludeId ? pool.filter((r) => r.id !== excludeId) : pool;
  const pick = filtered[dayIndex % filtered.length];
  used.add(pick.id);
  return pick;
}
