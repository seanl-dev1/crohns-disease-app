/**
 * Knowledge Hub article data.
 * Each article is educational content written at grade 6-8 reading level.
 * Source: educational-content.md
 */

export interface KnowledgeArticle {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  category: 'basics' | 'treatment' | 'nutrition' | 'lifestyle' | 'complementary' | 'advanced';
  readTime: string;
  sections: ArticleSection[];
  disclaimer: string;
  citation: string;
}

export interface ArticleSection {
  heading: string;
  body: string;
}

export const ARTICLE_CATEGORIES = {
  basics: { label: 'Understanding Crohn\'s', icon: 'school-outline' },
  treatment: { label: 'Treatment & Meds', icon: 'medkit-outline' },
  nutrition: { label: 'Diet & Nutrition', icon: 'nutrition-outline' },
  lifestyle: { label: 'Daily Life', icon: 'sunny-outline' },
  complementary: { label: 'Natural & Complementary', icon: 'leaf-outline' },
  advanced: { label: 'Going Deeper', icon: 'flask-outline' },
} as const;

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 1,
    title: 'What Is Crohn\'s Disease?',
    subtitle: 'Your immune system, inflammation, and what causes flares',
    icon: 'help-circle-outline',
    category: 'basics',
    readTime: '5 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider.',
    citation: 'Based on information from the Crohn\'s & Colitis Foundation, ACG Clinical Guidelines for Crohn\'s Disease (2018), and current IBD research.',
    sections: [
      {
        heading: 'Your Immune System Is Confused',
        body: 'Crohn\'s disease is a type of inflammatory bowel disease (IBD). In simple terms, your immune system — which is supposed to protect you from germs — has gotten confused. Instead of only attacking harmful bacteria and viruses, it\'s also attacking the healthy tissue in your digestive tract.\n\nThis causes inflammation. Think of inflammation like a fire burning inside your intestines. When that fire is active, it damages the lining of your gut, causing pain, diarrhea, bleeding, and a long list of other symptoms.',
      },
      {
        heading: 'Where Does It Happen?',
        body: 'Crohn\'s can affect any part of your digestive tract, from your mouth all the way to your anus. But it most commonly hits the end of the small intestine (called the ileum) and the beginning of the large intestine (the colon).\n\nUnlike ulcerative colitis, which only affects the colon and moves in a continuous pattern, Crohn\'s can skip around — you might have a healthy section right next to an inflamed one.\n\nThe inflammation in Crohn\'s also goes deeper. While ulcerative colitis only affects the inner lining, Crohn\'s can burrow through the full thickness of the intestinal wall. This is why Crohn\'s can lead to fistulas (abnormal tunnels between organs) and strictures (narrowed sections).',
      },
      {
        heading: 'How Is It Different From Ulcerative Colitis?',
        body: '• Crohn\'s disease: Can affect any part of the GI tract. Inflammation goes deep into the bowel wall. Can skip areas. May cause fistulas and strictures.\n\n• Ulcerative colitis: Only affects the colon and rectum. Inflammation stays in the inner lining. Moves in a continuous pattern. Rarely causes fistulas.\n\nAbout 5-15% of IBD patients have features of both and are diagnosed with "indeterminate colitis." If that\'s you, don\'t worry — the treatment approach is similar.',
      },
      {
        heading: 'Who Gets Crohn\'s?',
        body: 'Crohn\'s affects about 1.6 million Americans, and that number is growing. It can start at any age, but it\'s most often diagnosed between ages 15 and 35.\n\n• Genetics play a role. Over 200 genes linked to IBD have been identified. But having the genes doesn\'t mean you\'ll definitely get it.\n\n• Environment matters. Crohn\'s is more common in developed countries and urban areas. Smoking significantly increases your risk.\n\n• Your gut bacteria are involved. People with Crohn\'s often have different gut bacteria than healthy people — fewer beneficial species and more potentially harmful ones.',
      },
      {
        heading: 'It\'s Not Your Fault',
        body: 'Let\'s be clear: you did not cause your Crohn\'s disease. It\'s not from eating the wrong foods, being too stressed, or not taking care of yourself. Crohn\'s is an immune-mediated disease with genetic and environmental factors.\n\nWhat you can do is manage it. And that\'s what this app is here to help with.',
      },
      {
        heading: 'What Causes Flares?',
        body: 'A "flare" is when your disease becomes active after a period of remission. Flares can be triggered by:\n\n• Stopping or missing your medications\n• Certain foods (which vary person to person — that\'s why tracking matters)\n• Infections\n• Stress (doesn\'t cause Crohn\'s, but can trigger flares)\n• NSAIDs like ibuprofen and aspirin\n• Smoking\n• Sometimes, flares happen for no clear reason at all\n\nThe unpredictability is one of the hardest parts. That\'s why tracking your symptoms, food, stress, and sleep over time can help you identify YOUR patterns.',
      },
    ],
  },
  {
    id: 2,
    title: 'Types of Crohn\'s Disease',
    subtitle: 'How location affects your symptoms and treatment',
    icon: 'body-outline',
    category: 'basics',
    readTime: '4 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider.',
    citation: 'Based on the Crohn\'s & Colitis Foundation classification and ACG Clinical Guidelines.',
    sections: [
      {
        heading: 'Ileocolitis — The Most Common Type',
        body: 'Where: The end of the small intestine (ileum) and the beginning of the large intestine (colon).\n\nHow common: About 50% of Crohn\'s patients have this type.\n\nTypical symptoms: Diarrhea, cramping in the lower right side of your abdomen, weight loss, and fatigue.\n\nIf you\'ve had your ileocecal valve removed, you have this type. After ileal resection, you\'re at risk for B12 deficiency and bile acid malabsorption.',
      },
      {
        heading: 'Ileitis',
        body: 'Where: Only the ileum (the last section of the small intestine).\n\nHow common: About 30% of Crohn\'s patients.\n\nThe ileum is where your body absorbs vitamin B12 and bile acids. If this section is inflamed or has been surgically removed, you\'ll need to monitor these nutrients closely.',
      },
      {
        heading: 'Crohn\'s Colitis',
        body: 'Where: Only the colon (large intestine).\n\nHow common: About 20% of Crohn\'s patients.\n\nTypical symptoms: Diarrhea (often bloody), rectal bleeding, urgency, and joint pain. Can look similar to ulcerative colitis.',
      },
      {
        heading: 'Gastroduodenal Crohn\'s',
        body: 'Where: The stomach and the first part of the small intestine (duodenum).\n\nHow common: Rare — about 5% of cases.\n\nThis type can affect how you absorb nutrients since the duodenum is a major absorption site. Iron and calcium deficiencies are common.',
      },
      {
        heading: 'Jejunoileitis & Perianal Crohn\'s',
        body: 'Jejunoileitis affects the middle section of the small intestine. It\'s rare but can lead to malabsorption of many nutrients.\n\nPerianal Crohn\'s affects the area around the anus. About 30% of Crohn\'s patients develop perianal involvement at some point. It can be one of the most debilitating forms, often requiring a combination of medications and surgery.',
      },
      {
        heading: 'Why Location Matters for YOU',
        body: 'Your Crohn\'s type determines:\n\n• Which nutrients you need to monitor most closely\n• Which symptoms to expect and track\n• How your food is digested and absorbed\n• Which medications are most likely to work\n• What kind of surgery you might need (or have had)\n\nWhen you set up this app, telling us where your Crohn\'s is located helps us tailor everything.',
      },
    ],
  },
  {
    id: 3,
    title: 'Understanding Your Diagnosis',
    subtitle: 'Tests, severity levels, and questions for your doctor',
    icon: 'clipboard-outline',
    category: 'basics',
    readTime: '6 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider.',
    citation: 'Based on ACG clinical guidelines and Crohn\'s & Colitis Foundation diagnostic resources.',
    sections: [
      {
        heading: 'The Tests and What They Mean',
        body: 'Colonoscopy: A camera on a flexible tube that examines the inside of your colon. The most important test for diagnosing and monitoring Crohn\'s.\n\nMR Enterography (MRE): An MRI of your abdomen after drinking contrast. Shows your small intestine in detail. No radiation.\n\nCT Scan: Similar to MRE but uses X-rays. Faster, often used in emergencies.\n\nCapsule Endoscopy: You swallow a tiny camera pill that photographs your small intestine.',
      },
      {
        heading: 'Blood Tests',
        body: '• CRP (C-Reactive Protein): A marker of inflammation. Higher = more inflammation.\n• ESR: Another inflammation marker.\n• CBC: Checks for anemia, infection, and overall blood health.\n• Albumin: Reflects your nutritional status.\n• Iron panel and ferritin: Checks for iron deficiency.\n• Vitamin B12 and folate: Especially important if your ileum is involved.\n• Liver function tests: Important if you\'re on certain medications.',
      },
      {
        heading: 'Stool Tests',
        body: 'Fecal Calprotectin is a game-changer for monitoring Crohn\'s. It measures inflammation specifically in your gut.\n\n• Below 150: gut inflammation is well controlled\n• Above 250: usually means active inflammation\n\nIt can help your doctor decide if you need a colonoscopy or if your treatment is working.',
      },
      {
        heading: 'What "Mild," "Moderate," and "Severe" Mean',
        body: '• Remission: Few or no symptoms. You feel mostly normal.\n• Mild-to-moderate: You can eat and walk around, but you have symptoms.\n• Moderate-to-severe: Symptoms are impacting your daily life.\n• Severe/fulminant: Very sick. May require hospitalization.',
      },
      {
        heading: 'Questions to Ask Your GI Doctor',
        body: '1. Where exactly is my Crohn\'s located?\n2. How severe is my disease right now?\n3. What is the goal of my current treatment?\n4. How will we know if my treatment is working?\n5. How often should I get blood work and stool tests?\n6. When is my next colonoscopy?\n7. Should I be taking any supplements?\n8. Are there any foods I should specifically avoid?\n9. Should I see an IBD-specialized dietitian?\n10. What symptoms should make me call you between appointments?',
      },
    ],
  },
  {
    id: 4,
    title: 'Disease Stages and Progression',
    subtitle: 'How Crohn\'s changes over time and why early treatment matters',
    icon: 'trending-up-outline',
    category: 'basics',
    readTime: '5 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider.',
    citation: 'Based on ACG Clinical Guidelines, Lancet Gastroenterology reviews on Crohn\'s natural history.',
    sections: [
      {
        heading: 'Remission — The Goal',
        body: '• Clinical remission: You feel good. Symptoms are gone or minimal.\n• Endoscopic remission: Your doctor sees healing on colonoscopy — inflammation is actually gone.\n• Deep remission: Both clinical AND endoscopic. The gold standard.\n\nYou can feel fine while inflammation is still silently damaging your intestines. That\'s why monitoring matters.',
      },
      {
        heading: 'How Crohn\'s Can Progress',
        body: 'Inflammatory Stage: Active inflammation. This is where treatment is most effective.\n\nStricturing Disease: Chronic inflammation causes scarring that narrows the intestinal passageway. May need dilation or surgery.\n\nFistulizing Disease: Inflammation burrows through the bowel wall, creating abnormal tunnels. Often requires biologics and surgery.\n\nWithin 10 years of diagnosis, about 50% of patients will develop stricturing or fistulizing disease if inflammation isn\'t controlled.',
      },
      {
        heading: 'Why Early, Aggressive Treatment Matters',
        body: 'The newer "treat-to-target" approach sets a specific goal (usually endoscopic healing), starts effective treatment early, and monitors closely.\n\nBiologics used early can prevent progression. Patients who achieve deep remission early have better long-term outcomes.\n\n• Take your medications consistently, even when you feel good\n• Don\'t skip monitoring appointments\n• Track your symptoms so your doctor has real data\n• Ask: "Am I in endoscopic remission, or just clinical remission?"',
      },
    ],
  },
  {
    id: 5,
    title: 'Life After Bowel Resection',
    subtitle: 'What changed in your body and what to expect going forward',
    icon: 'fitness-outline',
    category: 'basics',
    readTime: '7 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider.',
    citation: 'Based on Crohn\'s & Colitis Foundation surgical nutrition guidelines, ESPEN guidelines for IBD (2023).',
    sections: [
      {
        heading: 'What Happened During Surgery',
        body: 'In a bowel resection, a surgeon removed a section of your intestine that was too damaged by Crohn\'s. The healthy ends were then reconnected (anastomosis).\n\nThe most common is an ileocecal resection — removing the last part of your small intestine (ileum) and the first part of your large intestine (cecum), along with the ileocecal valve.',
      },
      {
        heading: 'If Your Ileum Was Removed',
        body: '• B12 absorption is reduced — the ileum is the ONLY place your body absorbs B12. You\'ll likely need supplements or injections for life.\n\n• Bile acid absorption is disrupted — excess bile acids cause watery diarrhea (bile acid malabsorption).\n\n• Fat absorption may be reduced — can lead to fatty stools, diarrhea after high-fat meals, and fat-soluble vitamin deficiencies (A, D, E, K).\n\n• Kidney stone risk increases.',
      },
      {
        heading: 'If Your Ileocecal Valve or Colon Was Removed',
        body: 'Without the ileocecal valve:\n• Faster transit time — food moves through faster, less time to absorb nutrients\n• Possible bacterial overgrowth (SIBO)\n\nWithout part of your colon:\n• More frequent bowel movements — less water absorption\n• Electrolyte imbalances — may need more intentional electrolyte intake',
      },
      {
        heading: 'Will I Need Surgery Again?',
        body: 'About 50% of patients who have surgery will need another within 10 years IF not on preventive medication. With modern biologics started after surgery, recurrence drops significantly.\n\nColonoscopy at 6-12 months after surgery is standard. Stay on preventive medication and monitor closely.',
      },
      {
        heading: 'Emotional Recovery',
        body: 'Nobody talks about this enough. It\'s completely normal to feel:\n\n• Grief — for your old normal\n• Anxiety — about complications and recurrence\n• Relief — if you were very sick before\n• Frustration — at the restrictions\n• Isolation — feeling like nobody understands\n\nAll of these feelings are valid. If you\'re struggling, talk to someone — a therapist, a support group, or this app\'s community. You are not alone.',
      },
    ],
  },
  {
    id: 6,
    title: 'Understanding Your Medications',
    subtitle: 'What each medication does and why adherence matters',
    icon: 'medical-outline',
    category: 'treatment',
    readTime: '7 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider before making changes to your medication.',
    citation: 'Based on ACG Clinical Guidelines for Crohn\'s Disease, Crohn\'s & Colitis Foundation medication guides, and FDA prescribing information.',
    sections: [
      {
        heading: 'The Big Picture',
        body: 'Crohn\'s medications fall into two categories:\n\n1. Induction therapy — to get a flare under control (put out the fire)\n2. Maintenance therapy — to keep you in remission (prevent the fire from coming back)\n\nYour doctor chooses based on severity, location, and your history.',
      },
      {
        heading: 'Aminosalicylates & Corticosteroids',
        body: 'Aminosalicylates (5-ASAs) like Mesalamine and Sulfasalazine are anti-inflammatory drugs for mild Crohn\'s, particularly in the colon. Sulfasalazine can deplete folate.\n\nCorticosteroids like Prednisone and Budesonide are powerful but meant for short-term flare control. They have significant side effects with long-term use and deplete calcium, vitamin D, and potassium.',
      },
      {
        heading: 'Immunomodulators',
        body: 'Azathioprine, 6-MP, and Methotrexate suppress your immune system more broadly. They take 2-3 months to reach full effect but are effective for maintenance.\n\nThese require regular blood monitoring. After bowel resection, injectable methotrexate may be preferred over oral since absorption can be unpredictable.',
      },
      {
        heading: 'Biologics',
        body: 'The biggest treatment advances:\n\n• TNF Inhibitors: Infliximab (Remicade), Adalimumab (Humira), Certolizumab (Cimzia) — longest track record\n\n• Integrin Inhibitors: Vedolizumab (Entyvio) — gut-selective, fewer body-wide side effects\n\n• IL-12/23 Inhibitors: Ustekinumab (Stelara), Risankizumab (Skyrizi) — very strong results\n\n• IL-23 Inhibitors: Mirikizumab (Omvoh), Guselkumab (Tremfya) — newest options (2025)\n\n• JAK Inhibitors: Upadacitinib (Rinvoq) — oral pill, works fast',
      },
      {
        heading: 'Why Adherence Matters',
        body: 'Crohn\'s medications only work if you take them. Skipping doses is one of the most common triggers for flares and disease progression.\n\nMany medications prevent inflammation you can\'t feel yet. Stopping often leads to a flare, and sometimes the medication doesn\'t work as well when you restart (especially biologics — your body can develop antibodies).\n\nThis app helps with medication reminders so you never accidentally miss a dose.',
      },
    ],
  },
  {
    id: 7,
    title: 'Nutrition Basics for Crohn\'s',
    subtitle: 'Finding YOUR trigger foods and dietary approaches',
    icon: 'restaurant-outline',
    category: 'nutrition',
    readTime: '8 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider or a registered dietitian.',
    citation: 'Based on ACG clinical guidelines, CDED clinical trials (Levine et al., Lancet Gastroenterology 2019), Monash University FODMAP research, and ESPEN nutrition guidelines for IBD.',
    sections: [
      {
        heading: 'There Is No Single "Crohn\'s Diet"',
        body: 'Anyone who tells you there\'s one diet that works for every Crohn\'s patient is oversimplifying. What triggers a flare in one person may be perfectly fine for another.\n\nThe only way to figure out YOUR triggers is to track what you eat and how you feel. Over time, patterns emerge.',
      },
      {
        heading: 'Dietary Approaches',
        body: 'Low-FODMAP Diet: Temporarily removes poorly absorbed carbohydrates. Strong evidence for reducing IBS-like symptoms but doesn\'t reduce inflammation.\n\nCrohn\'s Disease Exclusion Diet (CDED): Has the strongest evidence for actually reducing inflammation in Crohn\'s.\n\nSpecific Carbohydrate Diet (SCD): Eliminates complex carbs. Some evidence but very restrictive.\n\nMediterranean Diet: Anti-inflammatory, sustainable. Many IBD dietitians recommend it for maintenance.',
      },
      {
        heading: 'The Fiber Debate',
        body: '• Soluble fiber (oats, bananas, cooked carrots) dissolves in water and forms a gel. Most patients tolerate it well.\n\n• Insoluble fiber (wheat bran, raw vegetables, skins, seeds) doesn\'t dissolve. Can be irritating during flares or with strictures.\n\nIn remission, gradually increase fiber — especially soluble. During a flare, reduce fiber, particularly insoluble.',
      },
      {
        heading: 'Eating During a Flare vs. Remission',
        body: 'During a flare: Low-residue foods, well-cooked vegetables, white rice, lean proteins, small frequent meals, extra fluids.\n\nDuring remission: Gradually expand your diet, experiment one food at a time, prioritize anti-inflammatory foods, include more fiber, focus on nutrient-dense foods.',
      },
      {
        heading: 'The Psychology of Food Fear',
        body: 'After a bad flare, it\'s natural to develop anxiety around food. Some patients restrict so severely they become malnourished — from fear, not from Crohn\'s.\n\nRemember:\n• Not every stomach ache is a flare\n• Your safe food list will grow over time\n• Eating too little is its own health risk\n• Tracking food and symptoms puts you in control\n\nYou deserve to enjoy food. It might take time, but it\'s possible.',
      },
    ],
  },
  {
    id: 8,
    title: 'The Low-FODMAP Diet Explained',
    subtitle: 'What FODMAPs are and how to use elimination effectively',
    icon: 'leaf-outline',
    category: 'nutrition',
    readTime: '7 min',
    disclaimer: 'This information is for educational purposes only. Always consult a FODMAP-trained dietitian.',
    citation: 'Based on Monash University FODMAP research, King\'s College London diet studies, and Cox et al. (2020) randomized trial on FODMAP diet in IBD.',
    sections: [
      {
        heading: 'What Are FODMAPs?',
        body: 'FODMAP stands for Fermentable Oligosaccharides, Disaccharides, Monosaccharides, And Polyols. These are short-chain carbohydrates that are poorly absorbed in your small intestine.\n\nIn plain English: certain sugars and fibers in food aren\'t absorbed well. They end up in your colon where bacteria ferment them and produce gas. Your gut overreacts.',
      },
      {
        heading: 'The Five FODMAP Groups',
        body: '• Fructose (excess): Apples, pears, honey, agave, high-fructose corn syrup, mango\n\n• Lactose: Milk, soft cheese, yogurt, ice cream\n\n• Fructans: Wheat, onions, garlic, artichokes, inulin/chicory root\n\n• GOS: Beans, lentils, chickpeas, soybeans\n\n• Polyols: Sorbitol, mannitol, xylitol (in stone fruits, mushrooms, sugar-free products)\n\nIt\'s not usually ALL FODMAPs that bother you. You might be fine with lactose but react badly to fructans.',
      },
      {
        heading: 'The Three Phases',
        body: 'Phase 1 — Elimination (2-6 weeks): Remove all high-FODMAP foods. This isn\'t permanent — it\'s a diagnostic tool.\n\nPhase 2 — Reintroduction (6-8 weeks): Test one FODMAP group at a time systematically.\n\nPhase 3 — Personalization (ongoing): Build YOUR personalized diet based on what you learned.\n\nMost people end up with a diet much less restrictive than the elimination phase.',
      },
      {
        heading: 'FODMAP Stacking & Common Mistakes',
        body: 'Even low-FODMAP foods can cause problems when you eat several in one meal. Watch your total FODMAP load per meal.\n\nCommon mistakes:\n• Staying on elimination forever (harms gut bacteria)\n• Ignoring serving sizes\n• Forgetting about garlic and onion (they\'re in EVERYTHING)\n• Not testing enough foods in reintroduction\n• Confusing FODMAP sensitivity with Crohn\'s inflammation',
      },
    ],
  },
  {
    id: 9,
    title: 'Mental Health and Crohn\'s',
    subtitle: 'The gut-brain connection, anxiety, depression, and coping',
    icon: 'heart-outline',
    category: 'lifestyle',
    readTime: '7 min',
    disclaimer: 'This information is for educational purposes only. If you are in crisis, contact the 988 Suicide & Crisis Lifeline by calling or texting 988.',
    citation: 'Based on Journal of Crohn\'s and Colitis, Gastroenterology & Hepatology psychology reviews, and Crohn\'s & Colitis Foundation mental health resources.',
    sections: [
      {
        heading: 'The Gut-Brain Connection Is Real',
        body: 'Your gut has its own nervous system with over 100 million nerve cells. It communicates constantly with your brain through the vagus nerve, hormones, and immune signals.\n\nWhen your gut is inflamed, it sends distress signals to your brain. When your brain is stressed, it affects gut function. It\'s a two-way street.\n\nYour mental health and your Crohn\'s are not separate issues — they\'re connected.',
      },
      {
        heading: 'Anxiety and Crohn\'s',
        body: 'Living with Crohn\'s gives you plenty to be anxious about. Will I make it to the bathroom? What if I flare at work? Can I eat this?\n\nThis anxiety is a rational response to a genuinely unpredictable disease. You\'re not being dramatic.\n\nBut when anxiety becomes constant and interferes with daily life, it may be time to get support.',
      },
      {
        heading: 'Depression and IBD',
        body: 'Depression is 2-3x more common in people with IBD. This isn\'t weakness. It\'s a combination of:\n\n• Biological factors — chronic inflammation directly affects brain chemistry\n• Burden of chronic illness — managing everything is exhausting\n• Social isolation — urgency and fatigue make socializing hard\n• Body image — surgery scars, weight changes, medication side effects\n• Loss of identity — "I used to be able to do everything"',
      },
      {
        heading: 'Practical Coping Strategies',
        body: 'For anxiety: Plan don\'t avoid, breathing exercises (4-7-8 technique), cognitive behavioral therapy (CBT).\n\nFor depression: Movement (even gentle), connection with others, routine, and medication if needed.\n\nFor stress: Mindfulness, sleep hygiene, setting boundaries, tracking stress alongside symptoms.\n\nConsider professional help if anxiety or sadness is present most days for 2+ weeks, or if you\'re avoiding activities you used to enjoy.',
      },
      {
        heading: 'You Are Not Your Disease',
        body: 'Crohn\'s is something you have. It is not who you are. You are a person living with a challenging condition, and the fact that you\'re here — reading this, trying to manage your health — shows strength.\n\nBad days don\'t erase good days. Flares don\'t mean failure. Needing help isn\'t weakness.',
      },
    ],
  },
  {
    id: 10,
    title: 'When to Call Your Doctor',
    subtitle: 'Red flags, flare signs, and when to go to the ER',
    icon: 'warning-outline',
    category: 'lifestyle',
    readTime: '5 min',
    disclaimer: 'This information is for educational purposes only. When in doubt, call your doctor.',
    citation: 'Based on Crohn\'s & Colitis Foundation patient education, emergency medicine guidelines, and IBD clinical practice.',
    sections: [
      {
        heading: 'Red Flag Symptoms — Call Today',
        body: '• Fever over 101°F (38.3°C) — especially on immunosuppressants\n• Severe abdominal pain that\'s different from your usual\n• Bloody stool that\'s more than your baseline\n• Can\'t keep fluids down for more than 24 hours\n• Signs of dehydration — dark urine, dizziness, dry mouth\n• New lump or mass in your abdomen\n• Pus or drainage from perianal area or surgical site\n• Night sweats combined with other symptoms',
      },
      {
        heading: 'Signs of a Flare Starting',
        body: 'Contact your doctor if these persist for more than 3-5 days:\n\n• Diarrhea increasing beyond baseline\n• Cramping or pain returning after feeling good\n• Fatigue that\'s worse than usual\n• Loss of appetite or unintentional weight loss\n• Waking at night with urgency or pain\n• Blood in stool when you normally don\'t have it\n• Mouth sores or increasing joint pain\n\nCatching a flare early gives you more treatment options.',
      },
      {
        heading: 'Signs of Bowel Obstruction — May Need ER',
        body: '• Severe cramping pain that comes in waves\n• Complete inability to pass stool or gas\n• Vomiting, especially if dark green or fecal-smelling\n• Progressively worsening abdominal distension\n• No bowel sounds (silent abdomen)',
      },
      {
        heading: 'ER vs. Doctor\'s Office',
        body: 'Go to the ER: Severe uncontrolled pain, signs of obstruction, heavy rectal bleeding, high fever with chills on immunosuppressants, signs of severe dehydration.\n\nCall the office: Moderate symptom increase lasting 3+ days, low-grade fever, questions about medication adjustment, new concerning but non-severe symptoms.',
      },
      {
        heading: 'What to Tell Your Doctor When You Call',
        body: '1. "My name is ___. I have Crohn\'s and I\'m calling because ___"\n2. "My symptoms started ___ days ago"\n3. "Currently I\'m having: [specific symptoms]"\n4. "This is different/similar to my usual because ___"\n5. "My current medications are: ___"\n6. "My last blood work / calprotectin was on [date]"\n7. "My last colonoscopy was on [date]"\n8. "I have/have not had surgery. Most recent: [date and type]"',
      },
    ],
  },
  {
    id: 11,
    title: 'Navigating Daily Life',
    subtitle: 'Bathroom planning, travel, eating out, work, and exercise',
    icon: 'walk-outline',
    category: 'lifestyle',
    readTime: '8 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider.',
    citation: 'Based on Crohn\'s & Colitis Foundation daily living resources and ADA workplace accommodation guidelines.',
    sections: [
      {
        heading: 'Bathroom Anxiety and Planning',
        body: '• Scout ahead — check where bathrooms are before going somewhere new\n• Carry an emergency kit: wet wipes, change of underwear, plastic bag, hand sanitizer, odor spray\n• Request aisle seats on planes, at events, in restaurants\n• Talk to trusted people — "I might need to leave suddenly, it\'s a medical thing"',
      },
      {
        heading: 'Travel Tips',
        body: '• Carry medications in your carry-on — never check them\n• Get a doctor\'s letter for injectable medications\n• Research healthcare options at your destination\n• Stick to safe foods when traveling\n• Consider travel insurance that covers pre-existing conditions\n• Plan for time zone changes with medications',
      },
      {
        heading: 'Eating Out',
        body: '• Look at the menu online first and identify 2-3 safe options\n• Don\'t be afraid to ask for modifications\n• Simple preparations are safest: grilled chicken, steamed vegetables, plain rice\n• Avoid buffets (cross-contamination)\n• Eat smaller portions — take the rest home',
      },
      {
        heading: 'Work and Disclosure',
        body: 'Whether to tell your employer is personal.\n\nFor disclosure: Legal ADA protection, ability to request accommodations, less stress from hiding.\n\nAgainst: Stigma, not all managers are understanding.\n\nMiddle ground: Disclose to HR and your direct manager without telling everyone. You control the narrative.',
      },
      {
        heading: 'Exercise',
        body: 'Exercise reduces inflammation, improves mood, strengthens bones, and reduces fatigue.\n\nIn remission: Most exercise is safe — walking, swimming, cycling, yoga, strength training.\n\nDuring a flare: Gentle movement only. Walking and stretching.\n\nAfter surgery: Follow your surgeon\'s guidance. Usually walking early, then gradual increase over 6-8 weeks.',
      },
    ],
  },
  {
    id: 12,
    title: 'Understanding Lab Results',
    subtitle: 'What your blood work and stool tests actually mean',
    icon: 'analytics-outline',
    category: 'advanced',
    readTime: '8 min',
    disclaimer: 'This information is for educational purposes only. Always discuss your lab results with your healthcare provider.',
    citation: 'Based on ACG clinical guidelines, ECCO laboratory monitoring recommendations, and IBD nutritional assessment literature.',
    sections: [
      {
        heading: 'Inflammation Markers',
        body: 'CRP (C-Reactive Protein): Measures inflammation anywhere in body. Normal: <5 mg/L. Track YOUR baseline over time.\n\nESR: Another general inflammation marker. Changes more slowly than CRP.\n\nFecal Calprotectin: The most important IBD monitoring test. Specific to your GUT.\n• Below 50: Very low (likely remission)\n• 50-150: Mild elevation\n• 150-250: Moderate — suggests active inflammation\n• Above 250: High — likely active disease',
      },
      {
        heading: 'Blood Count (CBC)',
        body: '• Hemoglobin/Hematocrit: Low = anemia. Very common in Crohn\'s.\n• White blood cells: High can mean infection. Low can occur with certain medications.\n• Platelets: Usually high during active inflammation.',
      },
      {
        heading: 'Nutritional Markers',
        body: '• Ferritin: Iron stores. Below 30 is deficient in IBD patients. IV iron is an option if oral upsets your stomach.\n\n• Vitamin B12: Normal 200-900 pg/mL. Critical after ileal resection. Test every 3-6 months first year.\n\n• Folate: Above 4 ng/mL. Methotrexate and sulfasalazine deplete it.\n\n• Vitamin D: 30-100 ng/mL. Up to 70% of Crohn\'s patients are deficient.\n\n• Albumin: 3.5-5.0 g/dL. Reflects overall nutritional status.',
      },
      {
        heading: 'Why Trends Matter More Than Single Numbers',
        body: 'A single lab result is a snapshot. What matters is direction:\n\n• CRP going 2 → 8 → 15 tells a story of increasing inflammation\n• Ferritin going 15 → 25 → 40 shows improving iron stores\n• Calprotectin going 300 → 150 → 80 shows treatment working\n\nLog lab values in this app and bring the charts to your doctor.',
      },
    ],
  },
  {
    id: 13,
    title: 'Crohn\'s and Pregnancy',
    subtitle: 'Planning, medication safety, and nutritional needs',
    icon: 'rose-outline',
    category: 'advanced',
    readTime: '6 min',
    disclaimer: 'This information is for educational purposes only. Always work closely with both your GI doctor and OB/GYN.',
    citation: 'Based on ECCO consensus statements on reproduction in IBD, ACG clinical guidelines, and Toronto consensus guidelines.',
    sections: [
      {
        heading: 'The Most Important Step',
        body: 'Get your Crohn\'s into remission BEFORE becoming pregnant. Women who conceive during remission are much more likely to stay in remission throughout pregnancy.\n\nTalk to your GI about pregnancy planning — optimize medications, switch off anything unsafe, and make sure nutritional stores are adequate.',
      },
      {
        heading: 'Which Medications Are Safe?',
        body: 'Generally safe during pregnancy:\n• Aminosalicylates (extra folic acid with sulfasalazine)\n• Corticosteroids (lowest effective dose)\n• Most biologics (growing safety data)\n• Azathioprine / 6-MP\n\nMust be stopped before pregnancy:\n• Methotrexate — at least 3-6 months before. Applies to BOTH women AND men.\n• JAK inhibitors (Rinvoq, Xeljanz)\n\nImportant: Uncontrolled Crohn\'s is almost always more dangerous to the baby than the medications.',
      },
      {
        heading: 'Nutritional Needs & Delivery',
        body: 'Extra needs during pregnancy with Crohn\'s:\n• Folic acid: 1 mg daily (higher than standard)\n• Iron: Monitor closely\n• B12: Monitor each trimester if ileal resection\n• Vitamin D: 2000-4000 IU daily\n• Calcium: 1000 mg daily\n• DHA/Omega-3: 200-300 mg daily\n\nMost women can deliver vaginally. C-section may be recommended with active perianal disease.',
      },
    ],
  },
  {
    id: 14,
    title: 'New Research & Emerging Treatments',
    subtitle: 'What\'s on the frontier of Crohn\'s treatment',
    icon: 'rocket-outline',
    category: 'advanced',
    readTime: '7 min',
    disclaimer: 'This information is for educational purposes only. Always consult your healthcare provider about treatment options.',
    citation: 'Based on recent publications in Gastroenterology, Lancet Gastroenterology & Hepatology, and FDA approval announcements through 2026.',
    sections: [
      {
        heading: 'New Medications',
        body: 'IL-23 Inhibitors: Risankizumab (Skyrizi), Guselkumab (Tremfya), Mirikizumab (Omvoh) — very effective with favorable safety profiles. Becoming first-line biologic options.\n\nJAK Inhibitors: Upadacitinib (Rinvoq) — the first oral advanced therapy for Crohn\'s. Pills instead of injections.\n\nBiosimilars: Multiple biosimilars driving prices down and improving access. Seven ustekinumab biosimilars launched in the US in 2025 alone.',
      },
      {
        heading: 'The Microbiome Frontier',
        body: 'Fecal Microbiota Transplant (FMT): Strong for C. difficile, mixed for Crohn\'s directly. Research ongoing.\n\nDesigner Probiotics: Specific combinations of beneficial strains that can be manufactured consistently. Several in clinical trials.\n\nPhage Therapy: Using viruses that attack specific harmful bacteria while leaving beneficial ones. Very early stage but fascinating.',
      },
      {
        heading: 'Diet as Treatment & Personalized Medicine',
        body: 'CDED (Crohn\'s Disease Exclusion Diet): Clinical trials show it can induce remission. One of the first times a dietary intervention has shown measurable reduction in inflammation markers.\n\nPharmacogenomics: Genetic testing to predict which medications will work best for YOU.\n\nBiomarker-Guided Treatment: Blood tests and genetic panels that predict which biologic class is most likely to work. Could save months of failed treatments.',
      },
      {
        heading: 'How to Evaluate New Research',
        body: 'Not every headline means a breakthrough:\n\n1. Where was it published? Peer-reviewed journals are more reliable.\n2. How many patients? 10 is interesting, 1,000 is meaningful.\n3. Was it randomized and controlled? Gold standard.\n4. Was it in humans? "Cured in mice" is very different.\n5. Who funded it?',
      },
    ],
  },
  {
    id: 16,
    title: 'Cannabis and Crohn\'s Disease',
    subtitle: 'THC, CBD, what the research actually shows, and how to talk to your doctor',
    icon: 'leaf-outline',
    category: 'complementary',
    readTime: '9 min',
    disclaimer: 'Cannabis is a drug with real effects and real risks. This information is for education only. Cannabis is federally illegal in the US (Schedule I as of 2026), and state medical programs vary. Always talk to your gastroenterologist before starting any cannabinoid, and never stop a prescribed medication on your own.',
    citation: 'Based on Naftali et al. 2013 (PMID 23648372), 2017 (PMID 28349233), 2021 (PMID 33858011); Irving et al. 2018 (PMID 29538683); Kafil et al. Cochrane 2018 (PMID 30407616); Storr et al. 2014 (PMID 24407485); and endocannabinoid system research from D\'Argenio 2006 and Wright 2005. See knowledge/22-cannabis-and-crohns.md for full citations.',
    sections: [
      {
        heading: 'The Honest Bottom Line',
        body: 'The research on cannabis for Crohn\'s is mixed, and the honest summary is this:\n\n• Cannabis can make you FEEL better — less pain, less nausea, better appetite, better sleep. This part is real.\n\n• Cannabis has NOT been shown to reduce the underlying inflammation of Crohn\'s in any rigorous clinical trial. CRP, fecal calprotectin, and endoscopic scores haven\'t consistently improved.\n\n• The difference between "feeling better" and "disease getting better" matters. You can feel fine while inflammation is still damaging your bowel. Cannabis is NOT a substitute for your actual Crohn\'s treatment.\n\nUsed thoughtfully alongside real treatment, it may help quality of life. Used as a replacement for medication, it can let damage progress silently.',
      },
      {
        heading: 'What Cannabis Actually Is',
        body: 'Cannabis contains over 100 compounds called cannabinoids. The two you hear about most:\n\n• THC (tetrahydrocannabinol) — the compound that makes you feel "high." It affects pain, nausea, appetite, sleep, and mood. It can also cause anxiety, paranoia, and impairment.\n\n• CBD (cannabidiol) — doesn\'t make you high. It\'s being studied for anxiety, sleep, seizures, and inflammation. Available over-the-counter in many places as hemp-derived CBD (under 0.3% THC).\n\nThere are also minor cannabinoids (CBG, CBN) and terpenes (aromatic compounds) that contribute to the overall effect.\n\nProducts come in many forms: smoked or vaporized flower, edibles, tinctures, oils, capsules, topicals.',
      },
      {
        heading: 'What the Research Shows — Clinical Response vs. Remission',
        body: 'The Israeli researcher Timna Naftali has run the most important trials:\n\n• 2013 trial: 21 Crohn\'s patients got THC-rich cannabis or placebo for 8 weeks. 10 of 11 on cannabis had clinical response (CDAI dropped >100) vs 4 of 10 on placebo. Patients FELT dramatically better. BUT the formal remission target (CDAI under 150) was not statistically reached.\n\n• 2017 trial (CBD-only): Low-dose CBD oil in Crohn\'s patients. This trial was NEGATIVE. No significant difference from placebo. This was a key finding — CBD alone, at the dose tested, didn\'t work.\n\n• 2021 trial: Oral cannabis oil for 8 weeks. Patients reported feeling better, quality of life improved. Endoscopic healing did NOT improve.\n\nThe pattern across trials: symptoms improve; inflammation markers don\'t consistently change.',
      },
      {
        heading: 'Why It Might Help Symptoms (The Endocannabinoid System)',
        body: 'Your body has its own cannabinoid system — called the endocannabinoid system (ECS). You have CB1 and CB2 receptors all over your gut: in the nerve plexus that controls motility, in the immune cells of the intestinal wall, in the enteric nervous system.\n\nThis system helps regulate:\n• Gut motility (how fast food moves through)\n• Pain signaling from the intestines\n• Immune response and inflammation\n• Nausea reflex\n\nThat\'s why plant cannabinoids can affect Crohn\'s symptoms — they\'re essentially turning dials on a system your body already uses. The question is whether that dial-turning also reduces the underlying disease, and so far the evidence says mostly no.',
      },
      {
        heading: 'Cannabis Hyperemesis Syndrome — A Red Flag to Know',
        body: 'Important and often missed: cannabis hyperemesis syndrome (CHS) can look exactly like a Crohn\'s flare.\n\nCHS develops in some long-term heavy cannabis users. Symptoms:\n• Severe cyclical vomiting\n• Abdominal pain\n• Nausea that doesn\'t respond to anti-nausea medications\n• Relief from hot showers (the telltale sign)\n\nPatients with Crohn\'s who also use cannabis regularly need to know this can happen. If you\'re vomiting uncontrollably and your Crohn\'s treatment seems to have stopped working, cannabis-induced CHS is on the differential diagnosis — not just a flare.\n\nTreatment is stopping cannabis. Not easy, but symptoms resolve within days to weeks.',
      },
      {
        heading: 'Drug Interactions — Important if You\'re on Crohn\'s Medications',
        body: 'Both THC and CBD are processed by the same liver enzymes that break down many Crohn\'s medications. This matters:\n\n• CBD can raise blood levels of tofacitinib (Xeljanz) and upadacitinib (Rinvoq) — the JAK inhibitors.\n\n• CBD has documented interactions with cyclosporine, tacrolimus, and warfarin — levels can rise significantly.\n\n• Methotrexate: unclear interaction; both are processed by overlapping pathways.\n\n• Biologics (Humira, Remicade, Stelara, Skyrizi, Entyvio): no major metabolic interaction documented — they don\'t go through the same liver pathway.\n\n• Corticosteroids (prednisone): no direct interaction, but prednisone + THC together can worsen mood/cognitive effects.\n\nBottom line: tell your GI about cannabis use. Don\'t assume it\'s harmless because it\'s "natural."',
      },
      {
        heading: 'When Cannabis Is NOT Appropriate',
        body: 'Cannabis is not right for everyone, and in some cases it can cause harm:\n\n• If you have a history of psychosis, schizophrenia, or strong family history of either — THC can trigger or worsen these conditions.\n\n• During pregnancy or breastfeeding — clearly contraindicated.\n\n• If you have severe cardiovascular disease — THC can trigger tachycardia and increase cardiac events.\n\n• If you have an active cannabis use disorder or are in recovery from substance use.\n\n• If you\'re a driver, pilot, or in a safety-sensitive profession — impairment matters.\n\n• Adolescents and young adults (under 25) — developing brain concerns, higher risk of persistent cognitive effects.\n\n• If you\'re using it to avoid conventional Crohn\'s treatment. This is the most dangerous scenario — inflammation damage is silent.',
      },
      {
        heading: 'How People Actually Use It',
        body: 'The research-backed options in rough order of evidence:\n\n• Oral oil or capsules (slow onset 1-2 hours, lasts 6-8 hours) — the Naftali trials used this route. More predictable dosing.\n\n• Vaporized flower (fast onset, 2-3 hours duration) — avoids combustion toxins. Common for breakthrough symptoms.\n\n• Smoked flower — fastest onset but introduces tar and combustion toxins. Not recommended if you have any lung issues.\n\n• Edibles — delayed and long-lasting, harder to dose precisely. Easy to take too much.\n\n• Topicals — for joint pain (extraintestinal arthritis). Minimal systemic absorption.\n\nStart low, go slow. Typical starting dose if using CBD: 10-15 mg/day. THC: 2.5 mg (microdose). Titrate up over 1-2 weeks if tolerated.',
      },
      {
        heading: 'Legal Landscape (US, 2026)',
        body: 'This is complicated and changing:\n\n• Federal law: cannabis is still Schedule I (illegal) as of 2026. The DEA\'s rescheduling process has been ongoing; status uncertain.\n\n• State medical cannabis: most US states have some form of medical program. Qualifying conditions vary — many states include IBD or Crohn\'s specifically.\n\n• Recreational legalization: about 24 states have adult-use recreational programs.\n\n• Hemp-derived CBD: legal federally under the 2018 Farm Bill if under 0.3% THC. Available in most stores.\n\n• Workplace: many employers still drug-test. Even medical cards don\'t always protect employment. Federal employees are almost universally prohibited.\n\n• Driving: impaired driving laws apply regardless of state legality.\n\nCheck your specific state\'s rules before acting.',
      },
      {
        heading: 'Questions to Ask Your Doctor',
        body: 'Take these to your next GI appointment:\n\n1. "Does cannabis interact with my current medications?" — especially if you\'re on JAK inhibitors or immunosuppressants.\n\n2. "I want to use this for sleep/pain/nausea — do you see concerns?" — frame it around specific symptoms, not as "I want to treat my Crohn\'s with it."\n\n3. "Would you be willing to document my cannabis use in my chart?" — avoids surprises during hospitalizations or surgery.\n\n4. "Do you want me to monitor anything differently?" — liver enzymes if using CBD long-term, for example.\n\n5. "Are there any signs that should make me stop?" — vomiting pattern, mood changes, cognitive concerns.\n\nSome GIs are comfortable with this conversation, some aren\'t. If yours isn\'t, that\'s information — consider finding one who will engage honestly.',
      },
      {
        heading: 'The Bottom Line',
        body: 'Cannabis is a real tool with real benefits and real risks for people with Crohn\'s.\n\nWhat we can say: It reliably helps many patients FEEL better — pain, nausea, appetite, sleep.\n\nWhat we can\'t say: That it treats Crohn\'s disease itself. Current evidence says symptoms get better while inflammation may not.\n\nThe smart use: alongside your real Crohn\'s treatment, in communication with your doctor, with awareness of drug interactions, and with honest self-monitoring.\n\nThe dangerous use: as a substitute for medication, without telling your GI, at high daily doses that risk CHS or dependency.\n\nYou\'re an adult making choices about your body. Make them informed.',
      },
    ],
  },
  {
    id: 17,
    title: 'Smoking and Crohn\'s — The Single Biggest Thing You Can Change',
    subtitle: 'Why quitting matters more than almost any other lifestyle change you can make',
    icon: 'warning-outline',
    category: 'lifestyle',
    readTime: '6 min',
    disclaimer: 'This information is educational and does not replace conversations with your doctor. Smoking cessation medications may interact with Crohn\'s treatments — discuss with your healthcare team before starting any quit aid.',
    citation: 'Based on Mahid et al. 2006 meta-analysis (PMID 17120402), Cosnes et al. 2001 cessation intervention (PMID 11266373), Birrenbach 2022 e-cigarette study (PMID 35579793), and systematic reviews in Gastroenterology and Clinical Gastroenterology and Hepatology.',
    sections: [
      {
        heading: 'The Number That Should Stop You Cold',
        body: 'Smoking DOUBLES your risk of developing Crohn\'s disease. And if you already have it, smoking makes everything worse — more flares, more surgeries, more medication failures, more fistulas, more strictures.\n\nThis is the OPPOSITE of ulcerative colitis, where smoking is actually mildly protective. So if someone tells you "smoking helps IBD," they\'re thinking of UC, not Crohn\'s.\n\nThe evidence here is as close to settled as it gets in Crohn\'s research. Multiple meta-analyses across decades show the same answer: smoking is the single biggest modifiable risk factor for Crohn\'s disease.',
      },
      {
        heading: 'What Smoking Does to Your Crohn\'s',
        body: 'Compared to non-smokers with Crohn\'s, current smokers have:\n\n• About 2x the rate of second-look surgery after intestinal resection.\n• Higher rates of fistulas and perianal complications.\n• More steroid courses and immunosuppressant use.\n• Higher rates of secondary loss of response to biologics like Humira and Remicade — meaning the medications stop working sooner.\n• More flares per year.\n• Faster progression to stricturing disease (narrowed bowel sections).\n\nThis isn\'t moralizing. This is what the data shows across large French cohorts, US registries, and European IBD consortiums.',
      },
      {
        heading: 'The Best News in Crohn\'s Research',
        body: 'Here\'s the part that matters: quitting works — FAST.\n\nCosnes et al. 2001 tracked 474 smokers with Crohn\'s. The 12% who successfully quit for more than a year had a dramatically better disease course compared to those who kept smoking. Within about 12 months of quitting, former smokers\' risk profiles started approaching that of people who never smoked.\n\nRead that again: one year after quitting, your Crohn\'s trajectory can look like someone who never smoked.\n\nThere is no medication that gives this much benefit this fast. No diet. No supplement. Quitting smoking is the biggest lever available to you if you currently smoke.',
      },
      {
        heading: 'What About Vaping / E-Cigarettes?',
        body: 'The honest answer: we don\'t know yet, but don\'t trust it.\n\nA 2022 case-control study (Birrenbach et al.) found that IBD patients who vaped didn\'t do noticeably worse than non-users over two years. But the study was small and short. Meanwhile, lab research shows e-cigarette aerosol damages the intestinal barrier and triggers inflammation — even in nicotine-free versions.\n\nBottom line: vaping is NOT an approved harm-reduction tool for Crohn\'s. If you\'re using it to quit cigarettes, fine — but treat it as a temporary bridge, not a long-term substitute. Aim to get off both.',
      },
      {
        heading: 'Cannabis Smoke Is Still Smoke',
        body: 'Many Crohn\'s patients use cannabis for symptom relief (see the cannabis article). But COMBUSTION of any plant matter — tobacco, cannabis, whatever — exposes your body to carbon monoxide, free radicals, and combustion toxins.\n\nIf you\'re going to use cannabis for Crohn\'s symptoms, prefer:\n• Oral oils, capsules, or edibles\n• Vaporizers (not combustion)\n\nSmoked cannabis doesn\'t have the same disease-worsening evidence as tobacco, but the combustion effects are real. No reason to add that exposure if alternatives exist.',
      },
      {
        heading: 'How to Actually Quit',
        body: 'The best quit methods have clinical evidence:\n\n• Nicotine replacement therapy (patches, gum, lozenges) — roughly doubles your odds of quitting vs. willpower alone.\n\n• Varenicline (Chantix) — one of the most effective quit medications. Talk to your doctor. It can cause mood side effects, so monitor.\n\n• Bupropion (Zyban / Wellbutrin) — also doubles quit rates, works as a backup if varenicline isn\'t tolerated.\n\n• Behavioral counseling — even a few sessions helps. Your state probably has a free quitline (1-800-QUIT-NOW in the US).\n\n• Combining methods works better than any single method alone.\n\nAvoid the "cold turkey willpower only" approach — it has the lowest success rate (about 3-5%). You\'re fighting biology. Use the tools.',
      },
      {
        heading: 'If You\'re Not Ready to Quit Right Now',
        body: 'No judgment. But two things:\n\n1. Cut down where you can — fewer cigarettes per day is better than more, even if not quitting entirely.\n\n2. Avoid secondhand smoke for your kids if you have them. Childhood household smoke exposure has been linked to increased Crohn\'s risk in later life. This is one of those "break the chain" things.\n\nWhen you ARE ready, the tools above are there. Most smokers try to quit 5-7 times before it sticks. Each attempt teaches you something. Keep trying.',
      },
    ],
  },
  {
    id: 18,
    title: 'NSAIDs and Crohn\'s — Why Ibuprofen Is a Problem',
    subtitle: 'What to take (and avoid) for pain, headaches, and fevers when you have Crohn\'s',
    icon: 'medkit-outline',
    category: 'lifestyle',
    readTime: '5 min',
    disclaimer: 'Always talk to your doctor before stopping or starting a medication, especially if you take daily aspirin for heart protection. This information is educational, not medical advice.',
    citation: 'Based on Moninuola et al. 2018 meta-analysis (PMID 29620794), Kefalakes et al. 2009 systematic review (PMID 19711064), Patel et al. 2020 low-dose aspirin study (PMID 32219391), and ACG clinical guidelines.',
    sections: [
      {
        heading: 'The Short Version',
        body: 'Common over-the-counter pain relievers called NSAIDs — Advil, Aleve, Motrin, the red and blue pills most people reach for — can trigger Crohn\'s flares.\n\nAcetaminophen (Tylenol) is almost always safer for Crohn\'s patients and should be your default go-to for everyday pain.\n\nLow-dose aspirin (81 mg) for heart protection is usually OK — don\'t stop it without talking to your doctor.\n\nHigh-dose aspirin for pain (325 mg or more) behaves like an NSAID and has the same risks.',
      },
      {
        heading: 'What NSAIDs Actually Do',
        body: 'NSAIDs stop your body from making prostaglandins — hormone-like chemicals that protect your gut lining and keep blood flow to your intestines normal.\n\nSound helpful? Problem is, when you\'re trying to heal damaged intestines (like you are with Crohn\'s), you NEED those prostaglandins. Taking them away makes your gut lining more fragile, lets gaps form between cells ("leaky gut"), and can trigger ulcers in the small intestine.\n\nYou can literally see the damage on a capsule endoscopy — little breaks and erosions in the small bowel that weren\'t there before NSAID use.',
      },
      {
        heading: 'Which NSAIDs Cause the Most Trouble',
        body: 'Treat all of these the same way — avoid when possible:\n\n• Ibuprofen — Advil, Motrin, store brands\n• Naproxen — Aleve (has a long half-life, stays in your system)\n• Diclofenac — Voltaren pills (topical gel is different, see below)\n• Aspirin 325 mg or more (regular-strength or extra-strength)\n• Ketorolac (Toradol) — avoid entirely, it\'s a heavy hitter\n• Indomethacin\n\nCelecoxib (Celebrex) is a COX-2 selective NSAID — it\'s generally safer for the stomach than ibuprofen, but the evidence it\'s safer for IBD specifically is limited. If you need something in this class, it\'s the least bad option, but still a conversation with your GI.',
      },
      {
        heading: 'The Safe Default: Acetaminophen',
        body: 'Acetaminophen (Tylenol) works differently — it acts in your brain to reduce pain signals, without depleting your gut prostaglandins.\n\nThe big meta-analyses of painkillers and IBD consistently find no link between acetaminophen and flare risk.\n\nSafety notes:\n• Don\'t exceed 4,000 mg per day (8 extra-strength tablets).\n• Drop to 3,000 mg per day if you\'re older or drink alcohol moderately.\n• If you take methotrexate, both can stress your liver — talk to your doctor about dose limits.\n• If you have liver disease, your limits are lower.\n\nFor 90% of everyday pain situations, acetaminophen is your answer.',
      },
      {
        heading: 'The Aspirin Question',
        body: 'Aspirin is confusing because dose matters a lot:\n\n• 81 mg daily ("baby aspirin") for heart protection — a 2020 study of IBD patients on low-dose aspirin found NO increase in hospitalizations, surgeries, or steroid use. If your cardiologist has you on this, it\'s almost certainly fine to continue.\n\n• 325 mg or higher for pain or fever — treat this like any other NSAID. Avoid.\n\nIF you had a recent stomach ulcer or GI bleed, your GI may want you on a stomach-protecting medication (PPI) alongside the daily aspirin.\n\nNever stop a daily aspirin prescribed for heart or stroke protection without talking to the doctor who prescribed it.',
      },
      {
        heading: 'What to Take for Specific Kinds of Pain',
        body: 'Headache or migraine:\n• First: Tylenol.\n• For migraines: triptans like sumatriptan (Imitrex) — not NSAIDs, generally fine for IBD.\n• Avoid Excedrin — it contains aspirin.\n\nMuscle or joint pain:\n• First: Tylenol + topical NSAID (diclofenac gel or ketoprofen patch — the topical forms don\'t absorb much into your body, so they don\'t hit your gut the way pills do).\n• Physical therapy for chronic issues.\n• If you have IBD-related arthritis, biologics like Humira often help both your gut AND your joints.\n\nNerve pain (shooting, burning, tingling):\n• Gabapentin (Neurontin) or pregabalin (Lyrica) — neither affects Crohn\'s.\n• Duloxetine (Cymbalta) — SSRI class, also helpful for nerve pain.\n\nMenstrual cramps:\n• Tylenol + heat.\n• Magnesium supplementation may help.\n• If these aren\'t enough, talk to your GI about a short-course NSAID vs. alternatives.\n\nPost-surgical pain:\n• Multimodal plan — Tylenol + short-term opioid if needed.\n• Nerve blocks during surgery (your anesthesiologist can discuss).\n• Avoid NSAIDs during the healing window.',
      },
      {
        heading: 'Avoid Chronic Opioids',
        body: 'Opioid pain medications (oxycodone, hydrocodone, tramadol) are sometimes prescribed for Crohn\'s pain — but chronic use is independently linked to worse outcomes in IBD:\n\n• More infections.\n• More hospitalizations.\n• Higher mortality rates.\n• Constipation (which is terrible if you\'re already having stricture issues).\n• Dependency risk.\n\nShort-term after surgery or during a severe flare is different — that\'s appropriate use under medical supervision. But a chronic daily opioid prescription for Crohn\'s pain is a red flag worth discussing with your GI. Usually there\'s a better path.',
      },
      {
        heading: 'The Honest Summary',
        body: 'You probably didn\'t realize ibuprofen was a problem. Most people don\'t. Now you know.\n\n• Default pain choice: acetaminophen.\n• Daily baby aspirin for heart: keep taking it.\n• Occasional single ibuprofen for a one-time situation: probably low-risk.\n• Regular ibuprofen or Aleve use: stop.\n• Topical NSAID gels: fine for joint/muscle pain.\n• Chronic opioids: push back on this with your doctor, explore alternatives.\n\nIf you have pain that doesn\'t respond to Tylenol, it\'s a signal to talk to your GI. Not to escalate to ibuprofen.',
      },
    ],
  },
  {
    id: 19,
    title: 'Curcumin (Turmeric) for Crohn\'s — What the Research Shows',
    subtitle: 'Real RCTs, real doses, real safety warnings — the evidence-based rundown',
    icon: 'leaf-outline',
    category: 'complementary',
    readTime: '8 min',
    disclaimer: 'Turmeric/curcumin has real biological effects — which means it has real side effects and drug interactions. It is now the most common cause of herbal-related liver injury in the US. Do NOT start high-dose curcumin without talking to your doctor, especially if you take blood thinners, have liver concerns, or are on methotrexate or biologics.',
    citation: 'Based on Hanai 2006 (PMID 17101300), Lang 2015 (PMID 25724700), Sugimoto 2020 Theracurmin CD trial (PMID 32412598), Bommelaer 2020 negative post-op trial (PMID 31470175), Likoudis 2022 DILIN hepatotoxicity case series (PMID 36252717), and Shoba 1998 piperine bioavailability (PMID 9619120).',
    sections: [
      {
        heading: 'The Honest Summary',
        body: 'Curcumin (the active compound in turmeric) has real anti-inflammatory effects and real evidence for IBD — but the story has nuance that most supplement websites skip.\n\n• For ulcerative colitis: the evidence is actually decent. Hanai 2006 and Lang 2015 both showed benefit when added to mesalamine.\n\n• For Crohn\'s disease: one good Japanese RCT in 2020 used a bioavailable form (Theracurmin) and showed 40% remission vs 0% placebo. One French RCT in 2020 used regular curcumin to prevent post-surgical recurrence and was NEGATIVE — possibly even slightly worse than placebo for severe recurrence.\n\n• Curcumin is NOT a replacement for biologics, immunosuppressants, or other Crohn\'s medications. Think of it as a possible adjunct, not a primary therapy.\n\n• Turmeric is currently the most common cause of herbal-related liver injury in the US. This is not a scare tactic — it\'s a real, measured concern.',
      },
      {
        heading: 'Why It Might Work',
        body: 'Curcumin does hit several of the same inflammation pathways that Crohn\'s biologics target — just less powerfully:\n\n• It blocks NF-κB, the master inflammation switch that drives your TNF-α, IL-6, and IL-1β output.\n\n• It calms STAT3 and Th17 signaling (the same pathway that Stelara, Skyrizi, and related biologics target).\n\n• It boosts your antioxidant response (Nrf2 pathway).\n\n• It modestly shifts the gut microbiome in some studies.\n\nThis is why it keeps showing up in IBD research — the mechanism is real. The question is whether you can get enough of it into your bloodstream to matter, which is where "bioavailability" becomes important.',
      },
      {
        heading: 'Bioavailability Is Everything',
        body: 'Regular turmeric powder or curcumin capsules are about 1% absorbed. Ninety-nine percent of what you swallow never gets into your blood. That\'s why old studies with low-dose curcumin failed — it wasn\'t the compound, it was the dose getting through.\n\nMost effective forms, in order:\n\n• Theracurmin (nanoparticle) — ~27x better absorption. This was used in the positive Crohn\'s trial.\n\n• Meriva (curcumin + phosphatidylcholine) — ~29x. Good joint-pain evidence.\n\n• Longvida (solid lipid curcumin) — up to 65x for free curcumin.\n\n• Curcumin + piperine (black pepper extract) — ~20x. The classic combo. BUT piperine also affects how you metabolize other drugs — don\'t mix with biologics or anything else on your medication list without checking.\n\n• BCM-95 / Curcugreen — 7-10x.\n\nIf you\'re buying curcumin, look at the label. "1,500 mg turmeric root" with no absorption enhancer is mostly wasted money.',
      },
      {
        heading: 'The Crohn\'s-Specific Evidence',
        body: 'Only TWO properly-controlled Crohn\'s trials exist. Both matter.\n\nTHE POSITIVE ONE — Sugimoto 2020 (Japan):\n• 30 patients with mild-to-moderate Crohn\'s\n• Theracurmin 360 mg/day for 12 weeks\n• Clinical remission: 40% on curcumin vs 0% on placebo\n• Endoscopic remission: 15% vs 0%\n• Anal lesions improved\n• No serious adverse events\n\nTHE NEGATIVE ONE — Bommelaer 2020 (France):\n• 62 patients who had recent Crohn\'s surgery, all on azathioprine\n• Regular curcumin 3 g/day for 6 months\n• Goal: prevent disease coming back at the surgical site\n• Result: 58% had recurrence on curcumin vs 68% on placebo — NOT statistically better\n• Concerning signal: SEVERE recurrence was 55% on curcumin vs 26% on placebo (p=0.034)\n\nWhat this probably means: curcumin may help active mild-moderate Crohn\'s when using a highly bioavailable form. It does NOT reliably prevent post-surgical recurrence. Don\'t use it as your main anti-recurrence strategy after surgery — stick with the azathioprine or biologic your doctor prescribes.',
      },
      {
        heading: 'The Liver Warning — Don\'t Skip This',
        body: 'The Drug-Induced Liver Injury Network (DILIN) published a 2022 case series of 10 people who got serious liver injury from turmeric supplements.\n\n• 5 of 10 were hospitalized.\n• 1 patient died of acute liver failure.\n• 7 of 10 carried a genetic variant called HLA-B*35:01 — but there\'s currently no commercial test to check if YOU have it.\n• 3 of the 7 tested products contained piperine — so the "turmeric + black pepper" combo may actually increase the risk by boosting absorption of liver-toxic compounds.\n• Latency was weeks to months, not immediate.\n\nNIH\'s LiverTox database now lists turmeric as the MOST common herbal cause of liver injury in the US.\n\nWhat to do with this information:\n• Get a baseline liver panel (ALT, AST, alk phos) before starting chronic high-dose curcumin.\n• Recheck at 3 months.\n• STOP IMMEDIATELY if you develop unusual fatigue, yellow skin/eyes, dark urine, or pain in the upper right belly.\n• Tell your doctor you\'re using it. "But it\'s natural" is not a defense against liver damage.',
      },
      {
        heading: 'Drug Interactions',
        body: 'Check your medication list before starting curcumin:\n\n• Warfarin (Coumadin) — curcumin raises INR. Case reports of bleeding. Don\'t combine without close monitoring.\n\n• Aspirin, clopidogrel, DOACs (Eliquis, Xarelto) — additive bleeding risk.\n\n• Methotrexate — both can stress the liver; combining risks compound toxicity.\n\n• Tacrolimus, cyclosporine — curcumin affects the same liver enzymes; levels can shift unpredictably.\n\n• Iron supplements — curcumin binds iron and reduces absorption.\n\n• JAK inhibitors and some biologics — CYP3A4 interactions possible.\n\n• Stop curcumin at least 2 weeks before any scheduled surgery because of bleeding risk.',
      },
      {
        heading: 'If You Want to Try It',
        body: 'A reasonable, reasonably safe approach:\n\n1. Talk to your GI first. Mention every medication on your list.\n\n2. Get a baseline ALT/AST/alk phos if you\'ll be taking it more than a month.\n\n3. Start with a bioavailability-enhanced form (Theracurmin 360 mg/day, Meriva 500-1000 mg twice daily, or Longvida as directed). If using standard curcumin + piperine, 2 g/day is the studied dose — but piperine warning applies.\n\n4. Buy from a reputable, third-party-tested brand (NSF, USP, or ConsumerLab verified). The supplement industry is famously sloppy with actual content.\n\n5. Recheck liver panel at 3 months.\n\n6. Stop if you notice any of the red flags above, OR if your GI symptoms aren\'t improving after 12 weeks.\n\nThink of curcumin like a mild biologic substitute — not as a vitamin. Dose matters. Form matters. Monitoring matters.',
      },
      {
        heading: 'The Honest Bottom Line',
        body: 'Curcumin has real evidence in IBD. It\'s not snake oil. But:\n\n• UC evidence > Crohn\'s evidence.\n• Bioavailable forms > cheap capsules.\n• Adjunct to your real treatment > replacement for it.\n• Post-surgical recurrence prevention? Stick with your medication.\n• Liver risk is real enough that the NIH calls this out.\n\nIf your doctor gives you the green light, a bioavailable curcumin at the studied dose is a reasonable thing to try as an addition to your Crohn\'s treatment. If they don\'t, don\'t override them with Reddit threads. Anti-inflammatory spice doesn\'t have the upside to be worth hiding from your GI.',
      },
    ],
  },
  {
    id: 20,
    title: 'Exercise and Crohn\'s — How Much, What Kind, When',
    subtitle: 'Movement is medicine for Crohn\'s. Here\'s how to do it safely during remission and flares.',
    icon: 'bicycle-outline',
    category: 'lifestyle',
    readTime: '8 min',
    disclaimer: 'Clear any new exercise program with your doctor, especially if you have active disease, a recent surgery, anemia, or cardiovascular risk factors. Start slow, listen to your body, and pay attention to patterns.',
    citation: 'Based on Jones 2022 IBD exercise meta-analysis (PMID 36454911), Tew 2019 HIIT pilot (PMID 30696423), Jones 2020 impact+resistance RCT (PMID 33119156), Petersen/Pedersen IL-6 myokine paper (PMID 15772055), Robinson 1998 BMD RCT (PMID 9649456), and ACSM/ESPEN exercise guidelines for chronic disease.',
    sections: [
      {
        heading: 'Why Exercise Actually Matters for Crohn\'s',
        body: 'This isn\'t fitness moralism. Exercise does real things for Crohn\'s patients that most other interventions can\'t:\n\n• Muscle wasting (sarcopenia) is common in IBD — affects up to 40% of patients. Resistance training is the only reliable fix.\n\n• Steroids and malabsorption destroy bone density. Weight-bearing exercise is the best non-drug osteoporosis prevention.\n\n• Regular exercise triggers your muscles to release IL-6 as a MYOKINE (signaling molecule), which paradoxically lowers your body\'s chronic inflammation. Different pathway than the IL-6 that drives flares.\n\n• Exercise lowers TNF-α and raises anti-inflammatory cytokines like IL-10.\n\n• Quality-of-life improvements in IBD exercise trials consistently outperform usual care.\n\n• Fatigue — the #1 complaint in Crohn\'s — responds to LOW-DOSE exercise more than to rest, paradoxically.\n\nIf exercise were a pill, it would be prescribed for every Crohn\'s patient in remission.',
      },
      {
        heading: 'Exercise During Remission — The Sweet Spot',
        body: 'General prescription (adapted from ACSM for IBD):\n\nAEROBIC:\n• 3-5 days per week\n• Moderate intensity — you can still talk, not sing\n• 30-60 minutes per session\n• Walking, cycling, swimming, elliptical all work\n• Target: 150 min/week moderate OR 75 min/week vigorous\n\nRESISTANCE TRAINING:\n• 2-3 non-consecutive days per week\n• Start with bodyweight or light weights\n• 8-12 reps per set, 1-3 sets per exercise\n• Major muscle groups: legs, back, chest, shoulders, arms, core\n• This is non-negotiable if you\'ve been on steroids or had surgery\n\nFLEXIBILITY / STRESS:\n• Yoga, tai chi, or stretching 2-3 days/week\n• Counts toward your weekly total\n\nHIIT (high-intensity intervals):\n• Tolerated in mild Crohn\'s and remission based on the Tew 2019 study\n• Don\'t attempt during active disease\n• Short sessions — 10 x 1-minute intervals at 85-95% max heart rate\n\nStart gentle. Build over 6-8 weeks before pushing intensity. Your gut notices sudden change more than gradual progression.',
      },
      {
        heading: 'Exercise During a Flare',
        body: 'The old advice was "rest during flares." Updated research says: that\'s usually wrong.\n\nMILD FLARE: Light-to-moderate exercise often HELPS. Walking 20-30 minutes, gentle yoga, easy swimming. Avoid high-intensity work that spikes cortisol.\n\nMODERATE FLARE: Scale back but don\'t stop. 15-20 min gentle walks. Restorative yoga. Breathing exercises. The goal is maintaining movement, not training.\n\nSEVERE FLARE (bed-rest level, hospitalization, severe pain): Rest. Your body\'s energy budget is spoken for.\n\nSigns to stop mid-workout:\n• Sudden cramping that wasn\'t there when you started\n• Any bleeding\n• Nausea or vomiting\n• Dizziness beyond normal exertion\n• Fever\n• Shortness of breath out of proportion\n\nExercise during a flare should leave you feeling the same or slightly better, not worse. If it\'s making symptoms worse, back off.',
      },
      {
        heading: 'After Surgery — The Timeline',
        body: 'Post-intestinal-surgery exercise timeline (ileal resection, ileocolonic resection, or similar):\n\nDAY 1-2 POST-OP: Walking — your nurses will have you up. Even hallway walks prevent blood clots and jump-start gut function.\n\nWEEKS 1-2: Walking only, 10-20 minutes at a time. No lifting over ~10 lbs. No core work. No running.\n\nWEEKS 2-6: Longer walks, up to 45 min. No lifting over 15-20 lbs. No sudden twisting.\n\nWEEKS 6-8: Cleared by surgeon? Start light resistance (bodyweight, resistance bands). Add stationary cycling. No running yet.\n\nWEEKS 8-12: Gradual return to running. Gradual return to heavier lifting. Listen for incision discomfort.\n\nMONTH 3-6: Most patients back to full activity.\n\nHERNIA RISK is permanent at surgical sites. Proper bracing (exhale on the effort), avoiding Valsalva maneuver with heavy loads, and building core gradually are lifelong considerations. Not a reason to avoid exercise — a reason to build up smart.',
      },
      {
        heading: 'Running with Crohn\'s',
        body: 'Running is great for bone density, cardiovascular fitness, and mental health. It also triggers "runner\'s diarrhea" in about 20-50% of runners with IBD. Ways to manage:\n\nMEAL TIMING:\n• Finish solid food 3-4 hours before a run.\n• Low-fiber, low-fat pre-run meal (toast, banana, rice).\n• Hydrate well the day before, not just minutes before.\n\nROUTE PLANNING:\n• Know where bathrooms are on your route.\n• Train on loops past home or public restrooms during the first few months.\n• Races: recon the course for porta-potty locations.\n\nHYDRATION AND ELECTROLYTES:\n• If you\'ve had ileal resection, you lose water and electrolytes faster. Sports drinks are your friend.\n• Too much water alone can make diarrhea worse.\n\nLOPERAMIDE (Imodium):\n• Some runners take it prophylactically before a long run or race.\n• Talk to your GI about doses — it\'s not ideal for regular use.\n\nSTART SHORT:\n• If new to running, begin with 10-15 minute walk-run intervals and build. Your gut adapts over weeks.',
      },
      {
        heading: 'Resistance Training Is Not Optional',
        body: 'If you\'ve ever been on prednisone, had surgery, lost weight during a flare, or are over 40 — resistance training matters for you specifically.\n\nPROTEIN NEEDS FOR CROHN\'S LIFTERS:\n• 1.2-1.6 g/kg body weight for active IBD patients.\n• Up to 1.8 g/kg post-surgery or in muscle recovery.\n• Example: 170 lbs (77 kg) = 92-123 g protein daily. That\'s a chicken breast + Greek yogurt + protein shake + eggs day — realistic but deliberate.\n\nBONE LOADING:\n• Weight-bearing resistance beats walking alone for bone density.\n• The 1998 Robinson BMD RCT confirmed this in IBD specifically.\n• Compound lifts (squats, deadlifts, rows, presses) give the biggest stimulus.\n\nPROGRAMMING:\n• 2-3 sessions per week, alternating muscle groups.\n• Start with bodyweight if new; progress to free weights or machines.\n• Breathe out on effort (avoid Valsalva with heavy loads because of hernia history).\n\nYou don\'t need to be a powerlifter. You need enough muscle to age well with Crohn\'s.',
      },
      {
        heading: 'Yoga, Tai Chi, and the Vagal-Tone Play',
        body: 'Yoga has actual RCT evidence in IBD. The Cramer 2017 trial showed meaningful quality-of-life improvements for ulcerative colitis patients doing weekly Iyengar yoga. The evidence for Crohn\'s specifically is smaller but similar.\n\nWHY IT WORKS MECHANICALLY:\n• Slow, controlled breathing activates the parasympathetic ("rest and digest") nervous system.\n• The vagus nerve — which controls gut motility — responds to diaphragmatic breathing.\n• Restorative poses reduce cortisol, which can drive flares.\n\nPOSES TO EMPHASIZE:\n• Child\'s pose — gentle abdominal decompression.\n• Cat-cow — mobilizes the spine, massages abdomen.\n• Legs up the wall — parasympathetic reset.\n• Gentle twists — support bowel motility.\n• Savasana — because you need it.\n\nPOSES TO SKIP DURING ACTIVE DISEASE:\n• Deep abdominal compressions (bow pose, full locust).\n• Inversions (handstand, headstand) if you have active reflux.\n• Hot yoga — dehydration risk compounds with diarrhea.\n\nSTYLE RECOMMENDATIONS:\n• Hatha, Iyengar, gentle flow — ideal for beginners.\n• Restorative yoga — especially during flares or post-surgery.\n• Skip ashtanga/power yoga in active disease.\n\nTai chi and qigong are adjacent options — gentler, easier on joints, and good for balance (which matters as you age).',
      },
      {
        heading: 'Fatigue-Specific Exercise — The Counterintuitive Answer',
        body: 'Chronic fatigue is the #1 symptom patients report even in remission. The natural instinct is to rest more. Research keeps showing: that makes it worse.\n\n"Graded exercise therapy" — gradually increasing activity over weeks — outperforms rest for Crohn\'s-related fatigue in multiple trials.\n\nSTART POINT:\n• 10 minutes of light walking, most days. That\'s the entire prescription for week 1.\n\nPROGRESSION:\n• Add 2-5 minutes per week.\n• Build to 30 min, 5 days/week at moderate pace.\n• Once tolerated, add one resistance session per week.\n\nPACING IS EVERYTHING:\n• You\'re building capacity, not testing it.\n• If you\'re wiped out the next day, you overshot. Scale back 20%.\n• Energy goes up over weeks, not days. Give it time.\n\nThe mechanism is real — exercise improves mitochondrial function, cardiovascular fitness, sleep quality, and mood, all of which feed back into less fatigue. But only with consistency.',
      },
      {
        heading: 'Your Practical Starting Plan',
        body: 'If you\'re in remission and haven\'t been moving much, here\'s a 4-week entry plan:\n\nWEEK 1:\n• 10-minute walk, 5 days. Pace: comfortable, can easily talk.\n• 2 sessions of gentle stretching / yoga (10-15 min).\n\nWEEK 2:\n• 15-20 minute walks, 5 days.\n• 1 bodyweight resistance session (sit-to-stand squats, wall push-ups, planks — 2 sets of 8-10 reps).\n• Continue stretching.\n\nWEEK 3:\n• 20-30 minute walks, 5 days. Include 1 brisker day.\n• 2 resistance sessions, progressing reps or adding a light dumbbell.\n• Add a 15-20 minute yoga video.\n\nWEEK 4:\n• 30 minutes most days, split between walks and cycling/swimming/elliptical if you have access.\n• 2-3 resistance sessions, major muscle groups covered.\n• Yoga / flexibility 1-2 days.\n\nBy week 8 you\'re comfortably at the "remission prescription" level. From there, scale up or down based on your energy and how your gut responds. Track for patterns — notice if certain workouts trigger symptoms, adjust accordingly.',
      },
    ],
  },
];
