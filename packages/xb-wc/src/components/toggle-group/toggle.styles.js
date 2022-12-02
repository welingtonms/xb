import { css } from 'lit';

import { active, hovered } from '../../styles/state.styles';
import token from '../../utils/get-token';
import baseButtonStyles from '../button/base-button.styles';

function styles() {
	return [
		baseButtonStyles(),
		css`
			.toggle {
				/* Placeholder */
			}

			/* .toggle[role='radio']:before {
				content: '';
				width: 1px;
				background-color: ${ token( 'color-secondary-600' ) };
				height: 60%;
				left: 0px;
				position: absolute;
			} */

			.toggle[aria-checked='false'] {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-primary-500' ) };
			}

			${ hovered( '.toggle[aria-checked="false"]' ) } {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-500' ) };
			}

			${ active( '.toggle[aria-checked="false"]' ) } {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-300' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			.toggle[aria-checked='true'] {
				--xb-button-background-color: ${ token( 'color-primary-500' ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			${ hovered( '.toggle[aria-checked="true"]' ) } {
				--xb-button-background-color: ${ token( 'color-secondary-500' ) };
				--xb-button-border-color: ${ token( 'color-secondary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			${ active( '.toggle[aria-checked="true"]' ) } {
				--xb-button-background-color: ${ token( 'color-secondary-300' ) };
				--xb-button-border-color: ${ token( 'color-secondary-300' ) };
				--xb-button-color: ${ token( 'color-white' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}
		`,
		css`
			.-small {
				height: 34px;
				min-width: 34px;
			}

			.-medium {
				height: 50px;
				min-width: 50px;
			}

			.-large {
				height: 66px;
				min-width: 66px;
			}
		`,
	];
}

export default styles;
