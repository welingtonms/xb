/**
 * Async wrapper for waiting a promise to be settled without the hussle of handling error.
 * @param promise - promise to be awaited for.
 * @param errorExt - error to be appended, in case the promise is rejected.
 */
function awaitTo< T >(
	promise: Promise< T >
): Promise< [ any, T | undefined ] > {
	return promise
		.then< [ null, T ] >( ( data: T ) => {
			return [ null, data ];
		} )
		.catch< [ any, undefined ] >( ( err: any ) => {
			return [ err, undefined ];
		} );
}

export default awaitTo;
