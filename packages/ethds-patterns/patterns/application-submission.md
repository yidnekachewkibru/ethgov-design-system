# Application Submission

## Overview

A multi-step form for applying to a government service (a permit, a
licence, a benefit). The pattern breaks a long form into digestible steps,
**preserves the citizen's input across steps and connection drops**, and
ends with a review before submission.

**Components:** Header, Breadcrumb, TextInput, TextArea, Select, Checkbox,
RadioGroup, Button, Alert, Table (review). **Related:**
[Status Tracking](status-tracking.md), [Payment Flow](payment-flow.md).

## User Journey

1. Citizen starts an application from the service page.
2. Completes steps (e.g. Applicant → Details → Documents → Review).
3. Reviews a summary of everything entered.
4. Submits → gets a reference number and next steps → optionally pays.

## UX Flow

```
[Step 1] → [Step 2] → [Step 3] → [Review] --submit--> [Confirmation + reference]
   ↑___________back/next, data preserved___________↑
```

## Wireframe

```
┌─────────────────────────────────────┐
│ Home ▸ Services ▸ Business licence  │  ← Breadcrumb
│ Apply for a business licence        │
│ Step 2 of 4: Business details       │  ← progress
│                                     │
│ Business name                       │
│ [ ..............................]   │
│ Region                              │
│ [ Select a region            ▾ ]   │
│ Activity                            │
│ ( ) Retail  ( ) Services  ( ) Other │
│                                     │
│ [  Back  ]            [  Next  ]    │
└─────────────────────────────────────┘
```

## Validation Rules

- Validate **per step** on "Next"; block progress only for that step's
  required fields, showing an error summary.
- Field formats follow the localization standards (phone, dates, Birr,
  address, names).
- **Review step** shows all entered values for confirmation; the citizen
  can jump back to edit any section.

## Error Handling

- **Per-step error summary** (focusable Alert) lists issues and links to
  the offending fields.
- **Preserve input** on validation failure, on Back/Next, and across a
  dropped connection — save progress (local + server draft) so a citizen
  on a flaky [low-bandwidth](../../../docs/design-principles/06-design-for-low-bandwidth.md)
  link never loses work.
- **Redundant Entry (SC 3.3.7):** carry known data forward; never re-ask.
- **Submit failure:** keep the review intact and offer retry; never
  silently drop a submission.

## Accessibility Guidance

- Each step is a page with its own `<h1>` and announced step position
  ("Step 2 of 4"); focus moves to the heading on step change.
- Grouped inputs use `fieldset`/`legend`; the review is a semantic list or
  [Table](../../ethds-react/) with clear edit links.
- **Consistent Help (SC 3.2.6):** help/contact appears in the same place
  on every step.
- Error summary focus management per the
  [focus standard](../../../docs/accessibility/focus-management.md).

## Localization

- All labels/help/errors translatable; formatting per
  [localization](../../../docs/localization/) (Ethiopian calendar for
  dates, Birr for fees, region/woreda for address).

## React Example

```tsx
import { useState } from 'react';
import { TextInput, Select, Button, Alert } from '@ethds/react';

const REGIONS = [
  { value: 'aa', label: 'Afar' },
  { value: 'am', label: 'Amhara' },
  { value: 'or', label: 'Oromia' },
];

export function BusinessDetailsStep({
  draft,
  onNext,
  onBack,
}: {
  draft: Record<string, string>;
  onNext: (values: Record<string, string>) => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget) as any);
    const next: string[] = [];
    if (!data.businessName) next.push('Enter the business name.');
    if (!data.region) next.push('Select a region.');
    setErrors(next);
    if (next.length === 0) onNext(data); // preserve + advance
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Apply for a business licence</h1>
      <p>Step 2 of 4: Business details</p>
      {errors.length > 0 && (
        <Alert variant="error" iconLabel="Error" title="Check this step">
          <ul>{errors.map((m) => <li key={m}>{m}</li>)}</ul>
        </Alert>
      )}
      <TextInput label="Business name" name="businessName" defaultValue={draft.businessName} required />
      <Select label="Region" name="region" placeholder="Select a region" options={REGIONS} defaultValue={draft.region} required />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button type="button" variant="secondary" onClick={onBack}>Back</Button>
        <Button type="submit" variant="primary">Next</Button>
      </div>
    </form>
  );
}
```
