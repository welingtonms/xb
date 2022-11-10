import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import { CHECK_EVENT } from './radio-group.constants';
import FocusTrapMixin from '../../../mixins/focus-trap';
import SelectionManagerMixin from '../../../mixins/selection';
import styles from './radio-group.styles';
import XBElement from '../../../common/xb-element';

import '../../layout/stack';

export class RadioGroup extends SelectionManagerMixin(
	FocusTrapMixin( XBElement, [ 'ArrowUp', 'ArrowDown' ] ),
	CHECK_EVENT
) {
	static styles = [ styles() ];

	/** @type {HTMLSlotElement} */
	defaultSlot;

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {RadioGroupAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Button size.
			 * @type {RadioGroupAttributes['size']}
			 */
			size: { type: String },
		};
	}

	constructor() {
		super();

		/** @type {import('@welingtonms/xb-toolset/dist/selection').SelectionType} */
		this.type = 'single-strict';
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'radiogroup' );
	}

	/**
	 * @param {import('lit').PropertyValues<RadioGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'disabled' ) ) {
			this._getRadios().forEach( ( radio ) => {
				this._setRadioDisabled( radio );
			} );
		}

		if ( changedProperties.has( '_selection' ) ) {
			this._getRadios().forEach( ( radio ) => {
				this._setRadioChecked( radio );
			} );
		}
	}

	render() {
		const { classy, when } = withClassy( { type: this.type } );

		// TODO: add proper accessibility features
		return html`
			<xb-stack
				class=${ classy( 'radio-group' ) }
				borderless="none"
				paddingless="none"
				?disabled="${ this.disabled }"
			>
				<slot></slot>
			</xb-stack>
		`;
	}

	/**
	 * @returns {import('./radio').RadioInput[]}
	 */
	_getRadios() {
		this.defaultSlot = this.defaultSlot ?? this.shadowRoot.querySelector( 'slot' );

		return [ ...this.defaultSlot.assignedElements( { flatten: true } ) ].filter(
			( item ) => item.tagName.toLowerCase() === 'xb-radio'
		);
	}

	/**
	 * @param {import('./radio').RadioInput} radio
	 */
	_setRadioChecked( radio ) {
		if ( radio.checked !== this._selection.has( radio.value ) ) {
			radio.checked = this._selection.has( radio.value );
		}
	}

	/**
	 * @param {import('./radio').RadioInput} radio
	 */
	_setRadioDisabled( radio ) {
		if ( radio.disabled !== this.disabled ) {
			radio.disabled = this.disabled;
		}
	}
}

window.customElements.define( 'xb-radio-group', RadioGroup );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-radio-group": RadioGroup;
//   }
// }

/**
 * @typedef {import('../../../styles/size.styles').ElementSize} ToggleSize
 */

/**
 * @typedef {Object} RadioGroupAttributes
 * @property {'group' | 'radiogroup'} role Aria role
 * @property {boolean} disabled Should the button be disabled.
 * @property {string} [value] Selection value
 * @property {ToggleSize} size Toggle button size.
 */
