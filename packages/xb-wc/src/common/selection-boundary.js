import { state, property } from 'lit/decorators.js';
import toArray from '@welingtonms/xb-toolset/dist/to-array';
import createSelectionStrategy from '@welingtonms/xb-toolset/dist/selection';

import XBElement from './xb-element';

class SelectionBoundary extends XBElement {
	/**
	 * Event triggered when a selection happens. Default = 'xb-selection-select'
	 * @type {string}
	 */
	@property( { type: String, reflect: false, attribute: false } ) accessor listen;

	/**
	 * Selection strategy.
	 * @type {SelectionType}
	 */
	@property( { type: String } ) accessor type;

	/**
	 * Selection value.
	 * This should be typed in the subclass.
	 * @type {SelectionOption | SelectionOption[] | null}
	 */
	@property() accessor value;

	/**
	 * Internal selection state.
	 * @type {SelectionState}
	 */
	@state() accessor selection;

	/**
	 * Internal selection strategy management.
	 * @type {SelectionStrategy}
	 */
	strategy;

	constructor() {
		super();

		this.listen = '';
		this.selection = new Set();
		this.strategy = null;
		this.value = null;
	}

	connectedCallback() {
		super.connectedCallback();

		if ( this.listen === '' ) {
			console.warn( '[selection-boundary] you forgot to set the selection event.' );
		}

		this.addEventListener( this.listen, this._handleSelection );
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener( this.listen, this._handleSelection );
	}

	/**
	 * @param {import('lit').PropertyValues<SelectionBoundary>} changedProperties
	 */
	update( changedProperties ) {
		if ( this.strategy == null || ( this.type != null && changedProperties.has( 'type' ) ) ) {
			this.strategy = createSelectionStrategy( { type: this.type } );
			this.selection = this.strategy.init( Array.from( this.selection ) );
		}

		if ( changedProperties.has( 'value' ) ) {
			const value = this._toSelectionValue( this.value );
			this.selection = this.strategy.init( value );
		}

		super.update( changedProperties );
	}

	/**
	 * @param {import('lit').PropertyValues<SelectionBoundary>} changedProperties
	 */
	updated( changedProperties ) {
		if ( changedProperties.has( 'selection' ) ) {
		}
	}

	/**
	 * Subclasses that handle non-string based values should override this method.
	 * @param {SelectionOption | SelectionOption[] | null} value
	 * @returns {string[]}
	 */
	_toSelectionValue( value ) {
		return toArray( value );
	}

	/**
	 * Handle selection events, listened by the `listen` attribute.
	 * @param {CustomEvent<SelectionEventDetail>} event
	 * @returns
	 */
	_handleSelection = ( event ) => {
		const {
			detail: { type = 'toggle', value },
		} = event;

		if ( this.type == null ) {
			console.warn( '[selection-boundary] you forgot to set the selection type.' );
			return;
		}

		switch ( type ) {
			case 'select':
				this.selection = this.strategy.select( toArray( value ), this.selection );
				break;
			case 'unselect':
				this.selection = this.strategy.unselect( toArray( value ), this.selection );
				break;
			case 'toggle':
			default:
				this.selection = this.strategy.toggle( toArray( value ), this.selection );
				break;
		}
	};
}

export default SelectionBoundary;

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} SelectionStrategy
 * @typedef {'select' | 'unselect' | 'toggle'} SelectionOperation
 */

/**
 * @typedef {Object} SelectionKeeperAttributes
 * @property {SelectionType} type - Selection strategy.
 * @property {string | string[] | SelectionOption | SelectionOption[]} value - Selection value.
 * @property {string | string[]} [listen] - Event triggered when a selection happens. Default = 'xb-selection-select'
 */

/**
 * @typedef {Object} SelectionAdapter
 * @property {(obj: unknown) => string} getValue - get unique identifier for the given object
 * @property {(obj: unknown) => string} getLabel - get unique label for the given object
 */

/**
 * @typedef {Object} SelectionControllerOptions
 * @property {string} listen - Event triggered when a selection happens.
 * @property {SelectionType} type - Selection type.
 * @property {null | string | string[]} [value] - Selection value.
 * @property {SelectionAdapter[]} [adapters] - Adapters to use for selection.
 * @property {(detail: SelectionEventDetail) => void} [callback] - Event triggered when a selection happens.
 */

/**
 * @typedef {Object} SelectionEventDetail
 * @property {SelectionOperation} type - type of selection being performed
 * @property {null | string | string[]} value - currently selected value, consolidated according to the selection type.
 * @property {SelectionState} state - currently selection state
 * @property {string[]} changed - values that changed from the previously selected value
 */

/**
 * @typedef {import('lit').LitElement} LitElement
 * @typedef {import('./data._selectionController').Datasource} Datasource
 */

/**
 * @typedef {Object} GenericSelectionOption
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} CustomSelectionOption
 * @property {string} _type
 */

/**
 * @typedef {string | GenericSelectionOption | CustomSelectionOption} SelectionOption
 */
