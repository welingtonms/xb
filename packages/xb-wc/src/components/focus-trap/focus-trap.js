import { html } from 'lit';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

import XBElement from '../../common/xb-element';
import styles from './focus-trap.styles';
import Keyboard from '../../common/keyboard';

export class FocusTrap extends XBElement {
	static styles = [ styles() ];

	/** @type {MutationObserver | null} */
	_mutationObserver = null;

	/** @type {HTMLElement[]} */
	_focusableDescendants = [];

	/**
	 * Index of the current focused element insei the `focusableDescendants` array.
	 * @type {number}
	 * */
	_currentFocused = -1;

	static get properties() {
		return {
			/**
			 * Should the focus trap be active.
			 * @type {boolean}
			 */
			active: { type: Boolean },
			/**
			 * Should the focus trap be active.
			 * @type {SupportedKey | SupportedKey[]}
			 */
			keys: {},
		};
	}

	constructor() {
		super();

		/** @type {FocusTrapAttributes['keys']} */
		this.keys = [
			Keyboard.getKey( 'ArrowUp' ),
			Keyboard.getKey( 'ArrowDown' ),
		];

		this.active = false;
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
		super.updated( changedProperties );

		this._focusableDescendants = this._getTabbableDescendants();
	}

	render() {
		return html`<slot></slot>`;
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
		const supportedKeys = [
			...( this.keys || [
				Keyboard.getKey( 'ArrowUp' ),
				Keyboard.getKey( 'ArrowDown' ),
			] ),
		];

		if (
			! Keyboard( e ).is( supportedKeys ) ||
			this._focusableDescendants.length == 0
		) {
			return;
		}

		e.preventDefault();

		/**
		 * Checks if `_currentFocused` is outdated by comparing it with `document.activeElement`.
		 */
		if (
			this._currentFocused === -1 ||
			this._focusableDescendants[ this._currentFocused ] !==
				document.activeElement
		) {
			this._currentFocused = this._getCurrentActiveDescendantIndex();
		}

		const newCurrentFocused = this._getFocusedIndexAfterKeyPress(
			e,
			this._focusableDescendants.length
		);

		this._currentFocused = newCurrentFocused;

		this._focusableDescendants[ newCurrentFocused ]?.focus();
	};

	/**
	 *
	 * @param {KeyboardEvent} e
	 * @param {number} focusableCounter
	 * @return {number} get index of new focused element
	 */
	_getFocusedIndexAfterKeyPress = ( e, focusableCounter ) => {
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

		if ( this._currentFocused === -1 && increment === -1 ) {
			/**
			 * Prevent to skip one element when the initial increment is -1
			 * and `this._currentFocused` is -1, we don't .
			 * e.g.: focus has just been activated and user presses arrow up.
			 */
			return ( increment + focusableCounter ) % focusableCounter;
		}

		return (
			( this._currentFocused + increment + focusableCounter ) % focusableCounter
		);
	};

	_subscribeToDOMMutationEvents = () => {
		this._mutationObserver = new MutationObserver( () => {
			this._focusableDescendants = this._getTabbableDescendants();
		} );

		this._mutationObserver.observe( this, { childList: true } );
	};

	_unsubscribeToDOMMutationEvents = () => {
		this._currentFocused = -1;

		if ( this._mutationObserver ) {
			this._mutationObserver.disconnect();
		}
	};

	/**
	 * @param {Element | null} root
	 * @return {HTMLElement[]} Array of tabbable elements inside `container`.
	 * For now, only `button`s are considered.
	 */
	_getTabbableDescendants = ( root ) => {
		const slots = ( root ?? this.shadowRoot ).querySelectorAll( 'slot' );

		const descendants = [ ...slots ]
			.reduce(
				( array, slot ) =>
					array.concat( slot.assignedElements( { flatten: true } ) ),
				[]
			)
			.reduce( ( array, node ) => {
				const tagName = node.tagName.toLowerCase();

				// TODO: all focusable by the focus-trap should expose a focus method
				// TODO: add support for other focusable elements
				if ( [ 'xb-radio', 'xb-button' ].includes( tagName ) ) {
					return array.concat( node );
				}

				return array.concat( this._getTabbableDescendants( node ) );
			}, [] );

		return descendants;
	};

	_getCurrentActiveDescendantIndex() {
		return this._focusableDescendants.findIndex(
			( descendant ) => descendant === document.activeElement
		);
	}
}

window.customElements.define( 'xb-focus-trap', FocusTrap );

/**
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionType} SelectionType
 * @typedef {import('@welingtonms/xb-toolset/dist/selection').SelectionState} SelectionState
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('../../common/xb-element').default} XBElement
 * @typedef {ReactiveControllerHost & XBElement & { _selection: SelectionState, type: SelectionType }} SelectionHost
 * @typedef {import('../../common/keyboard').SupportedKey} SupportedKey
 */

/**
 * @typedef {Object} FocusTrapAttributes
 * @property {SupportedKey | SupportedKey[]} [keys] - Keys used to navigate through the focusable descendants.
 */
