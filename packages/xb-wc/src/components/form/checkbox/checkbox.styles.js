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
				--xb-checkbox-height: initial;
				/** https://accessibilityinsights.io/info-examples/web/needs-review/color-contrast/ */
				--xb-checkbox-background-color: ${ token( 'color-background' ) };
				--xb-checkbox-outline-color: ${ token( 'color-white', 0 ) };

				${ transition( [ { property: 'color' }, { property: 'opacity' } ] ) };

				${ typography( 'body-2' ) };

				cursor: pointer;

				display: flex;
				flex-flow: row nowrap;
				gap: ${ token( 'spacing-2' ) };
				align-items: center;

				border: none;
				background: var( --xb-checkbox-background-color );
				height: var( --xb-checkbox-height );

				${ p( token( 'spacing-0' ) ) };

				box-sizing: border-box;
			}

			:host( :is( [aria-checked='true'], [aria-checked='mixed'] ) ) .check {
				--xb-global-color: ${ token( 'color-white' ) };

				border-color: ${ token( 'color-primary-300' ) };
				background-color: ${ token( 'color-primary-300' ) };
			}

			:host( [aria-checked='true'] ) xb-icon[name='check'],
			:host( [aria-checked='mixed'] ) xb-icon[name='remove'] {
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
				--xb-checkbox-outline-color: ${ token( 'color-primary-200', 0.2 ) };
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

			:host( :is( [aria-checked='true']:hover, [aria-checked='mixed']:hover ) ) .check {
				border-color: ${ token( 'color-primary-500' ) };
				background-color: ${ token( 'color-primary-500' ) };
			}

			:host( :active ) .check {
				border-color: ${ token( 'color-primary-100' ) };
			}

			:host( :is( [aria-checked='true']:active [aria-checked='mixed']:active ) ) .check {
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

				${ outline( '--xb-checkbox-outline-color' ) };

				--xb-global-color: ${ token( 'color-white', 0 ) };

				flex-shrink: 0;
				display: inline-flex;
				justify-content: center;
				align-items: center;

				${ p( token( 'spacing-0' ) ) };
				${ m( token( 'spacing-0' ) ) };

				border: 1px solid ${ token( 'color-gray-400' ) };
				background-color: ${ token( 'color-white' ) };
				border-radius: 4px;

				box-sizing: border-box;
				block-size: calc( 0.75 * var( --xb-checkbox-height ) );
				inline-size: calc( 0.75 * var( --xb-checkbox-height ) );
			}

			xb-icon[name='check'],
			xb-icon[name='remove'] {
				display: none;
			}
		`,
		sizeStyles( { property: '--xb-checkbox-height' } ),
	];
}

export default styles;
