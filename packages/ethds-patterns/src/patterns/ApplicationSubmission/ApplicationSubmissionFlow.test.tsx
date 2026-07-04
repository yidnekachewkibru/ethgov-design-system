import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { ApplicationSubmissionFlow } from './ApplicationSubmissionFlow';

async function fillApplicantStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Given name', { exact: false }), 'Abebe');
  await user.type(screen.getByLabelText(/^Father's name/), 'Kebede');
  await user.type(screen.getByLabelText('Phone number', { exact: false }), '0911234567');
}

describe('ApplicationSubmissionFlow', () => {
  it('blocks Next on step 1 until required fields are filled, then advances', async () => {
    const user = userEvent.setup();
    render(<ApplicationSubmissionFlow onSubmit={vi.fn()} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Apply for a business licence' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Enter your given name.');

    await fillApplicantStep(user);
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByText('Step 2 of 4: Business details')).toBeInTheDocument();
  });

  it('preserves data across Back and Next', async () => {
    const user = userEvent.setup();
    render(<ApplicationSubmissionFlow onSubmit={vi.fn()} />);

    await fillApplicantStep(user);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await screen.findByText('Step 2 of 4: Business details');

    await user.click(screen.getByRole('button', { name: 'Back' }));
    await screen.findByText('Step 1 of 4: Applicant');

    expect(screen.getByLabelText('Given name', { exact: false })).toHaveValue('Abebe');
    expect(screen.getByLabelText(/^Father's name/)).toHaveValue('Kebede');
    expect(screen.getByLabelText('Phone number', { exact: false })).toHaveValue('0911234567');
  });

  async function completeAllSteps(user: ReturnType<typeof userEvent.setup>) {
    await fillApplicantStep(user);
    await user.click(screen.getByRole('button', { name: 'Next' }));

    await screen.findByText('Step 2 of 4: Business details');
    await user.type(screen.getByLabelText('Business name', { exact: false }), 'Abebe Trading PLC');
    await user.selectOptions(screen.getByLabelText('Region', { exact: false }), 'or');
    await user.click(screen.getByLabelText('Retail'));
    await user.click(screen.getByRole('button', { name: 'Next' }));

    await screen.findByText('Step 3 of 4: Documents');
    const file = new File(['content'], 'registration.pdf', { type: 'application/pdf' });
    await user.upload(screen.getByLabelText(/Upload your business registration document/), file);
    await user.click(screen.getByRole('button', { name: 'Next' }));

    await screen.findByText('Step 4 of 4: Review');
  }

  it('lists every entered value on Review, with working Change links back to each step', async () => {
    const user = userEvent.setup();
    render(<ApplicationSubmissionFlow onSubmit={vi.fn()} />);
    await completeAllSteps(user);

    expect(screen.getByText('Abebe')).toBeInTheDocument();
    expect(screen.getByText('Kebede')).toBeInTheDocument();
    expect(screen.getByText('0911234567')).toBeInTheDocument();
    expect(screen.getByText('Abebe Trading PLC')).toBeInTheDocument();
    expect(screen.getByText('registration.pdf')).toBeInTheDocument();

    const changeLinks = screen.getAllByRole('link', { name: /Change/ });
    await user.click(changeLinks[0]); // first row -> step 1

    expect(await screen.findByText('Step 1 of 4: Applicant')).toBeInTheDocument();
    expect(screen.getByLabelText('Given name', { exact: false })).toHaveValue('Abebe');
  });

  it('submits the accumulated data on Review', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue({ reference: 'ETH-2026-00412' });
    render(<ApplicationSubmissionFlow onSubmit={onSubmit} />);
    await completeAllSteps(user);

    await user.click(screen.getByRole('button', { name: 'Submit application' }));

    expect(await screen.findByText('Application complete')).toBeInTheDocument();
    expect(screen.getByText(/ETH-2026-00412/)).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        givenName: 'Abebe',
        fathersName: 'Kebede',
        phone: '0911234567',
        businessName: 'Abebe Trading PLC',
        region: 'or',
        activity: 'retail',
        documentName: 'registration.pdf',
      }),
    );
  });

  it('keeps the review intact and offers retry when submit fails', async () => {
    const user = userEvent.setup();
    let attempt = 0;
    const onSubmit = vi.fn(async () => {
      attempt += 1;
      if (attempt === 1) throw new Error('network error');
      return { reference: 'ETH-2026-00412' };
    });
    render(<ApplicationSubmissionFlow onSubmit={onSubmit} />);
    await completeAllSteps(user);

    await user.click(screen.getByRole('button', { name: 'Submit application' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/went wrong/);
    // Data is still on the review screen — never silently dropped.
    expect(screen.getByText('Abebe Trading PLC')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Submit application' }));
    expect(await screen.findByText('Application complete')).toBeInTheDocument();
  });

  it('calls onSaveDraft after each step transition', async () => {
    const user = userEvent.setup();
    const onSaveDraft = vi.fn();
    render(<ApplicationSubmissionFlow onSubmit={vi.fn()} onSaveDraft={onSaveDraft} />);
    await fillApplicantStep(user);
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(onSaveDraft).toHaveBeenCalledWith(
      expect.objectContaining({ givenName: 'Abebe', fathersName: 'Kebede', phone: '0911234567' }),
    );
  });

  it('has no axe violations on the applicant step', async () => {
    const { container } = render(<ApplicationSubmissionFlow onSubmit={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations on the review step', async () => {
    const user = userEvent.setup();
    const { container } = render(<ApplicationSubmissionFlow onSubmit={vi.fn()} />);
    await completeAllSteps(user);
    expect(await axe(container)).toHaveNoViolations();
  });
});
