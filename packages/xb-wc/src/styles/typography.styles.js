import { unsafeCSS } from 'lit';

import token from '../utils/get-token';
import rem from '../utils/rem';

/**
 *
 * @param {TypographyVariant} [variant=body-1]
 * @returns
 */
function typography( variant = 'body-1' ) {
	const defaultStyle = unsafeCSS( `
		font-family: ${ token( 'font-family-default' ) };
		font-style: normal;
		font-stretch: normal;
		letter-spacing: normal;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;

		color: ${ token( 'color-gray-700' ) };
	` );

	switch ( variant ) {
		case 'h-1':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-light' ) };
				font-size: ${ rem( '106px' ) };
				letter-spacing: -1.5px
			` );

		case 'h-2':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-light' ) };
				font-size: ${ rem( '66px' ) };
				letter-spacing: -0.5px
			` );

		case 'h-3':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '53px' ) };
				letter-spacing: 0px
			` );

		case 'h-4':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '38px' ) };
				letter-spacing: 0.25px
			` );

		case 'h-5':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '26px' ) };
				letter-spacing: 0px
			` );

		case 'h-6':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-medium' ) };
				font-size: ${ rem( '22px' ) };
				letter-spacing: 0.15px
			` );

		case 'subtitle-1':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '18px' ) };
				letter-spacing: 0.15px
			` );

		case 'subtitle-2':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-medium' ) };
				font-size: ${ rem( '15px' ) };
				letter-spacing: 0.1px
			` );

		case 'button':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '15px' ) };
				letter-spacing: 0.5px; /* 1.25px;*/
				/*text-transform: uppercase*/
			` );

		case 'caption':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '13px' ) };
				letter-spacing: 0.4px
			` );

		case 'overline':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '11px' ) };
				letter-spacing: 1.5px;
				text-transform: uppercase
			` );

		case 'body-2':
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '15px' ) };
				letter-spacing: 0.25px
			` );
		case 'body-1':
		default:
			return unsafeCSS( `
				${ defaultStyle }
				font-weight: ${ token( 'font-weight-regular' ) };
				font-size: ${ rem( '18px' ) };
				letter-spacing: 0.5px
			` );
	}
}

export default typography;

/**
 * @typedef {'h-1' | 'h-2' | 'h-3' | 'h-4' | 'h-5' | 'h-6' | 'subtitle-1' | 'subtitle-2' | 'button' | 'caption' | 'overline' | 'body-1' | 'body-2'} TypographyVariant
 */
