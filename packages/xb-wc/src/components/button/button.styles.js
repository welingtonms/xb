import { css, unsafeCSS } from 'lit';

import baseStyles from './base-button.styles';
import { hovered, active, focused } from '../../styles/state.styles';
import token from '../../utils/get-token';

/**
 * @param {string} [selector]
 * @returns
 */
function styles( selector = 'button' ) {
	return css`
		${ baseStyles( selector ) }

		${ unsafeCSS( selector ) }[emphasis='text'] {
			--xb-button-background-color: ${ token( 'color-white', 0 ) };
			--xb-button-border-color: ${ token( 'color-white', 0 ) };
			--xb-button-color: ${ token( 'color-primary-500' ) };
		}

		${ hovered( `${ selector }[emphasis='text']` ) } {
			--xb-button-background-color: ${ token( 'color-white', 0 ) };
			--xb-button-border-color: ${ token( 'color-white', 0 ) };
			--xb-button-color: ${ token( 'color-secondary-500' ) };
		}

		${ active( `${ selector }[emphasis='text']` ) } {
			--xb-button-background-color: ${ token( 'color-white', 0 ) };
			--xb-button-border-color: ${ token( 'color-white', 0 ) };
			--xb-button-color: ${ token( 'color-secondary-300' ) };
			--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
		}

		${ focused( `${ selector }[emphasis='text']` ) }:hover {
			--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
		}

		button[is='xb-button'][emphasis='ghost'] {
			--xb-button-background-color: ${ token( 'color-white', 0 ) };
			--xb-button-border-color: ${ token( 'color-primary-500' ) };
			--xb-button-color: ${ token( 'color-primary-500' ) };
		}

		${ hovered( `${ selector }[emphasis='ghost']` ) } {
			--xb-button-background-color: ${ token( 'color-primary-500' ) };
			--xb-button-border-color: ${ token( 'color-primary-500' ) };
			--xb-button-color: ${ token( 'color-white' ) };
		}

		${ active( `${ selector }[emphasis='ghost']` ) } {
			--xb-button-background-color: ${ token( 'color-primary-300' ) };
			--xb-button-border-color: ${ token( 'color-primary-300' ) };
			--xb-button-color: ${ token( 'color-white' ) };
		}

		${ focused( `${ selector }[emphasis='ghost']` ) }:hover {
			--xb-button-outline-color: ${ token( 'color-primary-500', 0.2 ) };
		}

		${ unsafeCSS( selector ) }[emphasis='flat'] {
			--xb-button-background-color: ${ token( 'color-primary-500' ) };
			--xb-button-border-color: ${ token( 'color-primary-500' ) };
			--xb-button-color: ${ token( 'color-white' ) };
		}

		${ hovered( `${ selector }[emphasis='flat']` ) } {
			--xb-button-background-color: ${ token( 'color-secondary-500' ) };
			--xb-button-border-color: ${ token( 'color-secondary-500' ) };
			--xb-button-color: ${ token( 'color-white' ) };
		}

		${ active( `${ selector }[emphasis='flat']` ) } {
			--xb-button-background-color: ${ token( 'color-secondary-300' ) };
			--xb-button-border-color: ${ token( 'color-secondary-300' ) };
			--xb-button-color: ${ token( 'color-white' ) };
			--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
		}

		${ focused( `${ selector }[emphasis='flat']` ) }:hover {
			--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
		}

		${ unsafeCSS( selector ) } a {
			position: absolute;
			inset: 0;
		}
	`;
}

export default styles;
