import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import { getTextContent } from '../../utils/slot';
import XBElement from '../../common/xb-element';
import styles from './menu-item.styles';

import '../form/checkbox';
import '../icon';

@customElement( 'xb-menu-item' )
export class MenuItem extends XBElement {
	static styles = [ styles() ];

	/**
	 * Should the button be disabled.
	 * @type {MenuItemAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Select item size.
	 * @type {MenuItemAttributes['size']}
	 */
	@property( { type: String } ) size;

	/**
	 * Is this a selected option.
	 * @type {MenuItemAttributes['selected']}
	 */
	@property( { type: Boolean, reflect: true } ) selected;

	/**
	 * Selection strategy.
	 * @type {MenuItemAttributes['type']}
	 */
	@property( { type: String } ) type;

	/**
	 * Value that this option represents.
	 * @type {MenuItemAttributes['value']}
	 */
	@property( { type: String, reflect: true } ) value;

	constructor() {
		super();

		this.disabled = false;
		this.selected = false;
		this.size = 'small';
		this.type = 'single';
		this.value = '';
	}

	/** Returns a text label based on the contents of the menu item's default slot. */
	text() {
		/** @type {HTMLSlotElement} */
		const slot = this.shadowRoot.querySelector( 'slot:not([name])' );

		/**
		 * FIXME: the fallback is needed for when `slot` is still null,
		 * but this might not be enough for all cases.
		 */
		return getTextContent( slot ) || String( this.textContent ?? '' ).trim();
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
				aria-label="${ this.text() }"
				?disabled="${ this.disabled }"
				@click=${ this.reemit }
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
	 * @returns {import('../button/button').Button}
	 **/
	get button() {
		return this.shadowRoot.querySelector( 'button' );
	}
}

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
