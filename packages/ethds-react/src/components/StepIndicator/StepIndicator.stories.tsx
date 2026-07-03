import type { Meta, StoryObj } from '@storybook/react';
import { StepIndicator } from './StepIndicator';

const meta: Meta<typeof StepIndicator> = {
  title: 'Components/StepIndicator',
  component: StepIndicator,
  args: {
    steps: ['Applicant', 'Details', 'Documents', 'Review'],
    current: 2,
    label: 'Application progress',
  },
};
export default meta;

type Story = StoryObj<typeof StepIndicator>;

export const Default: Story = {};
export const LastStep: Story = { args: { current: 4 } };
