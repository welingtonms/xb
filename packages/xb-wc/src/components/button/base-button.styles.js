import { css } from 'lit';

import { active, disabled, focused } from '../../styles/state.styles';
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
		layoutStyles(),
		css`
			:host {
				--xb-button-height: initial;

				--xb-button-background-color: ${ token( 'color-white', 0 ) };
				--xb-button-color: ${ token( 'color-gray-600' ) };
				--xb-button-border-color: ${ token( 'color-white', 0 ) };
				--xb-button-outline-color: ${ token( 'color-white', 0 ) };

				display: inline-flex;

				height: var( --xb-button-height );
				min-width: var( --xb-button-height );
			}

			:host( [disabled] ) {
				pointer-events: none;
			}

			.button {
				${ transition( [
					{ property: 'color' },
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'outline-color' },
				] ) };

				${ typography( 'button' ) };

				cursor: pointer;
				position: relative;

				box-sizing: border-box;

				display: inline-flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				text-decoration: none;

				gap: ${ token( 'spacing-2' ) };

				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-1' ) ) };

				background-color: var( --xb-button-background-color );
				border: 1px solid var( --xb-button-border-color );
				border-radius: 4px;

				color: var( --xb-button-color );
				--xb-global-color: var( --xb-button-color );

				${ outline( '--xb-button-outline-color' ) };

				height: 100%;
				width: 100%;
			}

			${ disabled( '.button' ) } {
				opacity: 0.25;

				cursor: default;
				pointer-events: none;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.button' ) } * {
				pointer-events: none;
				user-select: none;
			}

			${ focused( '.button' ) } {
				--xb-button-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			}

			${ active( '.button' ) } {
				--xb-button-color: ${ token( 'color-gray-500' ) };
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			.-extra-small {
				${ px( token( 'spacing-1' ) ) };

				font-size: ${ token( 'font-size-xs' ) };
			}

			.-small {
				${ px( token( 'spacing-2' ) ) };

				font-size: ${ token( 'font-size-sm' ) };
			}

			.-medium {
				font-size: ${ token( 'font-size-sm' ) };
			}

			.-large {
				font-size: ${ token( 'font-size-base' ) };
			}
		`,
		sizeStyles( '--xb-button-height' ),
	];
}

export default styles;
