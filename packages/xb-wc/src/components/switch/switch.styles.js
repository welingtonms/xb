import { css } from 'lit';

import m from '../../styles/margin.styles';
import outline from '../../styles/outline.styles';
import p from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';
import sizeStyles from '../../styles/size.styles';

function styles() {
	return [
		css`
			:host {
				--xb-switch-height: initial;
				--xb-switch-outline-color: ${ token( 'color-white', 0 ) };

				${ transition( [ { property: 'color' }, { property: 'opacity' } ] ) };

				${ typography( 'body-2' ) };

				cursor: pointer;

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-2' ) };
				align-items: center;

				border: none;
				background: transparent;
				height: var( --xb-switch-height );

				${ p( token( 'spacing-0' ) ) };

				box-sizing: border-box;
			}

			:host( [aria-checked='true'] ) .switch {
				--xb-icon-color: ${ token( 'color-white' ) };

				justify-content: flex-end;
				border-color: ${ token( 'color-primary-300' ) };
			}

			:host( [aria-checked='true'] ) xb-icon[name='circle'] {
				--xb-icon-color: ${ token( 'color-primary-500' ) };
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

			:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				outline: none;
			}

			:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) .switch {
				--xb-switch-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			}

			slot[name='leading']::slotted( span ),
			slot[name='trailing']::slotted( span ) {
				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			:host( :hover ) .switch {
				border-color: ${ token( 'color-primary-500' ) };
			}

			:host( :active ) .switch {
				border-color: ${ token( 'color-primary-100' ) };
			}

			.switch {
				${ transition( [
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'box-shadow' },
					{ property: 'outline' },
				] ) };

				${ outline( '--xb-switch-outline-color' ) };

				flex-shrink: 0;
				display: inline-flex;
				justify-content: flex-start;
				align-items: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				border: 1px solid ${ token( 'color-gray-400' ) };
				background-color: ${ token( 'color-white' ) };
				border-radius: calc( 0.5 * var( --xb-switch-height ) );

				box-sizing: border-box;
				block-size: calc( 0.75 * var( --xb-switch-height ) );
				inline-size: calc( 1.5 * var( --xb-switch-height ) );
			}

			xb-icon[name='circle'] {
				--xb-icon-color: ${ token( 'color-primary-200' ) };
				--xb-icon-size: calc( 0.75 * var( --xb-switch-height ) );
			}
		`,
		sizeStyles( { property: '--xb-switch-height' } ),
	];
}

export default styles;
