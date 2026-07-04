import type { Meta, StoryObj } from '@storybook/react';
import { NewsArticlePage } from './NewsArticlePage';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
];

const meta: Meta<typeof NewsArticlePage> = {
  title: 'Templates/NewsPage/Article',
  component: NewsArticlePage,
  parameters: { layout: 'fullscreen' },
  args: {
    serviceName: 'Ministry of Revenue',
    languages,
    locale: 'en',
    onLocale: () => {},
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'News', href: '/news' },
      { label: 'New tax filing deadline' },
    ],
    title: 'New tax filing deadline',
    date: 'Meskerem 9, 2019 EC',
    body: <p>The filing deadline has been extended by two weeks to give citizens more time to prepare.</p>,
    newsHref: '/news',
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof NewsArticlePage>;

export const Article: Story = {};
