# Lifestyle Triggers in Crohn's Disease — Claude Reference

**Purpose.** Dense, citation-heavy reference for answering patient questions about non-dietary (and some dietary) lifestyle factors that worsen or improve Crohn's disease. Intended as a machine-readable knowledge base; technical language is acceptable.

**Evidence grading used in this file:**
- **A** — Multiple high-quality prospective cohorts or RCTs, consistent effect. Causal inference reasonable.
- **B** — One large cohort plus mechanistic data, or multiple consistent case-control studies.
- **C** — Mechanistic (animal/ex-vivo) data plus suggestive human observational data.
- **D** — Hypothesis-generating; mechanistic only, or small conflicting human studies.

**Unverified / flagged claims** are explicitly marked with `[UNVERIFIED]` so Claude never presents them as fact.

---

## 1. Smoking and Crohn's Disease (Evidence: A)

Smoking is the single best-established modifiable environmental risk factor in Crohn's. This is the opposite direction from ulcerative colitis, where current smoking is actually mildly protective — a dissociation that is itself a diagnostic clue.

### 1.1 Risk of developing CD

- **Mahid et al. 2006 meta-analysis** (Mayo Clin Proc 2006;81(11):1462-1471; PMID 17120402): current smoking was associated with CD with OR **1.76 (95% CI 1.40–2.22)**. The same analysis found current smoking *decreased* UC risk (OR 0.58, 95% CI 0.45–0.75) and former smoking *increased* UC risk (OR 1.79, 95% CI 1.37–2.34).
- Calkins 1989 early meta-analysis showed the same directional divergence decades earlier. Smoking approximately **doubles** the risk of incident CD.

### 1.2 Smoking worsens disease course in established CD

- **Cosnes et al. 1996 / 1999** (Gastroenterology 1996;110(2):424-431; PMID 10571595 for 1999 follow-up in Gastroenterology 1999;117(5):1096-1101): in a large French cohort, current smokers with CD had higher rates of relapse, stricturing/penetrating complications, need for steroids and immunosuppressants, and surgery.
- Key quantitative signals from the Cosnes series:
  - Higher cumulative relapse rates.
  - ~2× rate of second-look surgery after intestinal resection.
  - More frequent need for immunomodulators.
- More frequent **perianal and fistulizing** complications in smokers (multiple series).
- **Biologic failure.** Smokers have higher rates of secondary loss of response to anti-TNF agents; signal is reproducible for infliximab and adalimumab across observational studies.

### 1.3 Smoking cessation benefit

- **Cosnes et al. 2001 intervention study** (Gastroenterology 2001;120(5):1093-1099; PMID **11266373**): 474 CD smokers counseled to quit. The 59 (12%) who quit for >1 year had **significantly more benign disease course** than continuing smokers — at 1 year, quitters approached the risk profile of never-smokers.
- Risk-benefit message: even after years of smoking, quitting changes the disease trajectory within ~12 months. This is one of the largest effect sizes from a single behavior change in CD.
- Systematic review of cessation interventions in CD: PMC10357394.

### 1.4 Mechanism hypotheses (C-level — mechanistic plausibility only)

- **Nicotine** — vasoconstrictive, alters mucosal blood flow; effect opposite in UC (protective) vs CD (harmful), suggesting *not* the dominant mechanism in CD.
- **Carbon monoxide and free radicals** — promote microvascular ischemia and oxidative mucosal injury, particularly in the terminal ileum (a CD-predilection site).
- **Microbiome effects** — smoking reduces Faecalibacterium prausnitzii (anti-inflammatory) and shifts the mucosa-associated microbiota; proposed as a major mediator in CD vs UC divergence.
- **Autophagy / NOD2 interaction** — smoking may worsen already-impaired Paneth cell autophagy in NOD2/ATG16L1 genetic backgrounds. `[UNVERIFIED as quantitative claim — mechanistic hypothesis only]`

### 1.5 E-cigarettes / vaping (Evidence: D)

- **Birrenbach 2022 case-control** (Dig Dis Sci; PMID **35579793**): current e-cigarette users with IBD did **not** show worse clinical outcomes vs non-users at 2 years. Small sample (127 vapers vs 251 controls). Insufficient to declare vaping "safe" for IBD.
- Mechanistic concern: e-cigarette aerosol disrupts intestinal barrier and upregulates pro-inflammatory cytokines in experimental models — even nicotine-free formulations.
- **Practical guidance:** Until larger prospective studies exist, treat vaping like smoking in CD — unproven safety, biologically plausible harm.

### 1.6 Secondhand smoke

- Childhood exposure to household smoking is associated with increased CD risk in some case-control studies (Jones 2008; reviewed in PMC3180011) `[effect size unverified]`.
- Passive smoking during pregnancy may increase offspring IBD risk (weak signal).

### 1.7 Cannabis smoking (Evidence: C — separate from oral CBD)

- **Naftali et al. 2013** (Clin Gastroenterol Hepatol 2013;11(10):1276-1280.e1; PMID **23648372**): 21 refractory CD patients randomized to THC cigarettes (115 mg THC × 2/day) vs placebo × 8 wk. Clinical response (CDAI drop ≥100) in 10/11 cannabis vs 4/10 placebo. **Did not meet primary endpoint of remission (CDAI <150)**. No improvement in CRP or hemoglobin (objective inflammation unchanged).
- **Naftali 2021 oral CBD RCT** (PMID 33858011): no endoscopic response.
- **Bottom line:** Cannabis may relieve symptoms but has no demonstrated effect on mucosal inflammation. **Combustion** of any plant matter introduces the same oxidative/CO exposure concerns as tobacco, without the counter-evidence that cessation helps. Oral/edible forms avoid this, but efficacy data remain weak.

### 1.8 Practical bottom line for patients (smoking)

1. If currently smoking — **quitting is the single most impactful non-pharmacologic change** for CD course.
2. Vaping is not an approved harm-reduction strategy for CD — prefer nicotine replacement therapy, varenicline, or bupropion to transition off.
3. Avoid secondhand smoke when feasible.
4. Cannabis: if used, prefer oral/edible over smoked; don't expect disease modification, only symptom relief.

---

## 2. NSAIDs and Crohn's Disease (Evidence: B)

### 2.1 Mechanism

NSAIDs inhibit cyclooxygenase (COX-1 and/or COX-2) → depletion of mucosal prostaglandins (PGE2) that are tropic for epithelium and maintain mucosal blood flow. Consequences:
- Disruption of tight junctions, increased intestinal permeability ("leaky gut").
- Topical injury to small-bowel epithelium (NSAID enteropathy) — often visible on capsule endoscopy as erosions, mucosal breaks.
- Impaired healing of existing mucosal lesions.
- Inhibition of lipoxin/resolvin pathways in some models.

The effect is **dose- and duration-dependent**. Occasional single doses have different risk profile than chronic daily use.

### 2.2 Epidemiologic evidence

