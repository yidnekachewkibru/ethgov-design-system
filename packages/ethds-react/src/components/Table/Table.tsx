import { forwardRef } from 'react';
import type { TableHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Table.module.css';

export interface TableColumn<Row> {
  /** Column header text (translatable). */
  header: ReactNode;
  /** Cell renderer for a row. */
  cell: (row: Row) => ReactNode;
  /** Optional scope alignment. */
  align?: 'start' | 'end';
}

export interface TableProps<Row> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  /**
   * Table caption (translatable). Provides the accessible name; visually
   * shown above the table (use `hideCaption` to visually hide but keep it
   * for assistive tech).
   */
  caption: ReactNode;
  hideCaption?: boolean;
  columns: TableColumn<Row>[];
  rows: Row[];
  /** Unique key for a row. */
  rowKey: (row: Row, index: number) => string | number;
  /** Message shown when there are no rows (translatable). */
  emptyMessage?: ReactNode;
}

/**
 * Table — a semantic data table.
 *
 * Renders a real `<table>` with a `<caption>`, `<th scope="col">` headers,
 * and `<tbody>` rows — the structure screen-reader users rely on to
 * navigate tabular data. Header and cell content are passed in
 * (translatable).
 */
function TableInner<Row>(
  { caption, hideCaption = false, columns, rows, rowKey, emptyMessage, className, ...rest }: TableProps<Row>,
  ref: React.Ref<HTMLTableElement>,
) {
  return (
    <div className={styles.scroll}>
      <table ref={ref} className={cx(styles.table, className)} {...rest}>
        <caption className={cx(styles.caption, hideCaption && styles.visuallyHidden)}>
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                scope="col"
                className={cx(styles.th, col.align === 'end' && styles.end)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className={styles.empty} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={rowKey(row, i)} className={styles.tr}>
                {columns.map((col, j) => (
                  <td key={j} className={cx(styles.td, col.align === 'end' && styles.end)}>
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// forwardRef with generics.
export const Table = forwardRef(TableInner) as <Row>(
  props: TableProps<Row> & { ref?: React.Ref<HTMLTableElement> },
) => ReturnType<typeof TableInner>;
