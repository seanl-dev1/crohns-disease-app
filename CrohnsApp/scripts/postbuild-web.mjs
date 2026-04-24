#!/usr/bin/env node
/**
 * Post-build step for Expo web export.
 * Injects PWA manifest link, apple-touch-icon, and theme-color meta tags
 * into dist/index.html so Chrome/Edge/Safari offer native "Install" prompts.
 *
 * Expo's static HTML template does not include these tags by default, so we
 * patch the generated index.html after `expo export -p web`.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, '..', 'dist', 'index.html');

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
