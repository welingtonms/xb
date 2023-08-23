import toArray from '@welingtonms/xb-toolset/dist/to-array';

import createLogger from '../../utils/logger';

const logger = createLogger( 'focus-manager' );

/**
 * @implements {ReactiveController}
 */
class FocusManagerController {
	/** @type {FocusManagerControllerHost} */
	host;

	/** @type {Element | null} */
	activeDescendant;

	/**
	 * Keys (printable characters) the user typed on the listbox.
	 * The expectation is that the user wants to select something.
	 * @type {string}
	 */
	buffer;

	/**
	 * Timeout to clear the buffer.
	 * @type {number}
	 */
	bufferTimeout;

	/**
	 * Query to get focusable elements.
	 * @type {string}
	 */
	query;

	/**
	 * Should the focus manager be active.
	 * @type {boolean}
	 */
	active;

	/**
	 * @param {FocusManagerControllerHost} host
	 * @param {{ query: string, active: boolean }} options
	 */
	constructor( host, options ) {
		this.query = toArray( options.query ).join( ',' );
		this.active = Boolean( options.active ?? true );

		this.buffer = '';

		( this.host = host ).addController( this );
	}

	hostConnected() {
		if ( this.active ) {
			this._subscribe();
		}
	}

	hostDisconnected() {
		this._unsubscribe();
	}

	/**
	 * Get the list of elements matching the given `options.query`.
	 * @return {HTMLElement[]}
	 */
	get queried() {
		return Array.from( this.host.querySelectorAll( this.query ) );
	}

	/**
	 * Get the currently focused element, based on `activeDescendant`.
	 * @return {HTMLElement | null}
	 */
	get focused() {
		if ( ! this.activeDescendant ) {
			return null;
		}

		return document.getElementById( this.activeDescendant );
	}

	/**
	 * Activate focus management;
	 */
	activate = () => {
		if ( this.active ) {
			return;
		}

		this._subscribe();
		this.active = true;
	};

	/**
	 * Deactivate focus management;
	 */
	deactivate = () => {
		if ( ! this.active ) {
			return;
		}

		this._unsubscribe();
		this.active = false;
	};

	/**
	 * If none of the options are selected, the first option receives focus; otherwise, the
	 * focus moves to the next [enabled] option.
	 * If we are at the end of the `queried` array, the focus moves to the first option.
	 */
	focusNext() {
		const currentFocusedIndex = this.getIndexOf( this.focused );

		if ( currentFocusedIndex === -1 ) {
			logger.debug(
				'focusNext, could not get current focused (',
				this.focused,
				') index returned -1. Focusing first.'
			);

			this.focusFirst();
			return;
		}

		const nextItemIndex = ( currentFocusedIndex + 1 ) % this.queried.length;
		this.focus( nextItemIndex );
	}

	/**
	 * If none of the options are selected, the last option receives focus; otherwise, the
	 * focus moves to the next [enabled] option.
	 * If we are at the start of the `queried` array, the focus moves to the last option.
	 */
	focusPrevious() {
		const currentFocusedIndex = this.getIndexOf( this.focused );

		if ( currentFocusedIndex === -1 ) {
			logger.debug(
				'focusPrevious, could not get current focused (',
				focused,
				') index returned -1. Focusing last.'
			);

			this.focusLast();
			return;
		}

		// it's ok to have a negative index here. `Array.prototype.at()` will handle that correctly.
		const previousItemIndex = ( currentFocusedIndex - 1 ) % this.queried.length;
		this.focus( previousItemIndex );
	}

	/**
	 * Focus the first element in `queried`.
	 */
	focusFirst() {
		this.focus( 0 );
	}

	/**
	 * Focus the last element in `queried`.
	 */
	focusLast() {
		this.focus( this.queried.length - 1 );
	}

	/**
	 * Focus the given element or the element at the given index (based on `queried`).
	 * @param {number | HTMLElement} indexOrElement
	 */
	focus( indexOrElement ) {
		const element =
			typeof indexOrElement === 'number'
				? this.queried.at( indexOrElement )
				: indexOrElement;

		if ( ! element || element.disabled ) {
			logger.debug( 'could not focus element', element, '(arg: ', indexOrElement, ')' );
			return;
		}

		this.blur( document.getElementById( this.activeDescendant ) );

		element.classList.add( 'is-focused' );

		this.host.setAttribute( 'aria-activedescendant', element.id );
		this.activeDescendant = element.id;
	}

	/**
	 * Remove the visual focus (`.is-focused` class) from the currently focused element and
	 * clear the `activeDescendant` attribute.
	 */
	clearFocus() {
		this.blur( document.getElementById( this.activeDescendant ) );

		this.host.removeAttribute( 'aria-activedescendant' );
		this.activeDescendant = null;
	}

	/**
	 * Remove the visual focus (`.is-focused` class) from the given `element`.
	 * @param {HTMLElement} element
	 */
	blur( element ) {
		if ( ! element ) {
			return;
		}

		element.classList.remove( 'is-focused' );
	}

	/**
	 * Get the index of the given `element` in `queried`.
	 * @param {HTMLElement | null | undefined} element
	 * @returns {number}
	 */
	getIndexOf = ( element ) => {
		if ( ! element ) {
			return -1;
		}

		return this.queried.indexOf( element );
	};

	_subscribe() {
		logger.debug( 'focus management is on [', this.host.tag, ']' );
		this.host.addEventListener( 'keyup', this._handleKeyPress );
	}

	_unsubscribe() {
		logger.debug( 'focus management is off[', this.host.tag, ']' );
		this.host.removeEventListener( 'keyup', this._handleKeyPress );
	}

	/**
	 * Moves focus to the next menu item with a label that starts with the typed character
	 * if such an menu item exists. Otherwise, focus does not move.
	 * @param {KeyboardEvent} event
	 */
	_handleKeyPress = ( event ) => {
		const { key } = event;

		const isPrintableCharacter = ( str ) => {
			return str.length === 1 && str.match( /\S/ );
		};

		if ( ! isPrintableCharacter( key ) ) {
			logger.debug( 'skipping non-printable character', key );
			return;
		}

		const queried = this.queried;

		const clearBufferAfterDelay = () => {
			if ( this.bufferTimeout ) {
				clearTimeout( this.bufferTimeout );
				this.bufferTimeout = null;
			}

			this.bufferTimeout = setTimeout( () => {
				this.buffer = '';
				this.bufferTimeout = null;
			}, 500 );
		};

		const findMatchInRange = ( startAt, endAt ) => {
			for ( let i = startAt; i < endAt; i++ ) {
				/**
				 * [!] Be aware that `innerText` can be expensive as it takes CSS styles into accoun (it triggers a reflow to
				 * ensure up-to-date computed styles).
				 * Source: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
				 * // TODO: replace `innerText` with `textContent`?
				 */
				let label = queried[ i ].innerText.toLowerCase();

				if ( label && label.indexOf( this.buffer ) === 0 ) {
					return queried[ i ];
				}
			}

			return null;
		};

		let searchIndex = this.getIndexOf( this.focused );

		this.buffer += key;

		clearBufferAfterDelay();

		// TODO: produce one single list
		let nextMatch = findMatchInRange( searchIndex + 1, queried.length );

		if ( ! nextMatch ) {
			nextMatch = findMatchInRange( 0, searchIndex );
		}

		if ( nextMatch != null ) {
			logger.debug( 'found next match for focus', nextMatch );
			this.focus( nextMatch );
		}
	};
}

export default FocusManagerController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../common/xb-element').default} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & XBElement} FocusManagerControllerHost
 */
