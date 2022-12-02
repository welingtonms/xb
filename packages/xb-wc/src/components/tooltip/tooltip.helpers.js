function trim( value ) {
	return String( value ).trim();
}

export function convertTriggerFromAttribute( value ) {
	if ( ! value ) {
		return [ 'hover' ];
	}

	return String( value ).split( ' ' ).map( trim );
}
