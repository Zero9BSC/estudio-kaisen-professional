# Tracking system — Marketing team guide

This guide explains how the Estudio Kaisen site tracks user behavior and conversions, and how to use Google Tag Manager (GTM) and Google Ads with it. It is written for marketing and campaign managers who need to configure tracking and measure results.

---

## 1. Overview: what the site sends

The website sends **events** to Google Tag Manager (GTM) whenever users do certain actions. GTM then forwards those events to Google Analytics 4 (GA4) and, when you set it up, to Google Ads. You do **not** need to change the website code to add new tracking—you configure everything in GTM and Google Ads.

| What we track | When it fires | What you can use it for |
|---------------|----------------|--------------------------|
| **Page views** | Every time the user changes page (Home → Servicios → Contacto, etc.) | GA4 reports, remarketing audiences |
| **Contact form submit** | User successfully sends the contact form | **Main conversion** for Google Ads (e.g. “Lead”) |
| **WhatsApp click** | User clicks the green “Consultar” WhatsApp button | Optional conversion or engagement report |
| **Phone click** | User clicks a phone number link | Optional conversion or engagement report |

The site is **ready for conversion tracking**: the “contact form submit” event is already sent with a standard name so you can connect it to a Google Ads conversion in a few steps (see § 4).

---

## 2. GTM structure

### 2.1 How GTM is loaded

- The site loads **one** GTM container. The container ID is set in the website code (e.g. `GTM-XXXXXX`). Replace that placeholder with your real GTM container ID in **two** places in the site’s `index.html` (see your developer or [docs/env-configuration.md](env-configuration.md)).
- GTM loads **after** the page is visible (to keep the site fast). So the first second of the visit might not have GTM yet; page views and conversions that happen after that are sent normally.

### 2.2 What you need in GTM

Think of GTM in three parts: **Variables** (data), **Triggers** (when to fire), and **Tags** (what to fire, e.g. GA4 or Google Ads).

#### Variables (Data Layer)

The website pushes data into a “data layer.” In GTM you read that data with **Data Layer Variables**.

| Variable name (suggestion) | Data layer key | Use |
|----------------------------|----------------|-----|
| DL – page_path | `page_path` | Page path (e.g. `/servicios`) |
| DL – page_title | `page_title` | Page title (e.g. “Servicios Contables y Jurídicos…”) |
| DL – page_location | `page_location` | Full URL |
| DL – conversion_name | `conversion_name` | Conversion name (e.g. `contact_form`) |
| DL – conversion value | `value` | Optional: value in ARS |
| DL – currency | `currency` | Optional: e.g. ARS |

**How to create:** In GTM → **Variables** → **New** → **Data Layer Variable** → enter the **Data Layer Variable Name** (e.g. `page_path`). Save and use these variables in your tags.

#### Triggers (When to fire)

Create **Custom Event** triggers that fire when the website sends each event.

| Trigger name (suggestion) | Event name | When it fires |
|----------------------------|------------|----------------|
| CE – page_view | `page_view` | User changes page (every route change) |
| CE – conversion | `conversion` | A conversion happened (e.g. contact form submit) |
| CE – generate_lead | `generate_lead` | Lead generated (contact form; optional for GA4) |
| CE – form_submit | `form_submit` | Form submitted (contact form) |
| CE – whatsapp_click | `whatsapp_click` | User clicked WhatsApp button |
| CE – phone_click | `phone_click` | User clicked phone link |

**How to create:** In GTM → **Triggers** → **New** → **Custom Event** → enter the **Event name** exactly as in the table (e.g. `page_view`). Save.

#### Tags (What to fire)

| Tag type | Trigger | Purpose |
|----------|---------|---------|
| **GA4 Configuration** | All pages (or a Page View trigger) | Base GA4 tag; use your GA4 Measurement ID (G-XXXXXXXXXX). |
| **GA4 Event – page_view** | Trigger: CE – page_view | Sends page views to GA4 (path, title, URL). |
| **GA4 Event – generate_lead** | Trigger: CE – generate_lead | Sends “generate_lead” to GA4 (optional). |
| **Google Ads Conversion Tracking** | Trigger: CE – conversion | Sends conversions to Google Ads (see § 4). |

