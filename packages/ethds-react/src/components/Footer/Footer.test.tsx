import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Footer } from './Footer';

const groups = [
  {
    title: 'Services',
    links: [
      { label: 'All services', href: '/services' },
      { label: 'Track application', href: '/track' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
];

describe('Footer', () => {
  it('renders a contentinfo landmark', () => {
    render(<Footer groups={groups} copyright="© 2026 Government of Ethiopia" />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders grouped link navigations with headings', () => {
    render(<Footer groups={groups} />);
    expect(screen.getByRole('navigation', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Accessibility' })).toHaveAttribute('href', '/accessibility');
  });

  it('renders the copyright line', () => {
    render(<Footer copyright="© 2026 Government of Ethiopia" />);
    expect(screen.getByText('© 2026 Government of Ethiopia')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Footer groups={groups} copyright="© 2026 Government of Ethiopia. MIT licensed." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
