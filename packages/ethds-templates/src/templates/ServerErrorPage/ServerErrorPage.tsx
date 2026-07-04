import type { ReactNode } from 'react';
import { Heading, Text, Button, Link } from '@ethds/react';
import type { FooterLinkGroup, LanguageOption } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import gridStyles from '../../styles/grid.module.css';

export interface ServerErrorPageLabels {
  heading: ReactNode;
  explanation: ReactNode;
  retryLabel: string;
  homeLabel: string;
  contactPrefix: ReactNode;
  contactLabel: string;
}

export const DEFAULT_SERVER_ERROR_LABELS: ServerErrorPageLabels = {
  heading: 'Sorry, something went wrong',
  explanation: 'This is a problem on our side, not yours. Please try again in a few minutes.',
  retryLabel: 'Try again',
  homeLabel: 'Go to home',
  contactPrefix: 'If it keeps happening,',
  contactLabel: 'contact us',
};

export interface ServerErrorPageProps {
  serviceName: ReactNode;
  homeHref?: string;
  contactHref?: string;
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  onRetry: () => void;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<ServerErrorPageLabels>;
}

/**
 * ServerErrorPage — the 500 template
 * (docs/../ethds-templates/templates/500-page.md).
 *
 * Reassures the citizen it isn't their fault and offers a retry — never
 * exposes a stack trace or other technical detail (log that server-side
 * instead). The host application is responsible for returning the actual
 * HTTP 500 status; this component only renders the page body, and stays
 * lightweight since it may render while systems are degraded.
 */
export function ServerErrorPage({
  serviceName,
  homeHref = '/',
  contactHref = '/contact',
  languages,
  locale,
  onLocale,
  onRetry,
  footerGroups,
  copyright,
  labels,
}: ServerErrorPageProps) {
  const l = { ...DEFAULT_SERVER_ERROR_LABELS, ...labels };
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
      <div className={gridStyles.actions}>
        <Button variant="primary" onClick={onRetry}>
          {l.retryLabel}
        </Button>
        <Link href={homeHref}>{l.homeLabel}</Link>
      </div>
      <p>
        {l.contactPrefix} <Link href={contactHref}>{l.contactLabel}</Link>.
      </p>
    </PageChrome>
  );
}
