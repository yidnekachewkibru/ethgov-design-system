# ETHDS — Ethiopian Government Design System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Phase](https://img.shields.io/badge/phase-0%20foundation-blue.svg)](docs/foundation/roadmap.md)

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

ETHDS is in **Phase 0 — Foundation**. The governance, contribution
process, and repository structure are in place; design tokens,
components, patterns, and templates have not been built yet. See the
[roadmap](docs/foundation/roadmap.md) for what's planned and in what
order.

## Language Support

ETHDS is multilingual by default, not as an afterthought. Every
component, pattern, and template is built to support:

- English
- Amharic (አማርኛ)
- Afaan Oromo
- Tigrinya (ትግርኛ)
- Somali
- Afar

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

1. Start with Citizen Needs
2. Multilingual by Default
3. Mobile First
4. Accessibility by Default
5. Simple Before Powerful
6. Design for Low Bandwidth
7. Reuse Before Building
8. Security and Privacy by Design
9. Consistent Government Experience
10. Open by Default

Full rationale and implementation guidance:
[`docs/foundation/design-philosophy.md`](docs/foundation/design-philosophy.md)
(detailed per-principle documentation lands in
[Phase 1](docs/phases/phase-1-design-principles.md)).

## Accessibility

ETHDS targets **WCAG 2.2 AA** as a minimum across every component,
pattern, and template — keyboard navigation, screen reader support,
focus management, contrast compliance, reduced motion, and touch
accessibility are requirements, not stretch goals. See
[Phase 5 — Accessibility Framework](docs/phases/phase-5-accessibility-framework.md).

## Getting Started

```bash
git clone https://github.com/yidnekachewkibru/ethgov-design-system.git
cd ethgov-design-system
npm install
```

There is no usable component or token library yet — this clones the
governance/documentation foundation and the empty workspace skeleton.
Watch the [roadmap](docs/foundation/roadmap.md) for when packages become
usable.

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
