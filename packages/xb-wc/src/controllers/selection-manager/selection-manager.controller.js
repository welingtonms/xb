import toArray from '../../utils/to-array';
import createSelectionStrategy from '../../utils/selection';

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
	 * @param {SelectionManagerControllerHost} host
	 */
	constructor( host ) {
		this.selection = new Set();
		this.strategy = null;

		( this.host = host ).addController( this );
	}

	hostConnected() {
		this.init( this.host.getRawValue() );
	}

	hostUpdate() {
		if ( this.host.type !== this.strategy.type ) {
			const value = Array.from( this.selection );

			logger.debug( `re-creating strategy "${ this.host.type }" with existing value`, value );

			this.strategy = createSelectionStrategy( { type: this.host.type } );
			this.init( value );
		}
	}

	/**
	 * @param {string[]}
	 * @returns {string[]}
	 */
	init = ( values ) => {
		if ( this.strategy == null ) {
			logger.debug(
				`creating strategy "${ this.host.type ?? 'multiple (default fallback)' }" with value`,
				this.host.getRawValue()
			);

			this.strategy = createSelectionStrategy( { type: this.host.type ?? 'multiple' } );
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
	 * Selects `values` if `selected` is `true`, unselects otherwise.
	 * @param {string | string[] | null} values
	 * @param {boolean} selected - `true` if should be selected, `false` if it should be unselected.
	 */
	// handle = ( values, selected ) => {
	// 	if ( selected ) {
	// 		this.select( values );
	// 	} else {
	// 		this.unselect( values );
	// 	}
	// };

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
 * @typedef {import('../../common/xb-element').XBElement} XBElement
 * @typedef {import('../../mixins/with-selection').WithSelectionMixin} WithSelectionMixin
 */
