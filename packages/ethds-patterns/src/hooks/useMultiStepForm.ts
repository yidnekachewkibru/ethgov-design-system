import { useCallback, useState } from 'react';

export interface SubmitResult {
  /** The reference number/id shown on the confirmation screen. */
  reference: string;
}

export interface UseMultiStepFormOptions<TData extends object> {
  /** Number of data-entry steps in the flow (the Review screen is step `totalSteps + 1`). */
  totalSteps: number;
  /** Seed data, e.g. restoring a previously saved draft. */
  initialData?: Partial<TData>;
  /**
   * Called after each successful step transition with the accumulated
   * draft so a consumer can persist it (local storage, a server draft
   * endpoint, or both) — the hook itself makes no persistence assumptions.
   */
  onSaveDraft?: (data: Partial<TData>) => void | Promise<void>;
  /** Called on final submit with the fully accumulated data. */
  onSubmit: (data: TData) => Promise<SubmitResult>;
}

export interface UseMultiStepFormResult<TData extends object> {
  /** 1-based; `totalSteps + 1` is the Review screen. */
  currentStep: number;
  totalSteps: number;
  data: Partial<TData>;
  submitting: boolean;
  submitError: string | null;
  /** Set once `submit()` succeeds; drives the Confirmation screen. */
  result: SubmitResult | null;
  /** Merge `stepData` into the draft, save it, and advance one step. */
  goNext: (stepData: Partial<TData>) => Promise<void>;
  goBack: () => void;
  /** Jump directly to a step — used by the Review screen's "Change" links. */
  goToStep: (step: number) => void;
  /** Submit the accumulated data. On failure, the draft is left intact so the citizen can retry. */
  submit: () => Promise<void>;
}

/**
 * useMultiStepForm — the generic engine behind multi-step government
 * service flows (Application Submission, Password Reset).
 *
 * Owns step position and the accumulated draft only; it has no opinion on
 * validation (each step component validates itself before calling
 * `goNext`, same as a single-step form) or on how a draft is persisted
 * (`onSaveDraft` is a callback, never `localStorage`/`fetch` directly) —
 * per Redundant Entry (WCAG 2.2 SC 3.3.7) and the "preserve input across a
 * dropped connection" requirement in the Application Submission pattern.
 */
export function useMultiStepForm<TData extends object>({
  totalSteps,
  initialData,
  onSaveDraft,
  onSubmit,
}: UseMultiStepFormOptions<TData>): UseMultiStepFormResult<TData> {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<Partial<TData>>(initialData ?? {});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const reviewStep = totalSteps + 1;

  const goNext = useCallback(
    async (stepData: Partial<TData>) => {
      const next = { ...data, ...stepData };
      setData(next);
      await onSaveDraft?.(next);
      setCurrentStep((s) => Math.min(s + 1, reviewStep));
    },
    [data, onSaveDraft, reviewStep],
  );

  const goBack = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      setCurrentStep(Math.min(Math.max(step, 1), reviewStep));
    },
    [reviewStep],
  );

  const submit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await onSubmit(data as TData);
      setResult(res);
    } catch {
      setSubmitError('Something went wrong. Your answers have been kept — try again.');
    } finally {
      setSubmitting(false);
    }
  }, [data, onSubmit]);

  return {
    currentStep,
    totalSteps,
    data,
    submitting,
    submitError,
    result,
    goNext,
    goBack,
    goToStep,
    submit,
  };
}
