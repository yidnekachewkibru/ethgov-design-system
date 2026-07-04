import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Complements (does not replace) the vitest-axe unit gate in @ethds/react:
// this runs axe against fully rendered pages in a real browser, which can
// catch integration issues an isolated jsdom render misses. Colour
// contrast is excluded for the same reason as the unit suite — see
// packages/ethds-react/src/test/axe.ts — it's verified at the token level
// instead.
const stories = [
  'components-textinput--with-error',
  'components-dateinput--ethiopian',
  'components-errorsummary--default',
  'components-cookiebanner--default',
  'components-stepindicator--default',
  'components-details--default',
];

for (const id of stories) {
  test(`axe: no violations for ${id}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    // @axe-core/playwright resolves its own nested playwright-core
    // (via its peerDependency), a different copy than @playwright/test's
    // pinned exact version — structurally identical Page at runtime,
    // mismatched TS types. Cast at this one boundary rather than force a
    // single playwright-core resolution repo-wide.
    const results = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]['page'] })
      // color-contrast: see packages/ethds-react/src/test/axe.ts — verified at the token level instead.
      // landmark-one-main / page-has-heading-one: these are page-level
      // best-practice rules; a Storybook story renders one isolated
      // component, not a full page — the templates package's tests cover
      // real page structure (one h1, a main landmark) for actual pages.
      .disableRules(['color-contrast', 'landmark-one-main', 'page-has-heading-one'])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
