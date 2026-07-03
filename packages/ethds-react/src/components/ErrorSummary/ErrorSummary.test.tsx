import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { ErrorSummary } from './ErrorSummary';

const errors = [
  { message: 'Enter your given name', href: '#given-name' },
  { message: 'Choose a region', href: '#region' },
];

describe('ErrorSummary', () => {
  it('announces as an alert and receives focus', () => {
    render(<ErrorSummary title="There is a problem" errors={errors} />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('There is a problem');
    expect(alert).toHaveFocus(); // autoFocus default
  });

  it('links each error to its field', () => {
    render(<ErrorSummary title="There is a problem" errors={errors} />);
    expect(screen.getByRole('link', { name: 'Enter your given name' })).toHaveAttribute(
      'href',
      '#given-name',
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders nothing when there are no errors', () => {
    const { container } = render(<ErrorSummary title="Problem" errors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('can opt out of auto-focus', () => {
    render(<ErrorSummary title="Problem" errors={errors} autoFocus={false} />);
    expect(screen.getByRole('alert')).not.toHaveFocus();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <ErrorSummary title="There is a problem" errors={errors} autoFocus={false} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
