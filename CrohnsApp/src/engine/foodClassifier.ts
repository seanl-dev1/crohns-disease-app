/**
 * Food Classification Engine — Deterministic, no AI required.
 *
 * Takes a product's ingredients + nutrition and produces a
 * Crohn's-specific safety analysis with GREEN/YELLOW/RED rating.
 *
 * 6 scoring dimensions:
 * 1. Trigger ingredient score
 * 2. FODMAP level
 * 3. Fiber analysis
 * 4. Post-resection flags
 * 5. Flare safety
 * 6. Nutrient highlights (positive)
 */

import { parseIngredients } from './ingredientParser';
import { lookupTrigger, type TriggerIngredient, type Severity } from './triggerDatabase';

// --- Types ---

export type Rating = 'GREEN' | 'YELLOW' | 'RED';

export interface DimensionResult {
  rating: Rating;
  flags: Flag[];
}

export interface Flag {
  type: 'danger' | 'warning' | 'info' | 'positive';
  title: string;
  detail: string;
  category?: string;
}

export interface ClassificationResult {
  overallRating: Rating;
  productName: string;
  brand: string;
  ingredients: string[];
  dimensions: {
    triggerIngredients: DimensionResult;
    fodmap: DimensionResult;
    fiber: DimensionResult;
    postResection: DimensionResult;
    flareSafety: DimensionResult;
    nutrientHighlights: DimensionResult;
  };
  allFlags: Flag[];
  summary: string;
}

export interface UserContext {
  diseaseState: 'flare' | 'remission' | 'uncertain';
  hasResection: boolean;
  monthsSinceResection?: number;
}

export interface NutritionData {
  calories_100g?: number;
  fat_100g?: number;
  fiber_100g?: number;
  sugars_100g?: number;
  proteins_100g?: number;
  sodium_100g?: number;
  calcium_100g?: number;
  iron_100g?: number;
  'vitamin-b12_100g'?: number;
  'vitamin-d_100g'?: number;
  zinc_100g?: number;
  'saturated-fat_100g'?: number;
}

// --- High FODMAP ingredient keywords ---
const HIGH_FODMAP_KEYWORDS = [
  'inulin', 'chicory root', 'fos', 'fructooligosaccharides',
  'honey', 'agave', 'apple juice concentrate', 'pear juice concentrate',
  'high fructose corn syrup', 'hfcs', 'glucose-fructose',
  'garlic', 'onion', 'shallot', 'leek',
  'milk powder', 'milk solids', 'whey powder', 'lactose',
  'sorbitol', 'mannitol', 'xylitol', 'maltitol', 'isomalt',
  'wheat', 'rye', 'barley', // fructans in large amounts
];

const MODERATE_FODMAP_KEYWORDS = [
  'oat', 'corn syrup', 'molasses',
  'cashew', 'pistachio', 'almond',
  'avocado', 'mushroom',
  'coconut milk', 'coconut cream',
];

// --- Insoluble fiber indicators ---
const INSOLUBLE_FIBER = [
  'wheat bran', 'cellulose', 'whole grain', 'whole wheat',
  'brown rice', 'flaxseed', 'chia seed', 'hemp seed',
  'popcorn', 'corn bran',
];

const SOLUBLE_FIBER = [
  'oat fiber', 'oat bran', 'psyllium', 'pectin',
  'guar gum', 'acacia fiber',
];

// --- Main Classification Function ---

export function classifyFood(
  ingredientsText: string,
  nutrition: NutritionData,
  productName: string,
  brand: string,
  userContext: UserContext,
  servingSizeG: number = 100, // default to 100g if unknown
): ClassificationResult {
  const ingredients = parseIngredients(ingredientsText);
  const servingFactor = servingSizeG / 100;

  // Score each dimension
  const triggerIngredients = scoreTriggerIngredients(ingredients, userContext);
  const fodmap = scoreFodmap(ingredients);
  const fiber = scoreFiber(ingredients, nutrition, userContext, servingFactor);
  const postResection = scorePostResection(ingredients, nutrition, userContext, servingFactor);
  const flareSafety = scoreFlareSafety(ingredients, nutrition, userContext, servingFactor);
  const nutrientHighlights = scoreNutrientHighlights(nutrition, servingFactor);

  // Calculate overall rating
  const dimensionRatings = [
    triggerIngredients.rating,
    fodmap.rating,
    fiber.rating,
    postResection.rating,
    flareSafety.rating,
  ];

  const redCount = dimensionRatings.filter((r) => r === 'RED').length;
  const yellowCount = dimensionRatings.filter((r) => r === 'YELLOW').length;

  let overallRating: Rating;
  if (redCount > 0) {
    overallRating = 'RED';
  } else if (yellowCount >= 3) {
    overallRating = 'RED';
  } else if (yellowCount > 0) {
    overallRating = 'YELLOW';
  } else {
    overallRating = 'GREEN';
  }

  // Collect all flags
  const allFlags = [
    ...triggerIngredients.flags,
    ...fodmap.flags,
    ...fiber.flags,
    ...postResection.flags,
    ...flareSafety.flags,
    ...nutrientHighlights.flags,
  ];

  // Generate summary
  const summary = generateSummary(overallRating, allFlags, productName, userContext);

  return {
    overallRating,
    productName,
    brand,
    ingredients,
    dimensions: {
      triggerIngredients,
      fodmap,
      fiber,
      postResection,
      flareSafety,
      nutrientHighlights,
    },
    allFlags,
    summary,
  };
}

