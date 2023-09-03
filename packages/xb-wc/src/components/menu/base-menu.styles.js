import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import m from '../../styles/margin.styles';
import outline from '../../styles/outline.styles';
import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--xb-menu-align: flex-start;
				--xb-menu-background-color: ${ token( 'color-white' ) };
				--xb-menu-border-color: ${ token( 'color-gray-300' ) };
				--xb-menu-border-style: none;
				--xb-menu-border-width: 1px;
				--xb-menu-border-radius: unset;
				--xb-menu-color: unset;
				--xb-menu-gap: ${ token( 'spacing-0' ) };
				--xb-menu-justify: flex-start;
				--xb-menu-padding-x: ${ token( 'spacing-0' ) };
				--xb-menu-padding-y: ${ token( 'spacing-1' ) };
				--xb-menu-min-width: 100%;
				--xb-menu-max-height: 10rem;
				--xb-menu-overflow-y: auto;
				--xb-menu-outline-color: ${ token( 'color-white', 0 ) };

				min-width: 100%;

				position: relative;

				${ m( 0 ) };
				${ px( 'var(--xb-menu-padding-x)' ) };
				${ py( 'var(--xb-menu-padding-y)' ) };

				display: flex;
				flex-direction: column;
				justify-content: var( --xb-menu-justify );
				align-items: var( --xb-menu-align );
				gap: var( --xb-menu-gap );

				border: var( --xb-menu-border-width ) var( --xb-menu-border-style )
					var( --xb-menu-border-color );
				border-radius: var( --xb-menu-border-radius );
				color: var( --xb-menu-color );
				background-color: var( --xb-menu-background-color );

				min-width: var( --xb-menu-min-width );

				max-height: var( --xb-menu-max-height );
				overflow-y: var( --xb-menu-overflow-y );

				${ outline( '--xb-menu-outline-color' ) };
			}

			/* :host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				--xb-menu-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			} */

			:host( [bordered] ) ::slotted( :not( :last-of-type ) ) {
				--xb-option-border-style: dotted;
			}

			::slotted( * ) {
				margin-block: 0;
				width: 100%;
			}
		`,
	];
}

export default styles;
