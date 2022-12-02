import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import { getTextContent } from '../../utils/slot';
import { SELECT_EVENT } from './select.constants';
import XBElement from '../../common/xb-element';
import styles from './select-option.styles';

import '../form/checkbox';
import '../icon';

export class SelectOption extends XBElement {
	static styles = [ styles() ];

	/** @type {HTMLSlotElement} */
	_defaultSlot;

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

		/** @type {SelectOptionAttributes['selected']} */
		this.selected = false;

		/** @type {SelectOptionAttributes['disabled']} */
		this.disabled = false;

		/** @type {SelectOptionAttributes['value']} */
		this.value = '';
	}

	render() {
		const { classy, when } = withClassy( {
			selected: this.selected,
			size: this.size,
		} );

		return html`
			<button
				type="button"
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
				role="${ this.role }"
				aria-checked="${ this.selected ? 'true' : 'false' }"
				?disabled="${ this.disabled }"
				@click=${ this._handleClick }
			>
				${ this.role == 'radio'
					? html`<xb-icon name="check" class="check"></xb-icon>`
					: html` <xb-checkbox
							tabindex="-1"
							?checked=${ this.selected }
					  ></xb-checkbox>` }
				<slot name="leading"></slot>
				<slot></slot>
			</button>
		`;
	}

	/** Returns a text label based on the contents of the menu item's default slot. */
	getTextLabel() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot:not([name])' );

		console.log( this._defaultSlot );

		return getTextContent( this._defaultSlot );
	}

	_handleClick() {
		this.emit( SELECT_EVENT, {
			detail: { value: this.value, type: 'toggle' },
			composed: false,
		} );

		// we want to close the dropdown only for single selection
		if ( this.role == 'radio' ) {
			this.emit( 'xb-dropdown', {
				detail: { action: 'toggle' },
			} );
		}
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
