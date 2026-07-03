import { describe, it, expect, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useMultiStepForm } from './useMultiStepForm';

interface Draft {
  businessName?: string;
  region?: string;
}

describe('useMultiStepForm', () => {
  it('starts at step 1 and exposes totalSteps', () => {
    const { result } = renderHook(() =>
      useMultiStepForm<Draft>({ totalSteps: 3, onSubmit: async () => ({ reference: 'X' }) }),
    );
    expect(result.current.currentStep).toBe(1);
    expect(result.current.totalSteps).toBe(3);
    expect(result.current.data).toEqual({});
  });

  it('goNext merges step data, saves a draft, and advances', async () => {
    const onSaveDraft = vi.fn();
    const { result } = renderHook(() =>
      useMultiStepForm<Draft>({
        totalSteps: 2,
        onSaveDraft,
        onSubmit: async () => ({ reference: 'X' }),
      }),
    );

    await act(async () => {
      await result.current.goNext({ businessName: 'Abebe Trading' });
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.data).toEqual({ businessName: 'Abebe Trading' });
    expect(onSaveDraft).toHaveBeenCalledWith({ businessName: 'Abebe Trading' });
  });

  it('never advances past the review step (totalSteps + 1)', async () => {
    const { result } = renderHook(() =>
      useMultiStepForm<Draft>({ totalSteps: 1, onSubmit: async () => ({ reference: 'X' }) }),
    );

    await act(async () => {
      await result.current.goNext({ businessName: 'A' });
    });
    expect(result.current.currentStep).toBe(2); // the review step

    await act(async () => {
      await result.current.goNext({});
    });
    expect(result.current.currentStep).toBe(2); // clamped, not 3
  });

  it('goBack decrements but never below 1', () => {
    const { result } = renderHook(() =>
      useMultiStepForm<Draft>({ totalSteps: 2, onSubmit: async () => ({ reference: 'X' }) }),
    );
    act(() => result.current.goBack());
    expect(result.current.currentStep).toBe(1);
  });

  it('goToStep jumps directly, for Review "Change" links', async () => {
    const { result } = renderHook(() =>
      useMultiStepForm<Draft>({ totalSteps: 3, onSubmit: async () => ({ reference: 'X' }) }),
    );
    act(() => result.current.goToStep(2));
    expect(result.current.currentStep).toBe(2);
  });

  it('submit success sets result', async () => {
    const { result } = renderHook(() =>
      useMultiStepForm<Draft>({ totalSteps: 1, onSubmit: async () => ({ reference: 'ETH-2026-00412' }) }),
    );

    act(() => {
      result.current.submit();
    });

    await waitFor(() => expect(result.current.result).toEqual({ reference: 'ETH-2026-00412' }));
    expect(result.current.submitting).toBe(false);
    expect(result.current.submitError).toBeNull();
  });

  it('submit failure keeps the draft intact and allows retry', async () => {
    let attempt = 0;
    const onSubmit = vi.fn(async () => {
      attempt += 1;
      if (attempt === 1) throw new Error('network error');
      return { reference: 'ETH-2026-00412' };
    });
    const { result } = renderHook(() =>
      useMultiStepForm<Draft>({ totalSteps: 1, onSubmit }),
    );

    await act(async () => {
      await result.current.goNext({ businessName: 'Abebe Trading' });
    });

    act(() => {
      result.current.submit();
    });
    await waitFor(() => expect(result.current.submitError).not.toBeNull());
    expect(result.current.data).toEqual({ businessName: 'Abebe Trading' });

    act(() => {
      result.current.submit();
    });
    await waitFor(() => expect(result.current.result).toEqual({ reference: 'ETH-2026-00412' }));
  });
});
