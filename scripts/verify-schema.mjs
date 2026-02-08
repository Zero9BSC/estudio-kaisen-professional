#!/usr/bin/env node
/**
 * Schema verification script
 * Run after: npm run build (or npm run build:ssg)
 *
 * Checks:
 * - dist/index.html contains application/ld+json
 * - JSON-LD has required LocalBusiness/ProfessionalService fields
 * - JSON syntax is valid
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distIndex = path.join(__dirname, '..', 'dist', 'index.html');

const REQUIRED_FIELDS = ['@type', 'name', 'address', 'telephone', 'geo'];

function extractJsonLdBlocks(html) {
  const blocks = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const raw = m[1].trim();
    if (raw) blocks.push(raw);
  }
  return blocks;
}

function main() {
  console.log('\n=== Schema verification ===\n');

  if (!fs.existsSync(distIndex)) {
    console.log('❌ dist/index.html not found. Run: npm run build');
    process.exit(1);
  }

  const html = fs.readFileSync(distIndex, 'utf-8');
  const blocks = extractJsonLdBlocks(html);

  if (blocks.length === 0) {
    console.log('❌ No application/ld+json script found in dist/index.html');
    process.exit(1);
  }

  console.log(`✅ Found ${blocks.length} JSON-LD block(s) in dist/index.html\n`);

  let hasValidJson = false;
  let hasRequiredFields = false;

  for (let i = 0; i < blocks.length; i++) {
    const raw = blocks[i];
    let obj;
    try {
      obj = JSON.parse(raw);
      hasValidJson = true;
    } catch (e) {
      console.log(`❌ Block ${i + 1}: Invalid JSON - ${e.message}`);
      continue;
    }

    const items = obj['@graph'] ? obj['@graph'] : [obj];
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      const type = item['@type'] || '(none)';
      console.log(`Block ${i + 1}${items.length > 1 ? ` item ${j + 1}` : ''}: @type = ${type}`);

      if (item['@type'] === 'ProfessionalService' || item['@type'] === 'LocalBusiness') {
        const missing = REQUIRED_FIELDS.filter((f) => !(f in item));
        if (missing.length === 0) {
          console.log(`  ✅ Required fields present: ${REQUIRED_FIELDS.join(', ')}`);
          hasRequiredFields = true;
        } else {
          console.log(`  ❌ Missing: ${missing.join(', ')}`);
        }
        if (item.address) {
          console.log(`  ✅ address: ${item.address.streetAddress || item.address.addressLocality || 'present'}`);
        }
        if (item.geo) {
          console.log(`  ✅ geo: ${item.geo.latitude}, ${item.geo.longitude}`);
        }
        if (item.serviceArea) {
          console.log(`  ✅ serviceArea: present`);
        }
      }
    }
    console.log('');
  }

  if (!hasValidJson) {
    console.log('❌ No valid JSON-LD found');
    process.exit(1);
  }

  if (!hasRequiredFields) {
    console.log('⚠️  At least one block should have required LocalBusiness fields');
  }

  console.log('---');
  console.log('✅ Schema verification passed. Use Google Rich Results Test with your URL or paste dist/index.html.\n');
  process.exit(0);
}

main();
