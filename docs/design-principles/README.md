# ETHDS Design Principles

These ten principles are the test every ETHDS design and implementation
decision is measured against. They are not aspirations — they are the
working rules contributors and government teams apply when building
services with ETHDS.

When two good options conflict, the principles decide. When a pull
request is reviewed, these are the criteria. When a service team asks
"should we do it this way?", the answer is found here.

## The Principles

| # | Principle | In one sentence |
|---|---|---|
| 1 | [Start with Citizen Needs](01-start-with-citizen-needs.md) | Design decisions begin with what citizens need to accomplish, not with how government is organized. |
| 2 | [Multilingual by Default](02-multilingual-by-default.md) | Every component, pattern, and template supports all six languages from the start — localization is never retrofitted. |
| 3 | [Mobile First](03-mobile-first.md) | Design and build for small, constrained devices first, then enhance for larger screens. |
| 4 | [Accessibility by Default](04-accessibility-by-default.md) | WCAG 2.2 AA is the floor every release meets, not a checklist applied at the end. |
| 5 | [Simple Before Powerful](05-simple-before-powerful.md) | Favour the simplest solution that meets the need; add complexity only when a real requirement justifies it. |
| 6 | [Design for Low Bandwidth](06-design-for-low-bandwidth.md) | Services work on slow, metered, and unreliable connections, because that is the reality across Ethiopia. |
| 7 | [Reuse Before Building](07-reuse-before-building.md) | Check ETHDS for an existing component or pattern before creating something new. |
| 8 | [Security and Privacy by Design](08-security-and-privacy-by-design.md) | Citizen data protection is considered at every layer, not bolted on afterward. |
| 9 | [Consistent Government Experience](09-consistent-government-experience.md) | A citizen recognises a government service and knows how to use it, regardless of which body built it. |
| 10 | [Open by Default](10-open-by-default.md) | ETHDS, and the services built with it, favour openness in process and code unless a specific reason requires otherwise. |

## How Each Principle Is Documented

Every principle page follows the same structure so it can be applied
directly:

- **Description** — what the principle means in practice
- **Rationale** — why it matters for Ethiopian government services
- **Examples** — concrete scenarios of getting it right
- **Anti-patterns** — concrete things not to do
- **Implementation Guidance** — actionable rules, and which ETHDS phase or
  package enforces them

## Relationship to the Rest of ETHDS

These principles are stated in brief in
[`docs/foundation/design-philosophy.md`](../foundation/design-philosophy.md)
and expanded here. Several are operationalised by later work:
Accessibility by the [Accessibility Framework](../phases/phase-5-accessibility-framework.md),
Multilingual by Default by the [Localization Framework](../phases/phase-6-localization-framework.md),
and Low Bandwidth / Reuse by the token, component, and pattern packages.
Where that is the case, the principle page links to it.
