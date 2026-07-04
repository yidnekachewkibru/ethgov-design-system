import type { Meta, StoryObj } from '@storybook/react';
import { ServiceLandingPage } from './ServiceLandingPage';

const meta: Meta<typeof ServiceLandingPage> = {
  title: 'Templates/ServiceLandingPage',
  component: ServiceLandingPage,
  parameters: { layout: 'fullscreen' },
  args: {
    serviceName: 'Immigration Service',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'am', label: 'አማርኛ' },
    ],
    locale: 'en',
    onLocale: () => {},
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Apply for a passport' },
    ],
    heading: 'Apply for a passport',
    summary: 'Who this service is for and what it does, in plain language.',
    onStart: () => {},
    requirements: ['Your Fayda (national ID) number', 'A recent photo', 'Payment of ETB 350.00'],
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof ServiceLandingPage>;

export const Default: Story = {};
