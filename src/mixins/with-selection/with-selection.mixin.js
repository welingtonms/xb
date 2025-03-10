import { property } from 'lit/decorators.js';
import toArray from '../../utils/to-array';

import { fromAttribute, toAttribute, hasValueChanged } from './with-selection.helpers';

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

		connectedCallback() {
			super.connectedCallback();

			this.form = this.closest( 'form' );

			this.form?.addEventListener( 'reset', this.handleFormReset );
		}

		disconnectedCallback() {
			super.disconnectedCallback();

			this.form?.removeEventListener( 'reset', this.handleFormReset );
		}

		getRawValue = ( value ) => {
			return toArray( fromAttribute( value === undefined ? this.getAttribute( 'value' ) : value ) );
		};

		handleFormReset = () => {
			// this will be overridden in the subclass
		};
	};
};

/**
 * @typedef {import('../xb-element').XBElement} XBElement
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
