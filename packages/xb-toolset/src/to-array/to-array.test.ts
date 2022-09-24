import toArray from './to-array';

describe( 'toArray', () => {
	it( 'returns an array empty when value is null', () => {
		expect( toArray( null ) ).toEqual( [] );
	} );

	it( 'returns an array empty when value is undefined', () => {
		expect( toArray( undefined ) ).toEqual( [] );
	} );

	it( 'returns array when value is of primitive type', () => {
		expect( toArray( 1 ) ).toEqual( [ 1 ] );
		expect( toArray( '1' ) ).toEqual( [ '1' ] );
	} );

	it( 'returns array when value is object', () => {
		expect( toArray( { a: 1 } ) ).toEqual( [ { a: 1 } ] );
	} );

	it( 'returns array when value is array', () => {
		expect( toArray( [ 1 ] ) ).toEqual( [ 1 ] );
		expect( toArray( [ '1' ] ) ).toEqual( [ '1' ] );
		expect( toArray( [ { a: 1 } ] ) ).toEqual( [ { a: 1 } ] );
	} );
} );
