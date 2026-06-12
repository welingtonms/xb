import toCSSVariable from './to-css-variable';

describe( 'toCSSVariable', () => {
	it( 'returns token correctly', () => {
		expect( toCSSVariable( 'color-white' ) ).toBe( '--xb-color-white' );
		expect( toCSSVariable( 'color-warning-500' ) ).toBe(
			'--xb-color-warning-500'
		);
		expect( toCSSVariable( 'color-success-500' ) ).toBe(
			'--xb-color-success-500'
		);
		expect( toCSSVariable( 'color-error-500' ) ).toBe( '--xb-color-error-500' );
		expect( toCSSVariable( 'color-primary-500' ) ).toBe(
			'--xb-color-primary-500'
		);
	} );

	it( 'returns token not found for non-existing tokens', () => {
		// @ts-ignore
		expect( toCSSVariable( 'xpto' ) ).toBeUndefined();
	} );
} );
