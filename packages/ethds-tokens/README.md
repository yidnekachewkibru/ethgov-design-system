# @ethds/tokens

The single source of truth for ETHDS design decisions — colour,
typography, spacing, elevation, radius, and motion — authored as
platform-agnostic JSON and built to CSS custom properties, a typed
JavaScript/TypeScript module, a Tailwind preset, and resolved JSON.

The values encode the decided [ETHDS Brand System](../../docs/brand/) and
are verified against WCAG 2.2 AA (see
[accessibility-analysis.md](../../docs/brand/accessibility-analysis.md));
the test suite re-checks those contrast invariants on every build so the
palette cannot silently regress.

## Install

```bash
npm install @ethds/tokens
```

## Usage

**CSS custom properties** — import once at your app root:

```css
@import "@ethds/tokens/css";

.button-primary {
  background: var(--ethds-color-primary);  /* Ethiopian Star Blue */
  color: var(--ethds-white);
  padding: var(--ethds-space-3) var(--ethds-space-4);
  border-radius: var(--ethds-radius-md);
}
```

**TypeScript / JavaScript** — typed token values:

```ts
import { tokens, cssVars } from "@ethds/tokens";

tokens.color.primary;     // "#194B9C"
tokens.space["4"];        // "1rem"
tokens.font.weight.bold;  // 700
cssVars["--ethds-blue-600"]; // "#194B9C"
```

**Tailwind CSS** — use the generated preset:

```js
// tailwind.config.cjs
module.exports = {
  presets: [require("@ethds/tokens/tailwind")],
  content: ["./src/**/*.{ts,tsx}"],
};
```

## Token Architecture

Two tiers, following the DTCG (`$value` / `$type`) convention:

- **Global tokens** — the raw palette and scales (`color.blue.600`,
  `space.4`, `radius.md`). These are the primitive values.
- **Semantic tokens** — role-based tokens that *reference* globals
  (`color.primary` → `{color.blue.600}`, `color.border` →
  `{color.gray.500}`). Components consume semantic tokens so the mapping
  can evolve centrally.

### CSS variable naming

| Token | CSS variable |
|---|---|
| Palette colour `color.blue.600` | `--ethds-blue-600` |
| Semantic colour `color.primary` | `--ethds-color-primary` |
| `space.4` | `--ethds-space-4` |
| `font.size.base` | `--ethds-text-base` |
| `radius.md` | `--ethds-radius-md` |
| `motion.duration.base` | `--ethds-motion-base` |

These names match the reference
[`docs/brand/assets/ethds-brand.css`](../../docs/brand/assets/ethds-brand.css);
that file is the human-readable reference, and this package is the
canonical generator of the same output.

## Sources & Build

```
tokens/        # SOURCE OF TRUTH — DTCG JSON (edit these)
scripts/build.mjs   # zero-dependency builder
dist/          # GENERATED — do not edit, not committed
```

```bash
npm run build -w @ethds/tokens   # regenerate dist/
npm run test  -w @ethds/tokens   # ref resolution + WCAG contrast invariants
```

The build has **no third-party dependencies**. The JSON is DTCG-format, so
migrating to a transformer such as Style Dictionary later is
straightforward if ever needed.

## Depends On

- [Phase 2 — Brand System](../../docs/phases/phase-2-brand-system.md) for
  the source values this package encodes.

## Consumed By

- `@ethds/react` ([Phase 7](../../docs/phases/phase-7-core-components.md))
- `ethds-docs` ([Phase 4](../../docs/phases/phase-4-documentation-platform.md))
- Any government team building outside this monorepo, via npm