You can add more tags later (e.g. remarketing, other events). The **minimum** for the current site: one GA4 Configuration tag, one tag firing on `page_view`, and one Google Ads Conversion tag firing on `conversion` for contact form leads.

### 2.3 Quick checklist (GTM)

- [ ] Container ID is set in the website (replace GTM-XXXXXX).
- [ ] Data Layer Variables created for `page_path`, `page_title`, `page_location`, `conversion_name` (and optionally `value`, `currency`).
- [ ] Custom Event triggers created for `page_view`, `conversion`, and optionally `generate_lead`, `whatsapp_click`, `phone_click`.
- [ ] GA4 Configuration tag (Measurement ID) and GA4 Event tag for `page_view` are live.
- [ ] Google Ads Conversion tag is created and fires on `conversion` (see § 4).

---

## 3. Event naming convention

The website uses a **consistent naming convention** so GTM and Google Ads can rely on the same names everywhere.

### 3.1 Event names (snake_case)

All event names use **lowercase with underscores** (snake_case). These are the **exact** strings the site sends; GTM triggers must use the same spelling.

| Event name | Meaning |
|------------|---------|
| `page_view` | User viewed a page (fired on every route change). |
| `conversion` | A conversion occurred (e.g. contact form submit). Use `conversion_name` to tell which action. |
| `generate_lead` | A lead was generated (GA4 recommended event). |
| `form_submit` | A form was submitted; `form_type` indicates which form (e.g. contact_form). |
| `whatsapp_click` | User clicked the WhatsApp button; optional `source` (e.g. sticky_button). |
| `phone_click` | User clicked a phone link; optional `phone_number`. |

### 3.2 Parameters (data sent with each event)

Every event includes a **timestamp** (added automatically). The rest depend on the event:

| Event | Main parameters | Optional |
|-------|------------------|----------|
| **page_view** | `page_path`, `page_title`, `page_location` | — |
| **conversion** | `conversion_name` (e.g. `contact_form`) | `value`, `currency`, `transaction_id` |
| **generate_lead** | — | `value`, `currency` |
| **form_submit** | `form_type` (e.g. `contact_form`) | — |
| **whatsapp_click** | — | `source` (e.g. sticky_button); some components also send `event_category`, `event_label` |
| **phone_click** | — | `phone_number` |

**Naming:** Parameter names also use **snake_case** (e.g. `page_path`, `conversion_name`, `form_type`). Use these same names when you create Data Layer Variables in GTM.

### 3.3 Conversion names

For the **conversion** event, the site sends a **conversion_name** so you can have multiple conversion actions in Google Ads and fire the right tag for each.

| conversion_name | When it fires |
|-----------------|----------------|
| `contact_form` | User successfully submitted the contact form. |

If you add more conversions later (e.g. “newsletter_signup”), the developer can send `conversion` with a different `conversion_name`; in GTM you then add a trigger that fires only when `conversion_name` equals that value, and attach the matching Google Ads Conversion tag.

---

## 4. Conversion tracking readiness

The site is **ready** for conversion tracking: the right events are already sent. You only need to connect them in GTM and Google Ads.

### 4.1 What is already implemented

| Item | Status |
|------|--------|
| Contact form success sends `conversion` with `conversion_name: 'contact_form'` | ✅ Done |
| Same success sends `generate_lead` (for GA4) and `form_submit` | ✅ Done |
| Page views send `page_view` with path, title, URL | ✅ Done |
| WhatsApp click sends `whatsapp_click` | ✅ Done |
| Phone click can send `phone_click` (if used in the contact section or elsewhere) | ✅ Done |
| Optional: conversion value/currency can be passed (e.g. for lead value) | ✅ Supported in code; you map it in GTM if needed |

### 4.2 What you need to do

1. **GTM:** Create a Custom Event trigger for the event name `conversion`.
2. **GTM:** Create a **Google Ads Conversion Tracking** tag; set the trigger to that `conversion` trigger. If you only care about the contact form, you can optionally restrict the trigger to `conversion_name` equals `contact_form`.
3. **Google Ads:** Create the conversion action and get Conversion ID and Label; put them in the GTM tag (see § 5).
4. **Test:** Submit the contact form on the site, use GTM Preview to confirm the `conversion` event and the Google Ads tag fire. After 24–48 hours, check Google Ads → Goals → Conversions.

