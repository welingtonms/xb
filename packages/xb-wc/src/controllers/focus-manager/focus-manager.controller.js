import toArray from '@welingtonms/xb-toolset/dist/to-array';

import logger from '../../utils/logger';

/**
 * @implements {ReactiveController}
 */
class FocusManagerController {
	/** @type {ReactiveControllerHost} */
	host;

	/** @type {Element | null} */
	activeDescendant;

	/**
	 * @param {XBElement & ReactiveControllerHost} host
	 * @param {{ query: string }} options
	 */
	constructor( host, options ) {
		this.options = {};
		this.options.query = toArray( options.query ).join( ',' );

		( this.host = host ).addController( this );
	}

	hostConnected() {}

	async hostUpdated() {}

	/**
	 * Get the list of elements matching the given `options.query`.
	 * @return {HTMLElement[]}
	 */
	get queried() {
		return Array.from( this.host.querySelectorAll( this.options.query ) );
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
	 * If none of the options are selected, the first option receives focus; otherwise, the
	 * focus moves to the next [enabled] option.
	 * If we are at the end of the `queried` array, the focus moves to the first option.
	 */
	focusNext = () => {
		const currentFocusedIndex = this._getIndexOf( this.focused );

		if ( currentFocusedIndex === -1 ) {
			logger.debug(
				'[focus-manager] focusNext, could not get current focused (',
				focused,
				') index returned -1. Focusing first.'
			);

			this.focusFirst();
			return;
		}

		const nextItemIndex = ( currentFocusedIndex + 1 ) % this.queried.length;
		this.focus( nextItemIndex );
	};

	/**
	 * If none of the options are selected, the last option receives focus; otherwise, the
	 * focus moves to the next [enabled] option.
	 * If we are at the start of the `queried` array, the focus moves to the last option.
	 */
	focusPrevious = () => {
		const currentFocusedIndex = this._getIndexOf( this.focused );

		if ( currentFocusedIndex === -1 ) {
			logger.debug(
				'[focus-manager] focusPrevious, could not get current focused (',
				focused,
				') index returned -1. Focusing last.'
			);

			this.focusLast();
			return;
		}

		// it's ok to have a negative index here. `Array.prototype.at()` will handle that correctly.
		const previousItemIndex = ( currentFocusedIndex - 1 ) % this.queried.length;
		this.focus( previousItemIndex );
	};

	/**
	 * Focus the first element in `queried`.
	 */
	focusFirst = () => {
		this.focus( 0 );
	};

	/**
	 * Focus the last element in `queried`.
	 */
	focusLast = () => {
		this.focus( this.queried.length - 1 );
	};

	/**
	 * Focus the given element or the element at the given index (based on `queried`).
	 * @param {number | HTMLElement} indexOrElement
	 */
	focus = ( indexOrElement ) => {
		const element =
			typeof indexOrElement === 'number'
				? this.queried.at( indexOrElement )
				: indexOrElement;

		if ( ! element || element.disabled ) {
			logger.debug(
				'[focus-manager] could not focus element',
				element,
				'(arg: ',
				elementArg,
				')'
			);
			return;
		}

		this.blur( document.getElementById( this.activeDescendant ) );

		element.classList.add( 'is-focused' );
		this.host.setAttribute( 'aria-activedescendant', element.id );
		this.activeDescendant = element.id;
	};

	/**
	 * Remove the visual focus (`.is-focused` class) from the currently focused element and
	 * clear the `activeDescendant` attribute.
	 */
	clearFocus = () => {
		this.blur( document.getElementById( this.activeDescendant ) );

		this.host.removeAttribute( 'aria-activedescendant' );
		this.activeDescendant = null;
	};

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
	_getIndexOf = ( element ) => {
		if ( ! element ) {
			return -1;
		}

		return this.queried.indexOf( element );
	};
}

export default FocusManagerController;

/**
 * @typedef {import('lit').ReactiveControllerHost} ReactiveControllerHost
 * @typedef {import('lit').ReactiveController} ReactiveController
 * @typedef {import('../../common/xb-element').default} XBElement
 */
