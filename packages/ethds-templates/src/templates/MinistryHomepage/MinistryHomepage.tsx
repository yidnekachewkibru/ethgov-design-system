import type { ReactNode } from 'react';
import type { FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import { HomepageLayout } from '../_internal/HomepageLayout';
import type { HomepageLinkItem } from '../_internal/HomepageLayout';

export interface MinistryHomepageLabels {
  homeCrumbLabel: string;
  searchLabel: string;
  searchSubmitLabel: string;
  servicesHeading: ReactNode;
  newsHeading: ReactNode;
}

export const DEFAULT_MINISTRY_LABELS: MinistryHomepageLabels = {
  homeCrumbLabel: 'Home',
  searchLabel: 'Search this ministry',
  searchSubmitLabel: 'Search',
  servicesHeading: 'Our services',
  newsHeading: 'Latest from us',
};

export interface MinistryHomepageProps {
  ministryName: ReactNode;
  /** One or two plain sentences on what the ministry does. */
  intro: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  onSearch?: (query: string) => void;
  services: HomepageLinkItem[];
  news: HomepageLinkItem[];
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<MinistryHomepageLabels>;
}

/**
 * MinistryHomepage — the Ministry Homepage template
 * (docs/../ethds-templates/templates/ministry-homepage.md).
 *
 * Identifies the ministry within the shared government identity — the
 * ministry is named in the Header, never a separate brand — and leads
 * with its most-used services, linking back to the national portal via
 * the breadcrumb.
 */
export function MinistryHomepage({
  ministryName,
  intro,
  nav,
  languages,
  locale,
  onLocale,
  onSearch,
  services,
  news,
  footerGroups,
  copyright,
  labels,
}: MinistryHomepageProps) {
  const l = { ...DEFAULT_MINISTRY_LABELS, ...labels };
  return (
    <HomepageLayout
      serviceName={ministryName}
      homeLabel={`${ministryName} — home`}
      nav={nav}
      languages={languages}
      locale={locale}
      onLocale={onLocale}
      breadcrumb={[{ label: l.homeCrumbLabel, href: '/' }, { label: ministryName }]}
      heading={ministryName}
      intro={intro}
      search={{ label: l.searchLabel, submitLabel: l.searchSubmitLabel, onSearch }}
      sections={[
        { heading: l.servicesHeading, items: services, variant: 'list' },
        { heading: l.newsHeading, items: news, variant: 'list' },
      ]}
      footerGroups={footerGroups}
      copyright={copyright}
    />
  );
}
