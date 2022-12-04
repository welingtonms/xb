import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
			:host {
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

				height: 100%;
				box-sizing: border-box;
			}

			.-striped ::slotted( :nth-of-type( odd ) ) {
				--xb-list-item-background-color: ${ token( 'color-gray-100' ) };
			}

			.-hoverable ::slotted( *:hover ) {
				cursor: pointer;
				--xb-list-item-background-color: ${ token( 'color-gray-200' ) };
			}
		`,
	];
}

export default styles;
