import { unsafeCSS } from 'lit';

import toCSSResult from '../utils/to-css-result';
import rem from '../utils/rem';

/**
 *
 * @param {TypographyVariant} [variant=body-1]
 * @returns
 */
function typography( variant = 'text-md' ) {
	/**
	 * Prefer unitless numbers for line-height: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#prefer_unitless_numbers_for_line-height_values
	 */
	const defaultStyle = unsafeCSS( `
		font-family: ${ toCSSResult( 'font-family-default' ) };
		font-style: normal;
		font-stretch: normal;
		letter-spacing: normal;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
	` );

	switch ( variant ) {
		case 'h-1':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '72px' ) };
				line-height: ${ rem( '90px' ) };
				letter-spacing: -2%
			` );

		case 'h-2':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '60px' ) };
				line-height: ${ rem( '72px' ) };
				letter-spacing: -2%
			` );

		case 'h-3':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '48px' ) };
				line-height: ${ rem( '60px' ) };
				letter-spacing: -2%
			` );

		case 'h-4':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '36px' ) };
				line-height: ${ rem( '44px' ) };
				letter-spacing: -2%
			` );

		case 'h-5':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '30px' ) };
				line-height: ${ rem( '38px' ) };
				letter-spacing: -2%
			` );

		case 'h-6':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '24px' ) };
				line-height: ${ rem( '32px' ) };
				letter-spacing: -2%
			` );

		case 'text-xl':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '20px' ) };
				line-height: ${ rem( '30px' ) };
			` );

		case 'text-lg':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '18px' ) };
				line-height: ${ rem( '28px' ) };
			` );

		case 'text-md':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '16px' ) };
				line-height: ${ rem( '24px' ) };
			` );

		case 'text-sm':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '14px' ) };
				line-height: ${ rem( '20px' ) };
			` );

		case 'text-xs':
			return unsafeCSS( `
				${ defaultStyle }
				font-size: ${ rem( '12px' ) };
				line-height: ${ rem( '18px' ) };
			` );
	}
}

export default typography;

/**
 * @typedef {'h-1' | 'h-2' | 'h-3' | 'h-4' | 'h-5' | 'h-6' | 'text-xl' | 'text-lg' | 'text-md' | 'text-sm' | 'text-xs'} TypographyVariant
 */
