/**
 * Async wrapper for waiting a promise to be settled without the hussle of handling error.
 * @template T
 * @param {Promise<T>} promise - promise to be awaited for.
 * @returns {Promise<[any, T | undefined]>}
 */
function awaitTo(
	promise
) {
	return promise
		.then< [ null, T ] >( ( data ) => {
			return [ null, data ];
		} )
		.catch< [ any, undefined ] >( ( err ) => {
			return [ err, undefined ];
		} );
}

export default awaitTo;
