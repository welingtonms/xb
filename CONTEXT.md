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
A composed bundle of controllers shared by related **Elements** (e.g. menu-pattern for static menus, menu-button-pattern for disclosure menus, combobox-pattern for **Select**, listbox-pattern for **`xb-list`**).
_Avoid_: Utility module

**Members**:
Child elements managed by a composite host (options, radios, list items). Distinct from the **Virtual focus** roster, built explicitly with `query.filter(...)` (e.g. `isFocusable`, `isNotHidden`) or consumed via `focus.queried`. Host chores (disable sync, selection sync, init fallbacks) iterate **Members**, not the focus roster.
_Avoid_: Using `queried` outside focus code

**Disclosure**:
Open/close lifecycle for a **Panel** anchored to a **Reference** (e.g. dropdown, select popup, date-picker calendar).
_Avoid_: Popover (when you mean the full disclosure lifecycle, not only the Popover API)

**Reference**:
The trigger surface that toggles **Disclosure** (button, input, icon).
_Avoid_: Trigger element (when overloaded with event target)

**Panel**:
The floating surface shown when disclosure is open (menu, listbox popup, calendar grid).
_Avoid_: Floating element (when you mean the positioned surface, not the positioning base class)

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

**Virtual focus**:
DOM focus stays on a composite host (e.g. `xb-radio-group`); the active option is indicated to users and assistive tech without that option receiving `document.activeElement`.
_Avoid_: Roving tabindex (when focus actually moves to each descendant)

**Mount default**:
The value a form control contributes to native `FormData` on first render when no initial attribute (`value`, `initial-value`, `default-value`, `checked`, etc.) is set. Controls differ: e.g. a **Radio group** selects its first option; an empty **Text input** submits an empty string; an unchecked **Checkbox** is omitted; a **Switch** submits `off`.
_Avoid_: Default value (when you mean an explicit HTML attribute), placeholder

**Radio group**:
A single-selection form control (`xb-radio-group`) wrapping mutually exclusive options (`xb-radio`). When no initial value is supplied, the first option is selected at mount (**Mount default**). `form.reset()` restores the attribute state (`value` / `initial-value`) via group re-initialization.
_Avoid_: Toggle group (when you mean optional/deselectable segmented control semantics)

**Form control**:
A form-associated **Element** that participates in native submit, reset, restore, and disabled lifecycles through `ElementInternals`.
_Avoid_: Input wrapper (when you mean the full form contract, not just a shadow input)

**Composite control**:
A host **Element** plus **Members** that share one `name` — e.g. **Select**, **Radio group**, **Toggle group**. The host manages selection and **Disclosure** where applicable; **Members** contribute to `FormData` when active.
_Avoid_: Form group (when you mean a native `<fieldset>`)

**Control surface**:
The shadow `#control` or **Member** element that receives disabled state and ARIA reflection from the host.
_Avoid_: Native input (when the surface is a custom button or option, not an `<input>`)

## Example dialogue

**Dev:** I dropped `<xb-button>` in my page but the browser shows an undefined element.

**Expert:** Did you run **Registration** first? Import `@welingtonms/xb/button/register` (or the form/layout family register path) in a module script before the tag is parsed. The **Tag** only works after `customElements.define`.

**Dev:** I only imported `@welingtonms/xb/button` for the class.

**Expert:** That exports the **Element** class, not registration. Use the `/register` subpath for tags in HTML, or a family `./form/register` when you need the whole form kit.

**Dev:** I nested `<xb-stack paddingless="bottom">` inside `<xb-box borderless="all">` but the inner stack still shows a top border.

**Expert:** **Borderless** and **Paddingless** apply per **Layout primitive** host — they do not inherit from an ancestor. Set suppression on each **Tag** whose chrome you want to remove, or pick a primitive whose default spacing already fits the composition.

**Dev:** After `form.reset()`, my **Radio group** shows the first option selected again — is that correct?

**Expert:** Yes. **Composite controls** re-initialize from their attributes (`value` / `initial-value`) or **Mount default**. The host syncs **Members**; each active **Member** updates its form value. The host itself is not a **Form control** — submission runs through the selected **Member**.

## Flagged (implementation notes)

**Listbox pattern** (`src/controllers/listbox-pattern/`): Wired to **`xb-list`**. Not used by **Select** (combobox). Do not treat as public API outside **`xb-list`**.
