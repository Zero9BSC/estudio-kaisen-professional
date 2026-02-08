# Documentation maintenance policy

This document defines **when** and **how** documentation must be updated, version sync rules, how docs are verified against build version, the pre-release doc checklist, and rules for documenting SEO changes.

---

## 1. When docs must be updated

Update documentation whenever the following change. Do **not** leave docs out of date after a code or config change.

| Trigger | Docs to update (examples) |
|--------|----------------------------|
| **Build or scripts** | architecture.md, deployment.md (§ Build process), README (Quick Start, scripts table). |
| **Routes or pages** | architecture.md, deployment.md (files to deploy), seo-implementation.md (sitemap, meta), generate-sitemap.js if URLs change. |
| **Environment or config** | env-configuration.md, README (§ Environment variables). If GTM ID, base URL, or domain change: index.html + env-configuration.md + any doc that references the domain. |
| **Tracking or GTM** | tracking-analytics.md, tracking-marketing-guide.md, env-configuration.md (§ Tracking IDs). If new events or conversion names: analytics.js + both tracking docs + marketing guide event table. |
| **Deployment or hosting** | deployment.md (upload, cache, CDN, rollback, .htaccess). If CI/CD is added: deployment.md + README (build badge, Quick Start). |
| **SEO (meta, schema, sitemap, robots)** | See § 4 (SEO changes doc rules). |
| **Performance (bundle, fonts, images, caching)** | performance.md, performance-implementation.md. If .htaccess cache/compression changes: deployment.md (§ .htaccess) + performance-implementation.md. |
| **New doc or major restructure** | changelog.md (Added/Changed); MIGRATION-MAPPING.md if files are renamed or merged; README if the doc list or links change. |
| **Bug fix or correction** | The doc that was wrong; changelog.md (Fixed) if user-facing. |

**Rule:** If it’s in the code or config, it must be reflected in the docs that describe it. When in doubt, update the relevant doc and add a changelog entry.

---

## 2. Version sync rules

Keep version references consistent across the project.

| Item | Rule |
|------|------|
| **package.json `version`** | Single source of truth for the project version (e.g. `0.0.0`, `1.0.0`). Bump on release (or when you tag). |
| **README version badge** | Must match `package.json` version. If the badge is static (e.g. `version-0.0.0-blue`), update the badge URL or text when you bump the version. |
| **Changelog** | Every release must have an entry under a `## [X.Y.Z]` (or `## [Unreleased]` for unreleased changes). Include the release date. Do not remove or rewrite past entries. |
| **Doc “Last verified”** | Each main doc has a “Last verified” section with a date. Update that date when you change the doc or verify it against the code. Optionally mention the version (e.g. “Verified for v1.0.0”). |
| **Other version mentions** | If a doc explicitly states a dependency or tool version (e.g. “Vite 7”), update it when the project upgrades that dependency. |

**Pre-release:** Before cutting a release, ensure `package.json` version is bumped, README version badge matches, and changelog has a `## [X.Y.Z]` entry with the release date and summary of changes.

---

## 3. Pre-release doc checklist

Complete the following **before** each release (tag or production deploy).

- [ ] **Version:** Bump `package.json` version if this is a versioned release. Update README version badge to match.
- [ ] **Changelog:** Add a `## [X.Y.Z]` heading (or move items from `[Unreleased]` into it). Include date and list: Added, Changed, Fixed, Removed, Deprecated as needed.
- [ ] **Last verified:** Update “Last verified” date (and optionally version) in any doc you changed or that is affected by the release (architecture, deployment, SEO, tracking, env, performance).
- [ ] **Cross-links:** Confirm links between docs and README still resolve (no broken `[text](path)`). Confirm doc list in README or changelog is current.
- [ ] **Commands and paths:** Grep docs for script names, paths, and env vars; confirm they match `package.json`, `vite.config.js`, and the repo layout (e.g. `npm run build`, `dist/`, `docs/`).
- [ ] **Deployment:** If deploy process or hosting changed, re-read deployment.md and update it. Run through the deployment checklist once.
- [ ] **SEO / tracking:** If meta, schema, sitemap, GTM, or conversion logic changed, update seo-implementation.md, seo-strategy.md, tracking-analytics.md, and tracking-marketing-guide.md as per § 4.

Optional: run a quick pass over the main docs (architecture, deployment, seo-implementation, env-configuration, tracking-analytics) to ensure no stale “TODO” or “replace with real value” without a corresponding ticket or doc note.

