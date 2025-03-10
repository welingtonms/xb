import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import { mx } from '../../../styles/margin.styles';
import toCSSResult from '../../../utils/to-css-result';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-center-display: block;
				--xb-center-background-color: initial;
				--xb-center-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-center-border-style: none;
				--xb-center-border-width: 1px;
				--xb-center-color: unset;
				--xb-center-max-width: 80ch;
				--xb-center-padding-x: ${ toCSSResult( 'spacing-4' ) };
				--xb-center-padding-y: ${ toCSSResult( 'spacing-2' ) };

				width: 100%;

				${ mx( 'auto' ) };
				${ px( 'var(--xb-center-padding-x)' ) };
				${ py( 'var(--xb-center-padding-y)' ) };

				display: var( --xb-center-display );

				box-sizing: content-box;
				max-inline-size: var( --xb-center-max-width );

				border: var( --xb-center-border-width ) var( --xb-center-border-style )
					var( --xb-center-border-color );
				color: var( --xb-center-color );
				background-color: var( --xb-center-background-color );
			}

			::slotted( * ) {
				${ typography( 'text-md' ) };
			}
		`,
	];
}

export default styles;
