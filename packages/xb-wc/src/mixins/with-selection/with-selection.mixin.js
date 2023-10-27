import { property } from 'lit/decorators.js';

/**
 * Mixin that adds the properties necessary for the `SelectionManagerController` to work.
 * @mixin
 * @param {import('../../common/prop-types').Constructor<XBElement>} BaseClass
 * @returns {import('../../common/prop-types').Constructor<WithSelectionAttributes> & XBElement}
 */
const WithSelectionMixin = ( BaseClass ) =>
	class WithSelection extends BaseClass {
		/**
		 * Selection strategy.
		 * @type {WithSelectionAttributes['selection']}
		 */
		@property( { type: String } ) accessor selection;

		/**
		 * Selection value.
		 * This should be typed in the subclass.
		 * @type {WithSelectionAttributes['value']}
		 */
		@property() accessor value;
	};

export default WithSelectionMixin;

/**
 * @typedef {import('../../common/xb-element').default} XBElement
 * @typedef {import('../../common/prop-types').Constructor<XBElement> & XBElement}
 */

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionStrategy} SelectionStrategy
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
 * @typedef {Object} WithSelectionAttributes
 * @property {SelectionType} selection - Selection strategy.
 * @property {SelectionOption | SelectionOption[] | null} value - Selection value.
 */
