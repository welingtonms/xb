// @/ts-check
import { property } from 'lit/decorators.js';

import createLogger from '../../utils/logger';

import { detectFormAssociatedFeature } from './as-form-element.utils';

const logger = createLogger('as-form-element');

logger.debug(
	`Form-associated custom elements ${detectFormAssociatedFeature() ? 'are' : 'are not'} supported`
);

/**
 * References:
 * - https://web.dev/articles/more-capable-form-controls
 */
/**
 * @template {!Constructable} T
 * @param {T} BaseClass
 */
export const AsFormElementMixin = (BaseClass) => {
	return class AsFormElement extends BaseClass {
		static formAssociated = true;

		@property({ type: Boolean, reflect: true })
		accessor disabled;

		@property({ type: String, reflect: true })
		accessor name;

		get form() {
			return this.internals.form;
		}

		// get disabled() {
		// 	return this.#disabled;
		// }

		// set disabled( value ) {
		// 	this.toggleAttribute( 'disabled', value );
		// }

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
		 * Reference:
		 * - https://web.dev/articles/more-capable-form-controls#void_formdisabledcallbackdisabled
		 * @param {*} disabled
		 */
		formDisabledCallback(disabled) {
			if (!this.isConnected) {
				return;
			}

			// this.#disabled = disabled;
		}

		/**
		 * Reference:
		 * - https://web.dev/articles/more-capable-form-controls#void_formresetcallback
		 */
		formResetCallback() {}

		/**
		 * Reference:
		 * - https://web.dev/articles/more-capable-form-controls#void_formstaterestorecallbackstate_mode
		 * @param {*} state
		 * @param {'restore' | 'autocomplete'} mode
		 */
		formStateRestoreCallback(state, mode) {}
	};
};

/**
 * @typedef {import('../xb-element').XBElement} XBElement
 * @typedef {import('../../common/prop-types').Constructable} Constructable
 */
