# Production deployment

This document covers the **production deployment** of the Estudio Kaisen site: build process, upload process, cache invalidation, .htaccess role, rollback strategy, CDN compatibility (if added later), plus pre- and post-deploy checklists, prerender verification, and Google Search Console setup.

---

## 1. Build process

### 1.1 Commands

| Command | Output | Use when |
|--------|--------|----------|
| `npm run build` | SPA only (single index.html, client-side routing) | Default production deploy. |
| `npm run build:prerender` | SPA + static HTML per route (/, /servicios, /nosotros, /contacto) | SEO: crawlers and “View source” get full HTML. |

**Do not use `npm run build:ssg` for prerender.** That command runs only Vite build + sitemap; it does **not** run the prerender script. Use `build:prerender` for static HTML per route.

### 1.2 Build pipeline (SPA: `npm run build`)

```
prebuild (npm run prebuild → scripts/optimize-images.mjs)
    → PNG → WebP in src/assets/ (hero ≤300 KB, logo ≤150 KB)
Vite build (vite build)
    → Bundles JS/CSS; emits index.html, assets/*.js, assets/*.css, assets/fonts/*.woff2, assets/*-*.webp, etc.
    → copy-htaccess plugin: copies .htaccess to dist/
postbuild (npm run postbuild → scripts/generate-sitemap.js)
    → Writes dist/sitemap.xml (hostname consultorakaisen.com.ar, 4 URLs)
```

- **prebuild:** Runs automatically before `vite build` (npm lifecycle). Ensures WebP assets exist in `src/assets/` so imports resolve.
- **Vite:** Uses `vite.config.js`. Output directory is `dist/`. Public files (robots.txt, favicons, og-image if present) are copied from `public/` to `dist/` root.
- **postbuild:** Runs automatically after `vite build`. Sitemap is generated from route list and page file mtimes.

### 1.3 Build pipeline (prerender: `npm run build:prerender`)

```
npm run build   (as above: prebuild → Vite → postbuild)
npm run prerender   (scripts/prerender-standalone.mjs)
    → Serves dist/ on local port
    → Launches Chrome (puppeteer-core; Chrome/Chromium must be installed)
    → Visits /, /servicios, /nosotros, /contacto
    → Captures full HTML and writes dist/index.html (/) and dist/<route>/index.html
```

- **Prerender** overwrites `dist/index.html` and creates `dist/servicios/index.html`, `dist/nosotros/index.html`, `dist/contacto/index.html`. All other files (assets, sitemap, .htaccess) are unchanged.

### 1.4 Verification before deploy

- Run **`npm run validate:seo`** — title, meta, canonical, OG, Twitter, H1, schema, viewport, no noindex, content length.
- Run **`npm run verify:schema`** — JSON-LD in dist/index.html is valid and contains ProfessionalService + Place.
- Run **`npm run preview`** — open http://localhost:4173; test /, /servicios, /nosotros, /contacto; images, fonts, contact form, WhatsApp.
- Run **`npm run test:routing`** (or manually check dist/) — index.html, .htaccess, sitemap.xml, robots.txt, assets/; if prerender: servicios/index.html, nosotros/index.html, contacto/index.html.

---

## 2. Upload process

### 2.1 What to deploy

Deploy the **entire contents** of the `dist/` folder. Do **not** deploy `src/`, `node_modules/`, or repo files.

**Always in dist/:**

| Path | Description |
|------|-------------|
| index.html | Entry HTML (and home when prerender) |
| sitemap.xml | Sitemap (postbuild) |
| robots.txt | From public/ |
| .htaccess | From copy-htaccess plugin (see § 5) |
| assets/ | JS, CSS, images, fonts (hashed filenames) |
| Favicons, site.webmanifest, og-image.* | From public/ |

**If you used build:prerender:**

| Path | Description |
|------|-------------|
| servicios/index.html | Prerendered services page |
| nosotros/index.html | Prerendered about page |
| contacto/index.html | Prerendered contact page |

### 2.2 How to upload

- **FTP/SFTP:** Upload all files under `dist/` to the **document root** of the site (e.g. `public_html/` or `htdocs/`). Preserve directory structure (e.g. `assets/`, `servicios/`, etc.).
- **rsync:** Example: `rsync -avz --delete dist/ user@host:/path/to/docroot/` — `--delete` removes server files that no longer exist in dist/ (safe after a full build).
- **Host panel / Git deploy:** If the host supports “upload folder” or “deploy from Git,” deploy the contents of `dist/` only (not the repo root). Ensure `npm run build` or `npm run build:prerender` runs in CI or locally before upload.

