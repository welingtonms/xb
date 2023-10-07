import { css, unsafeCSS } from 'lit';

import m from '../../styles/margin.styles';
import p from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

/**
 * @param {Object} selectors
 * @param {string} selectors.floating - selector for the floating element.
 * @returns
 */
function styles( selectors ) {
	return [
		css`
			:host {
				--xb-floating-background-color: ${ token( 'color-white' ) };
				--xb-floating-color: ${ token( 'color-gray-700' ) };
				--xb-floating-z-index: ${ token( 'layer-popover' ) };

				--xb-floating-border-top-left-radius: 8px;
				--xb-floating-border-top-right-radius: 8px;
				--xb-floating-border-bottom-right-radius: 8px;
				--xb-floating-border-bottom-left-radius: 8px;

				--xb-floating-top: 0;
				--xb-floating-left: 0;

				--xb-floating-box-shadow: rgba( 0, 0, 0, 0.07 ) 0px 1px 1px,
					rgba( 0, 0, 0, 0.07 ) 0px 2px 2px, rgba( 0, 0, 0, 0.07 ) 0px 4px 4px,
					rgba( 0, 0, 0, 0.07 ) 0px 8px 8px, rgba( 0, 0, 0, 0.07 ) 0px 16px 16px;

				position: relative;
			}

			${ unsafeCSS( selectors.floating ) } {
				${ transition( [ { property: 'box-shadow' } ] ) };

				${ typography( 'body-2' ) };

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				display: none;

				min-height: 24px;
				width: max-content;
				max-width: 40ch;

				overflow-x: hidden;

				top: var( --xb-floating-top, 0 );
				left: var( --xb-floating-left, 0 );

				border-top-left-radius: var( --xb-floating-border-top-left-radius );
				border-top-right-radius: var( --xb-floating-border-top-right-radius );
				border-bottom-right-radius: var( --xb-floating-border-bottom-right-radius );
				border-bottom-left-radius: var( --xb-floating-border-bottom-left-radius );

				background-color: var( --xb-floating-background-color );
				color: var( --xb-floating-color );

				box-shadow: var( --xb-floating-box-shadow );
				z-index: var( --xb-floating-z-index );
			}

			:host( [position='absolute'] ) ${ unsafeCSS( selectors.floating ) } {
				position: absolute;
			}

			:host( [position='fixed'] ) ${ unsafeCSS( selectors.floating ) } {
				position: fixed;
			}

			:host( [open] ) ${ unsafeCSS( selectors.floating ) }, :host( [open] ) .arrow {
				display: inline-block;
			}

			.arrow {
				position: absolute;
				background-color: var( --xb-floating-background-color );
				width: 8px;
				height: 8px;
				transform: rotate( 45deg );
			}
		`,
	];
}

export default styles;
