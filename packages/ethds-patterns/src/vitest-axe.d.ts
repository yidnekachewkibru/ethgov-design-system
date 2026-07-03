// Register the vitest-axe matcher on Vitest 2's expect types.
// (vitest-axe 0.1 only augments the legacy global `Vi` namespace, which
// Vitest 2 no longer uses — so we augment `declare module 'vitest'` here.)
import type {} from 'vitest';

interface AxeMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T = any> extends AxeMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
