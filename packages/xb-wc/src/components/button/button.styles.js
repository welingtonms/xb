import { css } from 'lit';

import { when } from '../../styles';
import baseButtonStyles from './base-button.styles';
import color from '../../utils/get-color-token';

function styles() {
	return [
		baseButtonStyles(),
		css`
			.-text {
				--xb-button-background-color: ${ color( 'color-white', 0 ) };
				--xb-button-border-color: ${ color( 'color-white', 0 ) };
				--xb-button-color: ${ color( 'color-primary-500' ) };
			}

			${ when.hovered( '.-text' ) } {
				--xb-button-background-color: ${ color( 'color-white', 0 ) };
				--xb-button-border-color: ${ color( 'color-white', 0 ) };
				--xb-button-color: ${ color( 'color-secondary-500' ) };
			}

			${ when.active( '.-text' ) } {
				--xb-button-background-color: ${ color( 'color-white', 0 ) };
				--xb-button-border-color: ${ color( 'color-white', 0 ) };
				--xb-button-color: ${ color( 'color-secondary-300' ) };
			}

			.-ghost {
				--xb-button-background-color: ${ color( 'color-white', 0 ) };
				--xb-button-border-color: ${ color( 'color-primary-500' ) };
				--xb-button-color: ${ color( 'color-primary-500' ) };
			}

			${ when.hovered( '.-ghost' ) } {
				--xb-button-background-color: ${ color( 'color-primary-500' ) };
				--xb-button-border-color: ${ color( 'color-primary-500' ) };
				--xb-button-color: ${ color( 'color-white' ) };
			}

			${ when.active( '.-ghost' ) } {
				--xb-button-background-color: ${ color( 'color-primary-300' ) };
				--xb-button-border-color: ${ color( 'color-primary-300' ) };
				--xb-button-color: ${ color( 'color-white' ) };
			}

			.-flat {
				--xb-button-background-color: ${ color( 'color-primary-500' ) };
				--xb-button-border-color: ${ color( 'color-primary-500' ) };
				--xb-button-color: ${ color( 'color-white' ) };
			}

			${ when.hovered( '.-flat' ) } {
				--xb-button-background-color: ${ color( 'color-secondary-500' ) };
				--xb-button-border-color: ${ color( 'color-secondary-500' ) };
				--xb-button-color: ${ color( 'color-white' ) };
			}

			${ when.active( '.-flat' ) } {
				--xb-button-background-color: ${ color( 'color-secondary-300' ) };
				--xb-button-border-color: ${ color( 'color-secondary-300' ) };
				--xb-button-color: ${ color( 'color-white' ) };
			}
		`,
	];
}

export default styles;
