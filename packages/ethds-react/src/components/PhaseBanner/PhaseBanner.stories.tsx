import type { Meta, StoryObj } from '@storybook/react';
import { PhaseBanner } from './PhaseBanner';

const meta: Meta<typeof PhaseBanner> = {
  title: 'Components/PhaseBanner',
  component: PhaseBanner,
  args: {
    phase: 'beta',
    phaseLabel: 'Beta',
    children: 'This is a new service — your feedback will help us to improve it.',
  },
};
export default meta;

type Story = StoryObj<typeof PhaseBanner>;

export const Beta: Story = {};

export const Alpha: Story = {
  args: { phase: 'alpha', phaseLabel: 'Alpha' },
};
