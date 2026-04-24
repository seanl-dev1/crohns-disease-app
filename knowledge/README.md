# Crohn's Disease Knowledge Base

Claude's reference library for the CrohnsApp project. Not user-facing — intended as Claude's in-depth training material to provide accurate, well-sourced guidance when working on the app or answering Sean's questions.

## Intent

When Sean asks about anything Crohn's-related — a food, a symptom, a medication, a surgery, a supplement, an exercise — Claude should be able to pull from this library and give an answer grounded in published evidence with citations.

## How this is different from the root-level files

| File | Audience | Purpose |
|---|---|---|
| `educational-content.md` (root) | Patients | User-facing Knowledge Hub articles in the app. Grade 6-8 reading level, warm tone |
| `post-resection-dietary-guide.md` (root) | App engine + Sean | Dietary engine reference for post-surgical nutrition |
| `*.json` databases (root) | App runtime | Loaded by the classification engine |
| `knowledge/*.md` (this folder) | Claude | Dense, technical, citation-heavy reference Claude reads to answer questions accurately |

## Evidence grading used throughout

- **[Strong]** — Meta-analysis, multiple RCTs, or major society guideline (ACG, AGA, ECCO)
- **[Moderate]** — Single RCT, large cohort study, or consensus statement
- **[Weak]** — Small studies, case series, mechanistic plausibility
- **[Anecdotal]** — Individual reports, social media consensus — flagged clearly

## Source hierarchy (what's trusted)

1. Major GI society guidelines: ACG (American College of Gastroenterology), AGA (American Gastroenterological Association), ECCO (European Crohn's and Colitis Organisation), BSG (British Society of Gastroenterology)
2. Cochrane systematic reviews
3. Peer-reviewed journals: *Gastroenterology*, *Gut*, *Lancet Gastroenterology & Hepatology*, *Clinical Gastroenterology and Hepatology*, *Inflammatory Bowel Diseases*, *Alimentary Pharmacology & Therapeutics*, *NEJM*, *JAMA*
4. Regulatory sources: FDA prescribing information, EMA summaries
5. Registry/cohort data: TREAT, Sinai-Helmsley, PREDICT
6. Major academic IBD centers' published protocols: Mount Sinai, Cedars-Sinai, Mayo, Cleveland Clinic, Oxford, Leuven

## Files in this library

### Core disease knowledge
- `01-pathophysiology.md` — Cellular/immunological mechanisms of Crohn's
- `02-symptoms-taxonomy.md` — Full symptom set with severity framing
- `03-diagnosis-and-monitoring.md` — Endoscopy, imaging, biomarkers, activity indices
- `04-disease-phenotypes.md` — Montreal classification, disease behavior, progression

### Treatment
- `05-medications-detailed.md` — All drug classes with mechanisms, evidence, real-world considerations (augments `crohns-medication-database.json`)
- `06-surgery-types-and-outcomes.md` — Resection, strictureplasty, ostomy, fistula repair
- `07-emerging-treatments.md` — 2024–2026 pipeline and newly approved agents
- `08-biomarker-monitoring.md` — Calprotectin, CRP, drug levels, therapeutic drug monitoring

### Lifestyle and non-pharmacologic
- `09-exercise-and-movement.md` — Exercise physiology in IBD, evidence by modality
- `10-sleep-and-circadian.md` — Sleep-inflammation link, circadian disruption
- `11-mental-health-and-gut-brain.md` — HPA axis, vagal tone, psychological interventions
- `12-lifestyle-triggers.md` — NSAIDs, smoking, alcohol, emulsifiers, shift work

### Natural and complementary
- `13-complementary-medicine.md` — Turmeric, Boswellia, omega-3, probiotics, CBD, acupuncture, mind-body — evidence-graded
- `14-supplements-reference.md` — Vitamins/minerals beyond post-resection focus

### Complications and comorbidities
- `15-extraintestinal-manifestations.md` — Joint, skin, eye, hepatic, oral, hematologic
- `16-complications-and-risks.md` — Fistulas, abscesses, strictures, cancer risk, osteoporosis, VTE
- `17-microbiome-and-genetics.md` — Dysbiosis patterns, NOD2/IL23R/ATG16L1, familial risk

### Special populations
- `18-pregnancy-and-fertility.md` — Medication safety, flare risk by trimester, delivery
- `19-pediatric-considerations.md` — Growth, EEN, transitions (less relevant for Sean personally)
- `20-older-adults-and-long-disease.md` — 20+ year disease course, cancer surveillance, comorbidity management

### Meta
- `sources.md` — Master citation list with PMIDs/DOIs
- `glossary.md` — Medical terminology used throughout

## Current status

This library is being built. Files are created as research is completed. Check the last-modified stamp in each file.

## How Claude should use this

When relevant to Sean's question:
1. Read the specific topic file(s)
2. Cite evidence level ([Strong]/[Moderate]/[Weak])
3. Link to source file/citation when making claims
4. If the library doesn't cover something, say so rather than guessing
5. If evidence is uncertain or conflicting, say that — don't pick a side
