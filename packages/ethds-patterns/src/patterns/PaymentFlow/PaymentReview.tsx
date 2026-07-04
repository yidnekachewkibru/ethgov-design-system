import { useState } from 'react';
import type { ReactNode } from 'react';
import { Table, RadioGroup, Button, Alert } from '@ethds/react';
import type { RadioOption } from '@ethds/react';
import { formatBirr } from '../../utils/currency';
import styles from './PaymentReview.module.css';

export interface LineItem {
  label: string;
  /** Integer minor-unit amount (santim) — never a float Birr amount. */
  santim: number;
}

export interface PaymentReviewLabels {
  heading: ReactNode;
  tableCaption: string;
  itemHeader: string;
  amountHeader: string;
  totalLabel: string;
  methodLegend: string;
  /** `{amount}` is the formatted total, e.g. "Pay ETB 350.00". */
  payButtonLabel: (amount: string) => ReactNode;
  genericErrorMessage: string;
}

export const DEFAULT_PAYMENT_REVIEW_LABELS: PaymentReviewLabels = {
  heading: 'Pay for: Business licence renewal',
  tableCaption: 'Charges',
  itemHeader: 'Item',
  amountHeader: 'Amount',
  totalLabel: 'Total',
  methodLegend: 'Payment method',
  payButtonLabel: (amount) => `Pay ${amount}`,
  genericErrorMessage: 'Payment did not complete. No amount was charged — you can try again.',
};

export const DEFAULT_PAYMENT_METHODS: RadioOption[] = [
  { value: 'telebirr', label: 'Telebirr' },
  { value: 'bank', label: 'Bank transfer' },
  { value: 'card', label: 'Card' },
];

export interface PaymentReviewProps {
  items: LineItem[];
  onPay: (method: string) => Promise<void>;
  methods?: RadioOption[];
  locale?: string;
  labels?: Partial<PaymentReviewLabels>;
}

/**
 * PaymentReview — the Payment Flow pattern
 * (docs/../ethds-patterns/patterns/payment-flow.md).
 *
 * The itemisation is a semantic `Table` with the total prominently below
 * it; the pay button states the amount so the action is unambiguous. A
 * failed/cancelled payment states plainly that no amount was charged and
 * lets the citizen retry or change method — a frequent trust concern for
 * government payments.
 */
export function PaymentReview({ items, onPay, methods = DEFAULT_PAYMENT_METHODS, locale, labels }: PaymentReviewProps) {
  const l = { ...DEFAULT_PAYMENT_REVIEW_LABELS, ...labels };
  const [method, setMethod] = useState(methods[0]?.value ?? '');
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const total = items.reduce((sum, i) => sum + i.santim, 0);

  async function handlePay() {
    setError(null);
    setPaying(true);
    try {
      await onPay(method);
    } catch {
      setError(l.genericErrorMessage);
    } finally {
      setPaying(false);
    }
  }

  return (
    <section className={styles.section}>
      <h1>{l.heading}</h1>
      {error && (
        <Alert variant="error" iconLabel="Error">
          {error}
        </Alert>
      )}
      <Table
        caption={l.tableCaption}
        columns={[
          { header: l.itemHeader, cell: (i: LineItem) => i.label },
          { header: l.amountHeader, cell: (i: LineItem) => formatBirr(i.santim, locale), align: 'end' },
        ]}
        rows={items}
        rowKey={(i) => i.label}
      />
      <p className={styles.total}>
        <strong>
          {l.totalLabel}: {formatBirr(total, locale)}
        </strong>
      </p>
      <RadioGroup legend={l.methodLegend} value={method} onChange={setMethod} options={methods} required />
      <Button variant="primary" onClick={handlePay} disabled={paying}>
        {l.payButtonLabel(formatBirr(total, locale))}
      </Button>
    </section>
  );
}
