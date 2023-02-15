import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import withClassy from '@welingtonms/classy';

import XBElement from '../../../common/xb-element';
import styles from './radio.styles';

@customElement( 'xb-radio' )
export class RadioInput extends XBElement {
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
	 * Value this radio button represents.
	 * @type {RadioAttributes['size']}
	 */
	@property( { type: String } ) size;

	/**
	 * Value this radio button represents.
	 * @type {RadioAttributes['value']}
	 */
	@property( { type: String } ) value;

	constructor() {
		super();

		this.disabled = false;

		this.size = 'small';

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
		this.button.focus();

		// to mimic the native behavior
		this._handleClick();
	}

	render() {
		const { when, classy } = withClassy( { size: this.size } );

		return html`
			<button
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

	get button() {
		return this.shadowRoot.querySelector( 'button' );
	}

	_setDisabled() {
		this.setAttribute( 'aria-disabled', String( this.disabled ) );
		this.button.disabled = this.disabled;
	}

	_setChecked() {
		this.setAttribute( 'aria-checked', String( this.checked ) );
		this.button.setAttribute( 'aria-checked', String( this.checked ) );
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
