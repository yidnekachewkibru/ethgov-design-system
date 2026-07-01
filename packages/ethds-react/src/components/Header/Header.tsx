import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Header.module.css';

export interface HeaderNavItem {
  label: ReactNode;
  href: string;
  current?: boolean;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Service or organisation name shown as the identity (translatable). */
  serviceName: ReactNode;
  /** Link target for the identity (home). */
  homeHref?: string;
  /** Accessible name for the identity link, e.g. "Government of Ethiopia — home". */
  homeLabel?: string;
  /** Optional emblem/logo node (e.g. an <img> or <Icon>). */
  logo?: ReactNode;
  /** Primary navigation items. */
  nav?: HeaderNavItem[];
  /** Accessible name for the primary nav landmark (translatable). */
  navLabel?: string;
  /** Slot on the right (e.g. a LanguageSwitcher). */
  actions?: ReactNode;
}

/**
 * Header — the government service identity and primary navigation.
 *
 * Renders a `<header>` banner with the emblem + service name (a home link)
 * and an optional primary `<nav>`. The consistent, recognisable identity
 * is how a citizen knows a service is official (see
 * docs/brand/government-branding-standards.md). An `actions` slot holds
 * the LanguageSwitcher and similar controls.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    serviceName,
    homeHref = '/',
    homeLabel,
    logo,
    nav,
    navLabel = 'Primary',
    actions,
    className,
    ...rest
  },
  ref,
) {
  return (
    <header ref={ref} className={cx(styles.header, className)} {...rest}>
      <div className={styles.bar}>
        <a href={homeHref} className={styles.identity} aria-label={homeLabel}>
          {logo && <span className={styles.logo}>{logo}</span>}
          <span className={styles.serviceName}>{serviceName}</span>
        </a>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {nav && nav.length > 0 && (
        <nav aria-label={navLabel} className={styles.nav}>
          <ul className={styles.navList}>
            {nav.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  className={cx(styles.navLink, item.current && styles.navCurrent)}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
});
