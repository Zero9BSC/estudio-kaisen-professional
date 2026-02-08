/**
 * Generate sitemap.xml with SEO signals:
 * - lastmod from page file mtime (or build date)
 * - changefreq per page type
 * - priority hierarchy (home > services > contact > about)
 * - Standard namespace http://www.sitemaps.org/schemas/sitemap/0.9
 */

import { SitemapStream } from 'sitemap';
import { createWriteStream, statSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HOSTNAME = 'https://consultorakaisen.com.ar';
const SRC = resolve(__dirname, '..', 'src');
const DIST = resolve(__dirname, '..', 'dist');

function toLastmodDate(date) {
  return date.toISOString().slice(0, 10);
}

function getLastmodForPage(pagePath) {
  const fullPath = resolve(SRC, 'pages', pagePath);
  if (existsSync(fullPath)) {
    try {
      const mtime = statSync(fullPath).mtime;
      return toLastmodDate(mtime);
    } catch (_) {}
  }
  return toLastmodDate(new Date());
}

const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: getLastmodForPage('HomePage.jsx')
  },
  {
    url: '/servicios/',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: getLastmodForPage('ServicesPage.jsx')
  },
  {
    url: '/nosotros/',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: getLastmodForPage('AboutPage.jsx')
  },
  {
    url: '/contacto/',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: getLastmodForPage('ContactPage.jsx')
  }
];

const sitemap = new SitemapStream({
  hostname: HOSTNAME,
  lastmodDateOnly: true
});

const outPath = resolve(DIST, 'sitemap.xml');
const writeStream = createWriteStream(outPath);

sitemap.pipe(writeStream);

for (const route of routes) {
  sitemap.write(route);
}

sitemap.end();

await new Promise((resolve, reject) => {
  writeStream.on('finish', () => {
    console.log('✅ Sitemap generated at dist/sitemap.xml');
    resolve();
  });
  writeStream.on('error', reject);
});
