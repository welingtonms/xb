import Theme from '../themes/xb.theme.js';
// import type { Token, TokenValue } from '../types';

/**
 * Get token value.
 *
 * @example
 * ```js
 * getToken('color-primary')
 * ```
 *
 * @param {Token} token - Token whose value should be retrieved.
 * @returns {TokenValue} Token value or '/**TOKEN ${token} NOT FOUND **\/' otherwise.
 */
// function getToken( token: Token ): TokenValue {
function getToken( token ) {
	return Theme[ token ];
}

export default getToken;

/**
 * @typedef {keyof typeof Theme} Token
 */
