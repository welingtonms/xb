import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import toCSSResult from '../../../utils/to-css-result';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-imposter-display: block;
				--xb-imposter-background-color: initial;
				--xb-imposter-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-imposter-border-style: none;
				--xb-imposter-border-width: 1px;
				--xb-imposter-color: unset;
				--xb-imposter-padding-x: ${ toCSSResult( 'spacing-2' ) };
				--xb-imposter-padding-y: ${ toCSSResult( 'spacing-2' ) };
				--xb-imposter-margin: ${ toCSSResult( 'spacing-2' ) };

				width: 100%;

				${ m( toCSSResult( 'spacing-0' ) ) };

				${ px( 'var(--xb-imposter-padding-x)' ) };
				${ py( 'var(--xb-imposter-padding-y)' ) };

				display: var( --xb-imposter-display );
				inset-block-start: 50%;
				inset-inline-start: 50%;
				transform: translate( -50%, -50% );

				border: var( --xb-imposter-border-width ) var( --xb-imposter-border-style )
					var( --xb-imposter-border-color );
				color: var( --xb-imposter-color );
				background-color: var( --xb-imposter-background-color );
			}

			:host( [variant='absolute'] ) {
				position: absolute;
			}

			:host( [variant='fixed'] ) {
				position: fixed;
			}

			:host( [breakout] ) {
				overflow: auto;
				max-inline-size: calc( 100% - ( var( --xb-imposter-margin ) * 2 ) );
				max-block-size: calc( 100% - ( var( --xb-imposter-margin ) * 2 ) );
			}

			::slotted( * ) {
				${ typography( 'text-md' ) };
			}
		`,
	];
}

export default styles;
