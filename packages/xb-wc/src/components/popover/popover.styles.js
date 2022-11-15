import { css } from 'lit';

import token from '../../utils/get-token';
import color from '../../utils/get-color-token';
import { transition, typography, px, py } from '../../styles';

function styles() {
	return [
		css`
			:host {
				position: relative;

				display: inline-flex;
			}

			slot[name='reference']::slotted( * ) {
				display: inline-flex;
			}

			slot[name='floating']::slotted( * ) {
				${ transition( [
					{ property: 'box-shadow' },
					{ property: 'top', duration: '0.15s' },
				] ) };

				${ typography( 'body-2' ) };

				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-2' ) ) };

				position: relative;

				display: inline-block;

				min-height: 48px;
				width: max-content;
				max-width: 40ch;

				top: var( --xb-popover-top, 0 );
				left: var( --xb-popover-left, 0 );

				border-radius: 6px;

				background-color: ${ color( 'color-white' ) };

				box-shadow: rgba( 0, 0, 0, 0.1 ) 0px 4px 6px -1px,
					rgba( 0, 0, 0, 0.06 ) 0px 2px 4px -1px;
			}

			:host( .-absolute ) slot[name='floating']::slotted( * ) {
				position: absolute;
			}

			:host( .-fixed ) slot[name='floating']::slotted( * ) {
				position: fixed;
			}

			:host( [hidden] ) slot[name='floating']::slotted( * ) {
				display: none;
			}

			/* .-absolute {
				position: absolute;
			}

			.-fixed {
				position: fixed;
			} */
		`,
	];
}

export default styles;
