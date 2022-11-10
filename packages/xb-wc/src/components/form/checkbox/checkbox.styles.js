import { css } from 'lit';

import {
	when,
	transition,
	px,
	py,
	pl,
	pr,
	p,
	m,
	typography,
} from '../../../styles';
import sizeStyles from '../../../styles/size.styles';
import color from '../../../utils/get-color-token';
import token from '../../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--xb-checkbox-height: initial;
			}

			.checkbox {
				${ transition( [ { property: 'color' } ] ) };

				${ typography( 'body-2' ) };

				cursor: pointer;

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-1' ) };
				align-items: center;

				border: none;
				background: transparent;
				height: var( --xb-checkbox-height );

				${ p( token( 'spacing-0' ) ) };

				box-sizing: border-box;

				outline: none;
			}

			${ when.focused( '.checkbox', '.check' ) } {
				outline: none;
				box-shadow: ${ color( 'color-primary-200', 0.3 ) } 5px 5px,
					${ color( 'color-primary-200', 0.2 ) } 10px 10px,
					${ color( 'color-primary-200', 0.1 ) } 15px 15px;
			}

			xb-icon {
				${ transition( [
					{ property: 'border-color' },
					{ property: 'background-color' },
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

				box-sizing: border-box;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ when.disabled( '.checkbox', '*' ) } {
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

			${ when.hovered( '.checkbox' ) } xb-icon {
				border-color: ${ color( 'color-primary-100' ) };
			}

			${ when.hovered( '.checkbox' ) }[aria-checked='true'] xb-icon {
				border-color: ${ color( 'color-primary-500' ) };
				background-color: ${ color( 'color-primary-500' ) };
			}

			.checkbox[aria-checked='true'] xb-icon {
				--xb-icon-color: ${ color( 'color-white' ) };

				border-color: ${ color( 'color-primary-100' ) };
				background-color: ${ color( 'color-primary-100' ) };
			}

			/* .-small {
				${ px( token( 'spacing-2' ) ) };


			}

			.-medium {
				--xb-checkbox-height: 56px;

			}

			.-large {
				--xb-checkbox-height: 72px;

			} */
		`,
		sizeStyles( { property: '--xb-checkbox-height' } ),
	];
}

export default styles;
