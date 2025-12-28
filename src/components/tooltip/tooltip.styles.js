import { css } from 'lit';

import { floatingStyles } from '../floating-element';
import toCSSResult from '../../utils/to-css-result';
import typography from '../../styles/typography.styles';
import transition from '../../styles/transition.styles';

function styles() {
	return [
		floatingStyles( {
			floatingSelector: ':host',
		} ),
		css`
			:host {
				--distance: 1em;

				--m-tooltip-min-width: 80px;
				--m-tooltip-max-width: 240px;

				/* position: absolute; */
				/* position-area: top; */
				/* position-try-fallbacks: flip-block; */
				/* bottom: var( --distance ); */
			}

			#bubble {
				${ typography( 'text-sm' ) };
				display: inline-flex;
				background-color: ${ toCSSResult( 'color-gray-800' ) };
				color: ${ toCSSResult( 'color-white' ) };

				display: inline-block;
				min-height: 24px;
				width: max-content;
				max-width: 40ch;
				padding: ${ toCSSResult( 'spacing-2' ) };

				padding-inline: ${ toCSSResult( 'spacing-4' ) };
				padding-block: ${ toCSSResult( 'spacing-2' ) };
				margin: 0;

				box-sizing: border-box;
				inline-size: max-content;
				min-inline-size: var( --m-tooltip-min-width );
				max-inline-size: var( --m-tooltip-max-width );

				overflow-x: visible;
				overflow-y: visible;

				border: none;
				border-radius: ${ toCSSResult( 'radius-md' ) };

				background-color: ${ toCSSResult( 'color-gray-800' ) };
				color: ${ toCSSResult( 'color-white' ) };
			}

			@media ( prefers-reduced-motion: no-preference ) {
				:host {
					${ transition( [
						{
							property: 'opacity',
							duration: '150ms',
							easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
						},
						{
							property: 'transform',
							duration: '150ms',
							easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
						},
					] ) };

					animation: 150ms ease-in-out forwards;

					will-change: transform, opacity, filter;
				}

				:host( [open] ) {
					animation-name: pop-in;
				}

				:host( .is-closing ) {
					animation-name: pop-out;
				}
			}

			:host( [placement^='top'] ) {
				--xb-tooltip-initial-transform: translateY( 8px );
			}

			:host( [placement^='bottom'] ) {
				--xb-tooltip-initial-transform: translateY( -8px );
			}

			:host( [placement^='left'] ) {
				--xb-tooltip-initial-transform: translateX( 8px );
			}

			:host( [placement^='right'] ) {
				--xb-tooltip-initial-transform: translateX( -8px );
			}

			@keyframes pop-in {
				from {
					filter: blur( 8px );
					opacity: 0;
					transform: var( --xb-tooltip-initial-transform, translateY( 8px ) );
				}

				to {
					filter: blur( 0 );
					opacity: 1;
					transform: translate( 0 );
				}
			}

			@keyframes pop-out {
				from {
					filter: blur( 0 );
					opacity: 1;
					transform: translate( 0 );
				}

				to {
					filter: blur( 8px );
					opacity: 0;
					transform: var( --xb-tooltip-initial-transform, translateY( 8px ) );
				}
			}
		`,
	];
}

export default styles;
