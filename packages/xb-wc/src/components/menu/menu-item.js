import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import withClassy from '@welingtonms/classy';

import { getTextContent } from '../../utils/slot';
import XBElement from '../../common/xb-element';
import styles from './menu-item.styles';

import '../form/checkbox';
import '../icon';

export class MenuItem extends XBElement {
	/** @type {HTMLSlotElement} */
	_defaultSlot;

	/** @type {import('../button/button').Button} */
	_button;

	static styles = [ styles() ];

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
			 * Is this a selected option.
			 * @type {MenuItemAttributes['selected']}
			 */
			selected: { type: Boolean },

			/**
			 * Selection strategy.
			 * @type {MenuItemAttributes['type']}
			 */
			type: { type: String },

			/**
			 * Value that this option represents.
			 * @type {MenuItemAttributes['value']}
			 */
			value: { type: String, reflect: true },
		};
	}

	constructor() {
		super();

		/** @type {MenuItemAttributes['size']} */
		this.size = 'small';

		/** @type {MenuItemAttributes['selected']} */
		this.selected = false;

		/** @type {MenuItemAttributes['disabled']} */
		this.disabled = false;

		/** @type {MenuItemAttributes['value']} */
		this.value = '';

		/** @type {MenuItemAttributes['type']} */
		this.type = 'single';
	}

	get button() {
		this._button = this._button ?? this.shadowRoot.querySelector( 'button' );

		return this._button;
	}

	/** Returns a text label based on the contents of the menu item's default slot. */
	text() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot:not([name])' );

		/**
		 * FIXME: the fallback is needed for when this._defaultSlot is still null,
		 * but this might not be enough for all cases.
		 */
		return getTextContent( this._defaultSlot ) || String( this.textContent ?? '' ).trim();
	}

	focus() {
		this.button.focus();
	}

	render() {
		const { classy, when } = withClassy( {
			selected: this.selected,
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
				role="option"
				aria-selected="${ this.selected ? 'true' : 'false' }"
				?disabled="${ this.disabled }"
				@click=${ this._handleClick }
			>
				${ this.type == 'multiple'
					? html`
							<xb-checkbox tabindex="-1" ?checked=${ this.selected }></xb-checkbox>
					  `
					: nothing }

				<slot name="leading"></slot>
				<slot></slot>

				${ this.type != 'multiple'
					? html`
							<xb-icon name="check" class="check"></xb-icon>
					  `
					: nothing }
			</button>
		`;
	}

	/**
	 *
	 * @param {MouseEvent} event
	 */
	_handleClick( event ) {
		event.stopPropagation();

		this.emit( 'xb-menu-item-click', {
			detail: { value: this.value, label: this.text() },
		} );
	}
}

window.customElements.define( 'xb-menu-item', MenuItem );

/**
 * @typedef {import('../../styles/size.styles').ElementSize} SelectionOptionSize
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 */

/**
 * @typedef {Object} MenuItemAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {boolean} disabled Should the button be disabled.
 * @property {SelectionOptionSize} size
 * @property {SelectionType} type
 * @property {boolean} [selected] - Is this a selected option
 * @property {string} value Value that this option represents.
 */
