# @welingtonms/xb

Lit-based **custom elements** (`xb-*` tags) for framework-agnostic UIs. Use them in bundled apps or plain HTML after **registration**.

Domain vocabulary: [CONTEXT.md](./CONTEXT.md). Architecture decisions: [docs/adr/](./docs/adr/).

## Install

```bash
yarn add @welingtonms/xb
# or
npm install @welingtonms/xb
```

Run `yarn build` in this repo (or rely on a published package that includes `dist/`) so design-token CSS is available.

## Quick start (custom elements)

**1. Load theme CSS** (design tokens as `--xb-*` variables):

```html
<link rel="stylesheet" href="/node_modules/@welingtonms/xb/dist/tokens/variables.css" />
```

**2. Load typography** — tokens reference **Nunito Sans**; without it, components fall back to system fonts and will not match Storybook. Add to your document `<head>` (same as [`.storybook/preview-head.html`](.storybook/preview-head.html)):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap"
	rel="stylesheet"
/>
```

Optional base page styles so body text uses token defaults:

```html
<style>
	body {
		font-family: var( --xb-font-family-default );
		font-weight: var( --xb-font-weight-regular );
		font-size: var( --xb-font-size-base );
		line-height: var( --xb-line-height-default );
		color: rgba( var( --xb-color-gray-700 ), 1 );
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
```

Self-host or use another CDN if you prefer; weights **300, 400, 600, 700** must be available for `--xb-font-*` tokens to resolve correctly.

**3. Register** the elements you need, then **4. use tags** in markup.

```html
<script type="module">
	import '@welingtonms/xb/button/register';
</script>

<xb-button variant="primary">Save</xb-button>
```

Registration must run **before** the browser upgrades unknown tags. Import `/register` subpaths in the same module graph as your page (or earlier in document order).

## Bundled apps (Vite, webpack, Lit, etc.)

```js
import '@welingtonms/xb/tokens/css';
import '@welingtonms/xb/button/register';
// import '@welingtonms/xb/form/register';  // whole form kit
// import '@welingtonms/xb/table/register';  // table family (7 tags)
// import '@welingtonms/xb/register';        // all families — demos only; not tree-shakeable
```

```html
<xb-button>Click</xb-button>
```

- **Classes** (subclassing, types): `import { Button } from '@welingtonms/xb/button'`
- **Tags only** (typical): `import '@welingtonms/xb/button/register'`
- **Tree-shaking**: prefer per-element or per-family `/register` imports instead of importing many families you do not use. Avoid `@welingtonms/xb/register` in production — it registers every published family.

### Families

| Import                            | Registers                                       |
| --------------------------------- | ----------------------------------------------- |
| `@welingtonms/xb/register`        | All families below + `xb-i18n-provider` (demos) |
| `@welingtonms/xb/layout/register` | Layout primitives (`xb-stack`, `xb-cluster`, …) |
| `@welingtonms/xb/form/register`   | Form controls (`xb-checkbox`, `xb-select`, …)   |
| `@welingtonms/xb/table/register`  | Table kit (`xb-table`, `xb-table-row`, …)       |
| `@welingtonms/xb/badge/register`  | `xb-badge`, `xb-badge-group`                    |

Leaf controls also expose `./button/register`, `./dropdown/register`, `./dialog/register`, etc. See `package.json` `"exports"`.

### Tokens (JS)

```js
import theme from '@welingtonms/xb/tokens';
```

## Plain HTML (no bundler)

Serve files over HTTP (not `file://`). Use an **import map** so bare specifiers (`lit`, …) resolve:

```html
<link rel="stylesheet" href="./node_modules/@welingtonms/xb/dist/tokens/variables.css" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap"
	rel="stylesheet"
/>

<script type="importmap">
	{
		"imports": {
			"lit": "./node_modules/lit/index.js",
			"lit/": "./node_modules/lit/",
			"@welingtonms/xb/": "./node_modules/@welingtonms/xb/"
		}
	}
</script>

<script type="module">
	import '@welingtonms/xb/button/register';
</script>

<xb-button>Hello</xb-button>
```

Adjust paths to your install layout. ESM + dependencies are required; there is no single-script IIFE build in v1.

## Storybook (development)

```bash
yarn install
yarn storybook
```

Component docs are maintained in Storybook locally (`yarn build:docs` → `storybook-static/`, gitignored). Architecture decisions live in [`docs/adr/`](./docs/adr/) and are shipped in the npm package. On push to `main` or `alpha`, CI builds Storybook and deploys to [GitHub Pages](https://welingtonms.github.io/xb/).

## Base classes

- `@welingtonms/xb/xb-element` — root element base
- `@welingtonms/xb/floating-element` — floating UI base (no tag)
- `@welingtonms/xb/disclosure-floating-element` — Reference + Panel disclosure base + `disclosureStyles` presets (no tag)
- `@welingtonms/xb/form-element` — form-associated base; exports `FormElement`, `FormMemberMixin` (no tag)

## Develop this repo

```bash
yarn install
yarn build    # tokens → dist/tokens/ + themes; icons
yarn storybook
```

### Pre-publish smoke test (local only)

Pack the library, install the tarball in a throwaway Vite app, and run `vite build`:

```bash
yarn verify:consumer
```

This generates `examples/vite-consumer/` (gitignored — not pushed). The consumer uses Babel to transpile Lit decorators from the installed tarball (same as a real Vite app would need for source-first ESM).

To browse the result:

```bash
cd examples/vite-consumer && npm run dev
```

## References

- [Lit](https://lit.dev/)
- [Custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
