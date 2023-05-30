import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import withClassy from '@welingtonms/classy';

import styles from './toggle-group.styles';
import SelectionBoundary from '../../common/selection-boundary';

import '../layout/cluster';

@customElement( 'xb-toggle-group' )
export class ToggleGroup extends SelectionBoundary {
	static styles = [ styles() ];

	/**
	 * Should the button be disabled.
	 * @type {ToggleGroupAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Aria role
	 * @type {ToggleGroupAttributes['role']}
	 */
	@property( { type: String, reflect: true } ) role;

	/**
	 * Button size.
	 * @type {ToggleGroupAttributes['size']}
	 */
	@property( { type: String } ) size;

	constructor() {
		super();

		this.listen = 'xb-toggle-click';
		this.role = [ 'single', 'single-strict' ].includes( this.type )
			? 'radiogroup'
			: 'group';
		this.size = 'small';
		this.type = 'single-strict';
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'role' ) ) {
			this.toggles.forEach( ( toggle ) => {
				this._setToggleRole( toggle );
			} );
		}

		if ( changedProperties.has( 'disabled' ) ) {
			this.toggles.forEach( ( toggle ) => {
				this._setToggleDisabled( toggle );
			} );
		}

		if ( changedProperties.has( 'size' ) ) {
			this.toggles.forEach( ( toggle ) => {
				this._setToggleSize( toggle );
			} );
		}

		if ( changedProperties.has( 'selection' ) ) {
			this._handleSelectionChange();
		}

		this.toggles.forEach( ( toggle ) => {
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
	get toggles() {
		const defaultSlot = this.shadowRoot.querySelector( 'slot' );

		return ( defaultSlot?.assignedElements() || [] ).filter( ( item ) =>
			item.matches( 'xb-toggle' )
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
		toggle.checked = this.selection.has( toggle.value );
	}

	/**
	 * @param {import('./toggle').ToggleButton} toggle
	 */
	_setToggleDisabled( toggle ) {
		toggle.disabled = this.disabled;
	}

	_handleSelectionChange() {
		this.emit( 'xb-change', {
			detail: { value: this.strategy.value( this.selection ) },
		} );
	}
}

/**
 * @typedef {import('./toggle').ToggleButton} ToggleButton
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} ToggleGroupType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('../../styles/size.styles').ElementSize} ToggleSize
 */

/**
 * @typedef {Object} ToggleGroupAttributes
 * @property {boolean} disabled Should the button be disabled.
 * @property {ToggleSize} size Toggle button size.
 * @property {'group' | 'radiogroup'} role Aria role
 * @property {string | string[]} [value] Selection value
 */
