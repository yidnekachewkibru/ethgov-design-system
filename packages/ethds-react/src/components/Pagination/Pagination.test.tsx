import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Pagination } from './Pagination';

const labels = {
  nav: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: (p: number, current: boolean) => (current ? `Page ${p}, current page` : `Go to page ${p}`),
};

describe('Pagination', () => {
  it('renders a labelled nav landmark', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} labels={labels} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('marks the current page with aria-current', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} labels={labels} />);
    const current = screen.getByRole('button', { name: 'Page 3, current page' });
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('disables Previous on the first page and Next on the last', () => {
    const { rerender } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} labels={labels} />,
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    rerender(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} labels={labels} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('calls onPageChange with the chosen page', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} labels={labels} />);
    await userEvent.click(screen.getByRole('button', { name: 'Go to page 4' }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('has no axe violations (with truncation)', async () => {
    const { container } = render(
      <Pagination currentPage={6} totalPages={20} onPageChange={() => {}} labels={labels} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
