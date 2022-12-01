import { unsafeCSS } from 'lit';

import token from '../utils/get-token';

/**
 *
 * @param {string} [outlineProperty]
 * @returns {import('lit').CSSResult}
 */
function outline( outlineProperty ) {
	return unsafeCSS(
		`outline: 0.2rem solid  ${
			outlineProperty == null
				? token( 'color-primary-200', 0.2 )
				: `var( ${ outlineProperty } )`
		};`
	);
}

/* box-shadow: ${ token( 'color-primary-200', 0.3 ) } 5px 5px,
${ token( 'color-primary-200', 0.2 ) } 10px 10px,
${ token( 'color-primary-200', 0.1 ) } 15px 15px; */

export default outline;
