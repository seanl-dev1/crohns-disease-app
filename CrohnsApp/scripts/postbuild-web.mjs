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
    <meta name="theme-color" content="#4A90E2" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="CrohnsApp" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="description" content="Your personal Crohn's disease companion — food scanning, symptom tracking, and evidence-based guidance." />`;

async function main() {
  const html = await readFile(indexPath, 'utf8');

  if (html.includes('rel="manifest"')) {
    console.log('postbuild-web: PWA tags already present, skipping');
    return;
  }

  // Inject tags just before </head>
  const patched = html.replace('</head>', `${PWA_TAGS}\n  </head>`);

  if (patched === html) {
    throw new Error('postbuild-web: failed to find </head> in dist/index.html');
  }

  await writeFile(indexPath, patched, 'utf8');
  console.log('postbuild-web: PWA tags injected into dist/index.html');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