// --- Dimension 1: Trigger Ingredients ---

function scoreTriggerIngredients(
  ingredients: string[],
  ctx: UserContext
): DimensionResult {
  const flags: Flag[] = [];
  let hasRed = false;
  let yellowCount = 0;

  for (let i = 0; i < ingredients.length; i++) {
    const trigger = lookupTrigger(ingredients[i]);
    if (!trigger) continue;

    // Use post-resection severity if applicable
    const severity =
      ctx.hasResection ? trigger.postResectionSeverity : trigger.severity;

    // Worse during flare upgrade
    const effectiveSeverity: Severity =
      trigger.worseDuringFlare && ctx.diseaseState === 'flare' && severity === 'YELLOW'
        ? 'RED'
        : severity;

    if (effectiveSeverity === 'RED') {
      hasRed = true;
      flags.push({
        type: 'danger',
        title: `🔴 ${trigger.name}`,
        detail: trigger.mechanism,
        category: trigger.category,
      });
    } else if (effectiveSeverity === 'YELLOW') {
      yellowCount++;
      flags.push({
        type: 'warning',
        title: `🟡 ${trigger.name}`,
        detail: trigger.mechanism,
        category: trigger.category,
      });
    }
  }

  let rating: Rating = 'GREEN';
  if (hasRed) rating = 'RED';
  else if (yellowCount > 0) rating = 'YELLOW';

  return { rating, flags };
}

// --- Dimension 2: FODMAP Level ---

function scoreFodmap(ingredients: string[]): DimensionResult {
  const flags: Flag[] = [];
  let hasHigh = false;
  let moderateCount = 0;

  const joined = ingredients.join(' ').toLowerCase();

  for (const keyword of HIGH_FODMAP_KEYWORDS) {
    if (joined.includes(keyword)) {
      hasHigh = true;
      flags.push({
        type: 'warning',
        title: `High FODMAP: ${keyword}`,
        detail: `"${keyword}" is high FODMAP — may cause gas, bloating, or diarrhea`,
        category: 'FODMAP',
      });
    }
  }

  for (const keyword of MODERATE_FODMAP_KEYWORDS) {
    if (joined.includes(keyword)) {
      moderateCount++;
    }
  }

  // FODMAP stacking: 3+ moderate = RED
  let rating: Rating = 'GREEN';
  if (hasHigh) {
    rating = 'RED';
  } else if (moderateCount >= 3) {
    rating = 'RED';
    flags.push({
      type: 'warning',
      title: 'FODMAP Stacking',
      detail: `${moderateCount} moderate FODMAP ingredients — combined load may cause symptoms`,
      category: 'FODMAP',
    });
  } else if (moderateCount > 0) {
    rating = 'YELLOW';
  }

  return { rating, flags };
}

// --- Dimension 3: Fiber Analysis ---

function scoreFiber(
  ingredients: string[],
  nutrition: NutritionData,
  ctx: UserContext,
  servingFactor: number
): DimensionResult {
  const flags: Flag[] = [];
  const fiberPerServing = (nutrition.fiber_100g || 0) * servingFactor;
  const joined = ingredients.join(' ').toLowerCase();

  // Detect fiber type
  const hasInsoluble = INSOLUBLE_FIBER.some((f) => joined.includes(f));
  const hasSoluble = SOLUBLE_FIBER.some((f) => joined.includes(f));

  let rating: Rating = 'GREEN';

  if (fiberPerServing > 8 && ctx.hasResection) {
    rating = 'RED';
    flags.push({
      type: 'danger',
      title: `Very high fiber (${fiberPerServing.toFixed(1)}g/serving)`,
      detail: 'Fiber over 8g per serving is risky post-resection — potential obstruction at anastomosis site',
      category: 'Fiber',
    });
  } else if (fiberPerServing > 5) {
    rating = ctx.diseaseState === 'flare' ? 'RED' : 'YELLOW';
    flags.push({
      type: 'warning',
      title: `High fiber (${fiberPerServing.toFixed(1)}g/serving)`,
      detail: ctx.diseaseState === 'flare'
        ? 'High fiber is risky during a flare — stick to low-residue foods'
        : 'Moderate to high fiber — introduce slowly, monitor symptoms',
      category: 'Fiber',
    });
  } else if (fiberPerServing > 2 && hasInsoluble && !hasSoluble) {
    rating = 'YELLOW';
    flags.push({
      type: 'warning',
      title: 'Insoluble fiber detected',
      detail: 'Contains insoluble fiber (wheat bran, cellulose) which can irritate inflamed tissue',
      category: 'Fiber',
    });
  }

  // Seed/nut/popcorn check for post-resection
  if (ctx.hasResection) {
    const seedRisk = ['seed', 'nut', 'popcorn', 'corn kernel'].some((s) =>
      joined.includes(s)
    );
    if (seedRisk) {
      flags.push({
        type: 'warning',
        title: 'Seeds/nuts detected',
        detail: 'Seeds and nuts carry obstruction risk at the anastomosis site — chew very thoroughly or avoid',
        category: 'Post-Resection',
      });
      if (rating === 'GREEN') rating = 'YELLOW';
    }
  }

  return { rating, flags };
}

