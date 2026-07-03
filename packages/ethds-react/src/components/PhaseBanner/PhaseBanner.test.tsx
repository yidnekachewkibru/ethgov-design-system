import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { PhaseBanner } from './PhaseBanner';

describe('PhaseBanner', () => {
  it('renders the phase tag text and message', () => {
    render(
      <PhaseBanner phase="beta" phaseLabel="Beta">
        This is a new service — your feedback will help us improve it.
      </PhaseBanner>,
    );
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(
      screen.getByText('This is a new service — your feedback will help us improve it.'),
    ).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <PhaseBanner phase="alpha" phaseLabel="Alpha">
        This is a new service.
      </PhaseBanner>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
