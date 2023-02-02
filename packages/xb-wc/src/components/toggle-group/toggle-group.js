import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import styles from './toggle-group.styles';
import XBElement from '../../common/xb-element';

import '../selection-keeper';
import '../layout/cluster';

export class ToggleGroup extends XBElement {
	/** @type {HTMLSlotElement} */
	_defaultSlot;

	static styles = [ styles() ];

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {ToggleGroupAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Aria role
			 * @type {ToggleGroupAttributes['role']}
			 */
			role: {
				type: String,
				reflect: true,
			},

			/**
			 * Button size.
			 * @type {ToggleGroupAttributes['size']}
			 */
			size: { type: String },

			/**
			 * Selection strategy.
			 * @type {ToggleGroupAttributes['type']}
			 */
			type: { type: String },

			/**
			 * Selection value.
			 * @type {ToggleGroupAttributes['value']}
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

		/** @type {ToggleGroupAttributes['type']} */
		this.type = 'single-strict';

		/** @type {ToggleGroupAttributes['size']} */
		this.size = 'small';

		this.role = [ 'single', 'single-strict' ].includes( this.type )
			? 'radiogroup'
			: 'group';

		/** @type {SelectionState} */
		this._selection = new Set();
	}

	connectedCallback() {
		super.connectedCallback();

		this._handleSelectionChange = this._handleSelectionChange.bind( this );
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'role' ) ) {
			this._getToggles().forEach( ( toggle ) => {
				this._setToggleRole( toggle );
			} );
		}

		if ( changedProperties.has( 'disabled' ) ) {
			this._getToggles().forEach( ( toggle ) => {
				this._setToggleDisabled( toggle );
			} );
		}

		if ( changedProperties.has( 'size' ) ) {
			this._getToggles().forEach( ( toggle ) => {
				this._setToggleSize( toggle );
			} );
		}

		this._getToggles().forEach( ( toggle ) => {
			this._setToggleChecked( toggle );
		} );
	}

	render() {
		const { classy, when } = withClassy( { type: this.type } );

		// TODO: add proper accessibility features
		return html`
			<xb-selection-keeper
				.value=${ this.value }
				@xb-selection-change=${ this._handleSelectionChange }
				listen="xb-toggle-click"
				type=${ this.type }
			>
				<xb-cluster
					class=${ classy( 'toggle-group', {
						'-single': when( { type: [ 'single', 'single-strict' ] } ),
						'-multiple': when( { type: 'multiple' } ),
					} ) }
					borderless="none"
					paddingless="none"
					?disabled="${ this.disabled }"
				>
					<slot></slot>
				</xb-cluster>
			</xb-selection-keeper>
		`;
	}

	/**
	 * @returns {import('./toggle').ToggleButton[]}
	 */
	_getToggles() {
		this._defaultSlot = this._defaultSlot ?? this.shadowRoot.querySelector( 'slot' );

		return [ ...this._defaultSlot.assignedElements( { flatten: true } ) ].filter(
			( item ) => item.matches( 'xb-toggle' )
		);
	}

	/**
	 * @param {import('./toggle').ToggleButton} toggle
	 */
	_setToggleRole( toggle ) {
		toggle.setAttribute(
			'role',
			[ 'single', 'single-strict' ].includes( this.type ) ? 'radio' : 'checkbox'
		);
	}

	/**
	 * @param {import('./toggle').ToggleButton} toggle
	 */
	_setToggleSize( toggle ) {
		toggle.size = this.size;
	}

	/**
	 * @param {import('./toggle').ToggleButton} toggle
	 */
	_setToggleChecked( toggle ) {
		toggle.checked = this._selection.has( toggle.value );
	}

	/**
	 * @param {import('./toggle').ToggleButton} toggle
	 */
	_setToggleDisabled( toggle ) {
		toggle.disabled = this.disabled;
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

window.customElements.define( 'xb-toggle-group', ToggleGroup );

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasis
 * @typedef {('small' | 'medium' | 'large')} ButtonSize
 */

/**
 * @typedef {import('./toggle').ToggleButton} ToggleButton
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} ToggleGroupType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('../../styles/size.styles').ElementSize} ToggleSize
 */

/**
 * @typedef {Object} ToggleGroupAttributes
 * @property {ToggleGroupType} type Strategy for toggling.
 * @property {boolean} disabled Should the button be disabled.
 * @property {ToggleSize} size Toggle button size.
 * @property {'group' | 'radiogroup'} role Aria role
 * @property {string | string[]} [value] Selection value
 */
