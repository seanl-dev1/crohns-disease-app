# Food Classification Rules Engine — Technical Specification
**For CrohnsApp — No AI Required**

---

## Overview

The food classification engine is a **deterministic rules engine** that takes a food item's ingredient list and nutritional data as input and produces a Crohn's-specific safety rating as output. It runs entirely on-device with zero API calls.

---

## How It Works

```
INPUT                          PROCESS                         OUTPUT
─────                          ───────                         ──────
Food label data:               1. Parse ingredients            Overall Rating:
- Ingredient list              2. Match against trigger DB       GREEN / YELLOW / RED
- Nutrition facts              3. Score each dimension
- Barcode → Open Food Facts    4. Apply user context           Dimension Scores:
                               5. Generate explanation           - FODMAP level
User context:                                                    - Trigger ingredient count
- Disease state (flare/rem)                                      - Fiber analysis
- Resection type                                                 - Post-resection flags
- Known personal triggers                                        - Flare safety
- Known personal safe foods                                      - Nutrient highlights

                                                               Explanations:
                                                                 - Plain-language flags
                                                                 - Why each flag matters
                                                                 - Personal override notes
```

---

## Step 1: Data Input

### From Barcode Scan (Open Food Facts API)
When a user scans a barcode, we get:
```json
{
  "product_name": "Nature Valley Crunchy Granola Bars",
  "brands": "General Mills",
  "ingredients_text": "whole grain oats, sugar, canola oil, rice flour, honey, salt, brown sugar syrup, baking soda, soy lecithin, natural flavor",
  "nutrient_levels": {
    "fat": "moderate",
    "saturated-fat": "low",
    "sugars": "moderate",
    "salt": "moderate"
  },
  "nutriments": {
    "fat_100g": 16.67,
    "fiber_100g": 3.33,
    "proteins_100g": 6.67,
    "sugars_100g": 26.67,
    "sodium_100g": 0.567,
    "calories_100g": 467
  },
  "serving_size": "2 bars (42g)",
  "allergens_tags": ["en:gluten", "en:soybeans"]
}
```

### From Manual Entry
User types food name → search our local food database → get same structured data.

### From Ingredient List Photo (Phase 2+)
OCR on ingredient list photo → parse text → same pipeline.

---

## Step 2: Ingredient Parsing

### The Parser
Split `ingredients_text` into individual ingredients. Handle:
- Comma-separated lists
- Parenthetical sub-ingredients: "chocolate chips (sugar, chocolate liquor, cocoa butter, soy lecithin)"
- Percentage indicators: "milk (45%)"
- "Contains" and "May contain" allergen statements
- "And/or" alternatives: "canola and/or soybean oil"

### Normalization
- Lowercase everything
- Strip percentages and quantities
- Map aliases to canonical names (see alias database)
- Examples:
  - "high fructose corn syrup" → `hfcs`
  - "corn sugar" → `hfcs`
  - "glucose-fructose" → `hfcs` (Canadian label term)
  - "carboxymethylcellulose" → `cmc`
  - "cellulose gum" → `cmc`
  - "E466" → `cmc`

---

## Step 3: Multi-Dimensional Scoring

Each food is scored across 6 independent dimensions. Each dimension produces a score of GREEN (0), YELLOW (1), or RED (2).

### Dimension 1: Trigger Ingredient Score

Match parsed ingredients against the trigger ingredient database.

```
Rules:
- 0 RED ingredients AND 0 YELLOW ingredients → GREEN
- 1+ YELLOW ingredients AND 0 RED ingredients → YELLOW
- 1+ RED ingredients → RED

Special rules:
- If ingredient is in user's personal "safe" list → downgrade by 1 level
- If ingredient is in user's personal "trigger" list → upgrade to RED
- First 3 ingredients on a label make up ~80% of the product —
  RED ingredient in top 3 = worse than RED ingredient at position 15
```

### Dimension 2: FODMAP Level

Check each ingredient against FODMAP database.

```
Rules:
- All ingredients LOW FODMAP at this serving size → GREEN
- Any ingredient MODERATE FODMAP → YELLOW
- Any ingredient HIGH FODMAP → RED
- FODMAP stacking: 3+ MODERATE items in one product → RED
  (multiple moderate FODMAPs combine to create high FODMAP load)

Key FODMAP ingredients to flag on labels:
- Inulin / chicory root fiber → HIGH (fructans)
- Honey → HIGH (excess fructose)
- Agave → HIGH (excess fructose)
- Apple juice concentrate → HIGH (excess fructose + sorbitol)
- High fructose corn syrup → HIGH (excess fructose)
- Milk solids / milk powder → HIGH (lactose) unless product is aged cheese
- Wheat (in large amounts) → HIGH (fructans)
- Garlic / onion powder → HIGH (fructans) — even small amounts
- FOS (fructooligosaccharides) → HIGH (fructans)
- GOS (galactooligosaccharides) → HIGH
- Sorbitol / mannitol / xylitol / maltitol / isomalt → HIGH (polyols)
```

