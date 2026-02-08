# Performance engineering (implementation)

This document describes the **actual performance optimizations** implemented in the codebase: bundle strategy, font loading, image optimization, caching, compression, and Core Web Vitals targets.

---

## 1. Bundle strategy

### 1.1 Build tool and output

- **Tool:** Vite 7 with Rollup for production builds.
- **Entry:** Single entry `index.html` → `/src/main.jsx`. No multi-page split; SPA with client-side routing.

### 1.2 Manual chunks (Vite/Rollup)

Defined in `vite.config.js` (and `vite.config.cjs` for SSG) under `build.rollupOptions.output`:

| Chunk name      | Contents                          | Purpose                                      |
|-----------------|-----------------------------------|----------------------------------------------|
| **react-vendor**| react, react-dom, react-router-dom| Core runtime; cached across deploys.         |
| **icons**       | lucide-react                      | Icon library; separate to avoid bloating app.|
| **email**       | @emailjs/browser                  | Contact form; loaded only on /contacto.       |

- **Chunk filenames:** `assets/[name]-[hash].js` so each chunk is cacheable by content hash.
- **Asset filenames:** Fonts → `assets/fonts/[name][extname]`; other assets → `assets/[name]-[hash][extname]`.

### 1.3 Route-level code splitting

- **Home:** `HomePage` is imported statically (above-the-fold).
- **Other routes:** `ServicesPage`, `AboutPage`, `ContactPage` are loaded via `React.lazy()` in `App.jsx`. Each route is a separate JS chunk loaded on first navigation to that path.
- **Suspense:** All lazy routes are wrapped in `<Suspense fallback={<PageFallback />}>`. Fallback is a minimal “Cargando…” placeholder to avoid layout jump (CLS).

### 1.4 Minification and dead code

- **Minifier:** `terser` (production only).
- **Options:** `compress: { drop_console: true, drop_debugger: true }` so `console.*` and debugger statements are removed in build output.

### 1.5 File reference

| File            | Responsibility |
|-----------------|----------------|
| `vite.config.js` | manualChunks, chunkFileNames, assetFileNames, minify terser, copy .htaccess. |
| `vite.config.cjs` | Same for SSG/build:ssg. |
| `src/App.jsx`   | React.lazy for ServicesPage, AboutPage, ContactPage; Suspense + PageFallback. |

---

## 2. Font loading

### 2.1 Font stack

- **Families:** Inter (body), Fraunces (headings). Only **latin** and **latin-ext** subsets (Spanish site).
- **Source:** `@fontsource/inter` and `@fontsource/fraunces`; imported in `src/index.css` for the weights in use (300–700). Vite bundles them; output filenames controlled by `assetFileNames` (fonts → `assets/fonts/`).

### 2.2 Preload (critical path)

- **Where:** `index.html` in `<head>`.
- **What:** Four `<link rel="preload">` tags for the primary above-the-fold weights only:
  - `inter-latin-400-normal.woff2`
  - `inter-latin-ext-400-normal.woff2`
  - `fraunces-latin-700-normal.woff2`
  - `fraunces-latin-ext-700-normal.woff2`
- **Attributes:** `as="font"`, `type="font/woff2"`, `crossorigin` (required for font preload).
- **Paths:** `/assets/fonts/[name][extname]` — must match Vite `assetFileNames` so dev and production resolve correctly. Other weights (300, 500, 600) are not preloaded to keep LCP and first-byte priority on primary text.

### 2.3 Font-display

- **Mechanism:** Each `@fontsource` CSS file defines `@font-face` with `font-display: swap` (documented in `src/index.css` comment). No custom override in project.
- **Effect:** Text renders immediately with fallback; swap happens when the font loads to limit CLS and avoid invisible text.

### 2.4 File reference

| File          | Responsibility |
|---------------|----------------|
| `index.html`  | Preload links for 4 primary font files. |
| `src/index.css` | @fontsource imports (all weights); font-display: swap via package. |
| `vite.config.js` | assetFileNames: fonts → `assets/fonts/[name][extname]`. |

---

## 3. Image optimization

### 3.1 Pipeline and script

- **Script:** `scripts/optimize-images.mjs` (Node, ESM). Uses **sharp** to convert PNG → WebP.
- **When:** Run manually with `npm run optimize:images`, or automatically in **prebuild** (before `vite build`). No image step in `postbuild` (postbuild is sitemap only).
- **Input:** `src/assets/` — source PNGs (FOTO1–FOTO4, logo3.png).
- **Output:** WebP files written next to source in `src/assets/` (e.g. FOTO1.webp, logo3.webp). Vite then bundles both PNG and WebP; components import both and use `<picture>`.

