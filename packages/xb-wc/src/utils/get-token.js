import { unsafeCSS } from 'lit';
import { toCSSValue } from '@welingtonms/xb-tokens';

/**
 * Get token as lit's `CSSResult`
 * @param {Token} token - Miranda token
 * @returns {CSSResult}
 */
function getToken( token ) {
	return unsafeCSS( toCSSValue( token ) );
}

export default getToken;

/**
 * @typedef {import('@welingtonms/xb-tokens').Token} Token
 * @typedef {import('lit').CSSResult} CSSResult
 */
