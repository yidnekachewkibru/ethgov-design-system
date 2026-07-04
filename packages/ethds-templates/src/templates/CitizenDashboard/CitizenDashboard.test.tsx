import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { CitizenDashboard } from './CitizenDashboard';

const languages = [{ code: 'en', label: 'English' }];
const applications = [
  { id: 'ETH-2026-0041', href: '/apps/ETH-2026-0041', service: 'Passport', status: 'Approved' },
  { id: 'ETH-2026-0042', href: '/apps/ETH-2026-0042', service: 'Business permit', status: 'Pending' },
];
const appointments = [{ href: '/appointments/1', label: 'Bole office, Meskerem 5, 2019 EC' }];
const payments = [{ href: '/receipts/1', label: 'ETB 350.00 receipt' }];

function renderPage(overrides = {}) {
  return render(
    <CitizenDashboard
      name="Abebe"
      actionNeeded={false}
      applications={applications}
      appointments={appointments}
      payments={payments}
      onStartNew={() => {}}
      languages={languages}
      locale="en"
      onLocale={() => {}}
      {...overrides}
    />,
  );
}

describe('CitizenDashboard', () => {
  it('greets the citizen by name in a single h1', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome back, Abebe');
  });

  it('surfaces the action-needed notification before the records, when present', () => {
    renderPage({ actionNeeded: true });
    expect(screen.getByRole('status')).toHaveTextContent('You have 1 item that needs your attention.');
  });

  it('does not show a notification when nothing needs the citizen s action', () => {
    renderPage({ actionNeeded: false });
    expect(screen.queryByText(/needs your attention/)).not.toBeInTheDocument();
  });

  it('lists applications in a captioned table with a link per row', () => {
    renderPage();
    expect(screen.getByRole('table', { name: 'Your applications' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ETH-2026-0041' })).toHaveAttribute(
      'href',
      '/apps/ETH-2026-0041',
    );
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('lists appointments and payments as real links', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Bole office, Meskerem 5, 2019 EC' })).toHaveAttribute(
      'href',
      '/appointments/1',
    );
    expect(screen.getByRole('link', { name: 'ETB 350.00 receipt' })).toHaveAttribute(
      'href',
      '/receipts/1',
    );
  });

  it('calls onStartNew when the primary action is activated', async () => {
    const user = userEvent.setup();
    const onStartNew = vi.fn();
    renderPage({ onStartNew });
    await user.click(screen.getByRole('button', { name: 'Start a new application' }));
    expect(onStartNew).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
