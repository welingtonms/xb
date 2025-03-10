import { css } from 'lit';

import { select } from '../../styles/selector';
import outline from '../../styles/outline.styles';
import toCSSResult from '../../utils/to-css-result';

import transition from '../../styles/transition.styles';

export function menuHostStyles() {
	const $ = select( ':host' );

	return [
		css`
			${ $.css() } {
				--xb-menu-box-shadow: rgba( 0, 0, 0, 0.07 ) 0px 1px 1px, rgba( 0, 0, 0, 0.07 ) 0px 2px 2px,
					rgba( 0, 0, 0, 0.07 ) 0px 4px 4px, rgba( 0, 0, 0, 0.07 ) 0px 8px 8px,
					rgba( 0, 0, 0, 0.07 ) 0px 16px 16px;

				--xb-menu-z-index: 999;

				--xb-menu-align: flex-start;
				--xb-menu-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-menu-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-menu-border-style: solid;
				--xb-menu-border-width: 1px;
				--xb-menu-width: 32ch;
				--xb-menu-min-width: 16ch;
				--xb-menu-max-width: initial;
				--xb-menu-max-height: 10rem;

				--xb-menu-border-top-left-radius: 8px;
				--xb-menu-border-top-right-radius: 8px;
				--xb-menu-border-bottom-right-radius: 8px;
				--xb-menu-border-bottom-left-radius: 8px;
				--xb-menu-color: unset;
				--xb-menu-gap: 0;
				--xb-menu-justify: flex-start;
				--xb-menu-padding-x: 0;
				--xb-menu-padding-y: 0;

				--xb-menu-overflow-y: auto;
				--xb-menu-outline-color: ${ toCSSResult( 'color-white', 0 ) };
			}

			/* :host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				--xb-menu-outline-color: ${ toCSSResult( 'color-primary-200', 0.2 ) };
			} */

			${ $.attr( 'bordered' ).css() } ::slotted( :not( :last-of-type ) ) {
				--xb-option-border-style: dotted;
			}

			::slotted( * ) {
				margin-block: 0;
				width: 100%;
			}
		`,
	];
}

export function menuContentStyles( selector ) {
	const $ = select( selector );

	return [
		css`
			${ $.css() } {
				${ transition( [ { property: 'box-shadow' } ] ) };

				min-width: 100%;

				margin: 0;
				padding-inline: var( --xb-menu-padding-x );
				padding-block: var( --xb-menu-padding-y );

				display: flex;
				flex-direction: column;
				justify-content: var( --xb-menu-justify );
				align-items: var( --xb-menu-align );
				gap: var( --xb-menu-gap );

				border-width: var( --xb-menu-border-width );
				border-style: var( --xb-menu-border-style );
				border-color: var( --xb-menu-border-color );
				border-top-left-radius: var( --xb-floating-border-top-left-radius );
				border-top-right-radius: var( --xb-menu-border-top-right-radius );
				border-bottom-right-radius: var( --xb-menu-border-bottom-right-radius );
				border-bottom-left-radius: var( --xb-menu-border-bottom-left-radius );

				color: var( --xb-menu-color );
				background-color: var( --xb-menu-background-color );

				inline-size: var( --xb-menu-width );
				min-inline-size: var( --xb-menu-min-width );
				max-inline-size: var( --xb-menu-max-width );

				max-height: var( --xb-menu-max-height );
				overflow-y: var( --xb-menu-overflow-y );

				box-shadow: var( --xb-menu-box-shadow );
				z-index: var( --xb-menu-z-index );

				${ outline( 'var(--xb-menu-outline-color)', 'var(--xb-menu-outline-offset)' ) };
			}
		`,
	];
}

function styles( selector = ':host' ) {
	const $ = select( selector );

	return [ menuHostStyles(), menuContentStyles( selector ) ];
}

export default styles;