### 2.3 Server requirements

- **Web server:** Apache with mod_rewrite (for .htaccess rewrites). Nginx is possible with equivalent config (see § 5 for behavior).
- **HTTPS:** Required. .htaccess forces HTTPS and non-www → https://consultorakaisen.com.ar.

---

## 3. Cache invalidation

### 3.1 Current behavior (no CDN)

- **HTML (index.html and route index.html):** `.htaccess` sets `Cache-Control: no-cache`. Browsers and proxies revalidate on each request; users get fresh HTML after deploy without manual purge.
- **Static assets (JS, CSS, images, fonts):** Filenames include content hashes (e.g. `assets/index-a1b2c3d4.js`). `.htaccess` sets `Cache-Control: public, max-age=31536000, immutable`. Old hashes stop being requested after deploy; new hashes are fetched. No purge needed for assets.

### 3.2 When to “invalidate”

- **HTML:** No action. `no-cache` already forces revalidation.
- **Assets:** No action. New deploy uses new hashes; old URLs 404 or are replaced. If a reverse proxy or host caches by path and does not respect `immutable`, consider purging `/assets/*` after deploy (see § 4).

### 3.3 Host or proxy cache

If the host (or a reverse proxy) caches HTML despite `no-cache`, use the host’s “purge cache” or “clear cache” for the site root and, if prerender, for `/`, `/servicios`, `/nosotros`, `/contacto` after each deploy.

---

## 4. CDN compatibility (if added later)

If a CDN (e.g. Cloudflare, Fastly, AWS CloudFront) is placed in front of the origin:

### 4.1 Origin

- **Origin:** The Apache server (or current host) serving `dist/` with `.htaccess` in place. CDN pulls from this origin.

### 4.2 Cache rules (recommended)