- **Felder et al. 2000** (Am J Gastroenterol 2000;95(8):1949-1954): case-control study linking NSAID use to IBD relapse. Historically cited but criticized for selection bias.
- **Kefalakes et al. 2009** (Eur J Clin Pharmacol 2009;65(10):963-970; PMID **19711064**): systematic review — "substantial evidence that exacerbation of IBD happens after treatment with NSAIDs, but data remain conflicting." COX-2 selective agents not clearly safer.
- **Moninuola et al. 2018** (Aliment Pharmacol Ther 2018;47(11):1428-1439; PMID **29620794**): systematic review + meta-analysis of NSAIDs and acetaminophen. Pooled RR for CD exacerbation 1.42 (95% CI 0.65–3.09) — **not statistically significant** when pooled, despite individual positive studies. Highlights heterogeneity across study designs.
- **Takeuchi et al. 2006** (Clin Gastroenterol Hepatol 2006;4:196): prospective cohort — 17–28% of IBD patients flared within 9 days of short-course conventional NSAIDs; celecoxib (COX-2 selective) group fared better but underpowered.

**Interpretation:** The pooled null is heavily influenced by definition heterogeneity (flare vs endoscopic vs hospital admission). Most gastroenterologists treat NSAIDs as a probable precipitant, especially for prolonged use, while recognizing that occasional single doses are likely low-risk.

### 2.3 Specific NSAIDs — relative risk

Ranked roughly by GI/IBD concern (clinical practice consensus; `[precise comparative data in IBD is limited]`):

| Drug | Class | Concern in CD |
|---|---|---|
| Ibuprofen (Advil, Motrin) | Non-selective NSAID | High — widely used, broad COX inhibition |
| Naproxen (Aleve) | Non-selective NSAID | High — long half-life compounds exposure |
| Diclofenac (Voltaren systemic) | Non-selective NSAID | High |
| Aspirin (high-dose analgesic ≥325 mg) | Irreversible COX inhibitor | Moderate-high |
| Indomethacin | Non-selective NSAID | High |
| Ketorolac (Toradol) | Potent parenteral NSAID | Very high — short-term only, avoid in CD |
| Celecoxib (Celebrex) | COX-2 selective | Lower, but not zero; emerging IBD data limited |
| Aspirin 81 mg (cardioprotective) | Low-dose | Generally acceptable — see 2.5 |
| Topical NSAIDs (diclofenac gel, ketoprofen patch) | Non-selective, local | Low systemic exposure — generally safe |

### 2.4 Acetaminophen (paracetamol) — the safe default

- Works through central COX inhibition without mucosal prostaglandin depletion.
- Moninuola meta-analysis: no consistent association with IBD exacerbation.
- **Standard of care: first-line oral analgesic in CD.**
- Ceiling dose: 4,000 mg/day for healthy adults; 3,000 mg/day if older or moderate alcohol use; **lower if liver impairment or on methotrexate**.

### 2.5 Low-dose aspirin (81 mg) for cardiovascular protection

- **Patel et al. 2020** (Inflamm Bowel Dis; PMID **32219391**): daily 81 mg aspirin did NOT increase IBD hospitalizations, surgeries, or steroid use in a large IBD cohort.
- Pregnant IBD patients on low-dose aspirin also did not show increased flare risk.
- **Practical guidance:** For patients with established cardiovascular indications, 81 mg aspirin is generally considered acceptable with awareness of GI risk. Document the indication, consider PPI coverage for patients with prior ulcer disease.

### 2.6 Alternatives for pain management in CD

| Indication | Preferred option | Notes |
|---|---|---|
| Mild general pain, fever | Acetaminophen | First line |
| Headache / migraine | Acetaminophen, triptans (sumatriptan); avoid NSAID-containing combinations | Triptans not GI-relevant |
| Musculoskeletal / arthritis | Acetaminophen ± topical NSAID ± PT | Avoid systemic NSAIDs when possible |
| Neuropathic pain | Gabapentin, pregabalin, duloxetine | Good option in IBD |
| Moderate-severe acute pain | Tramadol (caution: GI motility — can cause constipation) | Avoid chronic opioids; narcotic use predicts worse outcomes in IBD |
| Post-surgical pain | Multimodal (acetaminophen, regional blocks), short-course opioid if needed | Avoid NSAIDs |

**Avoid chronic opioids.** Ananthakrishnan and others have shown opioid use in IBD is independently associated with infection, hospitalization, and mortality (Narula et al., several cohorts). `[PMID unverified for specific opioid-mortality paper]`

### 2.7 Practical bottom line (NSAIDs)

1. Treat NSAIDs as a probable flare risk in CD — use acetaminophen as first-line.
2. Single occasional doses (1–2 tablets for a specific event) likely low risk.
3. Chronic use (>7 days) should prompt consideration of alternatives.
4. Topical NSAIDs are a reasonable workaround for musculoskeletal pain.
5. Low-dose aspirin for cardiovascular protection is acceptable if indicated.

---

## 3. Alcohol and Crohn's Disease (Evidence: B for mucosal/microbiome; A for drug interactions)

### 3.1 Direct mucosal effects

- Alcohol (particularly ≥30 g/day) disrupts intestinal tight junctions, increases permeability (bacterial translocation of LPS into portal circulation), and promotes low-grade systemic inflammation. (Reviewed: Alcohol Research: Current Reviews 2017; PMC5513683.)
- **Swanson et al. 2011**: in IBD patients, 1 week of moderate red wine (24–36 g ethanol daily) produced **subclinical increases in intestinal permeability and markers of disease activity** without overt symptoms. Effect size small; concerning for cumulative risk.

### 3.2 Microbiome alterations

- Ethanol metabolism by enteric bacteria produces acetaldehyde, which is directly cytotoxic to epithelium.
- Chronic alcohol reduces beneficial commensals (Akkermansia, Faecalibacterium), expands Proteobacteria — the same pattern seen in active CD.

### 3.3 Fermentable effects during active disease

- Beer, cider, sweet wines, fortified wines contain residual sugars and fermentable carbohydrates (FODMAPs).
- During active inflammation, these can worsen bloating, gas, cramping, diarrhea even at low doses.
- Spirits (vodka, gin, whiskey neat) carry less carb/fermentation burden but more concentrated ethanol per volume.

### 3.4 Drug interactions (Evidence: A)

**Methotrexate:**
- Methotrexate is hepatotoxic; alcohol compounds this. Traditional rheumatology guidance was strict abstinence.
- Quantitative data (Humphreys 2017; PMC5561375): **<14 units/wk** does **not** increase transaminitis risk; **>21 units/wk** significantly increases it.
- Pragmatic IBD guidance: minimize, <1–2 drinks/week if at all; avoid binge drinking entirely.

**Azathioprine / 6-mercaptopurine:**
- Case report: alcohol binging → hepatic glutathione depletion → peliosis hepatis during azathioprine (PMC4611844).
- Regular heavy drinking + thiopurines = increased hepatotoxicity risk.
- Moderate occasional use generally tolerated; strict avoidance during binges.

**Biologics (infliximab, adalimumab, ustekinumab, vedolizumab, risankizumab):**
- No direct alcohol-biologic pharmacologic interaction.
- Indirect: alcohol increases infection susceptibility, which compounds biologic-associated infection risk.

**Corticosteroids:**
- Alcohol + steroids → increased risk of peptic ulceration, especially with concurrent NSAIDs.

### 3.5 Beverage comparison

