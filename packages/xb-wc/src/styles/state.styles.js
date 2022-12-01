import { unsafeCSS } from 'lit';
import toArray from '@welingtonms/xb-toolset/dist/to-array';

/**
 * @param {string | string[]} selectors
 * @returns
 */
export function disabled( selectors ) {
	/** @type {string[]} */
	const safeSelectors = toArray( selectors );

	/**
	 * @param {string[]} selectors
	 * @returns {string[]}
	 */
	function build( selectors ) {
		return selectors.map(
			( selector ) => `${ selector }:is(.is-disabled, :disabled)`
		);
	}

	if ( safeSelectors.length === 1 ) {
		return unsafeCSS( build( safeSelectors ).join( ' ' ) );
	}

	return build( safeSelectors );
}

/**
 * @param {string | string[]} selectors
 * @returns
 */
export function enabled( selectors ) {
	/** @type {string[]} */
	const safeSelectors = toArray( selectors );

	/**
	 * @param {string[]} selectors
	 * @returns {string[]}
	 */
	function build( selectors ) {
		return selectors.map(
			( selector ) => `${ selector }:not(.is-disabled, :disabled)`
		);
	}

	if ( safeSelectors.length === 1 ) {
		return unsafeCSS( build( safeSelectors ).join( ' ' ) );
	}

	return build( safeSelectors );
}

/**
 * @param {string | string[]} selectors
 * @returns
 */
export function active( selectors ) {
	/** @type {string[]} */
	const safeSelectors = toArray( enabled( selectors ) );

	/**
	 * @param {string[]} selectors
	 * @returns {string[]}
	 */
	function build( selectors ) {
		return selectors.map( ( selector ) => `${ selector }:active` );
	}

	if ( safeSelectors.length === 1 ) {
		return unsafeCSS( build( safeSelectors ).join( ' ' ) );
	}

	return build( safeSelectors );
}

/**
 * @param {string | string[]} selectors
 * @returns
 */
export function focused( selectors ) {
	/** @type {string[]} */
	const safeSelectors = toArray( enabled( selectors ) );

	/**
	 * @param {string[]} selectors
	 * @returns {string[]}
	 */
	function build( selectors ) {
		return selectors.map(
			( selector ) => `${ selector }:is(:focus, :focus-within, .is-focused)`
		);
	}

	if ( safeSelectors.length === 1 ) {
		return unsafeCSS( build( safeSelectors ).join( ' ' ) );
	}

	return build( safeSelectors );
}

/**
 * @param {string | string[]} selectors
 * @returns
 */
export function hovered( selectors ) {
	/** @type {string[]} */
	const safeSelectors = toArray( enabled( selectors ) );

	/**
	 * @param {string[]} selectors
	 * @returns {string[]}
	 */
	function build( selectors ) {
		return selectors.map( ( selector ) => `${ selector }:hover` );
	}

	if ( safeSelectors.length === 1 ) {
		return unsafeCSS( build( safeSelectors ).join( ' ' ) );
	}

	return build( safeSelectors );
}

const SUPPORTED_STATES = {
	enabled,
	active,
	focused,
	hovered,
	disabled,
};

const PRIORITIES = {
	enabled: 0,
	disabled: 0,
	active: 10,
	focused: 10,
	hovered: 10,
};

/**
 *
 * @param {XBState} a
 * @param {XBState} b
 * @returns
 */
function sortByPriority( a, b ) {
	const aPriority = PRIORITIES[ a ];
	const bPriority = PRIORITIES[ b ];

	if ( aPriority < bPriority ) {
		return -1;
	}

	if ( aPriority > bPriority ) {
		return 1;
	}

	// a must be equal to b
	return 0;
}

/**
 * @param {string} selector
 * @param  {...XBState} pseudos
 * @returns {import('lit').CSSResult}
 */
function is( selector, ...pseudos ) {
	pseudos.sort( sortByPriority );

	return unsafeCSS(
		Array.from( new Set( pseudos ) )
			.reduce( ( result, pseudo ) => {
				return SUPPORTED_STATES[ pseudo ]( result );
			}, selector )
			.join( ', ' )
	);
}

// export function compose( selectors, subselectors ) {
// 	/** @type {string[]} */
// 	const safeSelectors = toArray( selectors );
// 	/** @type {string[]} */
// 	const safeSubSelectors = toArray( subselectors );

// 	return unsafeCSS(
// 		toArray( selectors )
// 			.map( ( selector ) =>
// 				toArray( subselectors )
// 					.map( ( subselector ) => [ selector, subselector ].join( ' ' ) )
// 					.join( ', ' )
// 			)
// 			.join( ', ' )
// 	);
// }

/**
 *
 * @param {string} selector
 */
export default function when( selector ) {
	return {
		/**
		 * @param  {...XBState} pseudos
		 * @returns {CSSResult}
		 */
		is( ...pseudos ) {
			return unsafeCSS( is( selector, ...pseudos ) );
		},
	};
}

/**
 * @typedef {keyof PRIORITIES} XBState
 * @typedef {import('lit').CSSResult} CSSResult
 */
