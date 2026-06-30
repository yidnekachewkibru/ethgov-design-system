import { describe, it, expect } from 'vitest';
import { loadSources, collectTokens, toNested } from '../scripts/build.mjs';

const nested = toNested(collectTokens(loadSources()));

/** WCAG 2.2 relative luminance + contrast ratio. */
function luminance(hex: string): number {
  const c = hex.replace('#', '');
  const ch = [0, 2, 4].map((i) => parseInt(c.substr(i, 2), 16) / 255);
  const lin = ch.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
function ratio(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const C = (nested as any).color;
const AA_TEXT = 4.5;
const AA_LARGE = 3;

describe('colour contrast invariants (WCAG 2.2 AA)', () => {
  // These mirror docs/brand/accessibility-analysis.md — the palette must
  // not silently regress below the documented, verified ratios.
  it('body ink on white meets AA text', () => {
    expect(ratio(C.ink, C.white)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('white on primary (Star Blue) meets AA text', () => {
    expect(ratio(C.white, C.primary)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('interactive blue on white meets AA text', () => {
    expect(ratio(C.interactive, C.white)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('white on success / error fills meets AA text', () => {
    expect(ratio(C.white, C.success)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(ratio(C.white, C.error)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('warning fill is dark-text-only (ink passes, white fails)', () => {
    expect(ratio(C.ink, C.warning)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(ratio(C.white, C.warning)).toBeLessThan(AA_TEXT);
  });

  it('functional border (gray-500) meets non-text 3:1 on white', () => {
    expect(ratio(C.border, C.white)).toBeGreaterThanOrEqual(AA_LARGE);
  });

  it('focus indicator meets non-text 3:1 on white', () => {
    expect(ratio(C.focus, C.white)).toBeGreaterThanOrEqual(AA_LARGE);
  });

  it('secondary text (gray-600) meets AA text on white', () => {
    expect(ratio(C['text-secondary'], C.white)).toBeGreaterThanOrEqual(AA_TEXT);
  });
});
