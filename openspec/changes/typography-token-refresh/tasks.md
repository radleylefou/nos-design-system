## 1. Token primitives

- [x] 1.1 Remove `font-family.display` from `tokens/tokens.json`
- [x] 1.2 Update font-size tokens to include 2xs, xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl with revised values
- [x] 1.3 Add line-height tokens: none, display, tight, snug, normal, relaxed
- [x] 1.4 Add letter-spacing tokens: normal, caps, wide
- [x] 1.5 Regenerate `tokens/tokens.css`

## 2. Typography documentation

- [x] 2.1 Remove Bitcount/display font role from Tokens page documentation
- [x] 2.2 Replace type-style recipes with styles mapped to current components
- [x] 2.3 Update Tokens page copy to describe sans + mono only

## 3. Component CSS cleanup

- [x] 3.1 Replace hardcoded metric value font sizes with `--font-size-3xl`
- [x] 3.2 Replace hardcoded dense label font sizes with `--font-size-2xs`
- [x] 3.3 Replace hardcoded typography line-heights with line-height tokens
- [x] 3.4 Replace hardcoded typography letter-spacing values with letter-spacing tokens

## 4. Workbench CSS cleanup

- [x] 4.1 Replace visible workbench hardcoded typography sizes and letter-spacing values with tokens
- [x] 4.2 Fix invalid `--font-weight-normal` usage
- [x] 4.3 Ensure no Bitcount or `font-family-display` references remain

## 5. Verification

- [x] 5.1 Run `openspec validate typography-token-refresh`
- [x] 5.2 Run `npm run build`
