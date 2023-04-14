function trim( value ) {
	return String( value ).trim();
}

export function convertTriggerFromAttribute( value ) {
	if ( ! value ) {
		return [ 'hover' ];
	}

	return String( value )
		.split( /[\s,]+/ )
		.map( trim )
		.filter( Boolean );
}