- **HTML:** Cache with short TTL or “bypass cache” / “revalidate every time” so `Cache-Control: no-cache` from origin is honored. Alternatively: short max-age (e.g. 60 s) and purge on deploy.
- **Assets (e.g. /assets/*):** Cache with long TTL (e.g. 1 year). Origin sends `max-age=31536000, immutable`; CDN can cache and serve. No purge needed for hashed assets unless a bug causes wrong caching.

### 4.3 Purge on deploy

- **Purge HTML:** After uploading a new build, purge at least: `/`, `/servicios`, `/nosotros`, `/contacto`, and `/index.html` if the CDN uses that path. Some CDNs support “purge by prefix” (e.g. `/`) or “purge all.”
- **Purge assets (optional):** Usually unnecessary because of hashed URLs. If the CDN is configured to cache aggressively by path and old hashes are still served, purge `/assets/` or the specific new asset URLs.

### 4.4 HTTPS and redirects

- Keep **HTTPS** and **non-www → https://consultorakaisen.com.ar** either at the CDN (recommended) or at the origin. .htaccess already does this at origin; CDN can do the same and forward to origin over HTTPS.

---

## 5. .htaccess role

### 5.1 Placement and copy

- **Source:** Project root `.htaccess`.
- **Deployment:** The Vite plugin `copy-htaccess` in `vite.config.js` copies it to `dist/` in `closeBundle` (after each build). Deploy `dist/` including `dist/.htaccess` so the live site uses it.

### 5.2 Responsibilities

| Area | Role |
|------|------|
| **Encoding** | AddDefaultCharset UTF-8 |
| **Security** | X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS (when HTTPS) |
| **Redirects** | HTTP → HTTPS (301); www.consultorakaisen.com.ar → https://consultorakaisen.com.ar (301) |
| **SPA routing** | `/` → index.html; `/servicios`, `/nosotros`, `/contacto` → corresponding index.html if file exists (prerender); otherwise fallback to index.html with QSA |
| **Trailing slash** | Remove trailing slash (301) for non-directories |
| **Compression** | mod_deflate (gzip) and mod_brotli by type (HTML, CSS, JS, fonts, etc.); Vary Accept-Encoding |
| **Cache** | HTML: Cache-Control no-cache; hashed assets: max-age=31536000, immutable; mod_expires by type |
| **MIME types** | AddType for .js, .css, .webp, .woff, .woff2, etc. |
| **Error pages** | 404 and 500 → /index.html (SPA fallback) |
| **Other** | Options -Indexes; deny access to .htaccess, dotfiles, and sensitive extensions; FileETag None; ServerSignature Off |

### 5.3 Prerender vs SPA fallback

- If `dist/servicios/index.html` exists (after prerender), a request to `/servicios` or `/servicios/` is served that file.
- If it does not exist (SPA-only build), the rewrite falls through to the last rule and serves `index.html` with query string preserved (QSA), so the client router can handle the path.

---

## 6. Rollback strategy

### 6.1 Before deploy

- **Backup:** Keep a copy of the previous `dist/` (e.g. `dist-previous/`) or the Git commit/tag that produced the last good build. Some hosts keep automatic backups of the document root; confirm.

### 6.2 If the new deployment causes issues

1. **Restore files:** Re-upload the previous `dist/` contents (or restore from host backup) so that index.html, .htaccess, sitemap.xml, robots.txt, and assets/ match the last known good version.
2. **Or rebuild from last good commit:** Checkout the last good commit, run `npm run build` or `npm run build:prerender`, then upload the new `dist/` (same as a normal deploy).
3. **Cache:** Clear any host or proxy cache (see § 3). If using a CDN, purge HTML (and if needed assets) as in § 4.
4. **Verify:** Open https://consultorakaisen.com.ar and test /, /servicios, /nosotros, /contacto; check HTTPS and that the correct content is shown.

### 6.3 Post-rollback

- Fix the issue in code or config, run the build and verification steps again (§ 1.4), then redeploy when ready.

---

## 7. Pre-deployment checklist

Complete before uploading dist/ to the server:

- [ ] Run `npm run build` (SPA only) **or** `npm run build:prerender` (SPA + static HTML per route).
- [ ] Run `npm run validate:seo` — critical SEO checks pass.
- [ ] Run `npm run verify:schema` — JSON-LD valid in dist/index.html.
- [ ] Run `npm run preview`; verify home, /servicios, /nosotros, /contacto; images, fonts, contact form, WhatsApp.
- [ ] Run `npm run test:routing` (or manually check dist/) — index.html, .htaccess, sitemap.xml, and if prerender the four HTML files.

---

## 8. Post-deployment verification

After deploy:

- [ ] Open https://consultorakaisen.com.ar over HTTPS; confirm valid SSL (padlock).
- [ ] Test all four routes: /, /servicios, /nosotros, /contacto.
- [ ] View page source — confirm `<title>`, meta description, and `application/ld+json` in `<head>`.
- [ ] Run [Google Rich Results Test](https://search.google.com/test/rich-results) with the live URL.
- [ ] Test on mobile (or Chrome DevTools device mode).
- [ ] Run Lighthouse (Performance, SEO, Accessibility).

---

## 9. Prerender verification (optional)

To obtain static HTML per route:

1. Run **`npm run build:prerender`**. Do **not** use `npm run build:ssg` for prerender.
2. Ensure **Chrome or Chromium** is installed (puppeteer-core does not download Chromium).
3. After the script finishes, run **`npm run verify:ssg`** to confirm all four HTML files exist and contain expected text.
4. Optionally serve dist with `npm run preview` and use “View page source” on each route to confirm full HTML.

---

## 10. Google Search Console

- **Add property:** https://consultorakaisen.com.ar (URL prefix).
- **Verify:** HTML tag in index.html `<meta name="google-site-verification" content="YOUR_CODE" />` (rebuild, redeploy, then Verify in GSC), or DNS TXT.
- **Sitemap:** Sitemaps → Add sitemap: `sitemap.xml` (https://consultorakaisen.com.ar/sitemap.xml).
- **Request indexing:** URL Inspection → enter /, /servicios, /nosotros, /contacto → Request indexing.
- **Settings:** Target country Argentina; preferred domain https://consultorakaisen.com.ar (no www); language Spanish (Argentina).
- **Monitoring:** Coverage, Performance, Core Web Vitals, Mobile usability; optional email alerts.

---

## 11. Monitoring (first 7 days)

- **Daily:** Search Console Coverage and Performance; manual actions and security.
- **Weekly:** Lighthouse audit; analytics (if configured) for traffic and events.

---

## 12. Last verified

| Item | Status |
|------|--------|
| package.json: build, build:prerender, prebuild, postbuild, prerender | Verified |
| build:prerender runs Vite build + sitemap + prerender-standalone.mjs; build:ssg does not prerender | Verified |
| dist/ contents: index.html, sitemap.xml, robots.txt, .htaccess, assets/; prerender adds route index.html | Verified |
| .htaccess: redirects, SPA/prerender routing, cache, compression, security, copy to dist | Verified |
| test:routing: bash script; Windows: use Git Bash or verify dist/ manually | Verified |

**Last verified:** 2025-02-06 (production deployment doc).
