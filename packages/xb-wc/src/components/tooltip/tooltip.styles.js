import { css } from 'lit';

import token from '../../utils/get-token';
import { floatingStyles } from '../../common/floating-element';

function styles() {
	return [
		floatingStyles(),
		css`
			:host {
				--xb-floating-background-color: ${ token( 'color-gray-800' ) };
				--xb-floating-color: ${ token( 'color-white' ) };
				--xb-floating-box-shadow: none;
			}
		`,
	];
}

export default styles;
