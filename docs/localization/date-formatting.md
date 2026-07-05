# Date & Time Formatting

Ethiopia uses its own calendar and a distinctive way of telling time.
Government services must handle both correctly and unambiguously — getting
a date wrong on an appointment, permit expiry, or filing deadline has real
consequences for citizens.

## Two calendars

Ethiopia officially uses the **Ethiopian calendar** (E.C.) in daily and
governmental life, alongside the Gregorian calendar (G.C.) used
internationally. They differ substantially:

- The Ethiopian calendar has **13 months** — 12 months of 30 days plus
  **Pagumē**, a 13th month of 5 days (6 in a leap year).
- It runs roughly **7–8 years behind** the Gregorian calendar, and its new
  year (**Enkutatash**, Meskerem 1) falls around **11 September**.

### Standard: show the right calendar for the context

- For **citizen-facing Ethiopian government dates** (deadlines, issue/expiry
  dates, appointments), display the **Ethiopian calendar** in `am`/`ti`
  (and where the service's convention is E.C.), and consider showing both
  E.C. and G.C. where ambiguity would cause harm.
- Always make the calendar **explicit** when both are in play — label
  "E.C." / "ዓ.ም." or "G.C." rather than leaving the reader to guess.
- Store and exchange dates in an unambiguous machine format (ISO 8601,
  Gregorian, with timezone) internally; convert for display. Never store a
  date in a localized display string.

### Implementation: `Intl` with the Ethiopic calendar

The platform `Intl` APIs support the Ethiopic calendar directly, so no
custom calendar math is needed for display:

```ts
const date = new Date('2026-09-11T00:00:00+03:00');

// Ethiopian calendar, Amharic
new Intl.DateTimeFormat('am-ET-u-ca-ethiopic', { dateStyle: 'long' })
  .format(date); // → መስከረም 1 2019 (Ethiopian year)

// Gregorian, English
new Intl.DateTimeFormat('en-ET', { dateStyle: 'long' })
  .format(date); // → September 11, 2026
```

Wrap this in a shared `formatDate(date, { locale, calendar })` utility
(shipped with `@ethds/react`)
so every service formats dates the same way rather than re-implementing it.

## Numeric date order

Avoid ambiguous all-numeric dates (is `03/04` March 4 or 4 March?). Prefer
a format with a named or unambiguous month (`11 Sep 2026`,
`መስከረም 1 2019`). When a numeric format is unavoidable, follow the active
locale's `Intl` ordering and never hardcode `MM/DD` or `DD/MM`.

## Time of day

- Ethiopia commonly uses a **12-hour clock offset by ~6 hours** ("Ethiopian
  time"), where counting starts at dawn — so 1:00 in Ethiopian time ≈ 7:00
  a.m. international time. This is a frequent source of confusion.
- **Standard:** be explicit and consistent. For digital government
  services, prefer the **24-hour international clock** with the timezone
  (**EAT, UTC+3**) for anything time-critical (appointments, deadlines),
  and only present Ethiopian-time labels if the service's audience expects
  them — clearly labelled. Never present a bare time that could be read on
  either system.
- Format times via `Intl.DateTimeFormat` with the active locale and an
  explicit `timeZone: 'Africa/Addis_Ababa'`.

## Relative & ranges

Use `Intl.RelativeTimeFormat` for "in 3 days" / "2 hours ago" so phrasing
and plural rules follow the locale. For ranges, use
`Intl.DateTimeFormat.formatRange`.

## Checklist

- [ ] Dates stored in ISO 8601 (Gregorian, with TZ); converted for display.
- [ ] Calendar (E.C./G.C.) is explicit wherever both could be read.
- [ ] No hardcoded numeric date order; use `Intl`.
- [ ] Times carry timezone (EAT/UTC+3); no ambiguous bare times.
- [ ] One shared formatting utility, not per-service date code.
