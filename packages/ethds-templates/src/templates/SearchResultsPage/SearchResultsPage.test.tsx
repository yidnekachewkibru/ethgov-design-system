import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { SearchResultsPage } from './SearchResultsPage';

const languages = [{ code: 'en', label: 'English' }];
const results = [
  { href: '/apply-passport', title: 'Apply for a passport', snippet: 'Immigration Service — start your application' },
  { href: '/renew-passport', title: 'Renew a passport', snippet: 'Immigration Service — for existing holders' },
];

function renderPage(overrides = {}) {
  return render(
    <SearchResultsPage
      serviceName="Government of Ethiopia"
      languages={languages}
      locale="en"
      onLocale={() => {}}
      query="passport"
      results={results}
      page={1}
      totalPages={1}
      onPage={() => {}}
      {...overrides}
    />,
  );
}

describe('SearchResultsPage', () => {
  it('renders one h1, independent of the result count', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Search results' })).toBeInTheDocument();
  });

  it('keeps the query in the search box and announces the result count', () => {
    renderPage();
    expect(screen.getByLabelText('Search government services')).toHaveValue('passport');
    expect(screen.getByRole('status')).toHaveTextContent('2 results for "passport"');
  });

  it('lists each result as a real, independently meaningful link', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Apply for a passport' })).toHaveAttribute(
      'href',
      '/apply-passport',
    );
    expect(screen.getByText('Immigration Service — start your application')).toBeInTheDocument();
  });

  it('shows a helpful alert, not a bare message, when there are no results', () => {
    renderPage({ results: [], query: 'zzz' });
    expect(screen.getByText('0 results for "zzz"')).toBeInTheDocument();
    expect(screen.getByText(/No results\. Try different words/)).toBeInTheDocument();
  });

  it('shows pagination only when there is more than one page', () => {
    const { rerender } = renderPage({ totalPages: 1 });
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();

    rerender(
      <SearchResultsPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        query="passport"
        results={results}
        page={1}
        totalPages={3}
        onPage={() => {}}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('calls onSearch and onPage', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const onPage = vi.fn();
    renderPage({ onSearch, onPage, totalPages: 3 });

    await user.clear(screen.getByLabelText('Search government services'));
    await user.type(screen.getByLabelText('Search government services'), 'visa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalledWith('visa');

    await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(onPage).toHaveBeenCalledWith(2);
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
