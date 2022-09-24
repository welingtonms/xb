import { unsafeCSS } from 'lit';

/**
 * Apply standard active style selector.
 * @param {string} selector
 */
function activable( selector ) {
	return unsafeCSS( `${ selector }:not(.is-disabled):not(:disabled):active` );
}

export default activable;

/**
 * @typedef {import('lit').CSSResult} CSSResult
 */
