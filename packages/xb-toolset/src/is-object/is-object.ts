/**
 * Checks if the given value is an Objectl
 *
 * @param {*} value - Value to be checked
 * @return {boolean} `true` if `value` is an object, `false` otherwise.
 * Source: https://medium.com/javascript-in-plain-english/javascript-check-if-a-variable-is-an-object-and-nothing-else-not-an-array-a-set-etc-a3987ea08fd7
 */
function isObject( value: unknown ): value is Object {
	return Object.prototype.toString.call( value ) === '[object Object]';
}

export default isObject;
