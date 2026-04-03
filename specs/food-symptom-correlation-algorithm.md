# Food-Symptom Correlation Algorithm — Technical Specification
**For CrohnsApp — No AI Required**

---

## Overview

This algorithm identifies which foods are associated with the user's symptoms by analyzing the **temporal relationship** between food logs and symptom logs. It's pure statistics — no machine learning, no API calls, runs entirely on-device.

The core insight: if a user consistently has symptoms 2-12 hours after eating a specific food, that food is likely a trigger. If they eat a food many times with no symptoms, it's likely safe.

---

## The Challenge: Why This Is Harder Than It Sounds

1. **Variable lag time**: Crohn's reactions can be 30 minutes to 24+ hours delayed
2. **Multiple foods per meal**: Was it the chicken or the sauce?
3. **Cumulative effects**: One serving of dairy may be fine; two in a day may not be
4. **Confounding factors**: Stress, sleep, medications, menstrual cycle all affect symptoms
5. **Flare vs. food reaction**: During a flare, everything causes symptoms — not useful data
6. **Sparse data**: Patients don't log every meal or every symptom perfectly

The algorithm must handle all of these gracefully.

---

## Data Inputs

### Food Log Entry
```typescript
interface FoodEntry {
  id: string;
  timestamp: number;          // Unix timestamp
  foods: FoodItem[];          // individual foods in this meal
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface FoodItem {
  food_id: string;            // links to food database
  food_name: string;
  ingredients?: string[];     // parsed ingredient list if scanned
  category: string;
  fodmap_level?: string;
}
```

### Symptom Log Entry
```typescript
interface SymptomEntry {
  id: string;
  timestamp: number;
  overall_feeling: 1 | 2 | 3 | 4 | 5;   // 1=terrible, 5=great
  symptoms: SymptomDetail[];
  bristol_scale?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  pain_level?: number;        // 1-10
  bowel_movements?: number;
  disease_state: 'flare' | 'remission' | 'uncertain';
}

interface SymptomDetail {
  type: 'diarrhea' | 'urgency' | 'bloating' | 'gas' | 'cramping' |
        'nausea' | 'fatigue' | 'blood' | 'joint_pain' | 'skin' |
        'mouth_sores' | 'pain';
  severity: 'mild' | 'moderate' | 'severe';
}
```

---

## Algorithm: Step by Step

### Step 1: Define Symptom Events

A "symptom event" is any symptom log where the user reported worse-than-baseline symptoms.

```
Baseline = user's rolling 14-day average of overall_feeling

Symptom Event = any log where:
  - overall_feeling < baseline - 0.5
  OR
  - any symptom marked "severe"
  OR
  - pain_level >= 6
  OR
  - bristol_scale == 1 OR bristol_scale >= 6
  OR
  - bowel_movements > user's rolling average * 1.5

Non-Event = any log where:
  - overall_feeling >= baseline
  AND no severe symptoms
  AND pain_level < 6
  AND normal bristol scale and bowel movements
```

### Step 2: Build Time Windows

For each symptom event, look backward in time to find what was eaten.

```
Primary window:   2-8 hours before symptom event
Secondary window: 8-16 hours before symptom event
Extended window:  16-24 hours before symptom event

Weight by window:
  Primary:   1.0x (most likely causation)
  Secondary: 0.6x
  Extended:  0.3x
```

**Why these windows?**
- Upper GI Crohn's / small bowel: reactions tend to be faster (2-8 hours)
- Colonic Crohn's: reactions tend to be slower (8-16 hours)
- Extended window catches delayed reactions and cumulative effects
- Research shows most food-related GI symptoms in IBD occur within 2-12 hours

### Step 3: Count Associations

For each food the user has ever logged, build an association table:

