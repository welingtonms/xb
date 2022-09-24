import getToken from './get-token';
import toCSSVariable from './to-css-variable';
import type {
	ColorToken,
	SpacingToken,
	FontFamilyToken,
	FontSizeToken,
	FontWeightToken,
	LayerToken,
} from '../types';

type ExceptColorToken =
	| FontFamilyToken
	| FontSizeToken
	| FontWeightToken
	| LayerToken
	| SpacingToken;

function toCSSValue( token: ColorToken, alpha?: number ): string;
function toCSSValue( token: ExceptColorToken ): string;
function toCSSValue(
	token: ExceptColorToken | ColorToken,
	alpha?: number
): string {
	if ( getToken( token ) == null ) {
		return token;
	}

	if ( token.startsWith( 'color-' ) ) {
		return `rgba(var(${ toCSSVariable( token ) }, ${ getToken( token ) }), ${
			alpha ?? 1
		})`;
	}

	return `var(${ toCSSVariable( token ) }, ${ getToken( token ) })`;
}

export default toCSSValue;
