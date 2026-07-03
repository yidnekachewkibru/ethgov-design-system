import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { LoginForm } from './LoginForm';

const props = {
  forgotPasswordHref: '/reset',
  registerHref: '/register',
};

describe('LoginForm', () => {
  it('renders the heading and both fields', () => {
    render(<LoginForm {...props} onSubmit={async () => {}} />);
    expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByLabelText('Phone number or email', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { exact: false })).toHaveAttribute('type', 'password');
  });

  it('submits the entered identifier and password', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<LoginForm {...props} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Phone number or email', { exact: false }), '0911234567');
    await user.type(screen.getByLabelText('Password', { exact: false }), 'correct horse battery staple');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(onSubmit).toHaveBeenCalledWith('0911234567', 'correct horse battery staple');
  });

  it('shows a single generic error on failure — never reveals which field was wrong', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error('invalid password'));
    render(<LoginForm {...props} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Phone number or email', { exact: false }), '0911234567');
    await user.type(screen.getByLabelText('Password', { exact: false }), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('The phone number/email or password is incorrect.');
  });

  it('links to the forgot-password and register routes', () => {
    render(<LoginForm {...props} onSubmit={async () => {}} />);
    expect(screen.getByRole('link', { name: 'Forgot your password?' })).toHaveAttribute('href', '/reset');
    expect(screen.getByRole('link', { name: 'Create an account' })).toHaveAttribute('href', '/register');
  });

  it('shows the OTP login option only when onOtpLogin is provided', () => {
    const { rerender } = render(<LoginForm {...props} onSubmit={async () => {}} />);
    expect(screen.queryByRole('button', { name: 'Log in with a code' })).not.toBeInTheDocument();

    rerender(<LoginForm {...props} onSubmit={async () => {}} onOtpLogin={() => {}} />);
    expect(screen.getByRole('button', { name: 'Log in with a code' })).toBeInTheDocument();
  });

  it('accepts translated labels', () => {
    render(
      <LoginForm
        {...props}
        onSubmit={async () => {}}
        labels={{ heading: 'ግቡ', loginButtonLabel: 'ግባ' }}
      />,
    );
    expect(screen.getByRole('heading', { name: 'ግቡ' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ግባ' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<LoginForm {...props} onSubmit={async () => {}} onOtpLogin={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
