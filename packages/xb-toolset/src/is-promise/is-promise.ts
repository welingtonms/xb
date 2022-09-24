/**
 * Determines whether the given `value` is a Promise.
 *
 * @param {*} value - Value to be evaluatd
 * @return {boolean} `true` if `value` is a Promise, `false` otherwise.
 * Source: https://futurestud.io/tutorials/detect-if-value-is-a-promise-in-node-js-and-javascript
 */
function isPromise< T = void >( value: unknown ): value is Promise< T > {
	// @ts-ignore
	return Boolean( value ) && typeof value.then === 'function';
}

export default isPromise;