### 3.2 Size and format rules

| Type   | Files              | Max size | Max width | Quality loop      |
|--------|--------------------|----------|-----------|-------------------|
| Hero   | FOTO1–FOTO4.png    | 300 KB   | 1920 px   | WebP q 82→50 step 10 |
| Normal | logo3.png          | 150 KB   | —         | Same              |

- Resize: only for hero (max width 1920, no upscale). Logo is not resized.
- Format: WebP only from script; PNG kept for fallback and OG/meta (e.g. og-image.jpg is separate).

### 3.3 Markup (ServicesGrid and hero)

- **Element:** `<picture>` with one `<source type="image/webp">` and one `<img>` (PNG fallback).
- **Dimensions:** Explicit `width={1200}` and `height={600}` on all hero images (HERO_WIDTH / HERO_HEIGHT) to avoid CLS.
- **Decoding:** `decoding="async"` on all hero and logo images.
- **Loading:**
  - First hero slide (index 0): `loading="eager"`, `fetchPriority="high"`.
  - Other hero slides (2–4): `loading="lazy"`.
- **LCP preload:** In `ServicesGrid.jsx`, a `useLayoutEffect` injects a `<link rel="preload" as="image">` for the first hero WebP (FOTO1webp) so the browser discovers it early. The link is removed on unmount.

### 3.4 Logo (Header)

- **Markup:** `<picture>` with WebP source and PNG fallback; dimensions 56×56; `loading="eager"` (above-the-fold).

### 3.5 File reference

| File                        | Responsibility |
|-----------------------------|----------------|
| `scripts/optimize-images.mjs` | Sharp pipeline: PNG→WebP, size/width limits, output in src/assets/. |
| `package.json`              | `optimize:images`, `prebuild` → optimize-images. |
| `src/components/sections/ServicesGrid.jsx` | picture, dimensions, eager/lazy, fetchPriority, preload for first hero. |
| Header component            | Logo picture, 56×56, eager. |

---

## 4. Caching

### 4.1 Server-side (Apache .htaccess)

- **Deployment:** `.htaccess` is copied to `dist/` by the Vite plugin `copy-htaccess` in `closeBundle`. Same file used for local Apache and production.

### 4.2 HTML (index and prerendered pages)

- **Rule:** `<FilesMatch "\.(html)$">` → `Cache-Control: no-cache`.
- **Effect:** HTML is revalidated on each request (no long-term cache). Ensures users and crawlers get updated markup and canonical/meta after deploys.

### 4.3 Static assets (hashed)

- **Rule:** `FilesMatch` for extensions: `.css`, `.js`, `.woff2?`, `.ttf`, `.otf`, `.eot`, `.png`, `.jpe?g`, `.gif`, `.webp`, `.svg`, `.ico`.
- **Header:** `Cache-Control: public, max-age=31536000, immutable`.
- **Expires:** `mod_expires` sets `ExpiresByType` to 1 year for CSS, JS, images, fonts; 1 day for JSON/XML.
- **Rationale:** Vite emits filenames with content hashes; immutable long cache is safe and reduces repeat loads.

### 4.4 File reference

| File        | Responsibility |
|-------------|----------------|
| `.htaccess` | FilesMatch .html → no-cache; FilesMatch assets → max-age=31536000, immutable; ExpiresByType. |
| `vite.config.js` | copy-htaccess plugin copies .htaccess to dist/. |

---

## 5. Compression

### 5.1 Build-time (Vite)

- **JS/CSS:** Minification only (terser for JS; Vite’s default for CSS). No gzip/brotli generation in the build; compression is left to the server.

### 5.2 Server-side (Apache .htaccess)

- **Gzip (mod_deflate):** Enabled for:
  - text/html, text/css, text/javascript, application/javascript, application/x-javascript
  - application/json, application/xml, text/xml, image/svg+xml, image/x-icon
  - font/woff, font/woff2, application/vnd.ms-fontobject, application/x-font-ttf, application/x-font-otf, application/x-font-woff, application/x-font-woff2
- **Brotli (mod_brotli):** If available, applied to the same text/CSS/JS/JSON/XML/svg types and font types. No precompressed .br files in repo; on-the-fly only.
- **Vary:** `Header append Vary Accept-Encoding` so caches store separate variants for gzip/brotli vs identity.

### 5.3 File reference

| File        | Responsibility |
|-------------|----------------|
| `.htaccess` | mod_deflate (gzip) and mod_brotli (if loaded) by type; Vary Accept-Encoding. |
| `vite.config.js` | terser compress (drop_console, drop_debugger); no compression plugins. |

