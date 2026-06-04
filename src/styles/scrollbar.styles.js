import { css, unsafeCSS } from 'lit';

import toCSSResult from '../utils/to-css-result';

export default function scrollbarStyles( selector = ':host' ) {
	return [
		css`
			:host {
				--xb-scrollbar-thumb-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-scrollbar-track-color: ${ toCSSResult( 'color-gray-50' ) };

				scrollbar-color: var( --xb-scrollbar-thumb-color ) var( --xb-scrollbar-track-color );
			}

			${ unsafeCSS( selector ) }::-webkit-scrollbar {
				block-size: ${ toCSSResult( 'spacing-4' ) };
			}

			${ unsafeCSS( selector ) }::-webkit-scrollbar-track {
				background-color: var( --xb-scrollbar-track-color );
			}

			${ unsafeCSS( selector ) }::-webkit-scrollbar-thumb {
				background-color: var( --xb-scrollbar-track-color );
				background-image: linear-gradient(
					var( --xb-scrollbar-track-color ) 0,
					var( --xb-scrollbar-track-color ) 0.25rem,
					#fff 0.25rem,
					#fff 0.75rem,
					var( --xb-scrollbar-track-color ) 0.75rem
				);
			}
		`,
	];
}
