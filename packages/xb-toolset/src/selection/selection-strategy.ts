import toArray from '../to-array';

type AcceptedType = string;

export const SELECTION_TYPES = [
	'single',
	'single-strict',
	'multiple',
] as const;

export type SelectionType = typeof SELECTION_TYPES[ number ];

export type SelectionState = Set< AcceptedType >;

export type SelectionStrategy = {
	type: SelectionType;
	/**
	 * Set the initial selection.
	 * @param {AcceptedType[]} values
	 * @returns {SelectionState}
	 */
	init: { ( values: AcceptedType[] ): SelectionState };
	/**
	 * Add the provided `values` to the `selection`, respecting
	 * the rules for the current strategy.
	 * @param {AcceptedType[]} values
	 * @param {SelectionState} selection
	 * @returns {SelectionState}
	 */
	select: {
		( values: AcceptedType[], selection: SelectionState ): SelectionState;
	};
	/**
	 * Remove the provided `values` from the `selection`, respecting
	 * the rules for the current strategy.
	 * @param {AcceptedType[]} values
	 * @param {SelectionState} selection
	 * @returns {SelectionState}
	 */
	unselect: {
		( values: AcceptedType[], selection: SelectionState ): SelectionState;
	};
	/**
	 * Toggle the provided `values` from the `selection` (add to the selection if
	 * not in the `selection`, remove from the `selection` otherwise respecting
	 * the rules for the current strategy.
	 * @param {AcceptedType[]} values
	 * @param {SelectionState} selection
	 * @returns {SelectionState}
	 */
	toggle: {
		( values: AcceptedType[], selection: SelectionState ): SelectionState;
	};
	/**
	 * Reset `selection` to the provided value, or to and empty `Set` otherwise.
	 * @param {AcceptedType[]} values
	 * @returns {SelectionState}
	 */
	reset: { ( selection?: SelectionState ): SelectionState };
	/**
	 * Return selection as a value, based on the `AcceptedType`.
	 * @param {SelectionState} selection
	 */
	value: { ( selection?: SelectionState ): unknown };
};

export type SelectionStrategyCreationProps = {
	type?: SelectionType;
};

/**
 * @param {Object} props
 * @param {SelectionType} [props.type]
 * @returns {SelectionStrategy}
 */
function createSelectionStrategy(
	props: SelectionStrategyCreationProps
): SelectionStrategy {
	const { type = 'multiple' } = props;

	let strategy;

	switch ( type ) {
		case 'single':
			strategy = SingleSelectionStrategy();
			break;
		case 'single-strict':
			strategy = SingleStrictSelectionStrategy();
			break;
		case 'multiple':
		default:
			strategy = MultipleSelectionStrategy();
			break;
	}

	return Object.freeze( strategy );
}

/**
 * This strategy requires that once a selection is made,
 * one item has to be selected, always.
 * @returns {SelectionStrategy}
 */
export function SingleStrictSelectionStrategy(): SelectionStrategy {
	return {
		type: 'single-strict',
		init( values: AcceptedType[] ): SelectionState {
			return this.select( values, new Set() );
		},
		select(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 ) {
				return selection;
			}

			// We always start with an empty set, as we are handling single selection
			/** @type {SelectionState} */
			const newSelection = new Set< AcceptedType >();
			newSelection.add( String( safeValues[ safeValues.length - 1 ] ) );

			return newSelection;
		},
		unselect(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 || selection.size == 0 ) {
				return selection;
			}

			/** @type {SelectionState} */
			const newSelection = new Set( selection );

			for ( let i = 0; i < safeValues.length && selection.size > 1; i++ ) {
				newSelection.delete( String( safeValues[ i ] ) );
			}

			return newSelection;
		},
		toggle(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 ) {
				return selection;
			}

			/** @type {SelectionState} */
			const newSelection = new Set( selection );

			for ( let i = 0; i < safeValues.length; i++ ) {
				const value = String( safeValues[ i ] );

				if ( ! selection.has( value ) ) {
					newSelection.clear();
					newSelection.add( value );
				}
			}

			return newSelection;
		},
		reset( selection?: SelectionState ) {
			if ( selection == null ) {
				return new Set< AcceptedType >();
			}

			return selection;
		},
		value( selection?: SelectionState ): AcceptedType | null {
			if ( selection == null || selection.size === 0 ) {
				return null;
			}

			const [ first ] = Array.from( selection );
			return first;
		},
	};
}

/**
 * This strategy requires one or no item to be selected.
 * @returns {SelectionStrategy}
 */
