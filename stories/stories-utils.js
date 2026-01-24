import Theme from '../src/themes/xb.theme.js';

const themeTokens = Object.keys( Theme );

export function getThemeTokens( ...filters ) {
	const regex = new RegExp( `^${ filters.join( '|' ) }` );

	return themeTokens.filter( ( token ) => regex.test( token ) );
}