---

## 4. Doc verification against build version

This section defines how documentation is kept in sync with the **build version**. The rules are written so they can be automated (e.g. in CI or a post-build script): inputs, outputs, file paths, and conditions are explicit.

### 4.1 Build date sync

**Purpose:** Ensure docs that reference “when” the build was produced stay aligned with the actual build.

| Item | Source of truth | Where it appears | Automation rule |
|------|-----------------|------------------|-----------------|
| **Build date** | Time of `npm run build` (or CI job completion). | Optional: `dist/build-info.json` or env at build time; or “Last verified” date in docs. | If you emit a build date (e.g. `BUILD_DATE` in dist or env), scripts can compare it to “Last verified” in docs and **warn** if docs are older than the build. |
| **Doc “Last verified”** | Manual or script. Each main doc in `docs/` has a line like `**Last verified:** YYYY-MM-DD`. | Bottom of each doc (e.g. `docs/*.md`). | **Check:** Parse “Last verified” date from each doc. **Option A:** Fail if any doc’s “Last verified” is older than `package.json` version’s release date (when using version tagging). **Option B:** Warn if “Last verified” is older than N days. **Update:** Script can set “Last verified” to today when running “verify docs” for version X.Y.Z. |

**Convention for automation:**

- Use a single date format: **YYYY-MM-DD** (e.g. `2025-02-06`).
- “Last verified” line pattern: `**Last verified:** YYYY-MM-DD` or `**Last verified:** YYYY-MM-DD (optional note).`
- If you add a build artifact: e.g. `dist/build-info.json` with `{ "version": "X.Y.Z", "date": "YYYY-MM-DD" }` generated at build time. Docs-verification script can read it and compare.

### 4.2 Version tagging

**Purpose:** Tie releases to a unique version so docs can be verified “for version X.Y.Z.”

| Item | Source of truth | Where it appears | Automation rule |
|------|-----------------|------------------|-----------------|
| **Project version** | `package.json` → `version` (e.g. `0.0.0`, `1.0.0`). | `package.json`. | **Read:** `version` from `package.json`. Use as canonical version for the repo. |
| **Git tag** | Tag format recommended: `vX.Y.Z` (e.g. `v1.0.0`). Tag is created at release time. | Git refs. | **Check:** If tagging releases, ensure tag exists for current `package.json` version (e.g. `v$(node -p "require('./package.json').version")`). **Optional:** Fail if `package.json` version changed but no tag exists for it (prevents untagged releases). |
| **README version badge** | Static badge: `version-X.Y.Z-blue` or similar. | `README.md`. | **Check:** Grep README for version string; compare to `package.json` version. **Update:** Replace version in badge URL/text with `package.json` version. |
| **Changelog release heading** | `## [X.Y.Z]` with date. | `docs/changelog.md`. | **Check:** Changelog must contain a heading `## [X.Y.Z]` matching `package.json` version (or `## [Unreleased]` for unreleased). **Update:** Script can add `## [X.Y.Z]` and date when cutting release. |

**Convention for automation:**

- Version format: **X.Y.Z** (semver). Tag name: **vX.Y.Z**.
- Changelog heading pattern: `## [X.Y.Z]` or `## [Unreleased]`.
- Automation can: (1) read `package.json` version, (2) check README badge and changelog heading match, (3) check or create Git tag `vX.Y.Z`.

### 4.3 Release notes sync

**Purpose:** Ensure release notes (changelog entry for the release) exist and stay in sync with the tagged version.

| Item | Source of truth | Where it appears | Automation rule |
|------|-----------------|------------------|-----------------|
| **Release notes content** | Human-written summary for the release. | `docs/changelog.md` under `## [X.Y.Z]`. | **Check:** For version X.Y.Z, changelog has a section `## [X.Y.Z]` and at least one list item (Added / Changed / Fixed / etc.). **Optional:** Fail if tag exists but changelog has no `## [X.Y.Z]` with content. |
| **Release date** | Date of tag or release. | In changelog: `## [X.Y.Z]` followed by date or “(YYYY-MM-DD)”. | **Check:** Release section includes a date. **Update:** When creating release section, set date to today (or tag date). |
| **Link to tag or release** | GitHub/GitLab release URL or tag URL. | Optional: in changelog or README. | **Update:** If you use GitHub Releases, link “Compare” or release URL in changelog for the version. |

