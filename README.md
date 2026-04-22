# NOS Design System

Shared component and token library for Nymbl's NOS suite of internal tools. Plus a workbench for authoring, review, and documentation.

## Quick start

```bash
npm install
npm run dev
```

The workbench opens at http://localhost:5173.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run the workbench in dev mode. |
| `npm run build` | Regenerate `tokens.css` and produce a static build in `dist/`. |
| `npm run tokens` | Regenerate `tokens/tokens.css` from `tokens/tokens.json`. |
| `npm run preview` | Preview the production build locally. |

## Structure

```
components/   ← The product. Import from here in downstream NOS apps.
tokens/       ← tokens.json is source of truth; tokens.css is generated.
rules/        ← Design principles & composition guidance.
workbench/    ← React app for browsing and editing the system.
```

## Consuming this library in an NOS app

```jsx
import { Button, Card, Input, Badge } from 'nos-design-system/components';
import 'nos-design-system/tokens/tokens.css';

<Button variant="primary">Save</Button>
```

## Contributing a new component

1. Add `components/MyComponent.jsx` (+ colocated `.css`) following the conventions in existing components.
2. Export it from `components/index.js`.
3. Add it to `workbench/nav.js` under the right category.
4. Add a demo block to `workbench/pages/ComponentsPage.jsx`.
5. Review against `rules/rules.md`.

See [CLAUDE.md](./CLAUDE.md) for the authoritative project guide and [rules/rules.md](./rules/rules.md) for design rules.
