import { css, unsafeCSS } from 'lit';

import { expandableHostStyles, expandableElementStyles } from '../../controllers/expandable';
import { floatingHostStyles, floatingElementStyles } from '../floating-element';
import { menuStyles } from '../menu';
import { select } from '../../styles/selector';
import getToken from '../../utils/get-token';
import outline from '../../styles/outline.styles';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

export function topNavStyles() {
	const $ = select( ':host' );

	return [
		css`
			:host {
				--xb-top-nav-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-top-nav-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-top-nav-border-width: 1px;
				--xb-top-nav-gap: ${ toCSSResult( 'spacing-2' ) };
				--xb-top-nav-padding-x: 14px;
				--xb-top-nav-padding-y: ${ toCSSResult( 'spacing-3' ) };

				display: block;
				box-sizing: border-box;
			}

			.container {
				display: flex;
				flex-flow: row nowrap;
				align-items: stretch;
				justify-content: space-between;
				gap: var( --xb-top-nav-gap );

				block-size: 62px;

				background-color: var( --xb-top-nav-background-color );
				border: none;

				box-sizing: border-box;
				padding-inline: var( --xb-top-nav-padding-x );
				padding-block: var( --xb-top-nav-padding-y );
			}

			.logo {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: flex-start;
				flex: 1;

				padding-inline: 0;
				padding-block: 0;
			}

			.mobile-trigger {
				margin-inline-start: auto;
			}

			.nav {
				display: flex;
				flex-flow: column nowrap;
				align-items: stretch;

				gap: var( --xb-top-nav-gap );

				padding-inline: 0;
				padding-block: 0;
			}

			.actions {
				display: flex;
				flex-flow: column nowrap;
				align-items: stretch;
				justify-content: flex-end;
				gap: var( --xb-top-nav-gap );

				padding-inline: 0;
				padding-block: 0;
			}

			@media ( min-width: ${ unsafeCSS( getToken( 'breakpoint-md' ) ) } ) {
				.mobile-trigger {
					display: none;
				}

				.logo {
					flex: unset;
				}

				.nav {
					flex-flow: row wrap;
					align-items: center;
					justify-content: center;
					flex-grow: 1;
					flex-shrink: 0;

					padding-inline: 0;
					padding-block: 0;
				}

				.actions {
					flex-flow: row nowrap;
					align-items: center;
					flex-grow: 1;
					flex-shrink: 1;

					padding-inline: 0;
					padding-block: 0;
				}
			}
		`,
	];
}

export function topNavItemStyles() {
	const $ = select( ':host' );
	const itemButton = $.descendant( '.item-button' );
	const itemButtonEnabled = itemButton.not( '[aria-disabled="true"]' );

	return [
		floatingHostStyles(),
		expandableHostStyles(),
		css`
			:host {
				--xb-top-nav-item-background-color: transparent;
				--xb-top-nav-item-color: ${ toCSSResult( 'color-gray-700' ) };
				--xb-top-nav-item-gap: ${ toCSSResult( 'spacing-1' ) };
				--xb-top-nav-item-border-radius: ${ toCSSResult( 'radius-md' ) };

				display: block;
			}

			.item-container {
				display: grid;
				grid-template-columns: 1fr;

				row-gap: var( --xb-top-nav-item-gap );
				column-gap: var( --xb-top-nav-item-gap );
			}

			.item-container.has-slotted-leading {
				grid-template-columns: auto 1fr;
			}

			.item-content {
				display: flex;
				flex-direction: column;
				gap: var( --xb-top-nav-item-gap );
			}

			.item-title {
				${ typography( 'text-sm' ) };
				font-weight: ${ toCSSResult( 'font-weight-medium' ) };
				color: inherit;
			}

			.item-description {
				${ typography( 'text-xs' ) };
				color: ${ toCSSResult( 'color-gray-500' ) };
			}

			.item-button:not( .has-slotted-description ) .item-description {
				display: none;
			}

			/* .item-button: tertiary-gray button variant (consolidated) */
			${ itemButton.css() } {
				box-sizing: border-box;
				min-block-size: 36px;

				padding-block: ${ toCSSResult( 'spacing-2' ) };
				padding-inline: 14px;
				gap: ${ toCSSResult( 'spacing-3' ) };

				${ typography( 'text-sm' ) };
				font-weight: ${ toCSSResult( 'font-weight-medium' ) };
				text-decoration: none;
				text-align: left;

				display: inline-flex;
				align-items: center;
				inline-size: 100%;

				margin: 0;
				border: 1px solid ${ toCSSResult( 'color-white' ) };
				border-radius: ${ toCSSResult( 'radius-md' ) };
				background-color: ${ toCSSResult( 'color-white' ) };
				color: ${ toCSSResult( 'color-gray-600' ) };
				-webkit-tap-highlight-color: transparent;

				${ transition( [
					{ property: 'color' },
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'outline-color' },
				] ) };
				${ outline( toCSSResult( 'color-gray-100' ), '2px' ) };
				outline-color: transparent;
				cursor: pointer;
			}

			${ itemButtonEnabled.hovered.css() } {
				background-color: ${ toCSSResult( 'color-gray-50' ) };
				border-color: ${ toCSSResult( 'color-gray-50' ) };
				color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ itemButtonEnabled.focused.css() } {
				background-color: ${ toCSSResult( 'color-white' ) };
				border-color: ${ toCSSResult( 'color-white' ) };
				color: ${ toCSSResult( 'color-gray-600' ) };
				outline-color: ${ toCSSResult( 'color-gray-100' ) };
			}

			${ itemButtonEnabled.active.css() } {
				background-color: ${ toCSSResult( 'color-gray-50' ) };
				border-color: ${ toCSSResult( 'color-gray-50' ) };
				color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ itemButton.attr( '[aria-disabled="true"]' ).css() } {
				background-color: ${ toCSSResult( 'color-white' ) };
				border-color: ${ toCSSResult( 'color-white' ) };
				color: ${ toCSSResult( 'color-gray-300' ) };
				cursor: default;
				pointer-events: none;
			}
		`,
	];
}

export function topNavMenuStyles() {
	const $ = select( ':host' );

	return [
		menuStyles(),
		floatingElementStyles( {
			floatingSelector: ':host',
		} ),
		expandableElementStyles( {
			expandableSelector: ':host',
		} ),
		css`
			:host {
				--xb-menu-max-height: 80%;
				--xb-menu-gap: ${ toCSSResult( 'spacing-3' ) };
			}
		`,
	];
}
