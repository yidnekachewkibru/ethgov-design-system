import type { ReactNode } from 'react';
import { Heading, Text, Search, Link } from '@ethds/react';
import type { FooterLinkGroup, LanguageOption } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import styles from './NotFoundPage.module.css';

export interface NotFoundPageLabels {
  heading: ReactNode;
  explanation: ReactNode;
  searchLabel: string;
  searchSubmitLabel: string;
  tryInsteadHeading: ReactNode;
  homeLabel: string;
  servicesLabel: string;
}

export const DEFAULT_NOT_FOUND_LABELS: NotFoundPageLabels = {
  heading: 'Page not found',
  explanation: "We couldn't find that page. It may have moved, or the address may be wrong.",
  searchLabel: 'Search government services',
  searchSubmitLabel: 'Search',
  tryInsteadHeading: 'Try instead:',
  homeLabel: 'Government home',
  servicesLabel: 'All services',
};

export interface NotFoundPageProps {
  serviceName: ReactNode;
  homeHref?: string;
  servicesHref?: string;
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  onSearch?: (query: string) => void;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<NotFoundPageLabels>;
}

/**
 * NotFoundPage — the 404 template
 * (docs/../ethds-templates/templates/404-page.md).
 *
 * A plain-language explanation plus a way forward (search, a couple of
 * links) — never a dead end, never the raw word "404" in the citizen-
 * facing text. The host application is responsible for returning the
 * actual HTTP 404 status; this component only renders the page body.
 */
export function NotFoundPage({
  serviceName,
  homeHref = '/',
  servicesHref = '/services',
  languages,
  locale,
  onLocale,
  onSearch,
  footerGroups,
  copyright,
  labels,
}: NotFoundPageProps) {
  const l = { ...DEFAULT_NOT_FOUND_LABELS, ...labels };
  return (
    <PageChrome
      serviceName={serviceName}
      homeHref={homeHref}
      languages={languages}
      locale={locale}
      onLocale={onLocale}
      footerGroups={footerGroups}
      copyright={copyright}
    >
      <Heading level={1}>{l.heading}</Heading>
      <Text>{l.explanation}</Text>
      <Search label={l.searchLabel} submitLabel={l.searchSubmitLabel} onSearch={onSearch} />
      <div>
        <Heading level={2} visualLevel={4}>
          {l.tryInsteadHeading}
        </Heading>
        <ul className={styles.list}>
          <li>
            <Link href={homeHref}>{l.homeLabel}</Link>
          </li>
          <li>
            <Link href={servicesHref}>{l.servicesLabel}</Link>
          </li>
        </ul>
      </div>
    </PageChrome>
  );
}
