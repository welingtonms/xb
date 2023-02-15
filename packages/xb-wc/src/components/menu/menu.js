import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './menu.styles';

import '../focus-trap';

@customElement( 'xb-menu' )
export class Menu extends XBElement {
	static styles = [ styles() ];

	/**
	 * Is the menu options being loaded.
	 * @type {MenuAttributes['loading']}
	 */
	@property( { type: Boolean } ) loading;

	/**
	 * Should menu items be hoverable.
	 * @type {MenuAttributes['hoverable']}
	 */
	@property( { type: Boolean } ) hoverable;

	/**
	 * Should menu items be striped.
	 * @type {MenuAttributes['striped']}
	 */
	@property( { type: Boolean } ) striped;

	/**
	 * Should menu items be [bottom] bordered.
	 * @type {MenuAttributes['bordered']}
	 */
	@property( { type: Boolean } ) bordered;

	constructor() {
		super();

		this.loading = false;

		this.striped = false;

		this.hoverable = false;

		this.bordered = false;
	}

	render() {
		const { classy, when } = withClassy( {
			hoverable: this.hoverable,
			striped: this.striped,
			bordered: this.bordered,
		} );

		return html`
			${ this.loading
				? html`
						<xb-spinner class="spinner"></xb-spinner>
				  `
				: nothing }

			<xb-focus-trap>
				<xb-stack
					role="listbox"
					class="${ classy( 'menu', {
						'-hoverable': when( { hoverable: true } ),
						'-striped': when( { striped: true } ),
						'-bordered': when( { bordered: true } ),
					} ) }"
				>
					<slot></slot>
				</xb-stack>
			</xb-focus-trap>
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
 * @property {boolean} hoverable - Should the list item be hoverable?
 * @property {boolean} striped - Should the list be striped?
 */
