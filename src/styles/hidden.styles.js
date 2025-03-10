import { css } from 'lit';

/**
 * Apply right margin.
 * @param {unknown} margin
 */
export function hidden( selector ) {
	return css`
		${ selector } {
			position: absolute !important;
			width: 1px !important;
			height: 1px !important;
			margin: -1px !important;
			padding: 0 !important;
			overflow: hidden !important;
			white-space: nowrap !important;
			border: 0 !important;
			clip: rect( 0 0 0 0 ) !important;
			clip-path: inset( 50% ) !important;
			pointer-events: none;
		}
	`;
}
