import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { StatusView } from './StatusView';

const timeline = [
  { label: 'Submitted', date: '01 Meskerem 2019 EC' },
  { label: 'Under review', date: '03 Meskerem 2019 EC' },
  { label: 'Approved', date: '09 Meskerem 2019 EC' },
];

describe('StatusView', () => {
  it('renders the reference in the heading and the status as text', () => {
    render(
      <StatusView
        reference="ETH-2026-0041"
        statusText="Approved — ready for pickup"
        detail="Collect at your woreda office."
        timeline={timeline}
      />,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Application ETH-2026-0041');
    expect(screen.getByText('Approved — ready for pickup')).toBeInTheDocument();
    expect(screen.getByText('Collect at your woreda office.')).toBeInTheDocument();
  });

  it('renders the timeline as an ordered list with every step', () => {
    render(
      <StatusView
        reference="ETH-2026-0041"
        statusText="Approved"
        detail="Collect at your woreda office."
        timeline={timeline}
      />,
    );
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('01 Meskerem 2019 EC', { exact: false })).toBeInTheDocument();
  });

  it('conveys status by text and a labelled icon, not colour alone, and reflects the variant', () => {
    render(
      <StatusView
        reference="ETH-2026-0041"
        statusText="Rejected — see details below"
        detail="You can appeal this decision."
        timeline={timeline}
        variant="error"
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Rejected — see details below');
    expect(screen.getByRole('img', { name: 'Rejected — see details below' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <StatusView
        reference="ETH-2026-0041"
        statusText="Approved — ready for pickup"
        detail="Collect at your woreda office."
        timeline={timeline}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
