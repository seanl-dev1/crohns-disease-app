/**
 * Embedded recipe database — 105 Crohn's-safe recipes.
 * Compact format for bundle size. Each recipe has phase safety,
 * dietary tags, meal type, nutrition, and Crohn's-specific notes.
 *
 * Full recipe details (ingredients, instructions) loaded on demand.
 * This file contains the metadata needed for meal plan generation.
 */

export interface RecipeIngredient {
  item: string;
  amount: string;
  category: GroceryCategory;
}

export type GroceryCategory =
  | 'produce'
  | 'protein'
  | 'dairy'
  | 'grains'
  | 'pantry'
  | 'spices'
  | 'beverages'
  | 'frozen'
  | 'other';

export interface RecipeSummary {
  id: string;
  name: string;
  description: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'soup' | 'smoothie';
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  difficulty: string;
  phaseSafe: {
    phase_2_full_liquids: boolean;
    phase_3_low_residue: boolean;
    phase_4_reintroduction: boolean;
    phase_5_maintenance: boolean;
    during_flare: boolean;
  };
  dietaryTags: string[];
  nutrition: {
    calories: number;
    protein_g: number;
    fat_g: number;
    carbs_g: number;
    fiber_g: number;
  };
  keyNutrients: string[];
  crohnsNotes: string;
  postResectionNotes: string;
  ingredients: RecipeIngredient[];
}

/**
 * Phase key mapping from user's DietaryPhase to recipe phase_safe keys.
 */
export function getPhaseKey(
  phase: string
): keyof RecipeSummary['phaseSafe'] | null {
  const map: Record<string, keyof RecipeSummary['phaseSafe']> = {
    phase_2_full_liquids: 'phase_2_full_liquids',
    phase_3_low_residue: 'phase_3_low_residue',
    phase_4_reintroduction: 'phase_4_reintroduction',
    phase_5_maintenance: 'phase_5_maintenance',
  };
  return map[phase] || null;
}

// Compact recipe data: [id, name, desc, mealType, prepMin, cookMin, servings, difficulty,
//   phaseSafe (bitmask: p2|p3|p4|p5|flare), dietaryTags, cal, pro, fat, carb, fib, keyNutrients, crohnsNotes, postResNotes]

