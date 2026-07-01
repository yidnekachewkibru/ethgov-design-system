import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { ChevronRightIcon } from '../Icon/icons';
import styles from './Pagination.module.css';

export interface PaginationLabels {
  /** Accessible name for the nav landmark, e.g. "Pagination". */
  nav: string;
  /** Label for the previous-page control, e.g. "Previous". */
  previous: string;
  /** Label for the next-page control, e.g. "Next". */
  next: string;
  /**
   * Accessible name for a page link, given the page number. Return e.g.
   * "Go to page 3". Also used for the current page as "Page 3, current".
   */
  page: (page: number, isCurrent: boolean) => string;
}

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page (1-based). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Translatable labels. */
  labels: PaginationLabels;
  /** Max number of numbered page buttons to show (default 5). */
  siblingWindow?: number;
}

/** Build the list of page numbers to render, with -1 marking a gap. */
function pageList(current: number, total: number, window: number): number[] {
  if (total <= window + 2) return Array.from({ length: total }, (_, i) => i + 1);
  const side = Math.floor(window / 2);
  let start = Math.max(2, current - side);
  let end = Math.min(total - 1, current + side);
  if (current - side < 2) end = Math.min(total - 1, end + (2 - (current - side)));
  if (current + side > total - 1) start = Math.max(2, start - (current + side - (total - 1)));
  const pages: number[] = [1];
  if (start > 2) pages.push(-1);
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push(-1);
  pages.push(total);
  return pages;
}

/**
 * Pagination — accessible navigation across pages of results.
 *
 * A `<nav>` landmark with previous/next controls and numbered page links.
 * The current page is marked `aria-current="page"`. Disabled prev/next at
 * the ends are non-interactive. All labels are passed in (translatable).
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { currentPage, totalPages, onPageChange, labels, siblingWindow = 5, className, ...rest },
  ref,
) {
  const pages = pageList(currentPage, totalPages, siblingWindow);
  const atStart = currentPage <= 1;
  const atEnd = currentPage >= totalPages;

  return (
    <nav ref={ref} aria-label={labels.nav} className={cx(styles.nav, className)} {...rest}>
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.control}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={atStart}
            aria-label={labels.previous}
          >
            <span className={styles.prevIcon}>
              <Icon>{ChevronRightIcon}</Icon>
            </span>
            <span>{labels.previous}</span>
          </button>
        </li>

        {pages.map((p, i) =>
          p === -1 ? (
            <li key={`gap-${i}`} className={styles.gap} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={cx(styles.page, p === currentPage && styles.current)}
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                aria-label={labels.page(p, p === currentPage)}
              >
                {p}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className={styles.control}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={atEnd}
            aria-label={labels.next}
          >
            <span>{labels.next}</span>
            <Icon>{ChevronRightIcon}</Icon>
          </button>
        </li>
      </ul>
    </nav>
  );
});
