import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Breadcrumb } from './Breadcrumb';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Renew licence' },
];

describe('Breadcrumb', () => {
  it('renders a labelled navigation landmark', () => {
    render(<Breadcrumb items={items} label="Breadcrumb" />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('links all but the last item', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Renew licence' })).not.toBeInTheDocument();
  });

  it('marks the last item as the current page', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Renew licence')).toHaveAttribute('aria-current', 'page');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Breadcrumb items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
