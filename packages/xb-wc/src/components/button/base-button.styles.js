import { css } from 'lit';

import { when, m, p, px, py, transition, typography } from '../../styles';
import color from '../../utils/get-color-token';
import layoutStyles from '../../styles/layout.styles';
import sizeStyles from '../../styles/size.styles';
import token from '../../utils/get-token';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-button-height: initial;

				--xb-button-background-color: ${ color( 'color-white', 0 ) };
				--xb-button-color: ${ color( 'color-gray-600' ) };
				--xb-button-border-color: ${ color( 'color-white', 0 ) };

				display: inline-block;
			}

			:host( [disabled] ) {
				pointer-events: none;
				user-select: none;
			}

			.button {
				${ transition( [
					{ property: 'color' },
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'box-shadow' },
				] ) };

				${ typography( 'button' ) };

				cursor: pointer;
				position: relative;

				box-sizing: border-box;

				display: inline-flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				text-decoration: none;

				gap: ${ token( 'spacing-1' ) };

				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-2' ) ) };

				background-color: var( --xb-button-background-color );
				color: var( --xb-button-color );
				border: 1px solid var( --xb-button-border-color );

				height: var( --xb-button-height );
				min-width: var( --xb-button-height );
			}

			${ when.disabled( '.button' ) } {
				opacity: 0.25;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ when.disabled( '.button', '*' ) } {
				pointer-events: none;
			}

			${ when.focused( '.button' ) } {
				outline: none; //1px solid ${ color( 'color-primary-200', 0.85 ) };
				box-shadow: ${ color( 'color-primary-200', 0.3 ) } 5px 5px,
					${ color( 'color-primary-200', 0.2 ) } 10px 10px,
					${ color( 'color-primary-200', 0.1 ) } 15px 15px;
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				--xb-global-color: var( --xb-button-color );

				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			.-small {
				${ px( token( 'spacing-2' ) ) };

				font-size: ${ token( 'font-size-sm' ) };
			}

			.-medium {
				font-size: ${ token( 'font-size-sm' ) };
			}

			.-large {
				font-size: ${ token( 'font-size-base' ) };
			}
		`,
		sizeStyles( '--xb-button-height' ),
	];
}

export default styles;