```typescript
interface FoodAssociation {
  food_id: string;
  food_name: string;

  // How many times this food was eaten
  total_eaten: number;

  // How many times symptoms followed within the time windows
  followed_by_symptoms: number;   // weighted by window

  // How many times NO symptoms followed
  followed_by_no_symptoms: number;

  // How many times the food appeared in each window before a symptom event
  primary_window_hits: number;    // 2-8 hours
  secondary_window_hits: number;  // 8-16 hours
  extended_window_hits: number;   // 16-24 hours

  // The specific symptoms most associated
  associated_symptoms: { [symptomType: string]: number };

  // Average lag time (hours between eating and symptom onset)
  average_lag_hours: number;
}
```

### Step 4: Calculate Trigger Score

```
For each food:

symptom_rate = weighted_symptom_follows / total_eaten

Where:
  weighted_symptom_follows =
    (primary_window_hits * 1.0) +
    (secondary_window_hits * 0.6) +
    (extended_window_hits * 0.3)

baseline_symptom_rate = total_symptom_events / total_days_tracked

// How much MORE likely are symptoms after this food vs. baseline?
relative_risk = symptom_rate / baseline_symptom_rate

// Confidence based on sample size
confidence = total_eaten / (total_eaten + 5)
// 1 time:  17% confidence
// 3 times: 38% confidence
// 5 times: 50% confidence
// 10 times: 67% confidence
// 20 times: 80% confidence

// Final trigger score (0 to 100)
trigger_score = min(100, relative_risk * confidence * 50)
```

### Step 5: Classify Foods

```
Based on trigger_score AND confidence:

TRIGGER (likely problematic):
  - trigger_score > 60 AND confidence > 40% (eaten 3+ times)
  - OR: symptom_rate > 0.7 AND total_eaten >= 3

SAFE (likely okay):
  - trigger_score < 20 AND confidence > 40%
  - OR: symptom_rate < 0.15 AND total_eaten >= 5

UNCERTAIN (not enough data or mixed results):
  - Everything else
  - OR: confidence < 40% (eaten fewer than 3 times)
  - OR: trigger_score between 20-60

Display thresholds:
  - Only show "Trigger" label when confidence > 50% (eaten 5+ times)
  - Only show "Safe" label when confidence > 50%
  - Below 50% confidence, show as "Possible trigger — need more data"
    or "Seems okay so far — keep logging"
```

---

## Handling Edge Cases

### Edge Case 1: Multiple Foods in One Meal

When a symptom event is preceded by a meal with 5 foods, which one caused it?

```
Strategy: Differential analysis

For each food in the meal:
  1. Check: has the user eaten this food WITHOUT symptoms in other meals?
     → If yes, lower suspicion for this food
  2. Check: has the user eaten the OTHER foods in this meal without symptoms?
     → If yes, raise suspicion for THIS food (process of elimination)
  3. Check: does this food contain known Crohn's trigger ingredients?
     → If yes, raise suspicion

Implementation:
  When attributing a symptom event to a multi-food meal:
  - Give each food a fractional "hit" of 1/N (where N = foods in meal)
  - BONUS: if food is a known trigger ingredient carrier → 2/N weight
  - BONUS: if food has been safe in other meals → 0.5/N weight
  - Normalize so total = 1

This naturally converges over time: innocent foods get cleared by
appearing in symptom-free meals, while the true trigger accumulates hits.
```

### Edge Case 2: Flare Periods

During a flare, everything causes symptoms. Including flare data would make every food look like a trigger.

```
Strategy: Exclude or downweight flare data

When disease_state == 'flare':
  - Reduce weight of all food-symptom associations to 0.1x
  - Do NOT add foods to trigger list based solely on flare-period data
  - Show user: "During flares, symptom correlations are less reliable.
    Your pattern analysis is most accurate during remission periods."

When disease_state == 'uncertain':
  - Weight at 0.5x (partial credit)

When disease_state == 'remission':
  - Full weight (1.0x) — this is the most reliable data
```

### Edge Case 3: Cumulative/Dose Effects

One cookie is fine; three cookies cause problems.

```
Strategy: Track serving quantity

Add to FoodEntry:
  quantity: 'small' | 'normal' | 'large' | number (servings)

When calculating associations:
  - Track symptom rate by quantity
  - If symptom_rate at 'large' >> symptom_rate at 'small':
    Flag as: "You seem to tolerate {food} in small amounts but not large.
    Try keeping portions to {safe_quantity}."
```

