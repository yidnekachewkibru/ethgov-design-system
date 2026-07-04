import type { ReactNode } from 'react';
import { Alert } from '@ethds/react';
import type { AlertVariant } from '@ethds/react';
import styles from './StatusView.module.css';

export interface StatusStep {
  label: string;
  date: string;
}

export interface StatusViewLabels {
  headingPrefix: ReactNode;
  timelineHeading: string;
}

export const DEFAULT_STATUS_VIEW_LABELS: StatusViewLabels = {
  headingPrefix: 'Application',
  timelineHeading: 'Timeline',
};

export interface StatusViewProps {
  reference: string;
  /** Current status in plain language, e.g. "Approved — ready for pickup". */
  statusText: string;
  /** What it means for the citizen / what to do next. */
  detail: ReactNode;
  timeline: StatusStep[];
  /** `success` (approved), `warning` (action needed), `error` (rejected), `info` (in progress). */
  variant?: AlertVariant;
  /** Accessible name for the status icon; defaults to `statusText` so the icon is never colour-only. */
  iconLabel?: string;
  labels?: Partial<StatusViewLabels>;
}

/**
 * StatusView — the Status Tracking pattern
 * (docs/../ethds-patterns/patterns/status-tracking.md).
 *
 * States the outcome in plain language (never an internal workflow code)
 * and conveys it with text and a labelled icon, never colour alone. The
 * timeline is a semantic ordered list, per the pattern's Accessibility
 * Guidance.
 */
export function StatusView({
  reference,
  statusText,
  detail,
  timeline,
  variant = 'success',
  iconLabel,
  labels,
}: StatusViewProps) {
  const l = { ...DEFAULT_STATUS_VIEW_LABELS, ...labels };
  return (
    <section className={styles.section}>
      <h1>
        {l.headingPrefix} {reference}
      </h1>
      <Alert variant={variant} iconLabel={iconLabel ?? statusText} title={statusText}>
        {detail}
      </Alert>
      <h2>{l.timelineHeading}</h2>
      <ol className={styles.timeline}>
        {timeline.map((step) => (
          <li key={step.label}>
            <strong>{step.label}</strong> — {step.date}
          </li>
        ))}
      </ol>
    </section>
  );
}
