import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const labels = {
  nav: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: (p: number, current: boolean) =>
    current ? `Page ${p}, current page` : `Go to page ${p}`,
};

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={12} onPageChange={setPage} labels={labels} />;
  },
};

export const Truncated: Story = {
  render: () => {
    const [page, setPage] = useState(6);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} labels={labels} />;
  },
};
