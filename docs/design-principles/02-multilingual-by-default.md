# 2. Multilingual by Default

> Every component, pattern, and template supports English, Amharic, Afaan
> Oromo, Tigrinya, Somali, and Afar from the start. Localization is never
> retrofitted.

## Description

Multilingual support is a structural property of ETHDS, not a feature
layered on later. Every component accepts translated content, handles
text that expands or contracts between languages, renders Ge'ez script
correctly, and exposes a language choice the citizen controls. A service
built on ETHDS is expected to function fully in all six supported
languages — partial language support is treated as a defect, not a
future task.

## Rationale

Ethiopia is multilingual by constitution and by daily reality. A
government service offered only in English, or only in Amharic, is
inaccessible to millions of citizens who have an equal right to it.
Language is not a preference setting — for the citizen who reads only
Afaan Oromo or only Somali, it is the difference between a usable service
and no service at all.

Retrofitting localization always fails in predictable ways: layouts break
when translated text is longer, hardcoded English strings leak through,
date and number formats stay wrong, and the team runs out of budget
before the "translation phase" that was deferred. Building multilingual
from the first line of code is the only approach that actually delivers
equal service across languages, which is why it is a core principle rather
than an implementation detail.

## Examples

- A form renders identically well in Amharic (Ge'ez script) and Afaan
  Oromo (Latin script): labels, help text, validation errors, and the
  submit button are all translated, and the layout holds when a label in
  one language is twice as long as in another.
- The [Language Switcher](../../packages/ethds-react/) is present
  and reachable on every page, lets the citizen choose among all six
  languages, and persists that choice across the whole journey — it does
  not reset at each step.
- A confirmation message, an SMS receipt, and an error about a rejected
  upload are all delivered in the citizen's chosen language, not just the
  static page chrome.

## Anti-patterns

- **"English now, translation later":** shipping an English-only service
  with a plan to localise after launch. The later phase rarely arrives,
  and the architecture usually can't accommodate it when it does.
- **Translating chrome but not content:** localising menus and headings
  while leaving validation errors, status messages, emails, and SMS in
  English.
- **Hardcoded strings:** text baked into components instead of supplied as
  translatable content, so it can never be localised without code changes.
- **Layouts that assume English length:** fixed-width buttons or labels
  that truncate or overflow when the translated string is longer.
- **Broken script rendering:** fonts or input handling that mangle Ge'ez
  script for Amharic and Tigrinya.

## Implementation Guidance

- Never hardcode citizen-facing text in a component. All strings are
  supplied as translatable content through the
  [Localization Framework](../localization/),
  which defines the translation structure, the six-language architecture,
  and script/direction handling.
- Design and test every layout with the longest expected translation, not
  the English baseline, so nothing truncates or overflows.
- Localise the *whole* experience: validation, errors, confirmations,
  emails, SMS, and receipts — not only the visible page chrome. The
  [service patterns](../../packages/ethds-patterns/)
  treat translated error and status messaging as a requirement.
- Use the standard [Language Switcher](../../packages/ethds-react/)
  so language choice is consistent, discoverable, and persistent across
  every ETHDS service.
- Apply locale-correct date, number, and currency formatting (Ethiopian
  Birr, and Ethiopian calendar where appropriate) per the
  [Localization Framework](../localization/) —
  formatting is part of language support, not separate from it.
- Treat any component or pattern that works in only some languages as
  incomplete. This is checked in review, per
  [`CONTRIBUTING.md`](../../CONTRIBUTING.md#accessibility-and-localization).
