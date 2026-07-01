import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Notification } from './Notification';

describe('Notification', () => {
  it('announces as a status by default', () => {
    render(
      <Notification variant="success" iconLabel="Success">
        Saved.
      </Notification>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Saved.');
  });

  it('announces errors assertively', () => {
    render(
      <Notification variant="error" iconLabel="Error">
        Something went wrong.
      </Notification>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders a dismiss button with an accessible label and fires onDismiss', async () => {
    const onDismiss = vi.fn();
    render(
      <Notification variant="info" iconLabel="Information" dismissLabel="Dismiss" onDismiss={onDismiss}>
        FYI.
      </Notification>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Notification variant="warning" iconLabel="Warning" title="Notice" dismissLabel="Dismiss">
        Offices close early today.
      </Notification>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
