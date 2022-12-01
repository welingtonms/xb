import { css } from 'lit';

import {
	active,
	disabled,
	focused,
	hovered,
	enabled,
} from '../../styles/state.styles';
import m from '../../styles/margin.styles';
import outline from '../../styles/outline.styles';
import p, { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

import layoutStyles from '../../styles/layout.styles';
import sizeStyles from '../../styles/size.styles';

function styles() {
	return [
		css`
			:host {
				--xb-select-option-height: initial;

				--xb-select-option-background-color: ${ token( 'color-white', 0 ) };
				--xb-select-option-color: ${ token( 'color-gray-600' ) };

				display: inline-block;

				height: var( --xb-select-option-height );

				width: 100%;
			}

			:host( [disabled] ) {
				pointer-events: none;
				user-select: none;
			}

			.select-option {
				${ transition( [
					{ property: 'color' },
					{ property: 'background-color' },
				] ) };

				${ typography( 'button' ) };

				cursor: pointer;
				position: relative;

				box-sizing: border-box;

				display: inline-flex;
				align-items: center;
				justify-content: flex-start;
				overflow: hidden;
				text-decoration: none;

				gap: ${ token( 'spacing-1' ) };

				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-2' ) ) };

				background-color: var( --xb-select-option-background-color );
				color: var( --xb-select-option-color );
				border: none;

				font-size: ${ token( 'font-size-sm' ) };

				height: 100%;
				width: 100%;
			}

			.select-option.is-selected {
				--xb-select-option-background-color: ${ token(
					'color-secondary-100',
					0.2
				) };

				--xb-select-option-color: ${ token( 'color-secondary-600' ) };
			}

			${ disabled( '.select-option' ) } {
				opacity: 0.25;

				cursor: default;
				pointer-events: none;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.select-option' ) } * {
				pointer-events: none;
				user-select: none;
			}

			${ hovered( '.select-option' ) },
			${ focused( '.select-option' ) } {
				--xb-select-option-background-color: ${ token( 'color-gray-200' ) };
				--xb-select-option-color: ${ token( 'color-gray-700' ) };

				outline: none;
			}

			${ active( '.select-option' ) } {
				--xb-select-option-color: ${ token( 'color-gray-500' ) };
			}

			slot[name='leading']::slotted( * ) {
				--xb-global-color: var( --xb-select-option-color );

				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			.check {
				--xb-icon-color: ${ token( 'color-white', 0 ) };

				margin-left: auto;
			}

			.select-option.is-selected .check {
				--xb-icon-color: ${ token( 'color-secondary-300' ) };
			}
		`,
		sizeStyles( '--xb-select-option-height' ),
	];
}

export default styles;