| Beverage | Ethanol (approx per standard serving) | Residual carb / fermentable | CD-specific caveat |
|---|---|---|---|
| Spirits (1.5 oz, 40% ABV) | 14 g | Minimal | Least fermentable; dilute to reduce mucosal contact |
| Dry wine (5 oz, 12% ABV) | 14 g | Low | Red wine has polyphenols; tannins may irritate some |
| Beer (12 oz, 5% ABV) | 14 g | High (carbs + gluten in most) | Worst for gas/bloating in active CD |
| Cider, sweet wine | 14 g | Very high | Avoid in active disease |
| Non-alcoholic beer | ~0.5 g | Still high carb/fermentable | Not a "safe" workaround |

### 3.6 "Moderate" drinking in IBD context

- US dietary guidelines: ≤1 drink/day for women, ≤2 for men.
- IBD-specific recommendation: be more conservative — especially during active disease, on methotrexate, or on thiopurines.
- **Remission + no hepatotoxic drug:** occasional drinking likely OK if well tolerated.
- **Active disease / flare:** abstain or minimize.

---

## 4. Dietary Emulsifiers and Additives (Evidence: C–B, emerging)

The food-additive hypothesis proposes that industrial ingredients designed to stabilize, preserve, or texturize processed foods alter the gut microbiome and mucus layer, increasing inflammation. Mechanistic evidence is strong; human causal data are developing.

### 4.1 Carboxymethylcellulose (CMC) and Polysorbate 80 (P80) — the Chassaing/Gewirtz program

- **Chassaing et al. 2015 Nature** (Nature 2015;519(7541):92-96; PMID **25731162**): Mice given 1% CMC or P80 in drinking water for 12 weeks developed:
  - Erosion of the inner mucus layer (gut bacteria encroached closer to epithelium).
  - Low-grade colonic inflammation in wild-type mice.
  - **Overt colitis in genetically susceptible mice (IL-10⁻/⁻, TLR5⁻/⁻)**.
  - Metabolic syndrome (obesity, hyperglycemia) in all mice.
  - Germ-free mice were protected; fecal transplant from emulsifier-treated mice transferred the phenotype → microbiota-mediated.
- **Chassaing et al. 2017** (Gut; PMID 28325746): similar effects on human microbiota composition in ex vivo mucosal-simulator models.
- **FRESH trial — Chassaing et al. 2022 Gastroenterology** (PMID **34774538**): first human RCT. Healthy adults fed 15 g/day CMC × 11 days vs control diet. CMC consumption caused:
  - Increased postprandial abdominal discomfort.
  - Reduced microbiota diversity.
  - Reduced short-chain fatty acids and free amino acids in feces.
  - **Two "hyper-sensitive" subjects** developed microbial encroachment into the mucus layer (the colitis-predisposing signature).
- **2023 CMGH follow-up** (Cellular and Molecular Gastroenterology and Hepatology 2023; PMC-available): inflammatory response to CMC is **individualized** — determined by baseline microbiota composition.
- **Clinical Gastroenterology & Hepatology 2025** (article ID S1542-3565(25)00698-6): placebo-controlled trial of five common emulsifiers — effects on inflammation, permeability, and microbiome in humans.

### 4.2 Emulsifier-restricted diet in Crohn's (preliminary human data)

- ECCO 2024 preliminary data (abstract-level): emulsifier-restricted diet in CD patients showed improvements in symptoms and disease activity vs usual diet — early, conference-only results noted by the Science Media Centre. **Label as [PRELIMINARY]; formal publication pending.**

### 4.3 Carrageenan (Evidence: C)

- Ubiquitous in dairy alternatives, processed meats, puddings, infant formula (historically).
- Degraded carrageenan ("poligeenan") induces colitis in virtually every animal model tested — food-grade carrageenan induces similar lesions at higher doses in rodents and guinea pigs.
- **Bhattacharyya, Tobacman et al. 2017** (Nutr Healthy Aging; PMID **28447072**): small randomized no-carrageenan diet trial in UC. 3 of 5 carrageenan-capsule-exposed patients relapsed vs 0 of 7 placebo; increased IL-6 and fecal calprotectin in exposure group. **Small study**, UC-specific, but signal-generating.
- Mechanism: (1) directly activates NF-κB via TLR4-like receptors on intestinal epithelium; (2) depletes Akkermansia muciniphila → mucus thinning.
- **"Tobacman hypothesis"** has been formally disputed by industry-sponsored reviews; regulators (FDA, EFSA) maintain food-grade carrageenan is safe at current exposures. Practical CD advice: consider avoiding in active disease or if individually sensitive.

### 4.4 Titanium dioxide (TiO₂, E171) (Evidence: C)

- White pigment in candies (coatings, gum), some supplements, toothpastes, dairy products.
- Nanoparticle form can cross epithelium, accumulate in Peyer's patches.
- Animal models: TiO₂ nanoparticles worsen DSS colitis, promote low-grade colonic inflammation.
- **EFSA 2021 re-evaluation** (EFSA Journal, 6 May 2021): no longer considered safe as a food additive due to "genotoxicity concerns that cannot be ruled out."
- **EU ban effective August 2022** for E171 in food.
- Still widely used in the US and pharmaceutical tablet coatings.
- **Practical guidance:** Minimize E171-containing foods. Check labels of confectionery, chewing gum, coffee creamers, supplement capsules.

### 4.5 Artificial sweeteners (Evidence: C)

- **Sucralose (Splenda):** Rodriguez-Palacios et al. 2018 (Inflamm Bowel Dis; PMID **29554272**) — in SAMP1/YitFc mice (a CD-like ileitis model), Splenda expanded E. coli and Proteobacteria, increased myeloperoxidase reactivity in ileum. Healthy mice showed microbial shifts but no MPO activation → effect is **host-dependent**. Note: "Splenda" commercial product is ~1% sucralose, ~99% **maltodextrin** — some effects may be attributable to the maltodextrin carrier.
- **Saccharin, aspartame:** Suez et al. 2014 (Nature) — glucose intolerance via microbiota changes (not IBD-specific).
- **2022 Cedars-Sinai data:** sucralose and saccharin alter small-bowel microbiome in humans.
- **Practical guidance:** Avoid sucralose-sweetened products (including "protein" drinks, diet sodas, zero-calorie sports drinks) when possible. Stevia, monk fruit, allulose have less concerning data but limited IBD-specific evidence.

### 4.6 Maltodextrin (Evidence: C)

- **Nickerson et al. 2012 PLOS One** (PMID **23251695**): maltodextrin (MDX) exposure dramatically **enhanced biofilm formation by adherent-invasive E. coli LF82** (the prototypical CD-associated AIEC strain). MDX induced type-1 pili expression, increased bacterial adhesion to intestinal epithelial cells.
- **Nickerson et al. 2015** (Gut; PMID 25738413): MDX impaired Paneth cell antimicrobial peptide production.
- Gene malX (MDX metabolism) uniquely enriched in ileal mucosa of CD patients.
- MDX ubiquitous in processed foods — protein bars, "natural" flavorings, sweetener blends, sports drinks, many "gluten-free" products.
- **Practical guidance:** Read labels; minimize maltodextrin-containing products, especially in ileal CD.

