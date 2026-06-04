import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import toCSSResult from '../../../utils/to-css-result';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';
import scrollbarStyles from '../../../styles/scrollbar.styles';
function styles() {
	return [
		layoutStyles(),
		scrollbarStyles(),
		css`
			:host {
				--xb-reel-background-color: initial;
				--xb-reel-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-reel-border-style: none;
				--xb-reel-border-width: 1px;
				--xb-reel-color: unset;
				--xb-reel-margin: ${ toCSSResult( 'spacing-4' ) };
				--xb-reel-padding-x: ${ toCSSResult( 'spacing-2' ) };
				--xb-reel-padding-y: ${ toCSSResult( 'spacing-2' ) };
				--xb-reel-item-width: auto;

				--xb-scrollbar-thumb-color: ${ toCSSResult( 'color-primary-700' ) };
				--xb-scrollbar-track-color: ${ toCSSResult( 'color-primary-500' ) };

				width: 100%;

				${ m( toCSSResult( 'spacing-0' ) ) };

				display: flex;
				block-size: auto;
				overflow-x: auto;
				overflow-y: hidden;

				border: var( --xb-reel-border-width ) var( --xb-reel-border-style )
					var( --xb-reel-border-color );
				color: var( --xb-reel-color );
				background-color: var( --xb-reel-background-color );
			}

			::slotted( * ) {
				${ typography( 'text-md' ) };

				flex: 0 0 var( --xb-reel-item-width );
			}

			::slotted( img ) {
				block-size: 100%;
				flex-basis: auto;
				width: auto;
			}

			::slotted( *:not( :first-child ) ) {
				margin-inline-start: var( --xb-reel-margin );
			}

			:host( .is-overflowing ) {
				padding-block-end: var( --xb-reel-margin );
			}
		`,
	];
}

export default styles;
