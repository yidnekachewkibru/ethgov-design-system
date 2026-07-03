import type { Meta, StoryObj } from '@storybook/react';
import { Details } from './Details';

const meta: Meta<typeof Details> = {
  title: 'Components/Details',
  component: Details,
  args: {
    summary: 'Why do we ask for your Fayda ID?',
    children:
      'We use your Fayda national ID to confirm your identity and pre-fill your details from the national registry, so you do not have to re-enter them.',
  },
};
export default meta;

type Story = StoryObj<typeof Details>;

export const Default: Story = {};

export const OpenByDefault: Story = {
  args: { open: true },
};
