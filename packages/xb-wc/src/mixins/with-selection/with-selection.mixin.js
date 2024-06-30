import { property } from 'lit/decorators.js';
import toArray from '../../utils/to-array';

import { fromAttribute, toAttribute } from './with-selection.helpers';

/**
 * @template {!Constructable} T
 * @param {T} BaseClass
 */
export const WithSelectionMixin = ( BaseClass ) => {
	return class WithSelection extends BaseClass {
		/**
		 * Selection strategy.
		 * @type {WithSelectionAttributes['type']}
		 */
		@property( { type: String } ) accessor type;

		/**
		 * Selection value.
		 * This should be typed in the subclass.
		 * @type {WithSelectionAttributes['value']}
		 */
		@property()
		accessor value;

		getRawValue( value ) {
			return toArray( fromAttribute( value ?? this.getAttribute( 'value' ) ) );
		}
	};
};

/**
 * @typedef {import('../../common/xb-element').XBElement} XBElement
 * @typedef {import('../../common/prop-types').Constructable} Constructable
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
 * @property {SelectionType} type - Selection strategy.
 * @property {SelectionOption | SelectionOption[] | null} value - Selection value.
 */