// --- Dimension 4: Post-Resection Flags ---

function scorePostResection(
  ingredients: string[],
  nutrition: NutritionData,
  ctx: UserContext,
  servingFactor: number
): DimensionResult {
  const flags: Flag[] = [];

  if (!ctx.hasResection) {
    return { rating: 'GREEN', flags: [] };
  }

  let rating: Rating = 'GREEN';
  const fatPerServing = (nutrition.fat_100g || 0) * servingFactor;
  const sugarPerServing = (nutrition.sugars_100g || 0) * servingFactor;

  // Fat check — bile acid malabsorption
  if (fatPerServing > 15) {
    rating = 'RED';
    flags.push({
      type: 'danger',
      title: `High fat (${fatPerServing.toFixed(1)}g/serving)`,
      detail: 'After bowel resection, high fat causes bile acid diarrhea. Keep meals under 15g fat.',
      category: 'Post-Resection',
    });
  } else if (fatPerServing > 8) {
    rating = 'YELLOW';
    flags.push({
      type: 'warning',
      title: `Moderate fat (${fatPerServing.toFixed(1)}g/serving)`,
      detail: 'Moderate fat — may be fine but watch for oily stools or diarrhea',
      category: 'Post-Resection',
    });
  }

  // Sugar check — osmotic diarrhea
  if (sugarPerServing > 20) {
    if (rating !== 'RED') rating = 'YELLOW';
    flags.push({
      type: 'warning',
      title: `High sugar (${sugarPerServing.toFixed(1)}g/serving)`,
      detail: 'Very high sugar can cause osmotic diarrhea with shortened bowel',
      category: 'Post-Resection',
    });
  }

  // Caffeine check
  const joined = ingredients.join(' ').toLowerCase();
  const hasCaffeine = ['coffee', 'caffeine', 'guarana', 'green tea extract', 'yerba mate'].some(
    (c) => joined.includes(c)
  );
  if (hasCaffeine) {
    if (rating !== 'RED') rating = 'YELLOW';
    flags.push({
      type: 'warning',
      title: 'Contains caffeine',
      detail: 'Caffeine stimulates motility — can worsen diarrhea post-resection',
      category: 'Post-Resection',
    });
  }

  // Oxalate check — kidney stone risk after ileal resection
  const highOxalate = ['spinach', 'rhubarb', 'beet', 'swiss chard', 'chocolate', 'cocoa'].some(
    (o) => joined.includes(o)
  );
  if (highOxalate) {
    if (rating !== 'RED') rating = 'YELLOW';
    flags.push({
      type: 'warning',
      title: 'High oxalate content',
      detail: 'After ileal resection, oxalate absorption increases — kidney stone risk. Stay hydrated.',
      category: 'Post-Resection',
    });
  }

  return { rating, flags };
}

// --- Dimension 5: Flare Safety ---

