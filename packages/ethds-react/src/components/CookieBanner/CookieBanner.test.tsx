import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { CookieBanner } from './CookieBanner';

describe('CookieBanner', () => {
  it('renders as a labelled, focusable region and receives focus on mount', () => {
    render(
      <CookieBanner
        title="Cookies on this service"
        acceptLabel="Accept cookies"
        rejectLabel="Reject cookies"
        onAccept={() => {}}
        onReject={() => {}}
      >
        We use cookies to remember your settings.
      </CookieBanner>,
    );
    const region = screen.getByRole('region', { name: 'Cookies on this service' });
    expect(region).toHaveFocus();
  });

  it('calls onAccept / onReject', async () => {
    const user = userEvent.setup();
    const onAccept = vi.fn();
    const onReject = vi.fn();
    render(
      <CookieBanner
        title="Cookies on this service"
        acceptLabel="Accept cookies"
        rejectLabel="Reject cookies"
        onAccept={onAccept}
        onReject={onReject}
      >
        We use cookies.
      </CookieBanner>,
    );
    await user.click(screen.getByRole('button', { name: 'Accept cookies' }));
    expect(onAccept).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole('button', { name: 'Reject cookies' }));
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <CookieBanner
        title="Cookies on this service"
        acceptLabel="Accept cookies"
        rejectLabel="Reject cookies"
        viewCookiesLabel="View cookies"
        onAccept={() => {}}
        onReject={() => {}}
        onViewCookies={() => {}}
      >
        We use cookies to remember your settings.
      </CookieBanner>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
