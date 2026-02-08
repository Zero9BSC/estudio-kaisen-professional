# Documentation migration mapping

This document maps previous documentation files to the current **/docs** structure and provides a quick lookup by topic.

---

## 1. Current docs tree

```
docs/
  architecture.md       Project structure, build pipeline, tech stack, dist output
  seo-strategy.md       SEO status, schema (@graph), meta/CTR, validation & QA
  performance.md        Image strategy, fonts, Core Web Vitals (LCP, CLS, INP)
  deployment.md         Pre/post deploy checklist, prerender verification, Google Search Console
  tracking-analytics.md GTM (deferred load), dataLayer, Google Ads conversion
  local-seo.md          Argentina/Patagonia: schema, geo, service area, titles
  troubleshooting.md    Build/prerender, schema, deployment, tracking
  changelog.md          Documentation and project changes
  MIGRATION-MAPPING.md  This file (old → new mapping)
```

---

## 2. Migration mapping (old → new)

| Old file | New location | Notes |
|----------|--------------|--------|
| SEO-STATUS.md | seo-strategy.md (status overview, validation); architecture.md (build/prerender) | Merged; duplicate status removed. |
| SCHEMA-VERIFICATION.md | seo-strategy.md (§ Schema verification); troubleshooting.md (§ Schema not appearing) | Schema steps and @graph in seo-strategy; failure cases in troubleshooting. |
| SSG-VERIFICATION.md | deployment.md (§ Prerender verification) | Rewritten: prerender = build:prerender + prerender-standalone.mjs; build:ssg does not prerender. |
| meta-ctr-variations.md | seo-strategy.md (§ Meta title & description) | Variation A/B/C and swap instructions in seo-strategy. |
| IMAGE-STRATEGY.md | performance.md (§ Image strategy) | Formats, script, markup, lazy load in performance. |
| google-ads-integration.md | tracking-analytics.md | Full content merged; GTM deferred load and data-gtm-id documented. |
| google-search-console-setup.md | deployment.md (§ Google Search Console) | GSC steps merged into deployment. |
| local-seo-argentina.md | local-seo.md | Renamed; content preserved (schema, geo, titles, validation). |
| DEPLOYMENT_CHECKLIST.md (root) | docs/deployment.md | Root file now points to docs/deployment.md. |
| DOCUMENTATION-AUDIT.md | — | Removed (one-time audit). |
| LEGACY-REFERENCES-SCAN.md | troubleshooting.md (§ README and legacy references) | Summarized in troubleshooting. |
| DOCS-VS-CONFIG-MISMATCH-REPORT.md | troubleshooting.md, architecture.md, deployment.md | Mismatches reflected in those docs. |

---

## 3. Removed or obsolete (no direct replacement)

- **DOCUMENTATION-AUDIT.md** — One-time audit; findings applied in current structure.
- **LEGACY-REFERENCES-SCAN.md** — Replaced by troubleshooting.md.
- **DOCS-VS-CONFIG-MISMATCH-REPORT.md** — Content distributed to architecture, deployment, seo-strategy, tracking-analytics, troubleshooting.

---

## 4. Quick lookup by topic

| Topic | Document |
|-------|----------|
| Build commands, SPA vs prerender, dist layout | architecture.md |
| SEO status, schema @graph, meta CTR, validate:seo | seo-strategy.md |
| Images, WebP, fonts, LCP/CLS/INP | performance.md |
| Deploy checklist, prerender verification, GSC | deployment.md |
| GTM, dataLayer, Google Ads | tracking-analytics.md |
| Local schema, geo, Trelew/Chubut titles | local-seo.md |
| Prerender fails, schema 404, test:routing Windows, og-image | troubleshooting.md |
| Doc reorg and project changes | changelog.md |

---

## 5. Last verified

| Item | Status |
|------|--------|
| All listed old files removed or merged | Verified |
| New doc set matches current implementation | Verified |
| Cross-references between docs | Verified |

**Last verified:** 2025-02-06 (documentation rewrite).
