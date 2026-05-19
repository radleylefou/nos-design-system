## Why

The typography system still includes a Bitcount display face and several ad hoc CSS values that no longer match the current NOS component set. The workbench now focuses on enterprise product primitives, dashboard metrics, and tables, so typography should be quieter, more functional, and fully tokenized.

## What Changes

- **BREAKING** Remove the `display` font family token and all Bitcount Single references.
- Revise the primitive font-size scale to mirror mature product design systems: dense labels, UI text, headings, metric values, and rare hero moments.
- Add missing line-height and letter-spacing primitives so components do not need hardcoded typography values.
- Replace documented typography recipes with styles that match the current exported components: controls, helpers, table text, metric text, page headings, and code.
- Replace hardcoded font-size, line-height, letter-spacing, and invalid font-weight references in components and workbench CSS with typography tokens.
- Regenerate `tokens.css` from `tokens.json`.

## Capabilities

### New Capabilities

- `typography-token-system`: Tokenized typography primitives and documented recipes for the current NOS component set.

### Modified Capabilities

<!-- none -->

## Impact

- `tokens/tokens.json` and generated `tokens/tokens.css`
- `workbench/pages/TokensPage.jsx` and related workbench typography documentation
- Component CSS for form controls, metric cards, table primitives, and table examples
- Workbench CSS where typography values are currently hardcoded
- No new dependencies or component APIs
