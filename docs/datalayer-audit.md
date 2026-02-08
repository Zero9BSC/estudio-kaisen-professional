# dataLayer implementation — audit

Audit of the dataLayer implementation: safe initialization, event coverage (page_view, contact/form, whatsapp, call), duplicate behavior, and schema examples.

---

## 1. Validation checklist

### 1.1 window.dataLayer initialized safely

**Requirement:** dataLayer must exist before app code pushes, and pushes must not throw when dataLayer is absent (e.g. SSR or before GTM loads).

**Implementation:**

- **Initialization:** In `index.html`, the GTM snippet’s `loadGTM()` runs `w[l]=w[l]||[]` (i.e. `window.dataLayer = window.dataLayer || []`) **before** injecting gtm.js. So dataLayer is created by the snippet before any async load.
- **App pushes:** In `src/utils/analytics.js`, the internal `push(payload)` only calls `window.dataLayer.push(...)` when `typeof window !== 'undefined' && window.dataLayer`. So pushes are skipped in SSR or if GTM has not run yet; no throw.
- **WhatsAppButton:** Uses `if (typeof window !== 'undefined' && window.dataLayer)` before pushing. Same safe guard.

**Result:** **PASS** — dataLayer is initialized in the GTM snippet before gtm.js; all app pushes guard on `window` and `window.dataLayer`.

---

### 1.2 page_view event exists

**Requirement:** A virtual page_view (or equivalent) must be pushed on route change for SPA so GTM/GA4 can track views.

**Implementation:**

- **Event:** `event: 'page_view'` with `page_path`, `page_title`, `page_location` (and `timestamp` added by `push()`).
- **Trigger:** `App.jsx` → `Root` → `useEffect` dependent on `location.pathname` calls `pushPageView({ page_path, page_title, page_location })`.
- **Frequency:** One push per navigation (one effect run per pathname change). In React Strict Mode (dev) the effect may run twice; in production, one push per route change.

**Result:** **PASS** — page_view exists and is fired on every route change from a single call site.

---

### 1.3 Contact / form / whatsapp / call events exist

**Requirement:** Contact (form submit), form, WhatsApp click, and phone call events must exist if the project supports those actions.

**Implementation:**

| Action | Event(s) | Where | Notes |
|--------|----------|------|--------|
| **Contact form success** | `form_submit`, `conversion`, `generate_lead` | ContactSection.jsx → trackContactConversion() | One user submit → three pushes (by design for GTM/GA4/Ads). |
| **Form submit** | `form_submit` with `form_type: 'contact_form'` | analytics.trackFormSubmit('contact_form') inside trackContactConversion | ✓ |
| **WhatsApp click** | `whatsapp_click` | WhatsAppButton.jsx → handleClick → dataLayer.push | Direct push with event_category, event_label. Not using analytics.trackWhatsAppClick (slightly different payload). |
| **Phone click** | `phone_click` with `phone_number` | ContactSection.jsx → trackPhoneClick('+542804421137') | ✓ |

**Result:** **PASS** — Contact/form, whatsapp, and call events are implemented. Contact fires form_submit + conversion + generate_lead; WhatsApp and phone each fire one event per action.

---

### 1.4 No duplicate event pushes

**Requirement:** The same user action should not accidentally push the same event more than once (unless intended, e.g. multiple tags for one conversion).

**Implementation:**

- **page_view:** Single call site (App.jsx useEffect [location.pathname]). One push per pathname change. No duplicate unless the effect runs twice (e.g. Strict Mode in dev).
- **Contact conversion:** trackContactConversion() is called once on form success (ContactSection, after result.status === 200). It intentionally pushes three **different** events (form_submit, conversion, generate_lead); no duplicate of the same event name.
- **WhatsApp:** One push per click (handleClick). No double-firing.
- **Phone:** trackPhoneClick() called from the phone link handler; one push per click.
- **Guards:** No “already sent” guard (e.g. debounce or sent flag); none required given single call sites per action.

**Result:** **PASS** — No duplicate pushes for the same event per action. Contact deliberately sends three distinct events for one submit.

---

## 2. dataLayer schema examples

Canonical shapes for each event. All app pushes add `timestamp` (ISO string) via `push()`; WhatsAppButton does not add timestamp.

---

### 2.1 page_view (SPA virtual page view)

**Source:** `pushPageView()` in analytics.js; called from App.jsx on route change.

