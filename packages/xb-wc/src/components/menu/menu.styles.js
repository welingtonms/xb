import { css } from 'lit';

import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				min-width: 100%;

				position: relative;
			}

			.menu {
				--xb-stack-padding-x: ${ token( 'spacing-0' ) };
				--xb-stack-padding-y: ${ token( 'spacing-1' ) };
				--xb-stack-gap: ${ token( 'spacing-0' ) };
				--xb-stack-min-width: 100%;
				--xb-stack-max-height: 10rem;
				--xb-stack-overflow-y: auto;

				--xb-stack-background-color: ${ token( 'color-white' ) };
			}

			.-bordered ::slotted( :not( :last-of-type ) ) {
				--xb-menu-item-border-style: dotted;
			}

			.-striped ::slotted( :nth-of-type( odd ) ) {
				--xb-menu-item-background-color: ${ token( 'color-gray-100' ) };
			}

			.spinner {
				position: absolute;
				top: 0;
			}
		`,
	];
}

export default styles;
