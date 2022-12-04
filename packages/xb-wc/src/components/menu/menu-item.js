import { html, nothing } from 'lit';
import { choose } from 'lit/directives/choose.js';
import withClassy from '@welingtonms/classy';

import { getTextContent } from '../../utils/slot';
import XBElement from '../../common/xb-element';
import styles from './menu-item.styles';

import '../form/checkbox';
import '../icon';

export class MenuItem extends XBElement {
	static styles = [ styles() ];

	/** @type {HTMLSlotElement} */
	_defaultSlot;

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {MenuItemAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Select item size.
			 * @type {MenuItemAttributes['size']}
			 */
			size: { type: String },

			/**
			 * Is this a checked option.
			 * @type {MenuItemAttributes['checked']}
			 */
			checked: { type: Boolean },

			/**
			 * Aria role
			 * @type {MenuItemAttributes['role']}
			 */
			role: {
				type: String,
				reflect: true,
			},

			/**
			 * Calue Value that this option represents.
			 * @type {MenuItemAttributes['value']}
			 */
			value: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {MenuItemAttributes['size']} */
		this.size = 'small';

		/** @type {MenuItemAttributes['checked']} */
		this.checked = false;

		/** @type {MenuItemAttributes['disabled']} */
		this.disabled = false;

		/** @type {MenuItemAttributes['value']} */
		this.value = '';
	}

	render() {
		const { classy, when } = withClassy( {
			checked: this.checked,
			size: this.size,
		} );

		return html`
			<button
				type="button"
				class="${ classy( 'menu-item', {
					'-extra-small': when( { size: 'extra-small' } ),
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				} ) }"
				role="${ this.role }"
				aria-checked="${ this.checked ? 'true' : 'false' }"
				?disabled="${ this.disabled }"
				@click=${ this._handleClick }
			>
				${ this.role == 'checkbox'
					? html`<xb-checkbox
							tabindex="-1"
							?checked=${ this.checked }
					  ></xb-checkbox>`
					: nothing }

				<slot name="leading"></slot>
				<slot></slot>

				${ this.role == 'radio'
					? html`<xb-icon name="check" class="check"></xb-icon>`
					: nothing }
			</button>
		`;
	}

	/** Returns a text label based on the contents of the menu item's default slot. */
	getTextLabel() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot:not([name])' );

		return getTextContent( this._defaultSlot );
	}

	/**
	 *
	 * @param {MouseEvent} event
	 */
	_handleClick( event ) {
		event.stopPropagation();

		this.emit( 'xb-select', {
			detail: { value: this.value, label: this.getTextLabel() },
		} );
	}
}

window.customElements.define( 'xb-menu-item', MenuItem );

/**
 * @typedef {import('../../styles/size.styles').ElementSize} SelectionOptionSize
 */

/**
 * @typedef {Object} MenuItemAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {boolean} disabled Should the button be disabled.
 * @property {SelectionOptionSize} size
 * @property {boolean} [checked] - Is this a checked option
 * @property {'checkbox' | 'radio'} role Aria role
 * @property {string} value Value that this option represents.
 */
