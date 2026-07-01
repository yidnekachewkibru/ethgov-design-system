import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Footer.module.css';

export interface FooterLink {
  label: ReactNode;
  href: string;
}

export interface FooterLinkGroup {
  /** Group heading (translatable). */
  title: ReactNode;
  links: FooterLink[];
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Groups of secondary links. */
  groups?: FooterLinkGroup[];
  /** Copyright / legal line (translatable). */
  copyright?: ReactNode;
  /** Accessible name for the footer landmark (translatable). */
  label?: string;
}

/**
 * Footer — secondary government identity and links.
 *
 * Renders a `<footer>` landmark with grouped links and a copyright line.
 * Each group is a labelled `<nav>` so screen-reader users can navigate the
 * footer by section. Link text is passed in (translatable).
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { groups, copyright, label, className, ...rest },
  ref,
) {
  return (
    <footer ref={ref} className={cx(styles.footer, className)} aria-label={label} {...rest}>
      {groups && groups.length > 0 && (
        <div className={styles.groups}>
          {groups.map((group, i) => (
            <nav key={i} className={styles.group} aria-label={typeof group.title === 'string' ? group.title : undefined}>
              <h2 className={styles.title}>{group.title}</h2>
              <ul className={styles.list}>
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      )}
      {copyright && <p className={styles.copyright}>{copyright}</p>}
    </footer>
  );
});
