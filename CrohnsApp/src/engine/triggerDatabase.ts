/**
 * Embedded trigger ingredient database.
 * Flattened from crohns-ingredient-database.json for fast runtime lookups.
 * Each entry maps a canonical name and all its aliases to a severity rating.
 */

export type Severity = 'RED' | 'YELLOW' | 'GREEN';

export interface TriggerIngredient {
  id: string;
  name: string;
  severity: Severity;
  postResectionSeverity: Severity;
  worseDuringFlare: boolean;
  mechanism: string;
  category: string;
}

// Alias → ingredient id map for fast lookup
const aliasMap = new Map<string, string>();

// Ingredient id → full data
const ingredientMap = new Map<string, TriggerIngredient>();

/**
 * All known trigger ingredients.
 * Compact format: [id, name, severity, postResectionSeverity, worseDuringFlare, category, ...aliases]
 */
type IngredientTuple = [string, string, Severity, Severity, boolean, string, string, string[]];

const TRIGGER_DATA: IngredientTuple[] = [
  // === EMULSIFIERS ===
  ['carrageenan', 'Carrageenan', 'RED', 'RED', true, 'Emulsifiers',
    'Destroys mucosal barrier, activates NF-κB inflammation',
    ['e407', 'irish moss extract', 'red seaweed extract', 'kappa-carrageenan', 'iota-carrageenan', 'lambda-carrageenan']],
  ['polysorbate_80', 'Polysorbate 80', 'RED', 'RED', true, 'Emulsifiers',
    'Thins protective mucus layer, promotes bacterial translocation',
    ['e433', 'tween 80', 'polyoxyethylene sorbitan monooleate']],
  ['cmc', 'Carboxymethylcellulose', 'RED', 'RED', true, 'Emulsifiers',
    'Thins mucus layer, alters gut microbiota',
    ['e466', 'cellulose gum', 'sodium carboxymethylcellulose', 'modified cellulose']],
  ['soy_lecithin', 'Soy Lecithin', 'GREEN', 'GREEN', false, 'Emulsifiers',
    'Generally safe at food-grade levels',
    ['e322', 'lecithin', 'soya lecithin']],
  ['mono_diglycerides', 'Mono and Diglycerides', 'YELLOW', 'YELLOW', false, 'Emulsifiers',
    'Mild emulsifier effect on mucus layer',
    ['e471', 'monoglycerides', 'diglycerides', 'mono- and diglycerides of fatty acids']],

  // === ARTIFICIAL SWEETENERS ===
  ['sucralose', 'Sucralose', 'RED', 'RED', true, 'Artificial Sweeteners',
    'Promotes inflammatory bacteria, reduces beneficial microbes by 50%',
    ['splenda', 'e955']],
  ['aspartame', 'Aspartame', 'YELLOW', 'YELLOW', false, 'Artificial Sweeteners',
    'May alter gut microbiome composition',
    ['e951', 'equal', 'nutrasweet']],
  ['saccharin', 'Saccharin', 'YELLOW', 'YELLOW', false, 'Artificial Sweeteners',
    'Alters gut bacteria populations',
    ['e954', 'sweet n low']],
  ['acesulfame_k', 'Acesulfame Potassium', 'YELLOW', 'YELLOW', false, 'Artificial Sweeteners',
    'May reduce beneficial gut bacteria',
    ['ace-k', 'e950', 'acesulfame k']],

  // === SUGAR ALCOHOLS ===
  ['sorbitol', 'Sorbitol', 'RED', 'RED', true, 'Sugar Alcohols',
    'Osmotic diarrhea — poorly absorbed, draws water into bowel',
    ['e420', 'glucitol']],
  ['mannitol', 'Mannitol', 'RED', 'RED', true, 'Sugar Alcohols',
    'Osmotic diarrhea, gas, bloating — high FODMAP',
    ['e421']],
  ['xylitol', 'Xylitol', 'YELLOW', 'RED', true, 'Sugar Alcohols',
    'Osmotic laxative effect at >10g',
    ['e967', 'birch sugar']],
  ['maltitol', 'Maltitol', 'RED', 'RED', true, 'Sugar Alcohols',
    'Strongest GI side effects of all sugar alcohols',
    ['e965', 'maltitol syrup']],
  ['erythritol', 'Erythritol', 'GREEN', 'YELLOW', false, 'Sugar Alcohols',
    'Best tolerated sugar alcohol — 90% absorbed in small intestine',
    ['e968']],
  ['isomalt', 'Isomalt', 'RED', 'RED', true, 'Sugar Alcohols',
    'Poorly absorbed, causes osmotic diarrhea',
    ['e953']],

  // === MALTODEXTRIN ===
  ['maltodextrin', 'Maltodextrin', 'RED', 'RED', true, 'Maltodextrin',
    'Destroys mucosal barrier, promotes E. coli adhesion, feeds harmful bacteria',
    ['corn maltodextrin', 'rice maltodextrin', 'tapioca maltodextrin', 'modified food starch']],

  // === HFCS / FRUCTOSE ===
  ['hfcs', 'High Fructose Corn Syrup', 'RED', 'RED', true, 'HFCS/Fructose',
    'Excess fructose malabsorption worsens with Crohn\'s, osmotic diarrhea',
    ['hfcs', 'hfcs-55', 'hfcs-42', 'corn sugar', 'glucose-fructose', 'glucose-fructose syrup', 'isoglucose']],
  ['agave', 'Agave Nectar', 'RED', 'RED', true, 'HFCS/Fructose',
    '90% fructose — highest fructose content of any sweetener',
    ['agave syrup', 'agave sweetener']],

  // === FIBER (problematic types) ===
  ['inulin', 'Inulin', 'RED', 'RED', true, 'Fiber',
    'High FODMAP fructan — ferments rapidly, causes gas, bloating, diarrhea',
    ['chicory root fiber', 'chicory root extract', 'fos', 'fructooligosaccharides', 'oligofructose']],
  ['wheat_bran', 'Wheat Bran', 'YELLOW', 'RED', true, 'Fiber',
    'Insoluble fiber — abrasive to inflamed/healing tissue',
    ['bran', 'wheat fiber', 'whole wheat bran']],

  // === DAIRY ===
  ['lactose', 'Lactose', 'YELLOW', 'RED', true, 'Dairy',
    'Lactose intolerance affects 40-44% of Crohn\'s patients',
    ['milk sugar', 'milk solids', 'whey', 'milk powder', 'non-fat milk', 'dry milk', 'whey protein concentrate']],
  ['casein', 'Casein', 'YELLOW', 'YELLOW', true, 'Dairy',
    'May trigger immune response in some Crohn\'s patients',
    ['sodium caseinate', 'calcium caseinate', 'milk protein']],

  // === GLUTEN ===
  ['gluten', 'Gluten', 'YELLOW', 'YELLOW', true, 'Gluten/Wheat',
    'Overlap with celiac-type sensitivity in 20-30% of Crohn\'s patients',
    ['wheat gluten', 'vital wheat gluten', 'seitan']],

  // === PRESERVATIVES ===
  ['sodium_nitrite', 'Sodium Nitrite', 'YELLOW', 'YELLOW', true, 'Preservatives',
    'Linked to increased IBD risk in high processed meat consumption',
    ['e250', 'sodium nitrate', 'e251', 'potassium nitrate', 'e252']],
  ['sodium_benzoate', 'Sodium Benzoate', 'YELLOW', 'YELLOW', false, 'Preservatives',
    'May increase intestinal permeability',
    ['e211', 'benzoic acid', 'e210']],
  ['tbhq', 'TBHQ', 'YELLOW', 'YELLOW', false, 'Preservatives',
    'May impair immune response to infections',
    ['e319', 'tert-butylhydroquinone', 'tertiary butylhydroquinone']],
  ['sulfites', 'Sulfites', 'YELLOW', 'YELLOW', true, 'Sulfites',
    'Can trigger GI symptoms — nausea, diarrhea, cramping',
    ['e220', 'e221', 'e222', 'e223', 'e224', 'e225', 'e226', 'e227', 'e228',
     'sodium sulfite', 'sodium bisulfite', 'sodium metabisulfite',
     'potassium metabisulfite', 'sulfur dioxide']],

  // === FOOD COLORINGS ===
  ['titanium_dioxide', 'Titanium Dioxide', 'RED', 'RED', false, 'Food Colorings',
    'Accumulates in intestinal tissue, impairs gut barrier, worsens inflammation',
    ['e171', 'tio2']],
  ['red_40', 'Red 40', 'YELLOW', 'YELLOW', false, 'Food Colorings',
    'May worsen intestinal inflammation in predisposed individuals',
    ['e129', 'allura red', 'fd&c red no. 40', 'red dye 40']],
  ['yellow_5', 'Yellow 5', 'YELLOW', 'YELLOW', false, 'Food Colorings',
    'Linked to gut permeability changes',
    ['e102', 'tartrazine', 'fd&c yellow no. 5']],

  // === THICKENERS & GUMS ===
  ['xanthan_gum', 'Xanthan Gum', 'YELLOW', 'YELLOW', false, 'Thickeners/Gums',
    'Can cause bloating and gas at higher doses',
    ['e415']],
  ['guar_gum', 'Guar Gum', 'YELLOW', 'YELLOW', true, 'Thickeners/Gums',
    'Soluble fiber — generally okay in small amounts but can cause gas',
    ['e412']],

  // === SPICY COMPOUNDS ===
  ['capsaicin', 'Capsaicin', 'YELLOW', 'RED', true, 'Spicy Compounds',
    'Irritates GI tract, accelerates motility, pain in inflamed areas',
    ['hot pepper', 'chili pepper', 'cayenne', 'jalapeño', 'habanero', 'hot sauce', 'chili extract', 'capsicum']],

  // === CAFFEINE ===
  ['caffeine', 'Caffeine', 'YELLOW', 'YELLOW', true, 'Caffeine',
    'Stimulates GI motility, can worsen diarrhea post-resection',
    ['coffee extract', 'guarana', 'green tea extract', 'yerba mate', 'kola nut']],

  // === ALCOHOL ===
  ['alcohol', 'Alcohol', 'RED', 'RED', true, 'Alcohol',
    'Increases intestinal permeability, worsens inflammation, dehydrating',
    ['ethanol', 'wine', 'beer', 'spirits']],

  // === ACIDS ===
  ['citric_acid', 'Citric Acid', 'YELLOW', 'YELLOW', true, 'Acids',
    'Can irritate inflamed mucosa, especially in large amounts',
    ['e330']],

  // === HIGH OXALATE ===
  ['oxalate', 'High Oxalate Foods', 'GREEN', 'YELLOW', false, 'High Oxalate',
    'Kidney stone risk increases after ileal resection due to increased oxalate absorption',
    ['spinach', 'rhubarb', 'beets', 'swiss chard']],

  // === UPF MARKERS ===
  ['natural_flavors', 'Natural Flavors', 'YELLOW', 'YELLOW', false, 'UPF Markers',
    'Umbrella term that can hide MSG, propylene glycol, or allergenic extracts',
    ['natural flavor', 'natural flavoring', 'natural flavours']],
  ['artificial_flavors', 'Artificial Flavors', 'YELLOW', 'YELLOW', false, 'UPF Markers',
    'Synthetic compounds — unknown gut microbiome effects',
    ['artificial flavor', 'artificial flavoring', 'artificial flavours']],
];

