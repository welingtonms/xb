export function areSetsEqual( setA, setB ) {
	if ( ! setA || ! setB ) {
		return false;
	}

	if ( setA.size !== setB.size ) {
		return false;
	}

	return [ ...setA ].every( ( value ) => setB.has( value ) );
}
