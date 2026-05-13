## Context

The NOS token system uses a single source of truth: `tokens.json` → `npm run tokens` → `tokens.css`. All components reference `--color-brand-*` custom properties, so updating the primitive values in tokens.json and regenerating CSS is sufficient for full cascade.

The workbench chrome is intentionally decoupled (vars frozen in `.wb-app` in `App.css`) and must not be affected.

## Goals / Non-Goals

**Goals:**
- Replace brand color ramp with Figma-supplied values
- Update derived tokens that embed old brand hex values (border alpha rgba, shadow focus)
- Verify cascade works — components pick up new values without code changes

**Non-Goals:**
- Changing any component `.jsx` or `.css` files
- Touching neutral, semantic, dataviz, or white-alpha scales
- Modifying workbench chrome vars

## Decisions

### D1: Interpolate brand-300
Figma exported 50/100/200/400/500/600/700/800/900/950 — stop 300 is missing. Interpolate by averaging 200 and 400 RGB channels:
- brand-200: `#D8D9FF` → RGB(216, 217, 255)
- brand-400: `#9DA0FC` → RGB(157, 160, 252)
- brand-300 = avg → RGB(186, 188, 253) → `#BABCFD`

### D2: Update border.brand-alpha rgba base
`border.brand-alpha` tokens use `rgba(115, 106, 227, …)` (old brand-500 `#736AE3`). New brand-500 is `#6A6CE3` → `rgba(106, 108, 227, …)`. Update all four alpha stops.

### D3: Update shadow.focus hex
`shadow.focus` embeds the brand-600 hex directly. Old: `#605DD0`. New: `#5D58E2`. Update the token value.

### D4: No component edits needed
Pure token-layer change. CSS custom properties cascade automatically once `tokens.css` is regenerated.

## Risks / Trade-offs

- **Slight hue shift** — new 500–700 range is slightly more blue-violet vs previous more purple. Components using brand colors (Button primary, focus rings, StatusPill reviewed/approved, PageTabs active) will all shift. This is intentional and matches Figma.
- **border.brand-alpha** — if any component hardcoded the old rgba value rather than using the token, it won't update. → Mitigation: verify with a grep after regeneration.

## Open Questions

None — values fully specified by user.
