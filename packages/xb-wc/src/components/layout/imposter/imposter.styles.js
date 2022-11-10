import { css } from 'lit';

import { m, mx, px, py, typography } from '../../../styles';
import color from '../../../utils/get-color-token';
import layoutStyles from '../../../styles/layout.styles';
import token from '../../../utils/get-token';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-imposter-background-color: initial;
				--xb-imposter-border-color: ${ color( 'color-gray-300' ) };
				--xb-imposter-border-style: none;
				--xb-imposter-border-width: 1px;
				--xb-imposter-color: unset;
				--xb-imposter-padding-x: ${ token( 'spacing-2' ) };
				--xb-imposter-padding-y: ${ token( 'spacing-2' ) };
				--xb-imposter-margin: ${ token( 'spacing-2' ) };

				width: 100%;

				${ m( token( 'spacing-0' ) ) };
			}

			.imposter {
				${ px( 'var(--xb-imposter-padding-x)' ) };
				${ py( 'var(--xb-imposter-padding-y)' ) };

				position: absolute;
				inset-block-start: 50%;
				inset-inline-start: 50%;
				transform: translate( -50%, -50% );

				border: var( --xb-imposter-border-width )
					var( --xb-imposter-border-style ) var( --xb-imposter-border-color );
				color: var( --xb-imposter-color );
				background-color: var( --xb-imposter-background-color );
			}

			.xb-imposter.-fixed {
				position: fixed;
			}

			.xb-imposter.-breakout {
				overflow: auto;
				max-inline-size: calc( 100% - ( var( --xb-imposter-margin ) * 2 ) );
				max-block-size: calc( 100% - ( var( --xb-imposter-margin ) * 2 ) );
			}

			::slotted( * ) {
				${ typography( 'body-1' ) };
			}
		`,
	];
}

export default styles;
