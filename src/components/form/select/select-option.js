import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../../xb-element';

import { WithIDMixin } from '../../../mixins/with-id';
import { AsFormElementMixin } from '../../../mixins/as-form-element';
import createLogger from '../../../utils/logger';

import { optionStyles } from './select.styles';

import '../../icon/icon.define';

const logger = createLogger('select-option');

export class Option extends AsFormElementMixin(WithIDMixin(XBElement, 'xb-option')) {
	static styles = [optionStyles()];

	/**
	 * option is initially selected.
	 * @type {boolean}
	 */
	@property({ type: Boolean, reflect: true }) accessor selected;

	/**
	 * option is initially selected.
	 * @type {string}
	 */
	@property({ type: String }) accessor value;

	/**
	 * Icon to display in the menu item leading slot.
	 * @type {IconName}
	 */
	@property({ type: String, reflect: true }) accessor icon;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-option', ...config, type: Option });
	}

	constructor() {
		super();

		this.internals.role = 'option';

		this.addEventListener('click', this.#onClick);
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute('slot', 'select-option');
	}

	/**
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	update(changedProperties) {
		if (changedProperties.has('disabled')) {
			this.#onDisabledChange(this.disabled);
		}

		if (changedProperties.has('selected')) {
			this.#onSelectedChange(this.selected);
		}

		super.update(changedProperties);
	}
	/**
	 * Returns a text label based on the contents of the menu item's default slot.
	 * @returns {string}
	 */
	text() {
		/** @type {HTMLSlotElement} */
		const slot = this.renderRoot.querySelector('slot:not([name])');

		/**
		 * FIXME: the fallback is needed for when `slot` is still null,
		 * but this might not be enough for all cases.
		 */
		return getTextContent(slot) || String(this.textContent ?? '').trim();
	}

	render() {
		return html`
			<slot name="leading">
				${ this.icon ? html`<xb-icon name="${ this.icon }"></xb-icon>` : nothing }
			</slot>
			<slot></slot>
			<slot name="trailing"></slot>

			<xb-icon id="check" name="check"></xb-icon>
		`;
	}


	get leading() {
		/** @type {HTMLSlotElement} */
		const leadingSlot = this.renderRoot.querySelector(
			'slot[name="leading"]',
		);

		const elements = leadingSlot.assignedElements({
			flatten: true,
		});

		return elements[0] ?? null;
	}


	/**
	 * @param {Event} event
	 */
	#onClick = (event) => {
		if (this.disabled) {
			event.stopPropagation();
			return;
		}

		this.emit('toggle');
	};

	/**
	 * @param {boolean} selected
	 */
	#onSelectedChange = (selected) => {
		if (!this.name) {
			logger.warn('no name attribute set on the option. Is it intentionally?');
		}

		this.internals.setFormValue(selected ? this.value : null);
		this.setBooleanAttribute('aria-selected', selected);
	};

	/**
	 * @param {boolean} disabled
	 */
	#onDisabledChange = (disabled) => {
		this.setAttribute('aria-disabled', disabled);
	};

	formResetCallback() {
		// select will take care of this
	}

	formStateRestoreCallback(state) {
		if (state) {
			this.selected = state;
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
 * @typedef {import('../../icon').IconName} IconName
 */
