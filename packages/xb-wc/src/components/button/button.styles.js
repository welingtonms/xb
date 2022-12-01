import { css } from 'lit';

import { active, hovered, enabled } from '../../styles/state.styles';
import token from '../../utils/get-token';

import baseButtonStyles from './base-button.styles';

function styles() {
	return [
		baseButtonStyles(),
		css`
			.-text {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-primary-500' ) };
			}

			${ hovered( '.-text' ) } {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-500' ) };
			}

			${ active( '.-text' ) } {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-300' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			${ enabled( '.-text' ) }:focus:hover {
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			.-ghost {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-primary-500' ) };
			}

			${ hovered( '.-ghost' ) } {
				--xb-button-background-color: ${ token( 'color-primary-500' ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			${ active( '.-ghost' ) } {
				--xb-button-background-color: ${ token( 'color-primary-300' ) };
				--xb-button-border-color: ${ token( 'color-primary-300' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			${ enabled( '.-ghost' ) }:focus:hover {
				--xb-button-outline-color: ${ token( 'color-primary-500', 0.2 ) };
			}

			.-flat {
				--xb-button-background-color: ${ token( 'color-primary-500' ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			${ hovered( '.-flat' ) } {
				--xb-button-background-color: ${ token( 'color-secondary-500' ) };
				--xb-button-border-color: ${ token( 'color-secondary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			${ active( '.-flat' ) } {
				--xb-button-background-color: ${ token( 'color-secondary-300' ) };
				--xb-button-border-color: ${ token( 'color-secondary-300' ) };
				--xb-button-color: ${ token( 'color-white' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			${ enabled( '.-flat' ) }:focus:hover {
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}
		`,
	];
}

export default styles;
