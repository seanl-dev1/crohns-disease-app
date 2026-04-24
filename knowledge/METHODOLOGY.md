# Knowledge Base Methodology

This is the rulebook every file in `knowledge/` must follow. If a file doesn't follow these rules, it is a working draft and must be flagged as such at the top.

## Why this matters

Crohn's disease is a real disease affecting real people. Bad information can worsen disease, cause medication failures, or send someone to the ER. Every claim in this knowledge base must be traceable to a legitimate primary source. No blog posts, no news articles, no consumer websites, no social media, no "my training data suggests." If I can't cite it, I don't write it.

## Acceptable source tiers

### Tier 1 — Primary (always cite these when making claims)
- **Major GI society guidelines** (current version, with publication date):
  - ACG (American College of Gastroenterology)
  - AGA (American Gastroenterological Association)
  - ECCO (European Crohn's and Colitis Organisation)
  - BSG (British Society of Gastroenterology)
  - ESPEN (European Society for Clinical Nutrition and Metabolism)
  - WGO (World Gastroenterology Organisation)
  - AASLD (for hepatobiliary EIMs)
- **Cochrane systematic reviews** — highest evidence tier for therapy questions
- **Peer-reviewed journals** (PubMed-indexed, with PMID):
  - *Gastroenterology*, *Gut*, *Lancet Gastroenterology & Hepatology*
  - *NEJM*, *JAMA*, *BMJ*
  - *Clinical Gastroenterology and Hepatology*
  - *Inflammatory Bowel Diseases*
  - *Journal of Crohn's and Colitis*
  - *Alimentary Pharmacology & Therapeutics*
  - *American Journal of Gastroenterology*
  - *Nature Medicine*, *Cell*, *Science* (basic mechanism papers)
- **Clinical trial registries**: ClinicalTrials.gov (NCT numbers), EU Clinical Trials Register
- **Regulatory**: FDA prescribing information (for drug claims), EMA EPARs

### Tier 2 — Synthesis of primary (acceptable with a primary source alongside)
- UpToDate chapter citations — noted as secondary
- Academic textbook chapters (Sleisenger & Fordtran's *Gastrointestinal and Liver Disease*; Kirsner's *Inflammatory Bowel Diseases*)
- NIH / NIDDK disease overviews (when they cite their sources)
- Crohn's & Colitis Foundation published clinical resources (when they cite primary literature)

### Tier 3 — Not acceptable as a source for claims
- WebMD, Healthline, Verywell Health, Medical News Today, Everyday Health
- Blog posts (any author, including physicians)
- News articles (even NYT, WSJ, Reuters health)
- Social media (Twitter/X threads, Reddit, TikTok)
- Podcast transcripts
- Non-peer-reviewed preprints (unless explicitly flagged as preprint-only)
- "Expert opinion" without a published citation
- Brand websites for product claims (OK only for product ingredient lists, not for efficacy claims)

## Citation format

Inline: `(Author et al., Year, PMID: XXXXXXXX)` or `(ECCO Guidelines 2024, Section 3.2)`.

PMIDs must be verifiable on PubMed. If a claim is made and I can't find a PMID, I write "**[UNVERIFIED — couldn't find primary source]**" next to the claim — honest disclosure beats fake confidence.

Every file ends with a `## Sources` section listing all citations.

## Multi-source consensus requirement

For any non-trivial claim, cite at least 2 independent sources. If sources disagree, report both positions and note the disagreement. For example:

> "Curcumin 3g/day added to mesalamine induced remission in UC (Lang et al. 2015, PMID: 26066371; Hanai et al. 2006, PMID: 17101300). A 2023 Cochrane review concluded evidence is still low-certainty for Crohn's specifically (Kumar et al. 2023, PMID: 37310175). Bottom line: more evidence for UC than CD."

This is the pattern. Never a single source for a material clinical claim when multiple exist.

## Evidence grading

Each claim gets a bracketed tag:

- **[Strong]** — Multiple RCTs, Cochrane review, or current major society guideline recommendation
- **[Moderate]** — Single well-designed RCT, or large prospective cohort
- **[Weak]** — Small/open-label trials, retrospective data, mechanistic/animal models only
- **[Consensus-based]** — Expert opinion in major guidelines where trials are absent (rare disease, rare complication)
- **[Contested]** — Primary sources disagree
- **[Emerging]** — Active area of research, conclusions may change
- **[Historical]** — Previously taught but now outdated (noted for context)

## Disagreement handling

If ACG, AGA, and ECCO differ on a recommendation (they sometimes do), state all three positions with dates. The reader needs to know which expert body they're aligning with, and that the field isn't monolithic.

Example: for enteral nutrition in adult CD, ECCO 2020 is more supportive than AGA 2021 — that matters.

## Date handling

- Every cited guideline has its publication year in the citation
- Flag guidelines >5 years old that may be superseded
- Flag claims from single studies pre-2010 unless they're the landmark that everything else builds on (e.g., ACCENT I, SONIC, COMMIT)

## What Claude must NOT do

1. Write medical claims from memory without citations
2. Invent PMIDs that don't exist (hallucinated citations are catastrophic — they make fake things look legitimate)
3. Cite consumer health websites as authority
4. Convert "common clinical practice" into "evidence-based" without a guideline or trial reference
5. Recommend supplements or therapies without a safety section that cites interaction data (drug interactions come from FDA labels + Lexicomp/Micromedex, reported in primary literature)
6. Present single-study findings as consensus

## What Claude MUST do

