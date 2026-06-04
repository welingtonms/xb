import { css, unsafeCSS } from 'lit';

import { dialogStyles } from '../dialog';
import getToken from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import toCSSResult from '../../utils/to-css-result';

export function drawerStyles() {
	return [
		dialogStyles(),
		css`
			:host {
				--xb-dialog-height: 100%;
				--xb-dialog-max-height: 100vh;
				--xb-dialog-width: 50%;
				--xb-dialog-max-width: 90%;
			}

			dialog {
				margin-inline-end: 0;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}

			.header {
				flex-grow: 0;
				flex-shrink: 0;
			}

			.body {
				flex-grow: 1;
				flex-shrink: 1;
			}

			.footer {
				flex-grow: 0;
				flex-shrink: 0;
			}

			@media ( min-width: ${ unsafeCSS( getToken( 'breakpoint-md' ) ) } ) {
				dialog {
					opacity: 0;
					transform: translateX( 150% );
					transition:
						opacity 0.35s ease-out,
						transform 0.35s ease-out,
						overlay 0.35s ease-out allow-discrete,
						display 0.35s ease-out allow-discrete;
				}

				dialog:open,
				dialog[open] {
					opacity: 1;
					transform: translateX( 0 );
				}

				@starting-style {
					dialog:open,
					dialog[open] {
						opacity: 0;
						transform: translateX( 150% );
					}
				}
			}
		`,
	];
}
