import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Alert } from './Alert';

describe('Alert', () => {
  it('uses role="alert" for errors (assertive)', () => {
    render(
      <Alert variant="error" iconLabel="Error">
        Payment failed.
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Payment failed.');
  });

  it('uses role="status" for non-error variants', () => {
    render(
      <Alert variant="success" iconLabel="Success">
        Application submitted.
      </Alert>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Application submitted.');
  });

  it('renders a title and body', () => {
    render(
      <Alert variant="info" title="Heads up" iconLabel="Information">
        Offices close early on holidays.
      </Alert>,
    );
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Offices close early on holidays.')).toBeInTheDocument();
  });

  it('conveys meaning by text + labelled icon, not colour alone', () => {
    render(
      <Alert variant="error" iconLabel="Error">
        Invalid TIN.
      </Alert>,
    );
    // Labelled icon is exposed with an accessible name
    expect(screen.getByRole('img', { name: 'Error' })).toBeInTheDocument();
  });

  it('has no axe violations across variants', async () => {
    const { container } = render(
      <div>
        <Alert variant="info" iconLabel="Information">Info message</Alert>
        <Alert variant="success" iconLabel="Success">Success message</Alert>
        <Alert variant="warning" iconLabel="Warning">Warning message</Alert>
        <Alert variant="error" iconLabel="Error">Error message</Alert>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
