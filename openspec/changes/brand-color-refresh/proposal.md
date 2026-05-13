## Why

The Figma source of truth has been updated with a refined brand purple scale — slightly brighter mids and deeper darks compared to the current tokens. Syncing now keeps the design system aligned with the canonical Figma palette before more components are built on top of the old values.

## What Changes

- **Update `tokens/tokens.json`** — replace all brand color stops (50–950) with new Figma values; interpolate brand-300 (not in Figma export)
- **Update `border.brand-alpha`** — rgba base currently uses old brand-500 (`rgba(115, 106, 227, …)`); update to new brand-500 (`rgba(106, 108, 227, …)`)
- **Update `shadow.focus`** — currently references old brand-600 hex; update to new brand-600 (`#5D58E2`)
- **Regenerate `tokens/tokens.css`** via `npm run tokens` — all `--color-brand-*` custom properties update automatically; no component code changes required

## Capabilities

### New Capabilities

### Modified Capabilities

- `brand-color-scale`: Brand primitive ramp values changing from old violet-purple to refined Figma palette

## Impact

- `tokens/tokens.json` — brand stops + border.brand-alpha rgba + shadow.focus hex
- `tokens/tokens.css` — regenerated; all `--color-brand-*` vars cascade to every component automatically
- No component `.jsx` or `.css` files need editing — all use CSS custom properties
- Workbench chrome is frozen (`--wb-*` vars hardcoded in App.css) — unaffected by this change
