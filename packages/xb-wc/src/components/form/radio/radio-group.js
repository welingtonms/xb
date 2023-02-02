import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import styles from './radio-group.styles';
import XBElement from '../../../common/xb-element';

import '../../selection-keeper';
import '../../focus-trap';
import '../../layout/stack';

export class RadioGroup extends XBElement {
	/** @type {import('../../focus-trap').FocusTrap} */
	_trap;

	/** @type {HTMLSlotElement} */
	_defaultSlot;

	static styles = [ styles() ];

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

			/**
			 * Selection value.
			 * @type {RadioGroupAttributes['value']}
			 */
			value: {},

			/**
			 * `Set` that represents the current selection value.
			 * @type {SelectionState}
			 */
			_selection: {
				state: true,
			},
		};
	}

	constructor() {
		super();

		/** @type {SelectionType} */
		this.type = 'single-strict';

		/** @type {SelectionState} */
		this._selection = new Set();
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'radiogroup' );

		this._handleSelectionChange = this._handleSelectionChange.bind( this );

		this.addEventListener( 'focusin', this._handleFocus );
		this.addEventListener( 'focusout', this._handleBlur );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( 'focusin', this._handleFocus );
		this.removeEventListener( 'focusout', this._handleBlur );
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

	get trap() {
		this._trap = this._trap ?? this.shadowRoot.querySelector( 'xb-focus-trap' );

		return this._trap;
	}

	render() {
		const { classy, when } = withClassy( { type: this.type } );

		// TODO: add proper accessibility features
		return html`
			<xb-selection-keeper
				.value=${ this.value }
				@xb-selection-change=${ this._handleSelectionChange }
				listen="xb-check"
				type=${ this.type }
			>
				<xb-focus-trap>
					<xb-stack
						as="fieldset"
						class=${ classy( 'radio-group' ) }
						paddingless
						?disabled="${ this.disabled }"
					>
						<slot></slot>
					</xb-stack>
				</xb-focus-trap>
			</xb-selection-keeper>
		`;
	}

	_handleFocus() {
		this.trap.activate();
	}

	_handleBlur() {
		this.trap.deactivate();
	}

	/**
	 * @returns {import('./radio').RadioInput[]}
	 */
	_getRadios() {
		this._defaultSlot = this._defaultSlot ?? this.shadowRoot.querySelector( 'slot' );

		return [ ...this._defaultSlot.assignedElements( { flatten: true } ) ].filter(
			( item ) => item.matches( 'xb-radio' )
		);
	}

	/**
	 * @param {import('./radio').RadioInput} radio
	 */
	_setRadioChecked( radio ) {
		radio.checked = this._selection.has( radio.value );
	}

	/**
	 * @param {import('./radio').RadioInput} radio
	 */
	_setRadioDisabled( radio ) {
		radio.disabled = this.disabled;
	}

	_handleSelectionChange( event ) {
		event.stopPropagation();

		const {
			detail: { value, state },
		} = event;

		this._selection = state;

		this.emit( 'xb-change', { detail: { value } } );
	}
}

window.customElements.define( 'xb-radio-group', RadioGroup );

/**
 * @typedef {import('../../../styles/size.styles').ElementSize} ToggleSize
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('../../focus-trap').FocusTrap} FocusTrap
 */

/**
 * @typedef {Object} RadioGroupAttributes
 * @property {'group' | 'radiogroup'} role Aria role
 * @property {boolean} disabled Should the button be disabled.
 * @property {string} [value] Selection value
 * @property {ToggleSize} size Toggle button size.
 */
