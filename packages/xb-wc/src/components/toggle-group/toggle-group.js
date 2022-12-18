import { html } from 'lit';
import withClassy from '@welingtonms/classy';

import { TOGGLE_EVENT } from './toggle-group.constants';
import SelectionMixin from '../../mixins/selection';
import styles from './toggle-group.styles';
import XBElement from '../../common/xb-element';

import '../layout/cluster';

export class ToggleGroup extends SelectionMixin( XBElement, {
	listen: TOGGLE_EVENT,
} ) {
	static styles = [ styles() ];

	/** @type {HTMLSlotElement} */
	_defaultSlot;

	static get properties() {
		return {
			/**
			 * Should the button be disabled.
			 * @type {ToggleGroupAttributes['disabled']}
			 */
			disabled: { type: Boolean, reflect: true },

			/**
			 * Button size.
			 * @type {ToggleGroupAttributes['size']}
			 */
			size: { type: String },

			/**
			 * Aria role
			 * @type {ToggleGroupAttributes['role']}
			 */
			role: {
				type: String,
				reflect: true,
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
		`;
	}

	/**
	 * @returns {import('./toggle').ToggleButton[]}
	 */
	_getToggles() {
		this._defaultSlot =
			this._defaultSlot ?? this.shadowRoot.querySelector( 'slot' );

		return [
			...this._defaultSlot.assignedElements( { flatten: true } ),
		].filter( ( item ) => item.tagName.toLowerCase() === 'xb-toggle' );
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
		/** @type {SelectionController} */
		const controller = this._selectionController;

		toggle.checked = controller.selection.has( toggle.value );
	}

	/**
	 * @param {import('./toggle').ToggleButton} toggle
	 */
	_setToggleDisabled( toggle ) {
		toggle.disabled = this.disabled;
	}
}

window.customElements.define( 'xb-toggle-group', ToggleGroup );

// @ts-ignore
// declare global {
//   interface HTMLElementTagNameMap {
//     "xb-toggle-group": ToggleGroup;
//   }
// }

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasis
 * @typedef {('small' | 'medium' | 'large')} ButtonSize
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} ToggleGroupType
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
