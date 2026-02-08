# Environment configuration

This document describes **environment and configuration** for the Estudio Kaisen site: GTM setup, domain configuration, base URL usage, tracking IDs, and SEO differences between dev and production.

---

## 1. GTM setup

### 1.1 Container ID (where it is set)

The Google Tag Manager container ID is read from the **`VITE_GTM_ID`** environment variable at **build time** and injected into **index.html** in two places by the Vite plugin `inject-gtm-id`. The same ID is used for `data-gtm-id` on `<html>` and for the noscript iframe `id=` parameter.

| Source | When | Where it appears |
|--------|------|------------------|
| **VITE_GTM_ID** (env) | Build time | Replaces placeholder `GTM-XXXXXX` in index.html (`data-gtm-id` and noscript iframe). |
| **Fallback** | If `VITE_GTM_ID` is not set | `GTM-XXXXXX` remains in the built HTML (GTM will not load until you set the env and rebuild). |

**Action:** Set **`VITE_GTM_ID`** in `.env` or `.env.production` (e.g. `VITE_GTM_ID=GTM-ABC1234`). Run `npm run build`; the built `dist/index.html` will contain your container ID in both places. Do not commit the real ID in the repo; use `.env.local` or host/CI env.

### 1.2 Load behavior

- **When:** GTM is loaded **after first paint** via `requestIdleCallback(loadGTM, { timeout: 2000 })` or `setTimeout(loadGTM, 0)` so LCP and INP are not blocked.
- **How:** The inline script in index.html reads `data-gtm-id` from `<html>`, creates `window.dataLayer`, then injects the async `gtm.js` script. All app events are pushed to `window.dataLayer` by `src/utils/analytics.js`; GTM fires tags based on triggers you configure in the GTM UI. **Single source:** Both `data-gtm-id` and the noscript iframe get the same value from the build-time replacement, so the loader and fallback always match.

### 1.3 Env variable for GTM

- **Variable:** `VITE_GTM_ID` (set in `.env`, `.env.local`, `.env.production`, or host/CI).
- **Build:** Vite plugin `inject-gtm-id` runs `transformIndexHtml` and replaces every `GTM-XXXXXX` in index.html with `env.VITE_GTM_ID || 'GTM-XXXXXX'`.
- **Dev vs prod:** Use `.env` for dev and `.env.production` for production build, or set `VITE_GTM_ID` in CI so production builds get the real container ID.

---

## 2. Domain configuration

### 2.1 Canonical domain

The canonical domain is **https://consultorakaisen.com.ar** (no www). All SEO-facing URLs (canonical, og:url, sitemap, schema.org @id) use this domain.

### 2.2 Where the domain is set (no single env)

The domain is **hardcoded** in several places. There is no `VITE_BASE_URL` or `VITE_SITE_URL` yet. To change the domain (e.g. for a new brand or staging), update all of the following:

| File / area | What to change |
|-------------|----------------|
| **index.html** | Canonical `<link>`, og:url, og:image, and the full URLs inside the JSON-LD block (@id, url, logo, image, hasMap, sameAs, etc.). |
| **src/hooks/useMetaTags.js** | Constant `SITE_BASE_URL = 'https://consultorakaisen.com.ar'`. |
| **scripts/generate-sitemap.js** | Constant `HOSTNAME = 'https://consultorakaisen.com.ar'`. |
| **src/components/EnhancedSchema.jsx** | All `@id` values like `'https://consultorakaisen.com.ar/#organization'`. |
| **.htaccess** | Redirect rule: `www.consultorakaisen.com.ar` → `consultorakaisen.com.ar` (and the HTTPS rule if the domain changes). |
| **public/robots.txt** | `Sitemap: https://consultorakaisen.com.ar/sitemap.xml` (if you use a different domain). |
| **scripts/validate-seo.js** | URL used for validation (replace `consultorakaisen.com.ar` with the target domain if needed). |
| **scripts/test-rich-results.js** | Example URLs in console output. |

### 2.3 Optional: single source via env

To drive the domain from one place (e.g. for staging vs prod), you can:

1. Add **`VITE_SITE_BASE_URL`** (or `VITE_BASE_URL`) in `.env` / `.env.production` (e.g. `VITE_SITE_BASE_URL=https://consultorakaisen.com.ar`).
2. In **useMetaTags.js**, set `const SITE_BASE_URL = import.meta.env.VITE_SITE_BASE_URL || 'https://consultorakaisen.com.ar';`.
3. For **index.html** and **sitemap/schema**, you would need build-time replacement (e.g. Vite `define` or a small script that replaces a placeholder in index.html and in the sitemap script). Not implemented in the current repo.

