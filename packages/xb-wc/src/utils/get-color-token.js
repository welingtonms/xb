import { unsafeCSS } from 'lit';
import { toCSSValue } from '@welingtonms/xb-tokens';

/**
 * Get color token as lit's `CSSResult`
 * @param {ColorToken} token - Color token
 * @param {number} [alpha] - opacity
 * @returns {CSSResult}
 */
function getColor( token, alpha ) {
	return unsafeCSS( toCSSValue( token, alpha ) );
}

export default getColor;

/**
 * @typedef {import('@welingtonms/xb-tokens').ColorToken} ColorToken
 * @typedef {import('lit').CSSResult} CSSResult
 */