// Build lookup maps
function buildMaps() {
  for (const tuple of TRIGGER_DATA) {
    const [id, name, severity, postResectionSeverity, worseDuringFlare, category, mechanism, aliases] = tuple;
    const ingredient: TriggerIngredient = {
      id,
      name,
      severity,
      postResectionSeverity,
      worseDuringFlare,
      mechanism,
      category,
    };

    ingredientMap.set(id, ingredient);

    // Map the canonical name
    aliasMap.set(name.toLowerCase(), id);

    // Map all aliases
    for (const alias of aliases) {
      aliasMap.set(alias.toLowerCase(), id);
    }
  }
}

buildMaps();

/**
 * Look up an ingredient by name/alias. Returns null if not a known trigger.
 */
export function lookupTrigger(ingredientName: string): TriggerIngredient | null {
  const normalized = ingredientName.toLowerCase().trim();

  // Exact match
  const directId = aliasMap.get(normalized);
  if (directId) return ingredientMap.get(directId) || null;

  // Substring match — check if any alias is contained in the ingredient name
  for (const [alias, id] of aliasMap) {
    if (alias.length >= 4 && normalized.includes(alias)) {
      return ingredientMap.get(id) || null;
    }
  }

  return null;
}

/**
 * Get all known trigger ingredients.
 */
export function getAllTriggers(): TriggerIngredient[] {
  return Array.from(ingredientMap.values());
}
