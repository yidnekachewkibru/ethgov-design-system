import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

interface Permit {
  id: string;
  service: string;
  status: string;
  fee: string;
}

const rows: Permit[] = [
  { id: 'ETH-2026-0041', service: 'Business licence renewal', status: 'Approved', fee: 'ETB 350.00' },
  { id: 'ETH-2026-0042', service: 'Building permit', status: 'Pending', fee: 'ETB 1,200.00' },
  { id: 'ETH-2026-0043', service: 'Trade name registration', status: 'Rejected', fee: 'ETB 150.00' },
];

const columns = [
  { header: 'Reference', cell: (r: Permit) => r.id },
  { header: 'Service', cell: (r: Permit) => r.service },
  { header: 'Status', cell: (r: Permit) => r.status },
  { header: 'Fee', cell: (r: Permit) => r.fee, align: 'end' as const },
];

const meta: Meta = { title: 'Components/Table' };
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Table caption="Your applications" columns={columns} rows={rows} rowKey={(r: Permit) => r.id} />
  ),
};

export const Empty: Story = {
  render: () => (
    <Table
      caption="Your applications"
      columns={columns}
      rows={[]}
      rowKey={(r: Permit) => r.id}
      emptyMessage="You have no applications yet."
    />
  ),
};
