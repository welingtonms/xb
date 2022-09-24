import getToken from './get-token';
import type { Token, TokenValue } from '../types';

function toCSSVariable( token: Token ): TokenValue {
	let value = getToken( token );

	if ( value == null ) {
		return value;
	}

	return `--xb-${ token }`;
}

export default toCSSVariable;
