#!/usr/bin/env node
/**
 * Standalone prerender: after build, serve dist/ and capture HTML per route with Puppeteer.
 * Run: npm run build && npm run prerender
 * Requires: npm install -D puppeteer-core + Chrome/Chromium installed on the system.
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = 37542;
const BASE = `http://localhost:${PORT}`;
const ROUTES = ['/', '/servicios', '/nosotros', '/contacto'];
const RENDER_WAIT_MS = 10000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml'
};

function serveStatic(req, res) {
  let urlPath = req.url?.split('?')[0] || '/';
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(DIST, urlPath);

  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end();
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(path.join(DIST, 'index.html')).pipe(res);
      return;
    }
    const ext = path.extname(filePath);
    const contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer(serveStatic);
    server.listen(PORT, () => resolve(server));
  });
}

function getChromePath() {
  const isWin = process.platform === 'win32';
  if (isWin) {
    const candidates = [
      process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join('C:', 'Program Files', 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join('C:', 'Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe')
    ].filter(Boolean);
    for (const p of candidates) {
      if (fs.existsSync(p)) return p;
    }
    return null;
  }
  if (process.platform === 'darwin') {
    const p = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    return fs.existsSync(p) ? p : null;
  }
  return process.env.CHROME_PATH || process.env.PUPPETEER_EXECUTABLE_PATH || null;
}

async function prerender() {
  let puppeteer;
  try {
    puppeteer = await import('puppeteer-core');
  } catch (e) {
    console.error('❌ puppeteer-core not found. Install with: npm install -D puppeteer-core');
    process.exit(1);
  }

  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('❌ dist/index.html not found. Run: npm run build');
    process.exit(1);
  }

  const executablePath = getChromePath();
  if (!executablePath) {
    console.error('❌ Chrome not found. Install Google Chrome or set CHROME_PATH / PUPPETEER_EXECUTABLE_PATH.');
    process.exit(1);
  }

  const server = await startServer();
  console.log(`\n📦 Prerender: serving dist at ${BASE}\n`);

  const browser = await puppeteer.default.launch({
    headless: true,
    executablePath
  });
  const page = await browser.newPage();

  for (const route of ROUTES) {
    const url = BASE + (route === '/' ? '/' : route);
    const outPath = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.slice(1), 'index.html');

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
      await page.waitForFunction(
        () => document.querySelector('h1')?.textContent?.trim().length > 0,
        { timeout: RENDER_WAIT_MS }
      ).catch(() => null);
      await new Promise((r) => setTimeout(r, 800));
      const html = await page.content();
      const dir = path.dirname(outPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(outPath, html, 'utf8');
      console.log(`  ✅ ${route === '/' ? '/' : route} → ${route === '/' ? 'index.html' : route.slice(1) + '/index.html'}`);
    } catch (err) {
      console.log(`  ❌ ${route}: ${err.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log('\n✅ Prerender done. Ver código fuente en /servicios/ debe mostrar H1 + texto.\n');
}

prerender().catch((e) => {
  console.error(e);
  process.exit(1);
});
