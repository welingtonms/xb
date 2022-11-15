import toArray from '@welingtonms/xb-toolset/dist/to-array';

import SelectionController from '../../controllers/selection';

/**
 * Traps focus within the given host.
 * @class
 * @param {XBElement} superClass
 * @param {SelectionMixinOptions} options - Name of the event that should be listened to.
 */
const SelectionMixin = ( superClass, options ) =>
	class SelectionHost extends superClass {
		/** @type {SelectionController} */
		_controller;

		static get properties() {
			return {
				/**
				 * Selection strategy.
				 * @type {SelectionType}
				 */
				type: { type: String },

				/**
				 * Selection value.
				 * @type {string}
				 */
				value: {},
			};
		}

		constructor() {
			super();

			/** @type {SelectionType} */
			this.type = 'multiple';
		}

		/**
		 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
		 */
		update( changedProperties ) {
			super.update( changedProperties );

			/**
			 * In case the selection manager's `type` changes after initialization.
			 */
			if ( this._controller == null ) {
				this._controller = new SelectionController( this, {
					...( options || {} ),
					type: this.type,
				} );
			} else if (
				changedProperties.get( 'type' ) != null &&
				this.type != null
			) {
				this._controller.type = this.type;
			}

			/**
			 * If `value` changed, we need to reset the selection controller.
			 */
			if ( changedProperties.has( 'value' ) ) {
				this._controller.init( toArray( this.value ) );
			}
		}
	};

export default SelectionMixin;

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('../../controllers/selection/selection.controller').SelectionEventDetail} SelectionEventDetail
 * @typedef {import('../../common/xb-element').default} XBElement
 * @typedef {import('../../controllers/selection/selection.controller').SelectionControllerOptions} SelectionControllerOptions
 */

/**
 * @typedef {Omit<SelectionControllerOptions, 'type'>} SelectionMixinOptions
 */
