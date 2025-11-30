import { css, unsafeCSS } from 'lit';

export function floatingHostStyles() {
	return [
		css`
			:host {
				--xb-floating-top: 0;
				--xb-floating-left: 0;
				--xb-floating-position: unset;
			}

			:host( [position='absolute'] ) {
				--xb-floating-position: absolute;
			}

			:host( [position='fixed'] ) {
				--xb-floating-position: fixed;
			}
		`,
	];
}

/**
 * @param {Object} selectors
 * @param {string} selectors.floatingSelector - selector for the floating element.
 * @returns {import('lit').CSSResultArray}
 */
export function floatingElementStyles( selectors ) {
	return [
		css`
			${ unsafeCSS( selectors.floatingSelector ) } {
				top: var( --xb-floating-top, 0 );
				left: var( --xb-floating-left, 0 );

				position: var( --xb-floating-position, initial );
			}
		`,
	];

	// :host(:not([open])) ${unsafeCSS(selectors.floating)} {
	// 	display: none;
	// }
}

/**
 * PS: Applying styles from the parent element to the floating element
 * because :host-context is not supported in Firefox
 * @param {Object} selectors
 * @param {string} selectors.floatingSelector - selector for the floating element.
 * @returns
 */
function styles( selectors ) {
	return [ floatingHostStyles(), floatingElementStyles( selectors ) ];
}

export default styles;
