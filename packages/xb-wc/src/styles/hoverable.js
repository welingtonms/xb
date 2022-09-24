import { unsafeCSS } from 'lit';

/**
 * Apply standard hover style selector.
 * @param {string} selector
 */
function hoverable( selector ) {
	return unsafeCSS( `${ selector }:not(.is-disabled):not(:disabled):hover` );
}

export default hoverable;

/**
 * @typedef {import('lit').CSSResult} CSSResult
 */
