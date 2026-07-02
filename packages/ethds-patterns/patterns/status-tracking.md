# Status Tracking

## Overview

Let a citizen check where their request stands. The answer is given in
**plain language about what it means for them** ("Approved — ready for
pickup"), not an internal workflow code, and the history is shown as a
clear timeline.

**Components:** Breadcrumb, TextInput, Button, Alert, Table, Notification.
**Related:** [Application Submission](application-submission.md).

## User Journey

1. Citizen enters a reference number (or opens the item from their
   dashboard).
2. Sees the current status prominently, in plain words.
3. Sees the history/timeline and any action they must take next.

## UX Flow

```
[Look up by reference] --> [Status view: current + timeline + next action]
   (or from dashboard) ------------^
```

## Wireframe

```
┌─────────────────────────────────────┐
│ Application ETH-2026-0041           │
│                                     │
│  ✔ Approved — ready for pickup      │  ← current status (plain language)
│  Collect at your woreda office.     │
│                                     │
│  Timeline                           │
│  ● Submitted        01 Mes 2019 EC  │
│  ● Under review     03 Mes 2019 EC  │
│  ● Approved         09 Mes 2019 EC  │
│                                     │
│  [  View details  ]                 │
└─────────────────────────────────────┘
```

## Validation Rules

- **Reference lookup:** required; validate against the known reference
  format; trim whitespace.
- Guard access — a reference alone should not expose sensitive data to
  anyone; require the citizen to be authenticated, or pair the reference
  with a second factor for anonymous lookups.

## Error Handling

- **Not found:** "We couldn't find an application with that reference.
  Check the reference and try again." Don't reveal valid-reference ranges.
- **Rejected status:** state the outcome plainly and **what the citizen can
  do next** (appeal, resubmit, contact) — never a dead end.
- **Stale/offline:** show the last-known status with its timestamp rather
  than a blank screen on a [low-bandwidth](../../../docs/design-principles/06-design-for-low-bandwidth.md)
  connection.

## Accessibility Guidance

- The current status is the page's primary heading region and is announced.
- Status is conveyed by **text (and an icon), never colour alone**
  ([accessibility](../../../docs/accessibility/contrast-requirements.md)).
- The timeline is a semantic ordered list; any live status change uses a
  [Notification](../../ethds-react/) live region.

## Localization

- Status labels and next-step text are translatable.
- Dates use the [Ethiopian calendar](../../../docs/localization/date-formatting.md)
  where the service's convention is E.C., labelled clearly.

## React Example

```tsx
import { Alert } from '@ethds/react';

type Step = { label: string; date: string };

export function StatusView({
  reference,
  statusText,
  detail,
  timeline,
}: {
  reference: string;
  statusText: string;
  detail: string;
  timeline: Step[];
}) {
  return (
    <section>
      <h1>Application {reference}</h1>
      <Alert variant="success" iconLabel="Approved" title={statusText}>
        {detail}
      </Alert>
      <h2>Timeline</h2>
      <ol>
        {timeline.map((s) => (
          <li key={s.label}>
            <strong>{s.label}</strong> — {s.date}
          </li>
        ))}
      </ol>
    </section>
  );
}
```
