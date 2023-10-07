import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m, { mx, my, mr, ml } from '../../../styles/margin.styles';
import token from '../../../utils/get-token';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-box-display: block;
				--xb-box-background-color: initial;
				--xb-box-border-color: ${ token( 'color-gray-300' ) };
				--xb-box-border-style: solid;
				--xb-box-border-width: 1px;
				--xb-box-color: unset;
				--xb-box-gap: ${ token( 'spacing-2' ) };
				--xb-box-padding-x: ${ token( 'spacing-4' ) };
				--xb-box-padding-y: ${ token( 'spacing-2' ) };

				${ transition( [
					{
						property: 'background-color',
					},
					{
						property: 'color',
					},
				] ) };

				${ m( token( 'spacing-0' ) ) };

				${ px( 'var(--xb-box-padding-x)' ) };
				${ py( 'var(--xb-box-padding-y)' ) };

				display: var( --xb-box-display );

				border: var( --xb-box-border-width ) var( --xb-box-border-style )
					var( --xb-box-border-color );
				color: var( --xb-box-color );
				background-color: var( --xb-box-background-color );

				height: 100%;
				box-sizing: border-box;
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				${ typography( 'body-1' ) };
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ px( token( 'spacing-0' ) ) };
				${ py( token( 'spacing-0' ) ) };
				${ mx( token( 'spacing-0' ) ) };
				${ my( token( 'spacing-0' ) ) };
			}

			slot[name='leading']::slotted( * ) {
				${ mr( 'var(--xb-box-gap)' ) };
			}

			slot[name='trailing']::slotted( * ) {
				${ ml( 'var(--xb-box-gap)' ) };
			}
		`,
	];
}

export default styles;
