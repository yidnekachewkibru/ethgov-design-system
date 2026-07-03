/**
 * Ethiopian ⇄ Gregorian calendar conversion (Amete Mihret era), via Julian
 * Day Number. Verified against docs/localization/date-formatting.md's
 * reference date: Meskerem 1, 2019 E.C. = 11 September 2026 (G.C.).
 */

const JD_EPOCH_OFFSET_AMETE_MIHRET = 1723856;

export const ETHIOPIAN_MONTHS = [
  'Meskerem',
  'Tikimt',
  'Hidar',
  'Tahsas',
  'Tir',
  'Yekatit',
  'Megabit',
  'Miyazya',
  'Ginbot',
  'Sene',
  'Hamle',
  'Nehase',
  'Pagume',
] as const;

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

function jdnToGregorian(jdn: number): CalendarDate {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  return { year, month, day };
}

function ethiopicToJdn(year: number, month: number, day: number): number {
  const n = (month - 1) * 30 + (day - 1);
  const q = Math.floor(year / 4);
  const k = year - 4 * q;
  const r = n + 365 * k;
  return q * 1461 + r + JD_EPOCH_OFFSET_AMETE_MIHRET;
}

function jdnToEthiopic(jdn: number): CalendarDate {
  const diff = jdn - JD_EPOCH_OFFSET_AMETE_MIHRET;
  const q = Math.floor(diff / 1461);
  const r = diff - q * 1461;
  const k = Math.floor(r / 365) - Math.floor(r / 1460);
  const year = 4 * q + k;
  const n = r - 365 * k;
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;
  return { year, month, day };
}

export function gregorianToEthiopian(date: CalendarDate): CalendarDate {
  return jdnToEthiopic(gregorianToJdn(date.year, date.month, date.day));
}

export function ethiopianToGregorian(date: CalendarDate): CalendarDate {
  return jdnToGregorian(ethiopicToJdn(date.year, date.month, date.day));
}

/** Days in a given Ethiopian month/year (13th month, Pagume, is 5 or 6). */
export function ethiopianMonthLength(year: number, month: number): number {
  if (month !== 13) return 30;
  const isLeap = year % 4 === 3;
  return isLeap ? 6 : 5;
}
