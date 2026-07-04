import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { MinistryHomepage } from './MinistryHomepage';

const languages = [{ code: 'en', label: 'English' }];
const services = [
  { href: '/file-return', label: 'File a tax return' },
  { href: '/pay-fee', label: 'Pay a fee' },
];
const news = [{ href: '/news/1', label: 'New filing deadline announced' }];

function renderPage(overrides = {}) {
  return render(
    <MinistryHomepage
      ministryName="Ministry of Revenue"
      intro="Collects taxes and administers revenue policy for Ethiopia."
      languages={languages}
      locale="en"
      onLocale={() => {}}
      services={services}
      news={news}
      {...overrides}
    />,
  );
}

describe('MinistryHomepage', () => {
  it('names the ministry in a breadcrumb back to the national portal and as the h1', () => {
    renderPage();
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toHaveTextContent('Home');
    expect(nav).toHaveTextContent('Ministry of Revenue');
    expect(screen.getByRole('heading', { level: 1, name: 'Ministry of Revenue' })).toBeInTheDocument();
  });

  it('shows the intro and lists services and news as real links', () => {
    renderPage();
    expect(
      screen.getByText('Collects taxes and administers revenue policy for Ethiopia.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'File a tax return' })).toHaveAttribute('href', '/file-return');
    expect(screen.getByRole('link', { name: 'New filing deadline announced' })).toHaveAttribute(
      'href',
      '/news/1',
    );
  });

  it('calls onSearch with the entered query', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    renderPage({ onSearch });
    await user.type(screen.getByLabelText('Search this ministry'), 'deadline');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalledWith('deadline');
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
