/**
 * Evidence-based wellness and natural health approaches for Crohn's disease.
 *
 * Every entry includes:
 * - Plain-language description (no unexplained jargon)
 * - Evidence rating from A (strongest) to X (dangerous)
 * - Safety notes and drug interaction warnings
 * - Whether it's appropriate during flare vs. remission
 *
 * Sources: PubMed, Cochrane Reviews, ECCO/AGA guidelines, published RCTs.
 * This is NOT medical advice — always consult your gastroenterologist.
 */

// ─── Types ────────────────────────────────────────────────

export type EvidenceRating = 'A' | 'B' | 'C' | 'D' | 'X';

export type WellnessCategory =
  | 'diet'
  | 'supplement'
  | 'mind-body'
  | 'lifestyle'
  | 'warning';

export interface WellnessApproach {
  id: string;
  name: string;
  /** One-line summary shown in lists */
  tagline: string;
  /** What is this? — plain language, 2-3 sentences */
  whatItIs: string;
  /** How does it help (or not)? — plain language */
  howItHelps: string;
  category: WellnessCategory;

  /** Evidence rating */
  evidenceRating: EvidenceRating;
  /** What the rating means in plain words */
  evidenceExplained: string;
  /** Key research findings in plain language */
  evidenceSummary: string;
  /** Where the evidence comes from */
  sources: string[];

  /** Safety and practical info */
  safetyNotes?: string;
  drugInteractions?: string;
  safeDuringFlare: boolean;
  safeDuringRemission: boolean;
  postResectionNotes?: string;
}

// ─── Evidence Rating Labels ───────────────────────────────

export const EVIDENCE_LABELS: Record<
  EvidenceRating,
  { label: string; description: string; color: 'safe' | 'primary' | 'caution' | 'textTertiary' | 'danger' }
> = {
  A: {
    label: 'Strong Evidence',
    description: 'Supported by multiple clinical trials and/or medical guidelines',
    color: 'safe',
  },
  B: {
    label: 'Moderate Evidence',
    description: 'Supported by at least one clinical trial or strong research',
    color: 'primary',
  },
  C: {
    label: 'Early Research',
    description: 'Small studies show promise, but more research is needed',
    color: 'caution',
  },
  D: {
    label: 'Not Supported',
    description: 'Current research does not show a clear benefit for Crohn\'s',
    color: 'textTertiary',
  },
  X: {
    label: 'Potentially Harmful',
    description: 'Known risks or dangerous interactions — avoid or use extreme caution',
    color: 'danger',
  },
};

// ─── Database ─────────────────────────────────────────────

