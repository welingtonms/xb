import { css } from 'lit';

import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				display: contents;
			}

			.tooltip {
				--xb-popover-background-color: ${ token( 'color-gray-800' ) };
				--xb-popover-color: ${ token( 'color-white' ) };
				--xb-popover-box-shadow: none;
			}

			.content {
				/* Placeholder */
			}
		`,
	];
}

export default styles;
