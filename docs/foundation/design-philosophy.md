# Design Philosophy

ETHDS is built on ten core principles. This page states them; full
rationale, examples, and anti-patterns for each are delivered in
[Phase 1 — Design Principles](../phases/phase-1-design-principles.md).

1. **Start with Citizen Needs** — design decisions begin with what
   citizens need to accomplish, not with organizational structure.
2. **Multilingual by Default** — every component, pattern, and template
   supports English, Amharic, Afaan Oromo, Tigrinya, Somali, and Afar from
   the start. Localization is never retrofitted.
3. **Mobile First** — design and build for small screens and constrained
   devices first, then enhance for larger viewports.
4. **Accessibility by Default** — WCAG 2.2 AA is the floor, not a
   checklist applied at the end.
5. **Simple Before Powerful** — favor the simplest solution that meets
   the need; add complexity only when justified by real requirements.
6. **Design for Low Bandwidth** — government services must work on slow
   and unreliable connections, which are common across Ethiopia.
7. **Reuse Before Building** — check ETHDS for an existing component or
   pattern before creating something new.
8. **Security and Privacy by Design** — citizen data protection is
   considered at every layer, not bolted on afterward.
9. **Consistent Government Experience** — a citizen should recognize
   they're using a government service, and know how to navigate it,
   regardless of which ministry or agency built it.
10. **Open by Default** — ETHDS itself, and the services built with it,
    favor openness in process and code unless a specific reason requires
    otherwise.

These principles apply to every phase of the project and every package in
[`packages/`](../../packages/) — they are the test every design or
implementation decision is measured against.
