import { css } from 'lit';

import token from '../../utils/get-token';
import { popoverStyles } from '../../common/floating-element';

function styles() {
	return [
		popoverStyles(),
		css`
			:host {
				--xb-popover-background-color: ${ token( 'color-gray-800' ) };
				--xb-popover-color: ${ token( 'color-white' ) };
				--xb-popover-box-shadow: none;
			}
		`,
	];
}

export default styles;
