# Complaint Submission

## Overview

Let a citizen report a problem or grievance about a service. The pattern
lowers the barrier to being heard: minimal required fields, optional
anonymity where policy allows, file attachment for evidence, and a
tracking reference so the citizen can follow up.

**Components:** Breadcrumb, Select, TextArea, TextInput, Checkbox, Button,
Alert. **Related:** [Status Tracking](status-tracking.md).

## User Journey

1. Citizen chooses "Submit a complaint".
2. Selects a category and describes the issue.
3. Optionally attaches evidence and provides contact details (or stays
   anonymous where allowed).
4. Submits → receives a reference to track the complaint.

## UX Flow

```
[Complaint form] --submit--> validating --ok--> [Confirmation + reference]
       |                          └--fail--> [form + error summary]
```

## Wireframe

```
┌─────────────────────────────────────┐
│ Submit a complaint                  │
│                                     │
│ What is this about?                 │
│ [ Service delay              ▾ ]    │
│                                     │
│ Describe what happened              │
│ [ ............................. ]   │
│ [ ............................. ]   │
│                                     │
│ Attach evidence (optional)          │
│ [ Choose file ]                     │
│                                     │
│ [ ] Submit anonymously              │
│ Phone (so we can follow up)         │
│ [ 0911 234 567                 ]    │
│                                     │
│ [        Submit complaint     ]     │
└─────────────────────────────────────┘
```

## Validation Rules

- **Category** and **description**: required; description has a sensible
  minimum but a generous maximum.
- **Contact:** required **unless** "Submit anonymously" is chosen (where
  the service permits anonymous complaints).
- **Attachments:** optional; validate type/size; make clear what's allowed.

## Error Handling

- Field-level errors + a focusable error summary Alert.
- **Attachment too large / wrong type:** explain the limit in plain
  language beside the control (common on
  [low-bandwidth](../../../docs/design-principles/06-design-for-low-bandwidth.md)
  uploads — allow the citizen to proceed without the file if it won't
  upload).
- **Submit failure:** preserve the written complaint (it may be long) and
  offer retry.

## Accessibility Guidance

- Labelled fields; the anonymity checkbox toggles the contact field's
  required state, announced to assistive tech.
- Error summary focus management; description `TextArea` clearly labelled
  with any minimum length as a hint.
- **Consistent Help (SC 3.2.6):** how to get help submitting is in the same
  place as across other services.

## Localization

- All labels/errors translatable; the citizen writes their complaint in
  their own language (Ge'ez or Latin script) — the `TextArea` supports full
  Unicode.

## React Example

```tsx
import { useState } from 'react';
import { Select, TextArea, TextInput, Checkbox, Button, Alert } from '@ethds/react';

const CATEGORIES = [
  { value: 'delay', label: 'Service delay' },
  { value: 'conduct', label: 'Staff conduct' },
  { value: 'error', label: 'Incorrect information' },
  { value: 'other', label: 'Other' },
];

export function ComplaintForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) {
  const [anon, setAnon] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: string[] = [];
    if (!data.get('category')) next.push('Choose what this is about.');
    if (!String(data.get('description') ?? '').trim()) next.push('Describe what happened.');
    if (!anon && !data.get('phone')) next.push('Add a phone number, or submit anonymously.');
    setErrors(next);
    if (next.length === 0) await onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Submit a complaint</h1>
      {errors.length > 0 && (
        <Alert variant="error" iconLabel="Error" title="Check the form">
          <ul>{errors.map((m) => <li key={m}>{m}</li>)}</ul>
        </Alert>
      )}
      <Select label="What is this about?" name="category" options={CATEGORIES} placeholder="Choose a category" required />
      <TextArea label="Describe what happened" name="description" rows={5} required />
      <Checkbox label="Submit anonymously" name="anonymous" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
      {!anon && (
        <TextInput label="Phone (so we can follow up)" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
      )}
      <Button type="submit" variant="primary">Submit complaint</Button>
    </form>
  );
}
```
