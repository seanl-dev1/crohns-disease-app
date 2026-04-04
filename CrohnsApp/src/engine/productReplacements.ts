/**
 * Product-level replacement suggestions for Crohn's patients.
 *
 * When a scanned food comes back RED or YELLOW, we categorize
 * the product and suggest whole-food alternatives that are
 * Crohn's-safe, similar in purpose, and easy to find.
 *
 * This is different from the ingredient-level replacements in
 * replacementDatabase.ts — these are "instead of eating X, try Y"
 * at the product level.
 */

export interface ProductReplacement {
  name: string;
  why: string;
  /** Where you'd typically find this */
  findsAt?: string;
}

export interface ProductCategory {
  category: string;
  /** Friendly label shown in the UI */
  label: string;
  replacements: ProductReplacement[];
}

/**
 * Keywords that map to product categories.
 * Checked against product name + ingredients.
 */
const CATEGORY_MATCHERS: { keywords: string[]; category: string }[] = [
  // Beverages
  { keywords: ['soda', 'cola', 'pepsi', 'coke', 'sprite', 'fanta', 'mountain dew', 'dr pepper', 'carbonated', 'soft drink'], category: 'soda' },
  { keywords: ['energy drink', 'red bull', 'monster', 'rockstar', 'bang', 'celsius'], category: 'energy_drink' },
  { keywords: ['juice', 'fruit punch', 'lemonade', 'fruit drink'], category: 'juice' },
  { keywords: ['coffee', 'latte', 'cappuccino', 'espresso', 'cold brew'], category: 'coffee' },

  // Snacks
  { keywords: ['chip', 'crisp', 'dorito', 'cheeto', 'lay\'s', 'pringles', 'frito', 'tortilla chip'], category: 'chips' },
  { keywords: ['candy', 'skittles', 'starburst', 'gummy', 'sour patch', 'twizzler', 'licorice', 'jolly rancher'], category: 'candy' },
  { keywords: ['chocolate bar', 'snickers', 'twix', 'kit kat', 'reese', 'milky way', 'butterfinger', 'm&m'], category: 'chocolate_bar' },
  { keywords: ['cookie', 'oreo', 'biscuit', 'wafer'], category: 'cookies' },
  { keywords: ['cracker', 'pretzel', 'goldfish'], category: 'crackers' },
  { keywords: ['popcorn', 'kettle corn'], category: 'popcorn' },

  // Dairy
  { keywords: ['ice cream', 'gelato', 'frozen dessert', 'frozen yogurt', 'fro yo'], category: 'ice_cream' },
  { keywords: ['milk', 'whole milk', '2% milk', 'skim milk', 'chocolate milk'], category: 'milk' },
  { keywords: ['yogurt', 'yoghurt'], category: 'yogurt' },
  { keywords: ['cheese', 'cheddar', 'mozzarella', 'american cheese', 'cheese spread'], category: 'cheese' },

  // Meals/Prepared
  { keywords: ['pizza', 'frozen pizza'], category: 'pizza' },
  { keywords: ['hot dog', 'frankfurter', 'sausage', 'bratwurst', 'kielbasa'], category: 'processed_meat' },
  { keywords: ['bacon', 'salami', 'pepperoni', 'bologna', 'deli meat', 'lunch meat'], category: 'processed_meat' },
  { keywords: ['burger', 'hamburger', 'cheeseburger'], category: 'burger' },
  { keywords: ['ramen', 'instant noodle', 'cup noodle'], category: 'instant_noodle' },
  { keywords: ['fried chicken', 'chicken nugget', 'chicken tender', 'chicken finger', 'chicken strip'], category: 'fried_food' },
  { keywords: ['french fries', 'fries', 'tater tot', 'onion ring'], category: 'fried_food' },
  { keywords: ['frozen dinner', 'tv dinner', 'hungry man', 'lean cuisine', 'stouffer'], category: 'frozen_dinner' },

  // Breakfast
  { keywords: ['cereal', 'froot loops', 'lucky charms', 'cocoa puffs', 'frosted flakes', 'cap\'n crunch'], category: 'sugary_cereal' },
  { keywords: ['pastry', 'pop tart', 'toaster strudel', 'danish', 'croissant', 'donut', 'doughnut', 'muffin'], category: 'pastry' },
  { keywords: ['pancake mix', 'waffle mix', 'pancake syrup'], category: 'pancake' },

  // Bread/Grain
  { keywords: ['white bread', 'wheat bread', 'whole wheat bread', 'bread'], category: 'bread' },
  { keywords: ['pasta', 'spaghetti', 'penne', 'macaroni', 'fettuccine', 'linguine', 'noodle'], category: 'pasta' },

  // Condiments/Sauces
  { keywords: ['hot sauce', 'sriracha', 'tabasco', 'buffalo sauce', 'salsa'], category: 'hot_sauce' },
  { keywords: ['ketchup', 'bbq sauce', 'barbecue sauce', 'teriyaki'], category: 'sugary_sauce' },

  // Alcohol
  { keywords: ['beer', 'ale', 'lager', 'ipa', 'stout'], category: 'beer' },
  { keywords: ['wine', 'champagne', 'prosecco'], category: 'wine' },
  { keywords: ['vodka', 'whiskey', 'rum', 'tequila', 'gin', 'liquor', 'spirits'], category: 'liquor' },
];

