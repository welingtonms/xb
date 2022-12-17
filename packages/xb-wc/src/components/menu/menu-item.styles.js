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
				--xb-menu-item-background-color: ${ token( 'color-white', 0 ) };
				--xb-menu-item-color: ${ token( 'color-gray-600' ) };
				--xb-menu-item-height: initial;
				--xb-menu-item-border-width: 1px;
				--xb-menu-item-border-style: none;
				--xb-menu-item-border-color: ${ token( 'color-gray-200' ) }

				display: inline-block;

				height: var( --xb-menu-item-height );

				width: 100%;
			}

			:host( [disabled] ) {
				pointer-events: none;
				user-select: none;
			}

			.menu-item {
				${ transition( [ { property: 'color' }, { property: 'background-color' } ] ) };

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

				background-color: var( --xb-menu-item-background-color );
				color: var( --xb-menu-item-color );

				border-top: none;
				border-inline: none;
				border-bottom-width: var(--xb-menu-item-border-width) ;
				border-bottom-style: var(--xb-menu-item-border-style) ;
				border-bottom-color: var(--xb-menu-item-border-color) ;

				font-size: ${ token( 'font-size-sm' ) };

				height: 100%;
				width: 100%;
			}

			.menu-item[aria-checked='true'] {
				--xb-menu-item-background-color: ${ token( 'color-primary-100', 0.2 ) };

				--xb-menu-item-color: ${ token( 'color-primary-600' ) };
			}

			${ disabled( '.menu-item' ) } {
				opacity: 0.25;

				cursor: default;
				pointer-events: none;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.menu-item' ) } * {
				pointer-events: none;
				user-select: none;
			}

			${ hovered( '.menu-item' ) },
			${ focused( '.menu-item' ) } {
				--xb-menu-item-background-color: ${ token( 'color-gray-200', 0.4 ) };
				--xb-menu-item-color: ${ token( 'color-gray-700' ) };

				outline: none;
			}

			${ active( '.menu-item' ) } {
				--xb-menu-item-color: ${ token( 'color-gray-500' ) };
			}

			slot[name='leading']::slotted( * ) {
				--xb-global-color: var( --xb-menu-item-color );

				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			.check {
				--xb-icon-color: ${ token( 'color-blue-600' ) };

				visibility: hidden;
				margin-left: auto;
			}

			.menu-item[aria-checked='true'] .check {
				visibility: visible;
			}
		`,
		sizeStyles( '--xb-menu-item-height' ),
	];
}

export default styles;
