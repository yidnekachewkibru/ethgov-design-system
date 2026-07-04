import type { Meta, StoryObj } from '@storybook/react';
import { MinistryHomepage } from './MinistryHomepage';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
];

const meta: Meta<typeof MinistryHomepage> = {
  title: 'Templates/MinistryHomepage',
  component: MinistryHomepage,
  parameters: { layout: 'fullscreen' },
  args: {
    ministryName: 'Ministry of Revenue',
    intro: 'Collects taxes and administers revenue policy for Ethiopia.',
    languages,
    locale: 'en',
    onLocale: () => {},
    services: [
      { href: '/file-return', label: 'File a tax return' },
      { href: '/pay-fee', label: 'Pay a fee' },
      { href: '/register-business', label: 'Register a business' },
    ],
    news: [
      { href: '/news/1', label: 'New filing deadline announced' },
      { href: '/news/2', label: 'Office hours extended for tax season' },
    ],
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof MinistryHomepage>;

export const Default: Story = {};
