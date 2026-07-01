# Language Architecture

## Locale codes

ETHDS uses ISO 639-1 language codes, optionally with the `-ET` region
where region-specific formatting matters (e.g. `am-ET`). The canonical
locale identifiers are:

| Locale | BCP 47 | Region-qualified | Script |
|---|---|---|---|
| English | `en` | `en-ET` | Latin |
| Amharic | `am` | `am-ET` | Ge'ez (`Ethi`) |
| Afaan Oromoo | `om` | `om-ET` | Latin |
| Tigrinya | `ti` | `ti-ET` | Ge'ez (`Ethi`) |
| Somali | `so` | `so-ET` | Latin |
| Afar | `aa` | `aa-ET` | Latin |

Use the bare code (`am`) for content selection and the region-qualified
code (`am-ET`) for `Intl` formatting where Ethiopian conventions matter
(calendar, currency).

## Scripts & direction

- **All six locales are left-to-right (`dir="ltr"`).** ETHDS does not
  currently target an RTL language; components must still not hardcode
  direction (use logical CSS properties) so RTL can be added later without
  rework.
- **Ge'ez / Ethiopic script** (`am`, `ti`) requires fonts with full
  Ethiopic coverage — see [typography](../brand/typography.md). The
  default stack pairs `Noto Sans` (Latin) with `Noto Sans Ethiopic`
  (Ge'ez), with a `system-ui` fallback so text stays legible if web fonts
  fail to load.
- **Latin-script Ethiopian languages** (`om` Qubee, `so`, `aa`) use
  standard Latin glyphs but their own orthographies and vocabulary — they
  are distinct languages, never "English with different words."

## `lang` and document metadata

- Every page sets the document `lang` to the active locale, and any
  inline run in a different language sets its own `lang`. This is required
  for correct screen-reader pronunciation (WCAG 3.1.1/3.1.2) — see
  [accessibility/screen-readers](../accessibility/screen-readers.md).
- Pages expose alternate-language links (`hreflang`) so the right locale
  is discoverable.

```html
<html lang="am">
  …
  <p>ይህ በአማርኛ ነው <span lang="en">(this part is English)</span></p>
```

## Locale resolution order

When determining which locale to show:

1. Explicit user choice (persisted) — set via the
   [Language Switcher](language-switcher.md).
2. URL locale segment (e.g. `/am/…`) where the service uses path-based
   locales.
3. `Accept-Language` / browser preference, matched to a supported locale.
4. Default to `en`.

The resolved locale drives **both** translated content **and** formatting,
so a citizen never sees Amharic text with English-formatted dates.

## Adding a language later

New languages are added by introducing the locale code, providing fonts
if a new script is involved, adding a translation catalogue, and
declaring formatting conventions. Because direction and formatting are
never hardcoded, adding a locale does not require touching component
internals.