---

## 3. Base URL usage

### 3.1 Runtime (useMetaTags.js)

- **Constant:** `SITE_BASE_URL = 'https://consultorakaisen.com.ar'` (no trailing slash).
- **Used for:**
  - **Canonical:** `canonical.setAttribute('href', SITE_BASE_URL + location.pathname)`.
  - **og:url:** `SITE_BASE_URL + location.pathname`.
  - **og:image / twitter:image:** `routeMeta[path].ogImage`, which is built from `SITE_BASE_URL + '/assets/FOTO1.png'` (and FOTO2–4 per route).

So every client-rendered canonical and OG URL is **base URL + path**. No query string is appended unless the app explicitly adds it.

### 3.2 Build-time (static HTML and scripts)

- **index.html:** Canonical, og:url, og:image, and all JSON-LD URLs are literal `https://consultorakaisen.com.ar/...` in the source. No placeholder or env substitution at build time.
- **scripts/generate-sitemap.js:** `HOSTNAME = 'https://consultorakaisen.com.ar'`; all sitemap `<loc>` values are `HOSTNAME + path`.
- **EnhancedSchema.jsx:** All organization/page `@id` values are literal `https://consultorakaisen.com.ar/#organization` (and similar). These are in the React bundle, so they are the same in dev and prod unless you add env and branch.

### 3.3 Summary

| Use | Source | Example |
|-----|--------|--------|
| Canonical (runtime) | useMetaTags.js `SITE_BASE_URL` | `https://consultorakaisen.com.ar/servicios` |
| og:url (runtime) | useMetaTags.js `SITE_BASE_URL` | Same as canonical |
| og:image (runtime) | useMetaTags.js `SITE_BASE_URL` + asset path | `https://consultorakaisen.com.ar/assets/FOTO1.png` |
| Canonical/og (initial HTML) | index.html literal | `https://consultorakaisen.com.ar/` |
| JSON-LD @id, url, image | index.html + EnhancedSchema.jsx literal | `https://consultorakaisen.com.ar`, `...#organization` |
| Sitemap &lt;loc&gt; | generate-sitemap.js `HOSTNAME` | `https://consultorakaisen.com.ar/servicios/` |

---

## 4. Tracking IDs

### 4.1 GTM container ID

- **Where:** Injected at build time into index.html (`data-gtm-id` and noscript iframe `id=`). Source: **`VITE_GTM_ID`** env variable.
- **Format:** Set `VITE_GTM_ID=GTM-XXXXXX` (your real container ID) in `.env` or `.env.production`. If unset, build keeps placeholder `GTM-XXXXXX` in output.

### 4.2 GA4 / Google Ads (inside GTM)

- **GA4 Measurement ID** (e.g. `G-XXXXXXXXXX`) and **Google Ads Conversion ID + Label** are configured **inside the GTM container**, not in the repo. The app only pushes generic events to `dataLayer` (e.g. `page_view`, `conversion`, `generate_lead`); GTM maps those to GA4 and Google Ads tags.
- **Event names used by the app:**  
  `page_view`, `conversion`, `generate_lead`, `form_submit`, `phone_click`, `whatsapp_click`, plus custom events via `trackEvent(name, params)`.
- **Conversion for contact form:** The app calls `trackContactConversion({ conversion_name: 'contact_form', ... })`, which pushes `conversion` with `conversion_name: 'contact_form'`. In GTM you create a Custom Event trigger for `conversion` (and optionally filter by `conversion_name`) and attach your Google Ads Conversion tag (Conversion ID + Label).

### 4.3 EmailJS (env variables)

