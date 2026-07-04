import { Heading, Alert, Table, Button } from '@ethds/react';
import { formatBirr } from '../../utils/currency';
import type { LineItem } from '../PaymentFlow';
import styles from './Receipt.module.css';

export interface ReceiptLabels {
  heading: string;
  successTitle: string;
  successBody: string;
  referenceLabel: string;
  dateLabel: string;
  methodLabel: string;
  tableCaption: string;
  itemHeader: string;
  amountHeader: string;
  totalPaidLabel: string;
  downloadLabel: string;
}

export const DEFAULT_RECEIPT_LABELS: ReceiptLabels = {
  heading: 'Payment receipt',
  successTitle: 'Payment successful',
  successBody: 'Keep this receipt as proof of payment.',
  referenceLabel: 'Receipt no.',
  dateLabel: 'Date',
  methodLabel: 'Paid via',
  tableCaption: 'Payment details',
  itemHeader: 'Item',
  amountHeader: 'Amount',
  totalPaidLabel: 'Total paid',
  downloadLabel: 'Download receipt',
};

export interface ReceiptProps {
  reference: string;
  date: string;
  method: string;
  items: LineItem[];
  onDownload: () => void;
  locale?: string;
  labels?: Partial<ReceiptLabels>;
}

/**
 * Receipt — the Receipt Flow pattern
 * (docs/../ethds-patterns/patterns/receipt-flow.md).
 *
 * Only ever rendered for a confirmed, settled payment (never a
 * pending/failed one) — that gate is the caller's responsibility, since
 * this component just displays the immutable facts of a completed
 * payment. Success is conveyed by text and a labelled icon (via `Alert`),
 * never colour alone; the itemisation is a semantic `Table`. Renders one
 * `<h1>`, independent of the `Alert`'s own status announcement.
 */
export function Receipt({ reference, date, method, items, onDownload, locale, labels }: ReceiptProps) {
  const l = { ...DEFAULT_RECEIPT_LABELS, ...labels };
  const total = items.reduce((sum, i) => sum + i.santim, 0);

  return (
    <section className={styles.section}>
      <Heading level={1}>{l.heading}</Heading>
      <Alert variant="success" iconLabel="Success" title={l.successTitle}>
        {l.successBody}
      </Alert>
      <dl className={styles.details}>
        <dt>{l.referenceLabel}</dt>
        <dd>{reference}</dd>
        <dt>{l.dateLabel}</dt>
        <dd>{date}</dd>
        <dt>{l.methodLabel}</dt>
        <dd>{method}</dd>
      </dl>
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
          {l.totalPaidLabel}: {formatBirr(total, locale)}
        </strong>
      </p>
      <Button variant="secondary" onClick={onDownload}>
        {l.downloadLabel}
      </Button>
    </section>
  );
}
