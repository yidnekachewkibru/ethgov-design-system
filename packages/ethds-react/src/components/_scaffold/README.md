# Remaining components (tracked)

The Phase 7 foundation batch ships these 8 components: **Button, Link,
Typography (Heading/Text), Icon, TextInput, TextArea, Alert, Breadcrumb**.

The following components from
[Phase 7](../../../../../docs/phases/phase-7-core-components.md) are
planned for follow-up passes and are **not yet implemented**:

| Component | Notes |
|---|---|
| Header | Government identity, nav, language switcher slot |
| Footer | Secondary identity + links |
| LanguageSwitcher | Per [localization spec](../../../../../docs/localization/language-switcher.md) |
| Search | Input + results affordance |
| Select | Native-first labelled select |
| Checkbox | Labelled, indeterminate support |
| Radio | Radio group (arrow-key roving) |
| Notification | Toast/live-region messaging |
| Table | Semantic data table, sortable headers |
| Pagination | Accessible page navigation |

Each will follow the same structure as the shipped components: component +
CSS module (tokens only) + types + tests (Testing Library + `vitest-axe`) +
Storybook story + `index.ts`, built to the
[accessibility](../../../../../docs/accessibility/) and
[localization](../../../../../docs/localization/) standards.
