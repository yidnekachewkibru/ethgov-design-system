import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ServiceLandingPage } from './ServiceLandingPage';

const languages = [{ code: 'en', label: 'English' }];
const breadcrumb = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Apply for a passport' },
];

function renderPage(overrides = {}) {
  return render(
    <ServiceLandingPage
      serviceName="Immigration Service"
      languages={languages}
      locale="en"
      onLocale={() => {}}
      breadcrumb={breadcrumb}
      heading="Apply for a passport"
      summary="Who this service is for and what it does, in plain language."
      onStart={() => {}}
      requirements={['Your Fayda (national ID) number', 'A recent photo', 'Payment of ETB 350.00']}
      {...overrides}
    />,
  );
}

describe('ServiceLandingPage', () => {
  it('renders one h1, breadcrumb, and the standard chrome', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Apply for a passport' })).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toHaveTextContent('Services');
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('lists what the citizen needs before starting', () => {
    renderPage();
    expect(screen.getByText('Your Fayda (national ID) number')).toBeInTheDocument();
    expect(screen.getByText('Payment of ETB 350.00')).toBeInTheDocument();
  });

  it('calls onStart when the primary action is activated', async () => {
    const user = userEvent.setup();
    const onStart = vi.fn();
    renderPage({ onStart });
    await user.click(screen.getByRole('button', { name: 'Start now' }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
