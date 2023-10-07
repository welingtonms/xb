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
				--xb-grid-background-color: initial;
				--xb-grid-border-color: ${ token( 'color-gray-300' ) };
				--xb-grid-border-style: none;
				--xb-grid-border-width: 1px;
				--xb-grid-color: unset;
				--xb-grid-gap: ${ token( 'spacing-4' ) };
				--xb-grid-min-column-width: 250px;
				--xb-grid-padding-x: ${ token( 'spacing-2' ) };
				--xb-grid-padding-y: ${ token( 'spacing-2' ) };

				width: 100%;

				${ m( token( 'spacing-0' ) ) };

				${ px( 'var(--xb-grid-padding-x)' ) };
				${ py( 'var(--xb-grid-padding-y)' ) };

				display: grid;
				grid-gap: var( --xb-grid-gap );

				border: var( --xb-grid-border-width ) var( --xb-grid-border-style )
					var( --xb-grid-border-color );
				color: var( --xb-grid-color );
				background-color: var( --xb-grid-background-color );
			}

			@supports ( width: min( 250px, 100% ) ) {
				:host {
					grid-template-columns: repeat(
						auto-fit,
						minmax( min( var( --xb-grid-min-column-width ), 100% ), 1fr )
					);
				}
			}

			::slotted( * ) {
				${ typography( 'body-1' ) };
			}
		`,
	];
}

export default styles;
