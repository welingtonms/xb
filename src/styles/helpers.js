import { unsafeCSS } from 'lit';

/**
 * @param {String} target
 * @param {String} selector
 */
export function wrapTargetedSelector( target, selector ) {
	if ( target.match( /host/ ) ) {
		return unsafeCSS( `:host(${ selector })` );
	}

	return unsafeCSS( `${ target }${ selector }` );
}
