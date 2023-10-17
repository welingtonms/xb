import { css } from 'lit';

import p from '../../styles/padding.styles';
// import transition from '../../../styles/transition.styles';
import outline from '../../styles/outline.styles';
import token from '../../utils/get-token';

export function styles() {
	return css`
		:host {
		}

		dialog {
			margin: auto;
			${ p( token( 'spacing-2' ) ) };

			border: 1px solid ${ token( 'color-white', 0 ) };
			border-radius: 8px;

			${ outline( '--xb-dialog-outline-color' ) };
		}

		dialog:is( :focus, :focus-visible ) {
			--xb-dialog-outline-color: ${ token( 'color-primary-200', 0.2 ) };
		}

		dialog[open] {
			display: flex;
			flex-direction: column;

			/* overflow: visible; */
		}

		dialog::backdrop {
		}

		dialog[open] {
			animation: show-dialog 0.25s ease forwards;
		}

		dialog:not( [open] ) {
			animation: hide-dialog 0.25s ease forwards;
		}

		dialog[open]::backdrop {
			animation: show-backdrop 0.25s ease forwards;
		}

		dialog:not( [open] )::backdrop {
			animation: hide-backdrop 0.25s ease forwards;
		}

		@keyframes show-dialog {
			from {
				opacity: 0;
				transform: translateY( 250px );
			}
		}

		@keyframes hide-dialog {
			to {
				opacity: 0;
				transform: scale( 0.75 );
			}
		}

		@keyframes show-backdrop {
			from {
				opacity: 0;
			}
		}

		@keyframes hide-backdrop {
			to {
				opacity: 0;
			}
		}
	`;
}
