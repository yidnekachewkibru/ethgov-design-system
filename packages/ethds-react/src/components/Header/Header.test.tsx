import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Header } from './Header';

const nav = [
  { label: 'Home', href: '/', current: true },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

describe('Header', () => {
  it('renders a banner with the identity as a home link', () => {
    render(<Header serviceName="Revenue Service" homeHref="/" homeLabel="Revenue Service — home" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Revenue Service — home' })).toHaveAttribute('href', '/');
  });

  it('renders a labelled primary navigation with a current item', () => {
    render(<Header serviceName="Portal" nav={nav} navLabel="Primary" />);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders the actions slot (e.g. language switcher)', () => {
    render(<Header serviceName="Portal" actions={<button type="button">EN</button>} />);
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Header serviceName="Immigration Service" homeLabel="Immigration Service — home" nav={nav} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
