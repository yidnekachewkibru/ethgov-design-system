---
id: contributor-guide
title: Contributor Localization Guide
sidebar_position: 10
---

# Contributor Localization Guide

A practical, step-by-step guide for translating ETHDS. You do **not** need
to be a programmer to contribute translations — if you can read English
and write fluently in one of the supported languages, you can help.

## What you'll work with

Translations are plain **JSON** files, one folder per language, grouped by
area:

```
locales/<locale>/<namespace>.json   e.g. locales/am/common.json
```

Each entry is a **key** (a stable id — leave it unchanged) and a **value**
(the text to translate):

```json
{
  "common.button.submit": "Submit",
  "form.textInput.requiredError": "{label} is required"
}
```

## Steps

1. **Pick a language and area.** e.g. Amharic (`am`), the `common`
   namespace.
2. **Find missing keys.** Compare your locale's file to the English
   source (`locales/en/<namespace>.json`); the coverage report lists keys
   that are missing or out of date.
3. **Translate the *value* only.** Translate the English text into your
   language. **Never change the key.** For example, in `am/common.json`:
   ```json
   "common.button.submit": "አስገባ"
   ```
4. **Keep the placeholders.** Anything in curly braces — `{label}`,
   `{count}` — is a value the system fills in. Keep it exactly, and place
   it where it belongs in your language's word order:
   ```json
   "form.textInput.requiredError": "{label} ያስፈልጋል"
   ```
5. **Handle plurals with ICU.** If the English uses
   `{count, plural, one {…} other {…}}`, provide the plural forms your
   language uses — keep the `{count, plural, …}` structure:
   ```json
   "notification.session.expiresIn":
     "{count, plural, one {# ደቂቃ} other {# ደቂቃዎች}} ይቀራል"
   ```
6. **Don't translate** proper nouns, official scheme names, or
   identifiers that are canonical in one form; follow the language
   **glossary** for standard government terms so wording stays consistent.
7. **Open a pull request** with your changed JSON files. A localization
   reviewer for your language will review for accuracy and tone, then
   merge. See the [translation workflow](translation-workflow.md).

## Tips for good government translations

- **Plain, respectful tone.** Write as a helpful government service speaks
  to a citizen — clear and direct, not bureaucratic.
- **Translate whole sentences**, not fragments — never assemble a sentence
  from separate pieces; word order differs by language.
- **Match the meaning, not the words.** Convey what the citizen needs to
  understand or do.
- **Mind length.** Some translations are much longer than English; the UI
  is built to absorb this, but flag anything that clearly won't fit.

## Checking your work

- **Keys unchanged**, only values translated.
- **All placeholders** (`{…}`) preserved.
- **Valid JSON** (commas, quotes, braces) — a syntax error breaks the
  file; the CI check will tell you if it's malformed.
- If you can, **view it in the app/site in your language** and check it
  reads well and fits.

## Don't have a key yet?

If the English source is missing a string you need, or wording is unclear,
open an issue — adding/clearing English source strings is a contribution
too. See
[CONTRIBUTING.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/CONTRIBUTING.md).
