import type { Meta, StoryObj } from '@storybook/react';
import { ServerErrorPage } from './ServerErrorPage';

const meta: Meta<typeof ServerErrorPage> = {
  title: 'Templates/Error/500',
  component: ServerErrorPage,
  args: {
    serviceName: 'Government of Ethiopia',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'am', label: 'አማርኛ' },
    ],
    locale: 'en',
    onLocale: () => {},
    onRetry: () => {},
    footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
    copyright: '© 2026 Government of Ethiopia.',
  },
};
export default meta;

type Story = StoryObj<typeof ServerErrorPage>;

export const Default: Story = {};
