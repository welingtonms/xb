import { css, unsafeCSS } from 'lit';

import getToken from '../../utils/get-token';

/**
 * @param {Object} options
 * @param {string} options.observedAttribute
 * @param {boolean} options.reverseToggle If `true`, the presence of the attribute will indicate that the expandable
 * element should be hidden.
 * @returns {import('lit').CSSResultArray}
 */
export function expandableHostStyles( options ) {
	const { observedAttribute, reverseToggle } = {
		observedAttribute: 'open',
		reverseToggle: false,
		...options,
	};

	return css`
		:host {
			--expandable-animation: none;
			--expandable-pointer-events: none;
		}

		:host(
				${ reverseToggle
						? unsafeCSS( `:not([${ observedAttribute }])` )
						: unsafeCSS( `[${ observedAttribute }]` ) }
			) {
			--expandable-pointer-events: auto;
		}

		@media ( prefers-reduced-motion: no-preference ) and ( min-width: ${ unsafeCSS(
				getToken( 'breakpoint-md' )
			) } ) {
			:host( .is-showing ) {
				--expandable-animation: show-expandable 0.2s ease forwards;
			}

			:host( .is-hiding ) {
				--expandable-animation: hide-expandable 0.25s ease forwards;
			}
		}
	`;
}

/**
 * @param {Object} options
 * @param {string} options.expandableSelector
 * @returns {import('lit').CSSResultArray}
 */
export function expandableElementStyles( options ) {
	const { expandableSelector } = {
		expandableSelector: ':host',
		...options,
	};

	return css`
		${ unsafeCSS( expandableSelector ) } {
			overflow: hidden;
			pointer-events: var( --expandable-pointer-events, none );

			/* interpolate-size: allow-keywords; */
		}

		@media ( prefers-reduced-motion: no-preference ) {
			${ unsafeCSS( expandableSelector ) } {
				animation: var( --expandable-animation, none );
			}
		}

		@keyframes show-expandable {
			from {
				opacity: 0;
				transform: translateY( -12px );
				filter: blur( 4px );
			}

			to {
				opacity: 1;
				transform: translateY( 0 );
				filter: blur( 0 );
			}
		}

		@keyframes hide-expandable {
			from {
				opacity: 1;
				transform: translateY( 0 );
				filter: blur( 0 );
			}

			to {
				opacity: 0;
				transform: translateY( -12px );
				filter: blur( 4px );
			}
		}
	`;
}

/**
 * @param {Object} selectors
 * @param {string} selectors.expandableSelector
 * @param {[string]} selectors.observedAttribute
 * @param {[boolean]} selectors.reverseToggle
 * @returns {import('lit').CSSResultArray}
 */
export function expandableStyles( selectors ) {
	const { expandableSelector, observedAttribute, reverseToggle } = {
		observedAttribute: 'open',
		reverseToggle: false,
		...selectors,
	};

	return [
		expandableHostStyles( { observedAttribute, reverseToggle } ),
		expandableElementStyles( {
			expandableSelector,
		} ),
	];
}
