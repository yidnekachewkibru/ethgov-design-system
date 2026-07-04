import type { Meta, StoryObj } from '@storybook/react';
import { ApplicationSubmissionFlow } from './ApplicationSubmissionFlow';

const meta: Meta<typeof ApplicationSubmissionFlow> = {
  title: 'Patterns/ApplicationSubmission',
  component: ApplicationSubmissionFlow,
  args: {
    onSubmit: async () => ({ reference: 'ETH-2026-00412' }),
  },
};
export default meta;

type Story = StoryObj<typeof ApplicationSubmissionFlow>;

export const Default: Story = {};

export const FailedSubmission: Story = {
  args: {
    onSubmit: async () => {
      throw new Error('network error');
    },
  },
};
