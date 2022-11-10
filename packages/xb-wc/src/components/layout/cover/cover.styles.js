import { css } from 'lit';

import { m, mx, px, py, typography } from '../../../styles';
import color from '../../../utils/get-color-token';
import layoutStyles from '../../../styles/layout.styles';
import token from '../../../utils/get-token';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-cover-background-color: initial;
				--xb-cover-border-color: ${ color( 'color-gray-300' ) };
				--xb-cover-border-style: none;
				--xb-cover-border-width: 1px;
				--xb-cover-color: unset;
				--xb-cover-gap: ${ token( 'spacing-4' ) };
				--xb-cover-padding-x: ${ token( 'spacing-2' ) };
				--xb-cover-padding-y: ${ token( 'spacing-2' ) };

				width: 100%;

				${ m( token( 'spacing-0' ) ) };
			}

			.cover {
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
				${ typography( 'body-1' ) };

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
