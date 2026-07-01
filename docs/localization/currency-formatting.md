# Currency Formatting

## The Ethiopian Birr

- Currency: **Ethiopian Birr**, ISO 4217 code **`ETB`**.
- Subunit: **santim** — 1 Birr = 100 santim, so amounts use **2 decimal
  places**.
- Symbol: commonly **"Br"** (Latin) or **"ብር"** (Ge'ez); the ISO code
  `ETB` is unambiguous and preferred where space and clarity allow.

## Standard: format with `Intl.NumberFormat`

Always format currency via `Intl`, with the active locale and
`currency: 'ETB'` — never by concatenating a symbol and a number:

```ts
const amount = 1234.5;

new Intl.NumberFormat('am-ET', { style: 'currency', currency: 'ETB' })
  .format(amount); // → ብር 1,234.50  (symbol per locale data)

new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' })
  .format(amount); // → ETB 1,234.50

// Force the ISO code for maximum clarity (e.g. receipts, payments)
new Intl.NumberFormat('en-ET', {
  style: 'currency', currency: 'ETB', currencyDisplay: 'code',
}).format(amount); // → ETB 1,234.50
```

Wrap this in a shared `formatCurrency(amount, { locale })` utility
(`@ethds/react`, [Phase 7](../phases/phase-7-core-components.md)) so every
service — especially the
[payment and receipt patterns](../phases/phase-8-government-service-patterns.md)
— displays money identically.

## Storage and precision

- **Store money as integer minor units (santim)** or a precise decimal —
  **never** as a binary floating-point Birr value — to avoid rounding
  errors in fees and totals.
- Convert to a display string only at the edge; keep arithmetic in minor
  units.

## Display rules

- Always show **2 decimal places** for Birr amounts in financial contexts
  (fees, payments, receipts), even for whole amounts (`ETB 50.00`).
- Be explicit on payment and receipt screens: show the currency code,
  itemised amounts, and the total — clarity here is also a
  [security/trust](../design-principles/08-security-and-privacy-by-design.md)
  concern (the citizen must understand exactly what they are paying).
- For input, accept amounts leniently (with or without separators) and
  validate after normalising; surface a numeric/decimal keyboard on
  mobile (`inputmode="decimal"`).

## Checklist

- [ ] Currency code `ETB`; amounts to 2 decimals (santim).
- [ ] Formatted via `Intl.NumberFormat`, not hand-built strings.
- [ ] Money stored as minor units / precise decimal, not float.
- [ ] Payment/receipt screens show code, itemisation, and total clearly.
