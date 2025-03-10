import getToken from './get-token';

describe( 'getToken', () => {
	it( 'returns token correctly', () => {
		expect( getToken( 'color-background' ) ).toBe( '255, 252, 249' );
	} );

	it( 'returns token not found for non-existing tokens', () => {
		// @ts-ignore
		expect( getToken( 'xpto' ) ).toBeUndefined();
	} );

	it( 'resolve a semantic token correctly to a base token value', () => {
		expect( getToken( 'color-warn' ) ).toBe( '255, 194, 51' );
		expect( getToken( 'color-success' ) ).toBe( '104, 159, 56' );
		expect( getToken( 'color-danger' ) ).toBe( '244, 67, 54' );
		expect( getToken( 'color-info' ) ).toBe( '3, 155, 229' );
	} );
} );
