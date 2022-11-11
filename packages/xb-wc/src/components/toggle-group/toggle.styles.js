import { css } from 'lit';

import { when } from '../../styles';
import baseButtonStyles from '../button/base-button.styles';
import color from '../../utils/get-color-token';
import token from '../../utils/get-token';

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
				background-color: ${ color( 'color-secondary-600' ) };
				height: 60%;
				left: 0px;
				position: absolute;
			} */

			[aria-checked='false'] {
				--xb-button-background-color: ${ color( 'color-white', 0 ) };
				--xb-button-border-color: ${ color( 'color-white', 0 ) };
				--xb-button-color: ${ color( 'color-primary-500' ) };
			}

			${ when.hovered( '[aria-checked="false"]' ) } {
				--xb-button-background-color: ${ color( 'color-white', 0 ) };
				--xb-button-border-color: ${ color( 'color-white', 0 ) };
				--xb-button-color: ${ color( 'color-secondary-500' ) };
			}

			${ when.active( '[aria-checked="false"]' ) } {
				--xb-button-background-color: ${ color( 'color-white', 0 ) };
				--xb-button-border-color: ${ color( 'color-white', 0 ) };
				--xb-button-color: ${ color( 'color-secondary-300' ) };
			}

			[aria-checked='true'] {
				--xb-button-background-color: ${ color( 'color-primary-500' ) };
				--xb-button-border-color: ${ color( 'color-primary-500' ) };
				--xb-button-color: ${ color( 'color-white' ) };
			}

			${ when.hovered( '[aria-checked="true"]' ) } {
				--xb-button-background-color: ${ color( 'color-secondary-500' ) };
				--xb-button-border-color: ${ color( 'color-secondary-500' ) };
				--xb-button-color: ${ color( 'color-white' ) };
			}

			${ when.active( '[aria-checked="true"]' ) } {
				--xb-button-background-color: ${ color( 'color-secondary-300' ) };
				--xb-button-border-color: ${ color( 'color-secondary-300' ) };
				--xb-button-color: ${ color( 'color-white' ) };
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
