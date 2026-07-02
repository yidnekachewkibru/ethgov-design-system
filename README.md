# ETHDS — Ethiopian Government Design System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Phase](https://img.shields.io/badge/status-v1.0%20release%20candidate-blue.svg)](docs/release/readiness-report.md)

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

## Status

Phases 0–6 are complete: foundation and governance, the ten design
principles, the brand system, the `@ethds/tokens` package, the
documentation site, and the accessibility and localization frameworks.
Components, patterns, and templates are next. See the
[roadmap](docs/foundation/roadmap.md) for status and what's planned.

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
│   ├── ethds-tokens/      # @ethds/tokens     — design tokens (Phase 3)
│   ├── ethds-react/       # @ethds/react      — React components (Phase 7)
│   ├── ethds-icons/       # @ethds/icons      — icon set (Phase 7)
│   ├── ethds-patterns/    # @ethds/patterns   — service patterns (Phase 8)
│   ├── ethds-templates/   # @ethds/templates  — page templates (Phase 9)
│   ├── ethds-examples/    # ethds-examples    — reference apps (Phase 10)
│   ├── ethds-docs/        # ethds-docs        — documentation site (Phase 4)
│   └── ethds-rfcs/        # ethds-rfcs        — RFC archive (Phase 11)
└── docs/
    ├── foundation/        # vision, charter, philosophy, metrics, roadmap
    ├── governance/        # governance, repo strategy, community, release
    └── phases/            # full scope for every phase, 0 through 12
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

Usable now:

- [`@ethds/tokens`](packages/ethds-tokens/) — the design-token source of
  truth, built to CSS variables, a typed module, and a Tailwind preset.
- [`ethds-docs`](packages/ethds-docs/) — the Docusaurus documentation
  site (principles, brand, accessibility), multilingual and themed from
  `@ethds/tokens`, deployable to GitHub Pages.
- [`@ethds/react`](packages/ethds-react/) — the React component library:
  all 18 core components (Button, Link, Typography, Icon, form inputs,
  Alert/Notification, Breadcrumb, Pagination, Table, Header, Footer,
  LanguageSwitcher, …), accessible (WCAG 2.2 AA, axe-tested) and
  token-driven.

Components, patterns, and templates follow in later phases — watch the
[roadmap](docs/foundation/roadmap.md).

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