### Edge Case 4: Combination Effects

Dairy alone is fine. Dairy + wheat together cause symptoms.

```
Strategy: Track food pairs (Phase 3 enhancement)

For meals with 2+ foods that precede symptoms:
  - Track pairs: (food_A, food_B) → symptom
  - If food_A alone is safe, and food_B alone is safe,
    but (food_A + food_B) → symptoms consistently:
    Flag as: "You seem to tolerate {A} and {B} separately,
    but they may cause issues when combined."

Only surface combination alerts when:
  - Each food has been eaten 5+ times alone without symptoms
  - The combination has preceded symptoms 3+ times
  - Confidence > 50%

Note: This explodes the comparison space. Limit to top 50 most-eaten
foods to keep computation manageable.
```

### Edge Case 5: Sparse Data / New Users

Users with < 2 weeks of data don't have meaningful correlations.

```
Strategy: Progressive disclosure

Week 1-2 (< 14 days of data):
  - Don't show any correlation data
  - Show: "Keep logging! After 2 weeks of data, we'll start showing
    your personal food patterns."
  - Still use the generic rules engine for food scanning

Week 2-4 (14-28 days):
  - Show preliminary patterns with heavy caveats
  - "Early pattern: {food} has preceded symptoms 2 of 3 times.
    More data needed to confirm."

Week 4+ (28+ days):
  - Show full correlation reports
  - Confidence levels based on occurrence counts
  - Monthly trend reports

Week 8+ (56+ days):
  - High-confidence trigger/safe classifications
  - Combination analysis unlocked
  - Lag time analysis (personalized reaction time window)
```

---

## Confounding Factor Adjustment

### Tracked Confounders
The algorithm should track and weight these factors alongside food:

```typescript
interface DailyContext {
  date: string;
  stress_level?: 1 | 2 | 3 | 4 | 5;
  sleep_hours?: number;
  sleep_quality?: 1 | 2 | 3 | 4 | 5;
  exercise?: boolean;
  menstrual_phase?: 'period' | 'follicular' | 'ovulation' | 'luteal';
  medication_adherence?: boolean;  // did they take all meds?
  travel?: boolean;
  alcohol?: boolean;
}
```

### Adjustment Method

```
When calculating food trigger scores:

1. For each symptom event, also record the confounders that day
2. Calculate a "context score" = weighted sum of negative confounders
   - Poor sleep (< 6 hours): +1
   - High stress (4-5): +1
   - Missed medication: +2
   - Alcohol: +1
   - Travel: +0.5
   - Menstrual period: +0.5

3. If context_score > 2 for a symptom event:
   - Reduce food association weight by 50%
   - Rationale: symptoms may be context-driven, not food-driven

4. Surface context patterns separately:
   "Your worst symptom days tend to follow nights with < 6 hours of sleep."
   "Stress levels of 4-5 preceded symptoms 80% of the time."
```

---

## Output: What the User Sees

### Weekly Summary (After 2+ Weeks)

```
📊 This Week's Patterns

Symptom days: 2 of 7
Best day: Wednesday (feeling: 4/5)
Worst day: Friday (feeling: 2/5)

🔴 Possible Triggers This Week:
   • Pasta sauce (preceded symptoms both times eaten)
   • Coffee (3 of 4 times followed by urgency within 3 hours)

🟢 Well-Tolerated This Week:
   • White rice (eaten 5x, no symptoms)
   • Chicken breast (eaten 4x, no symptoms)
   • Banana (eaten 3x, no symptoms)

💡 Suggestion: Try a week without coffee and see if urgency
   improves. You've had it 4 times and 3 were followed by symptoms.
```

### Monthly Report

