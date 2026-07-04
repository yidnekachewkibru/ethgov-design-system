import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ETHDS',
  tagline: 'Ethiopian Government Design System',
  favicon: 'img/favicon.svg',

  // GitHub Pages project-site deployment.
  url: 'https://yidnekachewkibru.github.io',
  baseUrl: '/ethgov-design-system/',
  organizationName: 'yidnekachewkibru',
  projectName: 'ethgov-design-system',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Multilingual by default: all six ETHDS languages are selectable.
  // English is authored; other locales fall back to English until
  // translations are contributed (see docs/localization, Phase 6).
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'am', 'om', 'ti', 'so', 'aa'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr', htmlLang: 'en' },
      am: { label: 'አማርኛ', direction: 'ltr', htmlLang: 'am' },
      om: { label: 'Afaan Oromoo', direction: 'ltr', htmlLang: 'om' },
      ti: { label: 'ትግርኛ', direction: 'ltr', htmlLang: 'ti' },
      so: { label: 'Soomaali', direction: 'ltr', htmlLang: 'so' },
      aa: { label: 'Qafar', direction: 'ltr', htmlLang: 'aa' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/packages/ethds-docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      { name: 'description', content: 'Ethiopian Government Design System — accessible, multilingual, open.' },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ETHDS',
      logo: { alt: 'ETHDS', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Documentation' },
        { type: 'localeDropdown', position: 'right' },
        {
          href: 'https://github.com/yidnekachewkibru/ethgov-design-system',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Design Principles', to: '/docs/principles' },
            { label: 'Brand System', to: '/docs/brand' },
            { label: 'Components', to: '/docs/components' },
            { label: 'Patterns', to: '/docs/patterns' },
            { label: 'Templates', to: '/docs/templates' },
            { label: 'Accessibility', to: '/docs/accessibility' },
            { label: 'Localization', to: '/docs/localization' },
            { label: 'Governance', to: '/docs/governance' },
          ],
        },
        {
          title: 'Project',
          items: [
            { label: 'GitHub', href: 'https://github.com/yidnekachewkibru/ethgov-design-system' },
            { label: 'Contributing', to: '/docs/contributing' },
          ],
        },
      ],
      copyright: `ETHDS — Ethiopian Government Design System. MIT licensed. Built ${new Date().getFullYear()}.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        language: ['en'],
      },
    ],
  ],
};

export default config;
