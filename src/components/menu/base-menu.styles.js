import { css } from 'lit';

import { select } from '../../styles/selector';
import m from '../../styles/margin.styles';
import outline from '../../styles/outline.styles';
import p from '../../styles/padding.styles';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

export function menuHostStyles() {
	const $ = select( ':host' );

	return [
		css`
			${ $.css() } {
				--xb-menu-box-shadow: rgba( 0, 0, 0, 0.07 ) 0px 1px 1px, rgba( 0, 0, 0, 0.07 ) 0px 2px 2px,
					rgba( 0, 0, 0, 0.07 ) 0px 4px 4px, rgba( 0, 0, 0, 0.07 ) 0px 8px 8px,
					rgba( 0, 0, 0, 0.07 ) 0px 16px 16px;

				--xb-menu-z-index: 999;

				--xb-menu-align: flex-start;
				--xb-menu-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-menu-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-menu-border-style: solid;
				--xb-menu-border-width: 1px;
				--xb-menu-width: 32ch;
				--xb-menu-min-width: 16ch;
				--xb-menu-max-width: initial;
				--xb-menu-max-height: 10rem;

				--xb-menu-border-top-left-radius: ${ toCSSResult( 'radius-md' ) };
				--xb-menu-border-top-right-radius: ${ toCSSResult( 'radius-md' ) };
				--xb-menu-border-bottom-right-radius: ${ toCSSResult( 'radius-md' ) };
				--xb-menu-border-bottom-left-radius: ${ toCSSResult( 'radius-md' ) };
				--xb-menu-color: unset;
				--xb-menu-gap: ${ toCSSResult( 'spacing-1' ) };
				--xb-menu-justify: flex-start;
				--xb-menu-padding-x: 6px;
				--xb-menu-padding-y: 6px;

				--xb-menu-overflow-y: auto;
				--xb-menu-outline-color: ${ toCSSResult( 'color-white', 0 ) };
			}

			/* :host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				--xb-menu-outline-color: ${ toCSSResult( 'color-primary-200', 0.2 ) };
			} */

			${ $.attr( 'bordered' ).css() } ::slotted( :not( :last-of-type ) ) {
				--xb-option-border-style: dotted;
			}

			::slotted( * ) {
				margin-block: 0;
				width: 100%;
			}
		`,
	];
}

export function menuContentStyles( selector ) {
	const $ = select( selector );

	return [
		css`
			${ $.css() } {
				${ transition( [ { property: 'box-shadow' } ] ) };

				min-width: 100%;

				margin: 0;
				padding-inline: var( --xb-menu-padding-x );
				padding-block: var( --xb-menu-padding-y );

				display: flex;
				flex-direction: column;
				justify-content: var( --xb-menu-justify );
				align-items: var( --xb-menu-align );
				gap: var( --xb-menu-gap );

				border-width: var( --xb-menu-border-width );
				border-style: var( --xb-menu-border-style );
				border-color: var( --xb-menu-border-color );
				border-top-left-radius: var( --xb-menu-border-top-left-radius );
				border-top-right-radius: var( --xb-menu-border-top-right-radius );
				border-bottom-right-radius: var( --xb-menu-border-bottom-right-radius );
				border-bottom-left-radius: var( --xb-menu-border-bottom-left-radius );

				color: var( --xb-menu-color );
				background-color: var( --xb-menu-background-color );

				inline-size: var( --xb-menu-width );
				min-inline-size: var( --xb-menu-min-width );
				max-inline-size: var( --xb-menu-max-width );

				max-height: var( --xb-menu-max-height );
				overflow-y: var( --xb-menu-overflow-y ) !important;

				box-shadow: var( --xb-menu-box-shadow );
				z-index: var( --xb-menu-z-index );

				${ outline( 'var(--xb-menu-outline-color)', 'var(--xb-menu-outline-offset)' ) };
			}

			#spinner {
				visibility: hidden;

				position: absolute;
				z-index: 1;
				top: 0;
				left: 0;
				right: 0;
			}

			:host( [loading] ) #spinner {
				visibility: visible;
			}
		`,
	];
}

function styles( selector = ':host' ) {
	const $ = select( selector );

	return [ menuHostStyles(), menuContentStyles( selector ) ];
}

export function menuItemStyles() {
	return [
		css`
			:host {
				${ transition( [
					{ property: 'color' },
					{ property: 'background-color' },
					{ property: 'outline-color' },
				] ) };
				${ typography( 'text-sm' ) };

				--xb-item-background-color: ${ toCSSResult( 'color-white', 0 ) };
				--xb-item-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-item-border-style: none;
				--xb-item-border-width: 1px;
				--xb-item-border-radius: ${ toCSSResult( 'radius-xs' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-700' ) };
				--xb-item-height: initial;
				--xb-item-outline-color: transparent;
				--xb-item-outline-offset: 0;

				cursor: pointer;
				position: relative;

				box-sizing: border-box;

				display: inline-flex;
				align-items: center;
				justify-content: flex-start;
				text-decoration: none;

				contain: layout style;

				gap: ${ toCSSResult( 'spacing-2' ) };

				padding-inline: 16px;
				padding-block: 10px;
				block-size: var( --xb-item-height );

				background-color: var( --xb-item-background-color );
				color: var( --xb-item-color );

				font-weight: ${ toCSSResult( 'font-weight-regular' ) };

				border-top: none;
				border-inline: none;
				border-bottom-width: var( --xb-item-border-width );
				border-bottom-style: var( --xb-item-border-style );
				border-bottom-color: var( --xb-item-border-color );
				border-radius: var( --xb-item-border-radius );

				z-index: 0;

				${ outline( 'var( --xb-item-outline-color )', 'var( --xb-item-outline-offset )' ) };
			}

			:host( [hidden] ) {
				display: none;
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				--xb-global-color: var( --xb-item-color );

				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( toCSSResult( 'spacing-0' ) ) };
				${ m( toCSSResult( 'spacing-0' ) ) };
			}

			:host( :hover:not( [selected], [disabled] ) ) {
				--xb-item-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( [selected] ) {
				--xb-item-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( [selected]:not( [disabled] ):hover ) {
				--xb-item-background-color: ${ toCSSResult( 'color-gray-100' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( :is( :focus-visible, .is-focused ) ) {
				--xb-item-background-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( [disabled] ) {
				pointer-events: none;
				user-select: none;
				opacity: 0.25;

				cursor: default;
			}

			:host( [disabled] ) ::slotted( * ) {
				pointer-events: none;
				user-select: none;
			}
		`,
	];
}

export default styles;
