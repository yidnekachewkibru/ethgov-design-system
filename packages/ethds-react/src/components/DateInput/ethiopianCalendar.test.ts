import { describe, it, expect } from 'vitest';
import { ethiopianToGregorian, gregorianToEthiopian, ethiopianMonthLength } from './ethiopianCalendar';

describe('ethiopianCalendar', () => {
  it('converts the reference date from docs/localization/date-formatting.md', () => {
    // Meskerem 1, 2019 E.C. == 11 September 2026 G.C.
    expect(ethiopianToGregorian({ year: 2019, month: 1, day: 1 })).toEqual({
      year: 2026,
      month: 9,
      day: 11,
    });
    expect(gregorianToEthiopian({ year: 2026, month: 9, day: 11 })).toEqual({
      year: 2019,
      month: 1,
      day: 1,
    });
  });

  it('round-trips arbitrary dates', () => {
    const samples = [
      { year: 2016, month: 13, day: 5 }, // Pagume, non-leap
      { year: 2019, month: 13, day: 6 }, // Ethiopian leap year Pagume 6
      { year: 2000, month: 6, day: 30 },
    ];
    for (const eth of samples) {
      const g = ethiopianToGregorian(eth);
      expect(gregorianToEthiopian(g)).toEqual(eth);
    }
  });

  it('reports 6-day Pagume only in Ethiopian leap years (year % 4 === 3)', () => {
    expect(ethiopianMonthLength(2016, 13)).toBe(5);
    expect(ethiopianMonthLength(2018, 13)).toBe(5);
    expect(ethiopianMonthLength(2019, 13)).toBe(6);
    expect(ethiopianMonthLength(2016, 1)).toBe(30);
  });
});
