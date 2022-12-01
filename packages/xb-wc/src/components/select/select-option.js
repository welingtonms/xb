import { html, nothing } from 'lit';
import withClassy from '@welingtonms/classy';

import { SELECT_EVENT } from './select.constants';
import XBElement from '../../common/xb-element';
import styles from './select-option.styles';

export class SelectOption extends XBElement {
	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {SelectOptionAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Select item size.
			 * @type {SelectOptionAttributes['size']}
			 */
			size: { type: String },

			/**
			 * Is this a selected option.
			 * @type {SelectOptionAttributes['selected']}
			 */
			selected: { type: Boolean },

			/**
			 * Aria role
			 * @type {SelectOptionAttributes['role']}
			 */
			role: {
				type: String,
				reflect: true,
			},

			/**
			 * Calue Value that this option represents.
			 * @type {SelectOptionAttributes['value']}
			 */
			value: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {SelectOptionAttributes['size']} */
		this.size = 'small';

		/**
		 * @type {SelectOptionAttributes['selected']}
		 */
		this.selected = false;
	}

	render() {
		const { classy, when } = withClassy( {
			selected: this.selected,
			size: this.size,
		} );

		return html`
			<button
				class="${ classy(
					'select-option',
					{
						'-extra-small': when( { size: 'extra-small' } ),
						'-small': when( { size: 'small' } ),
						'-medium': when( { size: 'medium' } ),
						'-large': when( { size: 'large' } ),
					},
					{
						'is-selected': when( { selected: true } ),
					}
				) }"
				type="button"
				role="${ this.role }"
				aria-checked="${ this.checked ? 'true' : 'false' }"
				?disabled="${ this.disabled }"
				@click=${ this._handleClick }
			>
				<slot name="leading"></slot>
				<slot></slot>
				${ this.selected
					? html`<xb-icon name="check" class="check"></xb-icon>`
					: nothing }
			</button>
		`;
	}

	_handleClick() {
		this.emit( SELECT_EVENT, {
			detail: { value: this.value, type: 'toggle' },
			bubbles: true,
			composed: false,
		} );

		this.emit( 'xb-dropdown-trigger', {
			composed: true,
			detail: { action: 'toggle' },
		} );
	}
}

window.customElements.define( 'xb-option', SelectOption );

/**
 * @typedef {import('../../styles/size.styles').ElementSize} SelectionOptionSize
 */

/**
 * @typedef {Object} SelectOptionAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {boolean} disabled Should the button be disabled.
 * @property {SelectionOptionSize} size
 * @property {boolean} [selected] - Is this a selected option
 * @property {'checkbox' | 'radio'} role Aria role
 * @property {string} value Value that this option represents.
 */
