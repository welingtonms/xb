import toCSSValue from './to-css-value';

describe( 'toCSSValue', () => {
	it( 'returns a CSS value for a color token', () => {
		expect( toCSSValue( 'spacing-4' ) ).toBe( 'var(--xb-spacing-4, 16px)' );
	} );

	it( 'returns a CSS value for a non-color token', () => {
		expect( toCSSValue( 'color-background' ) ).toBe(
			'rgba(var(--xb-color-background, 255, 252, 249), 1)'
		);
		expect( toCSSValue( 'color-background', 0.5 ) ).toBe(
			'rgba(var(--xb-color-background, 255, 252, 249), 0.5)'
		);
	} );
} );
