import { test, expect } from '@playwright/test';
import { isFocused } from './helpers';

// The docs-site story sets autoFocus={false} (a live example shouldn't
// steal focus on page load) — focus-on-mount itself is already covered
// by the component's own vitest-axe/Testing Library suite. This E2E spec
// checks what only a real browser can: the rendered alert role and real,
// keyboard-reachable links, in an actual DOM.
test.describe('ErrorSummary', () => {
  test('announces as an alert with each error listed', async ({ page }) => {
    await page.goto('/iframe.html?id=components-errorsummary--default&viewMode=story');
    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('There is a problem');
  });

  test('each listed error is a keyboard-reachable link to its field', async ({ page }) => {
    await page.goto('/iframe.html?id=components-errorsummary--default&viewMode=story');
    const links = page.getByRole('alert').getByRole('link');
    await expect(links).toHaveCount(3);
    await expect(links.first()).toHaveAttribute('href', /^#/);

    // Wait for Storybook's "preparing story" placeholder to be replaced
    // by the real component before pressing Tab against it.
    await links.first().waitFor({ state: 'visible' });
    await page.mouse.click(0, 0);
    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(links.first())).toBe(true);
  });
});