---

## 6. Core Web Vitals targets

### 6.1 LCP (Largest Contentful Paint)

- **Target:** First hero image (ServicesGrid) is the main LCP candidate.
- **Measures implemented:**
  - **Preload:** Component-level `<link rel="preload" as="image">` for the first hero WebP (ServicesGrid `useLayoutEffect`).
  - **Priority:** First slide `<img>` has `loading="eager"` and `fetchPriority="high"`.
  - **Format:** WebP with sharp pipeline (hero ≤300 KB, max width 1920) to keep transfer small.
  - **Third-party:** GTM is not loaded at parse time. The inline script in `index.html` schedules GTM via `requestIdleCallback(loadGTM, { timeout: 2000 })` or `setTimeout(loadGTM, 0)`, so LCP is not blocked by gtm.js.

### 6.2 CLS (Cumulative Layout Shift)

- **Target:** Minimize layout shift from images, fonts, and UI.
- **Measures implemented:**
  - **Images:** Explicit width/height (1200×600) on all hero images; hero section has fixed height (e.g. `h-[600px]`).
  - **Fonts:** Preload of primary fonts + `font-display: swap` to reduce FOUT/CLS.
  - **UI:** No layout-dependent insertion of above-the-fold content without dimensions; toast animation noted in CSS as “CLS: avoid styled-jsx; single paint”.
  - **Lazy routes:** Suspense fallback is a simple placeholder so route switch does not cause large shift.

### 6.3 INP (Interaction to Next Paint)

- **Target:** Keep main thread responsive after user input.
- **Measures implemented:**
  - **State updates:** Hero card change (desktop) and mobile menu toggle use `startTransition` (ServicesGrid onClick/onKeyDown/onMouseEnter; Header onToggle/onClose) so React schedules non-urgent updates without blocking input.
  - **Analytics:** Clicks (e.g. WhatsApp, phone) push to dataLayer in a deferred way (e.g. `requestAnimationFrame` or similar in analytics.js) so the click response is not delayed by third-party script.

### 6.4 File reference

| File / area       | Responsibility |
|-------------------|----------------|
| `index.html`      | GTM deferred (requestIdleCallback/setTimeout); font preloads. |
| `src/components/sections/ServicesGrid.jsx` | Hero image preload, eager + fetchPriority first slide, startTransition for card change. |
| `src/components/layout/Header.jsx` | startTransition for menu open/close. |
| `src/utils/analytics.js` | Deferred dataLayer pushes for click handlers. |
| `src/index.css`   | font-display via @fontsource; CLS note for toast. |

---

## 7. Summary table

| Area              | Implementation summary |
|-------------------|------------------------|
| **Bundle**        | manualChunks (react-vendor, icons, email); React.lazy + Suspense for /servicios, /nosotros, /contacto; terser drop_console/drop_debugger. |
| **Fonts**         | Preload 4 primary woff2 in index.html; @fontsource with font-display: swap; fonts in assets/fonts/. |
| **Images**        | prebuild optimize-images.mjs (WebP, hero ≤300 KB, logo ≤150 KB); picture + eager/lazy + fetchPriority; hero preload in ServicesGrid. |
| **Caching**      | HTML no-cache; hashed assets Cache-Control max-age=31536000 immutable; .htaccess in dist. |
| **Compression**   | Server-only: mod_deflate (gzip) and mod_brotli by type; Vary Accept-Encoding. |
| **LCP**           | First hero preload + eager + fetchPriority high; GTM deferred. |
| **CLS**           | Explicit image dimensions; fixed hero height; font preload + swap. |
| **INP**           | startTransition for hero and menu; deferred analytics on click. |

---

## 8. Last verified

| Item | Status |
|------|--------|
| vite.config.js manualChunks, chunkFileNames, assetFileNames, terser | Verified |
| App.jsx React.lazy + Suspense for ServicesPage, AboutPage, ContactPage | Verified |
| index.html font preload (4), GTM deferred (requestIdleCallback/setTimeout) | Verified |
| ServicesGrid: picture, preload first hero, eager/fetchPriority first, lazy rest, 1200×600 | Verified |
| Header/analytics: startTransition, deferred dataLayer | Verified |
| .htaccess: no-cache HTML, immutable assets, mod_deflate, mod_brotli | Verified |
| optimize-images.mjs: hero 300 KB/1920 px, normal 150 KB, prebuild | Verified |

**Last verified:** 2025-02-06 (performance implementation doc).
