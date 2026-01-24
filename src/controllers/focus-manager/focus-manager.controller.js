import createLogger from '../../utils/logger';
import { BaseFocusController } from './base-focus.controller.js';

const logger = createLogger( 'focus-manager' );

/**
 * Manages **virtual/visual** focus for non-natively focusable elements;
 * created for a11y purposes.
 * @implements {ReactiveController}
 */
export class FocusManagerController extends BaseFocusController {
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
		super( host, options );

		this.getControllerTarget = options.getControllerTarget ?? ( ( host ) => host );
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

			element.scrollIntoView( { block: 'nearest', inline: 'nearest', behavior: 'smooth' } );

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
			const currentFocusedIndex = this.getIndexOf( this.focused );

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
	 * Find the given `id` in the `queried` array.
	 * @param {string} id
	 * @returns {HTMLElement | undefined}
	 */
	#findQueriedByID = ( id ) => {
		return this.queried.find( ( element ) => {
			return element.id === id;
		} );
	};
}

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../components/xb-element').XBElement} XBElement
 */

/**
 * @typedef {ReactiveControllerHost & XBElement} FocusManagerControllerHost
 */

/**
 * @typedef {import('./base-focus.controller').BaseFocusControllerOptions & {
 * 	getControllerTarget?: (host: FocusManagerControllerHost) => HTMLElement
 * }} FocusManagerControllerOptions
 */

/**
 * @typedef {Object} FocusManagerControllerPlugin
 * @property {((controller: FocusManagerController) => void)} install
 * @property {((controller: FocusManagerController) => void)} hostConnected
 * @property {((controller: FocusManagerController) => void)} hostDisconnected
 * @property {((event: string, data: any, controller: FocusManagerController) => void)} handleEvent
 */
