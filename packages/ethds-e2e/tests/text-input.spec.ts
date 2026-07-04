import { test, expect } from '@playwright/test';
import { isFocused } from './helpers';

test.describe('TextInput', () => {
  test('is reachable and fillable by keyboard alone', async ({ page }) => {
    await page.goto('/iframe.html?id=components-textinput--default&viewMode=story');
    const input = page.getByLabel('Given name');
    // Storybook shows a brief "preparing story" placeholder before the
    // real component mounts; interacting before that swap completes would
    // press Tab against a DOM node about to be replaced. Wait for the
    // real field first.
    await input.waitFor({ state: 'visible' });
    // A fresh page has no active element, so the first Tab press has
    // nowhere to move focus from — click a neutral corner to give the
    // document focus without focusing the field itself.
    await page.mouse.click(0, 0);
    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(input)).toBe(true);
    await page.keyboard.type('Abebe Kebede');
    await expect(input).toHaveValue('Abebe Kebede');
  });

  test('marks an invalid field aria-invalid and describes the error', async ({ page }) => {
    await page.goto('/iframe.html?id=components-textinput--with-error&viewMode=story');
    const input = page.getByRole('textbox');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    const describedBy = await input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    // Attribute selector, not `#id` — React's useId() ids contain colons,
    // which are invalid unescaped in a CSS id selector.
    await expect(page.locator(`[id="${describedBy}"]`)).toBeVisible();
  });
});
