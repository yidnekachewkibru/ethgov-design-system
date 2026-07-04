import { test, expect } from '@playwright/test';

test.describe('prefers-reduced-motion', () => {
  test('Button disables its transition when the citizen has reduced motion set', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--primary&viewMode=story');
    const button = page.getByRole('button').first();

    const normal = await button.evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration));
    expect(normal).toBeGreaterThan(0);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    // Chromium sometimes renders an exact 0 as a tiny float (e.g. "1e-05s")
    // rather than "0s" — assert near-zero, not string equality.
    const reduced = await page
      .getByRole('button')
      .first()
      .evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration));
    expect(reduced).toBeLessThan(0.001);
  });
});
