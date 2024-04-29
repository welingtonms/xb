import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { FormElement } from '../../../common/form-element';
import { WithAriaMixin } from '../../../mixins/with-aria';
import { WithIDMixin } from '../../../mixins/with-id';
import { XBElement } from '../../../common/xb-element';
import createLogger from '../../../utils/logger';

import styles from './toggle.styles';

const logger = createLogger('toggle');

export class Toggle extends WithAriaMixin(WithIDMixin(FormElement)) {
	static styles = [styles()];

	/**
	 * Should the toggle be checked.
	 * @type {boolean}
	 */
	@property({ type: Boolean, reflect: true }) accessor checked;

	/**
	 * Button emphasis variant.
	 * @type {String}
	 */
	@property({ type: String }) accessor value;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-toggle', ...config, type: Toggle });
	}

	constructor() {
		super();

		this.addEventListener('click', this.#onClick);
	}

	/**
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	update(changedProperties) {
		if (changedProperties.has('disabled')) {
			this.#onDisabledChange(this.disabled);
		}

		if (changedProperties.has('checked')) {
			this.#onCheckedChange(this.checked);
		}

		super.update(changedProperties);
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}

	/**
	 * @param {Event} event
	 */
	#onClick = (event) => {
		if (this.disabled) {
			event.stopPropagation();
			return;
		}
	};

	/**
	 * @param {boolean} checked
	 */
	#onCheckedChange = (checked) => {
		if (!this.name) {
			logger.warn('no name attribute set on the toggle. Is it intentionally?');
		}

		this.internals.setFormValue(checked ? this.value : null);
		this.setBooleanAttribute('aria-checked', checked);
	};

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = (disabled) => {
		this.setAttribute('aria-disabled', disabled);

		if (this.disabled) {
			this.removeAttribute('tabindex');
		} else {
			this.setAttribute('tabindex', '-1');
		}
	};

	formResetCallback() {
		// toggle-group will take care of this
	}

	formStateRestoreCallback(state) {
		if (state) {
			this.checked = state;
		}
	}

	formDisabledCallback(disabled) {
		super.formDisabledCallback(disabled);

		if (!this.isConnected) {
			return;
		}

		this.#onDisabledChange(disabled);
	}
}

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasis
 * @typedef {('small' | 'medium' | 'large')} ButtonSize
 */
