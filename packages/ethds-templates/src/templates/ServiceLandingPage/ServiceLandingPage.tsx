import type { ReactNode } from 'react';
import { Heading, Text, Button, Breadcrumb } from '@ethds/react';
import type { BreadcrumbItem, FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import styles from './ServiceLandingPage.module.css';

export interface ServiceLandingPageLabels {
  startLabel: string;
  requirementsHeading: ReactNode;
}

export const DEFAULT_SERVICE_LANDING_LABELS: ServiceLandingPageLabels = {
  startLabel: 'Start now',
  requirementsHeading: "Before you start you'll need",
};

export interface ServiceLandingPageProps {
  /** Organisation identity shown in the Header (the delivering ministry/agency). */
  serviceName: ReactNode;
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  /** e.g. Home ▸ Services ▸ Apply for a passport. */
  breadcrumb: BreadcrumbItem[];
  /** The service's name, e.g. "Apply for a passport". */
  heading: ReactNode;
  /** Who this is for and what it does, in plain language. */
  summary: ReactNode;
  onStart: () => void;
  /** What the citizen needs before starting (documents, fees, etc.). */
  requirements: ReactNode[];
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<ServiceLandingPageLabels>;
}

/**
 * ServiceLandingPage — the Service Landing Page template
 * (docs/../ethds-templates/templates/service-landing-page.md).
 *
 * One prominent "Start now" action; sets expectations (documents, fees in
 * Birr, timing) up front so the citizen isn't surprised mid-flow. Routing
 * "Start now" to the Service Application Page is the caller's
 * responsibility (via `onStart`).
 */
export function ServiceLandingPage({
  serviceName,
  nav,
  languages,
  locale,
  onLocale,
  breadcrumb,
  heading,
  summary,
  onStart,
  requirements,
  footerGroups,
  copyright,
  labels,
}: ServiceLandingPageProps) {
  const l = { ...DEFAULT_SERVICE_LANDING_LABELS, ...labels };
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
      <Heading level={1}>{heading}</Heading>
      <Text>{summary}</Text>
      <Button variant="primary" onClick={onStart}>
        {l.startLabel}
      </Button>
      <Heading level={2}>{l.requirementsHeading}</Heading>
      <ul className={styles.list}>
        {requirements.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </PageChrome>
  );
}
