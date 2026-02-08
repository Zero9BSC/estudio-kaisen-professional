# Local SEO — Argentina and Patagonia

This document describes the local SEO configuration for Trelew, Chubut, and Patagonia: schema markup, geo data, service area, and title format.

---

## 1. Schema: ProfessionalService (LocalBusiness)

The business is represented as **ProfessionalService** (a subtype of LocalBusiness) inside the **@graph** in index.html.

### 1.1 Key fields

| Field | Value / description |
|-------|----------------------|
| @id | https://consultorakaisen.com.ar/#organization |
| name | Estudio Kaisen |
| address | PostalAddress: 9 de Julio 128, 1° piso A (Edificio Iberia), Trelew, Chubut, U9100, AR |
| telephone | +54-280-442-1137 |
| email | estudiokaisentrelew@gmail.com |
| geo | GeoCoordinates (office lat/long) |
| hasMap | Google Maps URL |
| containedInPlace | Reference to Place #trelew (city) |
| areaServed | Argentina, Patagonia, Chubut, City Trelew, plus cities (Trelew, Comodoro Rivadavia, Puerto Madryn, Rawson, Esquel, Gaiman, Dolavon, Patagonia Argentina) |
| serviceArea | Country (Argentina), AdministrativeArea (Chubut, Patagonia Argentina), City (Trelew) |
| openingHoursSpecification | Mon–Fri 09:00–18:00 |
| sameAs | Google Maps, Facebook, Instagram, LinkedIn |

---

## 2. Schema: Place (Trelew)

A **Place** node in the same @graph represents the city.

### 2.1 Structure (text diagram)

```
@graph
├── ProfessionalService (#organization)
│   └── containedInPlace → { "@id": "#trelew" }
└── Place (#trelew)
    ├── name: "Trelew, Chubut, Patagonia Argentina"
    ├── address: locality Trelew, region Chubut, country AR
    ├── geo: same coordinates as office
    └── containedInPlace: Chubut, Argentina
```

The ProfessionalService references the Place via `containedInPlace: { "@id": "#trelew" }` to anchor the business to the city.

---

## 3. Geo and service area summary

| Data | Where |
|------|--------|
| Coordinates | geo in ProfessionalService and in Place (Trelew). |
| Country/region | address.addressCountry (AR), address.addressRegion (Chubut), address.addressLocality (Trelew). |
| Service area | serviceArea: Argentina, Chubut, Patagonia Argentina, Trelew (City). |
| Area served (list) | areaServed: Argentina, Patagonia, Chubut, Trelew (City) plus city names. |

---

## 4. Title format for local CTR

Format: **Keyword / topic | Location | Brand** (or **Location | Brand**).

| Route | Title |
|-------|--------|
| / | Contador en Trelew \| Estudio Kaisen – Patagonia |
| /servicios | Servicios Contables y Jurídicos \| Estudio Kaisen – Trelew |
| /nosotros | Estudio Contable Trelew, Patagonia \| Nosotros – Estudio Kaisen |
| /contacto | Contacto Trelew, Chubut \| Estudio Kaisen – 9 de Julio 128 |

Goal: include “Trelew”, “Chubut”, or “Patagonia” in the title for local searches.

---

## 5. Meta geo tags

Set in useMetaTags and index.html:

| Meta | Value |
|------|--------|
| geo.region | AR-U (Argentina) |
| geo.placename | Trelew, Chubut |
| geo.position | -43.2519;-65.3054 |

---

## 6. Implementation files

| File | Role |
|------|------|
| index.html | JSON-LD @graph: ProfessionalService (hasMap, containedInPlace, serviceArea with City Trelew) and Place (#trelew). Base local title. |
| src/hooks/useMetaTags.js | Per-route titles with local format (Trelew, Chubut, Patagonia). |

---

## 7. Validation

- **Rich Results Test:** https://search.google.com/test/rich-results (URL or HTML).
- **Schema Validator:** https://validator.schema.org/ (paste JSON-LD from @graph).
- Confirm search results show title, URL, and snippets with Trelew/Chubut/Patagonia where relevant.

---

## 8. Last verified

| Item | Status |
|------|--------|
| index.html: @graph with ProfessionalService and Place (#trelew) | Verified |
| useMetaTags.js: local titles for /, /servicios, /nosotros, /contacto | Verified |
| serviceArea and areaServed (Argentina, Chubut, Trelew, cities) | Verified |

**Last verified:** 2025-02-06 (documentation rewrite).
