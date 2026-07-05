# Appointment Booking

## Overview

Book a slot to visit a government office (e.g. for biometrics, an
interview, or document collection). The pattern picks a location, shows
available dates/times in the **Ethiopian calendar and EAT**, and confirms
with a reference the citizen can bring.

**Components:** Breadcrumb, Select, RadioGroup, Button, Alert, Table.
**Related:** [Status Tracking](status-tracking.md),
[Receipt Flow](receipt-flow.md).

## User Journey

1. Citizen chooses the office/service.
2. Picks an available date, then an available time slot.
3. Confirms → receives a booking reference and details (what to bring,
   where).
4. Can reschedule or cancel later.

## UX Flow

```
[Choose office] → [Choose date] → [Choose time] → [Confirm] → [Booked + reference]
                        ↑ only available dates/times are selectable
```

## Wireframe

```
┌─────────────────────────────────────┐
│ Book an appointment                 │
│                                     │
│ Office                              │
│ [ Addis Ababa — Bole sub-city  ▾ ] │
│                                     │
│ Date (Ethiopian calendar)           │
│ [ Meskerem 5, 2019 EC          ▾ ] │
│                                     │
│ Time (EAT)                          │
│ ( ) 09:00  ( ) 09:30  (•) 10:00     │
│                                     │
│ [       Confirm booking       ]     │
└─────────────────────────────────────┘
```

## Validation Rules

- **Office, date, time:** all required; only **available** options are
  selectable (disable full/past slots rather than erroring after submit).
- Prevent double-booking: re-check availability at confirmation and handle
  the race (someone took the slot first).
- Times are shown in **EAT (UTC+3)** and stored with timezone.

## Error Handling

- **Slot taken during booking:** explain and offer the nearest alternatives
  rather than a bare error.
- **No availability:** show the next available date, or a waitlist/notify
  option — never a dead end.
- **Confirmation failure:** don't leave the citizen unsure whether they're
  booked; show a definite booked/not-booked outcome and a reference.

## Accessibility Guidance

- Date/time pickers are keyboard operable with clear labels; unavailable
  options are conveyed to assistive tech (disabled + not just greyed).
- Time slots as a `RadioGroup` (single choice, arrow-key navigation).
- Confirmation status announced; focus moves to the confirmation heading.

## Localization

- Dates in the [Ethiopian calendar](../../../docs/localization/date-formatting.md)
  (labelled E.C.), times in EAT — the two most error-prone areas for
  appointments; be explicit to avoid a citizen arriving on the wrong day.
- Office names and instructions translatable.

## React Example

```tsx
import { useState } from 'react';
import { Select, RadioGroup, Button, Alert } from '@ethds/react';

export function BookingForm({
  offices,
  dates,
  slots,
  onConfirm,
}: {
  offices: { value: string; label: string }[];
  dates: { value: string; label: string }[];
  slots: { value: string; label: string; disabled?: boolean }[];
  onConfirm: (v: { office: string; date: string; time: string }) => Promise<void>;
}) {
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget) as any);
    try {
      await onConfirm({ office: data.office, date: data.date, time });
    } catch {
      setError('That slot was just taken. Please choose another time.');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Book an appointment</h1>
      {error && <Alert variant="warning" iconLabel="Warning">{error}</Alert>}
      <Select label="Office" name="office" options={offices} placeholder="Choose an office" required />
      <Select label="Date (Ethiopian calendar)" name="date" options={dates} placeholder="Choose a date" required />
      <RadioGroup
        legend="Time (EAT)"
        options={slots}
        value={time}
        onChange={setTime}
        required
      />
      <Button type="submit" variant="primary">Confirm booking</Button>
    </form>
  );
}
```

## HTML Example

```html
<form method="post" action="/appointments" novalidate>
  <h1>Book an appointment</h1>

  <!-- Only present when the chosen slot was taken between selection and confirmation. -->
  <div role="alert" class="ethds-alert ethds-alert--warning">
    That slot was just taken. Please choose another time.
  </div>

  <div class="ethds-field">
    <label for="office" class="ethds-label">Office</label>
    <select id="office" name="office" class="ethds-select" required>
      <option value="" disabled selected>Choose an office</option>
      <option value="bole">Bole office</option>
      <option value="kirkos">Kirkos office</option>
    </select>
  </div>

  <div class="ethds-field">
    <label for="date" class="ethds-label">Date (Ethiopian calendar)</label>
    <select id="date" name="date" class="ethds-select" required>
      <option value="" disabled selected>Choose a date</option>
      <option value="2019-01-05">Meskerem 5, 2019 EC</option>
      <option value="2019-01-06">Meskerem 6, 2019 EC</option>
    </select>
  </div>

  <fieldset class="ethds-radio-group">
    <legend class="ethds-legend">Time (EAT)</legend>
    <div class="ethds-radio-options">
      <div class="ethds-radio-row">
        <input id="time-0900" name="time" type="radio" value="09:00" class="ethds-radio" required />
        <label for="time-0900" class="ethds-label">9:00 AM</label>
      </div>
      <div class="ethds-radio-row">
        <input id="time-1000" name="time" type="radio" value="10:00" class="ethds-radio" disabled />
        <label for="time-1000" class="ethds-label">10:00 AM (fully booked)</label>
      </div>
      <div class="ethds-radio-row">
        <input id="time-1100" name="time" type="radio" value="11:00" class="ethds-radio" />
        <label for="time-1100" class="ethds-label">11:00 AM</label>
      </div>
    </div>
  </fieldset>

  <button type="submit" class="ethds-button ethds-button--primary">Confirm booking</button>
</form>
```

Reuses [Select](/docs/components/select#plain-html) and
[Radios](/docs/components/radios#plain-html)'s markup exactly — the
`disabled` radio is the accessible way to show an already-taken slot
without omitting it, so the citizen sees what's unavailable rather than
wondering why 10:00 isn't listed. Re-check availability server-side on
submit regardless (a slot can be taken between page load and submit); on
that race, re-render the form with the warning alert and the now-updated
`disabled` state.
