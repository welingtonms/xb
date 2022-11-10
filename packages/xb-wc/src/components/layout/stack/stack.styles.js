import { css } from 'lit';

import { m, px, py, typography } from '../../../styles';
import color from '../../../utils/get-color-token';
import layoutStyles from '../../../styles/layout.styles';
import token from '../../../utils/get-token';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-stack-align: flex-start;
				--xb-stack-background-color: initial;
				--xb-stack-border-color: ${ color( 'color-gray-300' ) };
				--xb-stack-border-style: none;
				--xb-stack-border-width: 1px;
				--xb-stack-color: unset;
				--xb-stack-gap: ${ token( 'spacing-2' ) };
				--xb-stack-justify: flex-start;
				--xb-stack-padding-x: ${ token( 'spacing-2' ) };
				--xb-stack-padding-y: ${ token( 'spacing-2' ) };

				${ m( token( 'spacing-0' ) ) };

				width: 100%;
			}

			.stack {
				${ px( 'var(--xb-stack-padding-x)' ) };
				${ py( 'var(--xb-stack-padding-y)' ) };

				display: flex;
				flex-direction: column;
				justify-content: var( --xb-stack-justify );
				align-items: var( --xb-stack-align );
				/* gap: var( --xb-stack-gap ); */

				border: var( --xb-stack-border-width ) var( --xb-stack-border-style )
					var( --xb-stack-border-color );
				color: var( --xb-stack-color );
				background-color: var( --xb-stack-background-color );
			}

			::slotted( * ) {
				${ typography( 'body-1' ) };

				margin-block: 0;
				width: 100%;
			}

			::slotted( *:not( :first-child ) ) {
				margin-block-start: var( --xb-stack-gap );
			}
		`,
	];
}

export default styles;
