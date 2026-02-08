# Technical SEO implementation

This document describes the actual SEO implementation in the codebase: structured data, meta management, sitemap, robots, local signals, indexation control, and compatibility with future advertising (Google Ads).

---

## 1. Structured data system

### 1.1 Architecture

Structured data is split into **static** (in HTML) and **dynamic** (injected by React).

| Layer | Location | Content | Crawler visibility |
|-------|----------|---------|---------------------|
| **Static** | `index.html` | Single `<script type="application/ld+json">` with root **@graph** | Always visible (no JS required) |
| **Dynamic** | `src/components/EnhancedSchema.jsx` | Page-specific schemas injected on route change | Visible only when JS runs (or in prerendered HTML) |

**Single source of truth for organization:** The ProfessionalService and Place nodes live only in `index.html`. EnhancedSchema does **not** duplicate them; it references the organization via `@id: "https://consultorakaisen.com.ar/#organization"` in page-level schemas.

### 1.2 Static schema (index.html)

- **Format:** One JSON-LD block; root object has **@context** and **@graph** (array).
- **@graph contents:**
  1. **ProfessionalService** (`#organization`): name, alternateName, description, url, logo, image, telephone, email, address (PostalAddress), geo (GeoCoordinates), hasMap, containedInPlace → #trelew, areaServed (Country, AdministrativeArea, City + city names), serviceArea (Country, Chubut, Patagonia Argentina, City Trelew), priceRange, openingHoursSpecification, sameAs (Google Maps, Facebook, Instagram, LinkedIn).
  2. **Place** (`#trelew`): name "Trelew, Chubut, Patagonia Argentina", address (locality, region, country), geo, containedInPlace (Chubut, Argentina).

### 1.3 Dynamic schema (EnhancedSchema.jsx)

- **Trigger:** `useEffect` on `location.pathname`; injects or removes page-specific scripts.
- **Script IDs:** `schema-page-0`, `schema-page-1`, … (old scripts with `id^="schema-page-"` are removed before re-inject to avoid duplicates).
- **Per route:**
  - **/** (home): ItemList of 4 Service items, each with `provider: { "@id": "…#organization" }`.
  - **/servicios:** CollectionPage with mainEntity ItemList (4 Service items, serviceType, areaServed).
  - **/nosotros:** AboutPage with mainEntity `{ "@id": "…#organization" }`.
  - **/contacto:** ContactPage with mainEntity `{ "@id": "…#organization" }`.

### 1.4 Validation

