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
				--xb-popover-z-index: ${ token( 'layer-popover' ) };

				--xb-popover-border-top-left-radius: 8px;
				--xb-popover-border-top-right-radius: 8px;
				--xb-popover-border-bottom-right-radius: 8px;
				--xb-popover-border-bottom-left-radius: 8px;

				--xb-popover-box-shadow: rgba( 0, 0, 0, 0.07 ) 0px 1px 1px,
					rgba( 0, 0, 0, 0.07 ) 0px 2px 2px, rgba( 0, 0, 0, 0.07 ) 0px 4px 4px,
					rgba( 0, 0, 0, 0.07 ) 0px 8px 8px, rgba( 0, 0, 0, 0.07 ) 0px 16px 16px;

				position: relative;
			}

			slot[name='reference']::slotted( * ),
			::slotted( [aria-haspopup='true'] ) {
				display: inline-flex;
			}

			slot[name='floating']::slotted( * ),
			::slotted( [role='menu'] ) {
				${ transition( [ { property: 'box-shadow' } ] ) };

				${ typography( 'body-2' ) };

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				display: none;

				min-height: 24px;
				width: max-content;
				max-width: 40ch;

				overflow-x: hidden;

				top: var( --xb-popover-top, 0 );
				left: var( --xb-popover-left, 0 );

				border-top-left-radius: var( --xb-popover-border-top-left-radius );
				border-top-right-radius: var( --xb-popover-border-top-right-radius );
				border-bottom-right-radius: var( --xb-popover-border-bottom-right-radius );
				border-bottom-left-radius: var( --xb-popover-border-bottom-left-radius );

				background-color: var( --xb-popover-background-color );
				color: var( --xb-popover-color );

				box-shadow: var( --xb-popover-box-shadow );
				z-index: var( --xb-popover-z-index );
			}

			:host( [position='absolute'] ) slot[name='floating']::slotted( * ),
			:host( [position='absolute'] ) ::slotted( [role='menu'] ) {
				position: absolute;
			}

			:host( [position='fixed'] ) slot[name='floating']::slotted( * ),
			:host( [position='fixed'] ) ::slotted( [role='menu'] ) {
				position: fixed;
			}

			:host( [open] ) slot[name='floating']::slotted( * ),
			:host( [open] ) ::slotted( [role='menu'] ),
			:host( [open] ) .arrow {
				display: inline-block;
			}

			.arrow {
				position: absolute;
				background-color: var( --xb-popover-background-color );
				width: 8px;
				height: 8px;
				transform: rotate( 45deg );
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
