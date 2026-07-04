import type { Meta, StoryObj } from '@storybook/react';
import { StatusView } from './StatusView';

const meta: Meta<typeof StatusView> = {
  title: 'Patterns/StatusTracking',
  component: StatusView,
  args: {
    reference: 'ETH-2026-0041',
    statusText: 'Approved — ready for pickup',
    detail: 'Collect at your woreda office.',
    timeline: [
      { label: 'Submitted', date: '01 Meskerem 2019 EC' },
      { label: 'Under review', date: '03 Meskerem 2019 EC' },
      { label: 'Approved', date: '09 Meskerem 2019 EC' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof StatusView>;

export const Approved: Story = {};

export const Rejected: Story = {
  args: {
    statusText: 'Rejected — see details below',
    detail: 'You can appeal this decision within 30 days.',
    variant: 'error',
  },
};

export const InReview: Story = {
  args: {
    statusText: 'Under review',
    detail: "We'll notify you once a decision is made.",
    variant: 'info',
    timeline: [{ label: 'Submitted', date: '01 Meskerem 2019 EC' }],
  },
};
