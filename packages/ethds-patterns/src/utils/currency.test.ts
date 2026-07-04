import { describe, it, expect } from 'vitest';
import { formatBirr } from './currency';

// Intl.NumberFormat's ETB currency format uses a non-breaking space
// (U+00A0) between "ETB" and the amount, not a regular space.
const NBSP = ' ';

describe('formatBirr', () => {
  it('formats integer santim as Birr with two decimals', () => {
    expect(formatBirr(35000)).toBe(`ETB${NBSP}350.00`);
  });

  it('formats zero', () => {
    expect(formatBirr(0)).toBe(`ETB${NBSP}0.00`);
  });

  it('formats an amount with non-zero santim', () => {
    expect(formatBirr(30050)).toBe(`ETB${NBSP}300.50`);
  });

  it('accepts a locale override', () => {
    expect(formatBirr(35000, 'en-ET')).toBe(`ETB${NBSP}350.00`);
  });
});
