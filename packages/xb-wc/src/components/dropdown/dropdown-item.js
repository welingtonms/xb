import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './dropdown-item.styles';

export class DropdownMenuItem extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Dropdown item size.
			 * @type {DropdownMenuItemAttributes['size']}
			 */
			size: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {DropdownMenuItemAttributes['size']} */
		this.size = 'small';
	}

	render() {
		const { classy, when } = withClassy( {
			size: this.size,
		} );

		return html`
			<button
				type="button"
				class="${ classy( 'dropdown-menu-item', {
					'-extra-small': when( { size: 'extra-small' } ),
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				} ) }"
			>
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
 * @typedef {import('../../styles/size.styles').ElementSize} DropdownItemSize
 */

/**
 * @typedef {Object} DropdownMenuItemAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {DropdownItemSize} size
 */
