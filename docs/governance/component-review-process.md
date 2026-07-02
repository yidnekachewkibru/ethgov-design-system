# Component Review Process

The bar a new or changed component must clear to enter `@ethds/react`.
Components are the foundation every pattern and service is built on, so the
bar is deliberately high — a defect here propagates to every consumer.

## Before code: an RFC

A **new** component (or a breaking change to one) starts with an
[RFC](rfc-process.md) covering the API, accessibility, and localization.
Implementation begins once the RFC is accepted.

## Review checklist

A component PR is merged only when **all** of the following hold:

### API & types

- [ ] Public API is minimal and consistent with existing components
      ([Simple Before Powerful](../design-principles/05-simple-before-powerful.md)).
- [ ] Exported TypeScript types; `ref` forwarded; valid HTML props spread.
- [ ] No hardcoded user-facing strings — all text passed in as
      props/children (translatable).

### Design & tokens

- [ ] Styling uses **only** ETHDS tokens (`var(--ethds-*)`) — no hardcoded
      colours/spacing/type.
- [ ] Visual states covered (default, hover, focus, active, disabled,
      invalid where relevant).

### Accessibility (required)

- [ ] Meets the [accessibility checklist](../accessibility/checklist.md):
      semantic HTML, keyboard operable, visible focus, correct
      name/role/state, ≥24px targets, no colour-only signalling.
- [ ] Accessibility reviewer sign-off — see
      [accessibility review process](accessibility-review-process.md).

### Localization (required)

- [ ] Works across all six languages (longest-string + Ge'ez layout);
      correct formatting where it renders dates/numbers/currency.
- [ ] Localization reviewer sign-off where user-facing — see
      [localization review process](localization-review-process.md).

### Tests & docs

- [ ] Unit tests (render + interaction) **and** an axe test
      (`vitest-axe`), covering the key states.
- [ ] A Storybook story demonstrating variants.
- [ ] Component documented (props, accessibility notes, usage).

### CI

- [ ] `react` CI green (typecheck + tests + build).

## Who signs off

- A **package maintainer** for `@ethds/react` approves the change overall.
- An **accessibility reviewer** signs off on the a11y aspects.
- A **localization reviewer** signs off where the component renders
  user-facing text or locale-sensitive formatting.

Maintainers do not merge a UI change that regresses accessibility,
localization, or the token discipline.
