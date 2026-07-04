import type { ReactNode } from 'react';
import { Heading, Text, Link, Search, Alert, Pagination } from '@ethds/react';
import type { FooterLinkGroup, HeaderNavItem, LanguageOption, PaginationLabels } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import { DEFAULT_PAGINATION_LABELS } from '../_internal/paginationLabels';
import styles from './SearchResultsPage.module.css';

export interface SearchResult {
  href: string;
  title: ReactNode;
  snippet: ReactNode;
}

export interface SearchResultsPageLabels {
  searchLabel: string;
  searchSubmitLabel: string;
  /** `{count}` and `{query}` are substituted. */
  resultCount: (count: number, query: string) => ReactNode;
  noResultsMessage: ReactNode;
  pagination: PaginationLabels;
}

export const DEFAULT_SEARCH_RESULTS_LABELS: SearchResultsPageLabels = {
  searchLabel: 'Search government services',
  searchSubmitLabel: 'Search',
  resultCount: (count, query) => `${count} results for "${query}"`,
  noResultsMessage: 'No results. Try different words or browse services.',
  pagination: DEFAULT_PAGINATION_LABELS,
};

export interface SearchResultsPageProps {
  serviceName: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  query: string;
  onSearch?: (query: string) => void;
  results: SearchResult[];
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<SearchResultsPageLabels>;
}

/**
 * SearchResultsPage — the Search Results Page template
 * (docs/../ethds-templates/templates/search-results-page.md).
 *
 * The query stays in the search box so it can be refined; the result
 * count is announced to assistive tech via a polite live region
 * (`role="status"`) when results update. An empty result set gets a
 * helpful `Alert` with alternative suggestions, never a bare "no results".
 */
export function SearchResultsPage({
  serviceName,
  nav,
  languages,
  locale,
  onLocale,
  query,
  onSearch,
  results,
  page,
  totalPages,
  onPage,
  footerGroups,
  copyright,
  labels,
}: SearchResultsPageProps) {
  const l = { ...DEFAULT_SEARCH_RESULTS_LABELS, ...labels };
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
      <Search label={l.searchLabel} submitLabel={l.searchSubmitLabel} defaultValue={query} onSearch={onSearch} />
      <p role="status">{l.resultCount(results.length, query)}</p>
      {results.length === 0 ? (
        <Alert variant="info" iconLabel="Information">
          {l.noResultsMessage}
        </Alert>
      ) : (
        <ul className={styles.list}>
          {results.map((r) => (
            <li key={r.href}>
              <Heading level={2} visualLevel={4}>
                <Link href={r.href}>{r.title}</Link>
              </Heading>
              <Text>{r.snippet}</Text>
            </li>
          ))}
        </ul>
      )}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPage} labels={l.pagination} />
      )}
    </PageChrome>
  );
}
