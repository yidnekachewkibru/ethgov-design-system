---
id: number-formatting
title: Number Formatting
sidebar_position: 5
---

# Number Formatting

## Digits

Ethiopian languages are written and entered with **Western Arabic
numerals** (0–9) in modern digital contexts — this is what citizens type
and expect on forms. Ge'ez has its own numerals (፩ ፪ ፫ …), but they are
not used for data entry or general numeric display in services; do not
render data values in Ge'ez numerals.

## Separators

- **Thousands separator:** comma — `1,234,567`.
- **Decimal separator:** dot — `1,234.56`.

Do not hardcode these; produce them with `Intl.NumberFormat` for the
active locale so they stay correct if conventions differ:

```ts
new Intl.NumberFormat('am-ET').format(1234567.5); // → 1,234,567.5
new Intl.NumberFormat('en-ET').format(1234567.5); // → 1,234,567.5
```

## Percentages and units

Use `Intl.NumberFormat` styles rather than appending symbols by hand:

```ts
new Intl.NumberFormat('am-ET', { style: 'percent', maximumFractionDigits: 1 })
  .format(0.075); // → 7.5%

new Intl.NumberFormat('en-ET', { style: 'unit', unit: 'kilometer' })
  .format(12); // → 12 km
```

## Phone numbers

- Ethiopia's country calling code is **+251**. National numbers are
  **9 digits** beginning with `9` (mobile) or `1`–`5`/`7` (fixed),
  conventionally written with a leading `0` nationally
  (e.g. `0911 234 567`) and `+251 91 123 4567` internationally.
- **Store** phone numbers in **E.164** (`+2519XXXXXXXX`).
- **Display** grouped for readability; **accept** input flexibly (with or
  without leading `0`, spaces, or `+251`) and normalise to E.164 on
  submit.
- Input fields use `type="tel"`, `inputmode="tel"`, and
  `autocomplete="tel"` so mobile keyboards and autofill work — supports
  [mobile-first](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/03-mobile-first.md).

## ID and reference numbers

Government identifiers (e.g. the national ID / Fayda number, TIN, permit
references) are formatted per their own official grouping and are **not**
run through locale number formatting (no thousands separators on an ID).
Treat them as formatted strings, validate against their official pattern,
and display in their canonical grouping.

## Input considerations

- Numeric inputs use `inputmode="numeric"` / `inputmode="decimal"` to
  surface the right mobile keyboard.
- Accept the citizen's input leniently (strip spaces) and validate after
  normalising; never reject a valid number because of a space or
  separator.

## Checklist

- [ ] Western Arabic numerals for data; no Ge'ez numerals for values.
- [ ] Separators via `Intl.NumberFormat`, not hardcoded.
- [ ] Phones stored E.164, displayed grouped, accepted flexibly.
- [ ] IDs validated/displayed by their official pattern, not number-formatted.
- [ ] Correct `inputmode`/`autocomplete` on numeric and tel inputs.
