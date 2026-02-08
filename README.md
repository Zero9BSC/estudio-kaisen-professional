# Estudio Jurídico-Contable Kaisen — Website

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![SEO](https://img.shields.io/badge/SEO-optimized-green)](#)
[![Performance](https://img.shields.io/badge/Performance-LCP%20%7C%20CLS%20%7C%20INP-blue)](#)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.0-blue)](#)

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

Professional website for Estudio Jurídico-Contable Kaisen — accounting services in Trelew, Chubut, Patagonia.

---

## Quick Start (developers)

Copy-paste ready commands. Requires **Node.js 18+** and **npm**.

### Install

```bash
git clone <repository-url>
cd estudio-kaisen-professional
npm install
```

Optional: create `.env` or `.env.local` with `VITE_GTM_ID` (GTM container ID), `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (contact form). See `.env.example`.

### Dev run

```bash
npm run dev
```

Open http://localhost:5173. Hot reload on save.

### Build

```bash
npm run build
```

Output: `dist/` (index.html, sitemap.xml, robots.txt, .htaccess, assets/). Prebuild runs image optimization; postbuild runs sitemap generation.

Optional — static HTML per route (SEO):

```bash
npm run build:prerender
```

Requires Chrome/Chromium installed. Writes `dist/index.html` and `dist/servicios/index.html`, `dist/nosotros/index.html`, `dist/contacto/index.html`.

### Preview

```bash
npm run preview
```

Serves `dist/` at http://localhost:4173. Use after `npm run build` to test the production build locally.

### Deploy

Upload the **entire contents** of `dist/` to your server document root (e.g. via FTP, rsync, or host panel). Do not deploy `src/` or `node_modules/`.

```bash
# Example: rsync to server
rsync -avz --delete dist/ user@host:/path/to/docroot/
```

See [docs/deployment.md](docs/deployment.md) for pre/post checklist, cache, CDN, and rollback.

---

## 1. Project overview

This repository is the production codebase for the **Estudio Kaisen** corporate website: a client-facing digital presence for a firm offering contable, impositivo y jurídico (integrado) in Trelew, Chubut, Argentina. The site supports lead generation and brand authority in the Patagonia region through clear service presentation, contact flows (form, WhatsApp, phone, email), and local search visibility.

**Technical quality.** The application is a single-page application (SPA) built with React 19 and Vite 7, designed for fast load and smooth navigation. The build pipeline includes image optimization, sitemap generation, and optional static HTML per route (prerender) for crawlers. Schema verification, SEO validation, and routing checks are automated and documented so releases stay consistent and auditable.

**SEO and performance.** Discoverability and Core Web Vitals are first-class: per-route meta and canonical URLs, JSON-LD (ProfessionalService + Place) for local business, sitemap and robots.txt, and performance measures (LCP, CLS, INP) via optimized images, font loading, deferred analytics, and non-blocking interactions. The site is built to perform well in search and in real-user metrics.

**Production readiness.** Deployment is artifact-based (static `dist/`); pre-deploy steps and checklists are defined, and documentation covers architecture, SEO, performance, deployment, tracking, and troubleshooting. The project is maintained with a clear structure, environment handling, and security considerations suitable for enterprise and investor review.

| Attribute | Detail |
|-----------|--------|
| **Live site** | [https://consultorakaisen.com.ar](https://consultorakaisen.com.ar) |
| **Application type** | SPA with optional prerendered HTML per route |
| **Primary routes** | `/` (home), `/servicios`, `/nosotros`, `/contacto` |

---

## 2. Business context

- **Client:** Estudio Kaisen — Contable, Impositivo, Jurídico.
- **Location:** 9 de Julio 128, 1° piso A (Edificio Iberia), Trelew, Chubut, Argentina.
- **Audience:** Businesses and entrepreneurs in Trelew, Chubut, and Patagonia seeking contable, impositivo y asesoramiento jurídico integrado.
- **Key actions:** Contact form, WhatsApp, phone, and email.

---

## 3. Tech stack

Detected from project files (`package.json`, `vite.config.js`, `index.html`, `src/`, `scripts/`).

### Framework

| Technology | Version | Role |
|------------|---------|------|
| React | 19.x | UI components, state |
| React DOM | 19.x | Render target |
| React Router | 7.x | Client-side routing (/, /servicios, /nosotros, /contacto) |
| Tailwind CSS | 3.x | Utility-first styling |
| PostCSS | 8.x | CSS processing (Tailwind, Autoprefixer) |
| Lucide React | 0.556.x | Icon set |
| @emailjs/browser | 4.x | Contact form submission (client-side) |

### Build tool

| Technology | Role |
|------------|------|
| Vite | 7.x — dev server, ESM bundling, production build |
| @vitejs/plugin-react | React Fast Refresh, JSX |
| Rollup | (via Vite) — bundling, code splitting |
| Terser | Minification; `drop_console`, `drop_debugger` in production |
| ESLint | Linting (`npm run lint`) |

### Hosting model

| Model | Detail |
|-------|--------|
| **Static** | Build outputs static files only (`dist/`). No server runtime. |
| **SPA** | Single `index.html`; React Router handles routes client-side. |
| **Optional prerender** | `scripts/prerender-standalone.mjs` (puppeteer-core) writes static HTML per route for crawlers. |
| **Server** | Deploy `dist/` to any static host (Apache, Nginx, Netlify, Vercel, etc.). `.htaccess` in repo for Apache (rewrites, SPA fallback). |

### SEO tools

| Tool / implementation | Role |
|------------------------|------|
| **Schema.org JSON-LD** | Single block in `index.html` with `@graph` (ProfessionalService + Place). Local business and location. |
| **Sitemap** | `sitemap` (npm); `scripts/generate-sitemap.js` runs at postbuild → `dist/sitemap.xml`. |
| **robots.txt** | In `public/`; copied to `dist/` root. Allow /, Sitemap URL. |
| **Meta & canonical** | `index.html` (base) + `src/hooks/useMetaTags.js` (per-route title, description, canonical, OG, Twitter, geo). |
| **validate-seo** | `scripts/validate-seo.js` — checks title, meta, canonical, OG, Twitter, H1, JSON-LD, viewport, no noindex, content length. |
| **verify-schema** | `scripts/verify-schema.mjs` — validates JSON-LD in `dist/index.html` (supports @graph). |
| **verify-ssg** | `scripts/verify-ssg.mjs` — checks prerendered HTML files and content. |
| **test-rich-results** | `scripts/test-rich-results.js` — Rich Results / schema check. |
| **test-routing** | `scripts/test-routing.sh` — expected files in `dist/`. |
| **Prerender** | `scripts/prerender-standalone.mjs` (puppeteer-core) — static HTML per route for SEO. |

### Analytics tools

| Tool | Role |
|------|------|
| **Google Tag Manager (GTM)** | Container loaded from `index.html` (`data-gtm-id` on `<html>`; noscript iframe). Load deferred until after first paint (requestIdleCallback/setTimeout). |
| **dataLayer** | Custom events pushed from `src/utils/analytics.js`: `page_view`, `conversion`, `generate_lead`, `form_submit`, `phone_click`, `whatsapp_click`. |
| **Page view** | `pushPageView()` on every route change (`src/App.jsx`). For GA4 / SPA virtual page views. |
| **Google Ads conversion** | `trackContactConversion()` on contact form success (`ContactSection.jsx`). Fires `conversion` event; GTM tag uses Conversion ID + Label. |
| **GA4** | Configurable via GTM (e.g. page_view trigger, generate_lead). |

### Performance tooling

| Area | Implementation |
|------|-----------------|
| **Bundling** | Vite + Rollup: `manualChunks` (react-vendor, icons, email); `chunkFileNames` / `assetFileNames`; fonts → `assets/fonts/`. |
| **Images** | `scripts/optimize-images.mjs` (sharp) — WebP output; prebuild. Hero &lt; 300 KB, logo &lt; 150 KB. `<picture>` WebP + PNG; first hero `loading="eager"`, `fetchPriority="high"`; rest `loading="lazy"`. |
| **Fonts** | @fontsource (Inter, Fraunces); preload of primary weights in `index.html`; `font-display: swap`; output path `assets/fonts/` in Vite config. |
| **GTM** | Deferred load (after first paint) to avoid blocking LCP/INP. |
| **Interaction (INP)** | `startTransition` for hero card and mobile menu state updates; analytics pushes deferred (e.g. rAF) on click. |
| **Production build** | Terser: `drop_console`, `drop_debugger`. |

---

## 4. Architecture summary

The following describes the current implementation: rendering model, SEO approach, hosting, assets, and tracking.

### Rendering model

The application is a **client-rendered single-page application (SPA)**. The server delivers a single `index.html` shell; React mounts at `#root` and React Router resolves routes (`/`, `/servicios`, `/nosotros`, `/contacto`) on the client. There is no server-side React runtime in production.

**Optional static HTML per route (prerender):** To improve crawlability and “View source” content, a **build-time prerender** step is available. After the normal Vite build, `scripts/prerender-standalone.mjs` (puppeteer-core) serves the built `dist/` on a local port, visits each route in a headless browser, and writes the fully rendered HTML to `dist/index.html` and `dist/<route>/index.html`. That output is purely static; the server does not run Node or React. The choice is binary: either deploy the SPA-only build (single shell) or the prerendered build (one static HTML file per route).

### SEO strategy approach

SEO is implemented so that **crawlers that do not execute JavaScript** still receive core signals from the initial HTML, while **client-side updates** refine meta and schema per route.

- **Static baseline:** `index.html` contains the canonical meta set (title, description, canonical, Open Graph, Twitter Card, geo), one JSON-LD block with `@graph` (ProfessionalService + Place), and the GTM snippet. These are always present in the delivered document.
- **Per-route refinement:** `src/hooks/useMetaTags.js` runs on every route change and updates `document.title`, meta description, canonical, and OG/Twitter tags. `EnhancedSchema.jsx` injects page-specific JSON-LD (e.g. ItemList, CollectionPage) into the DOM; the organization/local data remains the single source in `index.html`.
- **Discovery:** `public/robots.txt` (copied to `dist/`) allows indexing and points to the sitemap. The sitemap is generated at postbuild (`scripts/generate-sitemap.js`) with `lastmod`, `changefreq`, and `priority` per URL.
- **Validation:** Scripts (`validate-seo.js`, `verify-schema.mjs`, `verify-ssg.mjs`, `test-rich-results.js`) and optional prerender ensure meta, schema, and content are verifiable before deploy.

### Static hosting model

The production artifact is **fully static**: HTML, CSS, JS, images, fonts, and config files. No server process or database is required at runtime.

- **Deploy:** Upload the contents of `dist/` to any static host (Apache, Nginx, Netlify, Vercel, etc.). The repository includes an **Apache `.htaccess`** (copied to `dist/` by the Vite plugin) that enforces HTTPS and non-www, then:
  - Serves existing files as-is.
  - For requests to `/`, `/servicios`, `/nosotros`, `/contacto`: if the corresponding file exists (e.g. `servicios/index.html` after prerender), serves it; otherwise falls back to `index.html` (SPA).
  - Any other path that is not a file or directory is served `index.html` with query string preserved (QSA), so the SPA router can handle deep links.
- **Compression and caching:** `.htaccess` configures Gzip for text assets and `Cache-Control` (e.g. long-lived immutable for hashed assets; no-cache or short cache for HTML). Security headers (e.g. X-Content-Type-Options, HSTS when HTTPS) are set in the same file.

### Asset strategy

- **Images:** Source PNGs in `src/assets/` are converted to WebP at **prebuild** by `scripts/optimize-images.mjs` (sharp). Components use `<picture>` (WebP with PNG fallback), explicit dimensions, and the first hero image with `loading="eager"` and `fetchPriority="high"`; others use `loading="lazy"`. Vite bundles images into `dist/assets/` with content hashes.
- **Fonts:** Primary weights (Inter 400, Fraunces 700, latin + latin-ext) are preloaded in `index.html`; Vite is configured so fonts are emitted under `assets/fonts/[name][extname]` so preload URLs match. `font-display: swap` is used to limit layout shift.
- **JavaScript:** Vite/Rollup split the bundle into `react-vendor`, `icons`, `email`, and app chunks; `chunkFileNames` and `assetFileNames` produce hashed filenames for long-term caching. Production build uses Terser with `drop_console` and `drop_debugger`.

### Tracking integration layer

Analytics and conversion tracking are **decoupled from the application shell** via a single integration point: **Google Tag Manager (GTM)**.

- **Loading:** The GTM container is not loaded synchronously. A small inline script in `index.html` schedules GTM load after first paint (`requestIdleCallback` or `setTimeout`), so LCP and INP are not blocked by third-party script. The container ID is read from `data-gtm-id` on `<html>`; the same ID is used in the noscript iframe for no-JS users.
- **Events:** The application does not call Google Analytics or Google Ads directly. It pushes structured events into `window.dataLayer` via helpers in `src/utils/analytics.js` (e.g. `pushPageView`, `trackContactConversion`). `App.jsx` pushes a virtual `page_view` on every route change; `ContactSection.jsx` calls `trackContactConversion` on successful form submit. GTM is configured to listen for these events and fire the appropriate tags (GA4, Google Ads conversion, etc.). New tags or triggers can be added in GTM without changing application code.

---

**Detailed architecture:** [docs/architecture.md](docs/architecture.md)

---

## 5. SEO strategy overview

- **Meta:** Per-route title, description, canonical, Open Graph, Twitter Card, geo tags (`src/hooks/useMetaTags.js` + `index.html`).
- **Schema:** JSON-LD in `index.html` with `@graph` (ProfessionalService + Place) for local business and location.
- **Sitemap:** Generated at postbuild → `dist/sitemap.xml`. Routes: `/`, `/servicios/`, `/nosotros/`, `/contacto/`.
- **robots.txt:** In `public/`; allows indexing and references sitemap.
- **Validation:** `npm run validate:seo`, `npm run verify:schema`. See [docs/seo-strategy.md](docs/seo-strategy.md).

---

## 6. Performance strategy

- **Images:** WebP with PNG fallback; hero &lt; 300 KB, logo &lt; 150 KB. Prebuild script: `scripts/optimize-images.mjs`. First hero image: `loading="eager"`, `fetchPriority="high"`; rest lazy.
- **Fonts:** Preload of primary weights (Inter 400, Fraunces 700); output under `assets/fonts/`. `font-display: swap`.
- **LCP/CLS/INP:** GTM loaded after first paint; hero dimensions and font preload to limit CLS; `startTransition` and deferred analytics for INP.
- **Caching:** .htaccess config for HTML vs static assets. See [docs/performance.md](docs/performance.md).

---

## 7. Local SEO strategy

- **Target:** Trelew, Chubut, Patagonia, Argentina.
- **Schema:** ProfessionalService with address, geo, hasMap, serviceArea, areaServed; Place (#trelew) linked via containedInPlace.
- **Titles:** Local keywords (Trelew, Chubut, Patagonia) in meta titles per route.
- **Meta geo:** geo.region, geo.placename, geo.position in `index.html` and useMetaTags.
- **Details:** [docs/local-seo.md](docs/local-seo.md)

---

## 8. Tracking & analytics

- **GTM:** Container ID in `index.html` (`data-gtm-id` on `<html>`, noscript iframe). GTM loads after first paint (requestIdleCallback/setTimeout).
- **dataLayer:** Helpers in `src/utils/analytics.js`: `pushPageView`, `trackContactConversion`, etc. App.jsx pushes `page_view` on route change; ContactSection calls `trackContactConversion` on form success.
- **Google Ads:** Conversion tag in GTM triggered by Custom Event `conversion`; Conversion ID and Label from Google Ads.
- **Setup:** [docs/tracking-analytics.md](docs/tracking-analytics.md)

---

## 9. Deployment

- **Artifact:** Contents of `dist/` (do not deploy `src/` or `node_modules/`).
- **Pre-deploy:** Run `npm run build` or `npm run build:prerender`, then `npm run validate:seo`, `npm run verify:schema`, `npm run preview` (http://localhost:4173), and `npm run test:routing` (bash; on Windows use Git Bash or verify files manually).
- **Server:** Upload `dist/`; ensure .htaccess (or equivalent) is applied so route HTML files are served when present and SPA fallback works.
- **Checklist and GSC:** [docs/deployment.md](docs/deployment.md)

---

## 10. Project structure

```
├── index.html              # Entry; GTM, meta, JSON-LD
├── public/                 # Static assets → dist/ root (robots.txt, favicons, site.webmanifest)
├── src/
│   ├── main.jsx
│   ├── App.jsx             # Router, layout, page_view
│   ├── index.css
│   ├── components/         # layout, sections, ui, EnhancedSchema, WhatsAppButton
│   ├── hooks/              # useMetaTags.js
│   ├── utils/              # analytics.js
│   ├── pages/              # HomePage, ServicesPage, AboutPage, ContactPage
│   ├── data/               # servicesData.js
│   └── assets/             # Images (PNG, WebP)
├── scripts/                # optimize-images, generate-sitemap, prerender-standalone, verify-*, validate-seo, test-routing
├── docs/                   # architecture, seo-strategy, performance, deployment, tracking-analytics, local-seo, troubleshooting, changelog
├── vite.config.js
└── package.json
```

---

## 11. Development setup

**Prerequisites**

- Node.js 18+
- npm (or yarn)

**Steps**

1. Clone the repository:
   ```bash
   git clone https://github.com/Zero9BSC/estudio-kaisen-professional.git
   cd estudio-kaisen-professional
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Generate WebP images so dev and build resolve them:
   ```bash
   npm run optimize:images
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173).

---

## 12. Build instructions

| Command | Output |
|--------|--------|
| `npm run build` | SPA: dist/index.html, dist/assets/, dist/sitemap.xml, dist/robots.txt, dist/.htaccess |
| `npm run build:prerender` | Same as build + dist/servicios/index.html, dist/nosotros/index.html, dist/contacto/index.html |
| `npm run preview` | Serve dist/ at http://localhost:4173 |

**Validation after build**

- `npm run verify:schema` — JSON-LD in dist/index.html
- `npm run validate:seo` — SEO checks
- `npm run verify:ssg` — (after prerender) presence and content of route HTML files
- `npm run test:routing` — expected files in dist/ (requires bash)

---

## 13. Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_GTM_ID` | For GTM | Google Tag Manager container ID (injected into index.html at build). If unset, placeholder `GTM-XXXXXX` remains. |
| `VITE_EMAILJS_SERVICE_ID` | Yes (for form) | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Yes (for form) | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Yes (for form) | EmailJS public key |

- **GTM:** Set `VITE_GTM_ID` in `.env` or `.env.production`; the build injects it into `data-gtm-id` and the noscript iframe in index.html.
- **Base URL / canonical:** Hardcoded in `src/hooks/useMetaTags.js` and sitemap script; change there if the domain changes.
- Do not commit secrets; use `.env.local` (or host/CI env) and ensure `.env*.local` is in `.gitignore`.

---

## 14. Security notes

- **Secrets:** No API keys or secrets in the repo. EmailJS keys are public (template/service) and loaded via Vite env; restrict by domain in EmailJS if possible.
- **Headers:** .htaccess (or server config) should set security headers (e.g. X-Content-Type-Options, X-Frame-Options, CSP if applicable). HSTS when serving over HTTPS.
- **Dependencies:** Keep dependencies updated; run `npm audit` periodically.
- **Forms:** Contact form submits via EmailJS from the client; validate and sanitize on the server if you add a backend.

---

## 15. Contribution guide

1. Fork the repository.
2. Create a branch: `git checkout -b feature/short-description`.
3. Make changes; follow existing code style and structure.
4. Run `npm run lint` and fix issues.
5. Commit: `git commit -m "feat: short description"`.
6. Push: `git push origin feature/short-description`.
7. Open a Pull Request with a clear description and reference to any issue.

---

## 16. License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 17. Contact / maintainers

- **Project:** [https://github.com/Zero9BSC/estudio-kaisen-professional](https://github.com/Zero9BSC/estudio-kaisen-professional)
- **Client / business:** Estudio Kaisen — 9 de Julio 128, Trelew, Chubut. Tel: +54 280 442-1137; WhatsApp: +54 9 280 436-6867.

---

**Documentation:** Full details in [docs/](docs/) — architecture, seo-strategy, performance, deployment, tracking-analytics, local-seo, troubleshooting, changelog, and migration mapping.
