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

## HTML Example

This is the full write-up [Login's HTML Example](login.md#html-example)
points to. `ApplicationSubmissionFlow` is built on a client-side
multi-step hook (`useMultiStepForm`) that holds the whole draft in
memory and swaps steps without a page load. Without a client framework,
the natural equivalent isn't a JavaScript port of that hook — it's
**multi-page**: one `<form>` per step, each posting to the next step's
URL, with the in-progress draft held in the **server session** (exactly
how most government paper-to-digital form flows already work). This is a
different shape, not a harder one — accessibility and low-bandwidth
behaviour are, if anything, easier to get right this way, since each
step is a full page load with no client state to lose on a dropped
connection.

Each step is its own page, at its own URL (`/apply/business-licence/2`,
etc.), with its own `<h1>` and the step indicator showing progress:

```html
<form method="post" action="/apply/business-licence/2" novalidate>
  <h1>Apply for a business licence</h1>

  <nav aria-label="Application progress" class="ethds-step-indicator">
    <ol class="ethds-step-indicator__list">
      <li class="ethds-step-indicator__step ethds-step-indicator__step--complete">
        <span class="ethds-step-indicator__number" aria-hidden="true">1</span>
        <span>Applicant</span>
      </li>
      <li class="ethds-step-indicator__step ethds-step-indicator__step--current" aria-current="step">
        <span class="ethds-step-indicator__number" aria-hidden="true">2</span>
        <span>Business details</span>
      </li>
      <li class="ethds-step-indicator__step">
        <span class="ethds-step-indicator__number" aria-hidden="true">3</span>
        <span>Documents</span>
      </li>
      <li class="ethds-step-indicator__step">
        <span class="ethds-step-indicator__number" aria-hidden="true">4</span>
        <span>Review</span>
      </li>
    </ol>
  </nav>

  <!-- Only present when this step's own submission failed validation. -->
  <div role="alert" tabindex="-1" class="ethds-error-summary" id="error-summary">
    <h2 class="ethds-error-summary__title">There is a problem</h2>
    <ul class="ethds-error-summary__list">
      <li><a href="#businessName" class="ethds-error-summary__link">Enter the business name.</a></li>
    </ul>
  </div>

  <div class="ethds-field">
    <label for="businessName" class="ethds-label">Business name</label>
    <input id="businessName" name="businessName" type="text" class="ethds-input"
           value="{{ draft.businessName }}" required />
  </div>

  <div class="ethds-field">
    <label for="region" class="ethds-label">Region</label>
    <select id="region" name="region" class="ethds-select" required>
      <option value="" disabled>Select a region</option>
      <option value="aa" {{ draft.region == 'aa' ? 'selected' : '' }}>Afar</option>
      <option value="am" {{ draft.region == 'am' ? 'selected' : '' }}>Amhara</option>
      <option value="or" {{ draft.region == 'or' ? 'selected' : '' }}>Oromia</option>
    </select>
  </div>

  <a href="/apply/business-licence/1" class="ethds-back-link">← Back</a>
  <button type="submit" class="ethds-button ethds-button--primary">Next</button>
</form>

<script>
  document.getElementById('error-summary')?.focus();
</script>
```

(The `{{ … }}` placeholders are illustrative of any server templating
language — Jinja, ERB, Blade, and so on all express the same idea:
re-populate each field from the session draft so nothing already entered
is ever lost.)

Each step's POST handler validates that step only, re-renders the same
page with the error summary on failure, and on success merges the
posted values into the server-session draft and redirects to the next
step's URL — a plain, unconditional `303 See Other` redirect, so a
reload of the resulting page never resubmits the step. The **Review**
step lists every field from the session draft with a link back to the
exact step that captured it (the [Summary list](/docs/components/summary-list#plain-html)
markup), and the final submit clears the session draft only after a
successful submission — a failed submit leaves the whole draft, review
included, exactly as it was.
