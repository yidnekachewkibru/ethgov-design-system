# Language Switcher Standard

The Language Switcher is how a citizen chooses their language. Because it
is the gateway to the whole multilingual experience, its behaviour is
standardised so it works identically across every ETHDS service. The
component ships as `LanguageSwitcher` in `@ethds/react`
([Phase 7](../phases/phase-7-core-components.md)); this page is its
behavioural specification.

## Placement & presence

- Present on **every page**, in a consistent location — in the
  [Header](../phases/phase-7-core-components.md), top-right in LTR layouts.
- Reachable without scrolling and early in the tab order, so a citizen who
  cannot read the current language can immediately find it.

## Presenting the options

- Lists **all six** supported languages, each in **its own language and
  script** (an "autonym"), so a speaker recognises their language without
  reading the current one:

  | Locale | Shown as |
  |---|---|
  | `en` | English |
  | `am` | አማርኛ |
  | `om` | Afaan Oromoo |
  | `ti` | ትግርኛ |
  | `so` | Soomaali |
  | `aa` | Qafar |

- The current language is clearly indicated as selected.
- A small set (six) may render as a simple menu/dropdown; do not hide it
  behind an unlabelled globe icon alone — pair any icon with a text label
  (and an accessible name).

## Behaviour

1. **Switching applies immediately** to the whole experience — content
   **and** formatting (dates/numbers/currency) — keeping the citizen on
   the same page/step, not resetting their place or their entered data.
2. **The choice persists** across the entire journey and across visits:
   stored (e.g. `localStorage` and/or the locale in the URL) and reused on
   return. Switching never has to be repeated at each step — this directly
   serves [Multilingual by Default](../design-principles/02-multilingual-by-default.md).
3. **Updates `lang`** on the document to the new locale (and `dir` if ever
   relevant), so screen readers switch pronunciation —
   [accessibility/screen-readers](../accessibility/screen-readers.md).
4. **URL reflects locale** where the service uses path-based locales
   (e.g. `/am/…`), so a shared or bookmarked link opens in the right
   language.

## Accessibility

- Fully **keyboard operable** and screen-reader labelled, per the
  [keyboard](../accessibility/keyboard-navigation.md) and
  [screen-reader](../accessibility/screen-readers.md) standards.
- The control has an accessible name (e.g. "Choose language / ቋንቋ ይምረጡ");
  each option exposes its language via `lang` so its autonym is
  pronounced correctly.
- Meets the 24×24px target-size minimum and standard focus visibility.

## Anti-patterns

- Showing language names only in the current language (a citizen who can't
  read it can't find theirs).
- Resetting to the home page or losing form input on switch.
- Forgetting the choice, so the citizen re-selects on every page.
- A flag icon to denote a language (flags denote countries, not
  languages, and are ambiguous for Ethiopia's many languages).
- Not updating `lang`, leaving screen readers mispronouncing content.
