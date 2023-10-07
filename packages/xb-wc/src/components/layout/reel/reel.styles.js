import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import token from '../../../utils/get-token';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-reel-background-color: initial;
				--xb-reel-border-color: ${ token( 'color-gray-300' ) };
				--xb-reel-border-style: none;
				--xb-reel-border-width: 1px;
				--xb-reel-color: unset;
				--xb-reel-margin: var( --xb-spacing-4 );
				--xb-reel-padding-x: ${ token( 'spacing-2' ) };
				--xb-reel-padding-y: ${ token( 'spacing-2' ) };
				--xb-reel-thumb-color: rgb( var( --xb-color-primary-700 ) );
				--xb-reel-track-color: rgb( var( --xb-color-primary-500 ) );

				width: 100%;

				${ m( token( 'spacing-0' ) ) };

				${ px( 'var(--xb-reel-padding-x)' ) };
				${ py( 'var(--xb-reel-padding-y)' ) };

				display: flex;
				block-size: auto;
				overflow-x: auto;
				overflow-y: hidden;
				scrollbar-color: var( --xb-reel-thumb-color ) var( --xb-reel-track-color );

				border: var( --xb-reel-border-width ) var( --xb-reel-border-style )
					var( --xb-reel-border-color );
				color: var( --xb-reel-color );
				background-color: var( --xb-reel-background-color );
			}

			:host::-webkit-scrollbar {
				block-size: var( --xb-spacing-4 );
			}

			:host::-webkit-scrollbar-track {
				background-color: var( --xb-reel-track-color );
			}

			:host::-webkit-scrollbar-thumb {
				background-color: var( --xb-reel-track-color );
				background-image: linear-gradient(
					var( --xb-reel-track-color ) 0,
					var( --xb-reel-track-color ) 0.25rem,
					#fff 0.25rem,
					#fff 0.75rem,
					var( --xb-reel-track-color ) 0.75rem
				);
			}

			::slotted( * ) {
				${ typography( 'body-1' ) };

				flex: 0 0 auto;
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
