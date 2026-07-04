import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { PasswordResetFlow } from './PasswordResetFlow';

function renderFlow(overrides: Partial<Parameters<typeof PasswordResetFlow>[0]> = {}) {
  const onRequestReset = vi.fn().mockResolvedValue(undefined);
  const onVerifyCode = vi.fn().mockResolvedValue(undefined);
  const onSubmit = vi.fn().mockResolvedValue({ reference: 'n/a' });
  render(
    <PasswordResetFlow
      onRequestReset={onRequestReset}
      onVerifyCode={onVerifyCode}
      onSubmit={onSubmit}
      {...overrides}
    />,
  );
  return { onRequestReset, onVerifyCode, onSubmit };
}

async function goToOtpStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Phone number or email', { exact: false }), '0911234567');
  await user.click(screen.getByRole('button', { name: 'Send code' }));
  await screen.findByRole('heading', { name: 'Enter the code we sent' });
}

async function goToSetPasswordStep(user: ReturnType<typeof userEvent.setup>) {
  await goToOtpStep(user);
  await user.type(screen.getByLabelText('Code', { exact: false }), '123456');
  await user.click(screen.getByRole('button', { name: 'Verify' }));
  await screen.findByRole('heading', { name: 'Set a new password' });
}

describe('PasswordResetFlow', () => {
  it('starts on the request-reset step', () => {
    renderFlow();
    expect(screen.getByRole('heading', { name: 'Reset your password' })).toBeInTheDocument();
  });

  it('advances request -> OTP -> set password -> confirmation, submitting the accumulated data', async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderFlow();

    await goToSetPasswordStep(user);
    await user.type(screen.getByLabelText('New password', { exact: false }), 'correct-horse-battery');
    await user.click(screen.getByRole('button', { name: 'Save password' }));

    expect(await screen.findByText('Password changed')).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith({
      identifier: '0911234567',
      code: '123456',
      newPassword: 'correct-horse-battery',
    });
  });

  it('never reveals whether the account exists, even if the request itself fails', async () => {
    const user = userEvent.setup();
    const onRequestReset = vi.fn().mockRejectedValueOnce(new Error('network down'));
    renderFlow({ onRequestReset });

    await user.type(screen.getByLabelText('Phone number or email', { exact: false }), '0911234567');
    await user.click(screen.getByRole('button', { name: 'Send code' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong sending the code');
    expect(screen.getByRole('heading', { name: 'Reset your password' })).toBeInTheDocument();
  });

  it('keeps the citizen on the OTP step and shows an error for a wrong code', async () => {
    const user = userEvent.setup();
    const onVerifyCode = vi.fn().mockRejectedValueOnce(new Error('bad code'));
    renderFlow({ onVerifyCode });

    await goToOtpStep(user);
    await user.type(screen.getByLabelText('Code', { exact: false }), '000000');
    await user.click(screen.getByRole('button', { name: 'Verify' }));

    expect(await screen.findByText(/incorrect or has expired/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Enter the code we sent' })).toBeInTheDocument();
  });

  it('rejects a new password shorter than 8 characters', async () => {
    const user = userEvent.setup();
    renderFlow();
    await goToSetPasswordStep(user);

    await user.type(screen.getByLabelText('New password', { exact: false }), 'short');
    await user.click(screen.getByRole('button', { name: 'Save password' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('at least 8 characters');
    expect(screen.getByRole('heading', { name: 'Set a new password' })).toBeInTheDocument();
  });

  it('toggles the new-password field between hidden and visible', async () => {
    const user = userEvent.setup();
    renderFlow();
    await goToSetPasswordStep(user);

    const field = screen.getByLabelText('New password', { exact: false });
    expect(field).toHaveAttribute('type', 'password');
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(field).toHaveAttribute('type', 'text');
    await user.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(field).toHaveAttribute('type', 'password');
  });

  it('keeps entered data and offers retry when the final submit fails', async () => {
    const user = userEvent.setup();
    let attempt = 0;
    const onSubmit = vi.fn(async () => {
      attempt += 1;
      if (attempt === 1) throw new Error('network error');
      return { reference: 'n/a' };
    });
    renderFlow({ onSubmit });
    await goToSetPasswordStep(user);
    await user.type(screen.getByLabelText('New password', { exact: false }), 'correct-horse-battery');
    await user.click(screen.getByRole('button', { name: 'Save password' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/went wrong/);
    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByText('Password changed')).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });

  it('has no axe violations on the request-reset step', async () => {
    const { container } = render(
      <PasswordResetFlow
        onRequestReset={vi.fn().mockResolvedValue(undefined)}
        onVerifyCode={vi.fn().mockResolvedValue(undefined)}
        onSubmit={vi.fn().mockResolvedValue({ reference: 'n/a' })}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations on the confirmation screen', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PasswordResetFlow
        onRequestReset={vi.fn().mockResolvedValue(undefined)}
        onVerifyCode={vi.fn().mockResolvedValue(undefined)}
        onSubmit={vi.fn().mockResolvedValue({ reference: 'n/a' })}
      />,
    );
    await goToSetPasswordStep(user);
    await user.type(screen.getByLabelText('New password', { exact: false }), 'correct-horse-battery');
    await user.click(screen.getByRole('button', { name: 'Save password' }));
    await screen.findByText('Password changed');

    expect(await axe(container)).toHaveNoViolations();
  });
});
