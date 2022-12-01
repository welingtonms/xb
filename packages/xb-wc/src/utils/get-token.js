import { unsafeCSS } from 'lit';
import { toCSSValue } from '@welingtonms/xb-tokens';

/**
 * Get token as lit's `CSSResult`. Handles color tokens wrapping
 * the token value in the `rgb` format, optionally, adding the `opacity`.
 * @param {Token} token - Miranda token
 * @param {number} [alpha] - opacity (applicable only to color tokens)
 * @returns {CSSResult}
 */
function getToken( token, alpha ) {
	token = String( token || '' );

	if ( token.startsWith( 'color-' ) ) {
		return unsafeCSS( toCSSValue( token, alpha ) );
	}

	return unsafeCSS( toCSSValue( token ) );
}

export default getToken;

/**
 * @typedef {import('@welingtonms/xb-tokens').Token} Token
 * @typedef {import('lit').CSSResult} CSSResult
 */
