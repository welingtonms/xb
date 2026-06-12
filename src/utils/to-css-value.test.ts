import toCSSValue from './to-css-value';

describe( 'toCSSValue', () => {
	it( 'returns a CSS value for a non-color token', () => {
		expect( toCSSValue( 'spacing-4' ) ).toBe( 'var(--xb-spacing-4, 16px)' );
	} );

	it( 'returns a CSS value for a color token', () => {
		expect( toCSSValue( 'color-white' ) ).toBe(
			'rgba(var(--xb-color-white, 255, 255, 255), 1)'
		);
		expect( toCSSValue( 'color-white', 0.5 ) ).toBe(
			'rgba(var(--xb-color-white, 255, 255, 255), 0.5)'
		);
	} );
} );
