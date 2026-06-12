# @welingtonms/xb — guide for AI agents

Lit **custom elements** (`xb-*` tags). Framework-agnostic: use HTML/JSX tags, not React components from this package.

## Read first

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Install, tokens, registration, families |
| [CONTEXT.md](./CONTEXT.md) | Domain vocabulary (**Tag**, **Registration**, **Disclosure**, **Modal**, form terms) |
| [docs/adr/](./docs/adr/) | Architecture decisions (do not re-litigate) |
| [Storybook](https://welingtonms.github.io/xb/) | Visual catalog, attributes, examples |

Full import surface: `package.json` → `"exports"`.

## Hard rules

1. **Register before render** — import `@welingtonms/xb/<module>/register` (or a family register) in the app entry *before* any `xb-*` tag is parsed.
2. **Tags, not wrappers** — write `<xb-button>`, not `import { Button } from '@welingtonms/xb/button'` for UI markup (class imports are for subclassing/types only).
3. **Tree-shake registers** — import only the families you use. Avoid `@welingtonms/xb/register` in production (registers everything).
4. **Load theme CSS** — `import '@welingtonms/xb/tokens/css'` plus Nunito Sans (see README).
5. **Transpile in bundled apps** — source uses Lit decorators; Vite/webpack must transpile `@welingtonms/xb` (see [Vite setup](#vite-setup) below).
6. **No invented APIs** — if a tag or attribute is not in Storybook or source JSDoc, do not use it.

## Bootstrap checklist

```js
// src/xb.js — import once from main entry (adjust families to your app)
import '@welingtonms/xb/tokens/css';
import '@welingtonms/xb/layout/register';
import '@welingtonms/xb/form/register';
import '@welingtonms/xb/button/register';
// Date pickers need i18n provider registered:
import '@welingtonms/xb/i18n';
```

```html
<!-- Wrap forms that use date pickers -->
<xb-i18n-provider locale="en-US">
  <form>...</form>
</xb-i18n-provider>
```

## Registration (families)

| Import | Tags registered |
|--------|-----------------|
| `@welingtonms/xb/register` | All rows below + `xb-i18n-provider` (demos only) |
| `@welingtonms/xb/layout/register` | `xb-box`, `xb-center`, `xb-cluster`, `xb-cover`, `xb-frame`, `xb-grid`, `xb-imposter`, `xb-reel`, `xb-sidebar`, `xb-stack`, `xb-switcher` |
| `@welingtonms/xb/form/register` | `xb-button`, `xb-checkbox`, `xb-date-picker`, `xb-date-range-picker`, `xb-radio`, `xb-radio-group`, `xb-select`, `xb-option`, `xb-switch`, `xb-text-input`, `xb-toggle`, `xb-toggle-group` |
| `@welingtonms/xb/table/register` | `xb-table`, `xb-table-body`, `xb-table-cell`, `xb-table-header`, `xb-table-row`, `xb-table-row-expand`, `xb-table-row-select` |
| `@welingtonms/xb/badge/register` | `xb-badge`, `xb-badge-group` |
| `@welingtonms/xb/button/register` | `xb-button` |
| `@welingtonms/xb/dialog/register` | `xb-dialog` |
| `@welingtonms/xb/drawer/register` | `xb-drawer` |
| `@welingtonms/xb/dropdown/register` | `xb-dropdown`, `xb-dropdown-trigger`, `xb-dropdown-menu`, `xb-dropdown-item`, `xb-menu`, `xb-item` |
| `@welingtonms/xb/field/register` | `xb-field` |
| `@welingtonms/xb/icon/register` | `xb-icon` |
| `@welingtonms/xb/list/register` | `xb-list`, `xb-list-item` |
| `@welingtonms/xb/menu/register` | `xb-menu`, `xb-item` |
| `@welingtonms/xb/separator/register` | `xb-separator` |
| `@welingtonms/xb/spinner/register` | `xb-spinner` |
| `@welingtonms/xb/text/register` | `xb-text` |
| `@welingtonms/xb/tooltip/register` | `xb-tooltip` |
| `@welingtonms/xb/top-nav/register` | `xb-top-nav`, `xb-top-nav-item`, `xb-top-nav-menu`, `xb-drawer`, `xb-icon` |
| `@welingtonms/xb/i18n` | `xb-i18n-provider` (side-effect on import) |

Leaf `./<module>/register` paths also exist — see `package.json` `"exports"`.

## Tag catalog (quick reference)

### Actions & chrome

| Tag | Role | Notes |
|-----|------|-------|
| `xb-button` | Button | `variant`, `size`, `type`, `disabled`; slots `leading`, `trailing` |
| `xb-icon` | Icon | `name` (see Storybook icon list) |
| `xb-badge` | Status badge | |
| `xb-badge-group` | Badge cluster | |
| `xb-spinner` | Loading indicator | |
| `xb-text` | Typography | |
| `xb-separator` | Divider | |
| `xb-field` | Label + hint wrapper | Wrap form controls |

### Layout (Every Layout–style)

| Tag | Role |
|-----|------|
| `xb-stack` | Vertical stack |
| `xb-cluster` | Horizontal wrap cluster |
| `xb-box` | Padded box |
| `xb-center` | Center content |
| `xb-cover` | Cover layout |
| `xb-frame` | Aspect-ratio frame |
| `xb-grid` | CSS grid |
| `xb-reel` | Horizontal scroll |
| `xb-sidebar` | Sidebar layout |
| `xb-switcher` | Responsive switcher |
| `xb-imposter` | Overlay positioning |

**Layout attributes:** `borderless`, `paddingless` — side vocabulary (`top`, `bottom`, `all`, `vertical`, …). Apply per layout tag; they do not inherit from ancestors (see CONTEXT.md).

### Form controls

| Tag | Role | Notes |
|-----|------|-------|
| `xb-text-input` | Text field | `name`, `value`, `type`, validation attrs |
| `xb-checkbox` | Checkbox | `name`, `value`, `checked` |
| `xb-switch` | Toggle switch | submits `on`/`off` |
| `xb-radio-group` | Single selection host | **Members:** `xb-radio` |
| `xb-radio` | Radio option | **Member** of group |
| `xb-select` | Combobox select | **Members:** `xb-option`; disclosure-based |
| `xb-option` | Select option | **Member** |
| `xb-toggle-group` | Segmented control | **Members:** `xb-toggle` |
| `xb-toggle` | Segment | **Member** |
| `xb-date-picker` | Date field | Requires `xb-i18n-provider` ancestor |
| `xb-date-range-picker` | Date range | Requires `xb-i18n-provider` |

**Composite controls:** host manages selection/disclosure; **Members** submit to `FormData` when active (ADR 0001). Host is not the form value source.

### Overlays — pick the right adapter

| Need | Tag | Adapter |
|------|-----|---------|
| Blocking modal / confirm | `xb-dialog` | **Modal** (`showModal`) — events `open`, `close` |
| Side panel modal | `xb-drawer` | **Modal** |
| Menu / pick list from trigger | `xb-dropdown` | **Disclosure** — events `expand`, `collapse` |
| Form select popup | `xb-select` | **Disclosure** (combobox) |
| Calendar popup | `xb-date-picker` | **Disclosure** |
| Site nav flyout | `xb-top-nav`, `xb-top-nav-menu` | inline-expandable (hover/accordion) |
| Hover label | `xb-tooltip` | **Floating hint** (not full disclosure) |

See [docs/adr/0002-overlay-adapters.md](./docs/adr/0002-overlay-adapters.md).

### Data display

| Tag | Role |
|-----|------|
| `xb-table` | Table root |
| `xb-table-header` | `<thead>` |
| `xb-table-body` | `<tbody>` |
| `xb-table-row` | Row |
| `xb-table-cell` | Cell |
| `xb-table-row-select` | Row selection |
| `xb-table-row-expand` | Expandable row |
| `xb-list` | Listbox |
| `xb-list-item` | List item |

### Menus

| Tag | Role |
|-----|------|
| `xb-menu` | Static menu |
| `xb-item` | Menu item |
| `xb-dropdown-*` | Disclosure menu kit (see dropdown register) |

## Events

Custom events use plain names (no `xb:` prefix). Vocabulary depends on overlay adapter:

- **Modal** (`xb-dialog`, `xb-drawer`): `open`, `close`
- **Disclosure** (`xb-dropdown`, `xb-select`, `xb-date-picker`): `expand`, `collapse`
- **Form controls:** often re-emit native names like `change`

Listen on the host element: `element.addEventListener('change', …)`.

## Vite setup

Source-first ESM uses Lit decorators. Minimal Vite config (from `scripts/test-consumer.mjs`):

```js
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig( {
	plugins: [
		babel( {
			filter: /\.js$/,
			include: [
				'main.js',
				new RegExp( '/node_modules/@welingtonms/xb/' ),
			],
			babelConfig: {
				plugins: [
					[ '@babel/plugin-proposal-decorators', { version: '2023-05' } ],
				],
			},
		} ),
	],
} );
```

Dev dependencies: `vite-plugin-babel`, `@babel/core`, `@babel/plugin-proposal-decorators`.

Run `yarn verify:consumer` in the xb repo to smoke-test a packed tarball.

## Consumer app integration

Copy the Cursor rule template into your app:

```
examples/cursor-rule/xb-components.mdc  →  .cursor/rules/xb-components.mdc
```

See [examples/cursor-rule/README.md](./examples/cursor-rule/README.md).

## What not to do

- Do not use `@lit/react` or React wrappers — not part of this package.
- Do not import `@welingtonms/xb/register` in production bundles unless prototyping.
- Do not use `xb-dialog` for non-blocking pick lists — use `xb-dropdown` or `xb-select`.
- Do not expect `xb-radio-group` / `xb-select` host values in `FormData` — **Members** submit.
- Do not skip token CSS or Nunito Sans and expect Storybook-matching typography.
