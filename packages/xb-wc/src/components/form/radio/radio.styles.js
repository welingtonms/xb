import { css } from 'lit';

import { when, transition, px, p, m, typography } from '../../../styles';
import sizeStyles from '../../../styles/size.styles';
import color from '../../../utils/get-color-token';
import token from '../../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--xb-radio-height: initial;
			}

			.radio {
				${ transition( [ { property: 'color' } ] ) };

				${ typography( 'body-2' ) };

				cursor: pointer;

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-1' ) };
				align-items: center;

				border: none;
				background: transparent;
				height: var( --xb-radio-height );

				${ p( token( 'spacing-0' ) ) };

				box-sizing: border-box;

				outline: none;
			}

			${ when.focused( '.radio', '.check' ) } {
				outline: none;
				box-shadow: ${ color( 'color-primary-200', 0.3 ) } 5px 5px,
					${ color( 'color-primary-200', 0.2 ) } 10px 10px,
					${ color( 'color-primary-200', 0.1 ) } 15px 15px;
			}

			xb-icon {
				${ transition( [
					{ property: 'border-color' },
					{ property: 'background-color' },
					{ property: 'border-width' },
					{ property: 'box-shadow' },
				] ) };

				--xb-icon-color: ${ color( 'color-white' ) };

				flex-shrink: 0;
				outline: none;
				appearance: none;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				border: 1px solid;
				border-color: ${ color( 'color-gray-400' ) };
				background-color: ${ color( 'color-white' ) };
				border-radius: 8px;

				box-sizing: border-box;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ when.disabled( '.radio', '*' ) } {
				pointer-events: none;
			}

			slot[name='leading']::slotted( span ),
			slot[name='trailing']::slotted( span ) {
				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			${ when.hovered( '.radio' ) } xb-icon {
				border-color: ${ color( 'color-primary-500' ) };
			}

			${ when.hovered( '.radio' ) }[aria-checked='true'] xb-icon {
				border-color: ${ color( 'color-primary-500' ) };
				background-color: ${ color( 'color-primary-500' ) };
			}

			${ when.active( '.radio' ) } xb-icon {
				border-color: ${ color( 'color-primary-100' ) };
			}

			${ when.active( '.radio' ) }[aria-checked='true'] xb-icon {
				border-color: ${ color( 'color-primary-100' ) };
				background-color: ${ color( 'color-primary-100' ) };
			}

			.radio[aria-checked='true'] xb-icon {
				--xb-icon-color: ${ color( 'color-white' ) };

				border-color: ${ color( 'color-primary-300' ) };
				background-color: ${ color( 'color-primary-300' ) };
				border-width: 2px;
			}

			/* .-small {
				${ px( token( 'spacing-2' ) ) };


			}

			.-medium {
				--xb-radio-height: 56px;

			}

			.-large {
				--xb-radio-height: 72px;

			} */
		`,
		sizeStyles( { property: '--xb-radio-height' } ),
	];
}

export default styles;
