import toArray from '../../utils/to-array';
import createSelectionStrategy from '../../utils/selection';
import isFunction from '../../utils/is-function';

import createLogger from '../../utils/logger';

const logger = createLogger( 'selection-manager' );

/**
 * @implements {ReactiveController}
 */
export class SelectionManagerController {
	/** @template WithSelectionMixin, XBElement */
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
	 * @type {() => SelectionType}
	 */
	getSelectionType;

	/**
	 * @param {SelectionManagerControllerHost} host
	 * @param {{ getSelectionType: () => SelectionType }} [options] - Optional configuration.
	 */
	constructor( host, options ) {
		this.selection = new Set();
		this.strategy = null;

		this.getSelectionType = isFunction( options?.getSelectionType )
			? options.getSelectionType
			: () => 'multiple';

		( this.host = host ).addController( this );
	}

	hostConnected() {
		// Ensure strategy is created on connect using the correct type
		if ( ! this.strategy ) {
			this.#createStrategy();
		}
		this.init( this.host.getRawValue() );
	}

	hostUpdate() {
		const currentType = this.getSelectionType();

		// Only update strategy if the determined type has changed
		if ( currentType !== this.strategy.type ) {
			const value = Array.from( this.selection );

			logger.debug( `re-creating strategy "${ currentType }" with existing value`, value );

			this.#createStrategy( currentType ); // Use the new type
			this.init( value ); // Re-initialize with the current selection
		}
	}

	/**
	 * Creates the selection strategy instance.
	 * @param {SelectionType} [type] - Optional type override.
	 */
	#createStrategy = ( type ) => {
		const strategyType = type ?? this.getSelectionType();

		logger.debug( `creating strategy "${ strategyType }"` );
		this.strategy = createSelectionStrategy( { type: strategyType } );
	};

	/**
	 * @param {string[]} values
	 * @returns {string[]}
	 */
	init = ( values ) => {
		// Ensure strategy exists before initializing
		if ( this.strategy == null ) {
			this.#createStrategy();
		}

		logger.debug( `initializing strategy "${ this.strategy.type }" with value`, values );

		this.selection = this.strategy.init( values );

		return Array.from( this.selection );
	};

	/**
	 * Select the given `values`.
	 * @param {string | string[] | null} values
	 * @returns {string[]}
	 */
	select = ( values ) => {
		logger.debug( 'selecting values', toArray( values ), ` in strategy "${ this.strategy.type }"` );

		this.selection = this.strategy.select( toArray( values ), this.selection );

		return Array.from( this.selection );
	};

	/**
	 * Unselect the given `values`.
	 * @param {string | string[] | null} values
	 * @returns {string[]}
	 */
	unselect = ( values ) => {
		logger.debug(
			'unselecting values',
			toArray( values ),
			` in strategy "${ this.strategy.type }"`
		);

		this.selection = this.strategy.unselect( toArray( values ), this.selection );

		return Array.from( this.selection );
	};

	/**
	 * Toggle the given `values`.
	 * @param {string | string[] | null} values
	 * @returns {string[]}
	 */
	toggle = ( values ) => {
		logger.debug( 'toggling values', toArray( values ), ` in strategy "${ this.strategy.type }"` );

		this.selection = this.strategy.toggle( toArray( values ), this.selection );

		return Array.from( this.selection );
	};

	/**
	 * Select all values.
	 * @returns {string[]}
	 */
	selectAll = ( values ) => {
		this.selection = this.strategy.select( values );

		return Array.from( this.selection );
	};

	/**
	 * Unselect all values.
	 */
	unselectAll = () => {
		this.selection = this.strategy.init( [] );

		return Array.from( this.selection );
	};

	/**
	 * Chech if the given `value` is selected.
	 * @param {string} value
	 */
	has = ( value ) => {
		return this.selection.has( value );
	};

	value = () => {
		return this.strategy.value( this.selection );
	};

	/**
	 * @deprecated Use `value()` instead.
	 */
	toValue = () => {
		return this.strategy.value( this.selection );
	};
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 */

/**
 * @typedef {import('../../utils/selection').SelectionType} SelectionType
 * @typedef {import('../../utils/selection').SelectionState} SelectionState
 * @typedef {import('../../utils/selection').SelectionStrategy} SelectionStrategy
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

/**
 * @typedef {import('../xb-element').XBElement} XBElement
 * @typedef {import('../../mixins/with-selection').WithSelectionMixin} WithSelectionMixin
 */
