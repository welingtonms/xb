import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { XBElement } from '../xb-element';
import { WithIDMixin } from '../../mixins/with-id';

import styles from './base-menu.styles';

import '../spinner';

/**
 * This class implements the base menu component, exposing necessary
 * attributes and the rendered content; it does NOT use the Menu Controller.
 */
export class BaseMenu extends WithIDMixin(XBElement) {
	static styles = [styles()];

	/**
	 * Is the menu options being loaded.
	 * @type {BaseMenuAttributes['loading']}
	 */
	@property({ type: Boolean }) accessor loading;

	/**
	 * Should menu items be [bottom] bordered.
	 * @type {BaseMenuAttributes['bordered']}
	 */
	@property({ type: Boolean }) accessor bordered;

	constructor() {
		super();

		this.bordered = false;
		this.loading = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute('role', 'menu');
	}

	render() {
		return html`
			${this.loading
				? html`
						<xb-spinner class="spinner"></xb-spinner>
					`
				: nothing}
			<slot></slot>
			<slot name="internal"></slot>
		`;
	}
}

/**
 * @typedef {Object} BaseMenuAttributes
 * @property {boolean} loading - Is the menu options being loaded.
 * @property {boolean} bordered - Should the list item be bordered?
 */