export const WELLNESS_APPROACHES: WellnessApproach[] = [
  // ═══ DIETARY APPROACHES ═══

  {
    id: 'cded',
    name: 'Crohn\'s Disease Exclusion Diet (CDED)',
    tagline: 'A structured eating plan designed specifically for Crohn\'s',
    whatItIs:
      'The CDED is a diet created by researchers specifically for Crohn\'s disease. It works in 3 phases: the first 6 weeks are the most restrictive, then foods are gradually added back. Unlike generic "healthy eating" advice, every food on the plan was chosen based on how it affects Crohn\'s inflammation.',
    howItHelps:
      'In a 2025 clinical trial with adults, 79% of people on the CDED achieved remission within 24 weeks. It works by removing foods known to promote gut inflammation (processed foods, certain additives, excess animal fat) while keeping the diet nutritionally complete and realistic to follow.',
    category: 'diet',
    evidenceRating: 'A',
    evidenceExplained: 'Multiple clinical trials in both adults and children with strong results',
    evidenceSummary:
      'Adult RCT (2025): 79.2% remission at 24 weeks. Pediatric RCT (2024): 77% remission at 8 weeks. Results comparable to liquid-only diets but much easier to stick with.',
    sources: [
      'Gastroenterology 2025: Adult CDED RCT',
      'IBD Journal: CDED Pediatric Trial 2024',
    ],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Best done with guidance from a dietitian familiar with the CDED. The first phase is restrictive — make sure you\'re getting enough calories.',
    postResectionNotes:
      'Compatible with post-resection needs. Your dietitian may need to adjust fiber levels in later phases.',
  },

  {
    id: 'mediterranean',
    name: 'Mediterranean Diet',
    tagline: 'An anti-inflammatory eating pattern with proven benefits',
    whatItIs:
      'The Mediterranean diet focuses on olive oil, fish, vegetables, fruits, legumes, and whole grains, while limiting red meat, processed foods, and added sugars. It\'s not a strict diet — it\'s more of an eating philosophy that\'s been studied for decades.',
    howItHelps:
      'A 2025 study found it promotes beneficial gut bacteria and reduces inflammation markers. In the DINE-CD trial, 43.5% of Crohn\'s patients achieved remission in 6 weeks. It\'s recommended by the International Organization for the Study of IBD.',
    category: 'diet',
    evidenceRating: 'B',
    evidenceExplained: 'One major clinical trial plus supporting research',
    evidenceSummary:
      'DINE-CD trial: 43.5% remission at 6 weeks. Multi-omic study (2025): linked to beneficial microbe changes and reduced fecal calprotectin (a marker of gut inflammation).',
    sources: [
      'DINE-CD Trial (Crohn\'s & Colitis Foundation)',
      'Gastroenterology 2025: Mediterranean Diet Multi-Omic Study',
    ],
    safeDuringFlare: false,
    safeDuringRemission: true,
    safetyNotes:
      'Best suited for remission or mild disease. During a flare, the fiber and raw vegetable content may need to be reduced. Start gradually.',
    postResectionNotes:
      'Good general approach. You may need to modify fiber and fat content based on your tolerance.',
  },

  {
    id: 'low_fodmap',
    name: 'Low-FODMAP Diet',
    tagline: 'Reduces bloating and IBS-like symptoms, but doesn\'t treat Crohn\'s itself',
    whatItIs:
      'FODMAPs are types of carbohydrates that ferment in your gut, causing gas, bloating, and diarrhea. A low-FODMAP diet temporarily removes these foods, then adds them back one by one to find your personal triggers. It\'s meant to be short-term (2-6 weeks), not forever.',
    howItHelps:
      'Important distinction: low-FODMAP helps with symptoms (bloating, gas, urgency) but does NOT reduce Crohn\'s inflammation. A 2024 meta-analysis confirmed it improves quality of life but has no effect on disease activity or calprotectin levels.',
    category: 'diet',
    evidenceRating: 'B',
    evidenceExplained: 'Good evidence for symptom relief; not a disease treatment',
    evidenceSummary:
      'Meta-analysis of 5 RCTs (2024): significant improvement in IBS-like symptoms and quality of life, but no effect on disease activity. AGA Clinical Practice Update supports use for functional symptoms.',
    sources: [
      '2024 Meta-analysis of Low-FODMAP in IBD',
      'AGA Clinical Practice Update 2024',
    ],
    safeDuringFlare: false,
    safeDuringRemission: true,
    safetyNotes:
      'Only use during remission for IBS-like symptoms. Extended use can harm your gut bacteria and cause nutrient deficiencies. Work with a dietitian.',
    postResectionNotes:
      'Be cautious — this diet is already restrictive. Don\'t further limit your nutrition without professional guidance.',
  },

  // ═══ SUPPLEMENTS ═══

  {
    id: 'vitamin_d',
    name: 'Vitamin D',
    tagline: 'Most Crohn\'s patients are deficient — testing and supplementation matter',
    whatItIs:
      'Vitamin D is a hormone your body makes from sunlight. It plays a major role in regulating your immune system and maintaining bone health. Most Crohn\'s patients have low levels, especially those with ileal disease or who\'ve had surgery.',
    howItHelps:
      'Vitamin D helps regulate the immune responses that drive Crohn\'s inflammation. Studies show that maintaining adequate levels (30-50 ng/mL in blood tests) may reduce the risk of flares. It also protects your bones — important if you\'ve ever taken steroids.',
    category: 'supplement',
    evidenceRating: 'A',
    evidenceExplained: 'Multiple clinical trials, Cochrane review, and guideline-endorsed',
    evidenceSummary:
      'Cochrane review: fewer relapses with adequate vitamin D. Pilot RCT: up to 5,000 IU/day reduced disease activity scores. Deficiency is extremely common in Crohn\'s patients.',
    sources: [
      'Cochrane Review: Vitamin D for IBD',
      'Multiple RCTs on vitamin D supplementation in Crohn\'s',
    ],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Get your levels tested before supplementing. Typical doses range from 1,000-5,000 IU/day depending on how deficient you are. Your doctor can guide the right dose.',
    drugInteractions:
      'If you\'re taking corticosteroids (like prednisone), you may need a higher dose — steroids increase your need for vitamin D and calcium.',
    postResectionNotes:
      'Critical after ileal resection — your body absorbs less vitamin D. You may need higher doses or even injectable forms. Check levels every 3-6 months.',
  },

  {
    id: 'iron',
    name: 'Iron Supplementation',
    tagline: 'Essential for fighting anemia — but the type matters',
    whatItIs:
      'Iron deficiency and anemia are extremely common in Crohn\'s due to inflammation, blood loss, and poor absorption. Supplementing iron can restore your energy and prevent fatigue, but not all forms of iron are equal for Crohn\'s patients.',
    howItHelps:
      'Iron restores hemoglobin levels and fights the crushing fatigue that many Crohn\'s patients experience. The key is choosing the right form: standard iron tablets (ferrous sulfate) often cause stomach upset and can worsen gut inflammation.',
    category: 'supplement',
    evidenceRating: 'A',
    evidenceExplained: 'ECCO and AGA guidelines recommend screening and treatment for all IBD patients',
    evidenceSummary:
      'Guideline-endorsed treatment. Meta-analysis: IV iron is more effective for significant anemia. Ferric maltol (oral) has fewer GI side effects than ferrous sulfate. During active disease, IV iron is preferred.',
    sources: [
      'ECCO Guidelines on Iron Deficiency in IBD',
      'AGA Clinical Practice Update 2024',
    ],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Get your iron levels and ferritin tested. Mild anemia in remission: try ferric maltol (gentler oral form). Moderate-severe anemia or active disease: IV iron is better. Avoid standard ferrous sulfate if it upsets your stomach.',
    drugInteractions:
      'Take oral iron 2 hours apart from other medications — it can reduce absorption of many drugs.',
    postResectionNotes:
      'Absorption is often impaired after surgery. IV iron may be the better route. Discuss with your GI team.',
  },

  {
    id: 'b12',
    name: 'Vitamin B12',
    tagline: 'Critical after ileal surgery — oral supplements may not be enough',
    whatItIs:
      'Vitamin B12 is absorbed in the ileum — the last section of your small intestine and the area most commonly affected by Crohn\'s or removed during surgery. Without enough B12, you can develop nerve damage, fatigue, brain fog, and anemia.',
    howItHelps:
      'Supplementing B12 prevents the serious deficiency symptoms that develop when your body can\'t absorb it from food. If your ileum was removed or is heavily scarred, you likely need supplements for life.',
    category: 'supplement',
    evidenceRating: 'A',
    evidenceExplained: 'Standard medical practice based on well-established physiology',
    evidenceSummary:
      'If more than 50cm of ileum was removed, oral B12 is likely insufficient — sublingual, nasal spray, or injections are needed. Check levels every 6-12 months.',
    sources: ['Gastroenterology guidelines on post-resection nutrition'],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Safe at recommended doses. If you\'ve had ileal surgery, ask your doctor about B12 injections or sublingual (under-the-tongue) forms since oral tablets may not absorb well.',
    postResectionNotes:
      'This is one of the most important supplements after ileal resection. Regular blood testing is essential — deficiency can develop slowly and cause permanent nerve damage if not caught.',
  },

  {
    id: 'zinc',
    name: 'Zinc',
    tagline: 'Helps repair your gut lining — many Crohn\'s patients are low',
    whatItIs:
      'Zinc is a mineral involved in immune function and tissue repair. Many Crohn\'s patients are zinc-deficient due to poor absorption and increased losses during diarrhea.',
    howItHelps:
      'Research shows zinc supplementation can improve intestinal permeability — the "leaky gut" that allows bacteria and toxins to pass through your gut wall and trigger inflammation. One study found 8 weeks of zinc supplementation significantly tightened the gut barrier.',
    category: 'supplement',
    evidenceRating: 'B',
    evidenceExplained: 'Positive results from clinical studies, but more research needed',
    evidenceSummary:
      'RCT: Zinc sulfate for 8 weeks significantly improved intestinal permeability in Crohn\'s patients in remission. Mechanism is well understood — zinc is essential for tight junction proteins in the gut wall.',
    sources: ['Published RCT on zinc and intestinal permeability in Crohn\'s'],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Get your levels checked first. Standard dose is 25-50mg/day. Don\'t take more than 40mg/day long-term without medical supervision — excess zinc can cause copper deficiency.',
    drugInteractions:
      'Take 2 hours apart from ciprofloxacin and other fluoroquinolone antibiotics — zinc reduces their absorption.',
    postResectionNotes:
      'Higher risk of deficiency due to malabsorption. Testing and supplementation are especially important.',
  },

  {
    id: 'curcumin',
    name: 'Curcumin (Turmeric)',
    tagline: 'Anti-inflammatory properties — stronger evidence in UC than Crohn\'s',
    whatItIs:
      'Curcumin is the active compound in turmeric that gives it the yellow color. It has natural anti-inflammatory and antioxidant properties. You can get it from turmeric spice, but therapeutic doses usually require a concentrated supplement.',
    howItHelps:
      'Curcumin blocks several inflammatory pathways involved in IBD. Most clinical trials have been in ulcerative colitis, where results are promising. For Crohn\'s specifically, there are only 2 dedicated trials so far — results are encouraging but limited.',
    category: 'supplement',
    evidenceRating: 'B',
    evidenceExplained: 'Strong UC evidence, limited but promising Crohn\'s-specific data',
    evidenceSummary:
      'Meta-analysis of 13 RCTs in IBD (2025): safe and promising. Only 2 trials specifically in Crohn\'s. Typical doses: 1.5-3g/day. Bioavailability is poor — look for formulas with piperine (black pepper extract) or nano-curcumin.',
    sources: ['Frontiers in Nutrition 2025: Curcumin IBD Meta-analysis'],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Generally safe — side effects similar to placebo in studies. Start with a low dose. Discuss with your GI doctor before starting.',
    drugInteractions:
      'May affect how your body processes azathioprine and 6-MP (CYP450 enzymes). Talk to your doctor if you\'re on these medications.',
    postResectionNotes:
      'No specific concerns, but absorption may be reduced after surgery.',
  },

  // ═══ MIND-BODY PRACTICES ═══

  {
    id: 'mindfulness',
    name: 'Mindfulness & Meditation',
    tagline: 'Reduces stress, improves symptoms, and supports your gut-brain connection',
    whatItIs:
      'Mindfulness means paying attention to the present moment without judgment. Meditation is a structured practice of mindfulness — usually guided breathing or body awareness exercises, typically 10-20 minutes. It\'s not about "emptying your mind" — it\'s about noticing your thoughts without getting swept up in them.',
    howItHelps:
      'An 8-week mindfulness program reduced fatigue in IBD patients and improved inflammatory markers. It works through the gut-brain axis — calming your nervous system directly reduces gut inflammation. It also helps you cope with the anxiety and unpredictability of living with Crohn\'s.',
    category: 'mind-body',
    evidenceRating: 'B',
    evidenceExplained: 'Multiple clinical trials show real benefits for IBD patients',
    evidenceSummary:
      'RCT: 8-week MBCT effectively reduced fatigue in IBD. Nature study (2020): mindfulness improved inflammatory biomarkers. Multiple trials show quality of life improvements.',
    sources: [
      'Mindfulness journal: MBCT for IBD fatigue RCT',
      'Nature Scientific Reports 2020: Mindfulness and IBD biomarkers',
    ],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes: 'No known risks. Start with guided apps or short sessions. Even 5 minutes daily has value.',
    postResectionNotes: 'Safe and beneficial at any stage of your journey.',
  },

  {
    id: 'cbt',
    name: 'Cognitive Behavioral Therapy (CBT)',
    tagline: 'Proven therapy for managing the mental toll of chronic illness',
    whatItIs:
      'CBT is a type of talk therapy that helps you identify and change unhelpful thought patterns. For Crohn\'s patients, this might mean addressing catastrophizing ("this flare will never end"), health anxiety, or the depression that often accompanies chronic illness.',
    howItHelps:
      'Systematic reviews show CBT improves quality of life in IBD adults. It addresses the two-way connection between your mental state and gut — reducing anxiety can directly reduce gut symptoms. Many therapists now offer online sessions.',
    category: 'mind-body',
    evidenceRating: 'B',
    evidenceExplained: 'Systematic reviews confirm benefits for IBD quality of life',
    evidenceSummary:
      'Short-term beneficial effects on quality of life in adults with IBD. Particularly helpful for patients with anxiety, depression, or high stress levels.',
    sources: ['Systematic reviews on CBT and IBD'],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'No physical risks. Look for therapists experienced with chronic illness. Online CBT programs are available if in-person isn\'t accessible.',
  },

  {
    id: 'yoga',
    name: 'Yoga',
    tagline: 'Combines gentle movement with stress reduction',
    whatItIs:
      'Yoga combines physical poses, breathing exercises, and meditation. For Crohn\'s patients, gentle or restorative styles are best — think slow stretches and deep breathing, not hot power yoga.',
    howItHelps:
      'A 12-week study found that yoga combined with meditation and breathwork improved outcomes in IBD patients. It reduces stress hormones, gently moves your body, and can ease abdominal discomfort.',
    category: 'mind-body',
    evidenceRating: 'B',
    evidenceExplained: 'Clinical trial data as part of combined mind-body programs',
    evidenceSummary:
      '12-week RCT: video-based yoga + meditation + breathwork improved quality of life and pain compared to motivational messages alone.',
    sources: ['RCT on combined yoga/meditation intervention for IBD'],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'During a flare, stick to gentle/restorative yoga. Avoid intense core work or inversions if you have abdominal pain. Listen to your body.',
  },

  // ═══ LIFESTYLE ═══

  {
    id: 'exercise',
    name: 'Regular Exercise',
    tagline: 'Reduces inflammation and improves quality of life',
    whatItIs:
      'Regular physical activity — walking, cycling, swimming, strength training — done consistently at a moderate level. You don\'t need to be an athlete. The goal is moving your body regularly in a way that feels manageable.',
    howItHelps:
      'A meta-analysis of 6 clinical trials found exercise improved disease activity scores in IBD. Physical activity reduces inflammatory markers, improves mood, strengthens bones (important if you\'ve taken steroids), and helps with fatigue.',
    category: 'lifestyle',
    evidenceRating: 'A',
    evidenceExplained: 'Meta-analysis of multiple clinical trials supports clear benefits',
    evidenceSummary:
      'Meta-analysis (6 RCTs): exercise improved disease activity scores. Recommended: 20-30 minutes at moderate intensity, 3x/week. Physical activity also inversely associated with risk of developing Crohn\'s.',
    sources: ['PLoS ONE 2022: Exercise and IBD Meta-analysis'],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'During flares: low-intensity only (gentle walking, stretching). During remission: moderate activity is safe and encouraged. Always listen to your body — urgency and fatigue are valid reasons to rest.',
  },

  {
    id: 'sleep',
    name: 'Sleep Quality',
    tagline: 'Poor sleep doubles your flare risk — it\'s that important',
    whatItIs:
      'Sleep quality means both getting enough hours (7-9 for most adults) and getting restorative, uninterrupted sleep. For Crohn\'s patients, sleep isn\'t just about feeling rested — it directly affects your disease.',
    howItHelps:
      'A landmark study found that Crohn\'s patients with sleep disturbances were twice as likely to flare within 6 months (22% vs. 12%). Sleep deprivation increases TNF-alpha, IL-1, and IL-6 — the exact inflammatory chemicals that drive Crohn\'s.',
    category: 'lifestyle',
    evidenceRating: 'A',
    evidenceExplained: 'Strong prospective study data linking sleep to flare risk',
    evidenceSummary:
      'Prospective cohort: 2x flare risk with sleep disturbance, specific to Crohn\'s. Sleep deprivation elevates all major Crohn\'s inflammatory mediators. Consistent sleep schedule helps regulate immune rhythms.',
    sources: ['Clinical Gastroenterology & Hepatology: Sleep and IBD Flare Risk'],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Aim for consistent bed/wake times. If nighttime symptoms disrupt your sleep, talk to your GI doctor — treating the underlying inflammation is the priority.',
  },

  {
    id: 'stress_management',
    name: 'Stress Management',
    tagline: 'Chronic stress can trigger flares — this is biology, not psychology',
    whatItIs:
      'Stress management includes any technique that helps reduce chronic stress: deep breathing, meditation, therapy, hobbies, social connection, time in nature, or simply setting boundaries. The key word is "chronic" — occasional stress is normal; sustained stress is what causes problems.',
    howItHelps:
      'Multiple studies show that stressful life events predict Crohn\'s relapse. Chronic stress activates your HPA axis (your body\'s stress response system), increases gut permeability, and promotes the inflammatory chemicals that drive Crohn\'s. Managing stress isn\'t optional — it\'s part of managing your disease.',
    category: 'lifestyle',
    evidenceRating: 'A',
    evidenceExplained: 'Multiple prospective studies confirm stress triggers flares',
    evidenceSummary:
      'Prospective studies: stressful events predict relapse. Chronic stress elevates cortisol, TNF-alpha, IL-6, and increases gut permeability. The connection is bidirectional — stress worsens IBD, and active IBD increases stress.',
    sources: [
      'Multiple prospective studies on stress and IBD',
      'Psychoneuroimmunology of stress in IBD',
    ],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Find what works for you — there\'s no single "right" way to manage stress. Even small daily practices (a 5-minute walk, calling a friend, breathing exercises) add up.',
  },

  // ═══ NOT RECOMMENDED (honest about what doesn't work) ═══

  {
    id: 'omega3',
    name: 'Omega-3 / Fish Oil',
    tagline: 'Popular but probably ineffective for Crohn\'s — and may cause diarrhea',
    whatItIs:
      'Omega-3 fatty acids, usually from fish oil supplements, are widely marketed as anti-inflammatory. Many Crohn\'s patients try them hoping to reduce flares.',
    howItHelps:
      'Unfortunately, the evidence doesn\'t support this for Crohn\'s. A large Cochrane review analyzing 6 studies and over 1,000 patients concluded omega-3 supplements are "probably ineffective" for maintaining remission. They can also cause diarrhea and fishy taste/burps.',
    category: 'supplement',
    evidenceRating: 'D',
    evidenceExplained: 'Large review found no benefit for Crohn\'s remission',
    evidenceSummary:
      'Cochrane review (6 studies, 1,039 patients): "probably ineffective for maintenance of remission in CD." Two large, high-quality EPIC trials showed no benefit. Side effects include diarrhea.',
    sources: ['Cochrane Review: Omega-3 for Crohn\'s Maintenance'],
    safeDuringFlare: false,
    safeDuringRemission: true,
    safetyNotes:
      'Not harmful in normal doses, but likely a waste of money for Crohn\'s specifically. The diarrhea side effect is especially problematic after bowel surgery.',
    postResectionNotes:
      'The diarrhea side effect makes this a poor choice post-resection.',
  },

  {
    id: 'probiotics',
    name: 'Probiotics (for Crohn\'s)',
    tagline: 'Helpful for UC and pouchitis, but not proven for Crohn\'s',
    whatItIs:
      'Probiotics are live bacteria supplements (like Lactobacillus, Saccharomyces boulardii, or VSL#3) marketed to improve gut health. They\'re helpful for some conditions — but Crohn\'s isn\'t reliably one of them.',
    howItHelps:
      'Unlike ulcerative colitis (where VSL#3 works well for pouchitis), probiotics have consistently failed to show clear benefits for Crohn\'s in clinical trials. Single-strain probiotics like Lactobacillus GG did not prevent post-surgical recurrence.',
    category: 'supplement',
    evidenceRating: 'D',
    evidenceExplained: 'Multiple trials have failed to show benefit specifically for Crohn\'s',
    evidenceSummary:
      'VSL#3: trend but no significant difference vs. placebo post-surgery. S. boulardii: not effective for preventing relapse. Lactobacillus GG: not effective for post-surgical recurrence. Note: probiotics DO work for UC/pouchitis.',
    sources: [
      'Multiple RCTs on probiotics in Crohn\'s disease',
      'Cochrane reviews on probiotics and IBD',
    ],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Generally safe. Extremely rare risk of probiotic sepsis with severe immunosuppression. Won\'t hurt you, but current evidence says don\'t expect it to help your Crohn\'s.',
  },

  {
    id: 'glutamine',
    name: 'L-Glutamine',
    tagline: 'Popular supplement, but research doesn\'t support it for Crohn\'s',
    whatItIs:
      'L-Glutamine is an amino acid that fuels intestinal cells. It\'s widely marketed for "gut health" and "leaky gut repair." Many health influencers recommend it for IBD.',
    howItHelps:
      'Despite its popularity, a Cochrane review and systematic review both found no significant improvement in intestinal permeability or symptoms from glutamine supplementation in Crohn\'s patients.',
    category: 'supplement',
    evidenceRating: 'D',
    evidenceExplained: 'Cochrane review and systematic reviews found no benefit',
    evidenceSummary:
      'Cochrane review: no statistically significant improvement in intestinal permeability vs. placebo. Systematic review: "no effect on intestinal permeability and morphology in IBD regardless of route."',
    sources: [
      'Cochrane Review: Glutamine for Crohn\'s Disease',
      'Amino Acids 2024: Glutamine Systematic Review',
    ],
    safeDuringFlare: true,
    safeDuringRemission: true,
    safetyNotes:
      'Safe to take, but current evidence doesn\'t justify the cost. Your money is better spent on supplements with proven benefits (vitamin D, zinc, iron).',
  },

  // ═══ WARNINGS — POTENTIALLY HARMFUL ═══

  {
    id: 'st_johns_wort',
    name: 'St. John\'s Wort',
    tagline: 'DANGEROUS with Crohn\'s medications — can cause treatment failure',
    whatItIs:
      'St. John\'s Wort is an herbal supplement used for mild depression. It\'s available over the counter and many people don\'t realize it has serious drug interactions.',
    howItHelps:
      'It doesn\'t help Crohn\'s — and it can actively harm you. St. John\'s Wort dramatically speeds up how your body breaks down medications, which means your Crohn\'s drugs may stop working. This can cause a flare or treatment failure.',
    category: 'warning',
    evidenceRating: 'X',
    evidenceExplained: 'Known dangerous drug interactions — FDA-flagged',
    evidenceSummary:
      'Drastically reduces blood levels of immunosuppressants (cyclosporine, tacrolimus, azathioprine, 6-MP). Can reduce effectiveness of biologics. As of January 2025, US labels must include "Drug Interaction Alert" symbol.',
    sources: ['FDA Drug Interaction Alert', 'Published review of St. John\'s Wort interactions'],
    safeDuringFlare: false,
    safeDuringRemission: false,
    drugInteractions:
      'Dangerous with ALL immunosuppressants and biologics commonly used in Crohn\'s: Humira, Remicade, Stelara, Entyvio, azathioprine, 6-MP, methotrexate, cyclosporine, tacrolimus.',
    safetyNotes:
      'Do not take this if you are on ANY Crohn\'s medication. If you need help with depression (which is very common with chronic illness), talk to your doctor about safe options like SSRIs or therapy.',
  },

  {
    id: 'echinacea',
    name: 'Echinacea',
    tagline: 'Immune booster — the opposite of what Crohn\'s patients need',
    whatItIs:
      'Echinacea is an herbal supplement marketed to "boost your immune system" and fight colds. The problem is that Crohn\'s disease IS an overactive immune system — and most Crohn\'s medications work by calming it down.',
    howItHelps:
      'It doesn\'t help Crohn\'s. Echinacea stimulates immune activity, which directly opposes what immunosuppressive medications are trying to do. It may counteract your treatment.',
    category: 'warning',
    evidenceRating: 'X',
    evidenceExplained: 'Theoretical but serious risk of counteracting immunosuppressive therapy',
    evidenceSummary:
      'No Crohn\'s-specific studies, but the mechanism of action (immune stimulation) directly conflicts with immunosuppressive therapy. Avoid to be safe.',
    sources: ['Pharmacology review of immune-stimulating herbs and autoimmune disease'],
    safeDuringFlare: false,
    safeDuringRemission: false,
    drugInteractions:
      'May reduce the effectiveness of immunosuppressants and biologics by stimulating the immune system they\'re trying to suppress.',
    safetyNotes:
      'Also applies to other "immune boosting" supplements like astragalus and elderberry. If your immune system is the problem, you don\'t want to boost it.',
  },

  {
    id: 'high_dose_vitamin_c',
    name: 'High-Dose Vitamin C (over 2,000mg/day)',
    tagline: 'Can cause diarrhea and kidney stones — risky after bowel surgery',
    whatItIs:
      'Megadose vitamin C (over 2g/day) is sometimes promoted for immune health. Normal vitamin C intake from food and standard supplements is fine — the concern is with very high doses.',
    howItHelps:
      'It doesn\'t help Crohn\'s. High doses pull water into your intestines (osmotic effect), causing diarrhea. They also increase oxalate levels in your urine, raising kidney stone risk — which is already elevated after ileal resection.',
    category: 'warning',
    evidenceRating: 'X',
    evidenceExplained: 'Known to cause diarrhea and increase kidney stone risk post-resection',
    evidenceSummary:
      'No evidence of benefit for Crohn\'s. Osmotic diarrhea at high doses. Increased oxalate absorption after ileal resection already raises kidney stone risk — high-dose vitamin C compounds this.',
    sources: ['Urology and nutrition guidelines on oxalate management post-resection'],
    safeDuringFlare: false,
    safeDuringRemission: false,
    safetyNotes:
      'Normal vitamin C intake (from food or a daily multivitamin) is fine. Avoid megadose supplements (1,000mg+ tablets). If you need immune support, focus on vitamin D and zinc instead.',
    postResectionNotes:
      'Especially risky post-resection due to already-elevated kidney stone risk from increased oxalate absorption.',
  },
];

/**
 * Get approaches filtered by category.
 */
export function getByCategory(category: WellnessCategory): WellnessApproach[] {
  return WELLNESS_APPROACHES.filter((a) => a.category === category);
}

/**
 * Get approaches by evidence rating.
 */
export function getByRating(rating: EvidenceRating): WellnessApproach[] {
  return WELLNESS_APPROACHES.filter((a) => a.evidenceRating === rating);
}

/**
 * Get only recommended approaches (A or B rating).
 */
export function getRecommended(): WellnessApproach[] {
  return WELLNESS_APPROACHES.filter(
    (a) => a.evidenceRating === 'A' || a.evidenceRating === 'B',
  );
}

/**
 * Get warnings (X-rated approaches to avoid).
 */
export function getWarnings(): WellnessApproach[] {
  return WELLNESS_APPROACHES.filter((a) => a.evidenceRating === 'X');
}
