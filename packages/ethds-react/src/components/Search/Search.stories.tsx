import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  args: {
    label: 'Search government services',
    submitLabel: 'Search',
    placeholder: 'e.g. renew driving licence',
  },
};
export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {};
