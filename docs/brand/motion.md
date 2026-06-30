# Motion

Motion in ETHDS is functional, not decorative: it communicates a state
change (something appeared, moved, or responded), and it is always brief.
Government services are used in stressful, time-pressured, and
low-bandwidth contexts — motion must never delay a task or distract from
it, and it must always respect the citizen's reduced-motion preference.

## Duration Tokens

| Token | Value | Use |
|---|---|---|
| `motion-instant` | `50ms`  | Immediate feedback (press) |
| `motion-fast`    | `100ms` | Small UI changes (hover, focus) |
| `motion-base`    | `200ms` | **Default — most transitions** |
| `motion-slow`    | `300ms` | Larger surfaces (dialogs, sheets) |

Avoid durations longer than `300ms` for interface transitions — they make
the service feel sluggish, especially on a slow device.

## Easing Tokens

| Token | Curve | Use |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Most movement and fades |
| `ease-in`       | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `ease-out`      | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |

## Reduced Motion (required)

ETHDS honours the operating-system "reduce motion" setting. When a citizen
has requested reduced motion, transitions and animations are removed or
reduced to a simple opacity change — never disabling the underlying
functionality.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This is a baseline; components may additionally tailor their reduced-motion
behaviour. See the motion standards in the
[Accessibility Framework](../phases/phase-5-accessibility-framework.md).

## Usage

- Use motion to clarify cause and effect (a panel slides from the edge it
  is anchored to; an alert fades in where it will live), not for spectacle.
- **Never autoplay looping motion** (carousels, animated banners) that the
  citizen did not initiate — it fails reduced-motion expectations and
  distracts from the task.
- Keep motion off the critical path: a citizen must never wait on an
  animation to proceed.

Values are encoded in [`assets/ethds-brand.css`](assets/ethds-brand.css)
and [`assets/tailwind.brand.cjs`](assets/tailwind.brand.cjs).
