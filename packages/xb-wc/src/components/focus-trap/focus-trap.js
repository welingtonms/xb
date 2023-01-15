import { html } from 'lit';

import { getIncrementByKey } from './focus-trap.helpers';
import XBElement from '../../common/xb-element';
import styles from './focus-trap.styles';
import Keyboard from '../../common/keyboard';

export class FocusTrap extends XBElement {
	static styles = [ styles() ];

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
			 * @type {FocusTrapAttributes['active']}
			 */
			active: { type: Boolean, reflect: true },
			/**
			 * Should the focus trap be active.
			 * @type {FocusTrapAttributes['keys']}
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

		/** @type {FocusTrapAttributes['active']} */
		this.active = false;
	}

	/**
	 * @param {import('lit').PropertyValues<ToggleGroup>} changedProperties
	 */
	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( changedProperties.has( 'active' ) ) {
			if ( this.active ) {
				this._subscribe();
			} else {
				this._unsubscribe();
			}
		}
	}

	activate = () => {
		if ( this.active ) {
			return;
		}

		this.active = true;
	};

	deactivate = () => {
		if ( ! this.active ) {
			return;
		}

		this.active = false;
	};

	render() {
		return html`
			<slot @slotchange=${ this._handleSlotChange }></slot>
		`;
	}

	_subscribe() {
		window.addEventListener( 'keydown', this._handleKeyboardEvent );

		this._currentFocused = -1;
	}

	_unsubscribe() {
		window.removeEventListener( 'keydown', this._handleKeyboardEvent );
	}

	_handleSlotChange() {
		this._focusableDescendants = this._getFocusableDescendants();
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
				Keyboard.getKey( 'ArrowRight' ),
				Keyboard.getKey( 'ArrowLeft' ),
			] ),
		];

		if (
			! this.active ||
			this._focusableDescendants.length == 0 ||
			! Keyboard( e ).is( supportedKeys )
		) {
			return;
		}

		e.stopPropagation();
		e.preventDefault(); // stop native scroll behavior

		const newCurrentFocused = this._getFocusedIndexAfterKeyPress( e );

		this._currentFocused = newCurrentFocused;
		this._focusableDescendants[ newCurrentFocused ]?.focus();
	};

	/**
	 * @param {Element | null} root
	 * @return {HTMLElement[]} Array of tabbable elements inside `container`.
	 * For now, only `button`s are considered.
	 */
	_getFocusableDescendants = ( root ) => {
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
				if (
					[
						'xb-button',
						'xb-checkbox',
						'xb-dropdown-item',
						'xb-menu-item',
						'xb-option',
						'xb-radio',
						'xb-text-input',
					].includes( tagName )
				) {
					return array.concat( node );
				}

				return array.concat( this._getFocusableDescendants( node ) );
			}, [] );

		return descendants;
	};

	_updateCurrentFocused() {
		/**
		 * Checks if `_currentFocused` is outdated by comparing it with `document.activeElement`.
		 */
		if (
			this._currentFocused === -1 ||
			this._focusableDescendants[ this._currentFocused ] !==
				document.activeElement
		) {
			this._currentFocused = this._focusableDescendants.findIndex(
				( descendant ) => descendant === document.activeElement
			);
		}

		return this._currentFocused;
	}

	/**
	 *
	 * @param {KeyboardEvent} e
	 * @return {number} get index of new focused element
	 */
	_getFocusedIndexAfterKeyPress = ( e ) => {
		this._updateCurrentFocused();

		const focusableCounter = this._focusableDescendants.length;
		const increment = getIncrementByKey( e );

		if ( this._currentFocused === -1 && increment === -1 ) {
			/**
			 * Prevent to skip one element when the initial increment is -1
			 * and `this._currentFocused` is -1 (no descendant focused).
			 * e.g.: focus has just been activated and user presses arrow up.
			 */
			return ( increment + focusableCounter ) % focusableCounter;
		}

		return (
			( this._currentFocused + increment + focusableCounter ) % focusableCounter
		);
	};
}

window.customElements.define( 'xb-focus-trap', FocusTrap );

/**
 * @typedef {ReactiveControllerHost & XBElement & { _selection: SelectionState, type: SelectionType }} SelectionHost
 * @typedef {import('../../common/keyboard').SupportedKey} SupportedKey
 */

/**
 * @typedef {Object} FocusTrapAttributes
 * @property {SupportedKey | SupportedKey[]} [keys] - Keys used to navigate through the focusable descendants.
 * @property {boolean} active
 */
