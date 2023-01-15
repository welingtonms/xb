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
				--xb-checkbox-height: initial;
				--xb-checkbox-outline-color: ${ token( 'color-white', 0 ) };
			}

			:host( [disabled] ) {
				pointer-events: none;
			}

			.checkbox {
				${ transition( [ { property: 'color' }, { property: 'opacity' } ] ) };

				${ typography( 'body-2' ) };

				cursor: pointer;

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-2' ) };
				align-items: center;

				border: none;
				background: transparent;
				height: var( --xb-checkbox-height );

				${ p( token( 'spacing-0' ) ) };

				box-sizing: border-box;
			}

			.check {
				${ transition( [
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'box-shadow' },
					{ property: 'outline' },
				] ) };

				${ outline( '--xb-checkbox-outline-color' ) };

				--xb-icon-color: ${ token( 'color-white', 0 ) };

				flex-shrink: 0;
				appearance: none;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				border: 1px solid ${ token( 'color-gray-400' ) };
				background-color: ${ token( 'color-white' ) };
				border-radius: 4px;

				box-sizing: border-box;
			}

			${ disabled( '.checkbox' ) } {
				opacity: 0.25;

				cursor: default;
				pointer-events: none;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.checkbox' ) } * {
				pointer-events: none;
				user-select: none;
			}

			${ focused( '.checkbox' ) } {
				outline: none;
			}

			${ focused( '.checkbox' ) } .check {
				--xb-checkbox-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.checkbox' ) } * {
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

			${ hovered( '.checkbox' ) } .check {
				border-color: ${ token( 'color-primary-500' ) };
			}

			${ hovered( '.checkbox' ) }[aria-checked='true'] .check {
				border-color: ${ token( 'color-primary-500' ) };
				background-color: ${ token( 'color-primary-500' ) };
			}

			${ active( '.checkbox' ) } .check {
				border-color: ${ token( 'color-primary-100' ) };
			}

			${ active( '.checkbox' ) }[aria-checked='true'] .check {
				border-color: ${ token( 'color-primary-100' ) };
				background-color: ${ token( 'color-primary-100' ) };
			}

			.checkbox[aria-checked='true'] .check {
				--xb-icon-color: ${ token( 'color-white' ) };

				border-color: ${ token( 'color-primary-300' ) };
				background-color: ${ token( 'color-primary-300' ) };
			}
		`,
		css`
			.-small {
				--xb-checkbox-height: 24px;
				min-width: 16px;
			}

			.-medium {
				--xb-checkbox-height: 24px;
				min-width: 16px;
			}

			.-large {
				--xb-checkbox-height: 24px;
				min-width: 16px;
			}
		`,
	];
}

export default styles;
