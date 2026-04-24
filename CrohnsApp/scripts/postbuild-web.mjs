#!/usr/bin/env node
/**
 * Post-build step for Expo web export.
 * Injects PWA manifest link, apple-touch-icon, and theme-color meta tags
 * into dist/index.html so Chrome/Edge/Safari offer native "Install" prompts.
 *
 * Expo's static HTML template does not include these tags by default, so we
 * patch the generated index.html after `expo export -p web`.
 */

import { readFile, writeFile, readdir, stat, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Support overriding dist path (used when building to a temp dir to avoid
// OneDrive file locks). Pass the dist path as the first CLI argument.
const distPath = process.argv[2] || join(__dirname, '..', 'dist');
const indexPath = join(distPath, 'index.html');

// ── Rename node_modules → _modules in dist/assets so wrangler pages deploy
//    actually uploads those files. Wrangler hardcodes "node_modules" in its
//    exclusion list and will silently skip any path containing that segment.
//    We then string-replace the JS bundles so the renamed paths resolve.

const WRANGLER_EXCLUDED_SEGMENT = 'node_modules';
const REPLACEMENT_SEGMENT = '_modules';

async function walk(dir) {
  const out = [];
  async function recurse(current) {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = join(current, e.name);
      if (e.isDirectory()) await recurse(p);
      else out.push(p);
    }
  }
  await recurse(dir);
  return out;
}

async function renameNodeModulesInDist() {
  const nmPath = join(distPath, 'assets', WRANGLER_EXCLUDED_SEGMENT);
  try {
    const s = await stat(nmPath);
    if (!s.isDirectory()) return false;
  } catch {
    return false; // Nothing to rename
  }
  const target = join(distPath, 'assets', REPLACEMENT_SEGMENT);
  await rename(nmPath, target);
  return true;
}

async function rewriteJsBundleReferences() {
  const files = await walk(distPath);
  const targets = files.filter(
    (f) => f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.json'),
  );
  let touched = 0;
  for (const f of targets) {
    const content = await readFile(f, 'utf8');
    if (!content.includes(`assets/${WRANGLER_EXCLUDED_SEGMENT}`)) continue;
    const patched = content.replaceAll(
      `assets/${WRANGLER_EXCLUDED_SEGMENT}`,
      `assets/${REPLACEMENT_SEGMENT}`,
    );
    await writeFile(f, patched, 'utf8');
    touched += 1;
  }
  return touched;
}

const PWA_TAGS = `
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#2F6F6A" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="CrohnsApp" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="description" content="Your personal Crohn's disease companion — food scanning, symptom tracking, and evidence-based guidance." />`;

async function main() {
  // 0. Rename assets/node_modules → assets/_modules so wrangler actually
  //    uploads these files (wrangler pages deploy hardcoded-excludes any
  //    path containing "node_modules"). Must happen before the JS bundle
  //    rewrite below, since the rewrite patches references to the new name.
  const renamed = await renameNodeModulesInDist();
  const rewritten = renamed ? await rewriteJsBundleReferences() : 0;
  if (renamed) {
    console.log(`postbuild-web: renamed assets/node_modules → assets/_modules; rewrote ${rewritten} files`);
  }

  let html = await readFile(indexPath, 'utf8');
  const original = html;

  // 1. Swap script tag from `defer` to `type="module"` — required because
  //    Expo SDK 54 web bundle uses `import.meta`, which only works in modules.
  //    Without this, browser throws:
  //      SyntaxError: Cannot use 'import.meta' outside a module
  //    and the app renders as a blank page.
  html = html.replace(/(\sdefer)(>)/g, ' type="module"$2');

  // 2. Inject PWA manifest + apple-touch-icon + theme-color meta tags.
  const PWA_TAGS = `
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#2F6F6A" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="CrohnsApp" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="description" content="Your personal Crohn's disease companion — food scanning, symptom tracking, and evidence-based guidance." />`;

  if (!html.includes('rel="manifest"')) {
    html = html.replace('</head>', `${PWA_TAGS}\n  </head>`);
  }

  if (html === original) {
    console.log('postbuild-web: nothing to patch (already up to date)');
    return;
  }

  await writeFile(indexPath, html, 'utf8');
  const patches = [];
  if (html.includes('type="module"') && !original.includes('type="module"')) patches.push('script→module');
  if (html.includes('rel="manifest"') && !original.includes('rel="manifest"')) patches.push('PWA tags');
  console.log(`postbuild-web: patched (${patches.join(', ')})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
