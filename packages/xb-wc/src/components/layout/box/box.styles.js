import { css } from 'lit';

import {
	m,
	mx,
	my,
	ml,
	mr,
	px,
	py,
	typography,
	transition,
} from '../../../styles';
import color from '../../../utils/get-color-token';
import layoutStyles from '../../../styles/layout.styles';
import token from '../../../utils/get-token';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-box-background-color: initial;
				--xb-box-border-color: ${ color( 'color-gray-300' ) };
				--xb-box-border-style: solid;
				--xb-box-border-width: 1px;
				--xb-box-color: unset;
				--xb-box-gap: ${ token( 'spacing-2' ) };
				--xb-box-padding-x: ${ token( 'spacing-4' ) };
				--xb-box-padding-y: ${ token( 'spacing-2' ) };

				${ m( token( 'spacing-0' ) ) };
			}

			.box {
				${ transition( [
					{
						property: 'background-color',
					},
					{
						property: 'color',
					},
				] ) };

				${ px( 'var(--xb-box-padding-x)' ) };
				${ py( 'var(--xb-box-padding-y)' ) };

				border: var( --xb-box-border-width ) var( --xb-box-border-style )
					var( --xb-box-border-color );
				color: var( --xb-box-color );
				background-color: var( --xb-box-background-color );

				height: 100%;
				box-sizing: border-box;
			}

			::slotted( * ),
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
