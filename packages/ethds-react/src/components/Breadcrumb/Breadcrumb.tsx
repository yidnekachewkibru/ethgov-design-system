import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { ChevronRightIcon } from '../Icon/icons';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  /** Visible label (translatable). */
  label: ReactNode;
  /** Link target. Omit for the current page (last item). */
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /**
   * Accessible name for the breadcrumb landmark, in the active language
   * (e.g. "Breadcrumb" / "የዳሰሳ መስመር"). Defaults to "Breadcrumb".
   */
  label?: string;
}

/**
 * Breadcrumb — shows the citizen where they are in the site hierarchy.
 *
 * Renders a `<nav>` landmark containing an ordered list; the last item is
 * the current page and is marked `aria-current="page"` (and not a link).
 * Separators are decorative and hidden from assistive tech.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, label = 'Breadcrumb', className, ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={label} className={cx(styles.nav, className)} {...rest}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {item.href && !isLast ? (
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={styles.current}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator}>
                  <Icon size="sm">{ChevronRightIcon}</Icon>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
