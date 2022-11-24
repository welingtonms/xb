import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './dropdown-menu.styles';

import '../list';

export class DropdownMenu extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {};
	}

	constructor() {
		super();
	}

	render() {
		const { classy, when } = withClassy( {} );

		return html`
			<xb-stack class="${ classy( 'dropdown-menu' ) }">
				<slot></slot>
			</xb-stack>
		`;
	}

	_handleClick() {
		const options = {
			composed: true,
			detail: { action: 'toggle' },
		};

		this.emit( 'xb-dropdown-menu', options );
	}
}

window.customElements.define( 'xb-dropdown-menu', DropdownMenu );

/**
 * @typedef {Object} DropdownMenuAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
