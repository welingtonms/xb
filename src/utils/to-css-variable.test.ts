import toCSSVariable from './to-css-variable';

describe( 'toCSSVariable', () => {
	it( 'returns token correctly', () => {
		expect( toCSSVariable( 'color-background' ) ).toBe(
			'--xb-color-background'
		);
		expect( toCSSVariable( 'color-warn' ) ).toBe( '--xb-color-warn' );
		expect( toCSSVariable( 'color-success' ) ).toBe( '--xb-color-success' );
		expect( toCSSVariable( 'color-danger' ) ).toBe( '--xb-color-danger' );
		expect( toCSSVariable( 'color-info' ) ).toBe( '--xb-color-info' );
	} );

	it( 'returns token not found for non-existing tokens', () => {
		// @ts-ignore
		expect( toCSSVariable( 'xpto' ) ).toBeUndefined();
	} );
} );
