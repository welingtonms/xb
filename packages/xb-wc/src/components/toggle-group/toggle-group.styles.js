import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import m from '../../styles/margin.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import outline from '../../styles/outline.styles';

function styles() {
	return [
		css`
			:host {
				--xb-toggle-group-align: center;
				--xb-toggle-group-background-color: initial;
				--xb-toggle-group-border-color: ${ token( 'color-primary-500' ) };
				--xb-toggle-group-border-radius: 4px;
				--xb-toggle-group-border-style: solid;
				--xb-toggle-group-border-width: 1px;
				--xb-toggle-group-color: unset;
				--xb-toggle-group-gap: ${ token( 'spacing-2' ) };
				--xb-toggle-group-justify: flex-start;
				--xb-toggle-group-padding-x: 2px;
				--xb-toggle-group-padding-y: 2px;
				--xb-toggle-group-width: max-content;
				--xb-toggle-group-outline-color: ${ token( 'color-white', 0 ) };

				${ m( token( 'spacing-0' ) ) };
				${ px( 'var(--xb-toggle-group-padding-x)' ) };
				${ py( 'var(--xb-toggle-group-padding-y)' ) };
				${ transition( [ { property: 'border-color' } ] ) };

				display: flex;
				flex-flow: row wrap;
				justify-content: var( --xb-toggle-group-justify );
				align-items: var( --xb-toggle-group-align );
				gap: var( --xb-toggle-group-gap );
				width: var( --xb-toggle-group-width );

				border: var( --xb-toggle-group-border-width )
					var( --xb-toggle-group-border-style ) var( --xb-toggle-group-border-color );
				border-radius: var( --xb-toggle-group-border-radius );
				color: var( --xb-toggle-group-color );
				background-color: var( --xb-toggle-group-background-color );

				${ outline( '--xb-toggle-group-outline-color' ) };
			}

			::slotted( * ) {
				margin-inline: 0;
			}

			:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				--xb-toggle-group-border-color: ${ token( 'color-primary-300' ) };
			}

			:host( :is( [selection='single'], [selection='single-strict'] ) ) {
				--xb-toggle-group-gap: ${ token( 'spacing-0' ) };
			}

			:host( [selection='multiple'] ) {
				--xb-toggle-group-gap: 2px;
			}
		`,
	];
}

export default styles;
