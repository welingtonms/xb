import { css } from 'lit';

import { m, mx, px, py, typography } from '../../../styles';
import color from '../../../utils/get-color-token';
import layoutStyles from '../layout.styles';
import token from '../../../utils/get-token';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-center-background-color: initial;
				--xb-center-border-color: ${ color( 'color-gray-300' ) };
				--xb-center-border-style: none;
				--xb-center-border-width: 1px;
				--xb-center-color: unset;
				--xb-center-max-width: 80ch;
				--xb-center-padding-x: ${ token( 'spacing-4' ) };
				--xb-center-padding-y: ${ token( 'spacing-2' ) };

				width: 100%;
			}

			.center {
				${ mx( 'auto' ) };
				${ px( 'var(--xb-center-padding-x)' ) };
				${ py( 'var(--xb-center-padding-y)' ) };

				box-sizing: content-box;
				max-inline-size: var( --xb-center-max-width );

				border: var( --xb-center-border-width ) var( --xb-center-border-style )
					var( --xb-center-border-color );
				color: var( --xb-center-color );
				background-color: var( --xb-center-background-color );
			}

			::slotted( * ) {
				${ typography( 'body-1' ) };
			}
		`,
	];
}

export default styles;
