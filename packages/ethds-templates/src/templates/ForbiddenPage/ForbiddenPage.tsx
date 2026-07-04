import type { ReactNode } from 'react';
import { Heading, Text, Button, Link } from '@ethds/react';
import type { FooterLinkGroup, LanguageOption } from '@ethds/react';
import { PageChrome } from '../_internal/PageChrome';
import gridStyles from '../../styles/grid.module.css';

export interface ForbiddenPageLabels {
  heading: ReactNode;
  explanation: ReactNode;
  loginLabel: string;
  homeLabel: string;
}

export const DEFAULT_FORBIDDEN_LABELS: ForbiddenPageLabels = {
  heading: "You don't have access to this page",
  explanation: 'You may need to sign in, or you may not have permission to view it.',
  loginLabel: 'Log in',
  homeLabel: 'Go to the government home',
};

export interface ForbiddenPageProps {
  serviceName: ReactNode;
  homeHref?: string;
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  onLogin: () => void;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  labels?: Partial<ForbiddenPageLabels>;
}

/**
 * ForbiddenPage — the 403 template
 * (docs/../ethds-templates/templates/403-page.md).
 *
 * Explains the citizen lacks access without revealing whether the
 * resource exists or the specific permission missing (prevents
 * information leakage). Leads with Log in, since that's the most common
 * cause. The host application is responsible for returning the actual
 * HTTP 403 status; this component only renders the page body.
 */
export function ForbiddenPage({
  serviceName,
  homeHref = '/',
  languages,
  locale,
  onLocale,
  onLogin,
  footerGroups,
  copyright,
  labels,
}: ForbiddenPageProps) {
  const l = { ...DEFAULT_FORBIDDEN_LABELS, ...labels };
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
        <Button variant="primary" onClick={onLogin}>
          {l.loginLabel}
        </Button>
      </div>
      <p>
        <Link href={homeHref}>{l.homeLabel}</Link>
      </p>
    </PageChrome>
  );
}
