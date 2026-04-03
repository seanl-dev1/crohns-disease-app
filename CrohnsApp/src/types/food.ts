/**
 * Food entry types shared across the app.
 */

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodEntry {
  id: number;
  timestamp: string;
  meal_type: MealType;
  food_name: string;
  barcode?: string;
  brand?: string;
  serving_size?: string;
  calories?: number;
  protein_g?: number;
  fat_g?: number;
  carbs_g?: number;
  fiber_g?: number;
  sugar_g?: number;
  sodium_mg?: number;
  fodmap_level?: string;
  trigger_score?: number;
  flare_safety?: string;
  photo_uri?: string;
  notes?: string;
  created_at?: string;
}

export const MEAL_TYPES: { value: MealType; label: string; icon: string }[] = [
  { value: 'breakfast', label: 'Breakfast', icon: 'sunny-outline' },
  { value: 'lunch', label: 'Lunch', icon: 'partly-sunny-outline' },
  { value: 'dinner', label: 'Dinner', icon: 'moon-outline' },
  { value: 'snack', label: 'Snack', icon: 'cafe-outline' },
];

/**
 * Suggests the current meal type based on time of day.
 */
export function suggestMealType(): MealType {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 15) return 'lunch';
  if (hour < 20) return 'dinner';
  return 'snack';
}
