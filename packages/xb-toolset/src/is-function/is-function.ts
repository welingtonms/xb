/**
 * Checks if the given value is an Objectl
 *
 * @param {*} value - Value to be checked
 * @return {boolean} `true` if `value` is a function, `false` otherwise.
 * Source: https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
 */
function isFunction( value: unknown ): value is CallableFunction {
	return [ '[object Function]', '[object AsyncFunction]' ].includes(
		Object.prototype.toString.call( value )
	);
}

export default isFunction;
