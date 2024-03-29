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
				--xb-cluster-align: center;
				--xb-cluster-background-color: initial;
				--xb-cluster-border-color: ${ token( 'color-gray-300' ) };
				--xb-cluster-border-style: none;
				--xb-cluster-border-width: 1px;
				--xb-cluster-border-radius: 0;
				--xb-cluster-color: unset;
				--xb-cluster-gap: ${ token( 'spacing-2' ) };
				--xb-cluster-justify: flex-start;
				--xb-cluster-padding-x: ${ token( 'spacing-2' ) };
				--xb-cluster-padding-y: ${ token( 'spacing-2' ) };
				--xb-cluster-width: auto;

				width: 100%;

				${ m( token( 'spacing-0' ) ) };

				${ px( 'var(--xb-cluster-padding-x)' ) };
				${ py( 'var(--xb-cluster-padding-y)' ) };

				display: flex;
				flex-flow: row wrap;
				justify-content: var( --xb-cluster-justify );
				align-items: var( --xb-cluster-align );
				gap: var( --xb-cluster-gap );
				width: var( --xb-cluster-width );

				border: var( --xb-cluster-border-width ) var( --xb-cluster-border-style )
					var( --xb-cluster-border-color );
				border-radius: var( --xb-cluster-border-radius );
				color: var( --xb-cluster-color );
				background-color: var( --xb-cluster-background-color );
			}

			::slotted( * ) {
				margin-inline: 0;
			}
		`,
	];
}

export default styles;
