import type { Meta, StoryObj } from '@storybook/react';
import { ComplaintForm } from './ComplaintForm';

const meta: Meta<typeof ComplaintForm> = {
  title: 'Patterns/ComplaintSubmission',
  component: ComplaintForm,
  args: { onSubmit: async () => {} },
};
export default meta;

type Story = StoryObj<typeof ComplaintForm>;

export const Default: Story = {};

export const SubmitFailed: Story = {
  args: {
    onSubmit: async () => {
      throw new Error('network error');
    },
  },
};
