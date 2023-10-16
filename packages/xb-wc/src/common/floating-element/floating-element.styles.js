import { css, unsafeCSS } from 'lit';

import m from '../../styles/margin.styles';
import p from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

/**
 * PS: Applying styles from the parent element to the floating element
 * because :host-context is not supported in Firefox
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

				--xb-floating-width: initial;
				--xb-floating-min-width: initial;
				--xb-floating-max-width: initial;

				--xb-floating-border-top-left-radius: 8px;
				--xb-floating-border-top-right-radius: 8px;
				--xb-floating-border-bottom-right-radius: 8px;
				--xb-floating-border-bottom-left-radius: 8px;

				--xb-floating-top: 0;
				--xb-floating-left: 0;

				--xb-floating-box-shadow: rgba( 0, 0, 0, 0.07 ) 0px 1px 1px,
					rgba( 0, 0, 0, 0.07 ) 0px 2px 2px, rgba( 0, 0, 0, 0.07 ) 0px 4px 4px,
					rgba( 0, 0, 0, 0.07 ) 0px 8px 8px, rgba( 0, 0, 0, 0.07 ) 0px 16px 16px;
			}

			${ unsafeCSS( selectors.floating ) } {
				${ transition( [ { property: 'box-shadow' } ] ) };

				${ typography( 'body-2' ) };

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				position: initial;

				display: none;

				min-height: 24px;
				width: var( --xb-floating-width );
				min-width: var( --xb-floating-min-width );
				max-width: var( --xb-floating-max-width );

				overflow-x: hidden;
				top: 0;
				left: 0;

				/* top: var( --xb-floating-top, 0 );
				left: var( --xb-floating-left, 0 ); */
				transform: translate3d( var( --xb-floating-left, 0 ), var( --xb-floating-top, 0 ), 0 );
				-moz-transform: translate3d( var( --xb-floating-left, 0 ), var( --xb-floating-top, 0 ), 0 );

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

			:host( [open] ) ${ unsafeCSS( selectors.floating ) } {
				display: inline-block;
			}
		`,
	];
}

export default styles;
