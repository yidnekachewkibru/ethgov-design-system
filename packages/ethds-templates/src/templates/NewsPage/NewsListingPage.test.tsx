import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { NewsListingPage } from './NewsListingPage';

const languages = [{ code: 'en', label: 'English' }];
const items = [
  {
    href: '/news/1',
    title: 'New tax filing deadline',
    date: 'Meskerem 9, 2019 EC',
    summary: 'The filing deadline has been extended by two weeks.',
  },
  {
    href: '/news/2',
    title: 'Office hours change',
    date: 'Meskerem 12, 2019 EC',
    summary: 'Offices will open an hour later starting next week.',
  },
];

function renderPage(overrides = {}) {
  return render(
    <NewsListingPage
      serviceName="Government of Ethiopia"
      languages={languages}
      locale="en"
      onLocale={() => {}}
      items={items}
      page={1}
      totalPages={1}
      onPage={() => {}}
      {...overrides}
    />,
  );
}

describe('NewsListingPage', () => {
  it('renders one h1 and each item with a title link, date, and summary', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'News' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'New tax filing deadline' })).toHaveAttribute('href', '/news/1');
    expect(screen.getByText('Meskerem 9, 2019 EC')).toBeInTheDocument();
    expect(screen.getByText('The filing deadline has been extended by two weeks.')).toBeInTheDocument();
  });

  it('shows pagination only when there is more than one page', () => {
    const { rerender } = renderPage({ totalPages: 1 });
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();

    rerender(
      <NewsListingPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        items={items}
        page={1}
        totalPages={3}
        onPage={() => {}}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
