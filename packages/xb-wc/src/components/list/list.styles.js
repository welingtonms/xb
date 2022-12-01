import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
			:host {
				--xb-list-item-background-color: initial;
				--xb-list-item-border-color: ${ token( 'color-gray-300' ) };
				--xb-list-item-border-style: none;
				--xb-list-item-border-width: 1px;
				--xb-list-item-color: unset;
				--xb-list-item-gap: ${ token( 'spacing-2' ) };
				--xb-list-item-padding-x: ${ token( 'spacing-4' ) };
				--xb-list-item-padding-y: ${ token( 'spacing-2' ) };
			}

			.list {
				--xb-stack-padding-x: ${ token( 'spacing-0' ) };
				--xb-stack-padding-y: ${ token( 'spacing-0' ) };
				--xb-stack-gap: ${ token( 'spacing-0' ) };

				--xb-stack-background-color: ${ token( 'color-white' ) };
			}

			::slotted( * ) {
				${ transition( [
					{
						property: 'background-color',
					},
					{
						property: 'color',
					},
				] ) };

				${ px( 'var(--xb-list-item-padding-x)' ) };
				${ py( 'var(--xb-list-item-padding-y)' ) };

				border-bottom: var( --xb-list-item-border-width )
					var( --xb-list-item-border-style ) var( --xb-list-item-border-color );
				color: var( --xb-list-item-color );
				background-color: var( --xb-list-item-background-color );

				height: 100%;
				box-sizing: border-box;
			}

			.-striped ::slotted( :nth-of-type( odd ) ) {
				--xb-list-item-background-color: ${ token( 'color-gray-100' ) };
				--xb-list-item-border-style: dotted;
			}

			.-hoverable ::slotted( *:hover ) {
				cursor: pointer;
				--xb-list-item-background-color: ${ token( 'color-gray-200' ) };
			}
		`,
	];
}

export default styles;
