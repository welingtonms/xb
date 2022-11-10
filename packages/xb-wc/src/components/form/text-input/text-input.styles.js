import { css } from 'lit';

import { when, transition, px, py, p, m, typography } from '../../../styles';
import sizeStyles from '../../../styles/size.styles';
import color from '../../../utils/get-color-token';
import token from '../../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--xb-text-input-height: initial;
			}

			.text-input {
				${ transition( [
					{ property: 'color' },
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'box-shadow' },
				] ) };

				${ typography( 'body-2' ) };

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-1' ) };
				align-items: center;

				height: var( --xb-text-input-height );
				background-color: ${ color( 'color-white' ) };
				border: 1px solid;

				${ px( token( 'spacing-2' ) ) };
				${ py( token( 'spacing-0' ) ) };

				box-sizing: border-box;
				width: 100%;
			}

			${ when.focused( '.text-input' ) } {
				outline: none; //1px solid ${ color( 'color-primary-200', 0.85 ) };
				box-shadow: ${ color( 'color-primary-200', 0.3 ) } 5px 5px,
					${ color( 'color-primary-200', 0.2 ) } 10px 10px,
					${ color( 'color-primary-200', 0.1 ) } 15px 15px;
			}

			input {
				${ typography( 'body-2' ) };

				border: none;
				outline: none;
				height: 100%;
				flex-grow: 1;
				flex-shrink: 0;

				${ px( token( 'spacing-0' ) ) };
				${ py( token( 'spacing-2' ) ) };

				box-sizing: border-box;
			}

			${ when.disabled( 'input' ) } {
				cursor: not-allowed;
				opacity: 0.25;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ when.disabled( '.text-input', '*' ) } {
				pointer-events: none;
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

			${ when.hovered( '.text-input' ) } {
				border-color: ${ color( 'color-primary-300' ) };
			}

			${ when.active( '.text-input' ) },
			${ when.focused( '.text-input' ) } {
				border-color: ${ color( 'color-primary-500' ) };
			}

			.-small {
				${ px( token( 'spacing-2' ) ) };

				/* font-size: ${ token( 'font-size-sm' ) }; */
			}

			.-medium {
				--xb-text-input-height: 56px;
				/* font-size: ${ token( 'font-size-sm' ) }; */
			}

			.-large {
				--xb-text-input-height: 72px;
				/* font-size: ${ token( 'font-size-base' ) }; */
			}

			.-large input {
				${ typography( 'body-1' ) };
			}
		`,
		sizeStyles( { property: '--xb-text-input-height' } ),
	];
}

export default styles;
