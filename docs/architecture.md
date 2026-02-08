# Architecture

This document describes the project structure, technology stack, build pipeline, and runtime behavior of the Estudio Kaisen website.

---

## 1. Technology stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| UI | React 19 | Component-based UI |
| Build | Vite 7 | ESM bundling, dev server, production build |
| Routing | React Router 7 | Client-side routing (/, /servicios, /nosotros, /contacto) |
| Styling | Tailwind CSS 3 | Utility-first CSS |
| Icons | Lucide React | Icon set |
| Forms | @emailjs/browser | Contact form submission |
| Prerender | puppeteer-core | Standalone prerender script (no Vite plugin) |

The application is a single-page application (SPA). Static HTML per route is produced only when you run the prerender script after build.

---

## 2. Build pipeline

### 2.1 Pipeline diagram (text)

**SPA build (`npm run build`):**

```
prebuild (optimize-images.mjs)
    → Vite build (vite.config.js)
        → postbuild (generate-sitemap.js)
            → dist/
```

- **prebuild:** Generates WebP assets in `src/assets/` (hero images, logo). Runs automatically before `vite build`.
- **Vite build:** Bundles JS/CSS, emits `index.html` and `assets/`, runs the copy-htaccess plugin. Fonts go to `assets/fonts/`; other assets to `assets/[name]-[hash][extname]`.
- **postbuild:** Writes `dist/sitemap.xml` from route list and page file mtimes.

**Prerender build (`npm run build:prerender`):**

```
Vite build
    → generate-sitemap.js
        → prerender-standalone.mjs
            → dist/index.html (overwritten) + dist/servicios/index.html, dist/nosotros/index.html, dist/contacto/index.html
```

- Prerender serves `dist/` on a local port, visits each route with Puppeteer, and saves the rendered HTML. Requires Chrome or Chromium installed on the host (puppeteer-core does not bundle Chromium).

### 2.2 Build commands reference

| Command | Behavior |
|--------|----------|
| `npm run build` | SPA: prebuild → Vite build → postbuild. Output: dist/index.html, dist/assets/, dist/sitemap.xml, dist/robots.txt, dist/.htaccess, public assets. |
| `npm run build:prerender` | SPA build + sitemap + prerender script. Writes HTML for /, /servicios, /nosotros, /contacto. Use this for SEO-friendly static HTML per route. |
| `npm run build:ssg` | Vite build with vite.config.cjs + sitemap only. Does **not** run prerender. Produces SPA output only. |
| `npm run prerender` | Runs prerender-standalone.mjs only. Requires an existing dist/ from a prior build. |

---

## 3. Project structure

### 3.1 Directory layout (text diagram)

```
project root
├── index.html                 # Entry HTML; GTM (deferred), meta, JSON-LD @graph
├── public/                    # Static assets copied to dist/ root
│   ├── robots.txt
│   ├── favicon.*, apple-touch-icon.png, site.webmanifest
│   └── (optional: og-image.jpg)
├── src/
│   ├── main.jsx               # React entry
│   ├── App.jsx                 # Router, layout, page_view analytics
│   ├── index.css               # Global styles, Tailwind
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # Hero, ServicesGrid, WhyChoose, ContactSection
│   │   ├── ui/                 # Button, Card, SectionTitle
│   │   ├── EnhancedSchema.jsx  # Page-specific JSON-LD
│   │   └── WhatsAppButton.jsx
│   ├── hooks/
│   │   └── useMetaTags.js      # Per-route title, description, canonical, OG, Twitter
│   ├── utils/
│   │   └── analytics.js       # dataLayer helpers (page_view, conversion, etc.)
│   ├── pages/                  # HomePage, ServicesPage, AboutPage, ContactPage
│   ├── data/
│   │   └── servicesData.js
│   └── assets/                # Images (PNG, WebP); bundled into dist/assets/
├── scripts/
│   ├── optimize-images.mjs    # Prebuild: generate WebP
│   ├── generate-sitemap.js    # Postbuild: dist/sitemap.xml
│   ├── prerender-standalone.mjs
│   ├── verify-schema.mjs
│   ├── verify-ssg.mjs
│   ├── validate-seo.js
│   ├── test-routing.sh
│   └── test-rich-results.js
├── vite.config.js             # ESM; used by npm run build
└── vite.config.cjs            # CJS; used by npm run build:ssg (no prerender)
```

### 3.2 Build output (dist/)

After `npm run build` or `npm run build:prerender`:

| Path | Source |
|------|--------|
| dist/index.html | Vite (injects script/style); overwritten by prerender if build:prerender |
| dist/assets/*.js | Vite (chunks: react-vendor, icons, email, app) |
| dist/assets/*.css | Vite |
| dist/assets/fonts/*.woff2 | Vite (assetFileNames in vite.config.js) |
| dist/assets/*-*.webp, *.png | Vite (hashed from src/assets) |
| dist/sitemap.xml | postbuild script |
| dist/robots.txt | Copied from public/ |
| dist/.htaccess | copy-htaccess plugin |
| dist/favicon.*, site.webmanifest, etc. | Copied from public/ |
| dist/servicios/index.html, dist/nosotros/index.html, dist/contacto/index.html | Only after prerender script |

---

## 4. Request and routing behavior

### 4.1 Runtime flow (text diagram)

**Browser requests a URL (e.g. /servicios):**

1. Server (e.g. Apache with .htaccess) receives the request.
2. If a static file exists for that path (e.g. dist/servicios/index.html after prerender), the server serves it.
3. Otherwise, the server serves dist/index.html (SPA fallback).
4. Browser loads index.html → script(s) load → React mounts → React Router matches path and renders the corresponding page (e.g. ServicesPage).
5. useMetaTags updates document title and meta tags; EnhancedSchema may inject page-specific JSON-LD.

**Result:** With prerender, “View page source” on /servicios shows full HTML. Without prerender, source shows the shell and React hydrates content on the client.

---

## 5. Last verified

| Item | Status |
|------|--------|
| package.json scripts (build, build:prerender, build:ssg, prerender, postbuild, prebuild) | Verified against repository |
| vite.config.js (assetFileNames, chunkFileNames, manualChunks, copy-htaccess) | Verified |
| Prerender: prerender-standalone.mjs, no Vite plugin | Verified |
| dist/ output paths (index.html, assets/, sitemap.xml, robots.txt, .htaccess) | Matches config and scripts |

**Last verified:** 2025-02-06 (documentation rewrite).
