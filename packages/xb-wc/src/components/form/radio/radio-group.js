import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import styles from './radio-group.styles';
import XBElement from '../../../common/xb-element';

import '../../selection-keeper';
import '../../focus-trap';
import '../../layout/stack';

@customElement( 'xb-radio-group' )
export class RadioGroup extends XBElement {
	static styles = [ styles() ];

	/**
	 * Should the button be disabled.
	 * @type {RadioGroupAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Button size.
	 * @type {RadioGroupAttributes['size']}
	 */
	@property( { type: String } ) size;

	/**
	 * Selection value.
	 * @type {RadioGroupAttributes['value']}
	 */
	@property( {} ) value;

	/**
	 * `Set` that represents the current selection value.
	 * @type {SelectionState}
	 */
	@property( { state: true } ) _selection;

	/** @type {import('../../focus-trap').FocusTrap} */
	_trap;

	constructor() {
		super();

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

	render() {
		const { classy, when } = withClassy( {} );

		// TODO: add proper accessibility features
		return html`
			<xb-selection-keeper
				.value=${ this.value }
				@xb-selection-change=${ this._handleSelectionChange }
				listen="xb-check"
				type="single-strict"
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

	get trap() {
		this._trap = this._trap ?? this.shadowRoot.querySelector( 'xb-focus-trap' );

		return this._trap;
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
		const _defaultSlot = this.shadowRoot.querySelector( 'slot' );

		return [ ..._defaultSlot.assignedElements( { flatten: true } ) ].filter( ( item ) =>
			item.matches( 'xb-radio' )
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
