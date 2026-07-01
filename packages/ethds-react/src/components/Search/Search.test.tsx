import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Search } from './Search';

describe('Search', () => {
  it('renders a search landmark with a labelled field', () => {
    render(<Search label="Search services" submitLabel="Search" />);
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search services' })).toBeInTheDocument();
  });

  it('submits the query via onSearch', async () => {
    const onSearch = vi.fn();
    render(<Search label="Search" submitLabel="Search" onSearch={onSearch} />);
    await userEvent.type(screen.getByRole('searchbox'), 'passport');
    await userEvent.click(screen.getByRole('button', { name: /Search/ }));
    expect(onSearch).toHaveBeenCalledWith('passport');
  });

  it('submits on Enter', async () => {
    const onSearch = vi.fn();
    render(<Search label="Search" submitLabel="Search" onSearch={onSearch} />);
    await userEvent.type(screen.getByRole('searchbox'), 'tax{Enter}');
    expect(onSearch).toHaveBeenCalledWith('tax');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Search label="Search services" submitLabel="Search" placeholder="e.g. renew licence" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
