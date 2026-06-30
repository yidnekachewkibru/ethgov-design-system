/**
 * @ethds/tokens — zero-dependency build.
 *
 * Reads the DTCG-format token sources in ../tokens/*.json, resolves
 * {group.token} references, and emits to ../dist/:
 *   - tokens.css      CSS custom properties (+ reduced-motion block)
 *   - tokens.js       ESM module: { tokens, cssVars } + default
 *   - tokens.d.ts     TypeScript declarations
 *   - tailwind.cjs    Tailwind preset
 *   - tokens.json     resolved nested token values
 *
 * No third-party dependencies. Importable (functions are exported) so the
 * Vitest suite can assert on the generated output without a prior build.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_DIR = join(__dirname, '..', 'tokens');
const DIST_DIR = join(__dirname, '..', 'dist');

/** Deep-merge all token JSON files into a single tree. */
export function loadSources() {
  const tree = {};
  for (const file of readdirSync(TOKENS_DIR).filter((f) => f.endsWith('.json')).sort()) {
    deepMerge(tree, JSON.parse(readFileSync(join(TOKENS_DIR, file), 'utf8')));
  }
  return tree;
}

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && !('$value' in v)) {
      target[k] = target[k] || {};
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

const isToken = (node) => node && typeof node === 'object' && '$value' in node;
const isRef = (val) => typeof val === 'string' && /^\{[^}]+\}$/.test(val);

/** Look up a token node by dot-path (e.g. "color.blue.600"). */
function lookup(tree, path) {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), tree);
}

/** Resolve a token's $value, following {refs} (with cycle protection). */
function resolveValue(tree, node, seen = new Set()) {
  let val = node.$value;
  while (isRef(val)) {
    const path = val.slice(1, -1);
    if (seen.has(path)) throw new Error(`Cyclic token reference at {${path}}`);
    seen.add(path);
    const ref = lookup(tree, path);
    if (!isToken(ref)) throw new Error(`Unresolved token reference {${path}}`);
    val = ref.$value;
  }
  return val;
}

/** Walk the tree, yielding { segments, type, raw, value } for each leaf token. */
export function collectTokens(tree) {
  const out = [];
  (function walk(node, segments) {
    if (isToken(node)) {
      out.push({
        segments,
        type: node.$type,
        raw: node.$value,
        value: resolveValue(tree, node),
      });
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) walk(v, [...segments, k]);
    }
  })(tree, []);
  return out;
}

/**
 * CSS variable name for a token path — matches docs/brand/assets/ethds-brand.css.
 * `raw` (the unresolved value) distinguishes palette (literal) from semantic
 * (reference) colours.
 */
export function cssVarName(segments, raw) {
  const [group, ...rest] = segments;
  const last = segments[segments.length - 1];
  let name;
  switch (group) {
    case 'color':
      name = isRef(raw) ? `color-${rest.join('-')}` : rest.join('-');
      break;
    case 'font':
      if (segments[1] === 'family') name = `font-${last}`;
      else if (segments[1] === 'size') name = `text-${last}`;
      else if (segments[1] === 'leading') name = `leading-${last}`;
      else if (segments[1] === 'weight') name = `font-${last}`;
      else name = segments.join('-');
      break;
    case 'motion':
      if (segments[1] === 'duration') name = `motion-${last}`;
      else if (segments[1] === 'ease') name = `ease-${last}`;
      else name = segments.join('-');
      break;
    case 'icon':
      name = `icon-${last}`;
      break;
    default:
      name = segments.join('-');
  }
  return `--ethds-${name}`;
}

