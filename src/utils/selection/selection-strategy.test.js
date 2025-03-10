import createSelectionStrategy from './selection-strategy';

describe('SelectionStrategy', () => {
	describe('createSelectionStrategy', () => {
		it('returns a single strict selection strategy', () => {
			/** @type {SelectionStrategyCreationProps} */
			const props = {
				type: 'single-strict',
			};

			const result = createSelectionStrategy(props);
			expect(result.type).toBe('single-strict');
		});

		it('returns a single selection strategy', () => {
			/** @type {SelectionStrategyCreationProps} */
			const props = {
				type: 'single',
			};

			const result = createSelectionStrategy(props);
			expect(result.type).toBe('single');
		});

		it('returns a multiple selection strategy', () => {
			/** @type {SelectionStrategyCreationProps} */
			const props = {
				type: 'multiple',
			};

			const result = createSelectionStrategy(props);
			expect(result.type).toBe('multiple');
		});

		it('returns a multiple selection strategy by default', () => {
			/** @type {SelectionStrategyCreationProps} */
			const props = {};

			const result = createSelectionStrategy(props);
			expect(result.type).toBe('multiple');
		});
	});

	describe('SingleStrictSelectionStrategy', () => {
		/** @type {SelectionStrategyCreationProps} */
		const props = {
			type: 'single-strict',
		};

		it('initializes with empty selection when no items are provided', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set();

			expect(strategy.init([])).toEqual(expectedSelection);
		});

		it('returns correct selection when items array is provided to init', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set(['value-1']);

			expect(strategy.init(['value-1'])).toEqual(expectedSelection);
		});

		it('returns empty selection when no items is provided to select and selection is empty', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set();

			expect(strategy.select([], new Set())).toEqual(expectedSelection);
		});

		it('returns current selection when no items is provided to select, when selection is not empty', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set(['value-1']);

			expect(strategy.select([], currentSelection)).toEqual(currentSelection);
		});

		it('selects correctly when a single item is provided', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set();
			const expectedSelection = new Set(['value-1']);

			expect(strategy.select(['value-1'], currentSelection)).toEqual(expectedSelection);
		});

		it('selects correctly when multiple items are provided (only last item is considered)', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set();
			const expectedSelection = new Set(['value-1']);

			expect(strategy.select(['value-4', 'value-2', 'value-1'], currentSelection)).toEqual(
				expectedSelection
			);
		});

		it('returns the selection untouched when no item is provided to unselect', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.unselect([], initialSelection)).toEqual(expectedSelection);
		});

		it('returns the selection untouched when unselect is called with the current selection', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.unselect(['value-1'], initialSelection)).toEqual(expectedSelection);
		});

		it('returns the selection untouched when unselect is called with unknown values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.unselect(['value-4', 'value-2'], initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('returns the selection untouched when no item is provided to toggle', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.toggle([], initialSelection)).toEqual(expectedSelection);
		});

		it('returns the selection untouched when toggle is called with the current selection', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.toggle(['value-1'], initialSelection)).toEqual(expectedSelection);
		});

		it('toggles correctly when toggle is called with unknown values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = new Set(['value-2']);

			expect(strategy.toggle(['value-4', 'value-2'], initialSelection)).toEqual(expectedSelection);
		});

		it('toggles correctly the provided values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-3']);
			const expectedSelection = new Set(['value-4']);

			expect(strategy.toggle(['value-4', 'value-3'], initialSelection)).toEqual(expectedSelection);
		});

		it('resets selection correctly', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-3']);

			expect(strategy.reset(initialSelection)).toEqual(initialSelection);
			expect(strategy.reset()).toEqual(new Set());
		});
	});

	describe('SingleSelectionStrategy', () => {
		/** @type {SelectionStrategyCreationProps} */
		const props = {
			type: 'single',
		};

		it('initializes with empty selection when no items are provided', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set();

			expect(strategy.init([])).toEqual(expectedSelection);
		});

		it('returns correct selection when items array is provided to init', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set(['value-1']);

			expect(strategy.init(['value-1'])).toEqual(expectedSelection);
		});

		it('returns empty selection when no items is provided to select and selection is empty', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set();

			expect(strategy.select([], new Set())).toEqual(expectedSelection);
		});

		it('returns current selection when no items is provided to select, when selection is not empty', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set(['value-1']);

			expect(strategy.select([], currentSelection)).toEqual(currentSelection);
		});

		it('selects correctly when a single item is provided', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set();
			const expectedSelection = new Set(['value-1']);

			expect(strategy.select(['value-1'], currentSelection)).toEqual(expectedSelection);
		});

		it('selects correctly when multiple items are provided (only last item is considered)', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set();
			const expectedSelection = new Set(['value-1']);

			expect(strategy.select(['value-4', 'value-2', 'value-1'], currentSelection)).toEqual(
				expectedSelection
			);
		});

		it('returns the selection untouched when no item is provided to unselect', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.unselect([], initialSelection)).toEqual(expectedSelection);
		});

		it('clear the selection when unselect is called with the current selection', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = new Set();

			expect(strategy.unselect(['value-1'], initialSelection)).toEqual(expectedSelection);
		});

		it('returns the selection untouched when unselect is called with unknown values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.unselect(['value-4', 'value-2'], initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('returns the selection untouched when no item is provided to toggle', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.toggle([], initialSelection)).toEqual(expectedSelection);
		});

		it('clears selection untouched when toggle is called with the current selection', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = new Set();

			expect(strategy.toggle(['value-1'], initialSelection)).toEqual(expectedSelection);
		});

		it('toggles correctly when toggle is called with unknown values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = new Set(['value-2']);

			expect(strategy.toggle(['value-4', 'value-2'], initialSelection)).toEqual(expectedSelection);
		});

		it('toggles correctly the provided values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-3']);
			const expectedSelection = new Set(['value-4']);

			expect(strategy.toggle(['value-4', 'value-3'], initialSelection)).toEqual(expectedSelection);
		});

		it('resets selection correctly', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-3']);

			expect(strategy.reset(initialSelection)).toEqual(initialSelection);
			expect(strategy.reset()).toEqual(new Set());
		});
	});

	describe('MultipleSelectionStrategy', () => {
		/** @type {SelectionStrategyCreationProps} */
		const props = {
			type: 'multiple',
		};

		it('initializes with empty selection when no items are provided', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set();

			expect(strategy.init([])).toEqual(expectedSelection);
		});

		it('returns correct selection when items array is provided to init', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set(['value-1', 'value-2']);

			expect(strategy.init(['value-1', 'value-2'])).toEqual(expectedSelection);
		});

		it('returns empty selection when no items is provided to select and selection is empty', () => {
			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Set();

			expect(strategy.select([], new Set())).toEqual(expectedSelection);
		});

		it('returns current selection when no items is provided to select, when selection is not empty', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set(['value-1', 'value-2']);

			expect(strategy.select([], currentSelection)).toEqual(currentSelection);
		});

		it('selects correctly when a single item is provided', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set();
			const expectedSelection = new Set(['value-1']);

			expect(strategy.select(['value-1'], currentSelection)).toEqual(expectedSelection);
		});

		it('selects correctly when multiple items are provided (only last item is considered)', () => {
			const strategy = createSelectionStrategy(props);
			/** @type {SelectionState} */
			const currentSelection = new Set();
			const expectedSelection = new Set(['value-1', 'value-2']);

			expect(strategy.select(['value-1', 'value-2'], currentSelection)).toEqual(expectedSelection);
		});

		it('returns the selection untouched when no item is provided to unselect', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1', 'value-2']);
			const expectedSelection = initialSelection;

			expect(strategy.unselect([], initialSelection)).toEqual(expectedSelection);
		});

		it('clears selection when unselect is called with the current selection', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1', 'value-2']);
			const expectedSelection = new Set();

			expect(strategy.unselect(['value-1', 'value-2'], initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('returns the selection untouched when unselect is called with unknown values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1']);
			const expectedSelection = initialSelection;

			expect(strategy.unselect(['value-4', 'value-2'], initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('returns the selection untouched when no item is provided to toggle', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1', 'value-2']);
			const expectedSelection = initialSelection;

			expect(strategy.toggle([], initialSelection)).toEqual(expectedSelection);
		});

		it('clears selection when toggle is called with the current selection', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1', 'value-2']);
			const expectedSelection = new Set();

			expect(strategy.toggle(['value-1', 'value-2'], initialSelection)).toEqual(expectedSelection);
		});

		it('toggles correctly when toggle is called with unknown values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-1', 'value-2']);
			const expectedSelection = new Set(['value-1', 'value-4']);

			expect(strategy.toggle(['value-2', 'value-4'], initialSelection)).toEqual(expectedSelection);
		});

		it('toggles correctly the provided values', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-3']);
			const expectedSelection = new Set(['value-4']);

			expect(strategy.toggle(['value-4', 'value-3'], initialSelection)).toEqual(expectedSelection);
		});

		it('resets selection correctly', () => {
			const strategy = createSelectionStrategy(props);

			const initialSelection = new Set(['value-3']);

			expect(strategy.reset(initialSelection)).toEqual(initialSelection);
			expect(strategy.reset()).toEqual(new Set());
		});
	});
});

/**
 * @typedef {import('./selection-strategy').AcceptedType} AcceptedType
 * @typedef {import('./selection-strategy').SelectionState} SelectionState
 * @typedef {import('./selection-strategy').SelectionStrategy} SelectionStrategy
 * @typedef {import('./selection-strategy').SelectionStrategyCreationProps} SelectionStrategyCreationProps
 */
