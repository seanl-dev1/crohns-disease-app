/**
 * Replacement suggestions for problematic ingredients.
 * Maps trigger ingredient IDs to specific Crohn's-safe alternatives.
 */

export interface Replacement {
  name: string;
  why: string;
}

/**
 * Trigger ingredient ID → array of safe replacements.
 * IDs match those in triggerDatabase.ts.
 */
const REPLACEMENTS: Record<string, Replacement[]> = {
  // === EMULSIFIERS ===
  carrageenan: [
    { name: 'Sunflower lecithin', why: 'Non-irritating emulsifier, no mucosal damage' },
    { name: 'Arrowroot powder', why: 'Natural thickener, gentle on the gut' },
  ],
  polysorbate_80: [
    { name: 'Sunflower lecithin', why: 'Safe emulsifier with no mucus layer thinning' },
    { name: 'Soy lecithin', why: 'Generally safe at food-grade levels' },
  ],
  cmc: [
    { name: 'Tapioca starch', why: 'Natural thickener, well tolerated' },
    { name: 'Arrowroot powder', why: 'Gentle binding agent, easy to digest' },
  ],
  mono_diglycerides: [
    { name: 'Sunflower lecithin', why: 'Cleaner emulsifier with less gut impact' },
  ],

  // === ARTIFICIAL SWEETENERS ===
  sucralose: [
    { name: 'Stevia (pure)', why: 'Plant-based, no known gut microbiome disruption' },
    { name: 'Monk fruit extract', why: 'Zero-calorie, no osmotic or microbiome effects' },
    { name: 'Maple syrup (small amounts)', why: 'Natural sugar, easier to absorb than artificial' },
  ],
  aspartame: [
    { name: 'Stevia (pure)', why: 'Plant-based, better microbiome profile' },
    { name: 'Monk fruit extract', why: 'No known impact on gut bacteria' },
  ],
  saccharin: [
    { name: 'Stevia (pure)', why: 'Does not alter gut bacteria populations' },
    { name: 'Monk fruit extract', why: 'Safe zero-calorie alternative' },
  ],
  acesulfame_k: [
    { name: 'Stevia (pure)', why: 'Preserves beneficial gut bacteria' },
    { name: 'Monk fruit extract', why: 'No impact on microbiome' },
  ],

  // === SUGAR ALCOHOLS ===
  sorbitol: [
    { name: 'Erythritol', why: '90% absorbed in small intestine — minimal osmotic effect' },
    { name: 'Monk fruit extract', why: 'Zero-calorie with no laxative effect' },
    { name: 'Stevia (pure)', why: 'No osmotic diarrhea risk' },
  ],
  mannitol: [
    { name: 'Erythritol', why: 'Best tolerated sugar alcohol, low FODMAP' },
    { name: 'Monk fruit extract', why: 'No osmotic or FODMAP issues' },
  ],
  xylitol: [
    { name: 'Erythritol', why: 'Much better absorbed, less GI side effects' },
    { name: 'Stevia (pure)', why: 'No osmotic laxative effect' },
  ],
  maltitol: [
    { name: 'Erythritol', why: 'Dramatically fewer GI side effects' },
    { name: 'Monk fruit extract', why: 'No sugar alcohol GI issues at all' },
  ],
  isomalt: [
    { name: 'Erythritol', why: 'Well absorbed, minimal osmotic effect' },
    { name: 'Stevia (pure)', why: 'No osmotic diarrhea risk' },
  ],

  // === MALTODEXTRIN ===
  maltodextrin: [
    { name: 'Tapioca starch', why: 'Clean carb source, no mucosal barrier damage' },
    { name: 'Rice starch', why: 'Gentle, well tolerated, no E. coli adhesion risk' },
    { name: 'Oat flour', why: 'Soluble fiber source, supports gut barrier' },
  ],

  // === HFCS / FRUCTOSE ===
  hfcs: [
    { name: 'Rice syrup', why: 'Glucose-based — no fructose malabsorption risk' },
    { name: 'Maple syrup (moderate)', why: 'Balanced glucose:fructose ratio, easier to absorb' },
    { name: 'Dextrose (glucose)', why: 'Directly absorbed, no excess fructose' },
  ],
  agave: [
    { name: 'Maple syrup', why: 'Much lower fructose ratio than agave' },
    { name: 'Rice syrup', why: 'Glucose-based, no fructose load' },
    { name: 'Honey (small amounts)', why: 'Better fructose:glucose ratio than agave' },
  ],

  // === FIBER (problematic types) ===
  inulin: [
    { name: 'Psyllium husk', why: 'Soluble fiber that does not ferment rapidly — well tolerated' },
    { name: 'Oat fiber', why: 'Gentle soluble fiber, low FODMAP in normal servings' },
  ],
  wheat_bran: [
    { name: 'Oat bran', why: 'Soluble fiber — less abrasive to healing tissue' },
    { name: 'Psyllium husk', why: 'Forms gentle gel, not abrasive like insoluble fiber' },
  ],

  // === DAIRY ===
  lactose: [
    { name: 'Lactose-free dairy (e.g. Lactaid)', why: 'Same nutrition, lactase pre-added' },
    { name: 'Oat milk', why: 'Gentle, low FODMAP in normal servings' },
    { name: 'Rice milk', why: 'Very easy to digest, low allergen risk' },
  ],
  casein: [
    { name: 'Pea protein', why: 'Complete protein, no dairy immune trigger' },
    { name: 'Rice protein', why: 'Hypoallergenic, easy to digest' },
    { name: 'Oat milk products', why: 'No casein, gentle on the gut' },
  ],

  // === GLUTEN ===
  gluten: [
    { name: 'Rice flour', why: 'Naturally gluten-free, easy to digest' },
    { name: 'Certified GF oat flour', why: 'Safe for gluten-sensitive, good soluble fiber' },
    { name: 'Tapioca flour', why: 'Gluten-free, light and well tolerated' },
  ],

  // === PRESERVATIVES ===
  sodium_nitrite: [
    { name: 'Uncured / celery-powder-cured meats', why: 'Avoids synthetic nitrites linked to IBD risk' },
    { name: 'Fresh-cooked meats', why: 'No preservatives needed' },
  ],
  sodium_benzoate: [
    { name: 'Products preserved with vitamin C', why: 'Ascorbic acid preservation without permeability risk' },
  ],
  tbhq: [
    { name: 'Products with rosemary extract', why: 'Natural antioxidant preservative, no immune impairment' },
  ],
  sulfites: [
    { name: 'Sulfite-free wines / dried fruits', why: 'Many brands now offer sulfite-free options' },
    { name: 'Fresh or frozen produce', why: 'No sulfite preservation needed' },
  ],

  // === FOOD COLORINGS ===
  titanium_dioxide: [
    { name: 'Products without whitener', why: 'Many brands have removed TiO2 (banned in EU)' },
  ],
  red_40: [
    { name: 'Products with beet juice coloring', why: 'Natural red color, no inflammation risk' },
  ],
  yellow_5: [
    { name: 'Products with turmeric coloring', why: 'Natural yellow, anti-inflammatory properties' },
  ],

  // === THICKENERS & GUMS ===
  xanthan_gum: [
    { name: 'Arrowroot powder', why: 'Natural thickener, no bloating or gas' },
    { name: 'Tapioca starch', why: 'Clean thickener, well tolerated' },
  ],
  guar_gum: [
    { name: 'Arrowroot powder', why: 'Thickens without gas or bloating' },
  ],

  // === SPICY COMPOUNDS ===
  capsaicin: [
    { name: 'Turmeric', why: 'Adds warmth with anti-inflammatory benefits' },
    { name: 'Ginger', why: 'Mild heat, actually soothes the GI tract' },
    { name: 'Mild herbs (basil, oregano)', why: 'Flavor without GI irritation' },
  ],

  // === CAFFEINE ===
  caffeine: [
    { name: 'Decaf coffee or tea', why: 'Same ritual, 97% less GI motility stimulation' },
    { name: 'Rooibos tea', why: 'Naturally caffeine-free, anti-inflammatory' },
    { name: 'Herbal tea (chamomile, peppermint)', why: 'Caffeine-free and may soothe GI symptoms' },
  ],

  // === ALCOHOL ===
  alcohol: [
    { name: 'Sparkling water with fruit', why: 'Festive feel without permeability damage' },
    { name: 'Low-sugar kombucha', why: 'Probiotic benefit, negligible alcohol' },
  ],

  // === ACIDS ===
  citric_acid: [
    { name: 'Malic acid (apple-based)', why: 'Less irritating to inflamed mucosa' },
  ],

  // === HIGH OXALATE ===
  oxalate: [
    { name: 'Kale or romaine lettuce', why: 'Low oxalate greens, lower kidney stone risk post-resection' },
    { name: 'Zucchini or cucumber', why: 'Very low oxalate, hydrating' },
  ],

  // === UPF MARKERS ===
  natural_flavors: [
    { name: 'Products listing specific flavors (e.g. "vanilla extract")', why: 'Transparency — you know exactly what you\'re getting' },
  ],
  artificial_flavors: [
    { name: 'Products with named natural flavoring', why: 'Avoids unknown synthetic compounds' },
  ],
};

/**
 * Look up replacement suggestions for a trigger ingredient.
 * Returns empty array if no replacements are defined.
 */
export function getReplacements(triggerId: string): Replacement[] {
  return REPLACEMENTS[triggerId] ?? [];
}
