import { css } from 'lit';

import { when, m, p, px, py, transition, typography } from '../../styles';
import color from '../../utils/get-color-token';
import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--xb-dropdown-item-height: 40px;

				--xb-dropdown-item-background-color: ${ color( 'color-white', 0 ) };
				--xb-dropdown-item-color: ${ color( 'color-gray-600' ) };

				display: inline-block;

				height: var( --xb-dropdown-item-height );

				width: 100%;
			}

			:host( [disabled] ) {
				pointer-events: none;
				user-select: none;
			}

			.dropdown-menu-item {
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

				background-color: var( --xb-dropdown-item-background-color );
				color: var( --xb-dropdown-item-color );
				border: none;

				font-size: ${ token( 'font-size-sm' ) };

				height: 100%;
				width: 100%;
			}

			${ when.disabled( '.dropdown-menu-item' ) } {
				opacity: 0.25;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ when.disabled( '.dropdown-menu-item', '*' ) } {
				pointer-events: none;
			}

			${ when.hovered( '.dropdown-menu-item' ) },
			${ when.focused( '.dropdown-menu-item' ) } {
				--xb-dropdown-item-background-color: ${ color( 'color-gray-200' ) };
				--xb-dropdown-item-color: ${ color( 'color-gray-700' ) };
				outline: none;
			}

			${ when.active( '.dropdown-menu-item' ) } {
				--xb-dropdown-item-color: ${ color( 'color-gray-500' ) };
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
	];
}

export default styles;
