import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { StepIndicator } from './StepIndicator';

const steps = ['Applicant', 'Details', 'Documents', 'Review'];

describe('StepIndicator', () => {
  it('renders a labelled navigation with all steps in order', () => {
    render(<StepIndicator steps={steps} current={2} label="Progress" />);
    expect(screen.getByRole('navigation', { name: 'Progress' })).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent('Applicant');
  });

  it('marks the current step with aria-current="step"', () => {
    render(<StepIndicator steps={steps} current={2} label="Progress" />);
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[0]).not.toHaveAttribute('aria-current');
    expect(items[2]).not.toHaveAttribute('aria-current');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <StepIndicator steps={steps} current={3} label="Application progress" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
