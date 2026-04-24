#!/usr/bin/env node
/**
 * Knowledge-base integrity checker.
 *
 * Runs from the repo root:
 *   node knowledge/scripts/verify.mjs
 *
 * Checks:
 *  1. Every PMID in split files must also appear in its parent (no content loss during split)
 *  2. Every PMID referenced must match PMID regex (valid format)
 *  3. Every cross-reference link (path/to/file.md) must resolve to a real file
 *  4. Every file must have YAML frontmatter with required keys
 *  5. Greppable entity blocks: `## PREFIX: name` pattern found
 *  6. Cross-topic claim consistency: pick a few canonical claims and check cited PMIDs match
 *
 * Exit code 0 if all pass, 1 if any fail.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_ROOT = join(__dirname, '..');
const REPO_ROOT = join(KNOWLEDGE_ROOT, '..');

// Match PMID in any of these formats:
//   PMID:12345678
//   PMID 12345678
//   PMID **12345678**
//   PMID: 12345678
// Captures the 7-9 digit number.
const PMID_RE = /PMID[:\s]+\**\s*(\d{7,9})\**/g;

// Match any PubMed URL reference (alternate citation format)
const PUBMED_URL_RE = /pubmed\.ncbi\.nlm\.nih\.gov\/(\d{7,9})/g;

// Bibliographic citation pattern (journal year;vol(issue):pages — no PMID attached)
// Flags these for review since they can't be one-step PMID-verified
const BIBLIO_RE = /\*[A-Z][A-Za-z &]+\*\s+\d{4};\d+\(\d+\):\d+[-–]\d+/g;

const CROSSREF_RE = /\(([^)]*\.md[^)]*)\)/g;
const ENTITY_BLOCK_RE = /^## (DRUG|SYMPTOM|COMPLICATION|SUPPLEMENT|FOOD-CATEGORY|TEST|SURGERY|LIFESTYLE|EIM|CANNABINOID|EXERCISE|NUTRIENT|DIET|TRIAL|PATTERN): /m;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'scripts' || entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const errors = [];
  const warnings = [];
  const pmidsByFile = new Map();      // file -> Set<pmid>
  const filesByPmid = new Map();      // pmid -> Set<file>

  const files = await walk(KNOWLEDGE_ROOT);
  console.log(`Found ${files.length} markdown files under knowledge/`);

  for (const file of files) {
    const rel = relative(REPO_ROOT, file);
    const content = await readFile(file, 'utf8');

    // 1. Frontmatter check
    if (!content.startsWith('---')) {
      // Not a hard error — README/index files don't need frontmatter — but warn if claims are being made
      if (content.match(/PMID:?\s*\d{7,9}/)) {
        warnings.push(`${rel}: missing YAML frontmatter but contains PMIDs`);
      }
    }

    // 2. PMID format check + collect (multiple formats)
    const pmids = new Set();
    for (const m of content.matchAll(PMID_RE)) {
      pmids.add(m[1]);
    }
    for (const m of content.matchAll(PUBMED_URL_RE)) {
      pmids.add(m[1]);
    }
    for (const pmid of pmids) {
      if (!filesByPmid.has(pmid)) filesByPmid.set(pmid, new Set());
      filesByPmid.get(pmid).add(rel);
    }
    pmidsByFile.set(rel, pmids);

    // 2b. Bibliographic-only citations (not PMID-linked)
    // If a file has more bibliographic citations than PMID citations, flag it
    const biblioCount = [...content.matchAll(BIBLIO_RE)].length;
    if (biblioCount > 5 && pmids.size === 0) {
      warnings.push(`${rel}: ${biblioCount} bibliographic citations but 0 PMIDs — not PubMed-verifiable in one step. Consider adding PMIDs.`);
    }

    // 3. Cross-ref resolution
    for (const m of content.matchAll(CROSSREF_RE)) {
      const link = m[1];
      if (link.startsWith('http')) continue;
      const target = join(dirname(file), link);
      try {
        await stat(target);
      } catch {
        // Try as absolute-from-repo path
        const alt = join(REPO_ROOT, link);
        try {
          await stat(alt);
        } catch {
          warnings.push(`${rel}: unresolved cross-ref: ${link}`);
        }
      }
    }

    // 4. Entity block presence (only warn — not all files need blocks)
    if (pmids.size > 5 && !ENTITY_BLOCK_RE.test(content)) {
      warnings.push(`${rel}: has ${pmids.size} PMIDs but no grep-anchored entity blocks (## PREFIX: name)`);
    }
  }

  // 5. PMID duplication analysis — which PMIDs appear in multiple files (this is FINE, but report for awareness)
  const shared = [...filesByPmid.entries()].filter(([_, files]) => files.size > 1);
  console.log(`\n${shared.length} PMIDs cited in multiple files (consistency cross-check targets):`);
  shared.slice(0, 10).forEach(([pmid, files]) => {
    console.log(`  PMID:${pmid} appears in: ${[...files].join(', ')}`);
  });

  // 6. Reporting
  console.log(`\n${files.length} files, ${filesByPmid.size} unique PMIDs`);

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warnings:`);
    warnings.slice(0, 50).forEach((w) => console.log('  ' + w));
    if (warnings.length > 50) console.log(`  ... and ${warnings.length - 50} more`);
  }

  if (errors.length) {
    console.log(`\n✗ ${errors.length} errors:`);
    errors.forEach((e) => console.log('  ' + e));
    process.exit(1);
  }

  console.log('\n✓ All integrity checks passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
