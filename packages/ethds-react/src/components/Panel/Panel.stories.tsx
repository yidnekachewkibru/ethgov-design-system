import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from './Panel';

const meta: Meta<typeof Panel> = {
  title: 'Components/Panel',
  component: Panel,
  args: {
    title: 'Application complete',
    reference: 'Your reference: ETH-2026-00412',
    children: 'Keep this reference to track your application.',
  },
};
export default meta;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {};
export const PaymentReceipt: Story = {
  args: {
    title: 'Payment successful',
    reference: 'Receipt: RCP-2026-004112',
    children: 'We have also sent the receipt by SMS.',
  },
};
