import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ServiceApplicationPage } from './ServiceApplicationPage';

const languages = [{ code: 'en', label: 'English' }];
const breadcrumb = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Apply for a business licence' },
];

function renderPage(overrides = {}) {
  return render(
    <ServiceApplicationPage
      serviceName="Trade Ministry"
      languages={languages}
      locale="en"
      onLocale={() => {}}
      breadcrumb={breadcrumb}
      onSubmit={vi.fn().mockResolvedValue({ reference: 'ETH-2026-00412' })}
      {...overrides}
    />,
  );
}

describe('ServiceApplicationPage', () => {
  it('renders the standard chrome, breadcrumb, and the flow’s own single h1', () => {
    renderPage();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toHaveTextContent('Services');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Apply for a business licence' })).toBeInTheDocument();
  });

  it('advances from step 1 to step 2 of the hosted Application Submission flow', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText('Given name', { exact: false }), 'Abebe');
    await user.type(screen.getByLabelText(/^Father's name/), 'Kebede');
    await user.type(screen.getByLabelText('Phone number', { exact: false }), '0911234567');
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByText('Step 2 of 4: Business details')).toBeInTheDocument();
  });

  it('passes initialData through so a returning applicant is not re-asked for known data', () => {
    renderPage({ initialData: { givenName: 'Abebe' } });
    expect(screen.getByLabelText('Given name', { exact: false })).toHaveValue('Abebe');
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
