import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getTextContent } from '../../utils/slot';
import XBElement from '../../common/xb-element';
import withID from '../../mixins/with-id';

import styles from './menu-item.styles';

@customElement( 'xb-item' )
export class MenuItem extends withID( XBElement, 'xb-item' ) {
	static styles = [ styles() ];

	/**
	 * Should the button be disabled.
	 * @type {MenuItemAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	constructor() {
		super();

		this.disabled = false;

		this.addEventListener( 'click', this._handleClick );
		this.addEventListener( 'keyup', this._handleKeyUp );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'menuitem' );
		this.setAttribute( 'tabindex', -1 );
	}

	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.setBooleanAttribute( 'aria-disabled', this.disabled );
		}
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

	render() {
		return html`
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}

	_handleClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();
		}
	};

	_handleKeyUp = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();
			event.preventDefault();
		}
	};
}

/**
 * @typedef {import('../../styles/size.styles').ElementSize} SelectionMenuItemSize
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 */

/**
 * @typedef {Object} MenuItemAttributes
 * @property {boolean} [open] - Is the dropdown menu open.
 * @property {boolean} disabled Should the button be disabled.
 * @property {SelectionMenuItemSize} size
 * @property {SelectionType} type
 * @property {boolean} [selected] - Is this a selected option
 * @property {string} value Value that this option represents.
 */

// return html`
// 			<button
// 				type="button"
// 				class="${ classy( 'menu-item', {
// 					'-extra-small': when( { size: 'extra-small' } ),
// 					'-small': when( { size: 'small' } ),
// 					'-medium': when( { size: 'medium' } ),
// 					'-large': when( { size: 'large' } ),
// 				} ) }"
// 				role="option"
// 				aria-selected="${ this.selected ? 'true' : 'false' }"
// 				aria-label="${ this.text() }"
// 				?disabled="${ this.disabled }"
// 				@click=${ this.reemit }
// 			>
// 				${ this.type == 'multiple'
// 					? html`
// 							<xb-checkbox tabindex="-1" ?checked=${ this.selected }></xb-checkbox>
// 					  `
// 					: nothing }

// 				<slot name="leading"></slot>
// 				<slot></slot>

// 				${ this.type != 'multiple'
// 					? html`
// 							<xb-icon name="check" class="check"></xb-icon>
// 					  `
// 					: nothing }
// 			</button>
// 		`;
