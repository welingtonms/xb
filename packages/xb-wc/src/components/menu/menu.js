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
		};
	}

	constructor() {
		super();

		this.loading = false;
	}

	connectedCallback() {
		super.connectedCallback();

		// this.setAttribute( 'slot', 'menu' );
		// this.style.setProperty( 'min-width', '100%' );
	}

	render() {
		const { classy } = withClassy( {} );

		return html`
			${ this.loading ? html`<xb-spinner></xb-spinner>` : nothing }
			<xb-stack class="${ classy( 'menu' ) }">
				<slot></slot>
			</xb-stack>
		`;
	}
}

window.customElements.define( 'xb-menu', Menu );

/**
 * @typedef {Object} MenuAttributes
 * @property {boolean} loading - Is the menu options being loaded.
 */
