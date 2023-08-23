import { css } from 'lit';

import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import p from '../../../styles/padding.styles';
import token from '../../../utils/get-token';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';
import sizeStyles from '../../../styles/size.styles';

function styles() {
	return [
		css`
			:host {
				--xb-radio-height: initial;
				--xb-radio-outline-color: ${ token( 'color-white', 0 ) };

				${ transition( [ { property: 'color' }, { property: 'opacity' } ] ) };

				${ typography( 'body-2' ) };

				cursor: pointer;

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-2' ) };
				align-items: center;

				border: none;
				background: transparent;
				height: var( --xb-radio-height );

				${ p( token( 'spacing-0' ) ) };

				box-sizing: border-box;
			}

			:host( :is( [aria-checked='true'], [aria-checked='mixed'] ) ) .check {
				--xb-icon-color: ${ token( 'color-white' ) };

				border-color: ${ token( 'color-primary-300' ) };
				background-color: ${ token( 'color-primary-300' ) };
			}

			:host( [aria-checked='true'] ) xb-icon[name='circle'] {
				--xb-icon-size: 12px;
				display: inline-flex;
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

			:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) .check {
				--xb-radio-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			}

			slot[name='leading']::slotted( span ),
			slot[name='trailing']::slotted( span ) {
				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };
			}

			:host( :hover ) .check {
				border-color: ${ token( 'color-primary-500' ) };
			}

			:host( [aria-checked='true']:hover ) .check {
				border-color: ${ token( 'color-primary-500' ) };
				background-color: ${ token( 'color-primary-500' ) };
			}

			:host( :active ) .check {
				border-color: ${ token( 'color-primary-100' ) };
			}

			:host( [aria-checked='true']:active ) .check {
				border-color: ${ token( 'color-primary-100' ) };
				background-color: ${ token( 'color-primary-100' ) };
			}

			.check {
				${ transition( [
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'box-shadow' },
					{ property: 'outline' },
				] ) };

				${ outline( '--xb-radio-outline-color' ) };

				--xb-icon-color: ${ token( 'color-white', 0 ) };

				flex-shrink: 0;
				display: inline-flex;
				justify-content: center;
				align-items: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				border: 1px solid ${ token( 'color-gray-400' ) };
				background-color: ${ token( 'color-white' ) };
				border-radius: calc( 0.5 * var( --xb-radio-height ) );

				box-sizing: border-box;
				block-size: calc( 0.75 * var( --xb-radio-height ) );
				inline-size: calc( 0.75 * var( --xb-radio-height ) );
			}

			xb-icon[name='circle'] {
				--xb-icon-size: 0;

				display: none;
			}
		`,
		sizeStyles( { property: '--xb-radio-height' } ),
	];
}

export default styles;
