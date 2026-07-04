import type { Locator } from '@playwright/test';

/**
 * Direct DOM focus check (`element === document.activeElement`), used in
 * place of Playwright's `toBeFocused()` matcher: in this project's
 * containerized test environment `toBeFocused()` reports every element
 * "inactive" regardless of real focus state (verified independently via
 * `document.activeElement`), which looks like a CDP/Accessibility-tree
 * focus-reporting quirk specific to this sandbox rather than the app under
 * test. This still exercises a real Tab key press dispatched to a real
 * Chromium instance — only the assertion mechanism differs.
 */
export async function isFocused(locator: Locator): Promise<boolean> {
  return locator.evaluate((el) => el === document.activeElement);
}
