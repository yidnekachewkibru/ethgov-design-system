import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { formatBirr } from '../../utils/currency';
import { PaymentReview } from './PaymentReview';

// getByText's default normalizer collapses all whitespace (including the
// non-breaking space Intl inserts after "ETB") to a regular space.
const birr = (santim: number) => formatBirr(santim).replace(/\s+/g, ' ');

const items = [
  { label: 'Licence fee', santim: 30000 },
  { label: 'Service charge', santim: 5000 },
];
const total = birr(35000);
// getByRole's accessible-name matching does not normalize whitespace, so
// it needs the raw (non-breaking-space-containing) formatted string.
const payButtonName = `Pay ${formatBirr(35000)}`;

describe('PaymentReview', () => {
  it('itemises the charges and shows the total in Birr', () => {
    render(<PaymentReview items={items} onPay={vi.fn().mockResolvedValue(undefined)} />);

    expect(screen.getByText('Licence fee')).toBeInTheDocument();
    expect(screen.getByText(birr(30000))).toBeInTheDocument();
    expect(screen.getByText(birr(5000))).toBeInTheDocument();
    expect(screen.getByText(`Total: ${total}`)).toBeInTheDocument();
  });

  it('states the amount on the pay button', () => {
    render(<PaymentReview items={items} onPay={vi.fn().mockResolvedValue(undefined)} />);
    expect(screen.getByRole('button', { name: payButtonName })).toBeInTheDocument();
  });

  it('pays with the selected method', async () => {
    const user = userEvent.setup();
    const onPay = vi.fn().mockResolvedValue(undefined);
    render(<PaymentReview items={items} onPay={onPay} />);

    await user.click(screen.getByLabelText('Bank transfer'));
    await user.click(screen.getByRole('button', { name: payButtonName }));

    expect(onPay).toHaveBeenCalledWith('bank');
  });

  it('states plainly that nothing was charged when payment fails, and allows retry', async () => {
    const user = userEvent.setup();
    const onPay = vi.fn().mockRejectedValueOnce(new Error('provider error'));
    render(<PaymentReview items={items} onPay={onPay} />);

    await user.click(screen.getByRole('button', { name: payButtonName }));

    expect(await screen.findByRole('alert')).toHaveTextContent('No amount was charged');
    expect(screen.getByRole('button', { name: payButtonName })).toBeEnabled();
  });

  it('has no axe violations', async () => {
    const { container } = render(<PaymentReview items={items} onPay={vi.fn().mockResolvedValue(undefined)} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
