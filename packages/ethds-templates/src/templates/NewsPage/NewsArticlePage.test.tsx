import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { NewsArticlePage } from './NewsArticlePage';

const languages = [{ code: 'en', label: 'English' }];
const breadcrumb = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'New tax filing deadline' },
];

function renderPage(overrides = {}) {
  return render(
    <NewsArticlePage
      serviceName="Ministry of Revenue"
      languages={languages}
      locale="en"
      onLocale={() => {}}
      breadcrumb={breadcrumb}
      title="New tax filing deadline"
      date="Meskerem 9, 2019 EC"
      body={<p>The filing deadline has been extended by two weeks.</p>}
      newsHref="/news"
      {...overrides}
    />,
  );
}

describe('NewsArticlePage', () => {
  it('renders one h1, a breadcrumb, and the date in a real <time> element', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'New tax filing deadline' })).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toHaveTextContent('New tax filing deadline');
    const time = screen.getByText('Meskerem 9, 2019 EC');
    expect(time.tagName).toBe('TIME');
  });

  it('shows the body and a link back to the listing', () => {
    renderPage();
    expect(screen.getByText('The filing deadline has been extended by two weeks.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to news' })).toHaveAttribute('href', '/news');
  });

  it('has no axe violations', async () => {
    const { container } = renderPage({
      footerGroups: [{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }],
      copyright: '© 2026 Government of Ethiopia.',
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
