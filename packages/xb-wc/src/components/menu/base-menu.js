import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import XBElement from '../../common/xb-element';
import withID from '../../mixins/with-id';

import styles from './base-menu.styles';

import '../spinner';

/**
 * This class implements the base menu component, exposing necessary
 * attributes and the rendered content; it does NOT use the Menu Controller.
 */
export class BaseMenu extends withID( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Is the menu options being loaded.
	 * @type {BaseMenuAttributes['loading']}
	 */
	@property( { type: Boolean } ) loading;

	/**
	 * Should menu items be [bottom] bordered.
	 * @type {BaseMenuAttributes['bordered']}
	 */
	@property( { type: Boolean } ) bordered;

	constructor() {
		super();

		this.bordered = false;
		this.loading = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'menu' );
	}

	render() {
		return html`
			${ this.loading
				? html`
						<xb-spinner class="spinner"></xb-spinner>
				  `
				: nothing }
			<slot></slot>
		`;
	}
}

/**
 * @typedef {Object} BaseMenuAttributes
 * @property {boolean} loading - Is the menu options being loaded.
 * @property {boolean} bordered - Should the list item be bordered?
 */
