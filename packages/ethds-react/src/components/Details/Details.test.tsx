import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Details } from './Details';

describe('Details', () => {
  it('renders collapsed by default, revealing content on toggle', async () => {
    const user = userEvent.setup();
    render(<Details summary="Why do we ask for your Fayda ID?">Content here.</Details>);

    const summary = screen.getByText('Why do we ask for your Fayda ID?');
    expect(screen.getByText('Content here.')).not.toBeVisible();

    await user.click(summary);
    expect(screen.getByText('Content here.')).toBeVisible();
  });

  it('can be expanded by default', () => {
    render(
      <Details summary="Why do we ask?" open>
        Content here.
      </Details>,
    );
    expect(screen.getByText('Content here.')).toBeVisible();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Details summary="Why do we ask?">Content here.</Details>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
