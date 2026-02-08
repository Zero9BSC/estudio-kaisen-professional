# Changelog

All notable documentation and project changes are recorded here.

---

## [Unreleased]

### Documentation

- Reorganized **/docs** into a focused structure. See [MIGRATION-MAPPING.md](MIGRATION-MAPPING.md) for old → new file mapping.
- Added: **architecture.md**, **seo-strategy.md**, **performance.md**, **deployment.md**, **tracking-analytics.md**, **local-seo.md**, **troubleshooting.md**, **changelog.md**.
- Merged content from: SEO-STATUS, SCHEMA-VERIFICATION, SSG-VERIFICATION, meta-ctr-variations, IMAGE-STRATEGY, google-ads-integration, google-search-console-setup, local-seo-argentina.
- Removed obsolete files: SSG-VERIFICATION (replaced by deployment.md with corrected prerender steps), SCHEMA-VERIFICATION (merged into seo-strategy.md), SEO-STATUS (merged), IMAGE-STRATEGY (→ performance.md), google-ads-integration (→ tracking-analytics.md), google-search-console-setup (→ deployment.md), local-seo-argentina (→ local-seo.md), meta-ctr-variations (→ seo-strategy.md), DOCUMENTATION-AUDIT, LEGACY-REFERENCES-SCAN, DOCS-VS-CONFIG-MISMATCH-REPORT (content folded into troubleshooting and other docs).
- Rewrote all docs with professional technical writing: clear headings, text-form diagrams, no outdated references, alignment with current implementation, and a “Last verified” section per doc.

---

## Changelog format

- **Added** — New docs or sections.
- **Changed** — Updates to existing docs or config.
- **Deprecated** — To be removed in a future release.
- **Removed** — Obsolete files or content.
- **Fixed** — Corrections (e.g. wrong commands, outdated references).

---

## Last verified

| Item | Status |
|------|--------|
| Doc set: architecture, seo-strategy, performance, deployment, tracking-analytics, local-seo, troubleshooting, changelog, MIGRATION-MAPPING | Present and cross-referenced |
| No references to vite-plugin-prerender or build:ssg as prerender | Verified |
| “Last verified” sections added to each main doc | Verified |

**Last verified:** 2025-02-06 (documentation rewrite).
