import { unsafeCSS } from 'lit';

/**
 * Apply standard disabled style selector.
 * @param {string} selectors
 * @param {string} [subselector]
 */
function disableable( selector, subselector = '' ) {
	return unsafeCSS(
		[ `${ selector }.is-disabled`, `${ selector }:disabled` ]
			.map( ( rule ) => [ rule, subselector ].join( ' ' ) )
			.join( ', ' )
	);
}

export default disableable;

/**
 * @typedef {import('lit').CSSResult} CSSResult
 */
