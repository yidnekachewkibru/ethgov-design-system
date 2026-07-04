import { test, expect } from '@playwright/test';

// This is the automatable slice of WCAG 2.2 SC 1.4.10 Reflow: no *page-level*
// horizontal scrollbar at a narrow viewport. It does not stand in for a full
// 400%-browser-zoom pass (still a manual-audit item — see
// docs/accessibility/manual-audit-2026.md) since zoom also affects text
// size and layout in ways a fixed narrow viewport doesn't reproduce.
const stories = ['components-table--default', 'components-dateinput--ethiopian', 'components-header--default'];

test.describe('reflow at 320px', () => {
  for (const id of stories) {
    test(`no page-level horizontal scroll: ${id}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(`/iframe.html?id=${id}&viewMode=story`);
      const overflowing = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflowing).toBe(false);
    });
  }
});
