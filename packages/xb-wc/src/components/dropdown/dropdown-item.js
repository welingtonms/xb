import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './dropdown-item.styles';

export class DropdownMenuItem extends XBElement {
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
			<button type="button" class="${ classy( 'dropdown-menu-item' ) }">
				<slot></slot>
			</button>
		`;
	}

	_handleClick() {
		const options = {
			composed: true,
			detail: { action: 'toggle' },
		};

		this.emit( 'xb-dropdown-trigger', options );
	}
}

window.customElements.define( 'xb-dropdown-item', DropdownMenuItem );

/**
 * @typedef {Object} DropdownMenuItemAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 */
