import { css } from 'lit';

import { when, m, p, px, py, transition, typography } from '../../styles';
import color from '../../utils/get-color-token';
import layoutStyles from '../layout/layout.styles';
import token from '../../utils/get-token';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-button-height: 40px;

				/* TODO: extract features to custom properties */
			}

			.button {
				${ transition( [
					{ property: 'color' },
					{ property: 'background-color' },
					{ property: 'border-color' },
				] ) };

				${ typography( 'button' ) };

				cursor: pointer;
				position: relative;

				display: inline-flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				text-decoration: none;

				gap: 2px;

				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-2' ) ) };

				background: ${ color( 'color-white', 0 ) };
				color: ${ color( 'color-gray-600' ) };
				border: 1px solid;

				height: var( --xb-button-height );
			}

			${ when.disabled( '.button' ) } {
				cursor: not-allowed;
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
				display: none;
			}

			slot[name='leading']::slotted( span ),
			slot[name='trailing']::slotted( span ) {
				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			.-small {
				${ px( token( 'spacing-2' ) ) };

				font-size: ${ token( 'font-size-sm' ) };

				min-width: 40px;
			}

			.-medium {
				--xb-button-height: 56px;
				font-size: ${ token( 'font-size-sm' ) };

				min-width: 56px;
			}

			.-large {
				--xb-button-height: 72px;
				font-size: ${ token( 'font-size-base' ) };

				min-width: 72px;
			}
		`,
	];
}

export default styles;
