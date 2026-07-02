# Receipt Flow

## Overview

Confirm a successful payment and give the citizen durable proof. A receipt
reassures the citizen the transaction is done, records exactly what was
paid, and can be saved, printed, or shown later — important where a paper
trail still matters at government offices.

**Components:** Alert, Table, Button, Link. **Related:**
[Payment Flow](payment-flow.md), [Status Tracking](status-tracking.md).

## User Journey

1. After a successful [payment](payment-flow.md), the citizen lands on the
   receipt.
2. Sees a clear "Payment successful" confirmation and the itemised total.
3. Sees the receipt/reference number and date.
4. Can download/print it or return to the service.

## UX Flow

```
[Payment success] --> [Receipt: confirmation + details + reference]
                          ├──> Download / print
                          └──> Back to service
```

## Wireframe

```
┌─────────────────────────────────────┐
│  ✔ Payment successful               │  ← success confirmation
│                                     │
│  Receipt no.  RCP-2026-004112       │
│  Date         Meskerem 9, 2019 EC   │
│  Paid via     Telebirr              │
│                                     │
│  Item                        Amount │
│  Licence fee              ETB 300.00│
│  Service charge            ETB 50.00│
│  ─────────────────────────────────  │
│  Total paid               ETB 350.00│
│                                     │
│  [ Download receipt ]  [ Done ]     │
└─────────────────────────────────────┘
```

## Validation Rules

- The receipt is generated **only** for a confirmed, settled payment
  (never for a pending/failed one).
- It records the immutable facts: reference, date/time (EAT), method,
  itemisation, total (Birr) — matching what was charged.

## Error Handling

- **Receipt not yet ready (settlement pending):** show "Payment received —
  your receipt is being finalised" with a way to get it later (email/SMS or
  from the dashboard); don't fabricate a receipt.
- **Download failure:** offer an alternative (view in page, resend by SMS)
  — a citizen on a [low-bandwidth](../../../docs/design-principles/06-design-for-low-bandwidth.md)
  link may not manage a large PDF; keep an HTML/text fallback.
- Let the citizen retrieve the receipt again later from their account
  (Redundant Entry — they shouldn't have to reproduce anything).

## Accessibility Guidance

- The success confirmation is an Alert (`role="status"`) and the page's
  primary heading; focus moves to it.
- The itemisation is a semantic [Table](../../ethds-react/) with a caption;
  the total is clearly associated and labelled "Total paid".
- Download/print controls are keyboard operable with clear labels;
  success is conveyed by text + icon, not colour alone.

## Localization

- Amounts in **Birr** (2 decimals, `Intl`); date in the
  [Ethiopian calendar](../../../docs/localization/date-formatting.md) where
  the service uses E.C., labelled.
- All labels translatable; the downloadable receipt is generated in the
  citizen's language.

## React Example

```tsx
import { Alert, Table, Button } from '@ethds/react';

const fmt = (santim: number, locale = 'en-ET') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'ETB' }).format(santim / 100);

type LineItem = { label: string; santim: number };

export function Receipt({
  reference,
  date,
  method,
  items,
  onDownload,
}: {
  reference: string;
  date: string;
  method: string;
  items: LineItem[];
  onDownload: () => void;
}) {
  const total = items.reduce((s, i) => s + i.santim, 0);
  return (
    <section>
      <Alert variant="success" iconLabel="Success" title="Payment successful">
        Keep this receipt as proof of payment.
      </Alert>
      <dl>
        <dt>Receipt no.</dt><dd>{reference}</dd>
        <dt>Date</dt><dd>{date}</dd>
        <dt>Paid via</dt><dd>{method}</dd>
      </dl>
      <Table
        caption="Payment details"
        columns={[
          { header: 'Item', cell: (i: LineItem) => i.label },
          { header: 'Amount', cell: (i: LineItem) => fmt(i.santim), align: 'end' },
        ]}
        rows={items}
        rowKey={(i) => i.label}
      />
      <p><strong>Total paid: {fmt(total)}</strong></p>
      <Button variant="secondary" onClick={onDownload}>Download receipt</Button>
    </section>
  );
}
```
