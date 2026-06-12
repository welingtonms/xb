import getToken from './get-token';

describe( 'getToken', () => {
	it( 'returns token correctly', () => {
		expect( getToken( 'color-white' ) ).toBe( '255, 255, 255' );
	} );

	it( 'returns token not found for non-existing tokens', () => {
		// @ts-ignore
		expect( getToken( 'xpto' ) ).toBeUndefined();
	} );

	it( 'resolve a semantic token correctly to a base token value', () => {
		expect( getToken( 'color-primary-500' ) ).toBe( '158, 119, 237' );
		expect( getToken( 'color-success-500' ) ).toBe( '18, 183, 106' );
		expect( getToken( 'color-error-500' ) ).toBe( '240, 68, 56' );
		expect( getToken( 'color-warning-500' ) ).toBe( '247, 144, 9' );
	} );
} );
