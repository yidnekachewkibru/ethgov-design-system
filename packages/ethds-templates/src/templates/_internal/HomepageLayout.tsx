import type { ReactNode } from 'react';
import { Heading, Text, Search, Breadcrumb, Link } from '@ethds/react';
import type { BreadcrumbItem, FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import { PageChrome } from './PageChrome';
import gridStyles from '../../styles/grid.module.css';
import styles from './HomepageLayout.module.css';

export interface HomepageLinkItem {
  href: string;
  label: ReactNode;
  /** A fully-formed `<Icon>` element, only rendered for the `cards` variant. */
  icon?: ReactNode;
}

export interface HomepageSection {
  heading: ReactNode;
  items: HomepageLinkItem[];
  /** `cards` renders each item as a linked card with its icon; `list` (default) renders a plain link list. */
  variant?: 'cards' | 'list';
}

export interface HomepageSearchConfig {
  label: string;
  submitLabel: string;
  onSearch?: (query: string) => void;
}

export interface HomepageLayoutProps {
  serviceName: ReactNode;
  homeHref?: string;
  homeLabel?: string;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  /** Home ▸ current-page trail; omitted on the national portal (there is no page above it). */
  breadcrumb?: BreadcrumbItem[];
  heading: ReactNode;
  intro?: ReactNode;
  search?: HomepageSearchConfig;
  sections: HomepageSection[];
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
}

/**
 * HomepageLayout — the shared shape behind the National Portal, Ministry,
 * and Agency homepage templates (docs/../ethds-templates/templates/
 * {national-portal,ministry,agency}-homepage.md): shared government
 * identity + optional breadcrumb + hero heading/intro/search + one or
 * more link sections (as cards or a plain list).
 */
export function HomepageLayout({
  serviceName,
  homeHref = '/',
  homeLabel,
  nav,
  languages,
  locale,
  onLocale,
  breadcrumb,
  heading,
  intro,
  search,
  sections,
  footerGroups,
  copyright,
}: HomepageLayoutProps) {
  return (
    <PageChrome
      serviceName={serviceName}
      homeHref={homeHref}
      homeLabel={homeLabel}
      nav={nav}
      languages={languages}
      locale={locale}
      onLocale={onLocale}
      footerGroups={footerGroups}
      copyright={copyright}
    >
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <Heading level={1}>{heading}</Heading>
      {intro && <Text>{intro}</Text>}
      {search && <Search label={search.label} submitLabel={search.submitLabel} onSearch={search.onSearch} />}
      <div className={gridStyles.grid}>
        {sections.map((section, i) => (
          <div key={i} className={gridStyles.colHalf}>
            <Heading level={2}>{section.heading}</Heading>
            {section.variant === 'cards' ? (
              <ul className={styles.cardGrid}>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.card}>
                      {item.icon}
                      <Text as="span">{item.label}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </PageChrome>
  );
}
