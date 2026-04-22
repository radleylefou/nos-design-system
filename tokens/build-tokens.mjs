// Regenerates tokens.css from tokens.json.
// Run with: npm run tokens
//
// Supports W3C DTCG format — every token leaf has a "$value" and "$type".
// Non-DTCG plain values are also accepted for backwards compatibility.
//
// CSS variable name rules:
//   - Nested keys are joined with hyphens:  color.brand.600  →  --color-brand-600
//   - "semantic" top-level prefix is dropped:  semantic.fg.muted  →  --fg-muted
//   - "typography" top-level prefix is dropped:  typography.font-size.sm  →  --font-size-sm
//   - "$"-prefixed keys are ignored (DTCG metadata).
//   - {dot.path} references in $value strings are resolved to var(--...).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(resolve(__dirname, 'tokens.json'), 'utf8'));

// Top-level group names to strip from the CSS variable prefix.
const DROPPED_PREFIXES = new Set(['semantic', 'typography']);

const toVarName = (path) => {
  const cleaned = DROPPED_PREFIXES.has(path[0]) ? path.slice(1) : path;
  return '--' + cleaned.join('-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

// Returns true if the node is a DTCG token leaf ({ $value, $type }).
const isDtcgToken = (node) =>
  node !== null &&
  typeof node === 'object' &&
  !Array.isArray(node) &&
  '$value' in node;

const flatten = (node, path = [], out = []) => {
  if (isDtcgToken(node)) {
    // DTCG leaf — use $value; ignore $type and other $ keys.
    out.push({ path, value: node.$value });
  } else if (node !== null && typeof node === 'object' && !Array.isArray(node)) {
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) continue; // skip DTCG metadata at group level
      flatten(value, [...path, key], out);
    }
  } else {
    // Plain (non-DTCG) scalar value.
    out.push({ path, value: node });
  }
  return out;
};

const resolveRefs = (value) => {
  if (typeof value !== 'string') return String(value);
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    const refPath = ref.split('.');
    return `var(${toVarName(refPath)})`;
  });
};

const entries = flatten(tokens);

const lines = [
  '/* Auto-generated from tokens.json. Do not edit directly — edit tokens.json and run `npm run tokens`. */',
  '',
  ':root {',
  ...entries.map(({ path, value }) => `  ${toVarName(path)}: ${resolveRefs(value)};`),
  '}',
  '',
];

writeFileSync(resolve(__dirname, 'tokens.css'), lines.join('\n'));
console.log(`✓ Wrote ${entries.length} tokens to tokens.css`);
