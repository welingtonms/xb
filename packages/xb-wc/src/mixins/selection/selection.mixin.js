import toArray from '@welingtonms/xb-toolset/dist/to-array';

import SelectionController from '../../controllers/selection';

/**
 * Traps focus within the given host.
 * @class
 * @param {XBElement} superClass
 * @param {string} event - Name of the event that should be listened to.
 */
const SelectionManagerMixin = ( superClass, event ) =>
	class SelectionManager extends superClass {
		/** @type {SelectionController} */
		_selectionController;

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

				_selection: {
					state: true,
				},
			};
		}

		constructor() {
			super();

			/** @type {SelectionType} */
			this.type = 'multiple';

			/** @type {SelectionState} */
			this._selection = new Set();
		}

		/**
		 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
		 */
		update( changedProperties ) {
			super.update( changedProperties );

			/**
			 * In case the selection manager's `type` changes after initialization.
			 */
			if (
				( changedProperties.get( 'type' ) != null && this.type != null ) ||
				this._selectionController == null
			) {
				this._selectionController = new SelectionController( this, this.type, event );

				this._selectionController.init( toArray( this.value ) );
			}

			/**
			 * If `value` changed, we need to reset the selection controller.
			 */
			if ( changedProperties.has( 'value' ) ) {
				this._selectionController.init( toArray( this.value ) );
			}
		}
	};

export default SelectionManagerMixin;

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('../../controllers/selection/selection.controller').SelectionEventDetail} SelectionEventDetail
 * @typedef {import('../../common/xb-element').default} XBElement
 */