function scoreFlareSafety(
  ingredients: string[],
  nutrition: NutritionData,
  ctx: UserContext,
  servingFactor: number
): DimensionResult {
  if (ctx.diseaseState === 'remission') {
    return { rating: 'GREEN', flags: [] };
  }

  const flags: Flag[] = [];
  let rating: Rating = 'GREEN';
  const joined = ingredients.join(' ').toLowerCase();
  const fatPerServing = (nutrition.fat_100g || 0) * servingFactor;

  // During flare or uncertain — extra restrictions
  const isFlare = ctx.diseaseState === 'flare';

  // Insoluble fiber → RED during flare
  if (INSOLUBLE_FIBER.some((f) => joined.includes(f))) {
    rating = isFlare ? 'RED' : 'YELLOW';
    flags.push({
      type: isFlare ? 'danger' : 'warning',
      title: 'Insoluble fiber — risky during flare',
      detail: 'Switch to refined/white versions during active disease',
      category: 'Flare Safety',
    });
  }

  // Spicy
  if (['capsaicin', 'hot sauce', 'chili', 'cayenne', 'jalapeño', 'habanero', 'hot pepper'].some(
    (s) => joined.includes(s)
  )) {
    rating = 'RED';
    flags.push({
      type: 'danger',
      title: 'Spicy ingredients',
      detail: 'Spicy food irritates inflamed tissue and accelerates motility',
      category: 'Flare Safety',
    });
  }

  // High fat during flare
  if (fatPerServing > 10 && isFlare) {
    rating = 'RED';
    flags.push({
      type: 'danger',
      title: 'High fat during flare',
      detail: `${fatPerServing.toFixed(1)}g fat/serving — too much during active disease`,
      category: 'Flare Safety',
    });
  }

  // Raw fruit/vegetable indicators
  if (['raw', 'fresh fruit', 'fresh vegetable', 'salad', 'coleslaw'].some(
    (r) => joined.includes(r)
  )) {
    rating = isFlare ? 'RED' : 'YELLOW';
    flags.push({
      type: isFlare ? 'danger' : 'warning',
      title: 'Raw/fresh produce',
      detail: 'Cook all vegetables during a flare to reduce fiber and ease digestion',
      category: 'Flare Safety',
    });
  }

  return { rating, flags };
}

// --- Dimension 6: Nutrient Highlights ---

function scoreNutrientHighlights(
  nutrition: NutritionData,
  servingFactor: number
): DimensionResult {
  const flags: Flag[] = [];

  const protein = (nutrition.proteins_100g || 0) * servingFactor;
  const calcium = (nutrition.calcium_100g || 0) * servingFactor;
  const iron = (nutrition.iron_100g || 0) * servingFactor;
  const b12 = (nutrition['vitamin-b12_100g'] || 0) * servingFactor;
  const vitD = (nutrition['vitamin-d_100g'] || 0) * servingFactor;
  const zinc = (nutrition.zinc_100g || 0) * servingFactor;

  if (protein >= 10) {
    flags.push({
      type: 'positive',
      title: `✅ Good protein (${protein.toFixed(0)}g)`,
      detail: 'Protein supports healing and maintains muscle mass',
      category: 'Nutrients',
    });
  }

  if (iron >= 2) {
    flags.push({
      type: 'positive',
      title: '✅ Good iron source',
      detail: 'Iron is important — Crohn\'s patients are often deficient',
      category: 'Nutrients',
    });
  }

  if (b12 > 0.5) {
    flags.push({
      type: 'positive',
      title: '✅ Contains B12',
      detail: 'B12 is critical after ileal resection — absorption is reduced',
      category: 'Nutrients',
    });
  }

  if (calcium >= 100) {
    flags.push({
      type: 'positive',
      title: '✅ Good calcium source',
      detail: 'Important for bone health — corticosteroid use increases bone loss risk',
      category: 'Nutrients',
    });
  }

  if (vitD > 1) {
    flags.push({
      type: 'positive',
      title: '✅ Contains Vitamin D',
      detail: 'Most Crohn\'s patients are Vitamin D deficient — supplementation is important',
      category: 'Nutrients',
    });
  }

  return { rating: 'GREEN', flags };
}

// --- Summary Generator ---

function generateSummary(
  rating: Rating,
  flags: Flag[],
  productName: string,
  ctx: UserContext
): string {
  const dangers = flags.filter((f) => f.type === 'danger');
  const warnings = flags.filter((f) => f.type === 'warning');
  const positives = flags.filter((f) => f.type === 'positive');

  if (rating === 'GREEN') {
    const positiveText =
      positives.length > 0
        ? ` Plus: ${positives.map((p) => p.title.replace('✅ ', '')).join(', ')}.`
        : '';
    return `This looks safe for you.${positiveText} As always, listen to your body.`;
  }

  if (rating === 'YELLOW') {
    const warnText = warnings
      .slice(0, 2)
      .map((w) => w.title.replace('🟡 ', ''))
      .join(', ');
    return `Proceed with caution — ${warnText}. Small portion first, and pay attention to how you feel.`;
  }

  // RED
  const dangerText = dangers
    .slice(0, 2)
    .map((d) => d.title.replace('🔴 ', ''))
    .join(', ');
  const stateNote =
    ctx.diseaseState === 'flare'
      ? ' Especially risky during a flare.'
      : ctx.hasResection
      ? ' Especially risky with your resection history.'
      : '';
  return `Not recommended — ${dangerText || warnings[0]?.title || 'multiple concerns'}.${stateNote} Consider a safer alternative.`;
}