No changes to the website code are required for standard conversion tracking.

---

## 5. Future Google Ads integration — step-by-step

Follow these steps to send the contact form submit to Google Ads as a conversion.

### Step 1: Create the conversion action in Google Ads

1. In **Google Ads**, go to **Goals** → **Conversions**.
2. Click **New conversion action** → **Website**.
3. Choose **Use Google Tag Manager** (do not paste code into the site).
4. Configure the conversion:
   - **Conversion name:** e.g. “Contact form – Estudio Kaisen.”
   - **Category:** e.g. “Lead” or “Submit lead form.”
   - **Value:** Optional. Use “Same value for each conversion” (e.g. 1) or “Use different values” and map the value from the data layer in GTM (variable `value`).
   - **Count:** “One” (count one conversion per form submit).
5. Click **Create and continue**. Copy the **Conversion ID** and **Conversion Label** (you will paste them into GTM).

### Step 2: Create the conversion tag in GTM

1. In **GTM**, go to **Tags** → **New**.
2. **Tag type:** **Google Ads Conversion Tracking**.
3. **Conversion ID:** paste the ID from Google Ads (e.g. AW-123456789).
4. **Conversion Label:** paste the Label from Google Ads.
5. **Conversion Value:** leave empty, or use a Data Layer Variable (e.g. `value`) if you send value from the site.
6. **Currency code:** e.g. ARS (or leave default).
7. **Triggering:** Select the trigger that fires on the **conversion** event (e.g. “CE – conversion”). Optionally, edit that trigger to fire only when **conversion_name** equals `contact_form` so only contact form submissions count.
8. Save the tag. **Submit** the GTM container (Publish) so it goes live.

### Step 3: Test

1. On the website, open the contact form and submit it successfully.
2. In GTM, open **Preview**, enter your site URL, and connect.
3. In the tag assistant, trigger the form submit again. Confirm that:
   - The **conversion** event appears in the data layer.
   - Your **Google Ads Conversion Tracking** tag fires.
4. In Google Ads, wait 24–48 hours and check **Goals** → **Conversions** for the new conversion action. Conversions may show as “Unverified” for a short time until Google records a few events.

### Step 4: Optional — use WhatsApp or phone click as conversion

If you want “WhatsApp click” or “Phone click” to be a separate conversion (e.g. for optimization):

1. In Google Ads, create another conversion action (e.g. “WhatsApp click”).
2. In GTM, create a **Custom Event** trigger for `whatsapp_click` (or `phone_click`).
3. Create a second **Google Ads Conversion Tracking** tag with the new Conversion ID and Label, and set the trigger to the new trigger.
4. Publish the container.

The site already sends `whatsapp_click` and `phone_click`; no code change is required.

---

## 6. Summary table for marketing

| Goal | What to do |
|------|------------|
| See page views in GA4 | Create GA4 Configuration tag + GA4 Event tag on `page_view` trigger. |
| Count contact form submits as Google Ads conversion | Create conversion action in Google Ads → Create Google Ads Conversion tag in GTM on `conversion` event → Publish GTM. |
| Count WhatsApp clicks as conversion | Create conversion action in Google Ads → Create Google Ads Conversion tag in GTM on `whatsapp_click` trigger → Publish GTM. |
| Use conversion value (e.g. lead value in ARS) | In GTM, add Data Layer Variable `value` (and `currency` if needed). In the Conversion tag, set “Conversion Value” to that variable. Optionally ask dev to pass value when calling `trackContactConversion({ value: 123, currency: 'ARS' })`. |
| Add a new conversion type later | Developer adds a new `conversion` push with a new `conversion_name`. You add a GTM trigger (Custom Event `conversion` + condition conversion_name = new name) and a new Google Ads Conversion tag. |

---

## 7. Where to find more technical detail

- **GTM and data layer (technical):** [docs/tracking-analytics.md](tracking-analytics.md)
- **Environment and GTM ID:** [docs/env-configuration.md](env-configuration.md)
- **Implementation (code):** `src/utils/analytics.js`; `src/App.jsx` (page_view); `src/components/sections/ContactSection.jsx` (contact conversion)

---

**Last updated:** 2025-02-06 (marketing tracking guide).
