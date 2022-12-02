import { css } from 'lit';

import { active, disabled, focused, hovered } from '../../styles/state.styles';
import m from '../../styles/margin.styles';
import p, { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

import sizeStyles from '../../styles/size.styles';

function styles() {
	return [
		css`
			:host {
				--xb-dropdown-item-background-color: ${ token( 'color-white', 0 ) };
				--xb-dropdown-item-color: ${ token( 'color-gray-600' ) };
				--xb-dropdown-item-height: initial;

				display: inline-block;

				height: var( --xb-dropdown-item-height );

				width: 100%;
			}

			:host( [disabled] ) {
				pointer-events: none;
				user-select: none;
			}

			.dropdown-item {
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

				gap: ${ token( 'spacing-2' ) };

				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-2' ) ) };

				background-color: var( --xb-dropdown-item-background-color );
				color: var( --xb-dropdown-item-color );
				border: none;

				font-size: ${ token( 'font-size-sm' ) };

				height: 100%;
				width: 100%;
			}

			${ disabled( '.dropdown-item' ) } {
				opacity: 0.25;

				cursor: default;
				pointer-events: none;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.dropdown-item' ) } * {
				pointer-events: none;
				user-select: none;
			}

			${ hovered( '.dropdown-item' ) },
			${ focused( '.dropdown-item' ) } {
				--xb-dropdown-item-background-color: ${ token( 'color-gray-300' ) };
				--xb-dropdown-item-color: ${ token( 'color-gray-700' ) };

				outline: none;
			}

			${ active( '.dropdown-item' ) } {
				--xb-dropdown-item-color: ${ token( 'color-gray-500' ) };
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				--xb-global-color: var( --xb-dropdown-item-color );

				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}
		`,
		sizeStyles( '--xb-dropdown-item-height' ),
	];
}

export default styles;
