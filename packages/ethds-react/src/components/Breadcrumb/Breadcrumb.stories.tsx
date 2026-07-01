import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Services', href: '#' },
      { label: 'Renew licence' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};
export const TwoLevels: Story = {
  args: { items: [{ label: 'Home', href: '#' }, { label: 'Contact' }] },
};
