import type { Meta, StoryObj } from '@storybook/react';
import { ServiceApplicationPage } from './ServiceApplicationPage';

const meta: Meta<typeof ServiceApplicationPage> = {
  title: 'Templates/ServiceApplicationPage',
  component: ServiceApplicationPage,
  parameters: { layout: 'fullscreen' },
  args: {
    serviceName: 'Trade Ministry',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'am', label: 'አማርኛ' },
    ],
    locale: 'en',
    onLocale: () => {},
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Apply for a business licence' },
    ],
    footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
    copyright: '© 2026 Government of Ethiopia.',
    onSubmit: async () => ({ reference: 'ETH-2026-00412' }),
  },
};
export default meta;

type Story = StoryObj<typeof ServiceApplicationPage>;

export const Default: Story = {};

export const FailedSubmission: Story = {
  args: {
    onSubmit: async () => {
      throw new Error('network error');
    },
  },
};
