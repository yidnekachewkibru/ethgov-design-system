import type { ReactNode } from 'react';

/**
 * PageExample — the live-example frame used on Templates pages. Unlike
 * Example (used for a single component), a template renders its own full
 * page chrome (Header/Footer via PageChrome), so this frame contains it
 * in a bounded, scrollable, resizable box rather than letting a second
 * Header/Footer sit inside the docs site's own. Children are real
 * @ethds/templates components rendered live.
 */
export default function PageExample({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid var(--ethds-gray-300)',
        borderLeft: '4px solid var(--ethds-blue-600)',
        borderRadius: 'var(--ethds-radius-md)',
        marginBottom: 'var(--ethds-space-4)',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          margin: 0,
          padding: 'var(--ethds-space-2) var(--ethds-space-4)',
          background: 'var(--ethds-gray-100)',
          borderBottom: '1px solid var(--ethds-gray-300)',
          fontFamily: 'var(--ethds-font-sans)',
          fontSize: '0.85rem',
          color: 'var(--ethds-gray-700)',
        }}
      >
        Live template — scroll or drag the bottom-right corner to resize.
      </p>
      <div
        style={{
          height: '32rem',
          overflow: 'auto',
          resize: 'vertical',
          background: 'var(--ethds-white)',
          color: 'var(--ethds-ink)',
          fontFamily: 'var(--ethds-font-sans)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
