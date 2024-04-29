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

	return toArray( value ).join( ',' );
}
