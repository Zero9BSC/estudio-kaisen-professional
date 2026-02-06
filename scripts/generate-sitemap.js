import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/servicios/', changefreq: 'weekly', priority: 0.9 },
  { url: '/nosotros/', changefreq: 'monthly', priority: 0.7 },
  { url: '/contacto/', changefreq: 'monthly', priority: 0.8 }
];

const sitemap = new SitemapStream({
  hostname: 'https://consultorakaisen.com.ar'
});

const writeStream = createWriteStream(resolve(__dirname, '../dist/sitemap.xml'));

sitemap.pipe(writeStream);

routes.forEach(route => {
  sitemap.write(route);
});

sitemap.end();

console.log('✅ Sitemap generated successfully at dist/sitemap.xml');