```json
{
  "event": "page_view",
  "page_path": "/servicios",
  "page_title": "Servicios Contables y Jurídicos | Estudio Kaisen – Trelew",
  "page_location": "https://consultorakaisen.com.ar/servicios",
  "timestamp": "2025-02-08T18:00:00.000Z"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event | string | Yes | `"page_view"` |
| page_path | string | Yes | Pathname (e.g. `/`, `/servicios`) |
| page_title | string | Yes | document.title at push time |
| page_location | string | Yes | window.location.href |
| timestamp | string | Yes | ISO 8601 (added by push()) |

---

### 2.2 form_submit (form submission)

**Source:** `trackFormSubmit('contact_form')` inside trackContactConversion().

```json
{
  "event": "form_submit",
  "form_type": "contact_form",
  "timestamp": "2025-02-08T18:00:00.000Z"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event | string | Yes | `"form_submit"` |
| form_type | string | Yes | e.g. `"contact_form"` |
| timestamp | string | Yes | ISO 8601 (added by push()) |

---

### 2.3 conversion (Google Ads / conversion tracking)

**Source:** `pushConversion()` in analytics.js; used by trackContactConversion() with conversion_name `contact_form`.

```json
{
  "event": "conversion",
  "conversion_name": "contact_form",
  "currency": "ARS",
  "timestamp": "2025-02-08T18:00:00.000Z"
}
```

Optional: `value`, `transaction_id` when passed to pushConversion().

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event | string | Yes | `"conversion"` |
| conversion_name | string | Yes | e.g. `"contact_form"` |
| value | number | No | Conversion value |
| currency | string | No | Default `"ARS"` |
| transaction_id | string | No | Optional transaction id |
| timestamp | string | Yes | ISO 8601 (added by push()) |

---

### 2.4 generate_lead (GA4 recommended event)

**Source:** `pushGenerateLead()` inside trackContactConversion().

```json
{
  "event": "generate_lead",
  "timestamp": "2025-02-08T18:00:00.000Z"
}
```

Optional: `value`, `currency` when passed in options to trackContactConversion().

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event | string | Yes | `"generate_lead"` |
| value | number | No | Lead value |
| currency | string | No | e.g. ARS |
| timestamp | string | Yes | ISO 8601 (added by push()) |

---

### 2.5 whatsapp_click (WhatsApp button / link click)

**Source:** WhatsAppButton.jsx handleClick — direct dataLayer.push (no timestamp in current code).

**Payload A (current implementation in WhatsAppButton):**

```json
{
  "event": "whatsapp_click",
  "event_category": "engagement",
  "event_label": "sticky_button"
}
```

**Payload B (if using analytics.trackWhatsAppClick(source)):**

```json
{
  "event": "whatsapp_click",
  "source": "sticky_button",
  "timestamp": "2025-02-08T18:00:00.000Z"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event | string | Yes | `"whatsapp_click"` |
| event_category | string | No | Used in WhatsAppButton: `"engagement"` |
| event_label | string | No | Used in WhatsAppButton: e.g. `"sticky_button"` |
| source | string | No | Used in analytics.trackWhatsAppClick |
| timestamp | string | No | Present only when using analytics.js push() |

---

### 2.6 phone_click (phone number / call link click)

**Source:** `trackPhoneClick(phoneNumber)` in analytics.js; called from ContactSection (e.g. phone link).

```json
{
  "event": "phone_click",
  "phone_number": "+542804421137",
  "timestamp": "2025-02-08T18:00:00.000Z"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event | string | Yes | `"phone_click"` |
| phone_number | string | No | E.164 or display number |
| timestamp | string | Yes | ISO 8601 (added by push()) |

---

### 2.7 gtm.start (GTM bootstrap)

**Source:** index.html GTM snippet in loadGTM() before injecting gtm.js.

```json
{
  "gtm.start": 1739030400000,
  "event": "gtm.js"
}
```

Not pushed by app code; created by the GTM snippet. Included for completeness.

---

## 3. Summary

| Check | Result |
|-------|--------|
| window.dataLayer initialized safely | **PASS** |
| page_view event exists | **PASS** |
| Contact / form / whatsapp / call events exist | **PASS** |
| No duplicate event pushes | **PASS** |

**Note:** WhatsAppButton uses a direct push with `event_category` / `event_label` and does not add `timestamp`. For consistency with other events, consider using `trackWhatsAppClick('sticky_button')` from analytics.js so all app events include `timestamp` and a uniform `source` field.

---

**Audit date:** 2025-02-08.  
**Sources:** index.html, src/utils/analytics.js, src/App.jsx, src/components/sections/ContactSection.jsx, src/components/WhatsAppButton.jsx.
