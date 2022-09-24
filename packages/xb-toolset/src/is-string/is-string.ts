/**
 * Checks if the given value is a string
 *
 * @param {*} value - Value to be checked
 * @return {boolean} `true` if `value` is a string value, `false` otherwise.
 */
function isString( value: unknown ): value is String {
	return typeof value === 'string';
}

export default isString;
