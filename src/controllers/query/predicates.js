/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export const isFocusable = ( element ) => ! element.disabled && ! element.hasAttribute( 'disabled' );

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export const isHidden = ( element ) => element.hasAttribute( 'hidden' );

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export const isNotHidden = ( element ) => ! isHidden( element );

/**
 * @param {((element: HTMLElement) => boolean)[]} predicates
 * @returns {(element: HTMLElement) => boolean}
 */
export const every =
	( ...predicates ) =>
	( element ) =>
		predicates.every( ( predicate ) => predicate( element ) );
