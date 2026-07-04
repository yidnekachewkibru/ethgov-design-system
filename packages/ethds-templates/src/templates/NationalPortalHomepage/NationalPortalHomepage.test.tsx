import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { NationalPortalHomepage } from './NationalPortalHomepage';

const languages = [{ code: 'en', label: 'English' }];
const popularServices = [
  { href: '/renew-id', label: 'Renew ID' },
  { href: '/pay-tax', label: 'Pay tax' },
];
const categories = [{ href: '/category/identity', label: 'Identity & civil' }];
const news = [{ href: '/news/1', label: 'Notice about office hours' }];

function renderPage(overrides = {}) {
  return render(
    <NationalPortalHomepage
      languages={languages}
      locale="en"
      onLocale={() => {}}
      popularServices={popularServices}
      categories={categories}
      news={news}
      {...overrides}
    />,
  );
}

describe('NationalPortalHomepage', () => {
  it('renders one h1, the standard chrome, and search', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Government services, in one place' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('lists popular services, categories, and news as real links', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Renew ID' })).toHaveAttribute('href', '/renew-id');
    expect(screen.getByRole('link', { name: 'Identity & civil' })).toHaveAttribute(
      'href',
      '/category/identity',
    );
    expect(screen.getByRole('link', { name: 'Notice about office hours' })).toHaveAttribute(
      'href',
      '/news/1',
    );
  });

  it('calls onSearch with the entered query', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    renderPage({ onSearch });
    await user.type(screen.getByLabelText('Search government services'), 'passport');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalledWith('passport');
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