const REDUCED_MOTION = `
/* Honour the citizen's reduced-motion preference (required). */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export function toCSS(tokens) {
  const lines = tokens.map((t) => `  ${cssVarName(t.segments, t.raw)}: ${t.value};`);
  return `/* @ethds/tokens — generated. Do not edit by hand. */\n:root {\n${lines.join('\n')}\n}\n${REDUCED_MOTION}`;
}

/** Build a nested object of resolved values (numbers kept as numbers). */
export function toNested(tokens) {
  const root = {};
  for (const t of tokens) {
    let node = root;
    t.segments.forEach((seg, i) => {
      if (i === t.segments.length - 1) {
        node[seg] = t.type === 'number' ? Number(t.value) : t.value;
      } else {
        node[seg] = node[seg] || {};
        node = node[seg];
      }
    });
  }
  return root;
}

export function toCssVarsMap(tokens) {
  const map = {};
  for (const t of tokens) map[cssVarName(t.segments, t.raw)] = String(t.value);
  return map;
}

export function toJS(tokens) {
  const nested = toNested(tokens);
  const cssVars = toCssVarsMap(tokens);
  return (
    `// @ethds/tokens — generated. Do not edit by hand.\n` +
    `export const tokens = ${JSON.stringify(nested, null, 2)};\n\n` +
    `export const cssVars = ${JSON.stringify(cssVars, null, 2)};\n\n` +
    `export default tokens;\n`
  );
}

function tsType(value, indent) {
  if (value && typeof value === 'object') {
    const pad = '  '.repeat(indent);
    const inner = Object.entries(value)
      .map(([k, v]) => `${pad}  ${JSON.stringify(k)}: ${tsType(v, indent + 1)};`)
      .join('\n');
    return `{\n${inner}\n${pad}}`;
  }
  return typeof value === 'number' ? 'number' : 'string';
}

export function toDTS(tokens) {
  const nested = toNested(tokens);
  return (
    `// @ethds/tokens — generated. Do not edit by hand.\n` +
    `export declare const tokens: ${tsType(nested, 0)};\n` +
    `export declare const cssVars: Record<string, string>;\n` +
    `export default tokens;\n`
  );
}

export function toTailwind(tokens) {
  const n = toNested(tokens);
  const c = n.color;
  // Build the Tailwind colour object from palette scales + semantic roles.
  const palette = {};
  for (const [k, v] of Object.entries(c)) {
    if (v && typeof v === 'object') palette[k] = v;
    else palette[k] = v; // singletons: white, ink, black
  }
  const fontSize = Object.fromEntries(
    Object.entries(n.font.size).map(([k, v]) => [k, [v, { lineHeight: String(n.font.leading.relaxed) }]]),
  );
  const preset = {
    theme: {
      extend: {
        colors: {
          ...palette,
          primary: c.primary,
          interactive: c.interactive,
          'interactive-hover': c['interactive-hover'],
          focus: c.focus,
          border: c.border,
          divider: c.divider,
          success: c.success,
          warning: c.warning,
          error: c.error,
          info: c.info,
        },
        fontFamily: {
          sans: n.font.family.sans,
          ethiopic: n.font.family.ethiopic,
          mono: n.font.family.mono,
        },
        fontSize,
        fontWeight: {
          regular: String(n.font.weight.regular),
          medium: String(n.font.weight.medium),
          bold: String(n.font.weight.bold),
        },
        spacing: n.space,
        borderRadius: n.radius,
        boxShadow: n.elevation,
        transitionDuration: n.motion.duration,
        transitionTimingFunction: n.motion.ease,
      },
    },
  };
  return (
    `// @ethds/tokens — generated Tailwind preset. Do not edit by hand.\n` +
    `module.exports = ${JSON.stringify(preset, null, 2)};\n`
  );
}

export function build() {
  const tree = loadSources();
  const tokens = collectTokens(tree);
  mkdirSync(DIST_DIR, { recursive: true });
  writeFileSync(join(DIST_DIR, 'tokens.css'), toCSS(tokens));
  writeFileSync(join(DIST_DIR, 'tokens.js'), toJS(tokens));
  writeFileSync(join(DIST_DIR, 'tokens.d.ts'), toDTS(tokens));
  writeFileSync(join(DIST_DIR, 'tailwind.cjs'), toTailwind(tokens));
  writeFileSync(join(DIST_DIR, 'tokens.json'), JSON.stringify(toNested(tokens), null, 2) + '\n');
  return { tree, tokens, count: tokens.length };
}

// Run only when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { count } = build();
  console.log(`@ethds/tokens: built ${count} tokens → dist/`);
}
