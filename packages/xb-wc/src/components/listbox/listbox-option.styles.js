import { css } from 'lit';

import menuItemStyles from '../menu/menu-item.styles';
import token from '../../utils/get-token';

function styles() {
	return [
		menuItemStyles(),
		css`
			.check {
				--xb-icon-color: ${ token( 'color-blue-600' ) };

				margin-left: auto;
				visibility: hidden;
			}

			:host( [aria-selected='true'] ) .check {
				visibility: visible;
			}
		`,
	];
}

export default styles;
