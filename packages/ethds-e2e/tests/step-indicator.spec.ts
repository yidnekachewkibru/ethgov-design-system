import { test, expect } from '@playwright/test';

test.describe('StepIndicator', () => {
  test('marks exactly the current step aria-current="step"', async ({ page }) => {
    await page.goto('/iframe.html?id=components-stepindicator--default&viewMode=story');

    const nav = page.getByRole('navigation', { name: 'Application progress' });
    const items = nav.locator('li');
    await expect(items).toHaveCount(4);

    const current = nav.locator('[aria-current="step"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(/Details/);
  });

  test('moves aria-current to the last step when current changes', async ({ page }) => {
    await page.goto('/iframe.html?id=components-stepindicator--last-step&viewMode=story');

    const nav = page.getByRole('navigation', { name: 'Application progress' });
    const current = nav.locator('[aria-current="step"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(/Review/);
  });
});
