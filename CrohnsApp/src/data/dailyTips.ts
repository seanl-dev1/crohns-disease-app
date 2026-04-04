/**
 * Daily tips database — contextual, evidence-based guidance
 * personalized to disease state and resection status.
 *
 * Every tip is written in plain language with a warm, supportive tone.
 * No medical jargon without a clear explanation.
 */

import type { DiseaseState } from '../store/useAppStore';

export type TipCategory =
  | 'nutrition'
  | 'hydration'
  | 'wellness'
  | 'mindset'
  | 'exercise'
  | 'sleep';

export interface DailyTip {
  id: string;
  /** Short, clear headline */
  title: string;
  /** Plain-language explanation — 2-3 sentences max */
  body: string;
  /** Where the advice comes from (shows as small text) */
  source?: string;
  category: TipCategory;
  /** Which disease states this tip applies to. Empty array = all states */
  states: DiseaseState[];
  /** true = only for post-resection users, false = only for non-resection, undefined = everyone */
  postResection?: boolean;
}

export const TIP_CATEGORY_LABELS: Record<TipCategory, { label: string; icon: string }> = {
  nutrition: { label: 'Food & Nutrition', icon: 'nutrition-outline' },
  hydration: { label: 'Hydration', icon: 'water-outline' },
  wellness: { label: 'Wellness', icon: 'leaf-outline' },
  mindset: { label: 'Mental Health', icon: 'heart-outline' },
  exercise: { label: 'Movement', icon: 'walk-outline' },
  sleep: { label: 'Rest & Sleep', icon: 'moon-outline' },
};

