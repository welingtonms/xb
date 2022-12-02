import { css } from 'lit';

import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				min-width: 100%;
			}

			.menu {
				--xb-stack-padding-x: ${ token( 'spacing-0' ) };
				--xb-stack-padding-y: ${ token( 'spacing-2' ) };
				--xb-stack-gap: ${ token( 'spacing-0' ) };
				--xb-stack-min-width: 100%;

				--xb-stack-background-color: ${ token( 'color-white' ) };
			}
		`,
	];
}

export default styles;
