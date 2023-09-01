import toArray from '@welingtonms/xb-toolset/dist/to-array';
import createSelectionStrategy from '@welingtonms/xb-toolset/dist/selection';

import createLogger from '../../utils/logger';

const logger = createLogger( 'selection-manager' );

/**
 * @implements {ReactiveController}
 */
class SelectionManagerController {
	/** @type {ReactiveControllerHost & { selection: SelectionType, value: SelectionOption | SelectionOption[] | null }} */
	host;

	/**
	 * Internal selection strategy management.
	 * @type {SelectionStrategy}
	 */
	strategy;

	/**
	 * Internal selection state.
	 * @type {SelectionState}
	 */
	selection;

	/**
	 * Value attribute from the host.
	 */
	value;

	/**
	 * @param {XBElement & ReactiveControllerHost} host
	 */
	constructor( host ) {
		this.selection = new Set();
		this.strategy = null;

		( this.host = host ).addController( this );
	}

	hostConnected() {}

	hostUpdate() {
		if ( this.strategy == null ) {
			const value = Array.from( this.selection );

			logger.debug(
				`creating strategy "${ this.host.selection }" with value ${ value }`
			);

			this.strategy = createSelectionStrategy( { type: this.host.selection } );
			this.init( toArray( this.host.value ) );
		}

		if ( this.host.selection !== this.strategy.type ) {
			const value = Array.from( this.selection );

			logger.debug(
				`re-creating strategy "${ this.host.selection }" with existing value ${ value }`
			);

			this.strategy = createSelectionStrategy( { type: this.host.selection } );
			this.init( value );
		}

		if ( this.host.value !== this.value ) {
			const value = toArray( this.host.value );

			logger.debug(
				`updating strategy "${ this.host.selection }" with new value ${ value }`
			);

			this.init( toArray( this.host.value ) );
		}

		this.value = this.host.value;
	}

	/**
	 * @param {string[]}
	 */
	init = ( values ) => {
		logger.debug(
			`initializing strategy "${ this.strategy.type }" with value ${ values }`
		);

		this.selection = this.strategy.init( values );
	};

	reset = ( values ) => {
		logger.debug( `resetting strategy "${ this.strategy.type }" with value ${ values }` );

		this.selection = this.strategy.init( values );

		this.host.requestUpdate();
	};

	/**
	 * Select the given `values`.
	 * @param {string | string[] | null} values
	 */
	select = ( values ) => {
		logger.debug( `selecting values ${ values } in strategy "${ this.strategy.type }"` );

		this.selection = this.strategy.select( toArray( values ), this.selection );

		this.host.requestUpdate();
	};

	/**
	 * Unselect the given `values`.
	 * @param {string | string[] | null} values
	 */
	unselect = ( values ) => {
		logger.debug(
			`unselecting values ${ values } in strategy "${ this.strategy.type }"`
		);

		this.selection = this.strategy.unselect( toArray( values ), this.selection );

		this.host.requestUpdate();
	};

	/**
	 * Toggle the given `values`.
	 * @param {string | string[] | null} values
	 */
	toggle = ( values ) => {
		logger.debug( `toggling values ${ values } in strategy "${ this.strategy.type }"` );

		this.selection = this.strategy.toggle( toArray( values ), this.selection );

		this.host.requestUpdate();
	};

	/**
	 * Selects `values` if `selected` is `true`, unselects otherwise.
	 * @param {string | string[] | null} values
	 * @param {boolean} selected - `true` if should be selected, `false` if it should be unselected.
	 */
	handle = ( values, selected ) => {
		if ( selected ) {
			this.select( values );
		} else {
			this.unselect( values );
		}
	};

	/**
	 * Chech if the given `value` is selected.
	 * @param {string} value
	 */
	has = ( value ) => {
		return this.selection.has( value );
	};

	toValue = () => {
		return this.strategy.value( this.selection );
	};
}

export default SelectionManagerController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} SelectionStrategy
 * @typedef {'select' | 'unselect' | 'toggle'} SelectionOperation
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
