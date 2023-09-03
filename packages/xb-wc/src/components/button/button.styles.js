import { css } from 'lit';

import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host( [emphasis='text'] ) {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-primary-500' ) };
			}

			:host( [emphasis='text']:hover ) {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-500' ) };
			}

			:host( [emphasis='text']:is( :active, .is-active ) ) {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-secondary-300' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			:host( [emphasis='text']:is( :focus, :focus-within, :focus-visible, .is-focused ):hover ) {
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			:host( [emphasis='ghost'] ) {
				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-primary-500' ) };
			}

			:host( [emphasis='ghost']:hover ) {
				--xb-button-background-color: ${ token( 'color-primary-500' ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			:host( [emphasis='ghost']:is( :active, .is-active ) ) {
				--xb-button-background-color: ${ token( 'color-primary-300' ) };
				--xb-button-border-color: ${ token( 'color-primary-300' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			:host( [emphasis='ghost']:is( :focus, :focus-within, :focus-visible, .is-focused ):hover ) {
				--xb-button-outline-color: ${ token( 'color-primary-500', 0.2 ) };
			}

			:host( [emphasis='flat'] ) {
				--xb-button-background-color: ${ token( 'color-primary-500' ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			:host( [emphasis='flat']:hover ) {
				--xb-button-background-color: ${ token( 'color-secondary-500' ) };
				--xb-button-border-color: ${ token( 'color-secondary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			:host( [emphasis='flat']:is( :active, .is-active ) ) {
				--xb-button-background-color: ${ token( 'color-secondary-300' ) };
				--xb-button-border-color: ${ token( 'color-secondary-300' ) };
				--xb-button-color: ${ token( 'color-white' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			:host( [emphasis='flat']:is( :focus, :focus-within, :focus-visible, .is-focused ):hover ) {
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			:host a {
				position: absolute;
				inset: 0;
			}
		`,
	];
}

export default styles;
