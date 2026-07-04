---
id: design-philosophy
title: Design Philosophy
sidebar_position: 3
---

# Design Philosophy

ETHDS is built on ten core principles. This page states them in brief;
each links to its full documentation — rationale, examples, anti-patterns,
and implementation guidance — under
[`docs/design-principles/`](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/docs/design-principles)
(also summarized at [Design Principles](/docs/principles)).

1. **[Start with Citizen Needs](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/01-start-with-citizen-needs.md)**
   — design decisions begin with what citizens need to accomplish, not
   with organizational structure.
2. **[Multilingual by Default](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/02-multilingual-by-default.md)**
   — every component, pattern, and template supports English, Amharic,
   Afaan Oromo, Tigrinya, Somali, and Afar from the start. Localization is
   never retrofitted.
3. **[Mobile First](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/03-mobile-first.md)**
   — design and build for small screens and constrained devices first,
   then enhance for larger viewports.
4. **[Accessibility by Default](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/04-accessibility-by-default.md)**
   — WCAG 2.2 AA is the floor, not a checklist applied at the end.
5. **[Simple Before Powerful](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/05-simple-before-powerful.md)**
   — favor the simplest solution that meets the need; add complexity only
   when justified by real requirements.
6. **[Design for Low Bandwidth](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/06-design-for-low-bandwidth.md)**
   — government services must work on slow and unreliable connections,
   which are common across Ethiopia.
7. **[Reuse Before Building](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/07-reuse-before-building.md)**
   — check ETHDS for an existing component or pattern before creating
   something new.
8. **[Security and Privacy by Design](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/08-security-and-privacy-by-design.md)**
   — citizen data protection is considered at every layer, not bolted on
   afterward.
9. **[Consistent Government Experience](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/09-consistent-government-experience.md)**
   — a citizen should recognize they're using a government service, and
   know how to navigate it, regardless of which ministry or agency built
   it.
10. **[Open by Default](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/10-open-by-default.md)**
    — ETHDS itself, and the services built with it, favor openness in
    process and code unless a specific reason requires otherwise.

These principles apply to every phase of the project and every package in
[`packages/`](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/packages)
— they are the test every design or implementation decision is measured
against.
