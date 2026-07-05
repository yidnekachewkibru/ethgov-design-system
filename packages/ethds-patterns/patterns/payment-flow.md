# Payment Flow

## Overview

Pay a government fee. Trust and clarity are paramount: the citizen must see
**exactly what they are paying, itemised, in Birr**, choose a payment
method, and never be left unsure whether a charge succeeded. Amounts are
stored in minor units (santim) and formatted with `Intl`.

**Components:** Breadcrumb, Table, RadioGroup, Button, Alert, Notification.
**Related:** [Receipt Flow](receipt-flow.md),
[Application Submission](application-submission.md).

## User Journey

1. Citizen reviews the itemised charge and total (in Birr).
2. Chooses a payment method (e.g. Telebirr, bank, card).
3. Confirms and completes payment on the provider.
4. Returns to a definite result → [Receipt](receipt-flow.md).

## UX Flow

```
[Review charges] → [Choose method] → [Pay] → provider → [Result: paid / failed]
                                                  |            └--> retry
                                                  └--> [Receipt]
```

## Wireframe

```
┌─────────────────────────────────────┐
│ Pay for: Business licence renewal   │
│                                     │
│  Item                        Amount │
│  Licence fee              ETB 300.00│
│  Service charge            ETB 50.00│
│  ─────────────────────────────────  │
│  Total                    ETB 350.00│  ← total, prominent
│                                     │
│ Payment method                      │
│ (•) Telebirr  ( ) Bank  ( ) Card    │
│                                     │
│ [        Pay ETB 350.00       ]     │  ← amount on the button
└─────────────────────────────────────┘
```

## Validation Rules

- **Amount:** computed server-side from the item(s); the client displays
  but never determines the total.
- **Method:** required selection before "Pay".
- Money is handled as **integer santim** end-to-end; display via
  `Intl.NumberFormat(locale, { style: 'currency', currency: 'ETB' })`
  ([currency formatting](../../../docs/localization/currency-formatting.md)).

## Error Handling

- **Payment failed / cancelled:** state clearly that **no amount was
  charged** (when true) and let the citizen retry or change method — a
  frequent [security/trust](../../../docs/design-principles/08-security-and-privacy-by-design.md)
  concern.
- **Ambiguous result (timeout):** never guess — show "We're confirming your
  payment" and reconcile; show the definite outcome once known, and don't
  allow an accidental double charge.
- **Network drop mid-payment:** on return, resolve to the true state, not a
  fresh charge.

## Accessibility Guidance

- The itemisation is a semantic [Table](../../ethds-react/) with a caption;
  the **total is programmatically associated** and prominent.
- Payment result announced via an Alert/[Notification](../../ethds-react/)
  live region; focus moves to the result.
- The pay button states the amount ("Pay ETB 350.00") so the action is
  unambiguous.

## Localization

- **Birr (ETB)**, 2 decimals, formatted per locale; the total shown with
  the currency code for clarity.
- All labels/method names/errors translatable.

## React Example

```tsx
import { useState } from 'react';
import { Table, RadioGroup, Button, Alert } from '@ethds/react';

const fmt = (santim: number, locale = 'en-ET') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'ETB' }).format(santim / 100);

type LineItem = { label: string; santim: number };

export function PaymentReview({
  items,
  onPay,
}: {
  items: LineItem[];
  onPay: (method: string) => Promise<void>;
}) {
  const [method, setMethod] = useState('telebirr');
  const [error, setError] = useState<string | null>(null);
  const total = items.reduce((sum, i) => sum + i.santim, 0);

  async function handlePay() {
    setError(null);
    try {
      await onPay(method);
    } catch {
      setError('Payment did not complete. No amount was charged — you can try again.');
    }
  }

  return (
    <section>
      <h1>Pay for: Business licence renewal</h1>
      {error && <Alert variant="error" iconLabel="Error">{error}</Alert>}
      <Table
        caption="Charges"
        columns={[
          { header: 'Item', cell: (i: LineItem) => i.label },
          { header: 'Amount', cell: (i: LineItem) => fmt(i.santim), align: 'end' },
        ]}
        rows={items}
        rowKey={(i) => i.label}
      />
      <p><strong>Total: {fmt(total)}</strong></p>
      <RadioGroup
        legend="Payment method"
        value={method}
        onChange={setMethod}
        options={[
          { value: 'telebirr', label: 'Telebirr' },
          { value: 'bank', label: 'Bank transfer' },
          { value: 'card', label: 'Card' },
        ]}
      />
      <Button variant="primary" onClick={handlePay}>Pay {fmt(total)}</Button>
    </section>
  );
}
```

## HTML Example

```html
<section>
  <h1>Pay for: Business licence renewal</h1>

  <!-- Only present after a failed or cancelled payment attempt. -->
  <div role="alert" class="ethds-alert ethds-alert--error">
    Payment did not complete. No amount was charged — you can try again.
  </div>

  <div class="ethds-table-scroll">
    <table class="ethds-table">
      <caption class="ethds-table__caption">Charges</caption>
      <thead>
        <tr>
          <th scope="col" class="ethds-table__th">Item</th>
          <th scope="col" class="ethds-table__th ethds-table__th--end">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="ethds-table__td">Business licence renewal fee</td>
          <td class="ethds-table__td ethds-table__td--end">ETB 350.00</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p><strong>Total: ETB 350.00</strong></p>

  <form method="post" action="/pay">
    <fieldset class="ethds-radio-group">
      <legend class="ethds-legend">Payment method</legend>
      <div class="ethds-radio-options">
        <div class="ethds-radio-row">
          <input id="method-telebirr" name="method" type="radio" value="telebirr" class="ethds-radio" checked />
          <label for="method-telebirr" class="ethds-label">Telebirr</label>
        </div>
        <div class="ethds-radio-row">
          <input id="method-bank" name="method" type="radio" value="bank" class="ethds-radio" />
          <label for="method-bank" class="ethds-label">Bank transfer</label>
        </div>
        <div class="ethds-radio-row">
          <input id="method-card" name="method" type="radio" value="card" class="ethds-radio" />
          <label for="method-card" class="ethds-label">Card</label>
        </div>
      </div>
    </fieldset>
    <button type="submit" class="ethds-button ethds-button--primary">Pay ETB 350.00</button>
  </form>
</section>
```

The server computes the total from the item(s) — never trust a client-
submitted amount. Posting `/pay` redirects to the payment provider (or,
for Telebirr/bank flows that complete out-of-band, to a "confirming your
payment" holding page); the provider's own return redirect lands on a
definite paid/failed [Receipt](receipt-flow.md#html-example) page, never
back on this form with an ambiguous state.
