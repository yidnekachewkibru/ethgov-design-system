import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { AgencyHomepage } from './AgencyHomepage';

const languages = [{ code: 'en', label: 'English' }];
const primaryTasks = [
  { href: '/apply-passport', label: 'Apply for a passport' },
  { href: '/check-status', label: 'Check your application' },
];
const services = [{ href: '/all', label: 'All immigration services' }];
const notices = [{ href: '/notices/1', label: 'Office closed for Ethiopian New Year' }];

function renderPage(overrides = {}) {
  return render(
    <AgencyHomepage
      agencyName="Immigration Service"
      intro="Apply for and manage passports and visas."
      languages={languages}
      locale="en"
      onLocale={() => {}}
      primaryTasks={primaryTasks}
      services={services}
      notices={notices}
      {...overrides}
    />,
  );
}

describe('AgencyHomepage', () => {
  it('names the agency in a breadcrumb and as the h1', () => {
    renderPage();
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toHaveTextContent('Home');
    expect(nav).toHaveTextContent('Immigration Service');
    expect(screen.getByRole('heading', { level: 1, name: 'Immigration Service' })).toBeInTheDocument();
  });

  it('foregrounds primary tasks as cards and lists services/notices', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Apply for a passport' })).toHaveAttribute(
      'href',
      '/apply-passport',
    );
    expect(screen.getByRole('link', { name: 'All immigration services' })).toHaveAttribute('href', '/all');
    expect(screen.getByRole('link', { name: 'Office closed for Ethiopian New Year' })).toHaveAttribute(
      'href',
      '/notices/1',
    );
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
