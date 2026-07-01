# Translation Structure

## Format: ICU MessageFormat in JSON catalogues

ETHDS translations are stored as JSON catalogues, one per locale, with
message values in **ICU MessageFormat** (the de-facto standard for
plurals, selection, and interpolation). This is the format used by
FormatJS / `react-intl`, the recommended i18n runtime for `@ethds/react`
([Phase 7](../phases/phase-7-core-components.md)). Docusaurus has its own
built-in i18n for the documentation site.

> **Why ICU MessageFormat:** it handles plural and gender/selection rules
> per locale correctly (Amharic, Oromo, etc. have their own plural rules),
> supports safe interpolation, and is widely tooled. Hand-rolled
> `"%s"`-style interpolation does not handle plural rules and is avoided.

## Key structure

Keys are namespaced by area, then component/screen, then meaning:

```
{namespace}.{component}.{element}
```

Examples:

```json
{
  "common.button.submit": "Submit",
  "common.button.cancel": "Cancel",
  "form.textInput.requiredError": "{label} is required",
  "service.application.status.approved": "Approved — ready for pickup",
  "notification.session.expiresIn": "{count, plural, one {# minute} other {# minutes}} left"
}
```

- Keys are stable identifiers in English-neutral form; **never** key by
  the English sentence (so fixing English copy doesn't orphan
  translations).
- One namespace per package/area (`common`, `form`, `service`,
  `notification`, …) to keep catalogues navigable and splittable.

## File layout

```
locales/
├── en/
│   ├── common.json
│   ├── form.json
│   └── service.json
├── am/
│   ├── common.json
│   └── …
├── om/ …
├── ti/ …
├── so/ …
└── aa/
```

`en` is the source of truth for the set of keys; other locales mirror its
keys. Missing keys fall back to `en` at runtime (see
[strategy](localization-strategy.md#fallback-model)).

## Usage example (`react-intl`)

```tsx
import { FormattedMessage, useIntl } from 'react-intl';

// Declarative
<FormattedMessage id="common.button.submit" defaultMessage="Submit" />;

// Imperative (e.g. accessible name, aria-label)
const intl = useIntl();
const label = intl.formatMessage(
  { id: 'form.textInput.requiredError', defaultMessage: '{label} is required' },
  { label: fieldLabel },
);
```

Plurals are handled by ICU, evaluated with the active locale's rules:

```tsx
<FormattedMessage
  id="notification.session.expiresIn"
  defaultMessage="{count, plural, one {# minute} other {# minutes}} left"
  values={{ count }}
/>
```

## Interpolation & safety

- Use named placeholders (`{label}`, `{count}`), never positional
  string concatenation — word order differs across languages.
- Never build a sentence by concatenating translated fragments; translate
  the whole sentence as one message with placeholders.
- Rich/formatted values use ICU rich-text tags rather than embedding HTML
  in translations.

## Coverage & quality tooling

- A check compares each locale's keys against `en` and reports missing or
  orphaned keys (used in CI and surfaced in the
  [translation workflow](translation-workflow.md)).
- **Pseudo-localization** (e.g. accenting and padding English by ~40%) is
  available for testing layout resilience without real translations.
