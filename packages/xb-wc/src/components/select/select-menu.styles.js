import { css } from 'lit';

import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
			}

			.select-menu {
				--xb-stack-padding-x: ${ token( 'spacing-0' ) };
				--xb-stack-padding-y: ${ token( 'spacing-2' ) };
				--xb-stack-gap: ${ token( 'spacing-0' ) };

				--xb-stack-background-color: ${ token( 'color-white' ) };
			}
		`,
	];
}

export default styles;
