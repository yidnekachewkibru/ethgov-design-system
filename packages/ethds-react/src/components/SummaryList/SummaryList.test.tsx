import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { SummaryList } from './SummaryList';

const rows = [
  {
    key: 'Given name',
    value: 'Abebe',
    action: { label: 'Change', href: '#given-name', visuallyHiddenText: 'given name' },
  },
  {
    key: "Father's name",
    value: 'Kebede',
    action: { label: 'Change', href: '#fathers-name', visuallyHiddenText: "father's name" },
  },
  { key: 'Region', value: 'Oromia' },
];

describe('SummaryList', () => {
  it('renders a definition list of label/value rows', () => {
    render(<SummaryList rows={rows} />);
    expect(screen.getByText('Given name').tagName).toBe('DT');
    expect(screen.getByText('Abebe').tagName).toBe('DD');
  });

  it('gives change links an accessible name including the field', () => {
    render(<SummaryList rows={rows} />);
    expect(screen.getByRole('link', { name: 'Change given name' })).toHaveAttribute(
      'href',
      '#given-name',
    );
  });

  it('omits the action cell content when no action is given', () => {
    render(<SummaryList rows={rows} />);
    expect(screen.getAllByRole('link')).toHaveLength(2); // only 2 of 3 rows have actions
  });

  it('has no axe violations', async () => {
    const { container } = render(<SummaryList rows={rows} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
