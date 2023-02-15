import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import { CHECK_EVENT } from './checkbox.constants';
import XBElement from '../../../common/xb-element';
import styles from './checkbox.styles';

@customElement( 'xb-checkbox' )
export class CheckboxInput extends XBElement {
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
	 * Value this radio button represents.
	 * @type {CheckboxAttributes['size']}
	 */
	@property( { type: String } ) size;

	/**
	 * Value this radio button represents.
	 * @type {CheckboxAttributes['value']}
	 */
	@property( { type: String } ) value;

	constructor() {
		super();

		this.checked = false;

		this.disabled = false;

		this.size = 'small';
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
		this.button.focus();
	}

	render() {
		const { when, classy } = withClassy( { size: this.size } );

		return html`
			<button
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
