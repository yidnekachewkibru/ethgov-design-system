import type { Meta, StoryObj } from '@storybook/react';
import { PaymentReview } from './PaymentReview';

const items = [
  { label: 'Licence fee', santim: 30000 },
  { label: 'Service charge', santim: 5000 },
];

const meta: Meta<typeof PaymentReview> = {
  title: 'Patterns/PaymentFlow',
  component: PaymentReview,
  args: { items, onPay: async () => {} },
};
export default meta;

type Story = StoryObj<typeof PaymentReview>;

export const Default: Story = {};

export const PaymentFailed: Story = {
  args: {
    onPay: async () => {
      throw new Error('provider error');
    },
  },
};
