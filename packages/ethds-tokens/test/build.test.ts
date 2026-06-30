import { describe, it, expect } from 'vitest';
import {
  loadSources,
  collectTokens,
  toCSS,
  toNested,
  toTailwind,
  toCssVarsMap,
  cssVarName,
} from '../scripts/build.mjs';

const tree = loadSources();
const tokens = collectTokens(tree);

describe('token sources', () => {
  it('loads and collects tokens', () => {
    expect(tokens.length).toBeGreaterThan(40);
  });

  it('every token has a type and a resolved value', () => {
    for (const t of tokens) {
      expect(t.type, `type for ${t.segments.join('.')}`).toBeTruthy();
      expect(t.value, `value for ${t.segments.join('.')}`).toBeDefined();
    }
  });
});

describe('reference resolution', () => {
  it('resolves semantic references to concrete values (no dangling {refs})', () => {
    for (const t of tokens) {
      expect(String(t.value)).not.toMatch(/\{[^}]+\}/);
    }
  });

  it('maps the primary semantic colour to Ethiopian Star Blue', () => {
    const nested = toNested(tokens);
    expect(nested.color.primary).toBe('#194B9C');
    expect(nested.color.primary).toBe(nested.color.blue['600']);
  });
});

describe('CSS output', () => {
  const css = toCSS(tokens);

  it('contains the Star Blue palette variable', () => {
    expect(css).toContain('--ethds-blue-600: #194B9C;');
  });

  it('contains the semantic primary variable referencing the same value', () => {
    expect(css).toContain('--ethds-color-primary: #194B9C;');
  });

  it('uses brand-aligned variable names', () => {
    expect(css).toContain('--ethds-space-4: 1rem;');
    expect(css).toContain('--ethds-radius-md: 0.25rem;');
    expect(css).toContain('--ethds-text-base: 1rem;');
    expect(css).toContain('--ethds-motion-base: 200ms;');
    expect(css).toContain('--ethds-ease-standard: cubic-bezier(0.2, 0, 0, 1);');
  });

  it('includes a prefers-reduced-motion block', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });
});

describe('variable naming', () => {
  it('palette colours omit the color- prefix; semantic colours keep it', () => {
    expect(cssVarName(['color', 'blue', '600'], '#194B9C')).toBe('--ethds-blue-600');
    expect(cssVarName(['color', 'primary'], '{color.blue.600}')).toBe('--ethds-color-primary');
    expect(cssVarName(['color', 'white'], '#FFFFFF')).toBe('--ethds-white');
  });
});

describe('Tailwind preset', () => {
  const preset = toTailwind(tokens);

  it('is valid JS that exports a theme.extend object', () => {
    expect(preset).toContain('module.exports =');
    expect(preset).toContain('"primary": "#194B9C"');
    expect(preset).toContain('"blue":');
  });
});

describe('CSS vars map', () => {
  it('produces a flat name → value map', () => {
    const map = toCssVarsMap(tokens);
    expect(map['--ethds-blue-600']).toBe('#194B9C');
    expect(map['--ethds-gray-500']).toBe('#6B7280');
  });
});
