import { test, expect } from '@playwright/test';
import { isFocused } from './helpers';

test.describe('CookieBanner', () => {
  test('receives focus on mount as a labelled region', async ({ page }) => {
    await page.goto('/iframe.html?id=components-cookiebanner--default&viewMode=story');
    const region = page.getByRole('region', { name: 'Cookies on this service' });
    await expect.poll(() => isFocused(region)).toBe(true);
  });

  test('accept and reject are both reachable and operable by keyboard alone', async ({ page }) => {
    await page.goto('/iframe.html?id=components-cookiebanner--default&viewMode=story');

    const accept = page.getByRole('button', { name: 'Accept additional cookies' });
    const reject = page.getByRole('button', { name: 'Reject additional cookies' });

    await expect(accept).toBeVisible();
    await expect(reject).toBeVisible();

    // The banner auto-focuses itself on mount; wait for that to settle
    // before pressing Tab from it to the first actionable control.
    const region = page.getByRole('region', { name: 'Cookies on this service' });
    await expect.poll(() => isFocused(region)).toBe(true);
    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(accept)).toBe(true);
    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(reject)).toBe(true);
  });
});
