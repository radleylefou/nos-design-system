## 1. Update tokens.json

- [ ] 1.1 Replace brand color stops 50–950 in `tokens/tokens.json` with new Figma values (300 = #B5B9FC)
- [ ] 1.2 Update `border.brand-alpha` rgba base from `rgba(115, 106, 227, …)` to `rgba(106, 108, 227, …)` for all four alpha stops
- [ ] 1.3 Update `shadow.focus` token — replace old brand-600 hex with `#5D58E2`

## 2. Regenerate tokens.css

- [ ] 2.1 Run `npm run tokens` to regenerate `tokens/tokens.css`
- [ ] 2.2 Verify `--color-brand-500` in the output equals `#6A6CE3`

## 3. Verify cascade

- [ ] 3.1 Check no component file hardcodes old brand hex values (grep for `#736AE3`, `#605DD0`, `#4838B8`)
- [ ] 3.2 Confirm workbench renders correctly — Button primary, focus rings, PageTabs active state, StatusPill reviewed/approved all reflect new brand
