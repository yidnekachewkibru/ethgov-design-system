# Accessibility Testing Framework

Accessibility is verified continuously, not audited once at the end.
ETHDS combines automated checks (fast, catch regressions) with manual
testing (catch what automation can't). Automated tools catch roughly a
third to a half of issues — they are necessary but not sufficient, so
manual testing is required for anything new or non-trivial.

## Layers

### 1. Lint (authoring time)

- **`eslint-plugin-jsx-a11y`** flags common issues in JSX as code is
  written (missing `alt`, label-less inputs, invalid ARIA, non-interactive
  elements with handlers). Runs in the editor and in CI.

### 2. Unit / component tests (CI gate)

- **`axe-core`** via **`vitest-axe`** (or `jest-axe`) asserts that each
  component renders with no axe violations, in its key states (default,
  focused, invalid, disabled, open).
- Component tests also assert semantics directly with Testing Library
  (`getByRole`, accessible name queries), which fails if roles/names are
  wrong.
- Contrast at the token level is already enforced by the
  [`@ethds/tokens`](../../packages/ethds-tokens/) contrast tests.

### 3. End-to-end / interaction tests (CI gate)

- **Playwright** drives real keyboard flows: tab order, focus visibility,
  dialog focus trap + restoration, <kbd>Esc</kbd> behaviour, skip link,
  and error-focus on submit.
- **`@axe-core/playwright`** runs axe against fully rendered pages and
  reference implementations (catches integration issues components miss in
  isolation).
- Reduced-motion behaviour is checked by emulating
  `prefers-reduced-motion: reduce`.

### 4. Storybook (review + docs)

- The **Storybook a11y addon** (axe) surfaces violations per story, and
  stories document each component's keyboard and screen-reader behaviour
  ([Phase 7](../phases/phase-7-core-components.md)).

### 5. Manual testing (required for new/changed UI)

Automation cannot judge whether the *experience* is good. For any new or
materially changed component/pattern/template, a human verifies:

- **Keyboard-only** walkthrough of the whole flow.
- **Screen reader** pass with at least one of NVDA (Windows), VoiceOver
  (macOS/iOS), or TalkBack (Android) — confirming names, roles,
  announcements, and reading order.
- **200% zoom / reflow** at a 320px-wide viewport.
- **Reduced-motion** and **high-contrast/forced-colors** rendering.
- A pass in a **non-Latin (Ge'ez) language** to confirm screen-reader
  pronunciation and layout hold (ties to
  [localization](../phases/phase-6-localization-framework.md)).

## CI integration

Lint, component (axe + semantics), and E2E (Playwright + axe) checks run
on every PR via GitHub Actions and are **required to pass before merge**
for any change touching UI packages. This is wired into the component
package CI when `@ethds/react` is built in
[Phase 7](../phases/phase-7-core-components.md); the token contrast tests
already run today
([`.github/workflows/tokens.yml`](../../.github/workflows/tokens.yml)).

## Tooling summary

| Layer | Tool |
|---|---|
| Lint | `eslint-plugin-jsx-a11y` |
| Component a11y | `axe-core` + `vitest-axe`, Testing Library |
| Token contrast | `@ethds/tokens` Vitest suite |
| E2E / keyboard | Playwright + `@axe-core/playwright` |
| Storybook | a11y (axe) addon |
| Manual | NVDA / VoiceOver / TalkBack, zoom, reduced-motion, forced-colors |

A green automated suite is necessary but **not** sufficient — the
[checklist](checklist.md) and manual pass are required to call a change
accessible.
