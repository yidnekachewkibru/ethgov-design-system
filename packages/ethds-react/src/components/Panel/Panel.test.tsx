import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Panel } from './Panel';

describe('Panel', () => {
  it('renders the title as the page heading', () => {
    render(<Panel title="Application complete" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Application complete' })).toBeInTheDocument();
  });

  it('shows the reference prominently', () => {
    render(
      <Panel title="Application complete" reference="Your reference: ETH-2026-00412" />,
    );
    expect(screen.getByText('Your reference: ETH-2026-00412')).toBeInTheDocument();
  });

  it('renders supporting body text', () => {
    render(
      <Panel title="Payment successful" reference="RCP-2026-004112">
        We have sent a receipt by SMS.
      </Panel>,
    );
    expect(screen.getByText('We have sent a receipt by SMS.')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Panel title="Application complete" reference="ETH-2026-00412">
        Keep this reference to track your application.
      </Panel>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
