import { unsafeCSS } from 'lit';

/**
 * Apply right padding.
 * @param {unknown} padding
 */
export function pr( padding ) {
	return unsafeCSS( `
		padding-inline-end: ${ padding }
	` );
}

/**
 * Apply left padding.
 * @param {unknown} padding
 */
export function pl( padding ) {
	return unsafeCSS( `
		padding-inline-start: ${ padding }
	` );
}

/**
 * Apply right/left paddings.
 * @param {unknown} padding
 */
export function px( padding ) {
	return unsafeCSS( `
		${ pl( padding ) };
		${ pr( padding ) }
	` );
}

/**
 * Apply top padding.
 * @param {unknown} padding
 */
export function pt( padding ) {
	return unsafeCSS( `
		padding-block-start: ${ padding }
	` );
}

/**
 * Apply bottom padding.
 * @param {unknown} padding
 */
export function pb( padding ) {
	return unsafeCSS( `
		padding-block-end: ${ padding }
	` );
}

/**
 * Apply top/bottom paddings.
 * @param {unknown} padding
 */
export function py( padding ) {
	return unsafeCSS( `
		${ pt( padding ) };
		${ pb( padding ) }
	` );
}

/**
 * Apply right/left/top/bottom paddings.
 * @param {unknown} padding
 */
function p( padding ) {
	return unsafeCSS( `
		${ px( padding ) };
		${ py( padding ) }
	` );
}

export default p;
