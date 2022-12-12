import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import { CHECK_EVENT } from './checkbox.constants';
import XBElement from '../../../common/xb-element';
import styles from './checkbox.styles';

export class CheckboxInput extends XBElement {
	button = createRef();

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {CheckboxAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Should the button be checked.
			 * @type {CheckboxAttributes['checked']}
			 */
			checked: { type: Boolean, reflect: true },

			/**
			 * Value this radio button represents.
			 * @type {CheckboxAttributes['size']}
			 */
			size: { type: String },

			/**
			 * Value this radio button represents.
			 * @type {CheckboxAttributes['value']}
			 */
			value: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {CheckboxAttributes['disabled']} */
		this.disabled = false;

		/** @type {CheckboxAttributes['size']} */
		this.size = 'small';

		/** @type {CheckboxAttributes['checked']} */
		this.checked = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'checkbox' );

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
	}

	render() {
		const { when, classy } = withClassy( { size: this.size } );

		return html`
			<button
				${ ref( this.button ) }
				type="button"
				class=${ classy( 'checkbox', {
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				} ) }
				role="checkbox"
				aria-checked="${ this.checked }"
				?disabled="${ this.disabled }"
			>
				<xb-icon name="check" class="check"></xb-icon>
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

	_handleClick() {
		if ( this.disabled ) {
			return;
		}

		this.checked = ! this.checked;

		this._publish();
	}

	_publish() {
		const options = {
			detail: { value: this.value, checked: this.checked },
		};

		this.emit( CHECK_EVENT, options );
	}
}

window.customElements.define( 'xb-checkbox', CheckboxInput );

/**
 * @typedef {import('../../../styles/size.styles').ElementSize} CheckboxSize
 */

/**
 * @typedef {Object} CheckboxAttributes
 * @property {boolean} disabled
 * @property {boolean} checked
 * @property {string} value
 * @property {CheckboxSize} size
 */
