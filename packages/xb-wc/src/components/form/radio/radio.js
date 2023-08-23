import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './radio.styles';
import { getTextContent } from '../../../utils/slot';
import withID from '../../../mixins/with-id';
import XBElement from '../../../common/xb-element';

import '../../icon';

@customElement( 'xb-radio' )
export class Radio extends withID( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Should the button be disabled.
	 * @type {RadioAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Should the button be checked.
	 * @type {RadioAttributes['checked']}
	 */
	@property( { type: Boolean, reflect: true } ) checked;

	/**
	 * Value this radio checkbox represents.
	 * @type {RadioAttributes['size']}
	 */
	@property( { type: String, reflect: true } ) size;

	/**
	 * Value this radio checkbox represents.
	 * @type {RadioAttributes['value']}
	 */
	@property( { type: String, reflect: true } ) value;

	constructor() {
		super();

		this.checked = false;
		this.disabled = false;
		this.size = 'small';
	}

	connectedCallback() {
		super.connectedCallback();

		this.role = 'radio';

		this.addEventListener( 'click', this._handleClick );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this._handleClick );
	}

	firstUpdated( changedProperties ) {
		super.firstUpdated( changedProperties );

		if ( ! this.value ) {
			this.value = this.text();
		}
	}

	/**
	 *
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this.setBooleanAttribute( 'aria-disabled', this.disabled );
		}

		if ( changedProperties.has( 'checked' ) ) {
			this.setAttribute( 'aria-checked', this.checked );
		}

		if ( changedProperties.get( 'checked' ) != null ) {
			this.emit( 'xb:change', {
				detail: {
					value: this.value,
					checked: Boolean( this.checked ),
				},
			} );
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
			<span class="check">
				<xb-icon name="circle"></xb-icon>
			</span>
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

		return false;
	};
}

/**
 * @typedef {import('../../../styles/size.styles').ElementSize} RadioSize
 */

/**
 * @typedef {import('../../../controllers/keyboard-support').default} KeyboardSupportController
 */

/**
 * @typedef {{
 * 	keyboard: KeyboardSupportController;
 * }} RadioPatternControllers
 */

/**
 * @typedef {{
 * 	value: string;
 *   checked: boolean;
 * }} RadioEventDetail
 */

/**
 * @typedef {Object} RadioAttributes
 * @property {boolean} disabled
 * @property {boolean} checked
 * @property {string} value
 * @property {RadioSize} size
 */
