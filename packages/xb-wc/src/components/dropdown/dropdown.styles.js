import { css } from 'lit';

import { floatingStyles } from '../../common/floating-element';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import baseMenuStyles from '../menu/base-menu.styles';

export function dropdownStyles() {
	return [
		floatingStyles( {
			floating: '::slotted([role="menu"])',
		} ),
		css`
			:host {
				--xb-floating-width: max-content;
				--xb-floating-min-width: 16ch;
			}
		`,
	];
}

export function menuStyles() {
	return [ baseMenuStyles() ];
}

export function triggerStyles() {
	return [
		css`
			:host {
				--xb-button-padding-x: ${ token( 'spacing-4' ) };
				--xb-button-background-color: ${ token( 'color-primary-500' ) };
				--xb-button-border-color: ${ token( 'color-primary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			:host( :hover ),
			:host( [aria-expanded='true'] ) {
				--xb-button-background-color: ${ token( 'color-secondary-500' ) };
				--xb-button-border-color: ${ token( 'color-secondary-500' ) };
				--xb-button-color: ${ token( 'color-white' ) };
			}

			:host( :is( :active, .is-active ) ) {
				--xb-button-background-color: ${ token( 'color-secondary-300' ) };
				--xb-button-border-color: ${ token( 'color-secondary-300' ) };
				--xb-button-color: ${ token( 'color-white' ) };
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			:host( :is( :focus, :focus-within, :focus-visible, .is-focused ):hover ) {
				--xb-button-outline-color: ${ token( 'color-secondary-500', 0.2 ) };
			}

			.indicator {
				${ transition( [
					{
						property: 'transform',
					},
				] ) };
			}

			:host( [aria-expanded='true'] ) .indicator {
				transform: rotate( 180deg );
			}
		`,
	];
}
