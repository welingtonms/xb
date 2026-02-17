import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m, { mx, my, mr, ml } from '../../../styles/margin.styles';
import toCSSResult from '../../../utils/to-css-result';
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
				--xb-box-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-box-border-style: solid;
				--xb-box-border-width: 1px;
				--xb-box-border-radius: ${ toCSSResult( 'radius-md' ) };
				--xb-box-color: unset;
				--xb-box-gap: ${ toCSSResult( 'spacing-2' ) };
				--xb-box-padding-x: ${ toCSSResult( 'spacing-4' ) };
				--xb-box-padding-y: ${ toCSSResult( 'spacing-2' ) };

				${ transition( [
					{
						property: 'background-color',
					},
					{
						property: 'color',
					},
				] ) };

				${ m( toCSSResult( 'spacing-0' ) ) };

				${ px( 'var(--xb-box-padding-x)' ) };
				${ py( 'var(--xb-box-padding-y)' ) };

				display: var( --xb-box-display );

				border: var( --xb-box-border-width ) var( --xb-box-border-style )
					var( --xb-box-border-color );
				border-radius: var( --xb-box-border-radius );
				color: var( --xb-box-color );
				background-color: var( --xb-box-background-color );

				height: 100%;
				box-sizing: border-box;
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				${ typography( 'text-md' ) };
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ px( toCSSResult( 'spacing-0' ) ) };
				${ py( toCSSResult( 'spacing-0' ) ) };
				${ mx( toCSSResult( 'spacing-0' ) ) };
				${ my( toCSSResult( 'spacing-0' ) ) };
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
