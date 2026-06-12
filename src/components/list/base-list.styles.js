import { css } from 'lit';

import { select } from '../../styles/selector';
import outline from '../../styles/outline.styles';
import toCSSResult from '../../utils/to-css-result';
import typography from '../../styles/typography.styles';

export function listHostStyles() {
	const $ = select( ':host' );

	return [
		css`
			${ $.css() } {
				--xb-list-align: stretch;
				--xb-list-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-list-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-list-border-radius: ${ toCSSResult( 'radius-md' ) };
				--xb-list-border-style: solid;
				--xb-list-border-width: 1px;
				--xb-list-color: unset;
				--xb-list-gap: ${ toCSSResult( 'spacing-1' ) };
				--xb-list-max-height: 16rem;
				--xb-list-outline-color: ${ toCSSResult( 'color-white', 0 ) };
				--xb-list-padding-x: 6px;
				--xb-list-padding-y: 6px;
				--xb-list-width: 32ch;

				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: var( --xb-list-align );
				gap: var( --xb-list-gap );
				inline-size: var( --xb-list-width );
				max-block-size: var( --xb-list-max-height );
				overflow-y: auto;
				padding-inline: var( --xb-list-padding-x );
				padding-block: var( --xb-list-padding-y );
				background-color: var( --xb-list-background-color );
				color: var( --xb-list-color );
				border-width: var( --xb-list-border-width );
				border-style: var( --xb-list-border-style );
				border-color: var( --xb-list-border-color );
				border-radius: var( --xb-list-border-radius );

				${ outline( 'var(--xb-list-outline-color)' ) };
			}

			::slotted( * ) {
				margin-block: 0;
				inline-size: 100%;
			}
		`,
	];
}

export function listItemStyles() {
	return [
		css`
			:host {
				${ typography( 'text-sm' ) };

				--xb-list-item-background-color: ${ toCSSResult( 'color-white', 0 ) };
				--xb-list-item-border-radius: ${ toCSSResult( 'radius-xs' ) };
				--xb-list-item-color: ${ toCSSResult( 'color-gray-700' ) };

				box-sizing: border-box;
				cursor: pointer;
				display: inline-flex;
				align-items: center;
				justify-content: flex-start;
				gap: ${ toCSSResult( 'spacing-2' ) };
				padding-inline: 16px;
				padding-block: 10px;
				background-color: var( --xb-list-item-background-color );
				color: var( --xb-list-item-color );
				border-radius: var( --xb-list-item-border-radius );
			}

			:host( [hidden] ) {
				display: none;
			}

			:host( :hover:not( [selected], [disabled] ) ) {
				--xb-list-item-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-list-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( [selected] ) {
				--xb-list-item-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-list-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( :is( :focus-visible, .is-focused ) ) {
				--xb-list-item-background-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-list-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( [disabled] ) {
				cursor: default;
				opacity: 0.25;
				pointer-events: none;
				user-select: none;
			}
		`,
	];
}

export default function styles() {
	return [ listHostStyles() ];
}
