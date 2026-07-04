---
id: translation-workflow
title: Translation Workflow
sidebar_position: 9
---

# Translation Workflow

How translations are added, reviewed, and kept in sync. Translating ETHDS
and the services built on it is a high-value, first-class contribution —
not an afterthought.

## Source of truth

- **English (`en`) is the source locale.** New and changed user-facing
  strings are added in English first, with a stable message id (see
  [translation structure](translation-structure.md)).
- The set of keys in `en` defines what every other locale must provide.

## Lifecycle of a string

1. **Add (English):** a contributor adds the message id and English text
   in the relevant `en/*.json` catalogue as part of their change.
2. **Detect gaps:** the coverage check compares each locale to `en` and
   flags missing/orphaned keys (runs in CI and is reported per locale).
3. **Translate:** a translator adds the value for the new key in their
   locale's catalogue (see the
   [contributor guide](contributor-guide.md)).
4. **Review:** a **localization reviewer** for that language reviews the
   translation for accuracy, tone (plain, respectful government voice),
   and terminology consistency, then approves — required sign-off per the
   [governance model](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/governance/governance-model.md).
5. **Merge & ship:** once merged, the locale serves the translated string;
   until then it falls back to English (no broken UI).

## Handling missing translations

- **Fallback to English** at the message level — a partially translated
  locale stays usable.
- Missing keys are tracked as **defects to close**, not hidden — coverage
  is a
  [success metric](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/foundation/success-metrics.md).
- When English copy changes meaning, the message id is changed (or
  translations flagged stale) so locales don't silently keep an outdated
  translation.

## Terminology consistency

- A per-language **glossary** of standard government terms (e.g. how
  "application", "woreda", "receipt" are rendered) keeps translations
  consistent across services. Reviewers maintain it.
- Don't translate proper nouns, official scheme names, or identifiers that
  are canonical in one form.

## Quality gates

- **Coverage check** (missing/orphaned keys vs `en`) in CI.
- **Pseudo-localization** build to catch hardcoded strings and
  layout/truncation issues before real translation.
- **ICU validation** so plural/select syntax is well-formed.
- **Layout & a11y review** in-language for new UI (longest-string and
  Ge'ez-script check; screen-reader pronunciation) — ties to the
  [accessibility testing framework](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/accessibility/testing-framework.md).

## Roles

- **Contributors** add English strings with ids and never hardcode text.
- **Translators** provide and update locale values.
- **Localization reviewers** (per language) approve translations and own
  the glossary — formalised in the
  [governance model](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/governance/governance-model.md).

## Tooling

Catalogues are plain JSON in the repo, so translation is reviewable like
code. Larger efforts may sync these catalogues with a translation
management platform, but the repo JSON remains the source of truth and the
review gate.
