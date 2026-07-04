import type { Meta, StoryObj } from '@storybook/react';
import { NationalPortalHomepage } from './NationalPortalHomepage';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
];

const meta: Meta<typeof NationalPortalHomepage> = {
  title: 'Templates/NationalPortalHomepage',
  component: NationalPortalHomepage,
  parameters: { layout: 'fullscreen' },
  args: {
    languages,
    locale: 'en',
    onLocale: () => {},
    popularServices: [
      { href: '/renew-id', label: 'Renew ID' },
      { href: '/pay-tax', label: 'Pay tax' },
      { href: '/passport', label: 'Passport' },
      { href: '/business', label: 'Business licence' },
    ],
    categories: [
      { href: '/category/identity', label: 'Identity & civil' },
      { href: '/category/business', label: 'Business & trade' },
      { href: '/category/health', label: 'Health & education' },
    ],
    news: [
      { href: '/news/1', label: 'New office hours starting Meskerem' },
      { href: '/news/2', label: 'Online passport renewal now available' },
    ],
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof NationalPortalHomepage>;

export const Default: Story = {};
