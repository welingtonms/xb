import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './dropdown-item.styles';

export class DropdownMenuItem extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {DropdownMenuItemAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

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

		/** @type {DropdownMenuItemAttributes['disabled']} */
		this.disabled = false;
	}

	render() {
		const { classy, when } = withClassy( {
			size: this.size,
		} );

		return html`
			<button
				type="button"
				class="${ classy( 'dropdown-item', {
					'-extra-small': when( { size: 'extra-small' } ),
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				} ) }"
				?disabled="${ this.disabled }"
				@click=${ this._handleClick }
			>
				<slot></slot>
			</button>
		`;
	}

	_handleClick() {
		const options = {
			detail: { action: 'toggle' },
		};

		this.emit( 'xb-dropdown', options );
	}
}

window.customElements.define( 'xb-dropdown-item', DropdownMenuItem );

/**
 * @typedef {import('../../styles/size.styles').ElementSize} DropdownItemSize
 */

/**
 * @typedef {Object} DropdownMenuItemAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {boolean} disabled Should the button be disabled.
 * @property {DropdownItemSize} size
 */
