/**
 * Formats an integer minor-unit amount (santim) as Birr, e.g. `35000` ->
 * `"ETB 350.00"`. Money is handled as integer santim end-to-end
 * (docs/../ethds-patterns/patterns/payment-flow.md's Validation Rules) —
 * this is the one place that divides by 100 for display.
 */
export function formatBirr(santim: number, locale = 'en-ET'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'ETB' }).format(santim / 100);
}
