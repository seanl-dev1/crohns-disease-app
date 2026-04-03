/**
 * Post-resection dietary guide phase data.
 * Source: post-resection-dietary-guide.md
 */

export interface DietaryPhase {
  id: number;
  title: string;
  timing: string;
  duration: string;
  purpose: string;
  icon: string;
  color: 'danger' | 'caution' | 'primary' | 'safe';
  sections: PhaseSection[];
}

export interface PhaseSection {
  heading: string;
  type: 'text' | 'list' | 'table';
  content: string;
}

export const dietaryPhases: DietaryPhase[] = [
  {
    id: 1,
    title: 'Clear Liquids',
    timing: 'Hospital Days 1-2',
    duration: '12-48 hours post-surgery',
    purpose: 'Maintain hydration and electrolyte balance while allowing the bowel to "wake up" from anesthesia without any digestive workload.',
    icon: 'water-outline',
    color: 'danger',
    sections: [
      {
        heading: 'Safe Fluids',
        type: 'list',
        content: '• Water — sip freely, 1-2 oz at a time, room temperature preferred\n• Ice chips — unlimited, let melt in mouth\n• Clear broth (chicken, beef, vegetable) — 4-8 oz, low-sodium, fat-free\n• Apple juice (no pulp) — 4 oz, dilute 50/50 with water initially\n• White grape juice (no pulp) — 4 oz, dilute 50/50\n• Plain gelatin (Jell-O) — ½ cup, avoid red/purple colors\n• Popsicles (no fruit pieces) — avoid red/purple colors\n• Weak tea (herbal) — 4-8 oz, no milk, no caffeine preferred\n• Clear electrolyte drinks — 4-8 oz (Pedialyte, diluted Gatorade)\n• Honey in warm water — 1 tsp in 8 oz',
      },
      {
        heading: 'Foods to AVOID',
        type: 'list',
        content: '• ALL solid foods\n• Milk and all dairy products\n• Orange juice or any juice with pulp\n• Carbonated beverages (cause gas and distension)\n• Coffee (stimulates motility too aggressively)\n• Alcohol\n• Anything opaque — if you cannot see through it, it\'s not a clear liquid',
      },
      {
        heading: 'Portions & Frequency',
        type: 'text',
        content: 'Sip continuously throughout waking hours. Start with 1 oz (30 mL) at a time, increase to 2-4 oz every 15-30 minutes as tolerated. Target at least one 8 oz cup per waking hour. Total daily intake goal: 1,500-2,000 mL minimum.\n\nMonitor urine output: target pale yellow urine.',
      },
      {
        heading: 'Ready for Phase 2 When...',
        type: 'list',
        content: '• Passing gas (flatus) — the single most important sign\n• Bowel sounds audible\n• No nausea or vomiting for 12+ hours\n• Tolerating at least 8 oz/hour of clear liquids\n• Minimal abdominal distension\n• Surgeon approval',
      },
      {
        heading: 'Common Mistakes',
        type: 'list',
        content: '• Drinking too much too fast (causes nausea/vomiting)\n• Using a straw (introduces air, causes bloating)\n• Choosing carbonated drinks (painful gas)\n• Skipping electrolyte drinks\n• Confusing "clear liquid" with "any liquid"',
      },
    ],
  },
  {
    id: 2,
    title: 'Full Liquids',
    timing: 'Hospital Days 2-4',
    duration: '1-3 days after tolerating clear liquids',
    purpose: 'Introduce calories and protein through liquids that require minimal digestion. Goal is 800-1,200 calories/day.',
    icon: 'cafe-outline',
    color: 'caution',
    sections: [
      {
        heading: 'Safe Foods & Fluids',
        type: 'list',
        content: '• ALL clear liquid items from Phase 1\n• Strained cream soups (no chunks) — 6-8 oz\n• Smooth yogurt (no fruit pieces) — 4-6 oz\n• Lactose-free milk — 4-8 oz (preferred over regular)\n• Protein shakes (strained, no fiber) — 8 oz\n• Custard/pudding (smooth) — ½ cup\n• Ice cream/sherbet (plain, no chunks) — ½ cup\n• Cream of Wheat or Rice — ½ cup, thin consistency\n• Very thin mashed potatoes — ½ cup, made with broth\n• Strained fruit purees — ¼ cup, baby food consistency\n• Egg drop in broth — 4-8 oz',
      },
      {
        heading: 'Foods to AVOID',
        type: 'list',
        content: '• Anything with chunks, pieces, seeds, or fiber\n• Raw fruits or vegetables\n• Bread, crackers, or any solid grain\n• Meat (even ground)\n• Nuts, seeds, or nut butters\n• Beans or legumes\n• Spicy seasonings\n• Fried or high-fat foods',
      },
      {
        heading: 'Portions & Frequency',
        type: 'text',
        content: '6-8 small meals/snacks per day, 4-8 oz per "meal." Every 2-3 hours during waking hours. Stop eating when you feel any fullness — do not push.\n\nSeparate liquids from "meals" by 30 minutes when possible. Include electrolyte drinks: at least 16-24 oz/day.',
      },
      {
        heading: 'Ready for Phase 3 When...',
        type: 'list',
        content: '• Tolerating full liquid meals without nausea, bloating, or pain\n• Having bowel movements (even if loose)\n• No vomiting\n• Able to consume 800+ calories/day from liquids\n• Surgeon/dietitian approval for soft foods',
      },
      {
        heading: 'Common Mistakes',
        type: 'list',
        content: '• Jumping straight to solid food because you "feel fine"\n• Drinking large volumes at once\n• Choosing high-sugar protein drinks (osmotic diarrhea)\n• Not tracking caloric intake (many patients severely undereat)\n• Skipping protein drinks (delays wound healing)',
      },
    ],
  },
  {
    id: 3,
    title: 'Low-Residue / Low-Fiber',
    timing: 'Weeks 1-4 Post-Surgery',
    duration: '2-6 weeks from when soft foods are introduced',
    purpose: 'Provide adequate calories (1,500-2,000/day) and protein (60-80 g/day) for wound healing while minimizing residue that could stress the anastomosis.',
    icon: 'restaurant-outline',
    color: 'caution',
    sections: [
      {
        heading: 'Safe Proteins',
        type: 'list',
        content: '• Eggs (scrambled, poached, soft-boiled) — 2 eggs, cooked soft\n• Skinless chicken/turkey breast — 3-4 oz, baked or slow-cooked\n• White fish (cod, tilapia, sole) — 3-4 oz, baked or steamed\n• Canned tuna (in water) — 3 oz\n• Salmon — 3 oz, baked/flaked\n• Tofu (silken or soft) — ½ cup\n• Smooth peanut butter — 1-2 tbsp\n• Cottage cheese (small curd) — ½ cup',
      },
      {
        heading: 'Safe Grains & Starches',
        type: 'list',
        content: '• White rice — ½ cup, well-cooked\n• White pasta — ½ cup, well-cooked (not al dente)\n• White bread/toast — 1 slice, no seeds\n• Saltine crackers — 4-6\n• Cream of Wheat — ½ cup\n• Mashed potatoes (no skin) — ½ cup\n• Sweet potato (no skin) — ½ cup, mashed\n• Plain pancakes/waffles — 1 small, white flour',
      },
      {
        heading: 'Safe Vegetables & Fruits',
        type: 'list',
        content: 'Vegetables (ALL must be well-cooked, peeled, seedless):\n• Carrots, green beans, asparagus tips, spinach (cooked), zucchini (peeled, seeded), squash, beets, pumpkin puree\n\nFruits:\n• Ripe banana, applesauce, canned peaches/pears (in juice), ripe cantaloupe/honeydew, ripe avocado (¼), seedless watermelon',
      },
      {
        heading: 'Foods to AVOID',
        type: 'list',
        content: '• Whole wheat/brown rice/bran/granola/popcorn\n• Raw vegetables and salads\n• Corn, peas, Brussels sprouts, raw onions, dried beans\n• Skins and seeds (tomato, potato, apple, berries)\n• ALL nuts and seeds\n• Tough meats (steak, pork chops, sausage, bacon, jerky)\n• Dried fruits\n• Spicy, fried, and gas-producing foods',
      },
      {
        heading: 'Portions & Frequency',
        type: 'text',
        content: '5-6 small meals per day (every 3 hours), approximately 1 cup total per meal. Protein at every meal: minimum 10-15g. Daily targets: 1,500-2,000 calories, 60-80g protein.\n\nChew all food thoroughly (30 chews per bite). Eat slowly (20-30 minutes per meal). Sip fluids between meals, not with meals. 8-10 cups of fluid daily.',
      },
      {
        heading: 'Common Mistakes',
        type: 'list',
        content: '• Reintroducing fiber too quickly (obstruction risk at anastomosis)\n• Eating raw salads because they seem "healthy"\n• Not eating enough calories (weight loss delays healing)\n• Skipping meals (leads to large meals, harder to digest)\n• Not chewing thoroughly (blockage risk)\n• Drinking large amounts with meals (rapid transit)\n• Eating popcorn, nuts, or seeds prematurely',
      },
    ],
  },
  {
    id: 4,
    title: 'Gradual Reintroduction',
    timing: 'Months 2-3 Post-Surgery',
    duration: '4-8 weeks (approximately weeks 5-12)',
    purpose: 'Systematically reintroduce higher-fiber and more complex foods to expand diet variety while identifying trigger foods.',
    icon: 'add-circle-outline',
    color: 'primary',
    sections: [
      {
        heading: 'Reintroduction Protocol',
        type: 'list',
        content: '1. Add ONE new food per day\n2. Start with a small portion (2-3 tablespoons)\n3. Eat it early in the day (monitor reactions)\n4. Wait 48 hours before adding the next new food\n5. If a food causes symptoms, remove it and retry in 2-4 weeks\n6. Keep a detailed food diary',
      },
      {
        heading: 'Weeks 5-6: Soft Cooked Vegetables & Gentle Proteins',
        type: 'list',
        content: '• Soft-cooked broccoli florets (no stems) — steamed 10+ min, watch for gas/bloating\n• Soft-cooked cauliflower — steamed/boiled until mashable\n• Cooked onions — sautéed until translucent, small amount\n• Ground beef (lean, 90%+) — well-cooked, drained\n• Pork tenderloin — slow-cooked until very tender\n• Oatmeal (instant, well-cooked) — thin consistency',
      },
      {
        heading: 'Weeks 7-8: Cooked Fruits & Whole Grains',
        type: 'list',
        content: '• Cooked apple (no skin) — baked/stewed\n• Soft ripe pear (no skin)\n• Whole wheat bread (1 slice) — toasted\n• Brown rice — well-cooked, small portion (¼ cup)\n• Cooked lentils (small portion) — well-cooked, puréed\n• Yogurt with fruit pieces',
      },
      {
        heading: 'Weeks 9-10: Raw Soft Fruits & Tender Vegetables',
        type: 'list',
        content: '• Ripe peeled peach or pear — fresh, small pieces\n• Cucumber (peeled, seeded)\n• Butter/Boston lettuce — small amount, chew well\n• Tomato (peeled, seeded) — blanched\n• Mild cheese varieties',
      },
      {
        heading: 'Weeks 11-12: Higher Risk Foods',
        type: 'list',
        content: '• Almond butter first, then whole almonds (6-8) — chew very well\n• Ground flax or chia in yogurt (1 tsp)\n• Dried fruit — 2-3 pieces, chopped fine\n• Raw apple with skin — chew extremely well, small pieces\n• Beans (small portion) — well-cooked, start with 2 tbsp\n• Corn — well-cooked, off the cob, small amount',
      },
      {
        heading: 'Common Mistakes',
        type: 'list',
        content: '• Reintroducing multiple foods at once (can\'t identify triggers)\n• Not keeping a food diary (loses critical data)\n• Giving up on a food after one bad attempt (may have been a bad day)\n• Not retrying foods that caused mild symptoms\n• Eating large portions of new foods immediately',
      },
    ],
  },
  {
    id: 5,
    title: 'Long-Term Maintenance',
    timing: 'Month 4 Onward',
    duration: 'Lifelong',
    purpose: 'Maintain optimal nutrition while managing permanent changes from bowel resection. Establish a sustainable, individualized diet.',
    icon: 'infinite-outline',
    color: 'safe',
    sections: [
      {
        heading: 'Core Dietary Principles',
        type: 'list',
        content: '1. Eat 5-6 smaller meals rather than 3 large ones\n2. Chew thoroughly — especially important with reduced bowel\n3. Maintain a food diary for ongoing trigger identification\n4. Prioritize nutrient-dense foods to compensate for reduced absorption\n5. Stay consistently hydrated with electrolyte-enhanced fluids\n6. Take prescribed supplements without fail\n7. Annual dietitian review to adjust plan',
      },
      {
        heading: 'Foods Most Patients Can Eat Long-Term',
        type: 'list',
        content: '• Well-cooked vegetables (expanding variety over time)\n• Lean proteins (chicken, fish, turkey, eggs, tofu)\n• White and whole grain rice/pasta (as tolerated)\n• Ripe fruits (bananas, melons, peeled soft fruits)\n• Yogurt and lactose-free dairy\n• Smooth nut butters\n• Healthy fats in moderation (olive oil, avocado)\n• Bone broth (excellent for gut healing)',
      },
      {
        heading: 'Common Permanent Triggers',
        type: 'list',
        content: '• Popcorn\n• Corn on the cob\n• Raw coconut\n• Whole nuts in large amounts\n• Dried fruit in large amounts\n• Very high-fat meals\n• Very spicy foods\n• Large quantities of insoluble fiber at once\n• Carbonated sugary drinks',
      },
      {
        heading: 'Daily Targets',
        type: 'text',
        content: '5-6 meals/day, 300-400 calories each. Protein: 1.0-1.5 g/kg body weight/day (higher than general population). Fiber: gradually increase to 15-25 g/day as tolerated.\n\nMinimum 2-3 L of fluids daily. More if high stool output, hot weather, or exercise. Include electrolyte sources daily. Monitor urine color (pale yellow = adequate).',
      },
      {
        heading: 'Long-Term Monitoring',
        type: 'list',
        content: '• Weight: Weekly at home to detect malnutrition early\n• Food diary: Ongoing for trigger identification\n• Stool output: Monitor pattern for changes\n• GI follow-up: Every 3-6 months first year, then annually\n• Nutritional labs: Every 6-12 months',
      },
      {
        heading: 'Common Mistakes',
        type: 'list',
        content: '• Abandoning the food diary after feeling "recovered"\n• Stopping supplements because "I feel fine"\n• Reverting to pre-surgery eating habits (large meals, fast eating)\n• Not adjusting diet seasonally (dehydration risk in summer)\n• Ignoring subtle symptoms of new food intolerances\n• Not keeping up with lab work',
      },
    ],
  },
];
