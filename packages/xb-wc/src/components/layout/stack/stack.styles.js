import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import token from '../../../utils/get-token';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-stack-align: flex-start;
				--xb-stack-background-color: initial;
				--xb-stack-border-color: ${ token( 'color-gray-300' ) };
				--xb-stack-border-style: none;
				--xb-stack-border-width: 1px;
				--xb-stack-border-radius: unset;
				--xb-stack-color: unset;
				--xb-stack-gap: ${ token( 'spacing-2' ) };
				--xb-stack-justify: flex-start;
				--xb-stack-padding-x: ${ token( 'spacing-2' ) };
				--xb-stack-padding-y: ${ token( 'spacing-2' ) };
				--xb-stack-min-width: initial;

				${ m( token( 'spacing-0' ) ) };

				min-width: var( --xb-stack-min-width );
				width: 100%;
			}

			.stack {
				${ m( 0 ) };
				${ px( 'var(--xb-stack-padding-x)' ) };
				${ py( 'var(--xb-stack-padding-y)' ) };

				display: flex;
				flex-direction: column;
				justify-content: var( --xb-stack-justify );
				align-items: var( --xb-stack-align );
				gap: var( --xb-stack-gap );

				border: var( --xb-stack-border-width ) var( --xb-stack-border-style )
					var( --xb-stack-border-color );
				border-radius: var( --xb-stack-border-radius );
				color: var( --xb-stack-color );
				background-color: var( --xb-stack-background-color );

				min-width: var( --xb-stack-min-width );
			}

			::slotted( * ) {
				${ typography( 'body-1' ) };

				margin-block: 0;
				width: 100%;
			}

			::slotted( *:not( :first-child ) ) {
				/** using flexbox gap */
				/* margin-block-start: var( --xb-stack-gap ); */
			}
		`,
	];
}

export default styles;
