import { css } from 'lit';

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
				--xb-item-background-color: ${ token( 'color-white', 0 ) };
				--xb-item-border-color: ${ token( 'color-gray-200' ) };
				--xb-item-border-style: none;
				--xb-item-border-width: 1px;
				--xb-item-color: ${ token( 'color-gray-700' ) };
				--xb-item-height: initial;

				${ transition( [ { property: 'color' }, { property: 'background-color' } ] ) };
				${ typography( 'button' ) };

				block-size: var( --xb-item-height );

				cursor: pointer;
				position: relative;

				box-sizing: border-box;

				display: inline-flex;
				align-items: center;
				justify-content: flex-start;
				text-decoration: none;

				gap: ${ token( 'spacing-2' ) };

				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-2' ) ) };

				background-color: var( --xb-item-background-color );
				color: var( --xb-item-color );

				border-top: none;
				border-inline: none;
				border-bottom-width: var( --xb-item-border-width );
				border-bottom-style: var( --xb-item-border-style );
				border-bottom-color: var( --xb-item-border-color );

				font-size: ${ token( 'font-size-sm' ) };
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				--xb-global-color: var( --xb-item-color );

				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			:host( :hover ),
			:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				--xb-item-background-color: ${ token( 'color-primary-100', 0.1 ) };
				--xb-item-color: ${ token( 'color-primary-600' ) };

				outline: none;
			}

			:host( :active ) {
				--xb-item-color: ${ token( 'color-gray-500' ) };
			}

			:host( [disabled] ) {
				pointer-events: none;
				user-select: none;
				opacity: 0.25;

				cursor: default;
			}

			:host( [disabled] ) ::slotted( * ) {
				pointer-events: none;
				user-select: none;
			}
		`,
		// TODO: use sizeStyles( { property: '--xb-item-height' } ),
		css`
			:host-context( [size='extra-small'] ) {
				--xb-item-height: 24px;
			}

			:host-context( [size='small'] ) {
				--xb-item-height: 40px;
			}

			:host-context( [size='medium'] ) {
				--xb-item-height: 56px;
			}

			:host-context( [size='large'] ) {
				--xb-item-height: 72px;
			}
		`,
	];
}

export default styles;
