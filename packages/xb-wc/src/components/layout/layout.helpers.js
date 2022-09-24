function trim( value ) {
	return String( value ).trim();
}

export function converterDirectionFromAttribute( value ) {
	if ( value === '' ) {
		return true;
	}

	if ( value === 'none' ) {
		return false;
	}

	if ( ! String( value ).includes( ',' ) ) {
		return value;
	}

	return String( value ).split( ',' ).map( trim );
}
