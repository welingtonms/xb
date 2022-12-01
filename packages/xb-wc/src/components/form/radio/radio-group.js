import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import { CHECK_EVENT } from './radio-group.constants';
import SelectionMixin from '../../../mixins/selection';
import styles from './radio-group.styles';
import XBElement from '../../../common/xb-element';

import '../../focus-trap';
import '../../layout/stack';

export class RadioGroup extends SelectionMixin( XBElement, {
	listen: CHECK_EVENT,
} ) {
	static styles = [ styles() ];

	/** @type {HTMLSlotElement} */
	_defaultSlot;

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

		this._getRadios().forEach( ( radio ) => {
			this._setRadioChecked( radio );
		} );
	}

	render() {
		const { classy, when } = withClassy( { type: this.type } );

		// TODO: add proper accessibility features
		return html`
			<xb-focus-trap>
				<xb-stack
					class=${ classy( 'radio-group' ) }
					borderless="none"
					paddingless="none"
					?disabled="${ this.disabled }"
				>
					<slot></slot>
				</xb-stack>
			</xb-focus-trap>
		`;
	}

	/**
	 * @returns {import('./radio').RadioInput[]}
	 */
	_getRadios() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot' );

		return [
			...this._defaultSlot.assignedElements( { flatten: true } ),
		].filter( ( item ) => item.tagName.toLowerCase() === 'xb-radio' );
	}

	/**
	 * @param {import('./radio').RadioInput} radio
	 */
	_setRadioChecked( radio ) {
		/** @type {SelectionController} */
		const controller = this._controller;

		radio.checked = controller.selection.has( radio.value );
	}

	/**
	 * @param {import('./radio').RadioInput} radio
	 */
	_setRadioDisabled( radio ) {
		radio.disabled = this.disabled;
	}
}

window.customElements.define( 'xb-radio-group', RadioGroup );

/**
 * @typedef {import('../../../styles/size.styles').ElementSize} ToggleSize
 * @typedef {import('../../../controllers/selection/selection.controller').default} SelectionController
 */

/**
 * @typedef {Object} RadioGroupAttributes
 * @property {'group' | 'radiogroup'} role Aria role
 * @property {boolean} disabled Should the button be disabled.
 * @property {string} [value] Selection value
 * @property {ToggleSize} size Toggle button size.
 */
