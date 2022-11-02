import { unsafeCSS } from 'lit';

/**
 * Apply standard focus style.
 * @param {string} selector
 * @param {CSSResult} content
 */
function focusable( selector ) {
	return unsafeCSS( `${ selector }:not(.is-disabled, :disabled):focus,
		${ selector }:not(.is-disabled, :disabled):focus-within,
		${ selector }:not(.is-disabled, :disabled).is-focused` );
}

export default focusable;

/**
 * @typedef {import('lit').CSSResult} CSSResult
 */
