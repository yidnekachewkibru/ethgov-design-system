import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Table } from './Table';

interface Permit {
  id: string;
  service: string;
  status: string;
}

const rows: Permit[] = [
  { id: 'P-1', service: 'Business licence', status: 'Approved' },
  { id: 'P-2', service: 'Building permit', status: 'Pending' },
];

const columns = [
  { header: 'Reference', cell: (r: Permit) => r.id },
  { header: 'Service', cell: (r: Permit) => r.service },
  { header: 'Status', cell: (r: Permit) => r.status },
];

describe('Table', () => {
  it('renders a table named by its caption with column headers', () => {
    render(
      <Table caption="Your applications" columns={columns} rows={rows} rowKey={(r) => r.id} />,
    );
    expect(screen.getByRole('table', { name: 'Your applications' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Service' })).toBeInTheDocument();
  });

  it('renders a row per data item', () => {
    render(
      <Table caption="Applications" columns={columns} rows={rows} rowKey={(r) => r.id} />,
    );
    // 1 header row + 2 data rows
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('Building permit')).toBeInTheDocument();
  });

  it('shows the empty message when there are no rows', () => {
    render(
      <Table
        caption="Applications"
        columns={columns}
        rows={[]}
        rowKey={(r) => r.id}
        emptyMessage="No applications yet"
      />,
    );
    expect(screen.getByText('No applications yet')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Table caption="Your applications" columns={columns} rows={rows} rowKey={(r) => r.id} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
