# ETHDS Localization Framework

Localization is a structural property of ETHDS, not a translation step at
the end. This framework makes the
[Multilingual by Default](../design-principles/02-multilingual-by-default.md)
principle concrete: how the six languages are architected, how text is
translated, and how dates, numbers, currency, addresses, and names are
formatted for Ethiopian contexts.

A service built on ETHDS is expected to work **fully** in all six
languages — partial language support is a defect, not a future task.

## Supported languages

| Locale | Language | Script | Direction |
|---|---|---|---|
| `en` | English | Latin | LTR |
| `am` | Amharic (አማርኛ) | Ge'ez (Ethiopic) | LTR |
| `om` | Afaan Oromoo | Latin (Qubee) | LTR |
| `ti` | Tigrinya (ትግርኛ) | Ge'ez (Ethiopic) | LTR |
| `so` | Somali (Soomaali) | Latin | LTR |
| `aa` | Afar (Qafar) | Latin | LTR |

All six are left-to-right; two use Ge'ez script, four use Latin script.

## Contents

| Document | Purpose |
|---|---|
| [Localization Strategy](localization-strategy.md) | Principles, scope, fallback model |
| [Language Architecture](language-architecture.md) | Locale codes, scripts, fonts, `lang`/`dir` |
| [Translation Structure](translation-structure.md) | File format, keys, ICU messages, tooling |
| [Date & Time Formatting](date-formatting.md) | Ethiopian + Gregorian calendars, time |
| [Number Formatting](number-formatting.md) | Digits, separators, phone numbers |
| [Currency Formatting](currency-formatting.md) | Ethiopian Birr (ETB) |
| [Address Standards](address-standards.md) | Region→zone→woreda→kebele; names |
| [Language Switcher](language-switcher.md) | The switcher behaviour standard |
| [Translation Workflow](translation-workflow.md) | How translations are contributed & reviewed |
| [Contributor Localization Guide](contributor-guide.md) | Step-by-step for translators |

## Relationship to the rest of ETHDS

- **Interdependent with [accessibility](../accessibility/):** correct
  `lang`, translated accessible names, and translated error messages are
  required for screen readers — see
  [screen-readers.md](../accessibility/screen-readers.md).
- **Implemented in components:** the i18n infrastructure and the
  [`LanguageSwitcher`](language-switcher.md) ship in `@ethds/react`
  ([`@ethds/react`](../../packages/ethds-react/)).
- **The docs site** already demonstrates the configured-locale model
  ([`ethds-docs`](../../packages/ethds-docs/)).
