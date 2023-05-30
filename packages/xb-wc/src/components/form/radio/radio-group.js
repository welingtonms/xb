import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import styles from './radio-group.styles';
import SelectionBoundary from '../../../common/selection-boundary';

import '../../focus-trap';
import '../../layout/stack';

@customElement( 'xb-radio-group' )
export class RadioGroup extends SelectionBoundary {
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

	constructor() {
		super();

		this.listen = 'xb-check';
		this.type = 'single-strict';
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'role', 'radiogroup' );

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
			this.radios.forEach( ( radio ) => {
				this._setRadioDisabled( radio );
			} );
		}

		if ( changedProperties.has( 'selection' ) ) {
			this._handleSelectionChange();
		}

		this.radios.forEach( ( radio ) => {
			this._setRadioChecked( radio );
		} );
	}

	render() {
		const { classy } = withClassy( {} );

		// TODO: add proper accessibility features
		return html`
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
		`;
	}

	get trap() {
		return this.shadowRoot.querySelector( 'xb-focus-trap' );
	}

	_handleFocus = () => {
		this.trap.activate();
	};

	_handleBlur = () => {
		this.trap.deactivate();
	};

	/**
	 * @returns {import('./radio').RadioInput[]}
	 */
	get radios() {
		const _defaultSlot = this.shadowRoot.querySelector( 'slot' );

		return [ ..._defaultSlot.assignedElements( { flatten: true } ) ].filter( ( item ) =>
			item.matches( 'xb-radio' )
		);
	}

	/**
	 * @param {import('./radio').RadioInput} radio
	 */
	_setRadioChecked( radio ) {
		radio.checked = this.selection.has( radio.value );
	}

	/**
	 * @param {import('./radio').RadioInput} radio
	 */
	_setRadioDisabled( radio ) {
		radio.disabled = this.disabled;
	}

	_handleSelectionChange() {
		this.emit( 'xb-change', {
			detail: { value: this.strategy.value( this.selection ) },
		} );
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
