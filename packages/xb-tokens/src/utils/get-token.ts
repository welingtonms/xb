import theme from '../themes/xb.theme';
import type { Token, TokenValue } from '../types';

/**
 * Get token value.
 *
 * @example
 * ```js
 * getToken('color-primary')
 * ```
 *
 * @param token - Token whose value should be retrieved.
 * @returns {TokenValue} Token value or '/**TOKEN ${token} NOT FOUND **\/' otherwise.
 */
function getToken( token: Token ): TokenValue {
	return theme[ token ];
}

export default getToken;
