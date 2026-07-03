import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { CharacterCount } from './CharacterCount';

describe('CharacterCount', () => {
  it('shows the remaining count as the citizen types', async () => {
    const user = userEvent.setup();
    render(<CharacterCount label="Describe your complaint" maxLength={20} />);
    expect(screen.getByText('You have 20 characters remaining (limit 20)')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Describe your complaint'), 'Hello');
    expect(screen.getByText('You have 15 characters remaining (limit 20)')).toBeInTheDocument();
  });

  it('switches to an over-limit message and marks the field invalid', async () => {
    const user = userEvent.setup();
    render(<CharacterCount label="Reason" maxLength={5} />);
    await user.type(screen.getByLabelText('Reason'), 'Too many characters');
    expect(screen.getByText(/too many/)).toBeInTheDocument();
    expect(screen.getByLabelText('Reason')).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts a translated count-message builder', () => {
    render(
      <CharacterCount
        label="Reason"
        maxLength={10}
        defaultValue="abc"
        getCountMessage={(remaining) => `Remaining: ${remaining}`}
      />,
    );
    expect(screen.getByText('Remaining: 7')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <CharacterCount label="Describe your complaint" hint="Keep it brief" maxLength={200} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
