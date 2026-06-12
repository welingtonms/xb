import { XBElement } from '../xb-element';
import { AsFormElementMixin } from '../../mixins/as-form-element';

/**
 * Base **Form control** for leaf elements (TextInput, Checkbox, Switch, etc.).
 *
 * Lifecycle hooks — override in subclasses when the default is not enough:
 * - {@link AsFormElement#onFormReset} — restore **Mount default** on `form.reset()`
 * - {@link AsFormElement#onFormDisabled} — records form-owner disable; override to sync the **Control surface**
 * - {@link AsFormElement#onFormStateRestore} — apply bfcache / autocomplete state
 * - {@link AsFormElement#getControlSurface} — shadow `#control`; drives `{ syncValidity: true }` on {@link AsFormElement#setFormValue}
 *
 * References:
 * - https://web.dev/articles/more-capable-form-controls
 *
 * @class
 */
export class FormElement extends AsFormElementMixin( XBElement ) {}
