import type { Meta, StoryObj } from '@storybook/react';
import { CookieBanner } from './CookieBanner';

const meta: Meta<typeof CookieBanner> = {
  title: 'Components/CookieBanner',
  component: CookieBanner,
  args: {
    title: 'Cookies on this service',
    children: 'We use some essential cookies to make this service work, and optional cookies to understand how it is used.',
    acceptLabel: 'Accept additional cookies',
    rejectLabel: 'Reject additional cookies',
    viewCookiesLabel: 'View cookies',
  },
};
export default meta;

type Story = StoryObj<typeof CookieBanner>;

export const Default: Story = {
  args: {
    onAccept: () => {},
    onReject: () => {},
    onViewCookies: () => {},
  },
};
