import { css } from 'lit';

import {
	active,
	disabled,
	focused,
	hovered,
} from '../../../styles/state.styles';
import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import p, { px, py } from '../../../styles/padding.styles';
import token from '../../../utils/get-token';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';

import sizeStyles from '../../../styles/size.styles';

function styles() {
	return [
		css`
			:host {
				--xb-text-input-height: initial;
				--xb-text-input-border-color: ${ token( 'color-gray-400' ) };
				--xb-text-input-outline-color: ${ token( 'color-white', 0 ) };
			}

			:host( [disabled] ) {
				pointer-events: none;
			}

			.text-input {
				${ transition( [
					{ property: 'color' },
					{ property: 'background-color' },
					{ property: 'border-color' },
				] ) };

				${ typography( 'body-2' ) };

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-1' ) };
				align-items: center;

				height: var( --xb-text-input-height );
				background-color: ${ token( 'color-white' ) };
				border: 1px solid var( --xb-text-input-border-color );
				border-radius: 4px;

				${ px( token( 'spacing-2' ) ) };
				${ py( token( 'spacing-0' ) ) };

				box-sizing: border-box;
				width: 100%;

				${ outline( '--xb-text-input-outline-color' ) };
			}

			${ focused( '.text-input' ) } {
				--xb-text-input-outline-color: ${ token( 'color-primary-200', 0.2 ) };
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

			${ disabled( 'input' ) } {
				opacity: 0.25;

				cursor: default;
				pointer-events: none;
			}

			/* When disabled, prevent mouse events from bubbling up */
			${ disabled( '.text-input' ) } * {
				pointer-events: none;
				user-select: none;
			}

			slot[name='leading']::slotted( span ),
			slot[name='trailing']::slotted( span ) {
				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			${ hovered( '.text-input' ) } {
				--xb-text-input-border-color: ${ token( 'color-gray-500' ) };
			}

			${ active( '.text-input' ) },
			${ focused( '.text-input' ) } {
				--xb-text-input-border-color: ${ token( 'color-primary-400' ) };
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
				--xb-text-input-height: 56px;

				font-size: ${ token( 'font-size-sm' ) };
			}

			.-large {
				--xb-text-input-height: 72px;

				font-size: ${ token( 'font-size-base' ) };
			}

			.-large input {
				${ typography( 'body-1' ) };
			}
		`,
		sizeStyles( { property: '--xb-text-input-height' } ),
	];
}

export default styles;
