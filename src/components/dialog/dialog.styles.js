import { css, unsafeCSS } from 'lit';

import getToken from '../../utils/get-token';
import toCSSResult from '../../utils/to-css-result';
import scrollbarStyles from '../../styles/scrollbar.styles';

export function dialogStyles() {
	return [
		css`
			:host {
				--xb-dialog-backdrop-color: ${ toCSSResult( 'color-gray-900', 0.25 ) };
				--xb-dialog-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-dialog-width: max-content;
				--xb-dialog-max-width: 75%;
				--xb-dialog-height: min-content;
				--xb-dialog-max-height: 90%;
				--xb-dialog-padding-x: 14px;
				--xb-dialog-padding-y: ${ toCSSResult( 'spacing-3' ) };
				--xb-dialog-border: none;
				--xb-dialog-border-radius: ${ toCSSResult( 'radius-md' ) };
				--xb-dialog-gap: ${ toCSSResult( 'spacing-4' ) };

				display: contents;
			}

			dialog {
				padding: 0;

				inline-size: var( --xb-dialog-width );
				max-inline-size: var( --xb-dialog-max-width );
				block-size: min( var( --xb-dialog-height ), var( --xb-dialog-max-height, 90vh ) );
				min-block-size: 0;
				max-block-size: var( --xb-dialog-max-height );

				border: var( --xb-dialog-border );
				border-top-left-radius: var( --xb-dialog-border-radius );
				border-top-right-radius: var( --xb-dialog-border-radius );
				border-bottom-left-radius: var( --xb-dialog-border-radius );
				border-bottom-right-radius: var( --xb-dialog-border-radius );
				background-color: var( --xb-dialog-background-color );
				box-shadow: ${ toCSSResult( 'shadow-3xl' ) };

				box-sizing: border-box;
			}

			dialog:open,
			dialog[open] {
				display: flex;
				flex-direction: column;
			}

			dialog::backdrop {
				background-color: var( --xb-dialog-backdrop-color );
			}

			@media ( min-width: ${ unsafeCSS( getToken( 'breakpoint-md' ) ) } ) {
				dialog {
					opacity: 0;
					transform: scale( 0.92 );
					transition:
						opacity 0.2s ease-out,
						transform 0.2s ease-out,
						overlay 0.2s ease-out allow-discrete,
						display 0.2s ease-out allow-discrete;
				}

				dialog:open,
				dialog[open] {
					opacity: 1;
					transform: scale( 1 );
				}

				@starting-style {
					dialog:open,
					dialog[open] {
						opacity: 0;
						transform: scale( 0.92 );
					}
				}

				dialog::backdrop {
					transition:
						display 0.2s allow-discrete,
						overlay 0.2s allow-discrete,
						background-color 0.2s;

					background-color: transparent;
				}

				dialog:open::backdrop,
				dialog[open]::backdrop {
					background-color: var( --xb-dialog-backdrop-color );
				}

				@starting-style {
					dialog:open::backdrop,
					dialog[open]::backdrop {
						background-color: transparent;
					}
				}
			}

			.container {
				display: flex;
				flex-direction: column;
				gap: var( --xb-dialog-gap );

				min-block-size: 0;
				width: 100%;

				flex: 1 1 0;
				height: 100%;
			}

			.header {
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
			}

			.close-button {
				margin-left: auto;
			}

			.body {
				display: flex;
				flex-direction: column;
				gap: var( --xb-dialog-gap );

				flex: 1 1 0;
				min-block-size: 0;
				overflow-y: auto;
				overscroll-behavior: contain;
			}

			.footer {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				gap: ${ toCSSResult( 'spacing-2' ) };
			}

			.container > * {
				padding-inline: var( --xb-dialog-padding-x );
				padding-block: 0;
			}

			.container > *:first-child {
				padding-inline: var( --xb-dialog-padding-x );
				padding-block: var( --xb-dialog-padding-y ) 0;
			}

			.container > *:last-child {
				padding-inline: var( --xb-dialog-padding-x );
				padding-block: 0 var( --xb-dialog-padding-y );
			}
		`,
		scrollbarStyles( '.body' ),
	];
}
