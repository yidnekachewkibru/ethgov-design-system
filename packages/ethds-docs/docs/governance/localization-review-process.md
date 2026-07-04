---
id: localization-review-process
title: Localization Review Process
sidebar_position: 10
---

# Localization Review Process

How localization sign-off works. This operationalizes the
[Localization Framework](/docs/localization) so "multilingual by default"
is enforced in review, and translations stay accurate and consistent.

## When a localization review is required

- Any change that adds or alters **user-facing text** or locale-sensitive
  **formatting** (dates, numbers, currency, names, addresses).
- Any new/updated **translation** in a locale catalogue.
- Any change to the localization **standards** themselves (also needs
  maintainer consensus).

## Two kinds of review

### 1. Structural (any UI change)

A maintainer/reviewer confirms the change is **localization-ready**:

- [ ] No hardcoded user-facing strings; all text externalized as
      translatable messages (see
      [translation structure](/docs/localization/translation-structure)).
- [ ] Layout survives the longest translation and Ge'ez script.
- [ ] Correct formatting utilities used (Ethiopian calendar, Birr, phone,
      address) — not hand-built strings.
- [ ] `lang` set correctly; the
      [Language Switcher](/docs/localization/language-switcher) behaviour
      preserved.

### 2. Translation (per language)

A **localization reviewer for that language** checks each new/changed
translation:

- [ ] Accurate meaning (conveys what the citizen needs, not word-for-word).
- [ ] Plain, respectful government tone.
- [ ] Terminology matches the language **glossary** (consistent across
      services).
- [ ] Placeholders (`{name}`, plurals) preserved and correctly placed.
- [ ] Valid ICU/JSON (the coverage check passes).

## Who reviews

- **Structural:** a package maintainer or reviewer.
- **Translation:** a **localization reviewer** for the specific language,
  per the [contributor ladder](contributor-ladder.md). Sign-off is
  **required** to merge a translation.

## Coverage & fallback

- The coverage check compares each locale to the English source and
  reports missing/orphaned keys (CI).
- Missing translations fall back to English at the message level, so a
  partially translated locale stays usable — but a gap is a **defect to
  close**, tracked as a
  [success metric](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/foundation/success-metrics.md),
  not a silent omission.

The full workflow (author English → detect gaps → translate → review →
ship) is in the
[translation workflow](/docs/localization/translation-workflow).
