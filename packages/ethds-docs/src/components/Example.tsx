import type { ReactNode } from 'react';

/**
 * Example — the bordered live-example frame used on component pages
 * (the equivalent of GOV.UK's example panel). Children are real
 * @ethds/react components rendered live.
 */
export default function Example({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid var(--ethds-gray-300)',
        borderLeft: '4px solid var(--ethds-blue-600)',
        borderRadius: 'var(--ethds-radius-md)',
        background: 'var(--ethds-white)',
        padding: 'var(--ethds-space-6)',
        marginBottom: 'var(--ethds-space-4)',
        color: 'var(--ethds-ink)',
        fontFamily: 'var(--ethds-font-sans)',
      }}
    >
      {children}
    </div>
  );
}
