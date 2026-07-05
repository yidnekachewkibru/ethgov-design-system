# Manual Accessibility Audit — 2026

## Status and authorship disclaimer

**This document was authored by an AI coding agent without access to
real assistive technology (no physical or virtual NVDA, JAWS,
VoiceOver, or TalkBack session was run to produce it).** It is,
honestly, the *automatable and code-inspectable half* of a manual
audit — not a completed one. Every item below is tagged with exactly
how it was verified:

- **✅ Verified — automated** — a real, currently-passing test asserts
  this. The test file is cited; you can run it yourself.
- **🔍 Verified — code inspection** — read directly from the component
  or pattern source and cross-checked against the requirement. No
  test asserts it end-to-end, but the implementation was inspected
  line-by-line.
- **⬜ Open — requires a human tester with real AT** — this needs a
  person, a device, and real assistive technology. Nothing in this
  repository can close these items; they are listed so a human
  auditor has a ready-made checklist rather than starting from zero.

Treat the ⬜ items as the actual to-do list. Do not report this
document as "the accessibility audit is done" — report it as "the
automated and inspectable half is done; here is exactly what a human
still needs to check."

This audit is structured around [`checklist.md`](checklist.md)'s nine
categories and reflects the codebase as of this PR: `@ethds/react`
(32 components), the auth patterns in `@ethds/patterns` (Login,
Registration, OTP Verification), the error-page templates in
`@ethds/templates` (404, 403, 500), `@ethds/tokens`, and the
`@ethds/e2e` Playwright suite. As more patterns and templates land,
this document's automated/inspected coverage will grow — it should be
revisited each time a significant new pattern or template ships, not
treated as a one-time snapshot.

## Keyboard

