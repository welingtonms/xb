import { css } from 'lit';

import { when, m, p, px, py, transition, typography } from '../../styles';
import token from '../../utils/get-token';
import color from '../../utils/get-color-token';

function styles() {
	return [
		css`
			:host {
			}

			.dropdown-menu {
				--xb-stack-padding-x: ${ token( 'spacing-0' ) };
				--xb-stack-padding-y: ${ token( 'spacing-2' ) };
				--xb-stack-gap: ${ token( 'spacing-0' ) };

				--xb-stack-background-color: ${ color( 'color-white' ) };
			}
		`,
	];
}

export default styles;
