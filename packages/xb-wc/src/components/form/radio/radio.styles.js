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
				--xb-radio-height: initial;
			}

			.radio {
				--xb-cluster-gap: ${ token( 'spacing-1' ) };

				${ transition( [
					{ property: 'color' },
					{ property: 'box-shadow' },
				] ) };

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

				width: 100%;
			}

			input {
				${ transition( [
					{ property: 'accent-color' },
					{ property: 'box-shadow' },
				] ) };

				${ transition( [ { property: 'accent-color' } ] ) };

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				display: inline-flex;
				accent-color: ${ color( 'color-primary-100' ) };

				inline-size: 16px;
				block-size: 16px;

				outline: none;
			}

			${ when.focused( '.radio', 'input' ) } {
				box-shadow: ${ color( 'color-primary-200', 0.3 ) } 5px 5px,
					${ color( 'color-primary-200', 0.2 ) } 10px 10px,
					${ color( 'color-primary-200', 0.1 ) } 15px 15px;
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
