import { forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './SkipLink.module.css';

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target of the skip, e.g. "#main". */
  href?: string;
}

/**
 * SkipLink — lets keyboard users bypass repeated navigation.
 *
 * Place it as the first focusable element on every page, pointing at the
 * main content landmark. Visually hidden until focused, then shown
 * prominently. Pass translated text as children.
 */
export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(function SkipLink(
  { href = '#main', className, ...rest },
  ref,
) {
  return <a ref={ref} href={href} className={cx(styles.skipLink, className)} {...rest} />;
});
