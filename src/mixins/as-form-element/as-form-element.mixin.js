// @/ts-check
import { property } from 'lit/decorators.js';

import createLogger from '../../utils/logger';

import { detectFormAssociatedFeature } from '../../components/form-element/form-element.utils';

const logger = createLogger( 'as-form-element' );

logger.debug(
	`Form-associated custom elements ${ detectFormAssociatedFeature() ? 'are' : 'are not' } supported`
);

/**
 * References:
 * - https://web.dev/articles/more-capable-form-controls
 */
/**
 * @template {!Constructable} T
 * @param {T} BaseClass
 */
export const AsFormElementMixin = ( BaseClass ) => {
	return class AsFormElement extends BaseClass {
		static formAssociated = true;

		@property( { type: Boolean, reflect: true } )
		accessor disabled;

		/** @type {boolean} Form / fieldset disable — not reflected to `disabled` attribute. */
		#formOwnerDisabled = false;

		@property( { type: String, reflect: true } )
		accessor name;

		/**
		 * Author `disabled` or form-owner disable (fieldset, `<form disabled>`).
		 *
		 * @returns {boolean}
		 */
		get effectiveDisabled() {
			return Boolean( this.disabled || this.#formOwnerDisabled );
		}

		get form() {
			return this.internals.form;
		}

		get validity() {
			return this.internals.validity;
		}

		get validationMessage() {
			return this.internals.validationMessage;
		}

		get willValidate() {
			return this.internals.willValidate;
		}

		checkValidity() {
			return this.internals.checkValidity();
		}

		reportValidity() {
			return this.internals.reportValidity();
		}

		/**
		 * The **Control surface** — shadow `#control` or interactive descendant that
		 * should receive disabled state, constraint validation, and ARIA reflection.
		 *
		 * Override in leaf **Form controls** with a native or custom surface (e.g.
		 * return shadow `#control`). Default `null` when there is no single surface
		 * (composite **Members**) or validity is not mirrored from a descendant.
		 *
		 * @returns {HTMLElement | null}
		 */
		getControlSurface() {
			return null;
		}

		/**
		 * Submit the current value to the owning form via `ElementInternals.setFormValue`.
		 * Pass `null` to omit the control from `FormData` (e.g. unchecked checkbox).
		 *
		 * @param {FormDataEntryValue | FormData | null} value
		 * @param {SetFormValueOptions} [options]
		 */
		setFormValue( value, options = {} ) {
			this.internals.setFormValue( value );

			if ( options.syncValidity ) {
				const surface = this.getControlSurface();

				if ( surface ) {
					this.syncValidityFrom( surface );
				}
			}
		}

		/**
		 * Mirror constraint validation onto this form-associated host so
		 * `checkValidity()` / `reportValidity()` reflect the **Control surface**.
		 *
		 * Prefer {@link setFormValue} with `{ syncValidity: true }` when the surface
		 * is returned by {@link getControlSurface}. Call this directly when the
		 * anchor differs from the control surface.
		 *
		 * When `controlElement` exposes `validity` / `validationMessage` (native form
		 * controls), those flags are copied. Otherwise the host is marked valid.
		 * `controlElement` is always passed as the `setValidity` anchor — any
		 * `HTMLElement` the user agent may use when reporting validation UI.
		 *
		 * @param {HTMLElement} controlElement
		 */
		syncValidityFrom( controlElement ) {
			if ( 'validity' in controlElement ) {
				this.internals.setValidity(
					controlElement.validity,
					'validationMessage' in controlElement ? controlElement.validationMessage : '',
					controlElement
				);
				return;
			}

			this.internals.setValidity( {}, undefined, controlElement );
		}

		/**
		 * Propagate native form disable state from the owning form or fieldset.
		 *
		 * Override to sync the **Control surface** (composite **Members**, disclosure
		 * triggers, native `#control`, etc.) — call `super.onFormDisabled( disabled )`
		 * first so {@link effectiveDisabled} stays in sync.
		 *
		 * Does not assign `this.disabled`: writing the reflected attribute from
		 * `formDisabledCallback` would stick after the fieldset is re-enabled and block
		 * further `formDisabledCallback( false )` calls.
		 *
		 * @param {boolean} disabled
		 */
		onFormDisabled( disabled ) {
			this.#formOwnerDisabled = disabled;
			this.requestUpdate();
		}

		/**
		 * Restore **Mount default** or attribute state after `form.reset()`.
		 *
		 * Called from {@link formResetCallback} when the host is connected.
		 * Override in leaf and disclosure **Form controls**; leave as no-op for
		 * composite **Members** (the host re-initializes selection instead).
		 */
		onFormReset() {}

		/**
		 * Browser callback when the owning `<form>` is reset.
		 * Delegates to {@link onFormReset} when connected.
		 *
		 * @see {@link https://web.dev/articles/more-capable-form-controls#void_formresetcallback}
		 */
		formResetCallback() {
			if ( ! this.isConnected ) {
				return;
			}

			this.onFormReset();
		}

		/**
		 * Browser callback when the owning `<form>` or fieldset disabled state changes.
		 * Delegates to {@link onFormDisabled} — including during upgrade before connect,
		 * so {@link effectiveDisabled} is ready for the first render. Control surfaces
		 * sync via {@link queuedWorkManager} once shadow DOM exists.
		 *
		 * @see {@link https://web.dev/articles/more-capable-form-controls#void_formdisabledcallbackdisabled}
		 * @param {boolean} disabled
		 */
		formDisabledCallback( disabled ) {
			this.onFormDisabled( disabled );
		}

		/**
		 * Apply persisted or autocomplete state from the browser.
		 *
		 * Called from {@link formStateRestoreCallback} when the host is connected.
		 * Override per control — restored value shape differs (string, boolean,
		 * `FormData`, etc.). Guard falsy `state` in the override when appropriate.
		 *
		 * @param {*} state
		 * @param {'restore' | 'autocomplete'} mode
		 */
		onFormStateRestore( state, mode ) {}

		/**
		 * Browser callback to restore persisted or autocomplete form state.
		 * Delegates to {@link onFormStateRestore} when connected.
		 *
		 * @see {@link https://web.dev/articles/more-capable-form-controls#void_formstaterestorecallbackstate_mode}
		 * @param {*} state
		 * @param {'restore' | 'autocomplete'} mode
		 */
		formStateRestoreCallback( state, mode ) {
			if ( ! this.isConnected ) {
				return;
			}

			this.onFormStateRestore( state, mode );
		}
	};
};

/**
 * @typedef {import('../xb-element').XBElement} XBElement
 * @typedef {import('../../utils/prop-types.js').Constructable} Constructable
 */

/**
 * @typedef {Object} SetFormValueOptions
 * @property {boolean} [syncValidity] Mirror constraint validation from {@link AsFormElement#getControlSurface}.
 */
