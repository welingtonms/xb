const BASE_PIXELS = 16;

/**
 * Convert the provided value from `px` to `rem`.
 *
 * @example
 * ```js
 * // Considering 1rem = 16px
 * rem(10); // returns '0.625rem'
 * rem('16px'); // returns '1rem'
 * ```
 *
 * @param {number|string} value - value, in pixels, to convert.
 * @param {number} base - value, in pixels, to be considered for `1rem`.
 * @returns {string} value converted to `rem`.
 *
 */
function rem( value: number | string, base = BASE_PIXELS ): string {
	return `${ parseInt( String( value ), 10 ) / base }rem`;
}

export default rem;
