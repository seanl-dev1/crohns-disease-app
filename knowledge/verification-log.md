# Verification Log

Log of spot-checks performed on agent-produced knowledge files. Every PMID listed here was verified by fetching the actual PubMed record and confirming title, authors, year, and that the claim matches the abstract.

If a claim fails verification, it's flagged and the corresponding file is marked `needs-revision`.

## Format

```
- [ISO date] file.md — PMID:NNNNNNNN — [PASS | FAIL | NUANCE] — notes
```

---

## Spot-checks — 2026-04-23

- 2026-04-23 `15-extraintestinal-manifestations.md` — PMID:10648455 (Orchard peripheral arthritis classification) — **NUANCE** — PMID is real and correct paper, but published Feb 2000 in *Gastroenterology*, not 1998 as the file stated. The "Orchard 1998" label likely refers to a different Orchard paper on IBD arthropathies in *Gut*. File needs date correction.
- 2026-04-23 `09-exercise-and-movement.md` — PMID:28378342 (Cramer yoga RCT) — **NUANCE** — PMID is real and correct paper, Cramer et al. 2017 in *Aliment Pharmacol Ther*, but for **ulcerative colitis** not Crohn's disease. File must make UC-specific nature explicit when citing for IBD-wide yoga evidence.
- 2026-04-23 `13-complementary-medicine.md` — PMID:17101300 (Hanai curcumin UC maintenance) — **PASS** — Real paper, Clin Gastroenterol Hepatol 2006, findings match claim (relapse 4.65% curcumin vs 20.51% placebo at 6 months, P=.040). File correctly notes this is UC not CD evidence.
- 2026-04-23 `13-complementary-medicine.md` — PMID:23648372 (Naftali cannabis CD trial 2013) — **PASS** — Real paper, Clin Gastroenterol Hepatol 2013, findings match claim (10/11 on cannabis had clinical response CDAI drop >100 vs 4/10 placebo; primary endpoint of full remission not statistically reached). File correctly distinguishes clinical response from remission.

---

## Required actions from spot-checks

1. Fix date error in `15-extraintestinal-manifestations.md` Orchard reference
2. Ensure `09-exercise-and-movement.md` marks Cramer 2017 as UC-specific, not pan-IBD