### Dimension 3: Fiber Analysis

```
Rules (per serving):
- Fiber < 2g → GREEN (low residue, safe during flare)
- Fiber 2-5g AND mostly soluble → GREEN
- Fiber 2-5g AND mixed/unknown type → YELLOW
- Fiber > 5g → YELLOW in remission, RED during flare
- Fiber > 8g → RED for post-resection patients regardless of state

Fiber type detection (from ingredients):
- "oat fiber", "psyllium", "pectin", "guar gum" → soluble (better)
- "wheat bran", "cellulose", "whole grain" → insoluble (worse for Crohn's)
- "inulin", "chicory root" → soluble BUT high FODMAP (flag both)

Special post-resection rules:
- Any whole seeds listed → YELLOW (obstruction risk at anastomosis)
- "Nuts", "seeds", "popcorn" in top ingredients → RED during first 3 months
- Raw vegetable indicators → YELLOW (better cooked for resection patients)
```

### Dimension 4: Post-Resection Flags

Only active if user has indicated bowel resection in their profile.

```
Rules:
- Fat per serving > 15g → RED (bile acid malabsorption → diarrhea)
- Fat per serving 8-15g → YELLOW
- Fat per serving < 8g → GREEN

- High-oxalate ingredient present → YELLOW with explanation
  (spinach, rhubarb, beets, chocolate, nuts, tea — kidney stone risk
   increases after ileal resection due to increased oxalate absorption)

- Lactose-containing AND user < 6 months post-surgery → YELLOW
  (temporary lactose intolerance is common; may resolve)

- Very high sugar (>20g/serving) → YELLOW
  (osmotic diarrhea risk, especially with shortened bowel)

- Caffeine-containing → YELLOW
  (stimulates motility, can worsen diarrhea post-resection)
```

### Dimension 5: Flare Safety Rating

Only applies when user's disease state is "Flare" or "Uncertain".

```
During FLARE, additional rules activate:
- Any insoluble fiber source → RED
- Raw fruits/vegetables indicators → RED
- Whole grains → RED (switch to refined/white versions)
- Spicy ingredients (capsaicin, hot sauce, chili) → RED
- High-fat (>10g/serving) → RED
- Alcohol → RED
- Caffeine → YELLOW→RED
- Carbonated beverages → YELLOW
- High-residue foods → RED
- Dairy (unless known tolerated) → YELLOW

During FLARE, these are GREEN:
- White rice, white bread, refined pasta
- Well-cooked vegetables (low fiber)
- Lean proteins (chicken breast, fish, eggs)
- Smooth nut butters (small amounts)
- Bananas (ripe)
- Applesauce
- Broth/soup
- Oral rehydration solutions
```

### Dimension 6: Nutrient Highlights (Positive Flags)

Flag beneficial nutrients for Crohn's/resection patients.

```
Positive flags (GREEN highlights):
- High B12 content (meat, fish, fortified foods)
- High iron content
- High calcium content
- High zinc content
- High vitamin D content
- Contains omega-3 fatty acids
- Contains probiotics / fermented
- Good protein source (>10g/serving)
- Contains soluble fiber (moderate amounts, in remission)
- Low sodium (< 140mg/serving) — many Crohn's patients have electrolyte issues

Display as: "Good source of B12 — important after ileal resection"
```

---

## Step 4: Overall Rating Calculation

```
Combine all 6 dimension scores into one overall rating:

IF any dimension is RED → Overall = RED
IF 3+ dimensions are YELLOW → Overall = RED
IF 1-2 dimensions are YELLOW and rest GREEN → Overall = YELLOW
IF all dimensions are GREEN → Overall = GREEN

OVERRIDE rules:
- If food is in user's personal SAFE list (confirmed by symptom history)
  → cap at YELLOW maximum, with note: "You've tolerated this before"
- If food is in user's personal TRIGGER list (confirmed by symptom history)
  → minimum YELLOW, with note: "This has triggered symptoms for you before"
```

---

## Step 5: Generate Explanation

For each non-GREEN dimension, generate a plain-language explanation.

### Explanation Templates

