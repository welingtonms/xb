import { css } from 'lit';

import token from '../../utils/get-token';
import { px, py } from '../../styles/padding.styles';
import m from '../../styles/margin.styles';
import outline from '../../styles/outline.styles';

function styles() {
	return [
		css`
			:host {
				--xb-listbox-align: flex-start;
				--xb-listbox-background-color: ${ token( 'color-white' ) };
				--xb-listbox-border-color: ${ token( 'color-gray-300' ) };
				--xb-listbox-border-style: none;
				--xb-listbox-border-width: 1px;
				--xb-listbox-border-radius: unset;
				--xb-listbox-color: unset;
				--xb-listbox-gap: ${ token( 'spacing-0' ) };
				--xb-listbox-justify: flex-start;
				--xb-listbox-padding-x: ${ token( 'spacing-0' ) };
				--xb-listbox-padding-y: ${ token( 'spacing-1' ) };
				--xb-listbox-min-width: 100%;
				--xb-listbox-max-height: 10rem;
				--xb-listbox-overflow-y: auto;
				--xb-listbox-outline-color: ${ token( 'color-white', 0 ) };

				min-width: 100%;

				position: relative;

				${ m( 0 ) };
				${ px( 'var(--xb-listbox-padding-x)' ) };
				${ py( 'var(--xb-listbox-padding-y)' ) };

				display: flex;
				flex-direction: column;
				justify-content: var( --xb-listbox-justify );
				align-items: var( --xb-listbox-align );
				gap: var( --xb-listbox-gap );

				border: var( --xb-listbox-border-width ) var( --xb-listbox-border-style )
					var( --xb-listbox-border-color );
				border-radius: var( --xb-listbox-border-radius );
				color: var( --xb-listbox-color );
				background-color: var( --xb-listbox-background-color );

				min-width: var( --xb-listbox-min-width );

				max-height: var( --xb-listbox-max-height );
				overflow-y: var( --xb-listbox-overflow-y );

				${ outline( '--xb-listbox-outline-color' ) };
			}

			/* :host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				--xb-listbox-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			} */

			:host( [bordered] ) ::slotted( :not( :last-of-type ) ) {
				--xb-option-border-style: dotted;
			}

			.spinner {
				position: absolute;
				top: 0;
			}

			::slotted( * ) {
				margin-block: 0;
				width: 100%;
			}
		`,
	];
}

export default styles;
