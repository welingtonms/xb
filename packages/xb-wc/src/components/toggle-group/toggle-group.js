import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

import styles from './toggle-group.styles';
import ToggleGroupController from './toggle-group.controller';
import WithSelection from '../../mixins/with-selection';
import XBElement from '../../common/xb-element';

import '../layout/cluster';

/**
 * @param {ToggleGroupType} role
 */
function getGroupRole( type ) {
	return [ 'single', 'single-strict' ].includes( type ) ? 'radiogroup' : 'group';
}

/**
 * @param {ToggleGroupType} role
 */
function getToggleRole( type ) {
	return [ 'single', 'single-strict' ].includes( type ) ? 'radio' : 'checkbox';
}

/**
 * @class
 * @template WithSelection, XBElement
 */
@customElement( 'xb-toggle-group' )
export class ToggleGroup extends WithSelection( XBElement ) {
	static styles = [ styles() ];

	/**
	 * Should the button be disabled.
	 * @type {ToggleGroupAttributes['disabled']}
	 */
	@property( { type: Boolean, reflect: true } ) disabled;

	/**
	 * Button size.
	 * @type {ToggleGroupAttributes['size']}
	 */
	@property( { type: String, reflect: true } ) size;

	/** @type {ToggleGroupController} */
	_controller;

	constructor() {
		super();

		this.disabled = false;
		this.selection = 'single-strict';
		this.size = 'extra-small';

		this._controller = new ToggleGroupController( this );
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute( 'tabindex', 0 );
		this.setAttribute( 'role', getGroupRole( this.selection ) );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	update( changedProperties ) {
		if ( changedProperties.has( 'value' ) ) {
			this._controller.selection.init( toArray( this.value ) );
		}

		super.update( changedProperties );
	}

	/**
	 * @param {import('lit').PropertyValues<this>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'selection' ) ) {
			this.setAttribute( 'role', getGroupRole( this.selection ) );
		}

		this._updateGroup();
	}

	render() {
		return html`
			<slot @slotchange=${ this._updateGroup }></slot>
		`;
	}

	_updateGroup = () => {
		const toggles = Array.from( this.querySelectorAll( 'xb-toggle' ) );

		for ( const element of toggles ) {
			// TODO: handle when the toggle itself is disabled (has the disabled attribute)
			element.disabled = this.disabled;
			element.checked = this._controller.selection.selection.has( element.value );

			// setting element.role do not work on Firefox
			element.setAttribute( 'role', getToggleRole( this.selection ) );
		}
	};
}

/**
 * @typedef {import('./toggle').Toggle} Toggle
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