const PRODUCT_REPLACEMENTS: Record<string, ProductCategory> = {
  soda: {
    category: 'soda',
    label: 'Instead of soda, try',
    replacements: [
      { name: 'Sparkling water with lemon/lime', why: 'Same fizzy satisfaction, zero sugar, no gut irritation', findsAt: 'Any grocery store' },
      { name: 'Ginger kombucha (low sugar)', why: 'Light fizz + probiotics, ginger soothes the gut', findsAt: 'Health food aisle' },
      { name: 'Herbal iced tea (unsweetened)', why: 'Chamomile or peppermint are actually anti-inflammatory', findsAt: 'Any grocery store' },
    ],
  },
  energy_drink: {
    category: 'energy_drink',
    label: 'Instead of energy drinks, try',
    replacements: [
      { name: 'Green tea (brewed, not extract)', why: 'Gentle caffeine + L-theanine for calm energy, anti-inflammatory', findsAt: 'Any grocery store' },
      { name: 'Coconut water', why: 'Natural electrolytes, gentle on the gut, real hydration', findsAt: 'Any grocery store' },
      { name: 'B12 supplement + water', why: 'Energy without the GI assault — B12 is often low in Crohn\'s anyway', findsAt: 'Pharmacy/vitamin aisle' },
    ],
  },
  juice: {
    category: 'juice',
    label: 'Instead of fruit juice, try',
    replacements: [
      { name: 'Diluted juice (half water, half juice)', why: 'Cuts the sugar load in half — less osmotic diarrhea risk' },
      { name: 'Coconut water', why: 'Lower sugar, natural electrolytes, easy on the gut' },
      { name: 'Homemade smoothie (banana + oat milk)', why: 'Whole fruit fiber slows sugar absorption, banana is low FODMAP' },
    ],
  },
  coffee: {
    category: 'coffee',
    label: 'Instead of coffee, try',
    replacements: [
      { name: 'Decaf coffee', why: 'Same taste, 97% less GI motility stimulation' },
      { name: 'Rooibos latte', why: 'Naturally caffeine-free, anti-inflammatory, creamy when frothed' },
      { name: 'Golden milk (turmeric + oat milk)', why: 'Actively anti-inflammatory — turmeric benefits IBD' },
    ],
  },
  chips: {
    category: 'chips',
    label: 'Instead of chips, try',
    replacements: [
      { name: 'Rice cakes with hummus', why: 'Crunchy + savory, easy to digest, good protein from chickpeas' },
      { name: 'Baked sweet potato chips', why: 'Lower fat, rich in vitamin A which supports gut lining repair' },
      { name: 'Plain pretzels (GF if needed)', why: 'Low fat, satisfies the salty crunch craving without irritants' },
    ],
  },
  candy: {
    category: 'candy',
    label: 'Instead of candy, try',
    replacements: [
      { name: 'Medjool dates', why: 'Naturally sweet, packed with potassium and fiber your gut can handle' },
      { name: 'Banana with a thin spread of almond butter', why: 'Sweet, filling, low FODMAP, great potassium source' },
      { name: 'Dried mango (no added sugar)', why: 'Chewy, sweet, easier to digest than most dried fruits' },
    ],
  },
  chocolate_bar: {
    category: 'chocolate_bar',
    label: 'Instead of candy bars, try',
    replacements: [
      { name: 'Dark chocolate (70%+, small square)', why: 'Less sugar, contains flavonoids, small amount is usually tolerated' },
      { name: 'Chocolate rice cakes', why: 'Light chocolate fix without the heavy fat/sugar load' },
      { name: 'Banana dipped in melted dark chocolate', why: 'Sweet treat with potassium — freeze for an ice cream bar feel' },
    ],
  },
  cookies: {
    category: 'cookies',
    label: 'Instead of cookies, try',
    replacements: [
      { name: 'Oat-based cookies (homemade)', why: 'Soluble fiber, no preservatives, you control the sugar' },
      { name: 'Rice crackers with nut butter', why: 'Satisfying crunch + healthy fats without processed ingredients' },
      { name: 'Banana oat bites (2-ingredient)', why: 'Mashed banana + oats, baked — naturally sweet, gut-friendly' },
    ],
  },
  crackers: {
    category: 'crackers',
    label: 'Safer cracker options',
    replacements: [
      { name: 'Simple rice crackers', why: 'Minimal ingredients, low FODMAP, easy to digest' },
      { name: 'GF oat crackers', why: 'Soluble fiber, gentle on the gut' },
    ],
  },
  popcorn: {
    category: 'popcorn',
    label: 'Instead of popcorn, try',
    replacements: [
      { name: 'Puffed rice cakes', why: 'Same light crunch, no hull pieces to irritate or obstruct' },
      { name: 'Baked kale chips (if in remission)', why: 'Crunchy snack that dissolves — no obstruction risk' },
    ],
  },
  ice_cream: {
    category: 'ice_cream',
    label: 'Instead of ice cream, try',
    replacements: [
      { name: 'Lactose-free ice cream (Lactaid brand)', why: 'Same creamy taste, lactase pre-added so no GI distress' },
      { name: 'Banana nice cream (frozen banana, blended)', why: 'Creamy, naturally sweet, zero dairy, easy to make' },
      { name: 'Coconut milk ice cream', why: 'Dairy-free, gentle on the gut, rich and satisfying' },
    ],
  },
  milk: {
    category: 'milk',
    label: 'Instead of regular milk, try',
    replacements: [
      { name: 'Lactose-free milk (Lactaid)', why: 'Identical nutrition, same taste — just no lactose to cause issues' },
      { name: 'Oat milk (fortified)', why: 'Low FODMAP in normal servings, gentle soluble fiber, usually fortified with calcium' },
      { name: 'Rice milk', why: 'Most hypoallergenic option, very easy to digest' },
    ],
  },
  yogurt: {
    category: 'yogurt',
    label: 'Safer yogurt options',
    replacements: [
      { name: 'Lactose-free yogurt', why: 'Live cultures are great for gut health — lactose-free avoids the trigger' },
      { name: 'Coconut yogurt (unsweetened)', why: 'Dairy-free with probiotics, gentle on the gut' },
    ],
  },
  cheese: {
    category: 'cheese',
    label: 'Safer cheese options',
    replacements: [
      { name: 'Aged hard cheese (parmesan, aged cheddar)', why: 'Aging removes most lactose naturally — usually well tolerated' },
      { name: 'Lactose-free cheese slices', why: 'Same meltability and taste, no lactose trigger' },
    ],
  },
  pizza: {
    category: 'pizza',
    label: 'Instead of pizza, try',
    replacements: [
      { name: 'GF pizza with lactose-free cheese', why: 'Removes two major triggers (gluten + lactose) while keeping the experience' },
      { name: 'Rice bowl with grilled chicken + veggies', why: 'Savory, filling, and your gut will thank you' },
      { name: 'Flatbread with pesto + grilled vegetables', why: 'Lighter, less cheese, basil pesto is anti-inflammatory' },
    ],
  },
  processed_meat: {
    category: 'processed_meat',
    label: 'Instead of processed meats, try',
    replacements: [
      { name: 'Sliced turkey breast (fresh-roasted)', why: 'Lean protein without nitrites, preservatives, or excess sodium' },
      { name: 'Grilled chicken breast', why: 'Clean protein, easy to digest, no processing chemicals' },
      { name: 'Canned salmon', why: 'Omega-3s are actively anti-inflammatory for Crohn\'s, plus great protein' },
    ],
  },
  burger: {
    category: 'burger',
    label: 'Instead of burgers, try',
    replacements: [
      { name: 'Grilled turkey burger (homemade)', why: 'Leaner, less fat for your gut to handle, still satisfying' },
      { name: 'Grilled chicken sandwich', why: 'Lower fat, easier to digest than ground beef' },
      { name: 'Salmon burger', why: 'Omega-3 anti-inflammatory fats — your gut actually benefits' },
    ],
  },
  instant_noodle: {
    category: 'instant_noodle',
    label: 'Instead of instant noodles, try',
    replacements: [
      { name: 'Rice noodle soup (homemade)', why: 'Rice noodles are gentle, real broth has gut-healing nutrients' },
      { name: 'Bone broth with rice', why: 'Collagen supports gut lining repair, rice is easy to digest' },
      { name: 'Congee (rice porridge)', why: 'Extremely easy to digest, soothing, traditional healing food' },
    ],
  },
  fried_food: {
    category: 'fried_food',
    label: 'Instead of fried food, try',
    replacements: [
      { name: 'Air-fried version (same food, way less oil)', why: '80% less fat — dramatically easier on your gut' },
      { name: 'Baked chicken tenders', why: 'Same crispy coating, fraction of the fat, no bile acid overload' },
      { name: 'Oven-baked sweet potato fries', why: 'Satisfies the fry craving, vitamin A supports gut lining' },
    ],
  },
  frozen_dinner: {
    category: 'frozen_dinner',
    label: 'Instead of frozen dinners, try',
    replacements: [
      { name: 'Batch-prepped rice + protein meals', why: 'Same convenience when prepped ahead, zero preservatives or triggers' },
      { name: 'Simple stir-fry (chicken + rice + cooked veggies)', why: '15 minutes, you control every ingredient' },
    ],
  },
  sugary_cereal: {
    category: 'sugary_cereal',
    label: 'Instead of sugary cereal, try',
    replacements: [
      { name: 'Oatmeal with banana', why: 'Soluble fiber soothes the gut, banana adds natural sweetness + potassium' },
      { name: 'Rice Chex or puffed rice cereal', why: 'Low sugar, low fiber, gentle — add your own toppings' },
      { name: 'Overnight oats with maple syrup', why: 'Easy to prep, gentle soluble fiber, you control the sweetness' },
    ],
  },
  pastry: {
    category: 'pastry',
    label: 'Instead of pastries, try',
    replacements: [
      { name: 'Toast with almond butter + banana', why: 'Sweet, filling, healthy fats, no processed sugar bomb' },
      { name: 'GF oatmeal muffin (homemade)', why: 'You control sugar + ingredients, soluble fiber from oats' },
    ],
  },
  pancake: {
    category: 'pancake',
    label: 'Safer pancake options',
    replacements: [
      { name: 'Banana oat pancakes (banana + egg + oats)', why: 'Three ingredients, naturally sweet, gut-friendly' },
      { name: 'Rice flour pancakes', why: 'Gluten-free, light, easy to digest' },
    ],
  },
  bread: {
    category: 'bread',
    label: 'Safer bread options',
    replacements: [
      { name: 'Sourdough bread', why: 'Fermentation breaks down gluten + FODMAPs — usually better tolerated' },
      { name: 'GF white bread', why: 'Low fiber, no gluten trigger, easy to digest during sensitive times' },
      { name: 'Rice bread', why: 'Very gentle, minimal ingredients, good for elimination phase' },
    ],
  },
  pasta: {
    category: 'pasta',
    label: 'Safer pasta options',
    replacements: [
      { name: 'Rice pasta', why: 'Gluten-free, similar texture, very easy to digest' },
      { name: 'Well-cooked white pasta (small portion)', why: 'White pasta is actually low residue — often tolerated if cooked soft' },
    ],
  },
  hot_sauce: {
    category: 'hot_sauce',
    label: 'Instead of hot sauce, try',
    replacements: [
      { name: 'Lemon juice + herbs', why: 'Bright flavor without the capsaicin gut assault' },
      { name: 'Ginger sauce', why: 'Adds kick + is actually anti-inflammatory and anti-nausea' },
      { name: 'Turmeric-based golden sauce', why: 'Warm flavor, actively reduces inflammation' },
    ],
  },
  sugary_sauce: {
    category: 'sugary_sauce',
    label: 'Safer sauce options',
    replacements: [
      { name: 'Olive oil + lemon dressing', why: 'Anti-inflammatory fats, no HFCS or artificial ingredients' },
      { name: 'Homemade tomato sauce (no onion/garlic)', why: 'Low FODMAP version — cook with garlic-infused oil instead' },
    ],
  },
  beer: {
    category: 'beer',
    label: 'Instead of beer, try',
    replacements: [
      { name: 'Non-alcoholic beer (if tolerated)', why: 'Same social experience, much less gut permeability damage' },
      { name: 'Sparkling water with lime', why: 'Refreshing, zero gut impact, still feels like a drink' },
      { name: 'Low-sugar kombucha', why: 'Similar fizzy feel, actually supports gut health with probiotics' },
    ],
  },
  wine: {
    category: 'wine',
    label: 'Instead of wine, try',
    replacements: [
      { name: 'Dealcoholized wine', why: 'Same polyphenols, no alcohol gut damage' },
      { name: 'Sparkling grape juice (small glass)', why: 'Wine-like experience, no permeability increase' },
    ],
  },
  liquor: {
    category: 'liquor',
    label: 'Instead of hard alcohol, try',
    replacements: [
      { name: 'Mocktail with sparkling water + fruit', why: 'Festive, social, zero gut permeability damage' },
      { name: 'Ginger beer (non-alcoholic)', why: 'Spicy-sweet, ginger is gut-soothing, great mixer base' },
    ],
  },
};

/**
 * Detect the product category from its name and ingredients.
 */
function detectCategory(
  productName: string,
  ingredients: string[]
): string | null {
  const searchText = [productName, ...ingredients]
    .join(' ')
    .toLowerCase();

  for (const matcher of CATEGORY_MATCHERS) {
    for (const keyword of matcher.keywords) {
      if (searchText.includes(keyword)) {
        return matcher.category;
      }
    }
  }

  return null;
}

/**
 * Get product-level replacement suggestions for a scanned food.
 * Returns null if no category match or the food is GREEN-rated.
 */
export function getProductReplacements(
  productName: string,
  ingredients: string[],
): ProductCategory | null {
  const category = detectCategory(productName, ingredients);
  if (!category) return null;
  return PRODUCT_REPLACEMENTS[category] ?? null;
}
