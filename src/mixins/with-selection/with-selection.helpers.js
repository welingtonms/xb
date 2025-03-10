import toArray from '../../utils/to-array';

export function fromAttribute( value ) {
	if ( ! value ) {
		return value;
	}

	if ( Array.isArray( value ) ) {
		return value;
	}

	return String( value ).split( ',' ).filter( Boolean );
}

export function toAttribute( value ) {
	if ( ! value ) {
		return value;
	}

	if ( Array.isArray( value ) ) {
		return toArray( value ).join( ',' );
	}

	return String( value );
}

export function hasValueChanged( value1, value2 ) {
	if ( ! value1 && ! value2 ) {
		return false;
	}

	if ( ! value1 || ! value2 ) {
		return true;
	}

	// calculate difference using frequency map
	/** @type {Map<string, number>} */
	const map1 = new Map();
	/** @type {Map<string, number>} */
	const map2 = new Map();

	for ( const item of toArray( fromAttribute( value1 ) ) ) {
		map1.set( item, ( map1.get( item ) ?? 0 ) + 1 );
	}

	for ( const item of toArray( fromAttribute( value2 ) ) ) {
		map2.set( item, ( map2.get( item ) ?? 0 ) + 1 );
	}

	if ( map1.size !== map2.size ) {
		return true;
	}

	for ( const [ key, value ] of map1 ) {
		if ( map2.get( key ) !== value ) {
			return true;
		}
	}

	return false;
}
