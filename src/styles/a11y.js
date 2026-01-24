import { css, unsafeCSS } from 'lit';

/**
 * Visually hide an element.
 *
 * @see https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034
 * @returns {import('lit').CSSResult}
 */
export function visuallyHidden( selector = '.sr-only' ) {
	return css`
		${ unsafeCSS( selector ) },
		${ unsafeCSS( `${ selector }:not(:focus, :focus-within)` ) } {
			border: 0;
			clip: rect( 0, 0, 0, 0 );
			height: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
			white-space: nowrap;
			width: 1px;
		}
	`;
}

/**
 * Apply the given styles only when the user has NOT requested reduced motion.
 * Styles inside this block will be skipped for users who prefer reduced motion.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 * @returns {import('lit').CSSResult}
 */
export function prefersReducedMotion( content ) {
	return css`
		@media ( prefers-reduced-motion: no-preference ) {
			${ unsafeCSS( content ) };
		}
	`;
}
