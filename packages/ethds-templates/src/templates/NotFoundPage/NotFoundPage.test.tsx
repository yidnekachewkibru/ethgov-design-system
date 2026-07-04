import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { NotFoundPage } from './NotFoundPage';

const languages = [{ code: 'en', label: 'English' }];

describe('NotFoundPage', () => {
  it('renders one h1, the standard chrome, and recovery options', () => {
    render(
      <NotFoundPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
      />,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Government home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All services' })).toBeInTheDocument();
  });

  it('never renders the raw "404" in citizen-facing text', () => {
    render(
      <NotFoundPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
      />,
    );
    expect(screen.queryByText(/404/)).not.toBeInTheDocument();
  });

  it('calls onSearch with the entered query', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(
      <NotFoundPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        onSearch={onSearch}
      />,
    );
    await user.type(screen.getByLabelText('Search government services'), 'passport');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalledWith('passport');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <NotFoundPage
        serviceName="Government of Ethiopia"
        languages={languages}
        locale="en"
        onLocale={() => {}}
        footerGroups={[{ title: 'About', links: [{ label: 'Contact', href: '/contact' }] }]}
        copyright="© 2026 Government of Ethiopia."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
