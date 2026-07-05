# @ethds/patterns

## 0.2.0

### Minor Changes

- 0eea372: First publishable release of `@ethds/patterns`: tested React compositions for all 10 documented service patterns (Login, Registration, OTP Verification, Application Submission, Password Reset, Status Tracking, Complaint Submission, Appointment Booking, Payment Flow, Receipt Flow), plus the shared `useMultiStepForm` hook.

### Patch Changes

- fd3c30d: Fix `Receipt` rendering zero `<h1>` elements — its success confirmation used an `Alert`, whose `title` renders as a styled `<p>`, not a heading, despite the pattern's own doc describing it as "the page's primary heading". Adds a translatable `heading` label (default `"Payment receipt"`) rendered as a real `<h1>`, independent of the `Alert`'s `role="status"` announcement.
