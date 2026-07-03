import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { ChevronLeftIcon } from '../Icon/icons';
import styles from './BackLink.module.css';

export interface BackLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link text (translatable), e.g. "Back". */
  children: ReactNode;
}

/**
 * BackLink — a single-step back-navigation link.
 *
 * A plain anchor with a decorative chevron; place at the top of a page to
 * return to the previous step. Not a substitute for the browser's own
 * back button — this returns to a known previous step in a service flow.
 */
export const BackLink = forwardRef<HTMLAnchorElement, BackLinkProps>(function BackLink(
  { children, className, ...rest },
  ref,
) {
  return (
    <a ref={ref} className={cx(styles.link, className)} {...rest}>
      <Icon size="sm" className={styles.icon}>
        {ChevronLeftIcon}
      </Icon>
      {children}
    </a>
  );
});
