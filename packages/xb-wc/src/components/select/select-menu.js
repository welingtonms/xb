import { html, nothing } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './select-menu.styles';

export class SelectMenu extends XBElement {
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

		this.setAttribute( 'slot', 'menu' );
		this.style.setProperty( 'min-width', '100%' );
	}

	render() {
		const { classy, when } = withClassy( {} );

		return html`
			${ this.loading ? html`<xb-spinner></xb-spinner>` : nothing }
			<xb-stack class="${ classy( 'select-menu' ) }">
				<slot></slot>
			</xb-stack>
		`;
	}
}

window.customElements.define( 'xb-select-menu', SelectMenu );

/**
 * @typedef {Object} SelectMenuAttributes
 * @property {boolean} [open] - Is the select menu open.
 * @property {boolean} [loading] - Is the select options being loaded.
 */
