# Tracking and analytics

This document describes the Google Tag Manager (GTM) setup, dataLayer events, and Google Ads conversion tracking for the Estudio Kaisen site.

---

## 1. GTM loading

### 1.1 Container ID

- Set in **index.html** in two places:
  1. `<html data-gtm-id="GTM-XXXXXX">`
  2. Noscript iframe: `id="GTM-XXXXXX"` (same value).
- Replace **GTM-XXXXXX** with your GTM container ID in both places.

### 1.2 Load timing (text diagram)

```
Page load
    → First paint (HTML, CSS, main content)
    → requestIdleCallback (or setTimeout) fires
        → GTM snippet reads data-gtm-id from <html>
        → Injects gtm.js script
        → dataLayer created; tags fire per GTM configuration
```

GTM is loaded **after first paint** to avoid blocking LCP and INP. The inline snippet in index.html does not load gtm.js immediately; it schedules load when the browser is idle.

### 1.3 dataLayer

- The GTM script creates `window.dataLayer`.
- Helpers in `src/utils/analytics.js` push events to `window.dataLayer` only when it exists (i.e. after GTM has loaded).

---

## 2. dataLayer helpers

All helpers live in **`src/utils/analytics.js`**.

| Helper | Purpose |
|--------|---------|
| pushPageView(params) | Virtual page view on route change. Params: page_path, page_title, page_location. |
| pushConversion(params) | Google Ads conversion. Params: conversion_name, value, currency, transaction_id. |
| pushGenerateLead(value, currency) | GA4 generate_lead (optional). |
| trackContactConversion(options) | Contact form success: fires form_submit, conversion, generate_lead. |
| trackEvent(name, params) | Generic event. |
| trackFormSubmit(formType) | Form submit event. |
| trackPhoneClick(phoneNumber) | Phone link click. |
| trackWhatsAppClick(source) | WhatsApp link click. |

---

## 3. Event flow (text diagram)

### 3.1 Page view (SPA)

```
User navigates (e.g. / → /servicios)
    → React Router updates
    → App.jsx (Root) useEffect [location.pathname]
        → pushPageView({ page_path, page_title, page_location })
            → dataLayer.push({ event: 'page_view', ... })
    → GTM: Custom Event trigger "page_view" fires
        → GA4 page view tag (or other tags) fire
```

- **Event name:** `page_view`.
- **Payload:** event, page_path, page_title, page_location, timestamp (example).

### 3.2 Contact conversion

```
User submits contact form successfully
    → ContactSection.jsx: trackContactConversion({ conversion_name: 'contact_form' })
        → dataLayer.push form_submit
        → dataLayer.push conversion (conversion_name: 'contact_form')
        → dataLayer.push generate_lead (optional)
    → GTM: Custom Event "conversion" fires
        → Google Ads Conversion tag fires (Conversion ID + Label from GTM)
```

- **Optional:** Pass value/currency in trackContactConversion for conversion value.

---

## 4. GTM configuration (summary)

1. **Variables:** Data Layer Variable for `conversion_name`; Data Layer Variables for `page_path`, `page_title`, `page_location` if needed.
2. **Triggers:** Custom Event `page_view`; Custom Event `conversion`; (optional) Custom Event `form_submit`, `generate_lead`.
3. **Tags:** Google Ads Conversion (trigger: conversion); GA4 Configuration / page_view (trigger: page_view); GA4 generate_lead (trigger: generate_lead) if used.

---

## 5. Google Ads configuration (summary)

1. In Google Ads: create a conversion action (e.g. “Contact form submit”), type Website, “Use Google Tag Manager”.
2. Copy Conversion ID and Conversion Label.
3. In GTM: create tag “Google Ads Conversion Tracking”, enter ID and Label, trigger = Custom Event `conversion`. Optionally map conversion value from a Data Layer Variable.
4. Test: Submit the contact form on the site, use GTM Preview to confirm the `conversion` event and tag fire. In Google Ads, check Conversions after 24–48 hours.

---

## 6. Event reference

| Event | When | Typical use |
|-------|------|--------------|
| page_view | Every route change | GA4 page view, remarketing |
| conversion | Contact form success | Google Ads conversion tag |
| generate_lead | Contact form success | GA4 generate_lead |
| form_submit | Contact form success | Generic form tracking |
| phone_click | Phone link click | Optional conversion or event |
| whatsapp_click | WhatsApp button click | Optional conversion or event |

---

## 7. Implementation files

| File | Role |
|------|------|
| index.html | data-gtm-id on &lt;html&gt;; noscript iframe; GTM snippet (deferred load). |
| src/utils/analytics.js | pushPageView, pushConversion, trackContactConversion, and other helpers. |
| src/App.jsx | On route change calls pushPageView({ page_path, page_title, page_location }). |
| src/components/sections/ContactSection.jsx | On form success calls trackContactConversion({ conversion_name: 'contact_form' }). |

---

## 8. Last verified

| Item | Status |
|------|--------|
| index.html: GTM deferred via requestIdleCallback/setTimeout; data-gtm-id | Verified |
| analytics.js: pushPageView, trackContactConversion, etc. | Verified |
| App.jsx: pushPageView on location change | Verified |
| ContactSection.jsx: trackContactConversion on form success | Verified |

**Last verified:** 2025-02-06 (documentation rewrite).
