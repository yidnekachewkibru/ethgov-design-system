import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ContactPage } from './ContactPage';

const languages = [{ code: 'en', label: 'English' }];
const breadcrumb = [{ label: 'Home', href: '/' }, { label: 'Contact' }];

function renderPage(overrides = {}) {
  const onSend = vi.fn().mockResolvedValue(undefined);
  const utils = render(
    <ContactPage
      serviceName="Ministry of Revenue"
      languages={languages}
      locale="en"
      onLocale={() => {}}
      breadcrumb={breadcrumb}
      phone={{ href: 'tel:+251111234567', label: '+251 11 123 4567' }}
      email={{ href: 'mailto:info@revenue.gov.et', label: 'info@revenue.gov.et' }}
      hours="Monday–Friday, 08:30–17:00 EAT"
      office="Addis Ababa, Kirkos sub-city"
      onSend={onSend}
      {...overrides}
    />,
  );
  return { onSend, ...utils };
}

describe('ContactPage', () => {
  it('renders one h1, breadcrumb, and tel:/mailto: links', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Contact us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '+251 11 123 4567' })).toHaveAttribute(
      'href',
      'tel:+251111234567',
    );
    expect(screen.getByRole('link', { name: 'info@revenue.gov.et' })).toHaveAttribute(
      'href',
      'mailto:info@revenue.gov.et',
    );
    expect(screen.getByText('Monday–Friday, 08:30–17:00 EAT')).toBeInTheDocument();
  });

  it('requires a name and a message, but not a phone number', async () => {
    const user = userEvent.setup();
    const { onSend } = renderPage();

    await user.click(screen.getByRole('button', { name: 'Send message' }));
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Enter your name.');
    expect(alert).toHaveTextContent('Enter your message.');
    expect(onSend).not.toHaveBeenCalled();
  });

  it('sends the name, phone, and message', async () => {
    const user = userEvent.setup();
    const { onSend } = renderPage();

    await user.type(screen.getByLabelText('Your name', { exact: false }), 'Abebe Kebede');
    await user.type(screen.getByLabelText('Phone', { exact: false }), '0911234567');
    await user.type(screen.getByLabelText('Message', { exact: false }), 'When does the office open?');
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(onSend).toHaveBeenCalledWith({
      name: 'Abebe Kebede',
      phone: '0911234567',
      message: 'When does the office open?',
    });
  });

  it('keeps the written message and offers retry when sending fails', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn().mockRejectedValueOnce(new Error('network error'));
    renderPage({ onSend });

    await user.type(screen.getByLabelText('Your name', { exact: false }), 'Abebe Kebede');
    await user.type(screen.getByLabelText('Message', { exact: false }), 'A long question about fees.');
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(await screen.findByText(/went wrong/)).toBeInTheDocument();
    expect(screen.getByLabelText('Message', { exact: false })).toHaveValue('A long question about fees.');
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Accessibility', href: '/accessibility' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