- ✅ **Every interactive control is reachable and operable by keyboard.**
  `packages/ethds-e2e/tests/text-input.spec.ts` ("is reachable and
  fillable by keyboard alone"), `date-input.spec.ts` ("tabs across day,
  month, and year in order"), `cookie-banner.spec.ts` ("accept and
  reject are both reachable and operable by keyboard alone"),
  `error-summary.spec.ts` ("each listed error is a keyboard-reachable
  link").
- ✅ **Tab order matches reading order.** Asserted directly in the same
  Playwright specs above (sequential `Tab` presses land on the expected
  next element) and in `packages/ethds-react/src/components/*/*.test.tsx`
  via Testing Library's DOM-order queries.
- 🔍 **No positive `tabindex`.** Verified by inspection: no component in
  `packages/ethds-react/src/components/` sets a `tabIndex` other than
  `-1` (used only for programmatic-focus targets — error summaries,
  step containers — never `> 0`).
- 🔍 **No keyboard trap.** No component in this repository implements a
  modal/dialog yet (`Details` is a disclosure widget, not a modal); with
  no trap-capable component to test, there is nothing to trap keyboard
  focus. Revisit this item the day a modal/dialog component ships.
- 🔍 **Interactive targets ≥ 24×24 CSS px.** `Button`, `Checkbox`,
  `Radio`, and `Pagination`'s controls use token-based padding
  (`--ethds-space-*`) sized to clear 24px in every size variant —
  checked by reading each component's `.module.css` against the token
  values, not by a pixel-measuring test.
- ✅ **No action depends on hover, drag, or a multi-point gesture.**
  Implicit in every component test: all `packages/ethds-react`
  interaction tests drive components via `userEvent.click`/`.type`/
  keyboard, never hover-only or drag interactions, and pass.

## Focus

- ✅ **Visible focus indicator on every focusable element.** Token
  `--ethds-color-focus` is applied via a shared `:focus-visible` rule;
  contrast of the focus ring is covered by
  `packages/ethds-tokens/test/contrast.test.ts`.
- ⬜ **Dialogs: focus moves in, is trapped, Esc closes, focus returns to
  the trigger.** No dialog/modal component exists yet — open until one
  ships, at which point this becomes testable.
- ⬜ **Focused element is never fully obscured by sticky/overlay UI (SC
  2.4.11).** No sticky headers or overlays exist yet in any shipped
  template; needs a human check once a template adds one (e.g. a sticky
  cookie banner over content).
- ✅ **On submit-with-errors, focus moves to the error summary / first
  invalid field — for patterns built on `ErrorSummary`.**
  `packages/ethds-react/src/components/ErrorSummary/ErrorSummary.tsx`
  focuses itself on mount by default (`autoFocus`, tested in
  `ErrorSummary.test.tsx`); `packages/ethds-e2e/tests/error-summary.spec.ts`
  confirms it in a real browser. `RegisterForm` (`@ethds/patterns`) gets
  this for free by composing `ErrorSummary`.
- ⬜ **Known gap: `LoginForm` does not yet do this.** `LoginForm` shows
  its generic login error in a plain `Alert`, which has no built-in
  focus management (unlike `ErrorSummary`) — as of `main`, focus stays
  on the submit button after a failed login instead of moving to the
  error. A fix (a ref + effect moving focus to the `Alert`, plus a unit
  test) is written and pending merge in PR #29
  (`feat/e2e-login-flow`) — found while building that PR's E2E
  coverage. Re-check this item once #29 merges.

## Screen reader / semantics

- ✅ **Semantic HTML before ARIA; no broken/redundant ARIA.** Every
  component in `@ethds/react` is checked with `vitest-axe`
  (137 tests across 32 components, 33 test files); axe flags redundant
  or invalid ARIA. `packages/ethds-e2e/tests/axe-smoke.spec.ts` repeats
  this against fully rendered pages in a real browser.
- ✅ **Every interactive control has an accessible name.** Asserted
  throughout `packages/ethds-react/src/components/*/*.test.tsx` via
  `getByRole(role, { name })` queries, which fail outright if the
  accessible name is missing or wrong.
- ✅ **`aria-invalid` + `aria-describedby` on invalid fields.**
  `TextInput.test.tsx` asserts `aria-invalid="true"` directly;
  `packages/ethds-e2e/tests/text-input.spec.ts` ("marks an invalid
  field aria-invalid and describes the error") confirms it in a real
  browser.
- 🔍 **`aria-expanded`/`aria-checked` correctness for `Details`/
  `Checkbox`/`Radio`.** These use native `<details>`/`<summary>` and
  native `<input type="checkbox"/"radio">` elements, so the browser
  computes `aria-expanded`/`aria-checked` from native state
  automatically rather than the component setting it via JS — verified
  by inspection that no component reimplements this state itself.
  `Checkbox.test.tsx`/`Radio.test.tsx` assert the native `checked`
  property (`toBeChecked()`) and `Details.test.tsx` asserts the
  resulting visibility, but neither asserts the ARIA attribute string
  directly.
- ✅ **One `<h1>`; logical heading order; landmarks present.** Every
  template in `@ethds/templates` asserts exactly one `<h1>` and the
  presence of `banner`/`contentinfo` (Header/Footer) landmarks in its
  `.test.tsx` (e.g. `NotFoundPage.test.tsx`, `ForbiddenPage.test.tsx`,
  `ServerErrorPage.test.tsx`). `PageChrome` (the shared shell every
  template composes) always renders one `SkipLink` + `Header` + `main` +
  `Footer`.
- ✅ **Inputs have associated `<label>`; help/error text via
  `aria-describedby`.** `TextInput`, `TextArea`, `Select`, `Checkbox`,
  `Radio`, `FileUpload` all wire `htmlFor`/`aria-describedby`
  programmatically (not just visually) — verified by each component's
  own `.test.tsx` using `getByLabelText`.
- ✅ **Decorative icons hidden; meaningful icons named.** `Icon.tsx`
  defaults to `aria-hidden` and only exposes `role="img"` +
  `aria-label` when a `label` prop is passed — `Icon.test.tsx` and
  `Alert.test.tsx` assert both states.
- ✅ **Status/async updates announced via a live region.**
  `Notification`/`Alert` use `role="status"`/`role="alert"`
  (`Alert.test.tsx`, `Notification.test.tsx`). `CookieBanner` is a
  focusable, labelled `role="region"` landmark (not itself a live
  region) that moves focus to itself on mount, confirmed in a real
  browser by `packages/ethds-e2e/tests/cookie-banner.spec.ts`
  ("receives focus on mount as a labelled region").
- ⬜ **A real screen reader announces all of the above correctly.**
  Everything above verifies *markup* (roles, names, ARIA states, live
  regions) — not what NVDA, JAWS, VoiceOver, or TalkBack actually say
  out loud. Correct markup is necessary but not sufficient; a human
  pass with at least one real screen reader (per
  [testing-framework.md](testing-framework.md)) on the Login,
  Registration, and OTP Verification patterns, and the 404/403/500
  templates, is still required.

## Colour & contrast

- ✅ **Text meets 4.5:1 (3:1 large); non-text/UI meets 3:1.** Every
  colour pair in the palette is contrast-checked programmatically —
  `packages/ethds-tokens/test/contrast.test.ts` computes and asserts
  WCAG contrast ratios for the token set (see
  [`docs/brand/accessibility-analysis.md`](../brand/accessibility-analysis.md)
  for the computed values). This is why every
  `vitest-axe`/`@axe-core/playwright`
  run in this repo explicitly disables the `color-contrast` axe rule
  (see the comment in `packages/ethds-e2e/tests/axe-smoke.spec.ts`) —
  contrast is verified once, at the token level, rather than
  re-approximated per rendered pixel by axe's heuristic engine.
- 🔍 **Colour is never the only way information is conveyed.** Verified
  by inspection across every status-bearing component: `Alert` and
  `Notification` both pair colour with text and a labelled icon
  (`iconLabel` prop, never `aria-hidden`-only when meaningful);
  `TextInput`/`TextArea`/`Select` mark invalid state with
  `aria-invalid` and a visible text error, not a border colour change
  alone.
- 🔍 **Functional borders use `gray-500`+; warning fills use dark text.**
  Verified by reading `.module.css` files against the token palette;
  no automated check enforces this at build time.

## Motion

- ✅ **`prefers-reduced-motion` honoured for non-essential motion.**
  `packages/ethds-e2e/tests/reduced-motion.spec.ts` emulates
  `prefers-reduced-motion: reduce` in a real browser and asserts
  `Button`'s transition duration collapses to (effectively) zero.
- 🔍 **No autoplaying looping motion; nothing flashes > 3×/s.** No
  component in this repository animates on a loop or flashes at all
  (`Button`'s only transition is a one-shot hover/focus state change) —
  verified by inspection of every `.module.css` file for `animation`/
  `@keyframes` rules (none found beyond simple one-shot transitions).

## Responsive / zoom

- ✅ **Usable at 320px width with no page-level horizontal scroll (the
  automatable slice of reflow).** `packages/ethds-e2e/tests/reflow-320.spec.ts`
  checks this for `Table`, `DateInput`, and `Header` at a 320px
  viewport — the components most likely to overflow (a data table, a
  multi-field date group, a header with nav + language switcher).
- ⬜ **Usable at 320px width — full visual/functional judgment.** The
  automated check only proves there's no *page-level horizontal
  scrollbar*; it cannot judge whether content is genuinely usable
  (truncated text, overlapping controls, illegible line lengths). A
  human pass at 320px across every shipped pattern/template is still
  required — this is explicitly labelled as a partial automated proxy,
  not a substitute, per the C1 PR's design decision.
- ⬜ **Usable at 200% text zoom without loss of content/function.**
  Nothing in this repository automates browser zoom; requires a human
  pass (per [testing-framework.md](testing-framework.md)).
- 🔍 **Built mobile-first.** Verified by inspection: every `.module.css`
  using breakpoints in this repo (`grid.module.css` in both
  `@ethds/patterns` and `@ethds/templates`) defines the unprefixed
  (mobile) rule first and layers `min-width` media queries on top,
  never the reverse.

## Localization (interdependent)

- 🔍 **Every citizen-facing component/pattern/template accepts
  translated text via props.** Verified by inspection: every component
  in `@ethds/react` takes label/text content as props rather than
  hardcoding English strings; every pattern and template exports a
  `DEFAULT_*_LABELS` object plus a `labels?: Partial<...>` prop
  specifically so a consumer can override every string — this
  convention is checked file-by-file across all 32 components, 3
  shipped patterns, and 3 shipped templates as of this PR.
- ✅ **`LanguageSwitcher` sets the active language correctly.**
  `packages/ethds-react/src/components/LanguageSwitcher/LanguageSwitcher.test.tsx`
  asserts `onChange` fires with the selected language code.
- ⬜ **Accessible names, labels, and error messages exist in all six
  supported languages (English, Amharic, Afaan Oromo, Tigrinya,
  Somali, Afar).** Translation authoring is explicitly out of scope
  for this phase of work (per the approved gap-closing plan) — every
  shipped component/pattern/template ships English defaults only. This
  is the single largest open item in this document: **nothing has
  actually been rendered in a non-English language yet.**
- ⬜ **Correct `lang` set so screen readers pronounce content
  properly.** No page-level `<html lang>` wiring exists yet outside the
  docs site (`@ethds/docs`, which is Docusaurus-driven and out of scope
  for this audit) — open until a template sets it based on the active
  locale.
- ⬜ **Layout holds with the longest translation and in Ge'ez script.**
  Cannot be checked without real Amharic/Ge'ez content — open, blocked
  on translation authoring (explicitly out of scope, see above).

## Forms & flows (WCAG 2.2 additions)

- ✅ **Don't re-ask for information already provided (SC 3.3.7
  Redundant Entry).** `useMultiStepForm` (`@ethds/patterns`) accumulates
  a single draft object across steps by merging each step's data into
  the existing draft (never replacing it) —
  `packages/ethds-patterns/src/hooks/useMultiStepForm.test.ts`
  ("goNext merges step data, saves a draft, and advances") asserts
  this directly. Every step component reads its fields' initial values
  from that shared draft via `defaultValue`, so a citizen who goes Back
  never has to retype what they already entered.
- ✅ **Authentication needs no cognitive puzzle; OTP entry is
  paste-friendly (SC 3.3.8).** `OtpForm.tsx` deliberately omits a
  `maxLength` on the code field so a pasted code with surrounding
  spaces isn't truncated before validation — `OtpForm.test.tsx` covers
  this directly.
- 🔍 **Paste and password managers work; correct `autocomplete`
  values.** `LoginForm` sets `autocomplete="username"`/
  `"current-password"`; `RegisterForm` sets `autocomplete="new-password"`
  on its password field — verified by reading each component's source
  (neither currently has a unit test asserting the `autocomplete`
  attribute value itself, only that the fields exist and accept input).
  `packages/ethds-e2e/tests/patterns/login-flow.spec.ts` (PR #29,
  pending merge) adds a real-browser check of `LoginForm`'s
  `autocomplete` attributes specifically — re-check this item ✅ once
  that PR merges.
- 🔍 **Help/contact is in a consistent place (SC 3.2.6).** Every
  template composes the same `PageChrome` shell and `Footer`, which
  accepts a `footerGroups` prop for consistent links (About/Contact/
  Accessibility) across every page — verified by inspection that no
  template renders its own bespoke footer.

## Verification

- ✅ **Automated checks pass** (lint, `vitest-axe` component tests,
  Playwright + `@axe-core/playwright` E2E). All wired into CI as
  required checks — see [testing-framework.md](testing-framework.md)'s
  CI integration section and the `tokens`/`react`/`patterns`/
  `templates`/`e2e` GitHub Actions workflows.
- ⬜ **Manual pass for new/changed UI: keyboard-only, a screen reader,
  200% zoom, reduced-motion, and a Ge'ez-language check.** This is the
  document you are reading — everything markable ✅ or 🔍 above has
  been done; every ⬜ item is what remains for an actual human tester.

## Summary: what a human still needs to do

In priority order (highest-impact first):

1. **Screen reader pass** (NVDA or VoiceOver at minimum) through the
   Login, Registration, and OTP Verification patterns, and the
   404/403/500 templates — confirm names, roles, and reading order
   match what the automated markup checks assume.
2. **200% zoom** across every shipped pattern/template — the automated
   reflow check only catches page-level horizontal scrollbars at
   320px, not zoom-induced layout breakage.
3. **Forced-colors / high-contrast mode** rendering — not covered by
   any automated check in this repository at all.
4. **Ge'ez-script / longest-translation layout** — blocked until real
   Amharic (or another Ge'ez-script language) translations exist; this
   is the largest structural gap, not a quick check.
5. Once a dialog/modal component or a sticky-overlay template exists,
   re-run this audit's Focus section — those two checklist items are
   currently "open" only because nothing to test exists yet.
