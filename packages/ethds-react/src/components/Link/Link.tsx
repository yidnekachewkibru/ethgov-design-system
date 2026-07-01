import { forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render with less visual weight (e.g. within dense UI). */
  variant?: 'default' | 'subtle';
  /**
   * Mark the link as opening in a new tab. When true, sets
   * `target="_blank"` and safe `rel`, and callers should append a visually
   * hidden "(opens in new tab)" note in the link text for screen readers.
   */
  external?: boolean;
}

/**
 * Link — a navigational anchor.
 *
 * Renders a native `<a>`. Requires an `href`; for in-app routing, pass the
 * routing library's props through (this stays a plain anchor). Link text
 * comes from children so it is translatable and gives the accessible name.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = 'default', external = false, className, rel, target, ...rest },
  ref,
) {
  const externalProps = external
    ? { target: target ?? '_blank', rel: rel ?? 'noopener noreferrer' }
    : { target, rel };

  return (
    <a
      ref={ref}
      className={cx(styles.link, variant === 'subtle' && styles.subtle, className)}
      {...externalProps}
      {...rest}
    />
  );
});