- **Script:** `npm run verify:schema` (`scripts/verify-schema.mjs`) parses JSON-LD in dist/index.html, supports @graph, and checks required LocalBusiness/ProfessionalService fields.
- **Manual:** [Rich Results Test](https://search.google.com/test/rich-results), [Schema Validator](https://validator.schema.org/).

---

## 2. Meta management system

### 2.1 Baseline (index.html)

The entry HTML provides **default meta** for the home page so crawlers that do not execute JavaScript still receive:

- **Standard:** `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical" href="https://consultorakaisen.com.ar/">`.
- **Open Graph:** og:type, og:locale, og:site_name, og:title, og:description, og:url, og:image (absolute URL).
- **Twitter Card:** twitter:card (summary_large_image), twitter:title, twitter:description.
- **Geo:** geo.region (AR-U), geo.placename (Trelew, Chubut), geo.position.

All values are CTR- and local-SEO aligned (title &lt; 60 chars, description 140–155 chars, local keywords).

### 2.2 Per-route updates (useMetaTags.js)

- **Trigger:** `useEffect` on `location.pathname`; reads from a **routeMeta** map keyed by path.
- **Updated elements:** `document.title`; meta name="description", name="keywords"; meta property="og:title", "og:description", "og:url", "og:image"; meta name="twitter:title", "twitter:description", "twitter:image"; link rel="canonical". Geo tags (geo.region, geo.placename, geo.position) are set to the same values on every route.
- **URLs:** Canonical and og:url use `SITE_BASE_URL` + current pathname. og:image and twitter:image use absolute URLs from `routeMeta[path].ogImage` (SITE_BASE_URL + asset path).
- **Route map:** `/`, `/servicios`, `/nosotros`, `/contacto`; fallback is `/` if path is unknown.

### 2.3 Constraints (current copy)

- Title: under 60 characters; description: 140–155 characters; emotional/trust triggers; local intent (Trelew, Chubut, Patagonia). Up to 8 keywords per page.

---

## 3. Sitemap strategy

### 3.1 Generation

- **When:** Postbuild (after Vite build). Script: `scripts/generate-sitemap.js`.
- **Output:** `dist/sitemap.xml`.
- **Library:** `sitemap` (SitemapStream); namespace `http://www.sitemaps.org/schemas/sitemap/0.9`.
- **Hostname:** `https://consultorakaisen.com.ar` (hardcoded in script).

### 3.2 URLs and signals

| URL | changefreq | priority | lastmod |
|-----|------------|----------|--------|
| / | weekly | 1.0 | mtime of `src/pages/HomePage.jsx` or build date |
| /servicios/ | weekly | 0.9 | mtime of ServicesPage.jsx |
| /nosotros/ | monthly | 0.7 | mtime of AboutPage.jsx |
| /contacto/ | monthly | 0.8 | mtime of ContactPage.jsx |

- **lastmod:** Date only (YYYY-MM-DD). Sourced from corresponding page file mtime in `src/pages/`; fallback to current date if file missing.
- **Trailing slash:** Sitemap uses trailing slashes for path URLs (e.g. `/servicios/`). Canonical and site use the same path style for consistency.

### 3.3 Discovery

- **robots.txt** includes `Sitemap: https://consultorakaisen.com.ar/sitemap.xml` so crawlers discover the sitemap without a link in HTML.

---

## 4. Robots strategy

### 4.1 File and placement

- **Source:** `public/robots.txt`.
- **Deployment:** Copied to `dist/` root by Vite (public assets). No build-time modification.

### 4.2 Rules

| Directive | Value | Purpose |
|-----------|--------|---------|
| User-agent | * | Applies to all crawlers. |
| Allow | /, /servicios, /nosotros, /contacto, /assets/ | Explicit allow of main sections and static assets. |
| Disallow | /api/, /node_modules/, /src/, /*.map$ | Block build/internal paths if ever exposed. |
| Sitemap | https://consultorakaisen.com.ar/sitemap.xml | Required; sitemap discovery. |

Optional `Crawl-delay` is commented out (Bing supports it; Google ignores it). Uncomment only if throttling is needed.

---

## 5. Local SEO signals

### 5.1 Schema (static)

- **ProfessionalService:** address (Trelew, Chubut, U9100, AR), geo (office coordinates), hasMap (Google Maps URL), containedInPlace → Place #trelew, areaServed (Argentina, Patagonia, Chubut, City Trelew, plus city names), serviceArea (Country, Chubut, Patagonia Argentina, City Trelew), openingHoursSpecification (Mon–Fri 09:00–18:00), sameAs (Google Maps, social).
- **Place #trelew:** name "Trelew, Chubut, Patagonia Argentina", address, geo, containedInPlace (Chubut, Argentina).

### 5.2 Meta

- **Titles:** Each route title includes "Trelew", "Chubut", or "Patagonia" (see useMetaTags routeMeta).
- **Geo meta:** geo.region (AR-U), geo.placename (Trelew, Chubut), geo.position (-43.2519;-65.3054) in index.html and updated by useMetaTags on every route.

### 5.3 Page-level schema (dynamic)

- **EnhancedSchema** uses areaServed (e.g. ['Trelew', 'Chubut', 'Patagonia Argentina']) and mainEntity/provider `@id` to #organization on services and about/contact pages, reinforcing local and entity linkage.

---

## 6. Indexation control

### 6.1 Default: full indexation

- **No** `<meta name="robots" content="noindex">` (or nofollow) in `index.html` or in useMetaTags. All public routes are intended for indexation.
- **robots.txt** allows /, /servicios, /nosotros, /contacto, /assets/ and disallows only /api/, /node_modules/, /src/, and *.map.

### 6.2 Canonical

- **Single canonical per URL:** Set in index.html (home) and updated by useMetaTags to `SITE_BASE_URL` + current pathname. No duplicate or alternate canonicals; query strings are not added unless the app does so (QSA is preserved by server for SPA fallback only).

### 6.3 Optional noindex (future)

- To noindex a route: add logic in useMetaTags to set `<meta name="robots" content="noindex, nofollow">` for that path, or add a dedicated meta tag that useMetaTags updates. Not implemented for any current route.

---

## 7. Future Ads compatibility

### 7.1 Current integration

The site is already prepared for **Google Ads** (and GA4) via **Google Tag Manager (GTM)**. No direct gtag or Google Ads script in the page; all events go through the dataLayer.

| Element | Implementation |
|--------|-----------------|
| **Container** | GTM loaded from index.html (deferred after first paint). Container ID: `data-gtm-id` on `<html>`, same ID in noscript iframe. |
| **Events** | `src/utils/analytics.js`: pushPageView, pushConversion, pushGenerateLead, trackContactConversion, trackPhoneClick, trackWhatsAppClick, etc. |
| **Page view** | Fired on every route change from App.jsx (pushPageView). Event name: `page_view`; params: page_path, page_title, page_location. Usable for remarketing and GA4. |
| **Conversion** | Fired on contact form success from ContactSection.jsx (trackContactConversion). Event name: `conversion`; conversion_name: `contact_form`. GTM can map this to a Google Ads Conversion tag (Conversion ID + Label). |
| **generate_lead** | Optional; same form success can push generate_lead for GA4. |

### 7.2 Adding or changing Ads

- **New conversion actions:** In GTM, create a trigger on the appropriate event (e.g. `conversion` with a different conversion_name, or a new event). Add a Google Ads Conversion tag with the new Conversion ID/Label. No change required in the app if the event is already pushed (e.g. with a new conversion_name).
- **Remarketing:** Use the existing `page_view` (and optional custom events) in GTM to fire Google Ads remarketing or GA4 tags.
- **Value/currency:** pushConversion and trackContactConversion accept value and currency; pass them when calling (e.g. from ContactSection) and map in GTM to the conversion tag.

### 7.3 Documentation

- Full setup: [docs/tracking-analytics.md](tracking-analytics.md). Includes GTM variables, triggers, tags, and Google Ads conversion setup.

---

## 8. File reference

| File | Responsibility |
|------|-----------------|
| `index.html` | Static meta (title, description, keywords, canonical, OG, Twitter, geo), single JSON-LD @graph (ProfessionalService + Place), GTM snippet. |
| `src/hooks/useMetaTags.js` | Per-route title, description, keywords, canonical, OG, Twitter, geo. SITE_BASE_URL; routeMeta map. |
| `src/components/EnhancedSchema.jsx` | Page-specific JSON-LD (ItemList, CollectionPage, AboutPage, ContactPage) injected on route change; references #organization. |
| `scripts/generate-sitemap.js` | Postbuild: writes dist/sitemap.xml with lastmod, changefreq, priority. |
| `public/robots.txt` | Allow/Disallow and Sitemap URL; copied to dist/. |
| `scripts/verify-schema.mjs` | Validates JSON-LD in dist/index.html (supports @graph). |
| `scripts/validate-seo.js` | Checks title, meta, canonical, OG, Twitter, H1, schema, viewport, no noindex, content length. |

---

## 9. Last verified

| Item | Status |
|------|--------|
| index.html: single @graph (ProfessionalService + Place), meta, canonical, OG, Twitter, geo | Verified |
| useMetaTags: routeMeta for /, /servicios, /nosotros, /contacto; updateMetaTag for all meta and canonical | Verified |
| EnhancedSchema: ItemList (home), CollectionPage (servicios), AboutPage (nosotros), ContactPage (contacto); provider/mainEntity @id #organization | Verified |
| generate-sitemap.js: 4 URLs, lastmod from page mtime, changefreq, priority, hostname | Verified |
| public/robots.txt: Allow, Disallow, Sitemap | Verified |
| No noindex in index.html or useMetaTags | Verified |
| analytics.js: pushPageView, trackContactConversion; GTM in index.html | Verified |

**Last verified:** 2025-02-06 (technical SEO documentation).