**Convention for automation:**

- Changelog section pattern: `## [X.Y.Z]` then optional `(YYYY-MM-DD)` then list items.
- Automation can: (1) verify `## [X.Y.Z]` exists in changelog when tag `vX.Y.Z` exists, (2) verify section has at least one bullet, (3) optionally add or validate release date and link.

### 4.4 Automation-ready checklist (summary)

Script or CI can perform the following. All paths are relative to repo root.

| Step | Action | Input | Output / Pass condition |
|------|--------|-------|--------------------------|
| 1 | Read project version | `package.json` → `version` | V = X.Y.Z |
| 2 | Build date sync | Optional: build timestamp or `dist/build-info.json` | Emit build date; optionally warn if any doc “Last verified” &lt; build date |
| 3 | Version in README | Grep `README.md` for version string | README contains V (e.g. in badge); optionally replace with V |
| 4 | Changelog heading | Grep `docs/changelog.md` for `## [V]` or `## [Unreleased]` | Changelog has `## [V]` or `[Unreleased]` |
| 5 | Release notes content | Parse `docs/changelog.md` section for V | Section `## [V]` has at least one list item; optionally has date |
| 6 | Git tag (if used) | `git tag -l 'v*'` | Tag `vV` exists when releasing V; optionally fail if version changed and no tag |
| 7 | Last verified dates | Grep `docs/*.md` for “Last verified” | Parse dates; warn if any &gt; N days old or &lt; last release date |

**Suggested order:** Run after `npm run build` (or in CI on main/release branch). Steps 1, 3, 4, 5 can be run without Git; steps 2, 6, 7 depend on build artifact or Git.

---

## 5. SEO changes doc rules

Whenever you change **meta tags, canonical URLs, schema (JSON-LD), sitemap, robots.txt, or indexation behavior**, update the following docs so they stay accurate and useful for SEO and marketing.

| Change type | Docs to update | What to update |
|-------------|----------------|----------------|
| **Meta (title, description, keywords, OG, Twitter)** | seo-implementation.md (§ Meta management), seo-strategy.md (if strategy or CTR rules change). | Copy rules, character limits, per-route table, and any new/removed meta. |
| **Canonical or base URL** | env-configuration.md (§ Base URL, Domain), seo-implementation.md (§ Meta, Indexation). | Where base URL is set, how canonical is built, and that indexation uses a single canonical per URL. |
| **Schema (JSON-LD)** | seo-implementation.md (§ Structured data), seo-strategy.md (if entity or page types change). | Static vs dynamic schema, @graph contents, EnhancedSchema per route, validation command. |
| **Sitemap (URLs, hostname, priority, changefreq)** | seo-implementation.md (§ Sitemap), deployment.md if sitemap is part of deploy. | generate-sitemap.js behavior, URL list, discovery via robots.txt. |
| **robots.txt** | seo-implementation.md (§ Robots). | Allow/Disallow rules, Sitemap URL, any new paths. |
| **Indexation (noindex, nofollow)** | seo-implementation.md (§ Indexation control). | Which routes are indexed, canonical behavior, optional noindex approach. |
| **New route or page** | seo-implementation.md (all relevant sections), architecture.md (routes), deployment.md (files to deploy, prerender). | Route list in meta, schema, sitemap, robots; add to “files to deploy” and prerender list if applicable. |

**Rule:** After any SEO-related code or config change, update the corresponding section in **seo-implementation.md** (and, if needed, seo-strategy.md). Update **changelog.md** with a short note (e.g. “SEO: added X, updated seo-implementation.md”).

---

## 6. Summary

| Area | Policy |
|------|--------|
| **When to update** | Whenever code, config, routes, env, tracking, deployment, SEO, or performance changes; update the doc(s) that describe that area. |
| **Version sync** | package.json = source of truth; README badge and changelog must stay in sync; “Last verified” dates in docs when you change or verify them. |
| **Doc verification vs build** | Build date sync (optional build-info.json + “Last verified”); version tagging (vX.Y.Z, README badge, changelog heading); release notes sync (changelog section + date). Automation: see § 4.4. |
| **Pre-release** | Version bump + badge, changelog entry, Last verified pass, cross-links and commands check, deployment and SEO docs if relevant. |
| **SEO changes** | Always update seo-implementation.md (and seo-strategy.md / deployment.md as needed); add changelog entry. |

---

**Last verified:** 2025-02-06 (documentation maintenance policy).
