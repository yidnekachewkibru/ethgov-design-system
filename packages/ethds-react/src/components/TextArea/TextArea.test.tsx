import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('associates the label with the textarea', () => {
    render(<TextArea label="Describe your complaint" />);
    expect(screen.getByLabelText('Describe your complaint')).toBeInstanceOf(
      HTMLTextAreaElement,
    );
  });

  it('accepts multi-line input', async () => {
    render(<TextArea label="Details" />);
    const ta = screen.getByLabelText('Details');
    await userEvent.type(ta, 'Line one');
    expect(ta).toHaveValue('Line one');
  });

  it('marks invalid and describes the error', () => {
    render(<TextArea label="Details" error="This field is required" />);
    const ta = screen.getByLabelText('Details');
    expect(ta).toHaveAttribute('aria-invalid', 'true');
    const id = ta.getAttribute('aria-describedby')!;
    expect(document.getElementById(id)).toHaveTextContent('This field is required');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <form>
        <TextArea label="Message" hint="Up to 500 characters" required />
      </form>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
