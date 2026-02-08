# Google Tag Manager loading — validation checklist

Audit of the GTM loading implementation in `index.html`. Validates: single load, non-blocking placement, noscript fallback, and dataLayer initialization order.

---

## 1. GTM script loads once

**Requirement:** The gtm.js script must be injected and executed only once per page load.

**Implementation:**

- A single inline script in `<head>` schedules GTM load via `requestIdleCallback(loadGTM, { timeout: 2000 })` or `setTimeout(loadGTM, 0)` (one code path per environment).
- `loadGTM()` runs once when that callback fires; it creates one `<script>` element, sets `src` to `https://www.googletagmanager.com/gtm.js?id=<id>`, and inserts it with `insertBefore`.
- There is only one call that schedules `loadGTM` per page load; no SPA re-execution of this snippet (it lives in the static HTML head).
- No explicit “already loaded” guard (e.g. check for existing gtm script) — not required given the single schedule point.

**Result:** **PASS** — GTM script is loaded once per page load.

---

## 2. GTM script placed as early as possible without blocking rendering

**Requirement:** GTM snippet should be as early as feasible in the document while still avoiding blocking of initial parsing/rendering (e.g. LCP).

**Implementation:**

- The GTM snippet is the first script in `<head>`, immediately after `<meta charset>` and `<meta name="viewport">` (lines 7–20). No other scripts precede it; only critical meta and the snippet run first.
- The snippet does **not** load gtm.js immediately: it only **schedules** `loadGTM` via `requestIdleCallback(..., { timeout: 2000 })` or `setTimeout(..., 0)`. So:
  - No network request for gtm.js during initial parse; the browser can continue parsing and rendering.
  - gtm.js is loaded after “idle” (or on next tick), i.e. after first paint in typical cases, so LCP/INP are not blocked by GTM.
- The inline script itself is small and synchronous; it adds minimal parse cost and no I/O.

**Result:** **PASS** — Snippet is early in head and gtm.js is loaded asynchronously after first paint (or next tick), so rendering is not blocked.

---

## 3. `<noscript>` fallback exists in body

**Requirement:** A `<noscript>` fallback must be present so users with JavaScript disabled still receive the GTM iframe (ns.html).

**Implementation:**

- In `<body>`, immediately after the opening `<body>` tag (lines 70–72):
  - `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>`
- The iframe uses the same container ID as `data-gtm-id` (in production builds the ID is injected in both places via `VITE_GTM_ID`).

**Result:** **PASS** — `<noscript>` fallback with GTM iframe is present in body.

---

## 4. dataLayer initialized before GTM load

**Requirement:** `window.dataLayer` must exist (and ideally receive the `gtm.start` push) before gtm.js is requested/executed, so GTM can consume the queue.

**Implementation:**

- Inside `loadGTM()` the order is:
  1. `w[l]=w[l]||[]` — ensures `window.dataLayer` is an array (initialized if not already).
  2. `w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'})` — pushes the start event into dataLayer.
  3. `j=d.createElement(s); j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i; ... insertBefore(j,f)` — creates and injects the gtm.js script.
- So dataLayer is created and the `gtm.start` event is pushed **before** the gtm.js script element is added to the DOM. When gtm.js loads and runs, dataLayer already exists and contains the start event.

**Result:** **PASS** — dataLayer is initialized and `gtm.start` is pushed before gtm.js is injected.

---

## Summary

| # | Check | Result |
|---|--------|--------|
| 1 | GTM script loads once | **PASS** |
| 2 | GTM script placed as early as possible without blocking rendering | **PASS** |
| 3 | `<noscript>` fallback exists in body | **PASS** |
| 4 | dataLayer initialized before GTM load | **PASS** |

All four validation criteria are satisfied by the current implementation in `index.html`.

---

**Audit date:** 2025-02-08.  
**Source:** `index.html` (lines 2, 7–20, 70–72).
