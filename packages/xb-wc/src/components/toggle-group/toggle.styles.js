import { css } from 'lit';

import { active, hovered } from '../../styles/state.styles';
import token from '../../utils/get-token';
import baseButtonStyles from '../button/base-button.styles';

function styles() {
	return [
		baseButtonStyles(),
		css`
			/* .toggle[role='radio']:before {
				content: '';
				width: 1px;
				background-color: ${ token( 'color-secondary-600' ) };
				height: 60%;
				left: 0px;
				position: absolute;
			} */

			:host {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-primary-500' ) };
			}

			:host( :hover ) {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-500' ) };
			}

			:host( :active ) {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-300' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			:host( [aria-checked='true'] ) {
				--xb-button-background-color: ${ token( 'color-primary-500' ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			:host( [aria-checked='true']:hover ) {
				--xb-button-background-color: ${ token( 'color-secondary-500' ) };
				--xb-button-border-color: ${ token( 'color-secondary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			:host( [aria-checked='true']:active ) {
				--xb-button-background-color: ${ token( 'color-secondary-300' ) };
				--xb-button-border-color: ${ token( 'color-secondary-300' ) };
				--xb-button-color: ${ token( 'color-white' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			:host-context( [size='extra-small'] ) {
				--xb-button-height: 34px;
				min-width: 34px;
			}

			:host-context( [size='small'] ) {
				--xb-button-height: 50px;
				min-width: 50px;
			}

			:host-context( [size='medium'] ) {
				--xb-button-height: 56px;
				min-width: 56px;
			}

			:host-context( [size='large'] ) {
				--xb-button-height: 66px;
				min-width: 66px;
			}
		`,
	];
}

export default styles;