Used only for the contact form. Loaded at runtime via Vite env (client-safe).

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_EMAILJS_SERVICE_ID` | Yes (for form) | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Yes (for form) | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Yes (for form) | EmailJS public key |

- **Where used:** `src/components/sections/ContactSection.jsx` (`import.meta.env.VITE_EMAILJS_*`).
- **Set in:** `.env` or `.env.local` (do not commit secrets; add `.env*.local` to `.gitignore`). For production, set in the host or CI env so the build gets the correct values.

### 4.4 Summary

| ID / config | Where set | In repo? |
|-------------|-----------|----------|
| GTM container ID | VITE_GTM_ID (env) → index.html at build | Yes (set in .env; fallback GTM-XXXXXX) |
| GA4 Measurement ID | GTM UI | No |
| Google Ads Conversion ID + Label | GTM UI | No |
| EmailJS service / template / public key | .env or host env | No (only variable names in code) |

---

## 5. SEO environment differences (dev vs prod)

### 5.1 Single build, same URLs everywhere

The project does **not** use different base URLs or canonical URLs for development vs production. The same build is used for both:

- **Development:** `npm run dev` serves the app at e.g. http://localhost:5173. The **canonical and og:url** are still set to **https://consultorakaisen.com.ar** + path (via useMetaTags.js). So when you view the site on localhost, the meta tags and canonical point to production. This is intentional so that crawlers and social scrapers never index localhost or staging URLs.
- **Production:** Same code; the app runs at https://consultorakaisen.com.ar. Canonical and og:url match the actual origin.

### 5.2 Implications

- **Local/staging:** You will see production URLs in “View page source” and in meta tags (canonical, og:url). That is expected. Do not use this build for a public staging domain that you want indexed; if you add a public staging site, consider adding `VITE_SITE_BASE_URL` and using it in useMetaTags + build-time replacement for index.html/sitemap/schema (see § 2.3).
- **Crawlers and rich results:** All links in sitemap, schema, and meta point to https://consultorakaisen.com.ar. No noindex or conditional logic is applied based on NODE_ENV or VITE_* in the current codebase.

### 5.3 GTM in dev vs prod

- The GTM container ID is set via **VITE_GTM_ID** at build time. Use `.env` for dev and `.env.production` for production so you can use different container IDs (e.g. a debug container for dev and the production container for prod). If you do not set `VITE_GTM_ID`, the built HTML keeps the placeholder `GTM-XXXXXX` and GTM will not load until you set the env and rebuild.

---

## 6. File reference

| File | Responsibility |
|------|-----------------|
| index.html | GTM container ID (data-gtm-id + noscript); canonical, og:url, og:image; JSON-LD with full prod URLs. |
| src/hooks/useMetaTags.js | SITE_BASE_URL; canonical and og:url/og:image per route. |
| scripts/generate-sitemap.js | HOSTNAME for sitemap <loc>. |
| src/components/EnhancedSchema.jsx | @id for organization and pages (full prod URL). |
| .htaccess | Redirect www and HTTP to https://consultorakaisen.com.ar. |
| public/robots.txt | Sitemap URL with consultorakaisen.com.ar. |
| src/components/sections/ContactSection.jsx | VITE_EMAILJS_* for form. |
| src/utils/analytics.js | dataLayer events (no IDs; GTM holds GA4/Ads IDs). |

---

## 7. Checklist: going to production

- [ ] Set **VITE_GTM_ID** in `.env` or `.env.production` to your real GTM container ID (e.g. `VITE_GTM_ID=GTM-ABC1234`). Rebuild so `dist/index.html` contains the ID in both `data-gtm-id` and the noscript iframe.
- [ ] Confirm **canonical domain** is correct everywhere (index.html, useMetaTags.js, generate-sitemap.js, EnhancedSchema.jsx, .htaccess, robots.txt) or add VITE_SITE_BASE_URL and build-time replacement if you need env-based domain.
- [ ] Set **VITE_EMAILJS_SERVICE_ID**, **VITE_EMAILJS_TEMPLATE_ID**, **VITE_EMAILJS_PUBLIC_KEY** in production env (or .env.production) and do not commit secrets.
- [ ] In GTM: configure GA4 (page_view, etc.) and Google Ads Conversion tag (e.g. trigger on `conversion` event, conversion_name `contact_form`).
- [ ] Verify canonical and og:url on live site point to https://consultorakaisen.com.ar (no www).

---

## 8. Last verified

| Item | Status |
|------|--------|
| GTM: VITE_GTM_ID → inject-gtm-id plugin → index.html (data-gtm-id + noscript) | Verified |
| SITE_BASE_URL in useMetaTags.js; used for canonical, og:url, ogImage | Verified |
| Domain consultorakaisen.com.ar in index.html, sitemap, schema, .htaccess | Verified |
| Tracking: GTM in HTML; GA4/Ads in GTM; EmailJS via VITE_* in ContactSection | Verified |
| Dev vs prod: same build; canonical always prod URL | Verified |

**Last verified:** 2025-02-06 (env configuration doc).
