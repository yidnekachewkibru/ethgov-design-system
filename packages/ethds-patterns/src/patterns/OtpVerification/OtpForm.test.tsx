import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { OtpForm } from './OtpForm';

describe('OtpForm', () => {
  it('shows the masked destination and a single code field', () => {
    render(<OtpForm maskedTo="09•• ••• •67" onVerify={async () => {}} />);
    expect(screen.getByText('We sent a 6-digit code to 09•• ••• •67.')).toBeInTheDocument();
    expect(screen.getByLabelText('Code', { exact: false })).toHaveAttribute('autocomplete', 'one-time-code');
    expect(screen.getByLabelText('Code', { exact: false })).toHaveAttribute('inputmode', 'numeric');
  });

  it('trims pasted spaces before verifying', async () => {
    const user = userEvent.setup();
    const onVerify = vi.fn().mockResolvedValue(undefined);
    render(<OtpForm maskedTo="09•• ••• •67" onVerify={onVerify} />);

    await user.type(screen.getByLabelText('Code', { exact: false }), '123 456');
    await user.click(screen.getByRole('button', { name: 'Verify' }));

    expect(onVerify).toHaveBeenCalledWith('123456');
  });

  it('shows a focusable error alert and marks the field invalid on failure', async () => {
    const user = userEvent.setup();
    const onVerify = vi.fn().mockRejectedValue(new Error('expired'));
    render(<OtpForm maskedTo="09•• ••• •67" onVerify={onVerify} />);

    await user.type(screen.getByLabelText('Code', { exact: false }), '000000');
    await user.click(screen.getByRole('button', { name: 'Verify' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('That code is incorrect or has expired');
    expect(screen.getByLabelText('Code', { exact: false })).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows a resend cooldown when set, and a resend control once it elapses', () => {
    const { rerender } = render(
      <OtpForm maskedTo="09•• ••• •67" onVerify={async () => {}} resendCooldownSeconds={28} onResend={() => {}} />,
    );
    expect(screen.getByText('Resend in 0:28')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Resend code' })).not.toBeInTheDocument();

    rerender(
      <OtpForm maskedTo="09•• ••• •67" onVerify={async () => {}} resendCooldownSeconds={0} onResend={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'Resend code' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <OtpForm maskedTo="09•• ••• •67" onVerify={async () => {}} changeNumberHref="/change" onResend={() => {}} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