export const DAILY_TIPS: DailyTip[] = [
  // ─── NUTRITION ──────────────────────────────────────────

  {
    id: 'small_frequent_meals',
    title: 'Smaller meals, more often',
    body: 'Eating 5-6 small meals instead of 3 large ones puts less strain on your digestive system. This can reduce cramping, bloating, and the feeling of being overwhelmed after eating.',
    category: 'nutrition',
    states: ['flare', 'uncertain'],
  },
  {
    id: 'cook_vegetables',
    title: 'Cook your vegetables well',
    body: 'During a flare, raw vegetables are harder to break down and can irritate inflamed tissue. Steaming, roasting, or boiling veggies until soft makes them much gentler on your gut.',
    category: 'nutrition',
    states: ['flare'],
  },
  {
    id: 'protein_healing',
    title: 'Protein helps you heal',
    body: 'Your body uses protein to repair tissue and fight inflammation. Good options include eggs, chicken, fish, tofu, and smooth nut butters. Aim to include some protein at every meal.',
    category: 'nutrition',
    states: [],
  },
  {
    id: 'white_rice_friend',
    title: 'White rice is a safe staple',
    body: 'Unlike brown rice, white rice is low in fiber and easy to digest. It\'s a reliable source of energy when your gut is sensitive. Pair it with a gentle protein for a balanced meal.',
    category: 'nutrition',
    states: ['flare', 'uncertain'],
  },
  {
    id: 'bone_broth',
    title: 'Try bone broth',
    body: 'Bone broth is rich in amino acids like glutamine and glycine that support your gut lining. It\'s also easy to digest, hydrating, and a good source of minerals. Sip it warm between meals.',
    category: 'nutrition',
    states: [],
  },
  {
    id: 'read_labels',
    title: 'Read ingredient labels',
    body: 'Many packaged foods contain hidden triggers like carrageenan, maltodextrin, or artificial sweeteners. Use the scanner in this app to check products before buying — it takes 5 seconds and can save you hours of discomfort.',
    category: 'nutrition',
    states: [],
  },
  {
    id: 'cded_intro',
    title: 'The Crohn\'s Disease Exclusion Diet',
    body: 'The CDED is a structured eating plan specifically designed for Crohn\'s. In clinical trials, nearly 80% of patients achieved remission. It works in phases, starting restrictive and gradually expanding. Ask your GI doctor about it.',
    source: 'Gastroenterology 2025: CDED adult RCT',
    category: 'nutrition',
    states: [],
  },
  {
    id: 'mediterranean_eating',
    title: 'Mediterranean-style eating',
    body: 'A Mediterranean diet — rich in olive oil, fish, vegetables, and whole grains — has been shown to support healthy gut bacteria and reduce inflammation markers in Crohn\'s patients.',
    source: 'DINE-CD Trial',
    category: 'nutrition',
    states: ['remission'],
  },
  {
    id: 'one_food_at_a_time',
    title: 'Introduce new foods one at a time',
    body: 'When you\'re recovering from a flare, add new foods back slowly — one every 2-3 days. This way, if something bothers you, you\'ll know exactly what it was.',
    category: 'nutrition',
    states: ['uncertain'],
  },
  {
    id: 'low_residue_flare',
    title: 'Low-residue eating during flares',
    body: 'Low-residue means less fiber and less undigested material passing through your gut. Think: white bread, peeled potatoes, well-cooked lean meats, and bananas. It gives your gut a chance to calm down.',
    category: 'nutrition',
    states: ['flare'],
  },
  {
    id: 'fat_tolerance_resection',
    title: 'Watch your fat intake',
    body: 'After bowel resection, your body may not absorb fat as well. High-fat meals can cause diarrhea because bile acids aren\'t recycled properly. Try keeping meals under 15g of fat and see how you feel.',
    category: 'nutrition',
    states: [],
    postResection: true,
  },
  {
    id: 'chew_thoroughly',
    title: 'Chew your food really well',
    body: 'It sounds simple, but thorough chewing is one of the most effective things you can do. It breaks food into smaller pieces so your gut has less work to do — especially important if you\'ve had surgery.',
    category: 'nutrition',
    states: [],
  },

  // ─── HYDRATION ──────────────────────────────────────────

  {
    id: 'sip_dont_gulp',
    title: 'Sip throughout the day',
    body: 'After bowel resection, your body absorbs less water from food. Instead of drinking large amounts at once, take small sips throughout the day. Keep a water bottle nearby as a visual reminder.',
    category: 'hydration',
    states: [],
    postResection: true,
  },
  {
    id: 'electrolytes_matter',
    title: 'Electrolytes matter during a flare',
    body: 'When you have diarrhea, you lose more than just water — you lose sodium, potassium, and other minerals. Oral rehydration solutions or coconut water can help replace what you\'ve lost.',
    category: 'hydration',
    states: ['flare'],
  },
  {
    id: 'water_with_meals',
    title: 'Hydrate between meals, not during',
    body: 'Drinking large amounts of water with food can speed up digestion and worsen diarrhea. Try drinking most of your fluids between meals instead — it helps your gut process food at a better pace.',
    category: 'hydration',
    states: [],
    postResection: true,
  },
  {
    id: 'dehydration_signs',
    title: 'Know the signs of dehydration',
    body: 'Dark urine, dry mouth, dizziness, and fatigue can all be signs you need more fluids. Crohn\'s patients are at higher risk for dehydration, especially during flares or hot weather.',
    category: 'hydration',
    states: [],
  },
  {
    id: 'oral_rehydration',
    title: 'Make your own rehydration drink',
    body: 'Mix 1 liter of water with 6 teaspoons of sugar and ½ teaspoon of salt. This matches the World Health Organization\'s oral rehydration formula and helps your body absorb water faster.',
    category: 'hydration',
    states: ['flare'],
  },
  {
    id: 'limit_caffeine_hydration',
    title: 'Caffeine can dehydrate you',
    body: 'Coffee and energy drinks stimulate your bowels and act as a mild diuretic. If you enjoy coffee, try limiting to 1 cup and balancing it with extra water throughout the day.',
    category: 'hydration',
    states: [],
  },

  // ─── WELLNESS ───────────────────────────────────────────

  {
    id: 'vitamin_d_check',
    title: 'Have you checked your vitamin D?',
    body: 'Most Crohn\'s patients are vitamin D deficient, and it gets worse in winter. Vitamin D helps regulate your immune system and supports bone health. Ask your doctor for a simple blood test.',
    source: 'Multiple RCTs on vitamin D in Crohn\'s',
    category: 'wellness',
    states: [],
  },
  {
    id: 'b12_resection',
    title: 'B12 is critical after surgery',
    body: 'Vitamin B12 is absorbed in the ileum — the part of the bowel most often affected by Crohn\'s or removed in surgery. If your ileum was involved, you likely need B12 supplements or injections. Regular blood tests can catch deficiency early.',
    source: 'Gastroenterology guidelines',
    category: 'wellness',
    states: [],
    postResection: true,
  },
  {
    id: 'iron_forms',
    title: 'Not all iron supplements are equal',
    body: 'Standard iron tablets (ferrous sulfate) can upset your stomach and worsen Crohn\'s symptoms. Ferric maltol is a gentler option. During flares or post-surgery, IV iron may work better since it bypasses your gut entirely.',
    source: 'ECCO/AGA guidelines',
    category: 'wellness',
    states: [],
  },
  {
    id: 'zinc_gut_healing',
    title: 'Zinc supports gut repair',
    body: 'Zinc helps maintain the barrier lining of your intestines. Research shows it can reduce "leaky gut" in Crohn\'s patients in remission. Ask your doctor to check your zinc levels at your next blood test.',
    source: 'Published RCT on zinc and intestinal permeability',
    category: 'wellness',
    states: ['remission'],
  },
  {
    id: 'turmeric_curcumin',
    title: 'Turmeric shows promise',
    body: 'Curcumin, the active compound in turmeric, has anti-inflammatory properties. Studies show more benefit for ulcerative colitis than Crohn\'s so far, but research is ongoing. If you try it, look for formulas with black pepper extract for better absorption.',
    source: 'Frontiers in Nutrition 2025 meta-analysis',
    category: 'wellness',
    states: ['remission'],
  },
  {
    id: 'st_johns_wort_warning',
    title: 'Avoid St. John\'s Wort',
    body: 'If you take immunosuppressants or biologics (like Humira, Remicade, or azathioprine), St. John\'s Wort can dramatically reduce their effectiveness. It interferes with how your body processes these medications. Always tell your doctor about any supplements.',
    source: 'FDA drug interaction alert',
    category: 'wellness',
    states: [],
  },
  {
    id: 'probiotics_reality',
    title: 'Probiotics: the honest picture for Crohn\'s',
    body: 'Unlike ulcerative colitis, probiotics haven\'t shown clear benefits for Crohn\'s in clinical trials. They\'re generally safe, but don\'t expect them to prevent flares. Save your money for supplements with stronger evidence, like vitamin D and zinc.',
    source: 'Multiple RCTs and Cochrane reviews',
    category: 'wellness',
    states: [],
  },
  {
    id: 'omega3_reality',
    title: 'Fish oil: save your money',
    body: 'Despite popular belief, a large Cochrane review found omega-3 supplements are "probably ineffective" for maintaining Crohn\'s remission. They can also cause diarrhea — especially problematic after bowel surgery.',
    source: 'Cochrane Review, 6 studies, 1039 patients',
    category: 'wellness',
    states: [],
  },

  // ─── MINDSET ────────────────────────────────────────────

  {
    id: 'stress_flare_connection',
    title: 'Stress and flares are connected',
    body: 'Research shows that chronic stress can increase gut permeability and trigger inflammatory chemicals in your body. This isn\'t "it\'s all in your head" — it\'s biology. Managing stress is managing your disease.',
    source: 'Multiple prospective studies on stress and IBD',
    category: 'mindset',
    states: [],
  },
  {
    id: 'bad_days_ok',
    title: 'Bad days don\'t mean failure',
    body: 'Living with Crohn\'s means some days will be harder than others. A bad day doesn\'t mean your treatment isn\'t working or that you did something wrong. Be as kind to yourself as you would be to a friend.',
    category: 'mindset',
    states: [],
  },
  {
    id: 'brain_gut_axis',
    title: 'Your brain and gut talk to each other',
    body: 'The gut-brain axis is a real two-way communication system. Anxiety can trigger gut symptoms, and gut inflammation can cause mood changes. This is why mindfulness and therapy can genuinely help your physical symptoms.',
    category: 'mindset',
    states: [],
  },
  {
    id: 'breathing_exercise',
    title: 'Try a 2-minute breathing exercise',
    body: 'Breathe in for 4 counts, hold for 4, breathe out for 6. Repeat 5 times. This activates your vagus nerve, which calms both your nervous system and your gut. It\'s free, it\'s quick, and research backs it up.',
    category: 'mindset',
    states: [],
  },
  {
    id: 'dont_compare',
    title: 'Your Crohn\'s is yours',
    body: 'Everyone\'s Crohn\'s disease is different — different locations, different triggers, different responses to treatment. What works for someone online might not work for you, and that\'s completely normal.',
    category: 'mindset',
    states: [],
  },
  {
    id: 'ask_for_help',
    title: 'Asking for help is strength',
    body: 'Whether it\'s telling your boss you need a bathroom break, asking your partner to cook tonight, or calling your GI team — speaking up about what you need isn\'t weakness. It\'s how you take care of yourself.',
    category: 'mindset',
    states: [],
  },
  {
    id: 'therapy_helps',
    title: 'Therapy can help your gut',
    body: 'Cognitive Behavioral Therapy (CBT) has been shown to improve quality of life in IBD patients. It helps you manage the anxiety, frustration, and unpredictability that come with chronic illness. Many therapists now offer online sessions.',
    source: 'Systematic reviews on CBT and IBD',
    category: 'mindset',
    states: [],
  },

  // ─── EXERCISE ───────────────────────────────────────────

  {
    id: 'gentle_walking',
    title: 'A short walk can help',
    body: 'Even 10-15 minutes of gentle walking can reduce inflammation, improve mood, and help with digestion. During a flare, don\'t push yourself — just moving a little bit counts.',
    category: 'exercise',
    states: ['flare', 'uncertain'],
  },
  {
    id: 'yoga_ibd',
    title: 'Yoga is worth trying',
    body: 'Gentle yoga combines movement, breathing, and stress reduction — all of which benefit Crohn\'s patients. A 12-week study found yoga improved quality of life and reduced disease-related pain. Start with beginner or "gentle flow" classes.',
    source: 'RCT on yoga and IBD outcomes',
    category: 'exercise',
    states: [],
  },
  {
    id: 'swimming_remission',
    title: 'Swimming is a great option',
    body: 'Swimming is low-impact, easy on joints, and provides a full-body workout without jarring your gut. It\'s one of the best exercises during remission. Just stay hydrated and avoid swallowing pool water.',
    category: 'exercise',
    states: ['remission'],
  },
  {
    id: 'listen_to_body',
    title: 'Exercise: listen to your body',
    body: 'Some days you\'ll feel strong enough for a real workout. Other days, a gentle stretch is all you\'ve got. Both are valuable. The goal is consistent movement over time, not pushing through pain.',
    category: 'exercise',
    states: [],
  },
  {
    id: 'movement_inflammation',
    title: 'Movement reduces inflammation',
    body: 'A meta-analysis of 6 clinical trials found that regular exercise improved disease activity scores in IBD patients. You don\'t need to run marathons — 20-30 minutes of moderate activity 3 times a week makes a real difference.',
    source: 'PLoS ONE 2022 meta-analysis',
    category: 'exercise',
    states: ['remission'],
  },

  // ─── SLEEP ──────────────────────────────────────────────

  {
    id: 'sleep_flare_risk',
    title: 'Poor sleep doubles your flare risk',
    body: 'A major study found that Crohn\'s patients with sleep problems were twice as likely to flare within 6 months. Sleep isn\'t a luxury — it\'s part of managing your disease. Prioritize it like you would a medication.',
    source: 'Clinical Gastroenterology & Hepatology study',
    category: 'sleep',
    states: [],
  },
  {
    id: 'consistent_sleep',
    title: 'Keep a consistent sleep schedule',
    body: 'Going to bed and waking up at roughly the same time — even on weekends — helps regulate your body\'s inflammatory rhythms. Your immune system works on a clock, and irregular sleep disrupts it.',
    category: 'sleep',
    states: [],
  },
  {
    id: 'wind_down_routine',
    title: 'Create a wind-down routine',
    body: 'Dim the lights, put away screens, and do something calming 30 minutes before bed. This signals your nervous system to shift from "alert" to "repair" mode — which is when your gut does its best healing.',
    category: 'sleep',
    states: [],
  },
  {
    id: 'sleep_position',
    title: 'Try sleeping on your left side',
    body: 'Left-side sleeping can help with digestion by keeping your stomach below your esophagus and aiding gravity-assisted movement through your intestines. It may reduce nighttime discomfort and acid reflux.',
    category: 'sleep',
    states: [],
  },
  {
    id: 'fatigue_is_real',
    title: 'Fatigue is a real symptom',
    body: 'Crohn\'s fatigue isn\'t laziness — it\'s your body fighting inflammation, dealing with nutrient deficiencies, and healing. If you\'re exhausted, rest. Check your iron, B12, and vitamin D levels with your doctor.',
    category: 'sleep',
    states: ['flare', 'uncertain'],
  },
];

/**
 * Get a tip for today based on user context.
 * Uses day-of-year for deterministic daily rotation.
 */
export function getTodaysTip(
  diseaseState: DiseaseState,
  hasResection: boolean,
): DailyTip {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (now.getTime() - startOfYear.getTime()) / 86_400_000,
  );

  const relevant = DAILY_TIPS.filter((tip) => {
    // Filter by disease state (empty = applies to all)
    if (tip.states.length > 0 && !tip.states.includes(diseaseState)) {
      return false;
    }
    // Filter by resection status
    if (tip.postResection === true && !hasResection) return false;
    if (tip.postResection === false && hasResection) return false;
    return true;
  });

  // Deterministic pick: same tip all day, new tip tomorrow
  return relevant[dayOfYear % relevant.length];
}
