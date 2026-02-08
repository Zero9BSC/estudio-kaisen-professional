# SEO strategy

This document describes the SEO implementation for the Estudio Kaisen site: status, schema markup, meta tags, validation, and quality assurance.

---

## 1. Status overview

| Area | Status | Implementation |
|------|--------|----------------|
| robots.txt | Implemented | public/robots.txt → dist/; allows /; Sitemap URL |
| sitemap.xml | Implemented | postbuild → dist/sitemap.xml; routes /, /servicios/, /nosotros/, /contacto/ |
| Meta (title, description, canonical, OG, Twitter, geo) | Implemented | index.html (base) + useMetaTags.js (per route) |
| Canonical URL | Implemented | index.html base + useMetaTags updates per path |
| Schema JSON-LD | Implemented | index.html: single block with @graph (ProfessionalService + Place). See [local-seo.md](local-seo.md). |
| Page-level schema | Implemented | EnhancedSchema.jsx adds ItemList, CollectionPage, AboutPage, ContactPage; organization data only in index.html |
| Server routing | Implemented | .htaccess: serve route HTML if present; otherwise index.html (SPA fallback) |
| Prerender | Implemented | npm run build:prerender + scripts/prerender-standalone.mjs |

---

## 2. Schema verification

### 2.1 Schema structure (text diagram)

The static JSON-LD in index.html has a **root object with @graph**, not a root @type:

```
Root
└── @graph (array)
    ├── Item 1: ProfessionalService
    │   ├── @id, name, address, telephone, email, geo
    │   ├── hasMap, containedInPlace → #trelew
    │   ├── areaServed, serviceArea, openingHoursSpecification
    │   └── sameAs (Google Maps, social)
    └── Item 2: Place
        ├── @id (#trelew)
        ├── name, address, geo
        └── containedInPlace (Chubut, Argentina)
```

- **Verify with script:** Run `npm run verify:schema` after build. The script parses @graph and reports “Block 1 item 1: ProfessionalService” and “Block 1 item 2: Place” (or equivalent).
- **Verify manually:** Open dist/index.html, search for `application/ld+json`; confirm one script block with valid JSON and a root `@graph` array containing both types.
- **Verify with Google:** [Rich Results Test](https://search.google.com/test/rich-results) (URL or paste HTML). Expect LocalBusiness / ProfessionalService.

If the schema is missing or invalid, ensure the `<script type="application/ld+json">` block in index.html is not removed during build. Re-run `npm run build` and `npm run verify:schema`. For per-route schema, ensure EnhancedSchema is mounted in all page components.

---

## 3. Meta title and description (CTR)

### 3.1 Constraints

- **Title:** Under 60 characters.
- **Description:** 140–155 characters.
- **Content:** Emotional and trust trigger words; local intent (Trelew, Chubut, Patagonia).

Default copy is Variation A in `src/hooks/useMetaTags.js` and in the base meta in index.html.

### 3.2 Default titles (Variation A)

| Route | Title |
|-------|--------|
| / | Contador en Trelew \| Estudio Kaisen – Patagonia |
| /servicios | Servicios Contables y Jurídicos \| Estudio Kaisen – Trelew |
| /nosotros | Estudio Contable Trelew, Patagonia \| Nosotros – Estudio Kaisen |
| /contacto | Contacto Trelew, Chubut \| Estudio Kaisen – 9 de Julio 128 |

### 3.3 A/B testing

To test Variation B or C: in `src/hooks/useMetaTags.js`, replace the `title` and `description` for the desired route in `routeMeta` with the alternate copy. Leave `keywords` and `ogImage` unchanged.

---

## 4. Validation and QA

| Check | Method | Expected result |
|-------|--------|------------------|
| View source (/) | Browser → View page source | Meta and schema in &lt;head&gt;; with prerender, body contains H1 and main content |
| View source (/servicios) | Same for /servicios | With prerender: H1 and page-specific text |
| Rich Results Test | URL or paste dist/index.html | ProfessionalService / LocalBusiness detected |
| Search Console → URL Inspection | “View tested page” | Rendered HTML shows full content |
| Lighthouse SEO | DevTools → Lighthouse | Strong score with meta, schema, sitemap |
| npm run validate:seo | After build or build:prerender | All checks pass. Note: for @graph schema, the script may log “Type: Unknown” (root has no @type); it still validates JSON. |
| npm run verify:schema | After build | “Schema verification passed” and @graph items reported |

---

## 5. Related documentation

- [local-seo.md](local-seo.md) — Local schema (ProfessionalService + Place), geo, service area, and titles.
- [deployment.md](deployment.md) — Pre- and post-deploy checklist and Google Search Console.

---

## 6. Last verified

| Item | Status |
|------|--------|
| index.html: single application/ld+json with @graph (ProfessionalService + Place) | Verified |
| useMetaTags.js: routeMeta titles and descriptions (Variation A) | Verified |
| verify-schema.mjs: @graph support and required fields | Verified |
| validate-seo.js: checks and @graph handling | Verified |

**Last verified:** 2025-02-06 (documentation rewrite).
