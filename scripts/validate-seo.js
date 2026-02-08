import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlFiles = [
  'dist/index.html',
  'dist/servicios/index.html',
  'dist/nosotros/index.html',
  'dist/contacto/index.html'
];

console.log('🔍 SEO VALIDATION REPORT');
console.log('='.repeat(60));
console.log(new Date().toISOString());
console.log('');

let allPassed = true;

htmlFiles.forEach((filePath) => {
  const fullPath = path.resolve(__dirname, '..', filePath);

  if (!existsSync(fullPath)) {
    console.log(`⚠️  ${filePath}: FILE NOT FOUND (skip if SPA-only build)`);
    return;
  }

  const html = readFileSync(fullPath, 'utf8');
  const url = filePath.replace('dist', 'https://consultorakaisen.com.ar').replace('/index.html', '') || 'https://consultorakaisen.com.ar';

  console.log(`\n📄 ${url}`);
  console.log('-'.repeat(40));

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyText = bodyMatch ? bodyMatch[1].replace(/<[^>]*>/g, '') : '';

  const checks = {
    'Has <title> tag': /<title>.*<\/title>/i.test(html),
    'Has meta description': /<meta[^>]*name=["']description["'][^>]*content=["'][^"']*["'][^>]*>/i.test(html),
    'Has canonical URL': /<link[^>]*rel=["']canonical["'][^>]*>/i.test(html),
    'Has Open Graph tags': /<meta[^>]*property=["']og:(title|description|image)["'][^>]*>/i.test(html),
    'Has Twitter Card tags': /<meta[^>]*name=["']twitter:(card|title|description)["'][^>]*>/i.test(html),
    'Has at least one H1': /<h1[^>]*>.*<\/h1>/i.test(html),
    'Has schema.org JSON-LD': /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i.test(html),
    'Has viewport meta tag': /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html),
    'No noindex meta': !/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/i.test(html),
    'Content length > 1000 chars': bodyText.length > 1000
  };

  Object.entries(checks).forEach(([check, passed]) => {
    console.log(passed ? '✅' : '❌', check);
    if (!passed) allPassed = false;
  });

  const schemaMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
  if (schemaMatch) {
    try {
      const schema = JSON.parse(schemaMatch[1].trim());
      console.log('✅ Schema.org JSON-LD: Valid JSON');
      console.log(`   Type: ${schema['@type'] || 'Unknown'}`);
    } catch (e) {
      console.log('❌ Schema.org JSON-LD: Invalid JSON');
      allPassed = false;
    }
  } else {
    console.log('⚠️  No schema.org JSON-LD block found');
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    console.log(`📝 Title: ${title.length > 60 ? title.substring(0, 60) + '...' : title}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(allPassed ? '🎉 ALL CHECKS PASSED' : '⚠️  SOME CHECKS FAILED');
console.log('='.repeat(60));

process.exit(allPassed ? 0 : 1);
