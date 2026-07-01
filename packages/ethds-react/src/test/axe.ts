import { axe as baseAxe } from 'vitest-axe';
import type { RunOptions } from 'axe-core';

/**
 * axe check for component tests.
 *
 * The `color-contrast` rule is disabled here because jsdom does not
 * implement canvas, so axe cannot compute rendered contrast in this
 * environment. Colour contrast is verified instead at the token level
 * (`@ethds/tokens` contrast tests) and documented in
 * `docs/brand/accessibility-analysis.md`.
 */
export function axe(html: Element | string, options: RunOptions = {}) {
  return baseAxe(html, {
    ...options,
    rules: { 'color-contrast': { enabled: false }, ...(options.rules ?? {}) },
  });
}