### 4.7 Nitrates and nitrites (Evidence: B for CRC; C for IBD directly)

- Added to processed meats (bacon, ham, hot dogs, deli meats) for color and preservation.
- **Colorectal cancer (CRC):** IARC 2015 classified processed meat as Group 1 carcinogen. ~12% increased CRC risk per 100 g/day processed meat.
- **IBD directly:** less clear — some cohorts show association between processed meat and IBD incidence, but confounded with UPF/emulsifier content.
- **CD-specific compound risk:** CD patients already have elevated long-term CRC risk (especially colonic CD with >8 years duration). Dietary nitrate/nitrite exposure compounds this.
- **Practical guidance:** Minimize processed cured meats. Prefer fresh or uncured alternatives. Vitamin C with meals reduces endogenous nitrosamine formation.

### 4.8 Sulfites (Evidence: D)

- Preservatives in wine, dried fruits, shrimp, processed potatoes.
- Intestinal microbes can reduce sulfite/sulfate to H₂S (hydrogen sulfide).
- At excess concentrations, H₂S inhibits butyrate β-oxidation by colonocytes → fuel starvation → barrier dysfunction.
- UC more strongly implicated than CD; evidence in CD is sparse.

### 4.9 MSG (Evidence: D)

- Monosodium glutamate — limited direct IBD evidence.
- Individual sensitivity reports ("Chinese restaurant syndrome") poorly supported by controlled data.
- Glutamate itself is the preferred fuel of enterocytes — not intrinsically harmful.
- **Likely a non-issue in CD** despite popular belief.

### 4.10 Food colorings (Evidence: D)

- Tartrazine (Yellow 5), Allura Red (Red 40), Sunset Yellow (Yellow 6).
- Kumar et al. 2022 (Nature Communications) — Red 40 worsened colitis in IL-23-overexpressing mice.
- Human data limited. Plausible enough that avoidance in active disease is reasonable.

---

## 5. Ultra-Processed Foods (UPF) (Evidence: A for Crohn's association)

### 5.1 NOVA classification

NOVA 4 ("ultra-processed") = industrial formulations of derived substances (hydrogenated oils, HFCS, protein isolates) + cosmetic additives (emulsifiers, colors, flavors) + usually packaged, shelf-stable, branded. Examples: most breakfast cereals, soft drinks, packaged bread, reconstituted meats, instant noodles, protein bars, most ice creams.

### 5.2 Epidemiologic evidence