export function SingleSelectionStrategy(): SelectionStrategy {
	return {
		type: 'single',
		init( values: AcceptedType[] ): SelectionState {
			return this.select( values, new Set() );
		},
		select(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 ) {
				return selection;
			}

			// We always start with an empty set, as we are handling single selection
			/** @type {SelectionState} */
			const newSelection = new Set< AcceptedType >();
			newSelection.add( String( safeValues[ safeValues.length - 1 ] ) );

			return newSelection;
		},
		unselect(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 || selection.size == 0 ) {
				return selection;
			}

			/** @type {SelectionState} */
			const newSelection = new Set( selection );

			for ( let i = 0; i < safeValues.length; i++ ) {
				newSelection.delete( String( safeValues[ i ] ) );
			}

			return newSelection;
		},
		toggle(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 ) {
				return selection;
			}

			/** @type {SelectionState} */
			const newSelection = new Set< AcceptedType >();

			for ( let i = 0; i < safeValues.length; i++ ) {
				const value = String( safeValues[ i ] );

				if ( ! selection.has( value ) ) {
					newSelection.clear();
					newSelection.add( value );
				}
			}

			return newSelection;
		},
		/**
		 * @param {SelectionState} selection
		 * @returns {SelectionState}
		 */
		reset( selection?: SelectionState ) {
			if ( selection == null ) {
				return new Set< AcceptedType >();
			}

			return selection;
		},
		value( selection?: SelectionState ): AcceptedType | null {
			if ( selection == null || selection.size === 0 ) {
				return null;
			}

			const [ first ] = Array.from( selection );
			return first;
		},
	};
}

/**
 * This strategy requires one or no item to be selected.
 * @returns {SelectionStrategy}
 */
export function MultipleSelectionStrategy(): SelectionStrategy {
	return {
		type: 'multiple',
		init( values: AcceptedType[] ): SelectionState {
			return this.select( values, new Set() );
		},
		select(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 ) {
				return selection;
			}

			/** @type {SelectionState} */
			const newSelection = new Set( selection );

			for ( let i = 0; i < safeValues.length; i++ ) {
				newSelection.add( String( safeValues[ i ] ) );
			}

			return newSelection;
		},
		unselect(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 || selection.size == 0 ) {
				return selection;
			}

			/** @type {SelectionState} */
			const newSelection = new Set( selection );

			for ( let i = 0; i < safeValues.length; i++ ) {
				newSelection.delete( String( safeValues[ i ] ) );
			}

			return newSelection;
		},
		toggle(
			values: AcceptedType[],
			selection: SelectionState
		): SelectionState {
			const safeValues = toArray( values );

			if ( safeValues.length == 0 ) {
				return selection;
			}

			/** @type {SelectionState} */
			const newSelection = new Set( selection );

			for ( let i = 0; i < safeValues.length; i++ ) {
				const value = String( safeValues[ i ] );

				if ( ! selection.has( value ) ) {
					newSelection.add( value );
				} else {
					newSelection.delete( value );
				}
			}

			return newSelection;
		},
		reset( selection?: SelectionState ) {
			if ( selection == null ) {
				return new Set< AcceptedType >();
			}

			return selection;
		},
		value( selection?: SelectionState ): AcceptedType[] | null {
			if ( selection == null || selection.size === 0 ) {
				return null;
			}

			return Array.from( selection );
		},
	};
}

// export function MultipleSelectionStrategy(
//   context: SelectableStrategyContext<T>
// ): SelectableStrategy<T> {
//   return {
//     type(): SelectionStrategy {
//       return 'multiple'
//     },
//     init(items: T[]) {
//       return this.select(items, new Map<SelectableKeyType, T>())
//     },
//     select(items: T[], selection: SelectableState<T>) {
//       const newSelection = new Map<SelectableKeyType, T>(selection)

//       for (let i = 0; i < items.length; i++) {
//         const adapter = context.getAdapter(items[i]._type)
//         newSelection.set(adapter.getKey(items[i]), items[i])
//       }

//       return newSelection
//     },
//     unselect(keys: SelectableKeyType[], selection: SelectableState<T>) {
//       const newSelection = new Map<SelectableKeyType, T>(selection)

//       for (let i = 0; i < keys.length; i++) {
//         newSelection.delete(keys[i])
//       }

//       return newSelection
//     },
//     toggle(items: T[], selection: SelectableState<T>) {
//       const newSelection = new Map<SelectableKeyType, T>(selection)

//       for (let i = 0; i < items.length; i++) {
//         const adapter = context.getAdapter(items[i]._type)
//         const key = adapter.getKey(items[i])

//         if (!selection.has(key)) {
//           newSelection.set(key, items[i])
//         } else {
//           newSelection.delete(key)
//         }
//       }

//       return newSelection
//     },
//     clear(): SelectionStrategy {
//       return new Map<SelectableKeyType, T>()
//     },
//   }
// }

export default createSelectionStrategy;

/**
 * @typedef {'single' | 'single-strict' | 'multiple'} SelectionType
 */

/**
 * @typedef {Set<string>} SelectionState
 */

/**
 * @typedef {object} SelectionStrategy
 * @property {SelectionType} type
 * @property {(values: string[]) => SelectionState} init
 * @property {(values: string[], selection: SelectionState) => SelectionState} select
 * @property {(values: string[], selection: SelectionState) => SelectionState} unselect
 * @property {(values: string[], selection: SelectionState) => SelectionState} toggle
 * @property {(selection?: SelectionState) => SelectionState} reset
 */
