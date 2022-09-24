import { css } from 'lit';

import { when } from '../../styles';
import baseButtonStyles from './base-button.styles';
import color from '../../utils/get-color-token';

function styles() {
	return [
		baseButtonStyles(),
		css`
			.-text {
				background: ${ color( 'color-white', 0 ) };
				border-color: ${ color( 'color-white', 0 ) };
				color: ${ color( 'color-primary-500' ) };
			}

			${ when.hovered( '.-text' ) } {
				background: ${ color( 'color-white', 0 ) };
				border-color: ${ color( 'color-white', 0 ) };
				color: ${ color( 'color-secondary-500' ) };
			}

			${ when.active( '.-text' ) } {
				background: ${ color( 'color-white', 0 ) };
				border-color: ${ color( 'color-white', 0 ) };
				color: ${ color( 'color-secondary-300' ) };
			}

			.-ghost {
				background: ${ color( 'color-white', 0 ) };
				border-color: ${ color( 'color-primary-500' ) };
				color: ${ color( 'color-primary-500' ) };
			}

			${ when.hovered( '.-ghost' ) } {
				background: ${ color( 'color-primary-500' ) };
				border-color: ${ color( 'color-primary-500' ) };
				color: ${ color( 'color-white' ) };
			}

			${ when.active( '.-ghost' ) } {
				background: ${ color( 'color-primary-300' ) };
				border-color: ${ color( 'color-primary-300' ) };
				color: ${ color( 'color-white' ) };
			}

			.-flat {
				background: ${ color( 'color-primary-500' ) };
				border-color: ${ color( 'color-primary-500' ) };
				color: ${ color( 'color-white' ) };
			}

			${ when.hovered( '.-flat' ) } {
				background: ${ color( 'color-secondary-500' ) };
				border-color: ${ color( 'color-secondary-500' ) };
				color: ${ color( 'color-white' ) };
			}

			${ when.active( '.-flat' ) } {
				background: ${ color( 'color-secondary-300' ) };
				border-color: ${ color( 'color-secondary-300' ) };
				color: ${ color( 'color-white' ) };
			}
		`,
	];
}

export default styles;
