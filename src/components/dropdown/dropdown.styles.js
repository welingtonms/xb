import { css } from 'lit';

import { baseButtonHostStyles, baseButtonStyles } from '../button';
import { floatingHostStyles, floatingElementStyles } from '../floating-element';
import { expandableHostStyles, expandableElementStyles } from '../../controllers/expandable';
import { menuStyles as baseMenuStyles } from '../menu';
import { select } from '../../styles/selector';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';

export function dropdownStyles() {
	const $ = select( ':host' );

	return [
		floatingHostStyles(),
		expandableHostStyles(),
		css`
			${ $.css() } {
				--xb-dropdown-outline-color: transparent;
				--xb-dropdown-outline-offset: 0;

				--xb-floating-width: max-content;
				--xb-floating-min-width: 16ch;

				display: inline-flex;

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
		floatingElementStyles( {
			floatingSelector: ':host',
		} ),
		expandableElementStyles( {
			expandableSelector: ':host',
		} ),
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

			${ $.attr( '[scale="sm"]' ).css() } {
				--xb-button-height: 36px;

				--xb-button-padding-x: 14px;
				--xb-button-padding-y: 8px;
			}

			${ $.attr( '[scale="md"]' ).css() },
			${ $.not( '[scale]' ).css() } {
				--xb-button-height: 40px;

				--xb-button-padding-x: 16px;
				--xb-button-padding-y: 10px;
			}

			${ $.attr( '[scale="lg"]' ).css() } {
				--xb-button-height: 44px;

				--xb-button-padding-x: 18px;
				--xb-button-padding-y: 10px;
			}

			${ $.attr( '[scale="xl"]' ).css() } {
				--xb-button-height: 48px;

				--xb-button-padding-x: 20px;
				--xb-button-padding-y: 12px;
			}

			${ $.attr( '[scale="2xl"]' ).css() } {
				--xb-button-height: 60px;

				--xb-button-padding-x: 28px;
				--xb-button-padding-y: 16px;
			}

			${ $.enabled.hovered.css() },
			${ $.attr( '[aria-expanded="true"]' ).css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-800' ) };
			}

			${ $.enabled.focused.css() } {
				--xb-button-outline-color: ${ toCSSResult( 'color-primary-100' ) };
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
