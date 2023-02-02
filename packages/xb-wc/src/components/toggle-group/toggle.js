import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import XBElement from '../../common/xb-element';
import styles from './toggle.styles';

import '../button';

export class ToggleButton extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {Boolean}
			 */
			disabled: { type: Boolean },

			/**
			 * Aria role
			 * @type {'group' | 'radiogroup'}
			 */
			role: {
				type: String,
				reflect: true,
			},

			/**
			 * Should the button be disabled.
			 * @type {'true' | 'false'}
			 */
			checked: { type: String, reflect: true, attribute: 'aria-checked' },

			/**
			 * Button emphasis variant.
			 * @type {String}
			 */
			value: { type: String },

			/**
			 * Button size.
			 * @type {import('../button/button').ButtonSize}
			 */
			size: { type: String },
		};
	}

	constructor() {
		super();

		this.disabled = false;
		this.checked = false;
		this.size = 'small';
	}

	render() {
		const { classy, when } = withClassy( {
			role: this.role,
			emphasis: this.emphasis,
			size: this.size,
			checked: this.checked,
		} );

		return html`
			<button
				class=${ classy( 'toggle', 'button', {
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				} ) }
				type="button"
				role="${ this.role }"
				aria-checked="${ this.checked ? 'true' : 'false' }"
				?disabled="${ this.disabled }"
				@click=${ this._handleClick }
			>
				<slot name="leading" slot="leading"></slot>
				<slot></slot>
				<slot name="trailing" slot="trailing"></slot>
			</button>
		`;
	}

	_handleClick( e ) {
		if ( this.disabled ) {
			return;
		}

		this.checked = ! this.checked;

		const options = {
			detail: { value: this.value, type: 'toggle' },
			bubbles: true,
			composed: false,
		};

		this.emit( 'xb-toggle-click', options );
	}
}

window.customElements.define( 'xb-toggle', ToggleButton );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-toggle": Button;
//   }
// }

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasis
 * @typedef {('small' | 'medium' | 'large')} ButtonSize
 */