1. Search PubMed/Cochrane first, draw from primary sources
2. When using Web tools, preferentially fetch from `pubmed.ncbi.nlm.nih.gov`, `academic.oup.com/ecco-jcc`, `gastrojournal.org`, `thelancet.com`, `gut.bmj.com`, `journals.lww.com/ibdjournal`, `cochranelibrary.com`, `fda.gov`
3. Cross-check any PMID on PubMed before including (check: does PMID exist? does it actually say what I'm claiming?)
4. For every file, run a "spot-check" — pull 5 random citations, verify each on PubMed, confirm they support the cited claim. If any fail, the whole file needs re-verification.
5. Flag every unverified claim with **[UNVERIFIED]**
6. Acknowledge gaps honestly — better to say "evidence is thin here" than fabricate confidence

## File-level requirements

Every file in `knowledge/` must have at the top:

```markdown
---
topic: [short topic name]
last_reviewed: [YYYY-MM-DD]
evidence_review_status: [research-grade | working-draft | needs-revision]
primary_sources_checked: [list of databases/registries consulted]
---
```

If `evidence_review_status` is `working-draft`, the file is not trusted and must carry a banner at the top.

## Greppability — non-negotiable

Every file must be scannable with `grep` so Claude can pull specific facts in one step without reading the whole file. In practice:

### Entity blocks

Every drug, symptom, complication, supplement, food category, or test gets its own grep-anchored block with a fixed prefix. Pattern:

```
## DRUG: infliximab
### aliases: Remicade, Inflectra, Avsola, Renflexis
### class: anti-TNF monoclonal antibody
### indications_cd: moderate-severe luminal CD, fistulizing CD, peds CD
### dose_induction: 5 mg/kg IV weeks 0, 2, 6
### dose_maintenance: 5 mg/kg IV q8 weeks (can escalate to 10 mg/kg or q4-6w)
### evidence: [Strong]
### sources: PMID:12047962 (ACCENT I), PMID:14985485 (ACCENT II), PMID:20402761 (SONIC)
### contraindications: active TB, untreated latent TB, active hep B, heart failure NYHA III-IV, demyelinating disease
### screening_required: TB (IGRA preferred), Hep B surface antigen + core, CBC, LFTs
### interactions_critical: live vaccines contraindicated; MTX combo improves durability
### adverse_events_serious: infusion reactions, reactivation TB/hep B, lymphoma (modest), HSTCL with thiopurine combo, CHF worsening, paradoxical psoriasis ~15%
### monitoring: trough levels + ADA when loss of response suspected (IFX target trough >5 µg/mL)
```

This means `grep "## DRUG: infliximab"` returns the block anchor; `grep "### dose_induction:"` across all files returns every drug's induction dose in one call.

### Rules
- **Entity prefix**: `## DRUG:`, `## SYMPTOM:`, `## COMPLICATION:`, `## SUPPLEMENT:`, `## FOOD-CATEGORY:`, `## TEST:`, `## SURGERY:`, `## LIFESTYLE:`, `## EIM:` (extraintestinal manifestation). One entity per block.
- **Field prefix**: `### ` followed by snake_case field name, colon, value. No prose paragraphs inside the block.
- **Lists inside a field**: comma-separated single line, or if long, use `### field_name:` followed by bulleted list underneath (each bullet starts with `- `).
- **Citations inline**: `PMID:XXXXXXXX` format, greppable directly.
- **Evidence grade**: `[Strong]`, `[Moderate]`, `[Weak]`, `[Consensus-based]`, `[Contested]`, `[Emerging]`, `[Historical]`, `[UNVERIFIED]` — always bracketed, always greppable.
- **Controlled vocabulary** (use these terms consistently):
  - Disease state: `flare`, `remission`, `post-resection`, `newly-diagnosed`
  - Severity: `mild`, `moderate`, `severe`, `fulminant`
  - Anatomic: `ileal`, `ileocolonic`, `colonic`, `jejunal`, `duodenal`, `perianal`, `upper-GI`
  - Response: `responder`, `non-responder`, `partial-responder`, `loss-of-response`
- **Consistent field names across files**: don't write `dose_maintenance` in one file and `maintenance_dose` in another.

### Prose is OK for context, structured blocks carry the facts

Each file can have a top-level overview in prose, but the facts a future Claude needs to pull must live in grep-anchored blocks. If a claim matters clinically, it belongs in a structured block.

### Every file must include at top

- **Quick-reference table** — one-line summary of every entity covered, sortable by grep
- **Index of entity blocks** — list of every `## DRUG:` / `## SYMPTOM:` / etc. anchor in the file, so Claude can spot-search

### Bad vs. good

Bad (prose-buried):
> Infliximab is an anti-TNF biologic typically given as 5 mg/kg IV at induction, with doses at weeks 0, 2, and 6, then every 8 weeks for maintenance. Some patients need dose escalation to 10 mg/kg or more frequent dosing...

Good (greppable):
```
## DRUG: infliximab
### dose_induction: 5 mg/kg IV weeks 0, 2, 6
### dose_maintenance: 5 mg/kg IV q8 weeks
### dose_escalation: 10 mg/kg OR q4-6 weeks if loss of response
```

Grep `grep "### dose_induction:" knowledge/` and you get every drug's induction dose in seconds. That's the point.

## The spot-check process

Before any file is marked `research-grade`, I must:
1. Pick 5 random citations from it
2. Search each PMID on PubMed
3. Read the abstract
4. Confirm the claim in the file matches what the abstract actually says (not a stretched interpretation)
5. Document the spot-check results in `knowledge/verification-log.md`

If any citation fails, the file goes back to `working-draft` until every citation is re-verified.

---

*This methodology is the foundation. Every file in this directory is accountable to it.*
