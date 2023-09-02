import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import MenuPatternController from '../../controllers/menu-pattern';
import XBElement from '../../common/xb-element';
import withID from '../../mixins/with-id';

import styles from './menu.styles';

import '../spinner';

@customElement( 'xb-menu' )
export class Menu extends withID( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Is the menu options being loaded.
	 * @type {MenuAttributes['loading']}
	 */
	@property( { type: Boolean } ) loading;

	/**
	 * Should menu items be [bottom] bordered.
	 * @type {MenuAttributes['bordered']}
	 */
	@property( { type: Boolean } ) bordered;

	/** @type {MenuPatternController} */
	_controller;

	constructor() {
		super();

		this.bordered = false;
		this.loading = false;
	}

	createController() {
		return new MenuPatternController( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'menu' );
		this.setAttribute( 'tabindex', 0 );

		this._controller = this.createController();
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
 * @typedef {import('../../common/prop-types').HTMLTag} HTMLTag
 */

/**
 * @typedef {Object} MenuAttributes
 * @property {HTMLTag} as - List tag to render, defaults to 'section'.
 * @property {boolean} loading - Is the menu options being loaded.
 * @property {boolean} bordered - Should the list item be bordered?
 */

/**
 * @typedef {Object} GenericSelectionOption
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} CustomSelectionOption
 * @property {string} _type
 */

/**
 * @typedef {string | GenericSelectionOption | CustomSelectionOption} SelectionOption
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 */
