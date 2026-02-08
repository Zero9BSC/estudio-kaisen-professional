#!/usr/bin/env node
/**
 * Optimize hero and normal images for web performance.
 * Converts PNG to WebP: hero < 300 KB, normal < 150 KB.
 * Outputs to src/assets/*.webp. Run: npm run optimize:images (requires: npm i -D sharp)
 */

import { stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, '..', 'src', 'assets');
const HERO_MAX_KB = 300;
const NORMAL_MAX_KB = 150;
const HERO_MAX_WIDTH = 1920;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.error('❌ sharp not found. Install with: npm i -D sharp');
  process.exit(1);
}

async function sizeKB(path) {
  const s = await stat(path);
  return Math.round(s.size / 1024);
}

async function toWebPUnder(inputPath, outputPath, maxKB, maxWidth = null) {
  let pipeline = sharp(inputPath);
  if (maxWidth) pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  for (let q = 82; q >= 50; q -= 10) {
    await pipeline.clone().webp({ quality: q }).toFile(outputPath);
    const kb = await sizeKB(outputPath);
    if (kb <= maxKB) {
      console.log(`  ✅ ${outputPath.split(/[/\\]/).pop()} ${kb} KB (q${q})`);
      return kb;
    }
  }
  const kb = await sizeKB(outputPath);
  console.log(`  ⚠️ ${outputPath.split(/[/\\]/).pop()} ${kb} KB (target ≤${maxKB} KB)`);
  return kb;
}

async function main() {
  const heroImages = ['FOTO1.png', 'FOTO2.png', 'FOTO3.png', 'FOTO4.png'];
  const normalImages = ['logo3.png'];

  console.log('\n📷 Optimizing images (PNG → WebP)\n');

  for (const name of heroImages) {
    const input = join(ASSETS, name);
    const output = join(ASSETS, name.replace('.png', '.webp'));
    try {
      await toWebPUnder(input, output, HERO_MAX_KB, HERO_MAX_WIDTH);
    } catch (e) {
      console.error(`  ❌ ${name}:`, e.message);
    }
  }

  for (const name of normalImages) {
    const input = join(ASSETS, name);
    const output = join(ASSETS, name.replace('.png', '.webp'));
    try {
      await toWebPUnder(input, output, NORMAL_MAX_KB);
    } catch (e) {
      console.error(`  ❌ ${name}:`, e.message);
    }
  }

  console.log('\n✅ Done. Use .webp in components; keep .png for OG/fallback.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
