import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import token from '../../../utils/get-token';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-frame-background-color: initial;
				--xb-frame-border-color: ${ token( 'color-gray-300' ) };
				--xb-frame-border-style: none;
				--xb-frame-border-width: 1px;
				--xb-frame-color: unset;
				--xb-frame-padding-x: ${ token( 'spacing-2' ) };
				--xb-frame-padding-y: ${ token( 'spacing-2' ) };
				--xb-frame-ratio-height: 9;
				--xb-frame-ratio-width: 16;

				width: 100%;

				${ m( token( 'spacing-0' ) ) };

				${ px( 'var(--xb-frame-padding-x)' ) };
				${ py( 'var(--xb-frame-padding-y)' ) };

				display: flex;
				justify-content: center;
				align-items: center;

				border: var( --xb-frame-border-width ) var( --xb-frame-border-style )
					var( --xb-frame-border-color );
				color: var( --xb-frame-color );
				background-color: var( --xb-frame-background-color );

				aspect-ratio: var( --xb-frame-ratio-width ) / var( --xb-frame-ratio-height );
				overflow: hidden;
			}

			::slotted( img ),
			::slotted( video ) {
				inline-size: 100%;
				block-size: 100%;
				object-fit: cover;
			}
		`,
	];
}

export default styles;
