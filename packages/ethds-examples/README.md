# ethds-examples

**Reference implementations** — worked examples of complete government
services built with ETHDS end-to-end. They show how the pieces fit
together: [design tokens](../ethds-tokens/) →
[components](../ethds-react/) → [patterns](../ethds-patterns/) →
[templates](../ethds-templates/) → a real service.

Reference implementations are also where gaps in the rest of the system
get found — a pattern that works in isolation but breaks in a real
multi-step flow. Findings feed back as fixes into earlier phases.

> **Status:** documented reference implementations — architecture,
> screens, composition code, accessibility/localization reviews, and
> deployment guidance
> ([Phase 10](../../docs/phases/phase-10-reference-implementations.md)).
> Runnable, deployed example apps are a follow-up.

## Portals

| Portal | Domain | Demonstrates |
|---|---|---|
| [Immigration Service Portal](immigration-service-portal.md) | Passports & visas | Application + status + payment + appointment |
| [Revenue Service Portal](revenue-service-portal.md) | Tax & fees | Login, filing, payment, receipts, dashboard |
| [Education Verification Portal](education-verification-portal.md) | Credentials | Public verification + institution issuance |
| [Municipal Permit Portal](municipal-permit-portal.md) | Local permits | Region→woreda→kebele, appointments, complaints |

## How each is documented

Each portal page covers the deliverables from
[Phase 10](../../docs/phases/phase-10-reference-implementations.md):

1. **Overview** — what the service does
2. **Architecture** — structure, routes, data, tech
3. **Key Screens** — the main pages (mapped to
   [templates](../ethds-templates/))
4. **React Implementation** — composition, routing, i18n/theme setup
5. **Accessibility Review** — how it meets WCAG 2.2 AA
6. **Localization Review** — six languages + Ethiopian formatting
7. **Deployment Guide** — build and host

## Shared foundation

Every reference implementation:

- Imports `@ethds/tokens/css` + `@ethds/react/styles.css`; theme from
  tokens.
- Composes [templates](../ethds-templates/) and
  [patterns](../ethds-patterns/) rather than re-building flows.
- Ships all six languages via the
  [localization framework](../../docs/localization/), with the
  [Language Switcher](../../docs/localization/language-switcher.md) in the
  header.
- Meets the [accessibility framework](../../docs/accessibility/) and is
  mobile-first / low-bandwidth.
