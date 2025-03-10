import { unsafeCSS } from 'lit';
import toCSSValue from './to-css-value';

/**
 * Get token as lit's `CSSResult`. Handles color tokens wrapping
 * the token value in the `rgb` format, optionally, adding the `opacity`.
 * @param {Token} token - Miranda token
 * @param {number} [alpha] - opacity (applicable only to color tokens)
 * @returns {CSSResult}
 */
function toCSSResult( token, alpha ) {
	token = String( token || '' );

	if ( token.startsWith( 'color-' ) ) {
		return unsafeCSS( toCSSValue( token, alpha ) );
	}

	return unsafeCSS( toCSSValue( token ) );
}

export default toCSSResult;

/**
 * @typedef {import('./prop-types').Token} Token
 * @typedef {import('lit').CSSResult} CSSResult
 */
