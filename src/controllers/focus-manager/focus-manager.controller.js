import toArray from '../../utils/to-array';

import createLogger from '../../utils/logger';
import { isPrintableCharacter } from '../../utils/string';

const logger = createLogger( 'focus-manager' );

export const SEARCH_BUFFER_TIMEOUT = 500;
/**
 * Manages **virtual/visual** focus for non-natively focusable elements;
 * created for a11y purposes.
 * @implements {ReactiveController}
 */
export class FocusManagerController {
	/** @type {FocusManagerControllerHost} */
	host;

	/**
	 * Query to get focusable elements.
	 * @type {((host: FocusManagerControllerHost) => HTMLElement[])}
	 */
	query;

	/**
	 * When the focus manager is active and the user types A-Z|a-z characters, the focus should
	 * moves to the next `queried` item with a label that starts with the typed character, if such an item exists;
	 * otherwise, focus does not move.
	 * @type {boolean}
	 */
	searchable;

	/**
	 * `buffer`: Keys (printable characters) the user typed on the controlled host.
	 * The expectation is that the user wants to select something.
	 * `timeout`: Timeout to clear the buffer.
	 * @type {{
	 * 	buffer: string;
	 * 	timeout: number | null;
	 * }}
	 */
	search;

	/**
	 * ID of the currently focused descendant.
	 * @type {string | null}
	 */
	#focused;

	/**
	 * Get the element that will receive the `aria-activedescendant` attribute. This is necessary when the
	 * host element is not the one directly hosting the focusable elements.
	 * If no override is provided, the host element itself is used.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant MDN, aria-activedescendant}
	 * @type {(host: FocusManagerControllerHost) => HTMLElement}
	 */
	getControllerTarget;

	/**
	 * @param {FocusManagerControllerHost} host
	 * @param {FocusManagerControllerOptions} options
	 */
	constructor( host, options = {} ) {
		this.query =
			typeof options.query === 'function'
				? options.query
				: () => Array.from( this.host.querySelectorAll( toArray( options.query ).join( ',' ) ) );
		this.searchable = Boolean( options.searchable ?? true );
		this.getControllerTarget = options.getControllerTarget ?? ( ( host ) => host );

		this.search = {
			buffer: '',
			timeout: null,
		};

		( this.host = host ).addController( this );
	}

	hostConnected() {
		if ( ! this.searchable ) {
			logger.debug( 'focus on type is disabled. will not listen to keyup events' );
			return;
		}

		logger.debug( 'focus on type is on for ', this.host.tag );
		this.host.addEventListener( 'keyup', this.#onKeyPress );
	}

	hostDisconnected() {
		logger.debug( 'focus on type is off for ', this.host.tag );
		this.host.removeEventListener( 'keyup', this.#onKeyPress );
	}

	/**
	 * Get the list of elements matching the given `options.query`.
	 * @return {HTMLElement[]}
	 */
	get queried() {
		return Array.from( this.query( this.host ) );
	}

	/**
	 * Get the currently focused element, based on `activeDescendant`.
	 * @return {HTMLElement | null}
	 */
	get focused() {
		if ( ! this.#focused ) {
			return null;
		}

		return this.#findQueriedByID( this.#focused );
	}

	/**
	 * If none of the options are selected, the first option receives focus; otherwise, the
	 * focus moves to the next [enabled] option.
	 * If we are at the end of the `queried` array, the focus moves to the first option.
	 * @param {((element: HTMLElement) => void)} [callback] called when the element is focused
	 */
	focusNext( callback ) {
		this.focus( 'next', callback );
	}

	/**
	 * If none of the options are selected, the last option receives focus; otherwise, the
	 * focus moves to the next [enabled] option.
	 * If we are at the start of the `queried` array, the focus moves to the last option.
	 * @param {((element: HTMLElement) => void)} [callback] called when the element is focused
	 */
	focusPrevious( callback ) {
		this.focus( 'previous', callback );
	}

	/**
	 * Focus the first element in `queried`.
	 * @param {((element: HTMLElement) => void)} [callback] called when the element is focused
	 */
	focusFirst( callback ) {
		this.focus( 0, callback );
	}

	/**
	 * Focus the last element in `queried`.
	 * @param {((element: HTMLElement) => void)} [callback] called when the element is focused
	 */
	focusLast( callback ) {
		this.focus( this.queried.length - 1, callback );
	}

	/**
	 * Focus the given element or the element at the given index or position ('first', 'last'), based on `queried`.
	 * @param {number | HTMLElement | ('first' | 'last' | 'previous' | 'next')} where
	 * @param {((element: HTMLElement) => void)} [callback] called when the element is focused
	 */
	focus( where, callback ) {
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

			this.clear();

			this.#focused = element.id;

			this.getControllerTarget( this.host ).setAttribute( 'aria-activedescendant', element.id );

			element.classList.add( 'is-focused' );

			element.scrollIntoView( { block: 'start', inline: 'nearest', behavior: 'smooth' } );

			callback?.( element );
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
			const currentFocusedIndex = this.#getIndexOf( this.focused );

			switch ( position ) {
				case 'first':
					focusIndex( 0 );

					break;
				case 'last':
					focusIndex( this.queried.length - 1 );

					break;
				case 'previous': {
					if ( currentFocusedIndex === -1 ) {
						logger.debug( 'focus previous, could not get current focused. defaulting to last.' );

						focusIndex( this.queried.length - 1 );
						return;
					}

					// it's ok to have a negative index here. `Array.prototype.at()` will handle that correctly.
					const previousItemIndex =
						( currentFocusedIndex - 1 + this.queried.length ) % this.queried.length;
					focusIndex( previousItemIndex );

					break;
				}
				case 'next': {
					if ( currentFocusedIndex === -1 ) {
						logger.debug( 'focus next, could not get current focused; defaulting to first.' );

						focusIndex( 0 );
						return;
					}

					const nextItemIndex = ( currentFocusedIndex + 1 ) % this.queried.length;
					focusIndex( nextItemIndex );

					break;
				}
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
	clear() {
		this.getControllerTarget( this.host ).removeAttribute( 'aria-activedescendant' );

		const element = this.focused;
		this.#focused = null;

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
	#getIndexOf = ( element ) => {
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
	#findQueriedByID = ( id ) => {
		return this.queried.find( ( element ) => {
			return element.id === id;
		} );
	};

	/**
	 * Moves focus to the next menu item with a label that starts with the typed character
	 * if such an menu item exists. Otherwise, focus does not move.
	 * @param {KeyboardEvent} event
	 */
	#onKeyPress = ( event ) => {
		const { key } = event;

		if ( ! isPrintableCharacter( key ) ) {
			return;
		}

		const queried = this.queried;

		const clearBufferAfterDelay = () => {
			if ( this.search.timeout ) {
				clearTimeout( this.search.timeout );
				this.search.timeout = null;
			}

			this.search.timeout = setTimeout( () => {
				this.search.buffer = '';
				this.search.timeout = null;
			}, SEARCH_BUFFER_TIMEOUT );
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

				if ( label && label.indexOf( this.search.buffer ) === 0 ) {
					return queried[ i ];
				}
			}

			return null;
		};

		let searchIndex = this.#getIndexOf( this.focused );

		this.search.buffer += key;

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

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../xb-element').default} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & XBElement} FocusManagerControllerHost
 */

/**
 * @typedef {{
 * 	query: string | ((host: FocusManagerControllerHost) => HTMLElement[]);
 * 	searchable?: boolean;
 * 	getControllerTarget?: (host: FocusManagerControllerHost) => HTMLElement
 * }} FocusManagerControllerOptions
 */
