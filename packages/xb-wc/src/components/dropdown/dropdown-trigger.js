import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../../common/xb-element';
import { WithIDMixin } from '../../mixins/with-id';
import { baseButtonStyles } from '../button';

import { triggerStyles } from './dropdown.styles';

/**
 * @class
 * @template WithIDMixin, XBElement
 */
export class DropdownTrigger extends WithIDMixin(XBElement) {
	static styles = [baseButtonStyles(), triggerStyles()];

	/**
	 * Should the button be disabled.
	 * @type {boolean}
	 */
	@property({ type: Boolean, reflect: true }) accessor disabled;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define(config) {
		XBElement.define({ name: 'xb-dropdown-trigger', ...config, type: DropdownTrigger });
	}

	constructor() {
		super();

		this.disabled = false;
	}

	connectedCallback() {
		super.connectedCallback();

		// TODO: use internals
		this.setAttribute('role', 'button');
		this.setAttribute('aria-haspopup', 'true');
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update(changedProperties) {
		if (changedProperties.has('disabled')) {
			this.setAttribute('aria-disabled', Boolean(this.disabled));

			/**
			 * FIXME: according to https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled
			 * "there can be instances where elements need to be exposed as disabled, but are still available for users to find when navigating via the Tab key"
			 */
			this.setAttribute('tabindex', this.disabled ? '-1' : '0');
		}

		super.update(changedProperties);
	}

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<xb-icon name="expand-more" size="16" class="indicator"></xb-icon>
		`;
	}
}

/**
 * @typedef {Object} DropdownTriggerAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
