# XB component library

Lit-based custom elements (`xb-*` tags) for framework-agnostic UIs. Consumers register tags via ESM side-effect imports, then use standard HTML markup.

## Language

**Tag**:
The `xb-*` name used in HTML markup (e.g. `xb-button`). Meaningful only after **Registration** has run for that tag.
_Avoid_: Component (when you mean the DOM tag), widget

**Element**:
A Lit custom element class (subclass of `XBElement`). Optional to import when subclassing, typing, or Storybook; not required to render tags in HTML.
_Avoid_: Component (React sense)

**Registration**:
A side-effect ESM import that calls `customElements.define` (via `*.define.js` or `XBElement.define()`). Must run before the corresponding **Tag** appears in the document.
_Avoid_: Mount, render

**Token**:
A design token exposed as `--xb-*` CSS variables and/or JS values from the theme build (`xb.theme.js`).
_Avoid_: Theme object (when you mean a single variable)

**Controller**:
A Lit `ReactiveController` in `src/controllers/` composed into **Elements** for behavior (focus, keyboard, boundaries, etc.).
_Avoid_: Mixin (when the code is a controller, not a class mixin)

**Pattern**:
A composed bundle of controllers shared by related **Elements** (e.g. menu-pattern for menus).
_Avoid_: Utility module

**Layout primitive**:
An Every Layout–style layout **Element** (`xb-stack`, `xb-cluster`, `xb-box`, etc.) from the layout family.
_Avoid_: Layout component, wrapper div

## Example dialogue

**Dev:** I dropped `<xb-button>` in my page but the browser shows an undefined element.

**Expert:** Did you run **Registration** first? Import `@welingtonms/xb/button/register` (or the form/layout family register path) in a module script before the tag is parsed. The **Tag** only works after `customElements.define`.

**Dev:** I only imported `@welingtonms/xb/button` for the class.

**Expert:** That exports the **Element** class, not registration. Use the `/register` subpath for tags in HTML, or a family `./form/register` when you need the whole form kit.

## Flagged (implementation notes)

**Listbox pattern** (`src/controllers/listbox-pattern/`): Kept intentionally for future Select/deepening work (Candidate C). Not wired to any **Element** today; do not treat as public API.
