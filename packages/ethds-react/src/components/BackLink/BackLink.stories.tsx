import type { Meta, StoryObj } from '@storybook/react';
import { BackLink } from './BackLink';

const meta: Meta<typeof BackLink> = {
  title: 'Components/BackLink',
  component: BackLink,
  args: { href: '#', children: 'Back' },
};
export default meta;

type Story = StoryObj<typeof BackLink>;

export const Default: Story = {};