```
Trigger ingredients:
"Contains {ingredient} — {reason}. {severity_note}"
Example: "Contains carrageenan — a food additive linked to intestinal
inflammation in IBD research. Consider avoiding."

FODMAP:
"This product is {HIGH/MODERATE} FODMAP due to {ingredient} ({fodmap_type}).
{serving_note}"
Example: "This product is HIGH FODMAP due to onion powder (fructans).
Even small amounts of onion can trigger symptoms."

Fiber:
"{fiber_amount}g of fiber per serving — {fiber_assessment}. {context_note}"
Example: "7g of fiber per serving — mostly insoluble (wheat bran).
During a flare, consider lower-fiber alternatives."

Post-resection:
"{flag_description}. {mechanism}. {action}"
Example: "18g of fat per serving. After ileal resection, fat absorption is
reduced due to bile acid loss. High-fat meals may cause diarrhea.
Consider limiting to under 15g fat per meal."

Flare safety:
"During a flare: {recommendation}. {alternative}"
Example: "During a flare: avoid whole grain bread. Try white bread or
sourdough instead — easier to digest with less residue."

Nutrient highlights:
"Good source of {nutrient} — {why_it_matters}"
Example: "Good source of B12 (2.4mcg per serving) — important to monitor
after ileal resection as your body absorbs less B12."
```

---

## Step 6: Personal Learning (No AI Needed)

Over time, the app builds a personal food profile based on the user's own data.

### How Personal Overrides Work

```
1. User scans food → logs it as eaten
2. User logs symptoms in the 2-24 hour window after eating
3. After 3+ instances of eating the same food:
   - If 0 symptom events within window → add to personal SAFE list
   - If 2+ symptom events within window → add to personal TRIGGER list
   - If mixed results → mark as UNCERTAIN

4. Personal lists override generic ratings:
   - Generic RED + Personal SAFE → displayed as YELLOW with note:
     "Generally flagged for Crohn's, but you've tolerated this 3 times
      with no symptoms. Your body may handle it fine."
   - Generic GREEN + Personal TRIGGER → displayed as YELLOW with note:
     "This is generally considered safe, but it's been associated with
      symptoms for you 2 out of 3 times."
```

### Confidence Scoring

```
Confidence = occurrences / (occurrences + 3)
- 1 occurrence:  25% confidence → "Might be okay"
- 3 occurrences: 50% confidence → "Seems safe for you"
- 6 occurrences: 67% confidence → "Likely safe for you"
- 10 occurrences: 77% confidence → "Consistently safe for you"

Only show personal overrides when confidence > 40% (3+ occurrences)
```

---

## Data Structures

### Trigger Ingredient Entry
```typescript
interface TriggerIngredient {
  id: string;
  canonical_name: string;
  aliases: string[];           // all label variations
  e_number?: string;           // European additive code (E466, etc.)
  category: 'emulsifier' | 'sweetener' | 'preservative' | 'colorant' |
            'thickener' | 'fiber_additive' | 'sugar_alcohol' | 'acid' |
            'stimulant' | 'fat' | 'dairy' | 'gluten' | 'fodmap_source' |
            'spice' | 'other';
  severity_general: 'red' | 'yellow' | 'green';
  severity_post_resection: 'red' | 'yellow' | 'green';
  severity_during_flare: 'red' | 'yellow' | 'green';
  mechanism: string;           // why it's problematic, plain language
  evidence_level: 'strong' | 'moderate' | 'emerging' | 'anecdotal';
  citation: string;            // source
  explanation_template: string; // shown to user
}
```

### FODMAP Food Entry
```typescript
interface FODMAPFood {
  id: string;
  food_name: string;
  category: string;
  fodmap_rating: 'low' | 'moderate' | 'high';
  fodmap_types: {
    fructose: boolean;
    lactose: boolean;
    fructans: boolean;
    gos: boolean;
    polyols_sorbitol: boolean;
    polyols_mannitol: boolean;
  };
  safe_serving_size: string;
  safe_serving_grams: number;
  high_fodmap_threshold: string;
  crohns_notes?: string;       // additional Crohn's-specific info
}
```

### Scanned Food Result
```typescript
interface FoodAnalysisResult {
  food_name: string;
  brand?: string;
  barcode?: string;

  overall_rating: 'green' | 'yellow' | 'red';

  dimensions: {
    trigger_score: DimensionResult;
    fodmap_level: DimensionResult;
    fiber_analysis: DimensionResult;
    resection_flags: DimensionResult;   // null if user has no resection
    flare_safety: DimensionResult;      // null if user is in remission
    nutrient_highlights: DimensionResult;
  };

  flags: Flag[];                // all individual flags with explanations
  personal_notes?: string;     // from personal learning system

  analyzed_at: string;         // ISO timestamp
}

interface DimensionResult {
  rating: 'green' | 'yellow' | 'red';
  explanation: string;
}

interface Flag {
  type: 'warning' | 'caution' | 'positive';
  ingredient?: string;
  dimension: string;
  message: string;             // plain language explanation
}
```

