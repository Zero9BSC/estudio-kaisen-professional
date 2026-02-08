#!/usr/bin/env node
/**
 * SSG Verification Script
 * Run after: npm run build:prerender (or npm run build && npm run prerender)
 *
 * Verifies:
 * - All 4 route HTML files exist
 * - Each file has actual rendered content (not just <div id="root"></div>)
 * - Meta tags (title, description) present
 * - H1 and canonical where expected
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const routes = [
  { path: 'index.html', route: '/', expectText: ['Estudio Kaisen', 'ESTUDIO KAISEN'] },
  { path: 'servicios/index.html', route: '/servicios', expectText: ['Nuestros Servicios', 'Soluciones Integrales', 'Servicios Profesionales'] },
  { path: 'nosotros/index.html', route: '/nosotros', expectText: ['Sobre Nosotros', 'socio estratégico', 'Nuestra Misión'] },
  { path: 'contacto/index.html', route: '/contacto', expectText: ['Contacto', 'éxito empresarial', 'Primera consulta'] }
];

let passed = 0;
let failed = 0;

function check(name, condition, detail = '') {
  if (condition) {
    console.log(`  ✅ ${name}${detail ? ': ' + detail : ''}`);
    passed++;
    return true;
  } else {
    console.log(`  ❌ ${name}${detail ? ': ' + detail : ''}`);
    failed++;
    return false;
  }
}

console.log('\n=== SSG Verification ===\n');

for (const r of routes) {
  const filePath = path.join(distDir, r.path);
  const exists = fs.existsSync(filePath);

  console.log(`Route: ${r.route} (${r.path})`);

  if (!exists) {
    check('File exists', false, 'FILE NOT FOUND');
    console.log('');
    continue;
  }

  check('File exists', true);

  const html = fs.readFileSync(filePath, 'utf-8');

  // Should have more than just the SPA shell (root div with no inner content)
  const hasSubstantialContent = html.length > 500 && !/<div id="root"><\/div>/.test(html);
  check('Has substantial content (>500 chars, not empty root)', hasSubstantialContent, hasSubstantialContent ? `~${html.length} chars` : `only ${html.length} chars or empty root`);

  const hasExpectedText = r.expectText.some((t) => html.includes(t));
  check('Contains expected page text', hasExpectedText, hasExpectedText ? `e.g. "${r.expectText[0]}"` : `missing: ${r.expectText.join(', ')}`);

  const hasTitle = /<title>[^<]+<\/title>/.test(html);
  check('Has <title>', hasTitle);

  const hasMetaDesc = /<meta[^>]+name=["']description["'][^>]+content=/.test(html);
  check('Has meta description', hasMetaDesc);

  if (r.route === '/') {
    const hasH1 = (/<h1/g).test(html);
    check('Has at least one H1', hasH1);
    const hasSchema = (/application\/ld\+json/).test(html);
    check('Has JSON-LD schema', hasSchema);
  }

  if (r.route === '/servicios') {
    const hasCanonical = (/rel=["']canonical["']/).test(html);
    check('Has canonical link', hasCanonical);
  }

  console.log('');
}

console.log('---');
console.log(`Result: ${passed} checks passed, ${failed} failed.\n`);

if (failed > 0) {
  console.log('If prerender did not run: run "npm run build:prerender" or "npm run build" then "npm run prerender".');
  console.log('Prerender uses puppeteer-core + system Chrome.\n');
  process.exit(1);
}

process.exit(0);
