---
id: address-standards
title: Address & Personal-Name Standards
sidebar_position: 7
---

# Address & Personal-Name Standards

Ethiopian addresses and names do not fit the Western "street address +
family surname" model that most form libraries assume. Forcing that model
excludes citizens or corrupts their data. ETHDS forms follow the actual
Ethiopian conventions.

## Administrative hierarchy

Ethiopia's administrative structure is, from largest to smallest:

```
Region (ክልል / kilil)
  └─ Zone (ዞን)            [in some regions; city administrations differ]
       └─ Woreda (ወረዳ)    [district]
            └─ Kebele (ቀበሌ) [neighbourhood / ward]
```

The two chartered city administrations — **Addis Ababa** and **Dire
Dawa** — sit at region level and are subdivided into sub-cities
(ክፍለ ከተማ) and woredas rather than zones.

### Address form fields

A standard ETHDS address captures, roughly outer-to-inner:

- **Region** (select from the official list of regional states + the two
  city administrations)
- **Zone / Sub-city** (dependent on region)
- **Woreda** (district)
- **Kebele** (ward) — often with a **house/holding number**
- **Optional:** landmark / additional directions (widely used, since many
  areas lack systematic street naming/numbering)
- **P.O. Box** (common for postal correspondence) and **city/town**

### Standards

- **Don't assume street + house number + postcode.** Street naming and
  house numbering are incomplete in much of the country, and postal codes
  are rarely used; never make a Western-style street address or a postal
  code mandatory.
- **Cascading selects:** Region → Zone/Sub-city → Woreda are dependent
  dropdowns sourced from official administrative lists, not free text,
  where data exists — this keeps data clean and reduces typing on
  [mobile](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/03-mobile-first.md).
- **Allow a free-text landmark/directions field**, because it reflects how
  people actually locate places.
- **Localized labels and values:** field labels and region/zone names are
  translated; official names exist in Ge'ez and Latin scripts — show the
  citizen's [active language](language-architecture.md).

## Personal names

Ethiopians traditionally **do not have an inherited family surname**. A
person's name is typically:

```
given name + father's name (+ grandfather's name)
```

So a citizen's "second name" is their **father's given name**, not a
shared family name, and it changes between generations.

### Standards

- **Do not label a field "Last name / Surname / Family name"** or assume
  the second name is shared with relatives. Use **"Given name"** and
  **"Father's name"** (and **"Grandfather's name"** where the service
  needs the full legal name), matching official Ethiopian identity
  documents.
- **Do not require a family name**, and do not auto-derive one.
- **Display order** is given name first; do not reorder to "Surname,
  First".
- **Match official documents:** identity, civil registration, and
  education services should capture names exactly as they appear on the
  citizen's official ID (e.g. the national/Fayda ID) so records reconcile.
- Support full Unicode incl. **Ge'ez script** in name fields; never
  restrict to ASCII.

## Why this matters

Name and address handling is where "multilingual by default" meets real
citizen data. A form that demands a surname or a street address turns
away the very citizens a government service exists to serve — this is the
[Start with Citizen Needs](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/01-start-with-citizen-needs.md)
principle applied to data capture. These conventions are built into the
[Registration](/docs/patterns/registration) and
[Application Submission](/docs/patterns/application-submission) patterns.

## Checklist

- [ ] Address: Region→Zone/Sub-city→Woreda→Kebele; no mandatory street/postcode.
- [ ] Cascading selects from official lists where available; free-text landmark allowed.
- [ ] Names: "Given name" + "Father's name" (+ grandfather's); no required surname.
- [ ] Name display in given-name-first order; Ge'ez script supported.
- [ ] Identity services capture names exactly as on the official ID.
