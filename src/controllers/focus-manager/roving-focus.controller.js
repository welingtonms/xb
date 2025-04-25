import toArray from '../../utils/to-array';
import createLogger from '../../utils/logger';
import { isPrintableCharacter } from '../../utils/string';

const logger = createLogger( 'roving-focus' );

export const SEARCH_BUFFER_TIMEOUT = 500;

/**
 * Manages focus for interactive elements within a composite widget using the roving tabindex pattern.
 * Focus moves directly to the active element.
 * @implements {ReactiveController}
 */
export class RovingFocusController {
	/** @type {RovingFocusControllerHost} */
	host;

	/**
	 * Query to get focusable elements.
	 * @type {((host: RovingFocusControllerHost) => HTMLElement[])}
	 */
	query;

	/**
	 * When active and the user types A-Z|a-z characters, focus moves to the next
	 * `queried` item with a label starting with the typed character.
	 * @type {boolean}
	 */
	searchable;

	/**
	 * `buffer`: Keys (printable characters) the user typed.
	 * `timeout`: Timeout to clear the buffer.
	 * @type {{
	 * 	buffer: string;
	 * 	timeout: number | null;
	 * }}
	 */
	search;

	/**
	 * The currently focused element.
	 * @type {HTMLElement | null}
	 */
	#focusedElement = null;

	/**
	 * @param {RovingFocusControllerHost} host
	 * @param {RovingFocusControllerOptions} options
	 */
	constructor( host, options = {} ) {
		this.query =
			typeof options.query === 'function'
				? options.query
				: () => Array.from( this.host.querySelectorAll( toArray( options.query ).join( ',' ) ) );
		this.searchable = Boolean( options.searchable ?? true );

		this.search = {
			buffer: '',
			timeout: null,
		};

		( this.host = host ).addController( this );
	}

