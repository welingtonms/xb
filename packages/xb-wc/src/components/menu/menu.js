import { html, nothing } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './menu.styles';

export class Menu extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			loading: {
				type: Boolean,
			},

			/**
			 * Should menu items be hoverable.
			 * @type {MenuAttributes['hoverable']}
			 */
			hoverable: {
				type: Boolean,
			},

			/**
			 * Should menu items be striped.
			 * @type {MenuAttributes['striped']}
			 */
			striped: {
				type: Boolean,
			},

			/**
			 * Should menu items be [bottom] bordered.
			 * @type {MenuAttributes['bordered']}
			 */
			bordered: {
				type: Boolean,
			},
		};
	}

	constructor() {
		super();

		/** @type {MenuAttributes['loading']} */
		this.loading = false;

		/** @type {MenuAttributes['striped']} */
		this.striped = false;

		/** @type {MenuAttributes['hoverable']} */
		this.hoverable = false;

		/** @type {MenuAttributes['bordered']} */
		this.bordered = false;
	}

	connectedCallback() {
		super.connectedCallback();

		// this.setAttribute( 'slot', 'menu' );
		// this.style.setProperty( 'min-width', '100%' );
	}

	render() {
		const { classy, when } = withClassy( {
			hoverable: this.hoverable,
			striped: this.striped,
			bordered: this.bordered,
		} );

		return html`
			${ this.loading ? html`<xb-spinner></xb-spinner>` : nothing }
			<xb-stack
				class="${ classy( 'menu', {
					'-hoverable': when( { hoverable: true } ),
					'-striped': when( { striped: true } ),
					'-bordered': when( { bordered: true } ),
				} ) }"
			>
				<slot></slot>
			</xb-stack>
		`;
	}
}

window.customElements.define( 'xb-menu', Menu );

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
