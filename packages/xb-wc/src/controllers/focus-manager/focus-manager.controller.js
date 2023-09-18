import toArray from '@welingtonms/xb-toolset/dist/to-array';

import createLogger from '../../utils/logger';
import { isPrintableCharacter } from '../../utils/string';

const logger = createLogger( 'focus-manager' );

/**
 * Manages **virtual** focus, for a11y purposes.
 * @implements {ReactiveController}
 */
class FocusManagerController {
	/** @type {FocusManagerControllerHost} */
	host;

	/** @type {string | null} */
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
	 * When the focus manager is active and the user types A-Z|a-z characters, the focus should
	 * moves to the next `queried` item with a label that starts with the typed character, if such an item exists;
	 * otherwise, focus does not move.
	 * @type {boolean}
	 */
	focusOnType;

	/**
	 * Get the element that will receive the `aria-activedescendant` attribute. This is necessary when the
	 * host element is not the one directly hosting the focusable elements.
	 * If no override is provided, the host element itself is used.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant MDN, aria-activedescendant}
	 * @type {(host: FocusManagerControllerHost) => HTMLElement}
	 */
	getInteractiveElement;

	/**
	 * @param {FocusManagerControllerHost} host
	 * @param {{
	 * 	query: string;
	 * 	active: boolean;
	 * 	focusOnType: boolean;
	 * 	getInteractiveElement: (host: FocusManagerControllerHost) => HTMLElement
	 * }} options
	 */
	constructor( host, options = {} ) {
		this.query = toArray( options.query ).join( ',' );
		this.active = Boolean( options.active ?? true );
		this.focusOnType = Boolean( options.focusOnType ?? true );
		this.getInteractiveElement = options.getInteractiveElement ?? ( ( host ) => host );

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

		/**
		 * FIXME: for some reason I could not pinpoint, document.getElementById( this.activeDescendant )
		 * this.host.querySelector( `#${ this.activeDescendant }` ) did not work during the headless Cypress tests.
		 * For that reason I changed this function, the `focusElement`, and the clear function to use the newly
		 * created `_findQueriedByID` method.
		 */

		return this._findQueriedByID( this.activeDescendant );
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
				this.focused,
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
	 * Focus the given element or the element at the given index or position ('first', 'last'), based on `queried`.
	 * @param {number | HTMLElement | ('first' | 'last' | 'previous' | 'next')} where
	 */
	focus( where ) {
		/**
		 * @param {HTMLElement} element
		 */
		const focusElement = ( element ) => {
			if ( ! element || element.disabled || ! element.id ) {
				logger.debug(
					'could not focus element',
					element,
					'(arg: ',
					where,
					')',
					! element?.id ? ' element has no id' : ''
				);
				return;
			}

			this.blur( this._findQueriedByID( this.activeDescendant ) );

			this.getInteractiveElement( this.host ).setAttribute( 'aria-activedescendant', element.id );
			element.classList.add( 'is-focused' );
			element.scrollIntoView( { block: 'start', inline: 'nearest', behavior: 'smooth' } );

			this.activeDescendant = element.id;
		};

		/**
		 * @param {number} index
		 */
		const focusIndex = ( index ) => {
			focusElement( this.queried.at( index ) );
		};

		/**
		 *
		 * @param {'first' | 'last' | 'previous' | 'next'} position
		 */
		const focusPosition = ( position ) => {
			if ( position === 'first' ) {
				focusElement( this.queried.at( 0 ) );
			} else if ( position === 'last' ) {
				focusElement( this.queried.at( this.queried.length - 1 ) );
			} else if ( position === 'previous' ) {
				this.focusPrevious();
			} else if ( position === 'next' ) {
				this.focusNext();
			}
		};

		if ( typeof where === 'number' ) {
			focusIndex( where );
		} else if ( typeof where === 'string' ) {
			focusPosition( where );
		} else {
			focusElement( where );
		}
	}

	/**
	 * Remove the visual focus (`.is-focused` class) from the currently focused element and
	 * clear the `activeDescendant` attribute.
	 */
	clearFocus() {
		this.blur( this._findQueriedByID( this.activeDescendant ) );

		this.getInteractiveElement( this.host ).removeAttribute( 'aria-activedescendant' );
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

	/**
	 * Find the given `id` in the `queried` array.
	 * @param {string} id
	 * @returns {HTMLElement | undefined}
	 */
	_findQueriedByID = ( id ) => {
		// return document.getElementById( id );
		return this.queried.find( ( element ) => {
			return element.id === id;
		} );
	};

	_subscribe() {
		if ( ! this.focusOnType ) {
			logger.debug( 'focus on type is disabled. will not listen to keyup events' );
			return;
		}

		logger.debug( 'focus on type is on for ', this.host.tag );
		this.host.addEventListener( 'keyup', this._handleKeyPress );
	}

	_unsubscribe() {
		logger.debug( 'focus on type is off for ', this.host.tag );
		this.host.removeEventListener( 'keyup', this._handleKeyPress );
	}

	/**
	 * Moves focus to the next menu item with a label that starts with the typed character
	 * if such an menu item exists. Otherwise, focus does not move.
	 * @param {KeyboardEvent} event
	 */
	_handleKeyPress = ( event ) => {
		const { key } = event;

		if ( ! isPrintableCharacter( key ) ) {
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
				 * [!] Be aware that `innerText` can be expensive as it takes CSS styles into account (it triggers a reflow to
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

		// try to find after the current index; if none found, try to find before the current index.
		let nextMatch =
			findMatchInRange( searchIndex + 1, queried.length ) || findMatchInRange( 0, searchIndex );

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
