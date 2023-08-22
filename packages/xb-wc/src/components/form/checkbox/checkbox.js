import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getTextContent } from '../../../utils/slot';
import KeyboardSupportController from '../../../controllers/keyboard-support';
import {
	CheckboxController,
	CheckboxGroupController,
} from '../../../controllers/checkbox-pattern';
import withID from '../../../mixins/with-id';
import XBElement from '../../../common/xb-element';

import '../../icon';

import styles from './checkbox.styles';

@customElement( 'xb-checkbox' )
export class Checkbox extends withID( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Should the button be disabled.
	 * @type {CheckboxAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Should the button be checked.
	 * @type {CheckboxAttributes['checked']}
	 */
	@property( { type: Boolean, reflect: true } ) checked;

	/**
	 * Should the button be checked.
	 * @type {CheckboxAttributes['indeterminate']}
	 */
	@property( { type: Boolean, reflect: true } ) indeterminate;

	/**
	 * Value this radio checkbox represents.
	 * @type {CheckboxAttributes['size']}
	 */
	@property( { type: String } ) size;

	/**
	 * Value this radio checkbox represents.
	 * @type {CheckboxAttributes['value']}
	 */
	@property( { type: String } ) value;

	/**
	 * @type {Checkbox[]}
	 */
	_group;

	/** @type {CheckboxPatternController} */
	_controller;

	constructor() {
		super();

		this.checked = false;
		this.disabled = false;
		this.size = 'small';
	}

	connectedCallback() {
		this._controller = this.getAttribute( 'aria-controls' )
			? new CheckboxGroupController( this )
			: new CheckboxController( this );

		this.role = 'checkbox';
		this.tabIndex = 0;

		super.connectedCallback();
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

		if (
			changedProperties.get( 'checked' ) != null ||
			changedProperties.get( 'indeterminate' ) != null
		) {
			// this.setAttribute( 'aria-checked', this.checked );

			this.emit( 'xb:change', {
				detail: {
					value: this.value,
					checked: Boolean( this.checked ),
					indeterminate: Boolean( this.indeterminate ),
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
				<xb-icon name="check"></xb-icon>
				<xb-icon name="remove"></xb-icon>
			</span>
			<slot name="leading"></slot>
			<slot></slot>
			<slot name="trailing"></slot>
		`;
	}
}

/**
 * @typedef {import('../../../styles/size.styles').ElementSize} CheckboxSize
 */

/**
 * @typedef {import('../../../controllers/keyboard-support').default} KeyboardSupportController
 */

/**
 * @typedef {{
 * 	keyboard: KeyboardSupportController;
 * }} CheckboxPatternControllers
 */

/**
 * @typedef {{
 * 	value: string;
 *   checked: boolean;
 * }} CheckboxEventDetail
 */

/**
 * @typedef {Object} CheckboxAttributes
 * @property {boolean} disabled
 * @property {boolean} checked
 * @property {boolean} hasMixedState
 * @property {string} value
 * @property {CheckboxSize} size
 */
