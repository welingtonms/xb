import { css } from 'lit';

import token from '../../utils/get-token';
import color from '../../utils/get-color-token';
import { transition, typography, px, py } from '../../styles';

function styles() {
	return [
		css`
			:host {
				${ transition( [
					{ property: 'box-shadow' },
					{ property: 'left' },
					{ property: 'top' },
				] ) };

				${ typography( 'body-2' ) };

				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-2' ) ) };

				position: relative;

				display: flex;

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

			:host( .-absolute ) {
				position: absolute;
			}

			:host( .-fixed ) {
				position: fixed;
			}

			:host( [hidden] ) {
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
