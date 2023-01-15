import { css } from 'lit';

import {
	active,
	disabled,
	focused,
	hovered,
} from '../../../styles/state.styles';
import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import p, { px } from '../../../styles/padding.styles';
import token from '../../../utils/get-token';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';

function styles() {
	return [
		css`
			:host {
				--xb-radio-height: initial;
				--xb-radio-outline-color: ${ token( 'color-white', 0 ) };
			}

			:host( [disabled] ) {
				pointer-events: none;
			}

			.radio {
				${ transition( [ { property: 'color' }, { property: 'opacity' } ] ) };

				${ typography( 'body-2' ) };

				cursor: pointer;

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-2' ) };
				align-items: center;

				border: none;
				background: transparent;
				height: var( --xb-radio-height );

				${ p( token( 'spacing-0' ) ) };

				box-sizing: border-box;
			}

			.check {
				${ transition( [
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'border-width' },
					{ property: 'box-shadow' },
					{ property: 'outline' },
				] ) };

				${ outline( '--xb-radio-outline-color' ) };

				--xb-icon-color: ${ token( 'color-white' ) };

				flex-shrink: 0;
				appearance: none;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				border: 1px solid ${ token( 'color-gray-400' ) };
				background-color: ${ token( 'color-white' ) };
				border-radius: 8px;

				box-sizing: border-box;
			}

			${ disabled( '.radio' ) } {
				opacity: 0.25;

				cursor: default;
				pointer-events: none;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.radio' ) } * {
				pointer-events: none;
				user-select: none;
			}

			${ focused( '.radio' ) } {
				outline: none;
			}

			${ focused( '.radio' ) } .check {
				--xb-radio-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.radio' ) } * {
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

			${ hovered( '.radio' ) } .check {
				border-color: ${ token( 'color-primary-500' ) };
			}

			${ hovered( '.radio' ) }[aria-checked='true'] .check {
				border-color: ${ token( 'color-primary-500' ) };
				background-color: ${ token( 'color-primary-500' ) };
			}

			${ active( '.radio' ) } .check {
				border-color: ${ token( 'color-primary-100' ) };
			}

			${ active( '.radio' ) }[aria-checked='true'] .check {
				border-color: ${ token( 'color-primary-100' ) };
				background-color: ${ token( 'color-primary-100' ) };
			}

			.radio[aria-checked='true'] .check {
				--xb-icon-color: ${ token( 'color-white' ) };

				border-color: ${ token( 'color-primary-300' ) };
				background-color: ${ token( 'color-primary-300' ) };
				border-width: 2px;
			}
		`,
		css`
			.-small {
				--xb-radio-height: 24px;
			}

			.-medium {
				--xb-radio-height: 24px;
			}

			.-large {
				--xb-radio-height: 24px;
			}
		`,
	];
}

export default styles;
