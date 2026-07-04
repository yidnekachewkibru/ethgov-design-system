import { test, expect } from '@playwright/test';
import { isFocused } from './helpers';

test.describe('DateInput', () => {
  test('tabs across day, month, and year in order with correct accessible names', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dateinput--ethiopian&viewMode=story');

    const day = page.getByLabel('Day');
    const month = page.getByLabel('Month');
    const year = page.getByLabel('Year');

    // Wait for the real story to mount — see text-input.spec.ts.
    await day.waitFor({ state: 'visible' });
    // A fresh page has no active element — click a neutral corner first.
    await page.mouse.click(0, 0);
    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(day)).toBe(true);
    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(month)).toBe(true);
    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(year)).toBe(true);
  });

  test('accepts typed entry via the keyboard, no calendar-grid widget required', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dateinput--gregorian&viewMode=story');

    await page.getByLabel('Day').fill('11');
    await page.getByLabel('Month').fill('9');
    await page.getByLabel('Year').fill('2026');

    await expect(page.getByLabel('Day')).toHaveValue('11');
    await expect(page.getByLabel('Month')).toHaveValue('9');
    await expect(page.getByLabel('Year')).toHaveValue('2026');
  });
});
