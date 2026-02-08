# Troubleshooting

This document lists common issues, causes, and fixes for the Estudio Kaisen site (build, prerender, schema, deployment, tracking).

---

## 1. Build and prerender

### 1.1 No HTML per route after running build:ssg

**Symptom:** You ran `npm run build:ssg` but dist/ does not contain servicios/index.html, nosotros/index.html, contacto/index.html.

**Cause:** `npm run build:ssg` runs only **Vite build (vite.config.cjs) + generate-sitemap.js**. It does **not** run the prerender script. There is no Vite prerender plugin in the project.

**Fix:** Use **`npm run build:prerender`** to produce HTML per route. That command runs Vite build, sitemap generation, then **scripts/prerender-standalone.mjs**. Alternatively: `npm run build && npm run prerender` (prerender only after an existing build).

---

### 1.2 Prerender script fails or times out

**Symptom:** prerender-standalone.mjs exits with an error or never finishes.

**Possible causes and fixes:**

| Cause | Fix |
|-------|-----|
| Chrome/Chromium not found | The project uses **puppeteer-core**; Chromium is not downloaded. Install Chrome or Chromium on the system. On Windows the script checks standard paths; on macOS it checks `/Applications/Google Chrome.app`. Set `CHROME_PATH` or `PUPPETEER_EXECUTABLE_PATH` if the binary is elsewhere. |
| dist/index.html missing | Run `npm run build` first. The prerender script serves dist/ and needs a built SPA. |
| Timeout or slow render | The script waits for an `h1` and network idle. If the app is slow or has JS errors, increase the timeout in prerender-standalone.mjs or fix the app so it renders reliably. |

---

### 1.3 Font preloads return 404 after build

**Symptom:** Browser requests /assets/fonts/inter-latin-400-normal.woff2 (or similar) and gets 404.

**Cause:** If you use **`npm run build:ssg`** (vite.config.cjs), that config does **not** set `assetFileNames` for fonts. Fonts are emitted to `assets/[name]-[hash].woff2` instead of `assets/fonts/`, so the static preload URLs in index.html do not match.

**Fix:** Use **`npm run build`** (vite.config.js) for normal builds; it configures fonts under `assets/fonts/`. If you must use build:ssg, add the same `assetFileNames` (and optionally `chunkFileNames`) from vite.config.js to vite.config.cjs.

---

## 2. Schema and SEO validation

### 2.1 Schema not appearing or “Type: Unknown” in validate:seo

**Symptom:** npm run validate:seo reports “Type: Unknown” for the schema, or the schema seems missing.

**Cause:** The site uses a single JSON-LD block with a **root @graph** (no root @type). The validation script may log `schema['@type']`, which is undefined for @graph. Validation still passes if the JSON is valid.

**Fix:** If the schema is truly missing, ensure index.html contains the `<script type="application/ld+json">` block and that the build does not strip it. Re-run `npm run build` and `npm run verify:schema`. The verify-schema script supports @graph and reports “Block 1 item 1: ProfessionalService” and “Block 1 item 2: Place”.

---

### 2.2 Rich Results Test does not show LocalBusiness

**Symptom:** Google Rich Results Test does not detect LocalBusiness / ProfessionalService.

**Checks:** Validate the JSON-LD in dist/index.html (no trailing commas, valid quotes). Use https://validator.schema.org/ with the @graph JSON. Ensure the live URL is accessible, or use the “Code snippet” tab and paste the HTML.

---

## 3. Deployment and scripts

### 3.1 test:routing fails on Windows

**Symptom:** `npm run test:routing` fails or is not found.

**Cause:** The script is **scripts/test-routing.sh** (bash). It does not run in plain Windows cmd or PowerShell unless bash is available.

**Fix:** Run it in **Git Bash**, or perform the checks manually: ensure dist/ contains index.html, .htaccess, sitemap.xml, and (if you prerendered) servicios/index.html, nosotros/index.html, contacto/index.html.

---

### 3.2 og-image.jpg returns 404

**Symptom:** The og:image URL (e.g. https://consultorakaisen.com.ar/og-image.jpg) returns 404.

**Cause:** index.html (and possibly useMetaTags) references og-image.jpg at the site root. That file is not in **public/** by default, so it is not copied to dist/.

**Fix:** Add **og-image.jpg** to **public/** so it is copied to dist/ root at build time, or change the og:image URL in index.html and useMetaTags to an existing asset (e.g. an image in assets/).

---

## 4. README and legacy references

- **Contact data:** If README still shows placeholder address or phone (e.g. “Calle Falsa 123”, “+54 123 456 789”), update to: 9 de Julio 128, 1° piso A, Trelew; Tel +54 280 442-1137; WhatsApp +54 9 280 436-6867.
- **Structure:** If README lists only Services.jsx for the home services section, note that the hero/carousel is **ServicesGrid.jsx**; add hooks/, utils/, EnhancedSchema, WhatsAppButton if you document the full structure.
- **Badges:** README badge links with double brackets (e.g. `[![React]([https://...`) are invalid; use correct markdown (one `[` for the image URL in the badge).

---

## 5. Tracking (GTM / Google Ads)

### 5.1 GTM not firing

**Checks:** Replace **GTM-XXXXXX** in index.html in **both** places: `data-gtm-id` on `<html>` and `id=` in the noscript iframe. Ensure the GTM container is published and that the snippet loads (e.g. check Network tab for gtm.js).

### 5.2 No conversion in Google Ads

**Checks:** In GTM, confirm the Google Ads Conversion tag uses the correct Conversion ID and Label and is triggered by Custom Event `conversion`. Test by submitting the contact form and using GTM Preview to verify the `conversion` event and tag. Allow 24–48 hours for the conversion to appear in Google Ads.

---

## 6. Last verified

| Item | Status |
|------|--------|
| build:ssg vs build:prerender (no prerender in build:ssg) | Verified |
| prerender-standalone.mjs: Chrome required, no Chromium download | Verified |
| vite.config.cjs: no assetFileNames for fonts | Verified |
| validate-seo and @graph; verify-schema @graph support | Verified |
| test-routing.sh: bash; Windows note | Verified |

**Last verified:** 2025-02-06 (documentation rewrite).
