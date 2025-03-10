import { css } from 'lit';

import { baseButtonHostStyles, baseButtonStyles } from '../button';
import { floatingStyles } from '../floating-element';
import { menuStyles as baseMenuStyles } from '../menu';
import { select } from '../../styles/selector';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';

export function dropdownStyles() {
	const $ = select( ':host' );

	return [
		floatingStyles( {
			floating: '::slotted([role="menu"])',
		} ),
		css`
			${ $.css() } {
				--xb-dropdown-outline-color: transparent;
				--xb-dropdown-outline-offset: 0;

				--xb-floating-width: max-content;
				--xb-floating-min-width: 16ch;

				display: inline-flex;
				contain: layout style;
				box-sizing: border-box;
				align-items: center;
			}

			${ $.enabled.focused.css() } {
				--xb-dropdown-outline-color: ${ toCSSResult( 'color-gray-100' ) };
			}
		`,
	];
}

export function menuStyles() {
	return [
		baseMenuStyles(),
		css`
			:host {
				--xb-menu-max-height: 20rem;
				--xb-menu-max-width: 20ch;
			}
		`,
	];
}

export function triggerStyles() {
	const $ = select( ':host' );

	return [
		baseButtonHostStyles(),
		baseButtonStyles( ':host' ),
		css`
			${ $.css() } {
				--xb-button-padding-x: 16px;
				--xb-button-padding-y: 10px;
				--xb-button-gap: 8px;
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ $.enabled.hovered.css() },
			${ $.attr( '[aria-expanded="true"]' ).css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-800' ) };
			}

			${ $.enabled.focused.css() } {
				--xb-button-outline-color: ${ toCSSResult( 'color-gray-100' ) };
			}

			${ $.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-300' ) };
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
