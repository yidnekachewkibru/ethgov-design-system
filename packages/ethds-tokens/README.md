# @ethds/tokens

**Status:** Planned — built in
[Phase 3 — Design Tokens](../../docs/phases/phase-3-design-tokens.md).

## Purpose

The single source of truth for ETHDS design decisions — color, typography,
spacing, elevation, radius, and motion — expressed as platform-agnostic
JSON tokens, with generated CSS custom properties, a Tailwind theme, and
TypeScript types.

## Depends On

- [Phase 2 — Brand System](../../docs/phases/phase-2-brand-system.md) for
  the source palette, type scale, and spacing/elevation/radius/motion
  decisions this package encodes as tokens.

## Consumed By

- `@ethds/react` (component styling)
- `ethds-docs` (documentation theme)
- Any government team building outside this monorepo, via npm

No code lives here yet — this README is a placeholder so the package
exists as an npm workspace ahead of implementation.
