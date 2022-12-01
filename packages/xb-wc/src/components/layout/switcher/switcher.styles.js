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
				--xb-switcher-background-color: initial;
				--xb-switcher-border-color: ${ token( 'color-gray-300' ) };
				--xb-switcher-border-style: none;
				--xb-switcher-border-width: 1px;
				--xb-switcher-color: unset;
				--xb-switcher-gap: ${ token( 'spacing-4' ) };
				--xb-switcher-padding-x: ${ token( 'spacing-2' ) };
				--xb-switcher-padding-y: ${ token( 'spacing-2' ) };
				--xb-switcher-threshold: 1000px;

				width: 100%;

				${ m( token( 'spacing-0' ) ) };
			}

			.switcher {
				${ px( 'var(--xb-switcher-padding-x)' ) };
				${ py( 'var(--xb-switcher-padding-y)' ) };

				display: flex;
				flex-wrap: wrap;
				gap: var( --xb-switcher-gap );

				border: var( --xb-switcher-border-width )
					var( --xb-switcher-border-style ) var( --xb-switcher-border-color );
				color: var( --xb-switcher-color );
				background-color: var( --xb-switcher-background-color );
			}

			::slotted( * ) {
				${ typography( 'body-1' ) };

				flex-grow: 1;
				flex-basis: calc( ( var( --xb-switcher-threshold ) - 100% ) * 999 );
			}
		`,
	];
}

export default styles;
