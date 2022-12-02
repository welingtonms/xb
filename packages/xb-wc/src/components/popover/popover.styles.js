import { css } from 'lit';

import m from '../../styles/margin.styles';
import p from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

function styles() {
	return [
		css`
			:host {
				--xb-popover-background-color: ${ token( 'color-white' ) };
				--xb-popover-color: ${ token( 'color-gray-700' ) };

				position: relative;

				display: inline-flex;
				flex-direction: column;
			}

			slot[name='anchor']::slotted( * ) {
				display: inline-flex;
			}

			slot[name='floating']::slotted( * ) {
				${ transition( [ { property: 'box-shadow' } ] ) };

				${ typography( 'body-2' ) };

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				display: inline-block;

				min-height: 24px;
				width: max-content;
				max-width: 40ch;

				overflow-x: hidden;

				top: var( --xb-popover-top, 0 );
				left: var( --xb-popover-left, 0 );

				border-radius: 4px;

				background-color: var( --xb-popover-background-color );
				color: var( --xb-popover-color );

				box-shadow: rgba( 0, 0, 0, 0.1 ) 0px 4px 6px -1px,
					rgba( 0, 0, 0, 0.06 ) 0px 2px 4px -1px;
			}

			:host( [position='absolute'] ) slot[name='floating']::slotted( * ) {
				position: absolute;
			}

			:host( [position='fixed'] ) slot[name='floating']::slotted( * ) {
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
