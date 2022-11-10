import toArray from '@welingtonms/xb-toolset/dist/to-array';

import Keyboard from '../../common/keyboard';

/**
 * Traps focus within the given host.
 *
 * TODO: find out which descendant is currently focused and initialize `currentFocused` with it.
 * TODO: implement enable/disable the focus trap
 *
 * @class
 * @param {XBElement} superClass
 * @param {SupportedKey | SupportedKey[]} [keys]
 * @implements {import('lit').ReactiveController}
 */
const FocusTrapMixin = ( superClass, keys = [] ) =>
	class FocusTrap extends superClass {
		/** @type {SupportedKey[]} */
		keys = [];

		/** @type {MutationObserver | null} */
		mutationObserver = null;

		/** @type {HTMLElement[]} */
		focusableDescendants = [];

		/**
		 * Index of the current focused element insei the `focusableDescendants` array.
		 * @type {number}
		 * */
		currentFocused = -1;

		static get properties() {
			return {
				/**
				 * Should the focus trap be active.
				 * @type {boolean}
				 */
				active: { type: Boolean },
			};
		}

		constructor() {
			super();

			this.keys = toArray( keys );
		}

		connectedCallback() {
			super.connectedCallback();

			this._subscribe();
		}

		disconnectedCallback() {
			super.disconnectedCallback();

			this._unsubscribe();
		}

		updated( changedProperties ) {
			super.updated?.( changedProperties );

			this.focusableDescendants = this._getTabbableDescendants();
		}

		_subscribe() {
			this.addEventListener( 'keydown', this._handleKeyboardEvent );
			this._subscribeToDOMMutationEvents();
		}

		_unsubscribe() {
			this.removeEventListener( 'keydown', this._handleKeyboardEvent );
			this._unsubscribeToDOMMutationEvents();
		}

		/**
		 * @param {KeyboardEvent} e
		 */
		_handleKeyboardEvent = ( e ) => {
			/** @type {SupportedKey[]} */
			const supportedKeys = [ ...( this.keys || [ Keyboard.getKey( 'Tab' ) ] ) ];

			if ( ! Keyboard( e ).is( supportedKeys ) || this.focusableDescendants.length == 0 ) {
				return;
			}

			e.preventDefault();

			const newCurrentFocused = this._getFocusedIndexAfterKeyPress(
				e,
				this.currentFocused,
				this.focusableDescendants.length
			);

			this.currentFocused = newCurrentFocused;

			this.focusableDescendants[ newCurrentFocused ]?.focus();
		};

		/**
		 *
		 * @param {KeyboardEvent} e
		 * @param {number} currentFocused
		 * @param {number} focusableCounter
		 * @return {number} get index of new focused element
		 */
		_getFocusedIndexAfterKeyPress = ( e, currentFocused, focusableCounter ) => {
			/** @type {Record<KeyboardEvent['key'], ( e: KeyboardEvent ) => number>} */
			const keyHandler = {
				/**
				 *
				 * @param {KeyboardEvent} e
				 * @return {number} increment for new focused element index
				 */
				Tab( e ) {
					return e.shiftKey ? -1 : 1;
				},
				ArrowUp() {
					return -1;
				},
				ArrowDown() {
					return 1;
				},
			};

			function unknownKey() {
				return 0;
			}

			const key = Keyboard.getEventKey( e );
			const increment = ( keyHandler[ key ] || unknownKey )( e );

			if ( this.currentFocused === -1 && increment === -1 ) {
				/**
				 * Prevent to skip one element when the initial increment is -1
				 * and `this.currentFocused` is -1, we don't .
				 * e.g.: focus has just been activated and user presses arrow up.
				 */
				return ( increment + focusableCounter ) % focusableCounter;
			}

			return ( this.currentFocused + increment + focusableCounter ) % focusableCounter;
		};

		_subscribeToDOMMutationEvents = () => {
			this.mutationObserver = new MutationObserver( () => {
				this.focusableDescendants = this._getTabbableDescendants();
			} );

			this.mutationObserver.observe( this, { childList: true } );
		};

		_unsubscribeToDOMMutationEvents = () => {
			this.currentFocused = -1;

			if ( this.mutationObserver ) {
				this.mutationObserver.disconnect();
			}
		};

		/**
		 * @param {HTMLElement | null} container
		 * @return {HTMLElement[]} Array of tabbable elements inside `container`.
		 * For now, only `button`s are considered.
		 */
		_getTabbableDescendants = () => {
			// TODO: add support for other focusable elements
			return Array.from( this.querySelectorAll( 'xb-radio' ) || [] );
		};
	};

export default FocusTrapMixin;

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../common/xb-element').default} XBElement
 * @typedef {ReactiveControllerHost & XBElement & { _selection: SelectionState, type: SelectionType }} SelectionHost
 * @typedef {import('../../common/keyboard').SupportedKey} SupportedKey
 */
