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

**Borderless**:
A reflected attribute on **Layout primitives** that suppresses border on named sides. Value `none` leaves borders intact; other values name sides or compounds (`all`, `top`, `bottom`, `left`, `right`, `vertical`, `horizontal`, or comma-separated pairs such as `top,left`).
_Avoid_: No border class, border-none utility

**Paddingless**:
Same side vocabulary as **Borderless**, but suppresses padding instead of border on **Layout primitives**.
_Avoid_: No padding class, p-0 utility

**Event**:
A custom DOM event dispatched from an **Element** host. Names are host-scoped plain verbs (`expand`, `change`, `interact-out`) — no `xb:` prefix. The `xb` prefix is reserved for **Tags** and **Tokens**, not events. Form controls that wrap native inputs re-emit native event names (e.g. `change`) so consumers get a familiar API. Hyphenated compound verbs are fine when the action is genuinely compound (`select-all`, `interact-out`).
_Avoid_: `xb:dropdown-expand`, namespaced event strings

## Example dialogue

**Dev:** I dropped `<xb-button>` in my page but the browser shows an undefined element.

**Expert:** Did you run **Registration** first? Import `@welingtonms/xb/button/register` (or the form/layout family register path) in a module script before the tag is parsed. The **Tag** only works after `customElements.define`.

**Dev:** I only imported `@welingtonms/xb/button` for the class.

**Expert:** That exports the **Element** class, not registration. Use the `/register` subpath for tags in HTML, or a family `./form/register` when you need the whole form kit.

**Dev:** I nested `<xb-stack paddingless="bottom">` inside `<xb-box borderless="all">` but the inner stack still shows a top border.

**Expert:** **Borderless** and **Paddingless** apply per **Layout primitive** host — they do not inherit from an ancestor. Set suppression on each **Tag** whose chrome you want to remove, or pick a primitive whose default spacing already fits the composition.

## Flagged (implementation notes)

**Listbox pattern** (`src/controllers/listbox-pattern/`): Kept intentionally for future Select/deepening work (Candidate C). Not wired to any **Element** today; do not treat as public API.
