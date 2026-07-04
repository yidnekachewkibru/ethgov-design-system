import type { ReactNode } from 'react';
import { Heading, Text, Link, Breadcrumb } from '@ethds/react';
import type { BreadcrumbItem, FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import styles from './NewsPage.module.css';

export interface NewsArticlePageLabels {
  backLabel: string;
}

export const DEFAULT_NEWS_ARTICLE_LABELS: NewsArticlePageLabels = {
  backLabel: 'Back to news',
};

export interface NewsArticlePageProps {
  serviceName: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  /** e.g. Home ▸ News ▸ New tax filing deadline. */
  breadcrumb: BreadcrumbItem[];
  title: ReactNode;
  /** Date already formatted per the Ethiopian calendar (e.g. "Meskerem 9, 2019 EC"). */
  date: string;
  /** Body paragraphs of the announcement. */
  body: ReactNode;
  newsHref: string;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<NewsArticlePageLabels>;
}

/**
 * NewsArticlePage — the article shape of the News Page template
 * (docs/../ethds-templates/templates/news-page.md).
 *
 * One `<h1>` (the article title); the date renders in a real `<time>`
 * element for correct semantics; plain, readable text rather than heavy
 * media, respecting low-bandwidth connections.
 */
export function NewsArticlePage({
  serviceName,
  nav,
  languages,
  locale,
  onLocale,
  breadcrumb,
  title,
  date,
  body,
  newsHref,
  footerGroups,
  copyright,
  labels,
}: NewsArticlePageProps) {
  const l = { ...DEFAULT_NEWS_ARTICLE_LABELS, ...labels };
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
      <Breadcrumb items={breadcrumb} />
      <Heading level={1}>{title}</Heading>
      <Text as="span" secondary>
        <time>{date}</time>
      </Text>
      <div className={styles.body}>{body}</div>
      <Link href={newsHref}>{l.backLabel}</Link>
    </PageChrome>
  );
}
