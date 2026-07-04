import type { ReactNode } from 'react';
import {
  Header,
  Footer,
  SkipLink,
  LanguageSwitcher,
} from '@ethds/react';
import type { FooterLinkGroup, HeaderNavItem, LanguageOption } from '@ethds/react';
import gridStyles from '../../styles/grid.module.css';
import styles from './PageChrome.module.css';

export interface PageChromeProps {
  /** Service or organisation name shown in the Header identity (translatable). */
  serviceName: ReactNode;
  homeHref?: string;
  /** Accessible name for the identity link, e.g. "Government of Ethiopia — home". */
  homeLabel?: string;
  /** Primary navigation items (e.g. Home / Services / News / Contact). */
  nav?: HeaderNavItem[];
  languages: LanguageOption[];
  locale: string;
  onLocale: (code: string) => void;
  /** Accessible label for the language switcher (translatable). */
  languageSwitcherLabel?: string;
  /** Accessible label for the skip link (translatable). */
  skipLinkLabel?: string;
  footerGroups?: FooterLinkGroup[];
  copyright?: ReactNode;
  /** Accessible name for the footer landmark (translatable). */
  footerLabel?: string;
  children: ReactNode;
}

/**
 * PageChrome — the shared Header/SkipLink/main/Footer shell every
 * template composes, so a citizen sees one consistent government identity
 * across every page (Consistent Government Experience) and every page
 * has exactly one `<h1>`, a skip link, and landmark regions.
 */
export function PageChrome({
  serviceName,
  homeHref = '/',
  homeLabel,
  nav,
  languages,
  locale,
  onLocale,
  languageSwitcherLabel = 'Choose language',
  skipLinkLabel = 'Skip to main content',
  footerGroups,
  copyright,
  footerLabel = 'Footer',
  children,
}: PageChromeProps) {
  return (
    <>
      <SkipLink>{skipLinkLabel}</SkipLink>
      <Header
        serviceName={serviceName}
        homeHref={homeHref}
        homeLabel={homeLabel}
        nav={nav}
        actions={
          <LanguageSwitcher
            label={languageSwitcherLabel}
            languages={languages}
            value={locale}
            onChange={onLocale}
          />
        }
      />
      <main id="main" className={gridStyles.container}>
        <div className={styles.content}>{children}</div>
      </main>
      <Footer groups={footerGroups} copyright={copyright} label={footerLabel} />
    </>
  );
}