	hostConnected() {
		// DO NOT initialize tabindex here - elements might not be ready.
		// Only set up listeners.
		if ( this.searchable ) {
			logger.debug( 'Search on type is enabled for', this.host.tagName );
			this.host.addEventListener( 'keyup', this.#onKeyPress );
			// We need keydown for arrow keys to prevent scrolling, etc.
			this.host.addEventListener( 'keydown', this.#onKeyDown );
		} else {
			logger.debug( 'Search on type is disabled for', this.host.tagName );
		}
	}

	hostDisconnected() {
		if ( this.searchable ) {
			this.host.removeEventListener( 'keyup', this.#onKeyPress );
			this.host.removeEventListener( 'keydown', this.#onKeyDown );
		}
	}

	/**
	 * Get the list of elements matching the given `options.query`.
	 * Filters out disabled elements.
	 * @return {HTMLElement[]}
	 */
	get queried() {
		// Filter out disabled elements for focus management
		return Array.from( this.query( this.host ) ).filter(
			( el ) => ! el.disabled && ! el.hasAttribute( 'disabled' )
		);
	}

	/**
	 * Get the currently focused element within the host's queried items.
	 * @return {HTMLElement | null}
	 */
	get focused() {
		return this.#focusedElement;
	}

	/**
	 * Initializes the tabindex for all queried elements.
	 * Ensures exactly one element has tabindex="0", others have tabindex="-1".
	 * Prioritizes the currently focused element, then the first element.
	 * Should be called by the host when the queried elements are known to be ready.
	 */
	initialize = () => {
		const queried = this.queried;
		let hasFocusableItem = false;

		// Check if the currently focused item is still valid and focusable
		const currentFocusedIsValid = this.#focusedElement && queried.includes( this.#focusedElement );

		queried.forEach( ( el, index ) => {
			if ( currentFocusedIsValid && el === this.#focusedElement ) {
				el.tabIndex = 0;
				el.classList.add( 'is-focused' );
				hasFocusableItem = true;
			} else {
				el.tabIndex = -1;
				el.classList.remove( 'is-focused' );
			}
		} );

		// If no item is designated as focusable (e.g., first load or focused item removed),
		// set the first available item as focusable.
		if ( ! hasFocusableItem && queried.length > 0 ) {
			queried[ 0 ].tabIndex = 0;
		}
	};

	/**
	 * Moves focus to the next enabled element. Wraps around.
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focusNext( callback ) {
		this.focus( 'next', callback );
	}

	/**
	 * Moves focus to the previous enabled element. Wraps around.
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focusPrevious( callback ) {
		this.focus( 'previous', callback );
	}

	/**
	 * Focus the first enabled element.
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focusFirst( callback ) {
		this.focus( 0, callback );
	}

	/**
	 * Focus the last enabled element.
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focusLast( callback ) {
		this.focus( this.queried.length - 1, callback );
	}

	/**
	 * Focus the given element or the element at the given index or position.
	 * @param {number | HTMLElement | ('first' | 'last' | 'previous' | 'next')} where
	 * @param {((element: HTMLElement) => void)} [callback]
	 */
	focus( where, callback ) {
		const queried = this.queried;

		if ( queried.length === 0 ) {
			logger.debug( 'No focusable elements found.' );
			return;
		}

		/** @type {HTMLElement | null} */
		let elementToFocus = null;

		if ( typeof where === 'number' ) {
			elementToFocus = queried.at( where );
		} else if ( typeof where === 'string' ) {
			const currentIndex = this.#getIndexOf( this.#focusedElement );

			switch ( where ) {
				case 'first':
					elementToFocus = queried.at( 0 );
					break;
				case 'last':
					elementToFocus = queried.at( -1 );
					break;
				case 'previous': {
					const targetIndex =
						currentIndex === -1 ? -1 : ( currentIndex - 1 + queried.length ) % queried.length;
					elementToFocus = queried.at( targetIndex );
					break;
				}
				case 'next': {
					const targetIndex = currentIndex === -1 ? 0 : ( currentIndex + 1 ) % queried.length;
					elementToFocus = queried.at( targetIndex );
					break;
				}
			}
		} else if ( where instanceof HTMLElement && queried.includes( where ) ) {
			elementToFocus = where;
		}

		if (
			! elementToFocus ||
			elementToFocus.disabled ||
			elementToFocus.hasAttribute( 'disabled' )
		) {
			logger.debug(
				'Could not find a valid element to focus or element is disabled.',
				where,
				elementToFocus
			);
			return;
		}

		// Update tabindex and focus
		if ( this.#focusedElement && this.#focusedElement !== elementToFocus ) {
			this.#focusedElement.tabIndex = -1;
			this.#focusedElement.classList.remove( 'is-focused' );
		}

		elementToFocus.tabIndex = 0;
		elementToFocus.classList.add( 'is-focused' );
		elementToFocus.focus(); // Move actual focus

		this.#focusedElement = elementToFocus;

		// Optional: Scroll into view if needed, though native focus often handles this.
		// elementToFocus.scrollIntoView({ block: 'nearest', inline: 'nearest' });

		callback?.( elementToFocus );
	}

	/**
	 * Removes focus from the currently focused element and resets tabindex.
	 * Optionally moves focus back to the host element.
	 * @param {{ returnFocusToHost?: boolean }} [options]
	 */
	clear( options = { returnFocusToHost: false } ) {
		if ( this.#focusedElement ) {
			this.#focusedElement.tabIndex = -1;
			this.#focusedElement.classList.remove( 'is-focused' );
			// Optionally blur the element if focus shouldn't linger
			// this.#focusedElement.blur();
		}
		this.#focusedElement = null;

		// Re-initialize tabindex to ensure one item is focusable if items exist
		this.initialize();

		if ( options.returnFocusToHost ) {
			this.host.focus();
		}
	}

	/**
	 * Get the index of the given `element` in the queried list.
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
	 * Handles arrow key navigation within the host.
	 * @param {KeyboardEvent} event
	 */
	#onKeyDown = ( event ) => {
		switch ( event.key ) {
			case 'ArrowUp':
				event.preventDefault();
				this.focusPrevious();
				break;
			case 'ArrowDown':
				event.preventDefault();
				this.focusNext();
				break;
			case 'Home':
				event.preventDefault();
				this.focusFirst();
				break;
			case 'End':
				event.preventDefault();
				this.focusLast();
				break;
			// Add ArrowLeft/Right if needed for horizontal layouts
		}
	};

	/**
	 * Moves focus to the next item starting with the typed character(s).
	 * @param {KeyboardEvent} event
	 */
	#onKeyPress = ( event ) => {
		const { key } = event;

		if ( ! isPrintableCharacter( key ) || event.ctrlKey || event.altKey || event.metaKey ) {
			return;
		}

		const queried = this.queried;
		if ( queried.length === 0 ) return;

		const clearBufferAfterDelay = () => {
			if ( this.search.timeout ) {
				clearTimeout( this.search.timeout );
			}
			this.search.timeout = setTimeout( () => {
				this.search.buffer = '';
				this.search.timeout = null;
			}, SEARCH_BUFFER_TIMEOUT );
		};

		const findMatchInRange = ( startAt, endAt ) => {
			for ( let i = startAt; i < endAt; i++ ) {
				const item = queried[ i ];
				// Use textContent for better performance and less reliance on visual rendering.
				const label = item.textContent?.trim().toLowerCase() ?? '';
				if ( label.startsWith( this.search.buffer ) ) {
					return item;
				}
			}
			return null;
		};

		const currentIndex = this.#getIndexOf( this.#focusedElement );
		// If multiple keys are typed quickly, concatenate them. Otherwise, start new search.
		this.search.buffer = this.search.timeout
			? this.search.buffer + key.toLowerCase()
			: key.toLowerCase();

		clearBufferAfterDelay();

		// Search from the item after the current one, wrapping around.
		const nextMatch =
			findMatchInRange( currentIndex + 1, queried.length ) ||
			findMatchInRange( 0, currentIndex + 1 ); // Include current index in wrap-around

		if ( nextMatch && nextMatch !== this.#focusedElement ) {
			logger.debug( 'Found match for search:', nextMatch );
			this.focus( nextMatch );
		}
	};
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../xb-element').XBElement} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & XBElement & { focus: () => void }} RovingFocusControllerHost
 */

/**
 * @typedef {{
 * 	query: string | string[] | ((host: RovingFocusControllerHost) => HTMLElement[]);
 * 	searchable?: boolean;
 * }} RovingFocusControllerOptions
 */
