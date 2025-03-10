import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import toCSSResult from '../../../utils/to-css-result';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-cover-background-color: initial;
				--xb-cover-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-cover-border-style: none;
				--xb-cover-border-width: 1px;
				--xb-cover-color: unset;
				--xb-cover-gap: ${ toCSSResult( 'spacing-4' ) };
				--xb-cover-padding-x: ${ toCSSResult( 'spacing-2' ) };
				--xb-cover-padding-y: ${ toCSSResult( 'spacing-2' ) };

				width: 100%;

				${ m( toCSSResult( 'spacing-0' ) ) };

				${ px( 'var(--xb-cover-padding-x)' ) };
				${ py( 'var(--xb-cover-padding-y)' ) };

				display: flex;
				flex-direction: column;
				min-block-size: 100vh;

				border: var( --xb-cover-border-width ) var( --xb-cover-border-style )
					var( --xb-cover-border-color );
				color: var( --xb-cover-color );
				background-color: var( --xb-cover-background-color );
			}

			::slotted( * ) {
				${ typography( 'text-md' ) };

				margin-block: var( --xb-cover-gap );
			}

			::slotted( :first-child:not( .-cover-centered ) ) {
				margin-inline-start: 0;
			}

			::slotted( :last-child:not( .-cover-centered ) ) {
				margin-inline-end: 0;
			}

			::slotted( .-cover-centered ) {
				margin-block: auto;
			}
		`,
	];
}

export default styles;
