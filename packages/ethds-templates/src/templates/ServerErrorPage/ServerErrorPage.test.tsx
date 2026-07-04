import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ServerErrorPage } from './ServerErrorPage';

const languages = [{ code: 'en', label: 'English' }];

describe('ServerErrorPage', () => {
  it('renders one h1, a reassurance, and a retry button', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ServerErrorPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onRetry={onRetry}
      />,
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'Sorry, something went wrong' }),
    ).toBeInTheDocument();
    expect(screen.getByText('This is a problem on our side, not yours. Please try again in a few minutes.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('never exposes technical detail (no stack trace / error code language)', () => {
    render(
      <ServerErrorPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onRetry={() => {}}
      />,
    );
    expect(screen.queryByText(/stack trace|exception|null pointer|error code/i)).not.toBeInTheDocument();
  });

  it('links to home and contact', () => {
    render(
      <ServerErrorPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onRetry={() => {}}
        homeHref="/"
        contactHref="/contact"
      />,
    );
    expect(screen.getByRole('link', { name: 'Go to home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'contact us' })).toHaveAttribute('href', '/contact');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <ServerErrorPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onRetry={() => {}}
        footerGroups={[{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }]}
        copyright="© 2026 Government of Ethiopia."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
