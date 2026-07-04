import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { formatBirr } from '../../utils/currency';
import { Receipt } from './Receipt';

// getByText's default normalizer collapses all whitespace (including the
// non-breaking space Intl inserts after "ETB") to a regular space.
const birr = (santim: number) => formatBirr(santim).replace(/\s+/g, ' ');

const items = [
  { label: 'Licence fee', santim: 30000 },
  { label: 'Service charge', santim: 5000 },
];

describe('Receipt', () => {
  it('renders one h1, independent of the status Alert', () => {
    render(
      <Receipt reference="RCP-2026-004112" date="Meskerem 9, 2019 EC" method="Telebirr" items={items} onDownload={vi.fn()} />,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Payment receipt' })).toBeInTheDocument();
  });

  it('shows a success confirmation and the immutable payment facts', () => {
    render(
      <Receipt reference="RCP-2026-004112" date="Meskerem 9, 2019 EC" method="Telebirr" items={items} onDownload={vi.fn()} />,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Payment successful');
    expect(screen.getByText('RCP-2026-004112')).toBeInTheDocument();
    expect(screen.getByText('Meskerem 9, 2019 EC')).toBeInTheDocument();
    expect(screen.getByText('Telebirr')).toBeInTheDocument();
  });

  it('itemises the payment and shows the total paid in Birr', () => {
    render(<Receipt reference="RCP-1" date="today" method="Card" items={items} onDownload={vi.fn()} />);

    expect(screen.getByText('Licence fee')).toBeInTheDocument();
    expect(screen.getByText(birr(30000))).toBeInTheDocument();
    expect(screen.getByText(`Total paid: ${birr(35000)}`)).toBeInTheDocument();
  });

  it('calls onDownload when the download button is activated', async () => {
    const user = userEvent.setup();
    const onDownload = vi.fn();
    render(<Receipt reference="RCP-1" date="today" method="Card" items={items} onDownload={onDownload} />);

    await user.click(screen.getByRole('button', { name: 'Download receipt' }));
    expect(onDownload).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Receipt reference="RCP-1" date="today" method="Card" items={items} onDownload={vi.fn()} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
