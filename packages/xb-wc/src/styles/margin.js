import { unsafeCSS } from 'lit';

/**
 * Apply right margin.
 * @param {unknown} margin
 */
export function mr( margin ) {
	return unsafeCSS( `
		margin-inline-end: ${ margin }
	` );
}

/**
 * Apply left margin.
 * @param {unknown} margin
 */
export function ml( margin ) {
	return unsafeCSS( `
		margin-inline-start: ${ margin }
	` );
}

/**
 * Apply right/left margins.
 * @param {unknown} margin
 */
export function mx( margin ) {
	return unsafeCSS( `
		${ ml( margin ) };
		${ mr( margin ) }
	` );
}

/**
 * Apply top margin.
 * @param {unknown} margin
 */
export function mt( margin ) {
	return unsafeCSS( `
		margin-block-start: ${ margin }
	` );
}

/**
 * Apply bottom margin.
 * @param {unknown} margin
 */
export function mb( margin ) {
	return unsafeCSS( `
		margin-block-end: ${ margin }
	` );
}

/**
 * Apply top/bottom margins.
 * @param {unknown} margin
 */
export function my( margin ) {
	return unsafeCSS( `
		${ mt( margin ) };
		${ mb( margin ) }
	` );
}

/**
 * Apply right/left/top/bottom margins.
 * @param {unknown} margin
 */
function m( margin ) {
	return unsafeCSS( `
		${ mx( margin ) };
		${ my( margin ) }
	` );
}

export default m;