```
📈 March 2026 — Your Month in Review

Overall: 18 good days, 8 moderate days, 5 tough days
Trend: Slightly better than February (+2 good days)

🔴 Your Top Trigger Foods (High Confidence):
   1. Dairy ice cream — symptoms 4/5 times (80%)
      Average lag: 4 hours | Main symptom: cramping, diarrhea
   2. Garlic bread — symptoms 3/4 times (75%)
      Average lag: 6 hours | Main symptom: bloating, gas
   3. Spicy salsa — symptoms 3/3 times (100%)
      Average lag: 2 hours | Main symptom: urgency, pain

🟢 Your Safest Foods (High Confidence):
   1. White rice — 0 symptoms in 12 servings
   2. Grilled chicken — 0 symptoms in 9 servings
   3. Ripe bananas — 0 symptoms in 8 servings
   4. Scrambled eggs — 0 symptoms in 7 servings
   5. Oatmeal — 1 mild symptom in 6 servings (83% safe)

🟡 Needs More Data:
   • Sourdough bread (eaten 2x, no symptoms — looking good)
   • Salmon (eaten 1x, no symptoms — need more data)

📋 Context Patterns:
   • Sleep < 6 hours → 70% chance of symptoms next day
   • Stress 4-5 → symptoms followed 3 of 4 high-stress days
   • All meds taken → 65% good days vs. 30% when missed
```

### Doctor Report Section

```
FOOD-SYMPTOM CORRELATION SUMMARY
Period: March 1-31, 2026
Data points: 87 food entries, 31 symptom logs

Identified Triggers (>50% confidence):
  Food              | Times Eaten | Symptom Rate | Avg Lag | Primary Symptoms
  Dairy ice cream   | 5           | 80%          | 4.2 hrs | cramping, diarrhea
  Garlic/onion      | 7           | 71%          | 5.8 hrs | bloating, gas
  Spicy foods       | 3           | 100%         | 2.1 hrs | urgency, pain
  Coffee            | 15          | 47%          | 2.8 hrs | urgency

Well-Tolerated Foods (>5 servings, <15% symptom rate):
  White rice (12 servings, 0%), chicken breast (9, 0%),
  bananas (8, 0%), eggs (7, 0%), oatmeal (6, 17%)

Bristol Stool Scale Distribution:
  Type 1-2 (constipation): 5%
  Type 3-4 (normal): 58%
  Type 5-6 (loose): 30%
  Type 7 (watery): 7%

Average Bowel Movements: 3.2/day (range: 1-7)
```

---

## Performance & Storage

```
Storage per user:
  - 3 food entries/day × 365 days × ~200 bytes = ~220 KB/year
  - 2 symptom entries/day × 365 days × ~150 bytes = ~110 KB/year
  - Correlation cache: ~50 KB (recomputed weekly)
  - Total: ~400 KB/year — negligible

Computation:
  - Correlation recalculation: runs weekly (or on-demand)
  - Full recalc of 1 year of data: < 500ms on modern phone
  - Incremental update (new entry added): < 50ms
  - Runs in background thread, never blocks UI

Algorithm is O(F × S) where F = food entries and S = symptom events
For 1 year: ~1,000 foods × ~200 symptoms = 200,000 comparisons
This is trivial for modern mobile processors.
```

---

## What This CANNOT Do (And We Must Be Honest About)

1. **Cannot prove causation** — only correlation. Always frame as "associated with" not "caused by"
2. **Cannot replace an elimination diet** — supervised elimination diets with a dietitian are the gold standard
3. **Cannot account for all confounders** — stress, hormones, medication changes, infections, and disease progression all affect symptoms independently
4. **Cannot detect food intolerances vs. allergies** — this requires medical testing
5. **Less reliable during flares** — when everything hurts, correlation data is noisy
6. **Requires consistent logging** — garbage in, garbage out. Missed entries create blind spots

### How We Communicate Limitations

```
In-app disclaimer (shown on first correlation report):

"These patterns are based on YOUR logged data. They show which foods
are associated with your symptoms — not necessarily which foods CAUSE
them. Many factors affect Crohn's symptoms beyond food.

Use these insights as a starting point for conversations with your
GI doctor or dietitian, not as a replacement for professional guidance.

The more consistently you log meals and symptoms, the more accurate
these patterns become."
```
