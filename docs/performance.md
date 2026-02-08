# Performance

This document covers the image strategy, font loading, Core Web Vitals (LCP, CLS, INP), and server caching for the Estudio Kaisen site.

---

## 1. Image strategy

### 1.1 Formats and size limits

| Type | Format | Max size | Location |
|------|--------|----------|----------|
| Hero (carousel) | WebP with PNG fallback | &lt; 300 KB | ServicesGrid (FOTO1–FOTO4) |
| Normal (logo) | WebP with PNG fallback | &lt; 150 KB | Header (logo3) |
| OG / meta | PNG | — | useMetaTags og:image URLs |

### 1.2 Image pipeline (text diagram)

```
Source (src/assets/*.png)
    → prebuild: scripts/optimize-images.mjs (sharp)
        → Output: FOTO1.webp–FOTO4.webp, logo3.webp in src/assets/
    → Vite build
        → Bundled images emitted to dist/assets/ with hash
```

- **Commands:** `npm run optimize:images` (standalone); `npm run build` runs prebuild and thus the image script.
- **First-time setup:** Run `npm run optimize:images` once so dev and build can resolve .webp imports; optionally commit the generated .webp files.

### 1.3 Markup

- **Hero (ServicesGrid):** `<picture>` with `<source type="image/webp">` and `<img>` PNG fallback. Explicit width/height (1200×600). First slide: `loading="eager"`, `fetchPriority="high"`; other slides: `loading="lazy"`. `decoding="async"`.
- **Logo (Header):** `<picture>` WebP + PNG; 56×56; `loading="eager"`.
- **OG images:** PNG URLs in meta tags for broad crawler support.

### 1.4 Lazy loading

- **Above-the-fold:** Logo and first hero slide use `loading="eager"`.
- **Below-the-fold:** Hero slides 2–4 use `loading="lazy"`.

### 1.5 Optional: AVIF

To add AVIF: extend the image script to output .avif and add `<source type="image/avif" srcSet={…}>` before the WebP source in each `<picture>`.

---

## 2. Fonts

### 2.1 Font loading flow (text diagram)

```
index.html
    → <link rel="preload"> for 4 font files (Inter 400 latin + latin-ext, Fraunces 700 latin + latin-ext)
        → Paths: /assets/fonts/[name][extname] (must match vite.config.js assetFileNames)
    → CSS (@fontsource): font-display: swap
    → Vite build
        → Fonts emitted to dist/assets/fonts/ (vite.config.js)
```

- Only primary weights are preloaded to favor LCP. @fontsource uses `font-display: swap` to limit CLS during font swap.

---

## 3. Core Web Vitals

### 3.1 LCP (Largest Contentful Paint)

- **LCP candidate:** First hero image (ServicesGrid).
- **Measures:** First hero image preloaded via component-level preload; `fetchPriority="high"` on the first slide image.
- **GTM:** Loaded after first paint (requestIdleCallback or setTimeout) so it does not block LCP.

### 3.2 CLS (Cumulative Layout Shift)

- **Measures:** Hero section has fixed height; images have explicit width/height; font preload reduces layout shift when fonts load.
- **Fonts:** Preload + font-display: swap to minimize FOUT/CLS.

### 3.3 INP (Interaction to Next Paint)

- **Measures:** State updates for hero card change and mobile menu toggle are wrapped in `startTransition` so the main thread stays responsive.
- **Analytics:** dataLayer pushes (e.g. WhatsApp click) are deferred (e.g. requestAnimationFrame) so the click response is not delayed.

---

## 4. Server caching

- **.htaccess:** Configured so HTML is not cached long-term; static assets (JS, CSS, images, fonts) use long cache with immutable where applicable. Exact directives depend on the deployed .htaccess.

---

## 5. Last verified

| Item | Status |
|------|--------|
| prebuild and optimize-images.mjs (WebP output in src/assets/) | Verified |
| ServicesGrid: picture, first slide eager + fetchPriority, rest lazy | Verified |
| index.html: font preloads for Inter 400 and Fraunces 700 | Verified |
| vite.config.js: assetFileNames for fonts → assets/fonts/ | Verified |
| GTM deferred load in index.html | Verified |
| startTransition usage in ServicesGrid and Header | Verified |

**Last verified:** 2025-02-06 (documentation rewrite).
