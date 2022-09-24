/**
 * Produces array for non-array value.
 * @template T
 * @param {T | T[] | null} value Value to be converted/returned.
 * @return {T[]} Returns `value` itself if it is an array or
 * an array containing the provided `value`.
 */
function toArray< T >( value?: T | T[] | null ): T[] {
	if ( value == null ) {
		return [];
	}

	if ( Array.isArray( value ) ) {
		return value;
	}

	return [ value ];
}

export default toArray;
