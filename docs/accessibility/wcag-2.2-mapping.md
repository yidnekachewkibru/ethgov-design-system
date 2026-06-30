# WCAG 2.2 AA Mapping

This maps the WCAG 2.2 Level A and AA success criteria that most affect
ETHDS to **where** they are met in the system. It is not a substitute for
[the specification](https://www.w3.org/TR/WCAG22/) — it is a working guide
to which part of ETHDS is responsible for each requirement.

Legend for "Owned by": **T** = `@ethds/tokens`, **C** = components
(`@ethds/react`), **P** = patterns, **Tpl** = templates, **A** = author of
the service/content.

## Perceivable

| SC | Level | Requirement | Owned by | Where in ETHDS |
|---|---|---|---|---|
| 1.1.1 Non-text Content | A | Text alternatives for images/icons | C, A | `Icon` accessible-name rules ([screen-readers](screen-readers.md)) |
| 1.3.1 Info & Relationships | A | Semantic structure | C, A | Semantic HTML in components; heading order |
| 1.3.5 Identify Input Purpose | AA | Autocomplete on common fields | C, P | Input `autocomplete` in form patterns |
| 1.4.1 Use of Color | A | Colour not the only cue | T, C | [contrast](contrast-requirements.md): always pair colour with text/icon |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 text / 3:1 large | T | [brand analysis](../brand/accessibility-analysis.md), token contrast tests |
| 1.4.4 Resize Text | AA | 200% zoom without loss | T, C | `rem`-based type/space scales |
| 1.4.10 Reflow | AA | No 2-D scroll at 320px | C, Tpl | mobile-first responsive components |
| 1.4.11 Non-text Contrast | AA | 3:1 for UI/graphics | T | functional borders use `gray-500`+; focus `blue-600` |
| 1.4.12 Text Spacing | AA | No loss with adjusted spacing | C | line-height tokens; no fixed-height text containers |

## Operable

| SC | Level | Requirement | Owned by | Where in ETHDS |
|---|---|---|---|---|
| 2.1.1 Keyboard | A | All function via keyboard | C, P | [keyboard](keyboard-navigation.md) |
| 2.1.2 No Keyboard Trap | A | Focus can leave any component | C | [focus](focus-management.md) |
| 2.4.3 Focus Order | A | Logical focus order | C, Tpl | [focus](focus-management.md) |
| 2.4.7 Focus Visible | AA | Visible focus indicator | T, C | `--ethds-color-focus` (8.31:1) |
| **2.4.11 Focus Not Obscured (Min)** | AA | Focused element not fully hidden | C, Tpl | sticky headers/dialogs must not cover focus — **new in 2.2** |
| **2.5.7 Dragging Movements** | AA | Drag has a single-pointer alternative | C, P | no drag-only interactions — **new in 2.2** |
| **2.5.8 Target Size (Minimum)** | AA | 24×24 CSS px targets | C | min target size in [keyboard](keyboard-navigation.md) — **new in 2.2** |
| 2.3.1 Three Flashes | A | No flashing > 3/s | C, A | [motion](motion.md) |
| 2.3.3 Animation from Interactions | AAA→adopted | Honour reduced motion | T, C | [motion](motion.md), token reduced-motion block |

## Understandable

| SC | Level | Requirement | Owned by | Where in ETHDS |
|---|---|---|---|---|
| 3.1.1 / 3.1.2 Language of Page/Parts | A/AA | Correct `lang` | C, A | per-locale `lang` ([localization](../phases/phase-6-localization-framework.md)) |
| 3.2.3 Consistent Navigation | AA | Consistent nav across pages | C, Tpl | shared Header/Footer/Breadcrumb |
| 3.2.4 Consistent Identification | AA | Components identified consistently | C | shared component library |
| **3.2.6 Consistent Help** | A | Help in consistent location | Tpl, A | help/contact placement in templates — **new in 2.2** |
| 3.3.1 Error Identification | A | Errors identified in text | C, P | [screen-readers](screen-readers.md), form patterns |
| 3.3.2 Labels or Instructions | A | Inputs labelled | C | input components require a label |
| 3.3.3 Error Suggestion | AA | Suggest a correction | P, A | validation messaging in patterns |
| **3.3.7 Redundant Entry** | A | Don't re-ask for known info | P | multi-step form patterns carry data forward — **new in 2.2** |
| **3.3.8 Accessible Authentication (Min)** | AA | No cognitive-function-only test | P | OTP/login patterns allow paste, no puzzles — **new in 2.2** |

## Robust

| SC | Level | Requirement | Owned by | Where in ETHDS |
|---|---|---|---|---|
| 4.1.2 Name, Role, Value | A | Correct semantics for AT | C | [screen-readers](screen-readers.md) |
| 4.1.3 Status Messages | AA | Announce status without focus | C, P | live regions for alerts/validation |

## The six new-in-2.2 criteria — summary

ETHDS targets 2.2, so these are explicitly designed for:

1. **2.4.11 Focus Not Obscured** — sticky/overlay UI must not hide the
   focused control ([focus](focus-management.md)).
2. **2.5.7 Dragging Movements** — every drag has a click/tap alternative.
3. **2.5.8 Target Size (Minimum)** — interactive targets ≥ 24×24 CSS px
   ([keyboard](keyboard-navigation.md)).
4. **3.2.6 Consistent Help** — help/contact in a consistent place
   (templates).
5. **3.3.7 Redundant Entry** — don't re-ask for information already given
   in a flow (patterns).
6. **3.3.8 Accessible Authentication** — no cognitive puzzles; allow paste
   and password managers; OTP entry is paste-friendly (patterns,
   [security principle](../design-principles/08-security-and-privacy-by-design.md)).
