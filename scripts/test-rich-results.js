import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.resolve(__dirname, '..', 'dist', 'index.html');

if (!existsSync(indexPath)) {
  console.log('❌ dist/index.html not found. Run: npm run build');
  process.exit(1);
}

const html = readFileSync(indexPath, 'utf8');

console.log('📋 Google Rich Results Test Preparation');
console.log('='.repeat(50));
console.log('\n1. Go to: https://search.google.com/test/rich-results');
console.log('2. Click "CODE SNIPPET" tab');
console.log('3. Paste the HTML below (or use URL tab with your live site):');
console.log('\n' + '='.repeat(50));
const preview = html.length > 5000 ? html.substring(0, 5000) + '\n... [truncated]' : html;
console.log(preview);
console.log('='.repeat(50));
console.log('\nExpected results:');
console.log('✅ LocalBusiness / ProfessionalService schema detected');
console.log('✅ No critical errors or warnings');
console.log('\nFor contact page: test https://consultorakaisen.com.ar/contacto (URL tab)');
console.log('For services: test https://consultorakaisen.com.ar/servicios (URL tab)');
