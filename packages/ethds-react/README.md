# @ethds/react

The ETHDS React component library — accessible, multilingual government UI
components, built on [`@ethds/tokens`](../ethds-tokens/) and to the
[accessibility](../../docs/accessibility/) and
[localization](../../docs/localization/) standards.

> **Status:** Phase 7 complete — all 18 core components ship, each with
> types, tests (Testing Library + `vitest-axe`), and a Storybook story.

## Install

```bash
npm install @ethds/react @ethds/tokens react react-dom
```

## Usage

Import the token CSS (once, at your app root) and the component styles,
then use components:

```tsx
import '@ethds/tokens/css';     // design tokens (CSS custom properties)
import '@ethds/react/styles.css'; // component styles

import { Button, TextInput, Alert } from '@ethds/react';

function Example() {
  return (
    <form>
      <TextInput label="Given name" required />
      <Alert variant="success" iconLabel="Success">
        Application submitted.
      </Alert>
      <Button variant="primary" type="submit">
        Continue
      </Button>
    </form>
  );
}
```

All visible text is passed in as props/children, so it can be translated
by the consumer — no user-facing strings are baked into the components.

## Components

| Component | Notes |
|---|---|
| `Button` | primary / secondary / ghost / danger; sm / md / lg |
| `Link` | native anchor; external-link safety |
| `Heading`, `Text` | semantic type scale; `visualLevel` decoupling |
| `Icon` | 24×24 SVG; decorative (hidden) vs `label` (announced) |
| `TextInput` | label + hint + error wired via aria-describedby / aria-invalid |
| `TextArea` | multi-line, same field a11y wiring |
| `Checkbox` | labelled native checkbox; hint + error |
| `RadioGroup` | fieldset/legend; native radios (arrow-key roving) |
| `Select` | native-first labelled select; placeholder + error |
| `Search` | `role="search"` form; labelled field + submit |
| `Alert` | info / success / warning / error; role=alert/status; icon + text |
| `Notification` | dismissible, live-region message |
| `Breadcrumb` | nav landmark; `aria-current="page"` on the last item |
| `Pagination` | nav landmark; prev/next + truncated page list; translatable labels |
| `Table` | semantic `<table>` with caption + `scope="col"` headers |
| `Header` | government identity (home link) + primary nav + actions slot |
| `Footer` | grouped link navs + copyright |
| `LanguageSwitcher` | autonym options, per-option `lang`; per the localization spec |
| `ErrorSummary` | focusable `role="alert"` summary of form errors, links to fields |
| `SummaryList` | `<dl>` check-your-answers rows with accessible Change links |
| `Panel` | confirmation banner (title + reference), white on success green |
| `Tag` | status labels (neutral/info/success/warning/error), AA tints |
| `SkipLink` | first tab stop; visually hidden until focused |
| `StepIndicator` | labelled nav + `aria-current="step"` ("Step 2 of 4") |
| `CheckboxGroup` | fieldset/legend multi-select; `tile` variant (also on `RadioGroup`) |

## Accessibility

Every component targets **WCAG 2.2 AA**: semantic HTML, keyboard
operability, visible focus (`--ethds-color-focus`), correct name/role/state,
and no colour-only signalling. Components are tested with
`@testing-library/react` + `vitest-axe`. See
[`docs/accessibility/`](../../docs/accessibility/).

## Development

```bash
npm install
npm run build -w @ethds/tokens     # tokens are a dependency
npm run test  -w @ethds/react      # Vitest + Testing Library + axe
npm run typecheck -w @ethds/react
npm run build -w @ethds/react      # Vite library build → dist/
npm run storybook -w @ethds/react  # component workshop
```

### Structure

```
src/
  components/<Name>/    Component.tsx + .module.css + .test.tsx + .stories.tsx + index.ts
  utils/               cx() classname helper
  test/                vitest setup + axe helper
  index.ts             public barrel export
```

Styling is CSS Modules referencing the ETHDS token CSS custom properties
(`var(--ethds-*)`) — no hardcoded design values, no Tailwind dependency.
