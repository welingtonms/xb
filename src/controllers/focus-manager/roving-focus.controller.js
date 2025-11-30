import createLogger from '../../utils/logger';
import { BaseFocusController } from './base-focus.controller.js';

const logger = createLogger( 'roving-focus' );

/**
 * Manages focus for interactive elements within a composite widget using the roving tabindex pattern.
 * Focus moves directly to the active element.
 * @implements {ReactiveController}
 */
export class RovingFocusController extends BaseFocusController {
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
		super( host, options );
	}

	hostConnected() {
		// DO NOT initialize tabindex here - elements might not be ready.
		// Only set up listeners.
		super.hostConnected();

		// RovingFocusController needs keydown for arrow key navigation
		if ( this.searchable ) {
			this.host.addEventListener( 'keydown', this.#onKeyDown );
		}
	}

	hostDisconnected() {
		if ( this.searchable ) {
			this.host.removeEventListener( 'keydown', this.#onKeyDown );
		}
		super.hostDisconnected();
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
			const currentIndex = this.getIndexOf( this.#focusedElement );

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
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../components/xb-element').XBElement} XBElement
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
