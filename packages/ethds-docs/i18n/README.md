# Translations (i18n)

This site is configured for all six ETHDS languages:

| Locale | Language |
|---|---|
| `en` | English (default — authored) |
| `am` | Amharic (አማርኛ) |
| `om` | Afaan Oromoo |
| `ti` | Tigrinya (ትግርኛ) |
| `so` | Somali (Soomaali) |
| `aa` | Afar (Qafar) |

English is the authored source. The other locales are **selectable from
the language menu** and fall back to English until their translations are
contributed — so the site is multilingual by configuration today, and
becomes multilingual in content as translations land.

## Adding a translation

Generate the translation files for a locale, then translate them:

```bash
# from the repo root
npm run write-translations -w ethds-docs -- --locale am
```

This creates `i18n/am/` with:

- `code.json` — theme/UI strings
- `docusaurus-plugin-content-docs/current/` — translated copies of the
  Markdown docs
- `docusaurus-theme-classic/navbar.json` & `footer.json`

Translate the values (not the keys), commit, and the locale serves
translated content. Untranslated strings continue to fall back to English.

The overall localization workflow and standards are defined in the
[Localization Framework](../../../docs/localization/).
