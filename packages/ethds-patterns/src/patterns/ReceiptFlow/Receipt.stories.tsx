import type { Meta, StoryObj } from '@storybook/react';
import { Receipt } from './Receipt';

const items = [
  { label: 'Licence fee', santim: 30000 },
  { label: 'Service charge', santim: 5000 },
];

const meta: Meta<typeof Receipt> = {
  title: 'Patterns/ReceiptFlow',
  component: Receipt,
  args: {
    reference: 'RCP-2026-004112',
    date: 'Meskerem 9, 2019 EC',
    method: 'Telebirr',
    items,
    onDownload: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof Receipt>;

export const Default: Story = {};
