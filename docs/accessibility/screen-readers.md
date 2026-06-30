# Screen Reader Standards

Screen reader users perceive a service through its semantics, not its
pixels. ETHDS components expose correct names, roles, states, and
announcements so that what a sighted user sees, a screen reader user
hears. (WCAG 1.1.1, 1.3.1, 4.1.2, 4.1.3.)

## Requirements

1. **Semantic HTML first.** Use the right native element — `<button>`,
   `<a href>`, `<nav>`, `<main>`, `<h1>`–`<h6>`, `<label>`, `<table>` —
   before reaching for ARIA. Native elements come with correct role,
   state, and keyboard behaviour for free. **No ARIA is better than bad
   ARIA.**
2. **Every interactive control has an accessible name** that describes its
   purpose, in the citizen's
   [active language](../design-principles/02-multilingual-by-default.md).
   Visible text labels are preferred; `aria-label`/`aria-labelledby` are
   used only where a visible label isn't possible (e.g. an icon-only
   button).
3. **Name, role, value are correct** for every component (WCAG 4.1.2). A
   custom widget exposes its role (e.g. `role="tab"`), its state (e.g.
   `aria-selected`, `aria-expanded`, `aria-checked`), and its value.
4. **Decorative vs meaningful images/icons:**
   - Decorative (a label already conveys the meaning) → hidden with
     `aria-hidden="true"` / empty `alt=""` so it isn't announced.
   - Meaningful (icon-only control, status icon) → has an accessible name.
   See [iconography](../brand/iconography.md).
5. **Headings and landmarks.** Pages have one `<h1>`, a logical heading
   hierarchy (no skipped levels), and landmark regions (`header`, `nav`,
   `main`, `footer`) so users can navigate by structure.
6. **Form semantics.** Every field has an associated `<label>`; required
   fields use `required`/`aria-required`; help text and error text are
   associated via `aria-describedby`; invalid fields set
   `aria-invalid="true"`.
7. **Status messages** that appear without moving focus (validation
   summaries, "saved", "loading complete") are announced via an
   appropriate live region (`role="status"`/`aria-live="polite"`, or
   `role="alert"`/`aria-live="assertive"` for errors) — WCAG 4.1.3.
8. **Errors are conveyed in text**, identifying the field and the problem,
   and are programmatically associated with the field (WCAG 3.3.1) — never
   communicated by colour alone.

## Language & screen readers

The document/section `lang` must be correct so the screen reader uses the
right pronunciation and voice — critical when a page mixes Ge'ez-script
and Latin-script languages. This is handled by the
[Localization Framework](../phases/phase-6-localization-framework.md);
accessible names and error messages must exist in every supported
language.

## Anti-patterns

- Icon-only buttons with no accessible name (announced as "button").
- `role` without the matching states/keys (e.g. `role="checkbox"` with no
  `aria-checked` and no <kbd>Space</kbd> handler).
- Errors shown only with a red border / red text, with no text or
  association.
- Live updates (search results, async validation) that are silent to
  screen readers.
- `aria-hidden="true"` on a focusable element (hides it from AT while it
  still receives focus).

## How it's verified

Automated checks (axe-core) catch missing names, roles, and label
associations; manual testing with a real screen reader (NVDA / VoiceOver /
TalkBack) confirms the *experience*, including announcements and reading
order. See the [testing framework](testing-framework.md).
