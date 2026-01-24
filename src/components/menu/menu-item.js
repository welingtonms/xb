import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { WithIDMixin } from '../../mixins/with-id';
import { XBElement } from '../xb-element';

import { menuItemStyles } from './base-menu.styles';
import { getTextContent } from '../../utils/slot';

import '../icon/icon.define';

export class MenuItem extends WithIDMixin( XBElement, 'xb-item' ) {
	static styles = [ menuItemStyles() ];

	/**
	 * Should the button be disabled.
	 * @type {MenuItemAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor disabled;

	/**
	 * Icon to display in the menu item leading slot.
	 * @type {MenuItemAttributes['icon']}
	 */
	@property( { type: String, reflect: true } ) accessor icon;

	/**
	 * Should the menu item be selected.
	 * @type {MenuItemAttributes['selected']}
	 */
	@property( { type: Boolean, reflect: true } ) accessor selected;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-item', ...config, type: MenuItem } );
	}

	constructor() {
		super();

		this.disabled = false;

		this.addEventListener( 'click', this.#onClick );
		this.addEventListener( 'keyup', this.#onKeyUp );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'menuitem' );
		this.setAttribute( 'tabindex', -1 );
	}

	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.setAttribute( 'aria-disabled', Boolean( this.disabled ) );
		}
	}

	/** Returns a text label based on the contents of the menu item's default slot. */
	text() {
		/** @type {HTMLSlotElement} */
		const slot = this.renderRoot.querySelector( 'slot:not([name])' );

		/**
		 * FIXME: the fallback is needed for when `slot` is still null,
		 * but this might not be enough for all cases.
		 */
		return getTextContent( slot ) || String( this.textContent ?? '' ).trim();
	}

	render() {
		return html`
			<slot name="leading">
				${ this.icon
					? html`
							<xb-icon name="${ this.icon }"></xb-icon>
					  `
					: nothing }
			</slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}

	#onClick = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();

			return;
		}
	};

	#onKeyUp = ( event ) => {
		if ( this.disabled ) {
			event.stopPropagation();

			return;
		}
	};
}

/**
 * @typedef {import('../icon').IconName} IconName
 */

/**
 * @typedef {Object} MenuItemAttributes
 * @property {boolean} disabled Should the button be disabled.
 * @property {boolean} selected Should the button be selected.
 * @property {IconName} [icon] Icon to display in the menu item leading slot.
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
