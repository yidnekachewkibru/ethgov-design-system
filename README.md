# ETHDS — Ethiopian Government Design System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-v1.0-blue.svg)

An open-source design system for Ethiopian government digital services —
inspired by the [GOV.UK Design System](https://design-system.service.gov.uk/),
[USWDS](https://designsystem.digital.gov/), and the
[Cyprus Government Unified Design System](https://designsystem.gov.cy/).

ETHDS provides the shared design principles, brand system, design tokens,
React component library, government service patterns, page templates, and
documentation that let Ethiopian ministries, agencies, regional and
municipal governments, public institutions, and educational bodies build
consistent, accessible, multilingual digital services — without each team
solving the same problems from scratch.

See [`docs/foundation/vision-and-mission.md`](docs/foundation/vision-and-mission.md)
for the full vision.

## What's Included

Everything is shipped and verified: the design tokens (`@ethds/tokens`),
32 accessible React components (`@ethds/react`), 10 government service
patterns (`@ethds/patterns`), 12 page templates (`@ethds/templates`),
four documented reference implementations, the ten design principles,
the brand system, the accessibility and localization frameworks, and a
six-language documentation site — with every component, pattern, and
template documented for React *and* plain HTML/CSS/JS.

## Language Support

ETHDS is multilingual by default, not as an afterthought. Every
component, pattern, and template is built to support:

- English
- Amharic (አማርኛ)
- Afaan Oromo
- Tigrinya (ትግርኛ)
- Somali
- Afar

The localization framework — language architecture, translation
structure, and Ethiopia-specific date (Ethiopian calendar), number,
currency (Birr), address, and name standards — is in
[`docs/localization/`](docs/localization/).

## Repository Structure

ETHDS is an npm-workspaces monorepo. See
[`docs/governance/repository-strategy.md`](docs/governance/repository-strategy.md)
for the full rationale.

```
ethgov-design-system/
├── packages/
│   ├── ethds-tokens/      # @ethds/tokens     — design tokens
│   ├── ethds-react/       # @ethds/react      — React components
│   ├── ethds-icons/       # @ethds/icons      — icon set
│   ├── ethds-patterns/    # @ethds/patterns   — service patterns
│   ├── ethds-templates/   # @ethds/templates  — page templates
│   ├── ethds-examples/    # ethds-examples    — reference apps
│   ├── ethds-docs/        # ethds-docs        — documentation site
│   └── ethds-rfcs/        # ethds-rfcs        — RFC archive
└── docs/
    ├── foundation/        # vision, charter, philosophy, metrics
    ├── design-principles/ # the ten core principles
    ├── brand/             # colour, typography, iconography, grid, motion
    ├── accessibility/     # WCAG 2.2 AA standards and testing framework
    ├── localization/      # six-language architecture and formatting standards
    └── governance/        # governance, repo strategy, community, release
```

## Core Principles

1. [Start with Citizen Needs](docs/design-principles/01-start-with-citizen-needs.md)
2. [Multilingual by Default](docs/design-principles/02-multilingual-by-default.md)
3. [Mobile First](docs/design-principles/03-mobile-first.md)
4. [Accessibility by Default](docs/design-principles/04-accessibility-by-default.md)
5. [Simple Before Powerful](docs/design-principles/05-simple-before-powerful.md)
6. [Design for Low Bandwidth](docs/design-principles/06-design-for-low-bandwidth.md)
7. [Reuse Before Building](docs/design-principles/07-reuse-before-building.md)
8. [Security and Privacy by Design](docs/design-principles/08-security-and-privacy-by-design.md)
9. [Consistent Government Experience](docs/design-principles/09-consistent-government-experience.md)
10. [Open by Default](docs/design-principles/10-open-by-default.md)

Each principle is documented in full — rationale, examples, anti-patterns,
and implementation guidance — under
[`docs/design-principles/`](docs/design-principles/).

## Accessibility

ETHDS targets **WCAG 2.2 AA** as a minimum across every component,
pattern, and template — keyboard navigation, screen reader support,
focus management, contrast compliance, reduced motion, and touch
accessibility are requirements, not stretch goals. The enforceable
standards, WCAG 2.2 mapping, testing framework, and per-change checklist
live in [`docs/accessibility/`](docs/accessibility/).

## Getting Started

```bash
git clone https://github.com/yidnekachewkibru/ethgov-design-system.git
cd ethgov-design-system
npm install

# Build the design tokens (@ethds/tokens → CSS / TS / Tailwind)
npm run build -w @ethds/tokens
npm run test  -w @ethds/tokens

# Run the documentation site locally (builds tokens first)
npm run start -w ethds-docs
```

The packages:

- [`@ethds/tokens`](packages/ethds-tokens/) — the design-token source of
  truth, built to CSS variables, a typed module, and a Tailwind preset.
  Framework-agnostic by design; component, pattern, and template docs on
  the [docs site](https://yidnekachewkibru.github.io/ethgov-design-system/)
  now include a plain-HTML/CSS(/JS where needed) example built on these
  same tokens, alongside the React one, for teams on other stacks.
- [`ethds-docs`](packages/ethds-docs/) — the Docusaurus documentation
  site (principles, brand, accessibility), multilingual and themed from
  `@ethds/tokens`, deployable to GitHub Pages.
- [`@ethds/react`](packages/ethds-react/) — the React component library:
  32 components (Button, Link, Typography, Icon, form inputs incl.
  Date input and File upload, Alert/Notification, Breadcrumb, Pagination,
  Table, Header, Footer, LanguageSwitcher, Error summary, Panel, Tag,
  Cookie/Phase banners, …), accessible (WCAG 2.2 AA, axe-tested) and
  token-driven.

[`@ethds/patterns`](packages/ethds-patterns/) and
[`@ethds/templates`](packages/ethds-templates/) build on these components
with the 10 service patterns and 12 page templates listed above.

## Contributing

Contributions are welcome — see [`CONTRIBUTING.md`](CONTRIBUTING.md) for
how to get started, and the [Code of Conduct](CODE_OF_CONDUCT.md) that
governs participation. Significant changes (new components, patterns, or
breaking changes) go through an RFC — see
[`packages/ethds-rfcs/`](packages/ethds-rfcs/).

## Governance

ETHDS is governed openly. See:

- [Governance Model](docs/governance/governance-model.md)
- [Community Model](docs/governance/community-model.md)
- [Release Strategy](docs/governance/release-strategy.md)

## License

[MIT](LICENSE)