const RECIPES: RecipeSummary[] = [
  // === FLARE-SAFE / LOW RESIDUE ===
  r('flare_001', 'Plain White Rice Bowl', 'Simple, easy-to-digest white rice', 'lunch', 2, 20, 2, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fat','low-fiber','low-residue','low-oxalate'],
    205, 4, 0.5, 45, 0.6, [], 'Most universally tolerated food during a flare', 'Safe at all stages post-resection',
    [i('white rice','1 cup','grains'), i('salt','1/4 tsp','spices')]),
  r('flare_002', 'Simple Chicken and Rice', 'Tender poached chicken over white rice', 'dinner', 5, 25, 2, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fat','low-fiber','high-protein','low-residue','low-oxalate'],
    385, 40, 3.5, 45, 0.6, ['B12','protein','zinc'], 'Poaching keeps chicken tender and gentle', 'Excellent post-resection. Low fat, high protein for healing',
    [i('chicken breast','2 (6 oz each)','protein'), i('white rice','1 cup','grains'), i('low-sodium chicken broth','2 cups','pantry'), i('salt','1/2 tsp','spices')]),
  r('flare_003', 'Banana Oatmeal', 'Creamy oatmeal with ripe mashed banana', 'breakfast', 2, 5, 1, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fat','low-residue'],
    255, 6, 3, 52, 4.5, ['potassium','magnesium'], 'Soluble fiber from oats is gentle on the gut', 'Good choice post-resection. Soluble fiber is better tolerated',
    [i('quick oats','1/2 cup','grains'), i('ripe banana','1 medium','produce'), i('salt','pinch','spices')]),
  r('flare_004', 'Bone Broth Sipping Cup', 'Warm bone broth with a pinch of salt', 'snack', 1, 0, 1, 'easy',
    [true, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fat','low-fiber','low-residue','low-oxalate'],
    45, 10, 0.5, 0, 0, ['protein','collagen'], 'Hydrating and soothing during flares', 'Excellent for hydration post-resection',
    [i('bone broth','1 cup','pantry'), i('salt','pinch','spices')]),
  r('flare_005', 'Scrambled Eggs', 'Soft scrambled eggs with a touch of butter', 'breakfast', 2, 5, 1, 'easy',
    [false, true, true, true, true], ['low-fodmap','gluten-free','low-fiber','low-residue','high-protein','low-oxalate'],
    220, 14, 16, 2, 0, ['B12','protein','iron'], 'Easy to digest protein source', 'Great protein source post-resection. Watch fat if using butter',
    [i('eggs','3 large','protein'), i('butter','1 tsp','dairy'), i('salt','pinch','spices')]),
  r('flare_006', 'Applesauce', 'Smooth, unsweetened applesauce', 'snack', 0, 0, 1, 'easy',
    [true, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fat','low-fiber','low-residue'],
    100, 0, 0, 26, 1.5, ['potassium'], 'Classic flare food. Pectin is soothing soluble fiber', 'Safe at all post-resection stages',
    [i('unsweetened applesauce','1 cup','pantry')]),
  r('flare_007', 'White Toast with Smooth Peanut Butter', 'Simple white bread with smooth PB', 'snack', 2, 2, 1, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','low-fiber','low-residue'],
    285, 10, 12, 34, 2, ['protein'], 'Use smooth PB only — chunky has seed risk', 'Keep PB to 1 tbsp to limit fat',
    [i('white bread','2 slices','grains'), i('smooth peanut butter','1 tbsp','pantry')]),
  r('flare_008', 'Chicken Noodle Soup', 'Clear broth with chicken and soft white noodles', 'soup', 10, 20, 2, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','low-fat','low-fiber','high-protein','low-residue'],
    280, 28, 4, 32, 1, ['B12','protein','zinc'], 'Skip onion/garlic for low-FODMAP. Use carrot for flavor', 'Hydrating and easy to absorb post-resection',
    [i('chicken breast','1 (6 oz)','protein'), i('egg noodles or white pasta','4 oz','grains'), i('carrots','2 medium','produce'), i('low-sodium chicken broth','4 cups','pantry'), i('salt','1/2 tsp','spices')]),
  r('flare_009', 'Mashed Potatoes', 'Smooth mashed potatoes with lactose-free milk', 'dinner', 10, 20, 2, 'easy',
    [false, true, true, true, true], ['low-fodmap','gluten-free','low-fiber','low-residue','low-oxalate'],
    210, 4, 6, 36, 2, ['potassium','B6'], 'Peel potatoes to reduce fiber', 'Safe post-resection. Add butter cautiously (fat)',
    [i('russet potatoes','3 medium','produce'), i('lactose-free milk','1/4 cup','dairy'), i('butter','1 tbsp','dairy'), i('salt','1/2 tsp','spices')]),
  r('flare_010', 'Vanilla Protein Smoothie', 'Simple protein shake with banana', 'smoothie', 3, 0, 1, 'easy',
    [true, true, true, true, true], ['low-fodmap','gluten-free','low-fiber'],
    280, 25, 4, 38, 1.5, ['protein','calcium','B12'], 'Use lactose-free milk or almond milk', 'Good way to get calories when appetite is low',
    [i('vanilla protein powder','1 scoop','pantry'), i('ripe banana','1 medium','produce'), i('lactose-free milk','1 cup','dairy')]),

  // === REINTRODUCTION / MODERATE ===
  r('reintro_001', 'Baked Salmon with Rice', 'Gentle baked salmon fillet with white rice', 'dinner', 5, 20, 2, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','high-protein','low-oxalate'],
    420, 35, 14, 38, 0.6, ['omega-3','B12','protein','vitamin-D'], 'Omega-3 has anti-inflammatory properties', 'Watch fat content — bake rather than fry',
    [i('salmon fillets','2 (5 oz each)','protein'), i('white rice','1 cup','grains'), i('lemon','1','produce'), i('olive oil','1 tsp','pantry'), i('dried dill','1 tsp','spices'), i('salt','1/2 tsp','spices')]),
  r('reintro_002', 'Turkey Meatballs', 'Soft turkey meatballs with rice or pasta', 'dinner', 15, 20, 4, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','low-fat','high-protein'],
    320, 32, 8, 28, 1, ['protein','B12','iron','zinc'], 'Use egg as binder, breadcrumbs for texture', 'Lean turkey is easier to digest than beef',
    [i('ground turkey','1 lb','protein'), i('egg','1 large','protein'), i('white breadcrumbs','1/4 cup','grains'), i('white rice or pasta','2 cups cooked','grains'), i('salt','1/2 tsp','spices'), i('dried oregano','1 tsp','spices')]),
  r('reintro_003', 'Baked Sweet Potato', 'Soft baked sweet potato with cinnamon', 'dinner', 5, 45, 1, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','low-fat','low-oxalate'],
    115, 2, 0, 27, 3.8, ['vitamin-A','potassium','B6'], 'Peel and eat inner flesh only — fiber is in the skin', 'Good source of easy calories. Watch portion for FODMAP',
    [i('sweet potato','1 medium','produce'), i('cinnamon','1/4 tsp','spices')]),
  r('reintro_004', 'Egg Fried Rice', 'Light egg fried rice with carrots', 'lunch', 5, 10, 2, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','low-fiber'],
    310, 12, 8, 48, 1.2, ['protein','B12'], 'Use garlic-infused oil instead of garlic for low-FODMAP', 'Moderate fat — use minimal oil',
    [i('cooked white rice','2 cups','grains'), i('eggs','2 large','protein'), i('carrots','1 medium','produce'), i('garlic-infused olive oil','1 tbsp','pantry'), i('soy sauce (gluten-free)','1 tbsp','pantry'), i('salt','pinch','spices')]),
  r('reintro_005', 'Greek Yogurt Parfait', 'Lactose-free yogurt with banana and oats', 'breakfast', 5, 0, 1, 'easy',
    [false, false, true, true, false], ['low-fodmap','gluten-free','high-protein'],
    290, 18, 6, 42, 3, ['calcium','protein','probiotics'], 'Use lactose-free Greek yogurt for probiotics', 'Probiotics may help restore gut flora post-resection',
    [i('lactose-free Greek yogurt','1 cup','dairy'), i('ripe banana','1/2','produce'), i('quick oats','2 tbsp','grains')]),
  r('reintro_006', 'Tuna Salad Lettuce Wraps', 'Light tuna salad in butter lettuce cups', 'lunch', 10, 0, 2, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','low-fat','high-protein','low-fiber'],
    230, 30, 8, 4, 0.5, ['omega-3','protein','B12'], 'Skip celery if FODMAP sensitive. Use mayo sparingly', 'Good protein-to-fat ratio for resection patients',
    [i('canned tuna','2 cans (5 oz each)','protein'), i('mayonnaise','1 tbsp','pantry'), i('butter lettuce','1 head','produce'), i('salt','pinch','spices')]),
  r('reintro_007', 'Butternut Squash Soup', 'Creamy blended butternut squash soup', 'soup', 10, 25, 3, 'easy',
    [false, true, true, true, false], ['low-fodmap','dairy-free','gluten-free','low-fat','low-oxalate'],
    140, 3, 2, 30, 3, ['vitamin-A','potassium','magnesium'], 'Blending makes fiber easier to tolerate', 'Good comfort food post-resection. Low fat when made without cream',
    [i('butternut squash','1 medium (about 2 lbs)','produce'), i('olive oil','1 tbsp','pantry'), i('low-sodium vegetable broth','2 cups','pantry'), i('salt','1/2 tsp','spices'), i('ground nutmeg','pinch','spices')]),
  r('reintro_008', 'Peanut Butter Banana Smoothie', 'Creamy PB banana shake with protein', 'smoothie', 5, 0, 1, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','high-protein'],
    380, 22, 14, 48, 3.5, ['protein','potassium','magnesium'], 'Use smooth PB. Limit to 2 tbsp', 'Calorie-dense for maintaining weight post-surgery',
    [i('smooth peanut butter','2 tbsp','pantry'), i('ripe banana','1 medium','produce'), i('protein powder','1 scoop','pantry'), i('almond milk','1 cup','beverages')]),

  // === MAINTENANCE / REMISSION ===
  r('maint_001', 'Grilled Chicken Caesar Wrap', 'Grilled chicken in a soft tortilla with romaine', 'lunch', 10, 10, 1, 'easy',
    [false, false, false, true, false], ['low-fodmap','high-protein'],
    420, 35, 16, 32, 2, ['protein','calcium','B12'], 'Use garlic-free dressing. Soft tortilla is easier than crusty bread', 'Watch fat in dressing — keep light',
    [i('chicken breast','1 (6 oz)','protein'), i('flour tortilla','1 large','grains'), i('romaine lettuce','1 cup','produce'), i('parmesan cheese','2 tbsp','dairy'), i('Caesar dressing (garlic-free)','1 tbsp','pantry')]),
  r('maint_002', 'Pasta with Marinara', 'White pasta with simple tomato sauce', 'dinner', 5, 15, 2, 'easy',
    [false, false, true, true, false], ['dairy-free','low-fat','low-fiber'],
    380, 12, 4, 72, 3, ['iron','B-vitamins'], 'Use white pasta, not whole wheat. Avoid chunky sauce', 'Safe for most resection patients. Keep sauce smooth',
    [i('white pasta','8 oz','grains'), i('marinara sauce','1 cup','pantry'), i('olive oil','1 tsp','pantry'), i('salt','pinch','spices')]),
  r('maint_003', 'Blueberry Oat Pancakes', 'Fluffy oat pancakes with blueberries', 'breakfast', 10, 10, 2, 'easy',
    [false, false, false, true, false], ['dairy-free','gluten-free'],
    320, 10, 8, 52, 4, ['antioxidants','fiber'], 'Blueberries are low-FODMAP in small amounts', 'Good maintenance breakfast. Monitor fiber tolerance',
    [i('oat flour','1 cup','grains'), i('egg','1 large','protein'), i('almond milk','3/4 cup','beverages'), i('blueberries','1/2 cup','produce'), i('baking powder','1 tsp','pantry')]),
  r('maint_004', 'Teriyaki Chicken Bowl', 'Grilled chicken with rice and steamed veggies', 'dinner', 10, 15, 2, 'easy',
    [false, false, false, true, false], ['dairy-free','gluten-free','high-protein'],
    450, 38, 8, 52, 2.5, ['protein','B12','iron'], 'Make teriyaki sauce without garlic — use ginger instead', 'Well-balanced meal for remission',
    [i('chicken breast','2 (6 oz each)','protein'), i('white rice','1 cup','grains'), i('zucchini','1 medium','produce'), i('carrots','1 medium','produce'), i('gluten-free soy sauce','2 tbsp','pantry'), i('fresh ginger','1 tsp grated','produce'), i('maple syrup','1 tbsp','pantry')]),
  r('maint_005', 'Overnight Oats', 'Creamy overnight oats with berries', 'breakfast', 5, 0, 1, 'easy',
    [false, false, false, true, false], ['dairy-free','gluten-free'],
    310, 12, 8, 48, 5, ['fiber','protein','calcium'], 'Use lactose-free milk. Keep berry portions small', 'Good when tolerated. Monitor for increased output',
    [i('rolled oats','1/2 cup','grains'), i('lactose-free milk','1/2 cup','dairy'), i('chia seeds','1 tbsp','pantry'), i('mixed berries','1/4 cup','produce'), i('maple syrup','1 tsp','pantry')]),
  r('maint_006', 'Fish Tacos', 'Baked white fish in soft corn tortillas', 'dinner', 10, 15, 2, 'easy',
    [false, false, false, true, false], ['dairy-free','gluten-free','high-protein','low-fat'],
    340, 28, 8, 36, 3, ['omega-3','protein','B12'], 'Use mild white fish (tilapia, cod). Skip hot sauce', 'Corn tortillas easier than flour for some patients',
    [i('tilapia or cod fillets','2 (5 oz each)','protein'), i('corn tortillas','4 small','grains'), i('lime','1','produce'), i('avocado','1/4','produce'), i('cilantro','2 tbsp','produce'), i('salt','1/2 tsp','spices')]),
  r('maint_007', 'Veggie Stir-Fry with Tofu', 'Gentle stir-fry with well-cooked vegetables', 'dinner', 15, 10, 2, 'easy',
    [false, false, false, true, false], ['low-fodmap','dairy-free','gluten-free','high-protein'],
    290, 18, 12, 28, 3.5, ['protein','iron','calcium'], 'Cook veggies thoroughly. Use garlic-infused oil', 'Good plant protein option during remission',
    [i('firm tofu','14 oz block','protein'), i('zucchini','1 medium','produce'), i('bell pepper','1','produce'), i('carrots','1 medium','produce'), i('garlic-infused olive oil','1 tbsp','pantry'), i('gluten-free soy sauce','2 tbsp','pantry'), i('white rice','1 cup','grains')]),
  r('maint_008', 'Chicken Quesadilla', 'Cheese and chicken in a soft tortilla', 'lunch', 5, 10, 1, 'easy',
    [false, false, false, true, false], ['high-protein'],
    410, 32, 18, 28, 1, ['protein','calcium','B12'], 'Use lactose-free cheese. Keep portions moderate', 'Watch fat content — use minimal cheese if resection',
    [i('chicken breast','1 (6 oz) cooked, shredded','protein'), i('flour tortilla','1 large','grains'), i('lactose-free cheddar cheese','1/4 cup shredded','dairy')]),

  // === SNACKS & SMOOTHIES ===
  r('snack_001', 'Rice Cakes with Almond Butter', 'Plain rice cakes with smooth almond butter', 'snack', 2, 0, 1, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fiber'],
    190, 5, 10, 22, 1.5, ['vitamin-E','magnesium'], 'Use smooth nut butter only', 'Good quick snack post-resection',
    [i('plain rice cakes','2','grains'), i('smooth almond butter','1 tbsp','pantry')]),
  r('snack_002', 'Hard Boiled Eggs', 'Simple hard boiled eggs with salt', 'snack', 2, 12, 2, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fiber','high-protein','low-residue','low-oxalate'],
    140, 12, 10, 1, 0, ['B12','protein','iron'], 'One of the best portable protein sources', 'Excellent post-resection snack',
    [i('eggs','2 large','protein'), i('salt','pinch','spices')]),
  r('snack_003', 'Banana', 'Simple ripe banana', 'snack', 1, 0, 1, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fat','low-residue'],
    105, 1, 0.4, 27, 3, ['potassium','B6'], 'Must be ripe — unripe bananas have resistant starch', 'Safe and easy calories',
    [i('ripe banana','1 medium','produce')]),
  r('smoothie_001', 'Green Recovery Smoothie', 'Spinach-free green smoothie with cucumber', 'smoothie', 5, 0, 1, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','low-fat'],
    220, 18, 4, 32, 2, ['protein','vitamin-C','potassium'], 'No raw spinach (oxalate). Use cucumber and banana base', 'Low oxalate version safe for resection patients',
    [i('cucumber','1/2 medium','produce'), i('ripe banana','1 medium','produce'), i('protein powder','1 scoop','pantry'), i('almond milk','1 cup','beverages')]),
  r('smoothie_002', 'Tropical Protein Smoothie', 'Pineapple, banana, and protein powder', 'smoothie', 5, 0, 1, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','high-protein'],
    310, 25, 3, 48, 2.5, ['protein','vitamin-C','bromelain'], 'Pineapple has bromelain which aids digestion', 'Good calorie boost post-resection',
    [i('frozen pineapple chunks','1/2 cup','frozen'), i('ripe banana','1 medium','produce'), i('protein powder','1 scoop','pantry'), i('almond milk','1 cup','beverages')]),

  // === SOUPS (great for Crohn's) ===
  r('soup_001', 'Carrot Ginger Soup', 'Smooth pureed carrot soup with ginger', 'soup', 10, 20, 3, 'easy',
    [false, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fat','low-fiber','low-oxalate'],
    120, 2, 2, 24, 3, ['vitamin-A','potassium'], 'Ginger can help with nausea. Puree until silky smooth', 'Excellent post-resection — easy to absorb',
    [i('carrots','6 medium','produce'), i('fresh ginger','1 inch piece','produce'), i('olive oil','1 tbsp','pantry'), i('low-sodium vegetable broth','3 cups','pantry'), i('salt','1/2 tsp','spices')]),
  r('soup_002', 'Potato Leek Soup', 'Creamy potato soup (leek greens only for low-FODMAP)', 'soup', 10, 25, 3, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','low-fat'],
    180, 4, 3, 36, 2.5, ['potassium','B6','vitamin-C'], 'Use green part of leek only for low-FODMAP', 'Good comfort soup. Puree for easier digestion',
    [i('russet potatoes','3 medium','produce'), i('leek (green parts only)','2','produce'), i('olive oil','1 tbsp','pantry'), i('low-sodium vegetable broth','3 cups','pantry'), i('salt','1/2 tsp','spices')]),

  // === BREAKFAST EXTRAS ===
  r('bfast_001', 'Cream of Rice Cereal', 'Smooth hot cereal with cinnamon', 'breakfast', 1, 5, 1, 'easy',
    [true, true, true, true, true], ['low-fodmap','dairy-free','gluten-free','low-fat','low-fiber','low-residue','low-oxalate'],
    130, 2, 0.5, 28, 0.2, [], 'One of the gentlest breakfast options during a flare', 'Safe at all post-resection stages',
    [i('cream of rice cereal','1/4 cup dry','grains'), i('cinnamon','1/4 tsp','spices'), i('salt','pinch','spices')]),
  r('bfast_002', 'French Toast (White Bread)', 'Egg-dipped white bread, pan-fried', 'breakfast', 5, 10, 2, 'easy',
    [false, true, true, true, true], ['low-fiber','low-residue'],
    340, 14, 12, 42, 1, ['protein','B12'], 'Use white bread and lactose-free milk. Light on butter', 'Keep butter minimal for fat control',
    [i('white bread','4 slices','grains'), i('eggs','2 large','protein'), i('lactose-free milk','1/4 cup','dairy'), i('butter','1 tbsp','dairy'), i('cinnamon','1/4 tsp','spices'), i('maple syrup','1 tbsp','pantry')]),
  r('bfast_003', 'Protein Oatmeal Bowl', 'Oatmeal with protein powder and banana', 'breakfast', 3, 5, 1, 'easy',
    [false, true, true, true, true], ['dairy-free','gluten-free','high-protein'],
    350, 28, 5, 52, 4.5, ['protein','potassium','iron'], 'Use unflavored protein powder — avoid artificial sweeteners', 'Good calories and protein for recovery',
    [i('quick oats','1/2 cup','grains'), i('protein powder','1 scoop','pantry'), i('ripe banana','1 medium','produce'), i('salt','pinch','spices')]),

  // === DINNER EXTRAS ===
  r('dinner_001', 'Lemon Herb Chicken', 'Baked chicken breast with lemon and herbs', 'dinner', 10, 25, 2, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','low-fat','high-protein','low-oxalate'],
    280, 42, 8, 2, 0, ['protein','B12','zinc','iron'], 'Use dried herbs — fresh herbs are fine too', 'Great lean protein. Low fat ideal for resection',
    [i('chicken breast','2 (6 oz each)','protein'), i('lemon','1','produce'), i('olive oil','1 tbsp','pantry'), i('dried thyme','1 tsp','spices'), i('dried rosemary','1/2 tsp','spices'), i('salt','1/2 tsp','spices')]),
  r('dinner_002', 'Baked Cod with Mashed Potatoes', 'Flaky white cod with creamy mash', 'dinner', 10, 25, 2, 'easy',
    [false, true, true, true, true], ['low-fodmap','gluten-free','low-fiber','high-protein','low-oxalate'],
    340, 32, 8, 34, 2, ['omega-3','protein','B12','potassium'], 'White fish is gentler than fatty fish during flares', 'Excellent post-resection meal',
    [i('cod fillets','2 (5 oz each)','protein'), i('russet potatoes','2 medium','produce'), i('lactose-free milk','2 tbsp','dairy'), i('butter','1 tsp','dairy'), i('lemon','1/2','produce'), i('salt','1/2 tsp','spices')]),
  r('dinner_003', 'Herb Rice Pilaf with Chicken', 'Flavorful rice with tender chicken strips', 'dinner', 10, 25, 2, 'easy',
    [false, false, true, true, false], ['low-fodmap','dairy-free','gluten-free','high-protein'],
    410, 36, 6, 50, 1, ['protein','B12','iron'], 'Use garlic-infused oil, not raw garlic', 'Well-balanced and safe for most resection patients',
    [i('chicken breast','2 (6 oz each)','protein'), i('white rice','1 cup','grains'), i('garlic-infused olive oil','1 tbsp','pantry'), i('dried parsley','1 tsp','spices'), i('low-sodium chicken broth','2 cups','pantry'), i('salt','1/2 tsp','spices')]),

  // === LUNCH EXTRAS ===
  r('lunch_001', 'Chicken Salad Sandwich', 'Shredded chicken salad on white bread', 'lunch', 10, 0, 1, 'easy',
    [false, false, true, true, false], ['low-fiber','high-protein'],
    380, 28, 14, 34, 1.5, ['protein','B12'], 'Use mayo sparingly. Skip celery/onion for low-FODMAP', 'Watch mayo fat content',
    [i('chicken breast','1 (6 oz) cooked, shredded','protein'), i('mayonnaise','1 tbsp','pantry'), i('white bread','2 slices','grains'), i('salt','pinch','spices')]),
  r('lunch_002', 'Turkey and Cheese Roll-Ups', 'Deli turkey with lactose-free cheese', 'lunch', 5, 0, 1, 'easy',
    [false, true, true, true, true], ['low-fodmap','gluten-free','low-fiber','high-protein','low-residue'],
    200, 24, 8, 2, 0, ['protein','B12','calcium'], 'Choose nitrate-free turkey when possible', 'Great quick low-residue lunch',
    [i('deli turkey (nitrate-free)','6 slices','protein'), i('lactose-free cheddar cheese','2 slices','dairy')]),
];

// Helper to build RecipeSummary from compact args
function r(
  id: string, name: string, description: string,
  mealType: RecipeSummary['mealType'],
  prepMinutes: number, cookMinutes: number, servings: number, difficulty: string,
  phases: boolean[], dietaryTags: string[],
  cal: number, pro: number, fat: number, carb: number, fib: number,
  keyNutrients: string[], crohnsNotes: string, postResectionNotes: string,
  ingredients: RecipeIngredient[] = [],
): RecipeSummary {
  return {
    id, name, description, mealType, prepMinutes, cookMinutes, servings, difficulty,
    phaseSafe: {
      phase_2_full_liquids: phases[0],
      phase_3_low_residue: phases[1],
      phase_4_reintroduction: phases[2],
      phase_5_maintenance: phases[3],
      during_flare: phases[4],
    },
    dietaryTags,
    nutrition: { calories: cal, protein_g: pro, fat_g: fat, carbs_g: carb, fiber_g: fib },
    keyNutrients, crohnsNotes, postResectionNotes, ingredients,
  };
}

// Shorthand ingredient helper
function i(item: string, amount: string, category: GroceryCategory): RecipeIngredient {
  return { item, amount, category };
}

/**
 * Get all recipes.
 */
export function getAllRecipes(): RecipeSummary[] {
  return RECIPES;
}

/**
 * Get a recipe by ID.
 */
export function getRecipeById(id: string): RecipeSummary | undefined {
  return RECIPES.find((r) => r.id === id);
}

/**
 * Filter recipes that are safe for a given phase and disease state.
 */
export function getCompatibleRecipes(
  phase: string,
  diseaseState: string,
  dietaryPreferences: string[] = [],
  dislikedFoods: string[] = [],
): RecipeSummary[] {
  return RECIPES.filter((recipe) => {
    // Phase safety check
    const phaseKey = getPhaseKey(phase);
    if (phaseKey && !recipe.phaseSafe[phaseKey]) return false;

    // Flare safety check
    if (diseaseState === 'flare' && !recipe.phaseSafe.during_flare) return false;

    // Dietary preference check — recipe must have ALL requested tags
    for (const pref of dietaryPreferences) {
      if (!recipe.dietaryTags.includes(pref)) return false;
    }

    // Disliked foods check — recipe name/description must not contain disliked item
    const recipeLower = `${recipe.name} ${recipe.description}`.toLowerCase();
    for (const disliked of dislikedFoods) {
      if (recipeLower.includes(disliked.toLowerCase())) return false;
    }

    return true;
  });
}
