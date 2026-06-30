# Motion Standards

Motion can communicate change, but for some citizens it causes distraction,
nausea, or seizures. ETHDS motion is functional, brief, and always
respects the citizen's reduced-motion preference. (WCAG 2.2.2, 2.3.1,
2.3.3.)

## Requirements

1. **Honour `prefers-reduced-motion`.** When the citizen has requested
   reduced motion, non-essential animation and transition are removed or
   reduced to a simple opacity change. This baseline ships in the design
   tokens — [`@ethds/tokens`](../../packages/ethds-tokens/) emits a
   `@media (prefers-reduced-motion: reduce)` block that neutralises
   animation/transition durations. Components must not re-introduce motion
   that ignores this.
2. **No flashing above 3 times per second** (WCAG 2.3.1) — avoid content
   that flashes; nothing in ETHDS flashes.
3. **No autoplaying looping motion** the citizen didn't initiate
   (carousels, animated banners, marquees). Motion that lasts more than ~5s
   or loops must be pausable/stoppable — ETHDS simply avoids it.
4. **Motion is off the critical path.** A citizen never has to wait for an
   animation to finish before they can act; animation never blocks input.
5. **Brief and purposeful.** Durations come from the motion tokens
   (`--ethds-motion-fast` 100ms, `--ethds-motion-base` 200ms,
   `--ethds-motion-slow` 300ms); interface transitions stay ≤ 300ms.
6. **Parallax and large-scale movement** are avoided — they are common
   triggers for vestibular discomfort.

## Essential vs non-essential motion

- **Non-essential** (decorative transitions, hover effects, entrance
  animations) → removed under reduced-motion.
- **Essential** (motion that conveys information that can't be conveyed
  otherwise, e.g. a loading spinner indicating ongoing work) → may remain,
  but kept minimal; prefer a non-animated equivalent (text "Loading…",
  progress value) where possible.

## Reference implementation

The baseline reduced-motion block (also in
[`docs/brand/motion.md`](../brand/motion.md)):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## How it's verified

Reduced-motion handling is checked by emulating `prefers-reduced-motion:
reduce` in Playwright and asserting that non-essential animation is
suppressed; the token reduced-motion block is part of the generated CSS.
See the [testing framework](testing-framework.md).
