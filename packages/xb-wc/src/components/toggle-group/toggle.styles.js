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

			[aria-checked='false'] {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-primary-500' ) };
			}

			${ hovered( '[aria-checked="false"]' ) } {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-500' ) };
			}

			${ active( '[aria-checked="false"]' ) } {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-300' ) };
			}

			[aria-checked='true'] {
				--xb-button-background-color: ${ token( 'color-primary-500' ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			${ hovered( '[aria-checked="true"]' ) } {
				--xb-button-background-color: ${ token( 'color-secondary-500' ) };
				--xb-button-border-color: ${ token( 'color-secondary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			${ active( '[aria-checked="true"]' ) } {
				--xb-button-background-color: ${ token( 'color-secondary-300' ) };
				--xb-button-border-color: ${ token( 'color-secondary-300' ) };
				--xb-button-color: ${ token( 'color-white' ) };
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
