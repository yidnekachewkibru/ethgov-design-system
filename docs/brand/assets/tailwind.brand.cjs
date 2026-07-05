/**
 * ETHDS Brand — Tailwind theme
 * Canonical reference Tailwind theme for the ETHDS brand system.
 * Values documented in docs/brand/. The canonical build is generated from
 * the @ethds/tokens JSON source; this file is directly usable:
 *
 *   // tailwind.config.cjs
 *   const ethds = require('./path/to/tailwind.brand.cjs');
 *   module.exports = { theme: { extend: ethds.theme.extend } };
 *
 * Colour pairings used for text/UI are verified WCAG 2.2 AA — see
 * docs/brand/accessibility-analysis.md.
 */

const colors = {
  blue: {
    50: '#EAF1FB', 100: '#CFE0F6', 200: '#A6C6EE', 300: '#6F9FE0',
    400: '#3E78CF', 500: '#1F5CB8', 600: '#194B9C', 700: '#153D80',
    800: '#102E60', 900: '#0B1F40',
  },
  green: { 50: '#E9F5EC', 500: '#1E8E3E', 600: '#177D34', 700: '#0F5F27' },
  yellow: { 50: '#FEF7E0', 400: '#F2C200', 500: '#D9A400', 700: '#8A6500' },
  red: { 50: '#FDECEC', 500: '#D32F2F', 600: '#C1121F', 700: '#9B0F18' },
  gray: {
    50: '#F6F7F8', 100: '#ECEEF1', 200: '#D9DDE2', 300: '#BEC4CC',
    400: '#98A0AB', 500: '#6B7280', 600: '#4B515A', 700: '#363B42',
    800: '#23272C', 900: '#15181C',
  },
  ink: '#1A1D21',
  black: '#0A0C0E',
  white: '#FFFFFF',
};

module.exports = {
  theme: {
    extend: {
      colors: {
        ...colors,
        // Semantic roles
        primary: colors.blue[600],
        interactive: colors.blue[500],
        'interactive-hover': colors.blue[700],
        focus: colors.blue[600],
        border: colors.gray[500],
        divider: colors.gray[200],
        success: colors.green[600],
        warning: colors.yellow[400],
        error: colors.red[600],
        info: colors.blue[600],
      },
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans Ethiopic', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'Abyssinica SIL', 'Noto Sans', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Cascadia Code', 'Roboto Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.375rem', { lineHeight: '1.4' }],
        '2xl': ['1.75rem', { lineHeight: '1.3' }],
        '3xl': ['2.25rem', { lineHeight: '1.25' }],
        '4xl': ['3rem', { lineHeight: '1.2' }],
      },
      fontWeight: { regular: '400', medium: '500', bold: '700' },
      spacing: {
        0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
        5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem',
        16: '4rem', 20: '5rem', 24: '6rem',
      },
      borderRadius: {
        none: '0', sm: '0.125rem', md: '0.25rem', lg: '0.5rem',
        xl: '0.75rem', full: '9999px',
      },
      boxShadow: {
        none: 'none',
        1: '0 1px 2px rgba(10,12,14,0.08), 0 1px 1px rgba(10,12,14,0.04)',
        2: '0 2px 4px rgba(10,12,14,0.10), 0 1px 2px rgba(10,12,14,0.06)',
        3: '0 6px 12px rgba(10,12,14,0.12), 0 2px 4px rgba(10,12,14,0.08)',
        4: '0 12px 24px rgba(10,12,14,0.16), 0 4px 8px rgba(10,12,14,0.10)',
      },
      transitionDuration: {
        instant: '50ms', fast: '100ms', base: '200ms', slow: '300ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
};
