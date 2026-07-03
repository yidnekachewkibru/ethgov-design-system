import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('renders a labelled native file input', () => {
    render(<FileUpload label="Upload your Fayda ID scan" />);
    const input = screen.getByLabelText('Upload your Fayda ID scan');
    expect(input).toHaveAttribute('type', 'file');
  });

  it('announces the chosen file name', async () => {
    const user = userEvent.setup();
    render(<FileUpload label="Upload document" />);
    expect(screen.getByText('No file chosen')).toBeInTheDocument();

    const file = new File(['content'], 'permit.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText('Upload document') as HTMLInputElement;
    await user.upload(input, file);

    expect(screen.getByText('permit.pdf — file chosen')).toBeInTheDocument();
  });

  it('shows hint and error text', () => {
    render(<FileUpload label="Upload document" hint="PDF, up to 5MB" error="Choose a file" />);
    expect(screen.getByText('PDF, up to 5MB')).toBeInTheDocument();
    expect(screen.getByText('Choose a file')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload document')).toHaveAttribute('aria-invalid', 'true');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <FileUpload label="Upload document" hint="PDF, up to 5MB" required />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
