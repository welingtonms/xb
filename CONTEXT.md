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

**Modal**:
A **Top layer** surface that blocks interaction with the page behind it, using native `<dialog showModal>` — backdrop and focus trap owned by the platform (`xb-dialog`, `xb-drawer`).
_Avoid_: Disclosure (when you mean Reference + **Panel** popover, not a blocking dialog)

**Top layer**:
The browser painting plane above the document (modal top layer, popover top layer, etc.) where overlay **Elements** render.
_Avoid_: z-index stack (when you mean CSS stacking, not the platform top layer)

**Overlay adapter**:
The implementation choice for putting an **Element** on the **Top layer**: `native-dialog` (**Modal**), `popover-floating` (**Disclosure**), or `inline-expandable` (accordion / hover flyout, e.g. **TopNav**).
_Avoid_: Overlay component, portal wrapper

**Floating hint**:
A transient positioned surface that is neither **Modal** nor full **Disclosure** — typically hover- or focus-triggered, with no Reference toggle lifecycle (e.g. **Tooltip**).
_Avoid_: Popover (when you mean **Disclosure** or the Popover API generically)

**Reference**:
The trigger surface that toggles **Disclosure** (button, input, icon).
_Avoid_: Trigger element (when overloaded with event target)

**Panel**:
The floating surface shown when disclosure is open (menu, listbox popup, calendar grid).
_Avoid_: Floating element (when you mean the positioned surface, not the positioning base class)

**Style preset**:
A factory returning Lit `CSSResult[]` for a recurring style composition shared across **Elements** (e.g. **Disclosure** host vars plus **Panel** positioning).
_Avoid_: Style mixin, shared CSS helper

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
A custom DOM event dispatched from an **Element** host. Names are host-scoped plain verbs (`expand`, `change`, `interact-out`) — no `xb:` prefix. The `xb` prefix is reserved for **Tags** and **Tokens**, not events. Form controls that wrap native inputs re-emit native event names (e.g. `change`) so consumers get a familiar API. Hyphenated compound verbs are fine when the action is genuinely compound (`select-all`, `interact-out`). **Modal** **Elements** emit `open` and `close`; **Disclosure** **Elements** emit `expand` and `collapse` — same lifecycle idea, different vocabulary per **Overlay adapter**.
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

**Dev:** Should my settings screen use `xb-dialog`, `xb-dropdown`, or `xb-top-nav-menu` for a pick list?

**Expert:** Pick the **Overlay adapter** for the interaction. Blocking confirmation with backdrop → **Modal** (`xb-dialog`). **Reference** toggles a floating **Panel** (form field, toolbar) → **Disclosure** (`xb-dropdown`, `xb-select`). Site chrome with hover flyout or mobile accordion → inline-expandable **TopNav**. A hover label with no toggle → **Floating hint** (`xb-tooltip`), not **Disclosure**.

**Dev:** Why does my dialog fire `close` but the dropdown fires `collapse`?

**Expert:** Different **Overlay adapter**, different **Event** names — both mean the surface closed. **Modal** aligns with native dialog vocabulary; **Disclosure** keeps `expand` / `collapse` for **Reference** + **Panel** lifecycle. Listen for the event your **Tag** documents, not a single global overlay event.

## Decisions

Recorded architecture decisions (also shipped in the npm package under `docs/adr/`):

- [0001 — Composite controls submit via Members, not host](./docs/adr/0001-composite-form-members-submit.md)
- [0002 — Three overlay adapters, no unified TopLayer class](./docs/adr/0002-overlay-adapters.md)

## Flagged (implementation notes)

**Listbox pattern** (`src/controllers/listbox-pattern/`): Wired to **`xb-list`**. Not used by **Select** (combobox). Do not treat as public API outside **`xb-list`**.
