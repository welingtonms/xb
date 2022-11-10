import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import { CHECK_EVENT } from './radio-group.constants';
import XBElement from '../../../common/xb-element';
import styles from './radio.styles';
import '../../layout/cluster';

export class RadioInput extends XBElement {
	input = createRef();

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
		const input = this._getInput();

		input.focus();

		// to mimic the native behavior
		this._handleClick();
	}

	render() {
		const { when, classy } = withClassy( { size: this.size } );

		return html`
			<label
				class=${ classy( 'radio', {
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				} ) }
			>
				<input
					${ ref( this.input ) }
					type="radio"
					?checked="${ this.checked }"
					?disabled="${ this.disabled }"
					name="aaa"
				/>
				<slot name="leading"></slot>
				<slot></slot>
				<slot name="trailing"></slot>
			</label>
		`;
	}

	/**
	 * @returns {HTMLInputElement}
	 */
	_getInput() {
		return this.input.value;
	}

	_setDisabled() {
		const input = this._getInput();

		this.setAttribute( 'aria-disabled', String( this.disabled ) );
		input.disabled = this.disabled;
	}

	_setChecked() {
		const input = this._getInput();

		this.setAttribute( 'aria-checked', String( this.checked ) );
		input.checked = this.checked;
	}

	_handleClick() {
		if ( this.disabled ) {
			return;
		}

		this.checked = ! this.checked;

		const options = {
			detail: { value: this.value, type: 'toggle' },
		};

		this.emit( CHECK_EVENT, options );
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