### User Food Profile
```typescript
interface UserFoodProfile {
  user_id: string;
  safe_foods: PersonalFoodEntry[];
  trigger_foods: PersonalFoodEntry[];
  uncertain_foods: PersonalFoodEntry[];
}

interface PersonalFoodEntry {
  food_id: string;
  food_name: string;
  occurrences: number;
  symptom_events: number;      // times symptoms followed within window
  no_symptom_events: number;   // times no symptoms followed
  confidence: number;          // calculated: occurrences / (occurrences + 3)
  last_eaten: string;
  notes?: string;
}
```

---

## Example: Complete Analysis Walkthrough

### Input: User scans "Fiber One Brownie Bar"

**User context**: Post-ileal resection (8 months ago), currently in remission

**Ingredients**: Chicory root extract, sugar, chocolate chips (sugar, chocolate, cocoa butter, milkfat, soy lecithin, natural flavor), vegetable glycerin, corn syrup, whole grain wheat, rice flour, fructose, canola oil, palm kernel oil, calcium carbonate, whey protein isolate, salt, baking soda, soy lecithin, natural flavor, xanthan gum

**Nutrition**: 90 calories, 3.5g fat, 17g carbs, 5g fiber, 7g sugar per serving

### Analysis:

**Dimension 1 — Trigger Ingredients**: RED
- Chicory root extract → RED (top ingredient, high FODMAP fructan source)
- Vegetable glycerin → YELLOW (sugar alcohol properties)
- Palm kernel oil → YELLOW (saturated fat, inflammatory)
- Natural flavor → YELLOW (ambiguous — may contain triggers)

**Dimension 2 — FODMAP Level**: RED
- Chicory root extract → HIGH FODMAP (fructans — this is literally inulin)
- Fructose (listed separately) → excess fructose risk
- Whey protein isolate → typically LOW FODMAP (lactose removed)

**Dimension 3 — Fiber Analysis**: YELLOW
- 5g fiber per serving → moderate
- Primary fiber source is chicory root (soluble but high FODMAP)
- Whole grain wheat also present (insoluble component)

**Dimension 4 — Post-Resection Flags**: GREEN
- 3.5g fat → well under threshold
- No high-oxalate concerns
- Chocolate in small amounts → borderline (monitor)

**Dimension 5 — Flare Safety**: N/A (user in remission)

**Dimension 6 — Nutrient Highlights**: GREEN
- Contains calcium carbonate (positive for resection patients)

### Output shown to user:

```
🔴 LIKELY PROBLEMATIC

Fiber One Brownie Bar

⚠️ Contains chicory root extract — the #1 ingredient. This is inulin,
   a high-FODMAP fructan that commonly causes gas, bloating, and
   diarrhea in Crohn's patients.

⚠️ HIGH FODMAP — chicory root extract is one of the highest FODMAP
   ingredients found in packaged foods.

⚠️ Contains vegetable glycerin and natural flavor — may cause
   digestive discomfort.

✅ Low fat (3.5g) — within safe range for post-resection.
✅ Contains calcium — beneficial after bowel resection.

💡 Alternative: Look for a brownie/snack bar without chicory root
   or inulin. Check the ingredients for bars sweetened with sugar
   only (no fiber additives).
```

---

## Performance Requirements

- **Analysis speed**: < 200ms on-device for a complete food analysis
- **Database size**: Trigger DB (~500 ingredients) + FODMAP DB (~400 foods) = ~500KB
- **Offline**: 100% functional with no internet after initial database load
- **Updates**: Database version checked on app open (if online); download delta updates only

---

## Database Update Strategy

The trigger ingredient and FODMAP databases will need periodic updates as new research emerges.

```
Update frequency: Quarterly (every 3 months)
Update mechanism:
  1. App checks version number on startup (if online)
  2. If new version available, download delta (only changed/new entries)
  3. Apply update to local SQLite
  4. Show user: "Food database updated with X new entries"

Content review process:
  1. Monitor PubMed for new IBD + food additive studies
  2. Review Monash University FODMAP app updates
  3. Check FDA additive status changes
  4. Update entries with new evidence
  5. All changes reviewed by medical advisor before release
```
