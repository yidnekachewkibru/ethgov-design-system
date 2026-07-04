import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for ETHDS end-to-end tests.
 *
 * Tests drive real Storybook stories via deep links
 * (`iframe.html?id=<story>&viewMode=story`) rather than a bespoke test
 * harness app — the stories already exist and already render the real,
 * published components.
 *
 * Two Storybook instances are exercised: `@ethds/react`'s (component-level
 * flows, port 6006) and `@ethds/patterns`'s (composed-flow tests like
 * login-flow.spec.ts, port 6007) — each gets its own `webServer` entry and
 * its own `project`, scoped by `testDir`/`testIgnore` so a spec never runs
 * against the wrong app's port.
 *
 * Only Chromium is configured: it's the browser this project provisions
 * (locally and in CI); Firefox/WebKit are not installed and are left out
 * rather than silently failing to launch.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    // Vite's dev-server host-security check rejects requests whose Host
    // header doesn't match what it was told to bind to — using
    // `localhost` consistently here (not `127.0.0.1`) avoids Storybook
    // silently swapping every story for a "wrong hostname" error page.
    baseURL: 'http://localhost:6006',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: '**/patterns/**',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-patterns',
      testDir: './tests/patterns',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:6007' },
    },
  ],
  webServer: [
    {
      command: 'npm run storybook -w @ethds/react -- --ci',
      url: 'http://localhost:6006',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'npm run storybook -w @ethds/patterns -- --ci',
      url: 'http://localhost:6007',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
