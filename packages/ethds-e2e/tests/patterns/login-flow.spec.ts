import { test, expect } from '@playwright/test';
import { isFocused } from '../helpers';

// The Login pattern's own doc (packages/ethds-patterns/patterns/login.md)
// requires: keyboard operability throughout, a focusable error Alert
// announced on submit, and autocomplete="username"/"current-password" so
// password managers work (WCAG 2.2 SC 3.3.8 Accessible Authentication).
// This drives the real, composed LoginForm in a real browser — the
// per-field behavior is already covered by @ethds/patterns' own
// vitest-axe/Testing Library suite.
test.describe('Login flow', () => {
  test('completes a full keyboard-only run through the form, in logical tab order', async ({ page }) => {
    await page.goto('/iframe.html?id=patterns-login--default&viewMode=story');

    const identifier = page.getByLabel('Phone number or email', { exact: false });
    const password = page.getByLabel('Password', { exact: false });
    const forgotLink = page.getByRole('link', { name: 'Forgot your password?' });
    const loginButton = page.getByRole('button', { name: 'Log in', exact: true });
    const otpButton = page.getByRole('button', { name: 'Log in with a code' });
    const registerLink = page.getByRole('link', { name: 'Create an account' });

    await identifier.waitFor({ state: 'visible' });
    await page.mouse.click(0, 0);

    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(identifier)).toBe(true);
    await page.keyboard.type('0911234567');

    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(password)).toBe(true);
    await page.keyboard.type('correct horse battery staple');

    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(forgotLink)).toBe(true);

    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(loginButton)).toBe(true);

    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(otpButton)).toBe(true);

    await page.keyboard.press('Tab');
    await expect.poll(() => isFocused(registerLink)).toBe(true);
  });

  test('sets autocomplete attributes so password managers can fill the form', async ({ page }) => {
    await page.goto('/iframe.html?id=patterns-login--default&viewMode=story');

    await expect(page.getByLabel('Phone number or email', { exact: false })).toHaveAttribute(
      'autocomplete',
      'username',
    );
    await expect(page.getByLabel('Password', { exact: false })).toHaveAttribute(
      'autocomplete',
      'current-password',
    );
  });

  test('moves focus to a focusable, announced error alert on a failed login', async ({ page }) => {
    await page.goto('/iframe.html?id=patterns-login--failed-login&viewMode=story');

    const identifier = page.getByLabel('Phone number or email', { exact: false });
    await identifier.waitFor({ state: 'visible' });
    await identifier.fill('0911234567');
    await page.getByLabel('Password', { exact: false }).fill('wrong-password');
    await page.getByRole('button', { name: 'Log in', exact: true }).click();

    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('The phone number/email or password is incorrect.');
    await expect.poll(() => isFocused(alert)).toBe(true);
  });
});
