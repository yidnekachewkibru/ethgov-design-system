# @ethds/e2e

Playwright end-to-end tests for `@ethds/react` — real-browser keyboard,
focus, and integration-level accessibility checks that complement (not
replace) the component-level `vitest-axe` gate. **Private; never
published.**

## What this covers vs. the unit test suite

- **`@ethds/react`'s own `vitest-axe` tests** (in each component's
  `.test.tsx`) verify semantics and axe-clean markup in an isolated jsdom
  render — fast, and the primary CI gate.
- **This package** drives real Storybook stories in a real Chromium: tab
  order and keyboard operability, actual browser focus state,
  `@axe-core/playwright` against fully rendered pages, `prefers-reduced-motion`
  behaviour, and the automatable slice of reflow at a 320px viewport.
  See `docs/accessibility/testing-framework.md`.

## Running locally

```bash
npm install
npm run build -w @ethds/tokens
npm run build -w @ethds/react
npm test -w @ethds/e2e         # starts @ethds/react's Storybook automatically
npm run test:ui -w @ethds/e2e  # Playwright's interactive UI mode
```

The Playwright config starts `@ethds/react`'s Storybook (`webServer`) and
tests navigate directly to story iframes
(`/iframe.html?id=<story>&viewMode=story`) rather than a bespoke test
harness app.

### Browser version

`@playwright/test` is pinned to an exact version (not a `^range`) so its
bundled Chromium build matches whatever browser is available in the
environment running the tests, rather than expecting `npx playwright
install` to fetch a newer build that may not be reachable.

## Structure

```
tests/
  helpers.ts            shared test utilities
  text-input.spec.ts    keyboard fill + error state
  date-input.spec.ts    day/month/year tab order + typed entry
  error-summary.spec.ts alert role + keyboard-reachable field links
  cookie-banner.spec.ts focus-on-mount + keyboard accept/reject
  step-indicator.spec.ts  aria-current="step" correctness
  axe-smoke.spec.ts     @axe-core/playwright across rendered stories
  reduced-motion.spec.ts  prefers-reduced-motion behaviour
  reflow-320.spec.ts    no page-level horizontal scroll at 320px
```
