import { useState } from 'react';
import type { FormEvent } from 'react';
import { TextInput, Select, RadioGroup, Button, ErrorSummary } from '@ethds/react';
import type { ErrorSummaryItem, SelectOption, RadioOption } from '@ethds/react';
import gridStyles from '../../../styles/grid.module.css';
import formStyles from '../ApplicationSubmissionFlow.module.css';
import type { StepProps } from '../types';

export interface BusinessDetailsStepData {
  businessName: string;
  region: string;
  activity: string;
}

export interface BusinessDetailsStepLabels {
  heading: string;
  stepLabel: string;
  errorSummaryTitle: string;
  businessNameLabel: string;
  regionLabel: string;
  regionPlaceholder: string;
  activityLegend: string;
  backLabel: string;
  nextLabel: string;
  businessNameRequiredError: string;
  regionRequiredError: string;
  activityRequiredError: string;
}

export const DEFAULT_BUSINESS_DETAILS_LABELS: BusinessDetailsStepLabels = {
  heading: 'Apply for a business licence',
  stepLabel: 'Step 2 of 4: Business details',
  errorSummaryTitle: 'There is a problem',
  businessNameLabel: 'Business name',
  regionLabel: 'Region',
  regionPlaceholder: 'Select a region',
  activityLegend: 'Activity',
  backLabel: 'Back',
  nextLabel: 'Next',
  businessNameRequiredError: 'Enter the business name.',
  regionRequiredError: 'Select a region.',
  activityRequiredError: 'Select the business activity.',
};

const REGIONS: SelectOption[] = [
  { value: 'af', label: 'Afar' },
  { value: 'am', label: 'Amhara' },
  { value: 'or', label: 'Oromia' },
];

const ACTIVITIES: RadioOption[] = [
  { value: 'retail', label: 'Retail' },
  { value: 'services', label: 'Services' },
  { value: 'other', label: 'Other' },
];

export interface BusinessDetailsStepProps extends StepProps<BusinessDetailsStepData> {
  labels?: Partial<BusinessDetailsStepLabels>;
  regions?: SelectOption[];
  activities?: RadioOption[];
}

/**
 * Step 2 of the Application Submission flow — business details
 * (docs/../ethds-patterns/patterns/application-submission.md's worked
 * example), extended with the wireframe's Activity radio group.
 */
export function BusinessDetailsStep({
  draft,
  onNext,
  onBack,
  labels,
  regions = REGIONS,
  activities = ACTIVITIES,
}: BusinessDetailsStepProps) {
  const l = { ...DEFAULT_BUSINESS_DETAILS_LABELS, ...labels };
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [activity, setActivity] = useState(draft.activity ?? '');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: ErrorSummaryItem[] = [];
    if (!data.get('businessName')) next.push({ message: l.businessNameRequiredError, href: '#businessName' });
    if (!data.get('region')) next.push({ message: l.regionRequiredError, href: '#region' });
    if (!activity) next.push({ message: l.activityRequiredError, href: '#activity' });
    setErrors(next);
    if (next.length === 0) {
      onNext({
        businessName: String(data.get('businessName') ?? ''),
        region: String(data.get('region') ?? ''),
        activity: activity ?? '',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={formStyles.form}>
      <h1>{l.heading}</h1>
      <p>{l.stepLabel}</p>
      <ErrorSummary title={l.errorSummaryTitle} errors={errors} />
      <TextInput
        id="businessName"
        label={l.businessNameLabel}
        name="businessName"
        defaultValue={draft.businessName}
        required
      />
      <Select
        id="region"
        label={l.regionLabel}
        name="region"
        placeholder={l.regionPlaceholder}
        options={regions}
        defaultValue={draft.region}
        required
      />
      <RadioGroup
        id="activity"
        legend={l.activityLegend}
        options={activities}
        value={activity}
        onChange={setActivity}
        required
      />
      <div className={gridStyles.actions}>
        {onBack && (
          <Button type="button" variant="secondary" onClick={onBack}>
            {l.backLabel}
          </Button>
        )}
        <Button type="submit" variant="primary">
          {l.nextLabel}
        </Button>
      </div>
    </form>
  );
}
