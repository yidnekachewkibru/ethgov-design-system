import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ForbiddenPage } from './ForbiddenPage';

const languages = [{ code: 'en', label: 'English' }];

describe('ForbiddenPage', () => {
  it('renders one h1 and the standard chrome', () => {
    render(
      <ForbiddenPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onLogin={() => {}}
      />,
    );
    expect(
      screen.getByRole('heading', { level: 1, name: "You don't have access to this page" }),
    ).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('leads with a real Log in button', async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    render(
      <ForbiddenPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onLogin={onLogin}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Log in' }));
    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it('does not reveal why access was denied', () => {
    render(
      <ForbiddenPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onLogin={() => {}}
      />,
    );
    expect(screen.queryByText(/permission denied|role|policy|not authorized/i)).not.toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <ForbiddenPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onLogin={() => {}}
        footerGroups={[{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }]}
        copyright="© 2026 Government of Ethiopia."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
