import { css } from 'lit';

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

				--xb-button-padding-x: ${ token( 'spacing-2' ) };
				--xb-button-padding-y: ${ token( 'spacing-1' ) };

				display: inline-flex;

				height: var( --xb-button-height );
				min-width: var( --xb-button-height );

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

				${ px( 'var(--xb-button-padding-x)' ) };
				${ py( 'var(--xb-button-padding-y)' ) };

				background-color: var( --xb-button-background-color );
				border: 1px solid var( --xb-button-border-color );
				border-radius: 4px;

				color: var( --xb-button-color );
				--xb-global-color: var( --xb-button-color );

				${ outline( '--xb-button-outline-color' ) };
			}

			:host( [disabled] ) {
				opacity: 0.25;

				cursor: default;
				pointer-events: none;
			}

			:host( [disabled] ) *,
			:host( [disabled] ) ::slotted( * ) {
				pointer-events: none;
				user-select: none;
			}

			:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				--xb-button-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			}

			:host( :active ) {
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

			:host( [size='extra-small'] ) {
				${ px( token( 'spacing-1' ) ) };

				font-size: ${ token( 'font-size-xs' ) };
			}

			:host( [size='small'] ) {
				font-size: ${ token( 'font-size-sm' ) };
			}

			:host( [size='medium'] ) {
				font-size: ${ token( 'font-size-sm' ) };
			}

			:host( [size='large'] ) {
				font-size: ${ token( 'font-size-base' ) };
			}
		`,
		sizeStyles( '--xb-button-height' ),
	];
}

export default styles;
