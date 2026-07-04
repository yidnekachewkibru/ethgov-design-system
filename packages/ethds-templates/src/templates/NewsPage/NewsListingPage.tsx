import type { ReactNode } from 'react';
import { Heading, Text, Link, Pagination } from '@ethds/react';
import type { FooterLinkGroup, HeaderNavItem, LanguageOption, PaginationLabels } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import { DEFAULT_PAGINATION_LABELS } from '../_internal/paginationLabels';
import styles from './NewsPage.module.css';

export interface NewsListItem {
  href: string;
  title: ReactNode;
  /** Date already formatted per the Ethiopian calendar (e.g. "Meskerem 9, 2019 EC"). */
  date: string;
  summary: ReactNode;
}

export interface NewsListingPageLabels {
  heading: ReactNode;
  pagination: PaginationLabels;
}

export const DEFAULT_NEWS_LISTING_LABELS: NewsListingPageLabels = {
  heading: 'News',
  pagination: DEFAULT_PAGINATION_LABELS,
};

export interface NewsListingPageProps {
  serviceName: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  items: NewsListItem[];
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<NewsListingPageLabels>;
}

/**
 * NewsListingPage — the listing shape of the News Page template
 * (docs/../ethds-templates/templates/news-page.md).
 *
 * Each item shows title, date (Ethiopian calendar), and a short summary
 * linking to {@link NewsArticlePage}; items use a sequential heading
 * level for screen-reader navigation.
 */
export function NewsListingPage({
  serviceName,
  nav,
  languages,
  locale,
  onLocale,
  items,
  page,
  totalPages,
  onPage,
  footerGroups,
  copyright,
  labels,
}: NewsListingPageProps) {
  const l = { ...DEFAULT_NEWS_LISTING_LABELS, ...labels };
  return (
    <PageChrome
      serviceName={serviceName}
      nav={nav}
      languages={languages}
      locale={locale}
      onLocale={onLocale}
      footerGroups={footerGroups}
      copyright={copyright}
    >
      <Heading level={1}>{l.heading}</Heading>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href}>
            <Heading level={2} visualLevel={3}>
              <Link href={item.href}>{item.title}</Link>
            </Heading>
            <Text secondary>{item.date}</Text>
            <Text>{item.summary}</Text>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPage} labels={l.pagination} />
      )}
    </PageChrome>
  );
}
