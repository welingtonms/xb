import { property } from 'lit/decorators.js';

/**
 * Mixin that adds the properties necessary for the `SelectionManagerController` to work.
 * @mixin
 * @param {XBElement} superClass
 * @returns {WithSelection & XBElement}
 */
const WithSelectionMixin = ( superClass ) => {
	class WithSelection extends superClass {
		/**
		 * Selection strategy.
		 * @type {SelectionType}
		 */
		@property( { type: String } ) selection;

		/**
		 * Selection value.
		 * This should be typed in the subclass.
		 * @type {SelectionOption | SelectionOption[] | null}
		 */
		@property() value;

		/**
		 * @param {import('lit').PropertyValues<this>} changedProperties
		 */
		// updated( changedProperties ) {
		// 	super.updated( changedProperties );

		// 	if ( changedProperties.has( 'selection' ) ) {
		// 		console.log( 'with-selection', 'selection changed' );
		// 	}
		// }
	}

	return WithSelection;
};

export default WithSelectionMixin;

/**
 * @typedef {import('../../common/xb-element').default} XBElement
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
