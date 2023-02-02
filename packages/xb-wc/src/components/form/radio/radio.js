import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../../common/xb-element';
import styles from './radio.styles';

export class RadioInput extends XBElement {
	button = createRef();

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {RadioAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Should the button be checked.
			 * @type {RadioAttributes['checked']}
			 */
			checked: { type: Boolean, reflect: true },

			/**
			 * Value this radio button represents.
			 * @type {RadioAttributes['size']}
			 */
			size: { type: String },

			/**
			 * Value this radio button represents.
			 * @type {RadioAttributes['value']}
			 */
			value: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {RadioAttributes['disabled']} */
		this.disabled = false;

		/** @type {RadioAttributes['size']} */
		this.size = 'small';

		/** @type {RadioAttributes['checked']} */
		this.checked = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'radio' );

		this.addEventListener( 'click', this._handleClick );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'click', this._handleClick );
	}

	/**
	 *
	 * @param {import("lit").PropertyValues} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this._setDisabled();
		}

		if ( changedProperties.has( 'checked' ) ) {
			this._setChecked();
		}
	}

	focus() {
		this._getButton().focus();

		// to mimic the native behavior
		this._handleClick();
	}

	render() {
		const { when, classy } = withClassy( { size: this.size } );

		return html`
			<button
				${ ref( this.button ) }
				type="button"
				class=${ classy( 'radio', {
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				} ) }
				role="radio"
				aria-checked="${ this.checked }"
				?disabled="${ this.disabled }"
			>
				<xb-icon class="check" name="circle"></xb-icon>
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</button>
		`;
	}

	/**
	 * @returns {HTMLButtonElement}
	 */
	_getButton() {
		return this.button.value;
	}

	_setDisabled() {
		const button = this._getButton();

		this.setAttribute( 'aria-disabled', String( this.disabled ) );
		button.disabled = this.disabled;
	}

	_setChecked() {
		const button = this._getButton();

		this.setAttribute( 'aria-checked', String( this.checked ) );
		button.setAttribute( 'aria-checked', String( this.checked ) );
	}

	_handleClick( e ) {
		if ( this.disabled ) {
			return;
		}

		this.checked = ! this.checked;

		this._publish();
	}

	_publish() {
		const options = {
			detail: { value: this.value, type: 'select' },
		};

		this.emit( 'xb-check', options );
	}
}

window.customElements.define( 'xb-radio', RadioInput );

/**
 * @typedef {import('../../../styles/size.styles').ElementSize} RadioSize
 */

/**
 * @typedef {Object} RadioAttributes
 * @property {boolean} disabled
 * @property {boolean} checked
 * @property {string} value
 * @property {RadioSize} size
 */
