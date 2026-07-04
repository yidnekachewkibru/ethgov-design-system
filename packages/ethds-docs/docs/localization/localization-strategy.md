---
id: localization-strategy
title: Localization Strategy
sidebar_position: 1
---

# Localization Strategy

## Principles

1. **Built in from the first line.** Components, patterns, and templates
   are authored with externalised, translatable strings and
   locale-aware formatting from the start. There is no "add languages
   later" phase — see
   [Multilingual by Default](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/02-multilingual-by-default.md).
2. **The whole experience is localized**, not just page chrome: labels,
   help text, validation and error messages, confirmations, emails, SMS,
   receipts, and accessible names.
3. **No hardcoded user-facing text.** Every string a citizen can see comes
   from a translation catalogue keyed by message id, never a literal in
   code.
4. **Locale-aware formatting.** Dates, numbers, currency, and addresses
   are formatted per locale and Ethiopian conventions, not hardcoded to
   one format — see the formatting standards in this section.
5. **Layout survives translation.** Components are designed and tested
   with the longest expected translation and in Ge'ez script; nothing
   truncates, overflows, or hardcodes English text width.

## Scope

Applies to all ETHDS packages and to services built on ETHDS. The six
supported locales (`en, am, om, ti, so, aa`) are first-class; `en` is the
default source language in which content is authored.

## Fallback model

- **`en` is the source/default locale.** Strings are authored in English
  and translated into the other five.
- **Missing translations fall back to English** at the message level, so a
  partially-translated locale is still fully usable (English shows for the
  untranslated keys) rather than broken or blank.
- A missing key is a **defect to fix**, not a silent gap — the
  [translation workflow](translation-workflow.md) tracks coverage so
  fallbacks are visible and closed, not hidden.

## What "done" means for a locale

A locale is complete when every message id has a reviewed translation,
formatting (date/number/currency/address) is verified, and the UI has
been checked in that language for layout and — for Ge'ez locales —
screen-reader pronunciation. Coverage is a
[success metric](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/foundation/success-metrics.md).

## Separation of concerns

- **Translatable content** lives in catalogues (see
  [translation structure](translation-structure.md)).
- **Formatting** is handled by locale-aware utilities built on the
  platform `Intl` APIs (see the formatting standards).
- **Language selection** is handled by the standard
  [Language Switcher](language-switcher.md), and the chosen locale drives
  both content and formatting consistently across a whole journey.
