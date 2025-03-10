import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import toCSSResult from '../../../utils/to-css-result';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [

		css`
			:host {
				--xb-stack-align: flex-start;
				--xb-stack-background-color: initial;
				--xb-stack-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-stack-border-style: none;
				--xb-stack-border-width: 1px;
				--xb-stack-border-radius: unset;
				--xb-stack-color: unset;
				--xb-stack-gap: ${ toCSSResult( 'spacing-2' ) };
				--xb-stack-justify: flex-start;
				--xb-stack-padding-x: ${ toCSSResult( 'spacing-2' ) };
				--xb-stack-padding-y: ${ toCSSResult( 'spacing-2' ) };

				${ m( toCSSResult( 'spacing-0' ) ) };

				width: 100%;

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
			}
		`,
		layoutStyles(),
	];
}

export default styles;