- **Lo et al. 2021 Clin Gastroenterol Hepatol** (PMID **34461300**): pooled analysis of 3 US prospective cohorts (Nurses' Health Study I+II, Health Professionals Follow-up Study; n >245,000). Highest quartile of UPF intake vs lowest: HR for CD = **1.70 (95% CI 1.23–2.35)**. No significant association for UC.
- **Narula et al. 2021 BMJ** (BMJ 2021;374:n1554; PMID **34261638**): PURE cohort, 116,087 adults across 21 countries, median follow-up 9.7 years, 467 incident IBD (90 CD, 377 UC). **≥5 servings/day vs <1 serving/day UPF: HR 1.82** for IBD (1.71 for CD, 1.86 for UC). 1–4 servings/day: HR 1.67. Dose-response.
- **Vasseur et al. 2021 / NutriNet-Santé** (Inflamm Bowel Dis 2021; PMID 32055825): 105,832 French adults, mean FU 2.3 y — **no** significant UPF-IBD association (short follow-up, few events).
- **Chen et al. 2022 J Crohns Colitis / UK Biobank** (PMID **36305857**): 187,154 participants. Highest vs lowest UPF quartile — **HR for CD ~2.00**; increased need for IBD surgery and benign colorectal neoplasia among those with pre-existing IBD.
- **Narula et al. 2023 CGH** (PMID referenced S1542-3565(23)00071-X): meta-analysis confirms UPF-CD association, directionally positive for UC but less consistent.

### 5.3 Dose-response — a usable heuristic

- Highest-consuming quartile vs lowest: **~1.7–2.0× CD risk**.
- Each ~10% increase in UPF share of diet: ~7–14% increased CD risk (approximate, varies by cohort).
- Specific UPF subgroups that drive association in PURE: soft drinks, refined sweetened foods, salty snacks, processed meats.

### 5.4 Plausible mechanisms

1. **Emulsifier load** (CMC, P80, lecithins) → see Section 4.1.
2. **Low fiber** → microbiota diversity loss, reduced butyrate production.
3. **High fructose / added sugars** → fructose malabsorption, altered microbiome, hepatic de novo lipogenesis.
4. **Non-caloric sweeteners** (sucralose, maltodextrin carriers) → Section 4.5, 4.6.
5. **Titanium dioxide** (candies, supplements) → Section 4.4.
6. **High omega-6 PUFA from refined seed oils** → pro-inflammatory eicosanoid biosynthesis.
7. **Loss of the "food matrix"** — nutrients absorbed too quickly, altered satiety signaling.

### 5.5 Practical bottom line (UPF)

- Replacing UPF with minimally processed whole-food alternatives is one of the strongest non-pharmacologic levers for CD prevention and likely for disease-course modification.
- A reasonable target: reduce UPF from the typical Western ~50–60% of energy to <30% (population average for moderate consumers shows substantially lower CD risk).

---

## 6. Shift Work and Circadian Disruption (Evidence: C)

### 6.1 Why the gut cares about circadian timing

- Enterocytes, tight-junction proteins, and mucus layer regeneration have ~24 h rhythms driven by both central (SCN) and intestinal peripheral clocks.
- Gut microbiota composition oscillates in 24 h cycles; Mucispirillum, Akkermansia, Lactobacillus populations fluctuate.
- Experimental jet lag in mice disrupts microbiome diurnality and exacerbates DSS colitis.

### 6.2 Epidemiologic signal in humans

- Shift workers have higher rates of GI disease generally (peptic ulcer, IBS, functional disorders). The specific association with IBD is suggestive but not definitively quantified. `[Specific published IBD hazard ratio for shift work is not well established; flag as emerging.]`
- Circadian disruption is associated with elevated systemic inflammatory markers (CRP, IL-6) in shift workers.

### 6.3 Practical recommendations

1. If shift work is necessary, consistency is better than rotation.
2. Maintain regular meal timing aligned to activity periods.
3. Strategic light exposure — bright light during waking shift, blackout for sleep.
4. Avoid "social jet lag" (weekends vastly different from weekdays) — >2 h weekend drift has metabolic and inflammatory costs.
5. Night-shift workers with CD should have aggressive clinical follow-up — relapse risk may be elevated.

---

## 7. Sleep Deprivation (Evidence: B)

### 7.1 Bidirectional relationship

- IBD activity causes sleep disturbance (nocturnal diarrhea, pain, medications).
- Sleep disturbance predicts subsequent IBD activity independently of baseline disease severity.

### 7.2 Key evidence

- **Ananthakrishnan et al. 2013 Clin Gastroenterol Hepatol** (PMID **23376797**): CCFA Partners cohort, 3,173 IBD patients. Among 1,291 CD patients in clinical remission at baseline, **impaired sleep → 2.0× risk of active disease at 6 months** (aOR 2.00, 95% CI 1.45–2.76). No significant association in UC.
- **Ananthakrishnan et al. 2014 Clin Gastroenterol Hepatol** (PMID **24780288**): NHS prospective. **<6 h sleep → increased UC incidence**; **>9 h sleep also elevated** (U-shaped). Reference: 7–8 h.
- **Sofia et al. 2020** (PMID **31820780**): poor sleep quality in CD associated with disease activity and elevated risk of hospitalization/surgery.
- Actimetry studies (objectively measured sleep) confirm self-report findings.

### 7.3 Mechanisms

- Sleep loss elevates cortisol (transient) and IL-6, TNF-α, CRP.
- Sleep deprivation directly increases intestinal permeability in experimental models.
- Melatonin (GI-concentrated hormone) has direct anti-inflammatory effects on gut mucosa; night light exposure suppresses production.
- Reduced slow-wave sleep → impaired glymphatic clearance; ripple effects on systemic inflammation.

### 7.4 Sleep apnea (OSA)

- Obesity-associated OSA is common in IBD cohorts, especially with corticosteroid-induced weight gain.
- Intermittent hypoxia from untreated OSA is pro-inflammatory and may compound IBD inflammation.
- CPAP therapy reduces systemic inflammatory markers (not specifically studied in IBD but plausible benefit).

### 7.5 Practical bottom line (sleep)

1. Target 7–8 hours/night consistently. Both <6 and >9 are associated with worse outcomes.
2. Screen for OSA if obese, snoring, daytime fatigue disproportionate to disease.
3. Sleep hygiene: fixed wake time, morning light, evening darkness, bedroom 18–20°C, no screens 60 min before bed.
4. Nocturnal diarrhea/pain waking the patient is a red flag for active disease — treat the inflammation.
5. Avoid chronic hypnotics where possible; trazodone or melatonin preferable to benzodiazepines/Z-drugs.

---

## 8. Chronic Stress and Psychological Distress (Evidence: B)

### 8.1 Gut-brain axis

- HPA axis activation → cortisol → altered mucosal immune tone, altered tight junction integrity.
- Vagal efferents modulate inflammation (cholinergic anti-inflammatory pathway).
- Stress alters gut microbiota composition within days.
- Mast cell activation in the gut is sensitive to corticotropin-releasing factor (CRF).

### 8.2 Human evidence

- **Bitton et al. 2008 Am J Gastroenterol**: prospective cohort of 101 CD patients in remission followed for flares. Higher perceived stress and avoidance coping predicted relapse. (Companion to their 2003 UC study.)
- **Levenstein et al. 2000** (Am J Gastroenterol; UC): perceived stress over prior 2 years doubled short-term flare risk.
- **Mawdsley & Rampton 2005** (Gut): review establishing mechanisms.
- **Sexton et al. 2022** (CGH; PMID referenced S1542-3565(22)00721-2): high perceived stress increased UC flare risk prospectively.
- Traumatic life events (childhood adversity, combat deployment, major loss) associated with increased IBD incidence in observational data. Signal is real but effect size modest; stress is neither necessary nor sufficient for disease.

### 8.3 What actually helps (treatment literature)

- **CBT for IBD** (Mikocka-Walus et al. multiple trials): reduces disease-related distress; modest effects on disease activity.
- **Gut-directed hypnotherapy**: strongest evidence in IBS; smaller IBD-specific studies suggestive.
- **Mindfulness-based stress reduction**: improves QoL, may reduce inflammatory markers in some RCTs.
- **Exercise** (see Section 13) — antidepressant effect probably accounts for part of its IBD benefit.

### 8.4 Practical bottom line (stress)

1. Stress does not cause CD but can precipitate flares in established disease.
2. Treat comorbid anxiety/depression — it's disease-modifying, not just QoL.
3. Low-burden daily practices (10 min breathwork, yoga, walking) with high adherence beat intensive interventions with low adherence.
4. Refer to IBD-specialized psychologist/psychiatrist when depression, anxiety, trauma, or catastrophic thinking are present.

---

## 9. Oral Hygiene and the Oral Microbiome (Evidence: C, rapidly emerging)

### 9.1 Periodontitis–IBD association

- Bi-directional, dose-responsive association between periodontal disease severity and IBD (both CD and UC) in multiple large cohorts.
- **Lorenzo-Pouso et al. 2024 J Crohns Colitis** (Unravelling the Oral-Gut Axis review): meta-analytic OR for periodontitis in IBD ~2–3 vs controls.

### 9.2 Oral pathogens translocating to the gut

- Oral *Klebsiella* strains colonize gut in IBD patients and induce Th1 inflammation (Atarashi et al. 2017 Science).
- **Fusobacterium nucleatum** — oral commensal; enriched in CD mucosal microbiota; disrupts tight junctions via FadA adhesin; implicated in CRC as well.
- Porphyromonas gingivalis directly disrupts intestinal epithelial tight junctions in Caco-2 co-culture.
- JCI Insight 2021: periodontal disease-associated bacterial translocation identified as a potential pathogenic mechanism in CD.

### 9.3 Practical bottom line (oral health)

1. Dental cleaning every 6 months (standard recommendation; stronger case in IBD).
2. Treat periodontitis aggressively — scaling and root planing, not just symptomatic care.
3. Toothpaste: some evidence that sodium lauryl sulfate (SLS) can irritate oral mucosa in some patients; **SLS-free formulations** are a low-cost option to trial if prone to aphthous ulcers. `[SLS-IBD direct evidence is thin — reasonable option, not evidence-based mandate.]`
4. Chlorhexidine rinses during flares — reduces oral bacterial load; short-term only due to staining.
5. Treat xerostomia (especially on anticholinergics, some anti-diarrheals) to preserve oral microbiome balance.

---

## 10. Air Pollution and Particulate Matter (Evidence: C)

### 10.1 Kaplan group and the Calgary/Alberta work

- **Kaplan et al. 2010 Am J Gastroenterol** (PMID **20588264**): Calgary cohort — ambient NO₂, SO₂, PM10 and IBD incidence. Overall null for general population; **age <23 years: higher NO₂ exposure → higher CD risk**.
- Mechanism proposals: ingestion of deposited PM via swallowed mucus, direct microbiome effects, and systemic inflammatory priming.

### 10.2 Broader literature

- Salim et al. 2014 (PMID **24637593**): air pollution effects on gut microbiota — mechanistic review.
- 2024 two-sample Mendelian randomization study (BES Journal) — suggested causal association between PM2.5 and IBD risk. Genetics-instrumented analysis; not definitive.
- Urban vs rural IBD gradients align with air pollution gradients.

### 10.3 Practical bottom line (air)

1. Follow local AQI; minimize outdoor exertion on poor-air days.
2. Indoor air: HEPA filtration reasonable in high-traffic/urban homes.
3. Avoid wood smoke exposure (biomass is high PM2.5).

---

## 11. Hormonal Factors (Evidence: B for OCP-CD signal)

### 11.1 Oral contraceptives (OCPs)

- **Cornish et al. 2008 Am J Gastroenterol** (PMID **18684177**): meta-analysis — current OCP users had RR **1.51 (95% CI 1.17–1.96) for CD**, RR 1.53 (95% CI 1.21–1.94) for UC. Risk reverts to baseline after discontinuation.
- **Khalili et al. 2013 Gut / NHS**: similar signal; risk modified by duration of use.
- **Pasvol et al. 2022** (PMID **28542115** referenced 2017 update meta-analysis; 2022 nested case-control in Aliment Pharmacol Ther): confirms modest increased risk with OCP and progestogen-only methods.
- Effect size clinically small; probably doesn't warrant OCP avoidance for most patients.
- Mechanism unclear — possibly estrogen effects on microvascular/immune function, or altered gut barrier.

### 11.2 HRT post-menopause

- Khalili et al. — post-menopausal HRT associated with increased UC risk; CD signal weaker.
- Consider individually; not a strict contraindication.

### 11.3 Menstrual cycle

- Perimenstrual flares ("catamenial flares") reported anecdotally and in some cross-sectional surveys (Kane et al.). Luteal/menstrual phase may increase GI symptom burden but inflammatory disease activity signal is less clear.
- Prostaglandin-mediated uterine cramping may cross over with perceived GI symptoms; NSAIDs for dysmenorrhea complicate interpretation.

### 11.4 Practical bottom line (hormonal)

1. OCPs: modest risk signal — individualize; non-hormonal options (IUD copper, barrier methods) reasonable if CD is severe or unstable.
2. Hormonal IUDs (levonorgestrel) likely lower systemic exposure — acceptable.
3. Don't stop HRT solely for IBD unless flares clearly track with it.
4. Track menstrual patterns and symptoms; adjust symptom management around anticipated cycle events.

---

## 12. Infections and Vaccinations

### 12.1 Gastroenteritis as an IBD trigger (Evidence: B)

- **Gradel et al. 2009 Gastroenterology** (PMID **19361507**): Danish population-based cohort — 13,148 patients with documented Salmonella or Campylobacter gastroenteritis vs 26,216 matched controls. **HR 2.9 (95% CI 2.2–3.9)** for IBD over 15 years; HR 1.9 (95% CI 1.4–2.6) after excluding the first year. Risk elevation was persistent throughout follow-up.
- Suggests gastroenteritis unmasks or precipitates IBD in genetically primed individuals (or shares common susceptibility factors).
- Yersinia, Shigella, and *C. difficile* have similar directional signals.

### 12.2 Vaccinations in IBD (Evidence: A for guidelines)

**Core principle:** Inactivated/recombinant vaccines = safe on biologics/immunosuppressants. **Live vaccines generally contraindicated** while immunosuppressed (defined below).

**"Immunosuppressed" for vaccine purposes:**
- Prednisone ≥20 mg/day (or equivalent) for ≥2 weeks
- Thiopurines (azathioprine, 6-MP)
- Methotrexate
- Anti-TNF (infliximab, adalimumab, certolizumab, golimumab)
- Anti-integrin (vedolizumab — gut-selective; some debate on "full" immunosuppression, but treated as such by most guidelines)
- Anti-IL-12/23 (ustekinumab), anti-IL-23 (risankizumab, mirikizumab)
- JAK inhibitors (tofacitinib, upadacitinib)

**Recommended in IBD (ACG and AGA guidance):**
- Influenza: **inactivated** annually. Live attenuated (LAIV/FluMist) **contraindicated** on immunosuppression.
- Pneumococcal: PCV15 or PCV20, then PPSV23 per current ACIP schedule — all inactivated.
- **Recombinant Zoster Vaccine (RZV, Shingrix):** recombinant, **not live — SAFE** on biologics and immunosuppressants. Recommended starting age 19 for immunocompromised patients per ACIP 2021 update.
  - Old live zoster vaccine (Zostavax) was contraindicated on immunosuppression — now off market.
- HPV: recombinant, safe; recommended per standard schedule.
- Hepatitis B: recombinant, safe; titers may be blunted on anti-TNF — consider higher-dose formulations.
- Tetanus/Tdap: inactivated/toxoid, safe.
- COVID-19: mRNA and recombinant protein vaccines — safe and recommended; live-attenuated formulations (not currently available in most markets) would be contraindicated.
- Meningococcal ACWY and B: recombinant/conjugate, safe.

**Live vaccines that ARE contraindicated on immunosuppression:**
- MMR, varicella, yellow fever, oral typhoid (Ty21a), BCG, rotavirus (infant — relevant for CD patients' babies born while mom on biologics), intranasal LAIV influenza.

**Live vaccines — when still OK:**
- Before initiating biologics (ideally complete at least 4 weeks prior).
- After washout — varies by drug; anti-TNF often 3 months.
- During stable mild disease NOT on systemic immunosuppressants.
- Infants of mothers on anti-TNF during pregnancy: **avoid rotavirus** for first 6–12 months due to transplacental biologic transfer.

### 12.3 Practical bottom line (vaccines)

1. Take an annual vaccination inventory at the IBD visit.
2. Timing: ideally assess before starting biologics — catch up on live vaccines if possible.
3. Shingrix (RZV): eligible at age 19 if immunocompromised. Two-dose series, minimum 1–2 months apart. Safe on all IBD biologics.
4. Annual inactivated flu. Pneumococcal per schedule. Keep Tdap current.
5. Avoid LAIV (FluMist), yellow fever (unless travel requires and off immunosuppression), oral polio/typhoid on biologics.
6. Travel medicine referral for foreign travel planning.

---

## 13. Physical Activity (brief — see dedicated exercise file)

- **Khalili, Ananthakrishnan et al. 2013 BMJ** (PMID **24231178**): NHS cohorts, 194,711 women, 3.4M person-years. Highest vs lowest quintile of physical activity: **HR 0.64 for CD (36% risk reduction)**. Less robust for UC.
- Moderate exercise (brisk walking, cycling, swimming) at ~150 min/week is the practical target.
- High-intensity exercise during active disease can precipitate symptoms; pace to disease state.

---

## 14. Mental Health Links (brief — see dedicated mental health file)

- Depression and anxiety are highly comorbid with IBD (20–40% prevalence vs 10–20% general population).
- Depression is associated with worse IBD outcomes — more flares, more surgery, more biologic failure.
- Treating depression improves IBD trajectory (bidirectional).

---

## 15. Cold Weather / Seasonality and Vitamin D (Evidence: B for vitamin D status)

- Northern-latitude IBD cohorts show higher disease activity and more flares in winter months in some series; not universally replicated.
- **Vitamin D status** is a strong candidate mediator:
  - Ulitsky, Ananthakrishnan et al. — low 25-OH-D prevalence in IBD: ~63% in CD, 55% in UC in one cohort.
  - Winter/spring median 14 ng/mL vs summer 21 ng/mL in IBD patients.
  - Low vitamin D is associated with increased disease activity, hospitalization, and surgery.
  - Whether low D causes flares or flares consume D remains unresolved — consensus is the relationship is bidirectional.
- **Ananthakrishnan et al. 2013** (Gastroenterology) — low plasma 25-OH-D associated with increased risk of CD and CRC in IBD.
- Target 25-OH-D >30 ng/mL generally; some specialists target >40 ng/mL in IBD.

---

## 16. Obesity and Adiposity (Evidence: B)

### 16.1 BMI and disease risk

- **Jensen, Ananthakrishnan et al. 2021** (pooled 5 cohorts; PMID referenced S1542356521007205): **obesity (BMI ≥30) is associated with incident CD risk**; no significant association with UC.

### 16.2 Visceral adiposity and "creeping fat"

- Creeping fat (mesenteric adipose tissue wrapping inflamed ileal segments) is a pathognomonic gross feature of CD.
- Creeping fat is metabolically and immunologically active — expresses high levels of leptin, adiponectin, IL-6, TNF-α; translocated gut bacteria have been cultured from it (Ha et al. 2020 Cell — the "creeping fat contains bacteria" paper).
- Fibrogenic signaling from adipocytes contributes to stricturing.

### 16.3 Visceral adiposity vs BMI as prognostic marker

- **Gu et al. 2023 Inflamm Bowel Dis** (PMID **37307420**): visceral adipose tissue volume on imaging **independently predicts time to flare**; BMI does not. Visceral fat > BMI as a prognostic metric in IBD.
- **Uko, Ananthakrishnan et al. 2017** (PMID **27893544**): visceral adiposity + genetic susceptibility → higher complication rates in CD.

### 16.4 Obesity and treatment response

- Increased volume of distribution for weight-based biologics (infliximab) may produce lower trough levels → more frequent dose adjustments needed.
- Obesity is a surgical risk factor — higher wound complication rates post-bowel resection.

### 16.5 Practical bottom line (adiposity)

1. Target BMI 20–27 for IBD patients when feasible.
2. Visceral fat reduction (aerobic + resistance training) likely better than BMI-focused dieting.
3. Avoid cycles of steroid-induced weight gain by minimizing steroid duration.
4. GLP-1 agonists emerging as reasonable option in IBD — no direct contraindication; monitor GI side effects (nausea, reflux).

---

## 17. Antibiotics — Past and Cumulative (Evidence: B)

### 17.1 Childhood antibiotic exposure

- **Kronman, Shaw et al. 2012 Pediatrics** (PMID referenced PMC4074626): antibiotic exposure in first year of life → increased IBD risk.
- **Ungaro, Kronman, Shaw et al. 2014 Am J Gastroenterol** (PMID **25223575**): meta-analysis — antibiotics associated with **new-onset CD OR 1.74 (1.35–2.23)**; stronger effect in children and with multiple courses. UC association weaker.
- **2024 Faye et al. CGH meta-analysis** (PMID **38423349**): dose-response — each additional antibiotic course increased IBD risk; effect largest with early-life exposure.
- **2026 Kronman/Shaw update** (PMID **41617205**): pooled RR for antibiotic-exposed children — IBD 1.42, CD 1.59, UC 1.23.

### 17.2 Mechanism

- Early-life microbiota shaping — antibiotic-induced dysbiosis disrupts immune education.
- Reduced diversity persists for months to years after single courses.
- Amoxicillin-clavulanate, macrolides, cephalosporins — particularly high dysbiosis signal.

### 17.3 Adult antibiotic exposure

- Cumulative courses also associated with incident IBD in adults (Faye et al.), though effect smaller than childhood exposure.
- Signal persists after controlling for indication (so not just "sick kids got antibiotics and IBD diagnosed more readily").

### 17.4 Practical bottom line (antibiotics)

1. Use antibiotics only when clearly indicated; avoid unnecessary courses for viral URIs, uncomplicated ear infections, etc.
2. When antibiotics are necessary (including for CD complications like abscess), take them — don't avoid indicated therapy.
3. Consider concurrent probiotic use (Saccharomyces boulardii has some evidence for antibiotic-associated diarrhea; IBD-specific probiotic recommendation remains VSL#3/De Simone formulation in UC; CD evidence is weaker).

---

## 18. Occupational Exposures (Evidence: D)

- Weak signals for:
  - Welders / metal workers (metal fumes, especially aluminum, iron oxide).
  - Chemical workers (organic solvents).
  - Farmers (mixed — some studies show *reduced* IBD risk, probably due to hygiene hypothesis).
- Hair dressers, printing workers — scattered case-control signals.
- Shift work (see Section 6) overlaps with occupational exposure category.

Most occupational data is hypothesis-generating. Not actionable for individual patients beyond general recommendation to use appropriate PPE.

---

## 19. Geographic and Migration Patterns (Evidence: A for the epidemiologic observation)

### 19.1 The westernization gradient

- IBD incidence is highest in North America, Northern Europe, Australia/New Zealand.
- Historically low in Asia, Africa, South America — now rising rapidly as these regions urbanize and westernize (Ng et al. 2017 Lancet — global IBD epidemiology).

### 19.2 Migration studies

- South Asian immigrants to UK and Canada: incidence rises toward the host country level within a generation.
- **Benchimol et al. 2015** (PMID **25756238**): Canadian migrant cohort — South Asian immigrants' children had IBD incidence approaching Canadian-born rates (6.0 vs 7.2 per 100,000), much higher than in their parents' countries of origin.
- Aniwan et al. 2022 UEG J review: reinforces "environment trumps genetics" signal.

### 19.3 Interpretation

- Genetic susceptibility matters, but **environmental exposures (diet, microbiome, hygiene, antibiotics, air) dominate the population-level incidence**.
- Protective features of non-Western diets that are lost in migration: higher fiber, fermented foods, lower UPF/emulsifier exposure, traditional food preparation.
- Early-life exposures (0–5 y) appear most critical.

---

## Appendix A — Quick-Reference Table: Avoid / Limit / Neutral / Beneficial

| Factor | Avoid | Limit | Neutral | Beneficial |
|---|---|---|---|---|
| Tobacco smoking | ✗ Current smoking | Secondhand smoke exposure | — | Quitting (improves course in <12 mo) |
| Vaping / e-cigs | ✗ (precautionary) | — | — | — |
| Cannabis | ✗ Smoked combustion | Oral/edible for symptoms | — | — |
| NSAIDs | ✗ Chronic ibuprofen, naproxen, ketorolac | Occasional single doses | Topical diclofenac gel | — |
| Low-dose aspirin (81 mg) | — | If no CV indication | If CV-indicated | — |
| Acetaminophen | — | — | First-line analgesic | — |
| Alcohol | ✗ Binge; heavy use on MTX/AZA | Beer/cider in active disease | Occasional dry wine / spirits in remission | — |
| Emulsifiers (CMC, P80) | ✗ High-UPF diet | Moderate intake | Occasional | — |
| Titanium dioxide (E171) | ✗ When label identifies it | — | Residual pharmaceutical excipient | — |
| Carrageenan | ✗ In active disease | Moderate intake in remission | — | — |
| Artificial sweeteners (sucralose) | ✗ Daily diet sodas | Occasional | Stevia, monk fruit, allulose | — |
| Maltodextrin | ✗ In ileal CD | Moderate intake | Occasional | — |
| Processed cured meats (nitrites) | ✗ Daily consumption | Weekly servings | Occasional bacon | — |
| Ultra-processed foods overall | ✗ >50% of calories | 20–30% of calories | <20% | Whole foods, Mediterranean pattern |
| Shift work | ✗ Rotating night shifts if avoidable | Consistent night work | Consistent day work | — |
| Sleep | ✗ <6 h/night chronic | — | 7–8 h/night | Good sleep hygiene |
| Chronic stress | ✗ Untreated anxiety/depression | — | — | CBT, mindfulness, exercise |
| Oral hygiene | ✗ Untreated periodontitis | — | Standard 2×/yr dental | Active periodontal treatment |
| Air pollution | ✗ Exercise on high-AQI days | — | Normal urban air | HEPA filtration, low-pollution commute |
| Oral contraceptives | — | If disease unstable | If stable disease | Non-hormonal (IUD, barrier) |
| HRT | — | Individual consideration | — | — |
| Gastroenteritis | ✗ Undercooked meats, unsafe travel water | — | — | Hand hygiene, food safety |
| Live vaccines on biologics | ✗ MMR, varicella, yellow fever, LAIV, oral typhoid | — | — | — |
| Recombinant/inactivated vaccines | — | — | Routine per schedule | Shingrix, flu, pneumococcal |
| Childhood antibiotics | ✗ Unnecessary courses | — | Indicated use | — |
| Physical activity | ✗ Sedentary lifestyle | High-intensity in active flare | Moderate activity | 150 min/wk moderate (reduces CD risk ~36%) |
| Body composition | ✗ Obesity (BMI ≥30) | BMI 28–30 | BMI 20–27 | Reduce visceral fat |
| Vitamin D | ✗ 25-OH-D <20 ng/mL | 20–30 ng/mL | 30–40 ng/mL | 40+ ng/mL (some specialist targets) |

---

## Appendix B — Citation Quick-Reference (verified PMIDs)

Key landmark citations (all PMIDs verified during research via PubMed):

| Topic | First author, Year, Journal | PMID |
|---|---|---|
| Smoking cessation in CD | Cosnes 2001 Gastroenterology | 11266373 |
| Smoking effect on disease course | Cosnes 1999 Gastroenterology | 10571595 |
| Smoking–IBD meta-analysis | Mahid 2006 Mayo Clin Proc | 17120402 |
| E-cigarette outcomes in IBD | Birrenbach 2022 Dig Dis Sci | 35579793 |
| Cannabis RCT in CD | Naftali 2013 Clin Gastroenterol Hepatol | 23648372 |
| NSAID / acetaminophen meta-analysis | Moninuola 2018 Aliment Pharmacol Ther | 29620794 |
| NSAID review | Kefalakes 2009 Eur J Clin Pharmacol | 19711064 |
| Low-dose aspirin in IBD | Patel 2020 Inflamm Bowel Dis | 32219391 |
| CMC mouse Nature study | Chassaing 2015 Nature | 25731162 |
| FRESH human CMC trial | Chassaing 2022 Gastroenterology | 34774538 |
| Emulsifiers human ex vivo | Chassaing 2017 Gut | 28325746 |
| Carrageenan UC trial | Bhattacharyya/Tobacman 2017 Nutr Healthy Aging | 28447072 |
| Splenda ileitis model | Rodriguez-Palacios 2018 Inflamm Bowel Dis | 29554272 |
| Maltodextrin AIEC | Nickerson 2012 PLOS One | 23251695 |
| Maltodextrin Paneth cells | Nickerson 2015 Gut | 25738413 |
| UPF US cohorts (CGH) | Lo 2022 Clin Gastroenterol Hepatol | 34461300 |
| UPF PURE cohort (BMJ) | Narula 2021 BMJ | 34261638 |
| UPF UK Biobank | Chen 2022 J Crohns Colitis | 36305857 |
| Sleep quality and IBD activity | Ananthakrishnan 2013 CGH | 23376797 |
| Sleep duration and UC incidence | Ananthakrishnan 2014 CGH | 24780288 |
| Poor sleep CD hospitalization | Sofia 2020 | 31820780 |
| Air pollution & IBD | Kaplan 2010 Am J Gastroenterol | 20588264 |
| Air pollution microbiota | Salim 2014 | 24637593 |
| Oral contraceptives IBD meta-analysis | Cornish 2008 Am J Gastroenterol | 18684177 |
| Post-enteritis IBD risk | Gradel 2009 Gastroenterology | 19361507 |
| Physical activity and IBD | Khalili 2013 BMJ | 24231178 |
| Visceral adiposity and flare | Gu 2023 Inflamm Bowel Dis | 37307420 |
| Visceral adiposity + genetics CD | Uko 2017 Inflamm Bowel Dis | 27893544 |
| Childhood antibiotics meta-analysis | Ungaro 2014 Am J Gastroenterol | 25223575 |
| Antibiotics dose-response | Faye 2024 Clin Gastroenterol Hepatol | 38423349 |
| Migrant IBD epidemiology (Canada) | Benchimol 2015 | 25756238 |

---

## Appendix C — Flagged / Unverified Claims

The following statements appear in the lifestyle-trigger literature but were not independently verified with a specific PMID during construction of this file. Flag as `[UNVERIFIED]` before presenting as settled fact:

- The precise quantitative risk ratio for shift work and IBD incidence.
- Specific SLS (sodium lauryl sulfate) toothpaste data in IBD outcomes — mechanistic plausibility, weak direct data.
- The claim that "artificial sweeteners double the risk for Crohn's disease" (appears in secondary literature attributed to Qin 2012, but the original epidemiologic source should be verified before asserting).
- Specific claims about smoking-NOD2 interaction mechanisms (hypothesis-level).
- Some quantitative claims about E171/titanium dioxide in human IBD (mechanistic data in animals; human epidemiology limited).
- Opioid-mortality association specific PMIDs in IBD — well-documented in reviews but I did not re-verify a primary citation here.
- Precise carrageenan dose-response in humans — Tobacman group data is suggestive but limited sample sizes.
- PRELIMINARY (conference abstract) ECCO 2024 emulsifier-exclusion diet in CD — formal publication pending.

Claude should present these as "emerging," "mechanistically plausible," or "preliminary evidence suggests" rather than as confirmed findings.

---

## Appendix D — How to Use This File

**For Claude answering patient questions:**

1. When asked about a specific trigger, pull the relevant numbered section.
2. Always state the evidence grade (A/B/C/D) when giving quantitative risk estimates.
3. Prefer the "practical bottom line" framing — Sean's app philosophy is guidance-first, not chore-based tracking.
4. Use full patient-friendly language in the response; the dense citation scaffolding here is for retrieval, not direct quotation unless the user asks for depth.
5. For Sean specifically: he has had a bowel resection ~20 years ago, so prioritize:
   - Smoking (section 1) — highest impact on recurrence after resection.
   - NSAIDs (section 2) — post-resection patients more susceptible to NSAID enteropathy at the anastomosis.
   - UPF / emulsifiers (sections 4, 5) — modifiable, meaningful effect size.
   - Sleep + stress (sections 7, 8) — high-yield behavioral levers.
   - Vitamin D monitoring (section 15) — especially if ileum was resected (malabsorption risk).
6. When in doubt about a specific claim, check Appendix C. Do not fabricate PMIDs.
