import { css } from 'lit';

import outline from '../../styles/outline.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

// experimenting with all styles in the same file
export function stepsStyles() {
	return [
		css`
			:host {
				--xb-steps-circle-size: 24px;
				--xb-steps-circle-outline-color: ${ token( 'color-white', 0 ) };

				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;

				width: 100%;
				gap: ${ token( 'spacing-10' ) };
			}

			::slotted( xb-step ) {
				flex: 1;
			}
		`,
	];
}

export function stepStyles() {
	return [
		css`
			:host {
				position: relative;
				display: inline-flex;
				flex-direction: column;
				align-items: center;

				gap: ${ token( 'spacing-4' ) };
			}

			:host( :is( :focus, :focus-within, :focus-visible ) ) {
				outline: none;
			}

			.circle {
				${ typography( 'body-2' ) };
				${ transition( [ { property: 'background-color' }, { property: 'outline-color' } ] ) };
				${ outline( '--xb-steps-circle-outline-color' ) };

				display: flex;
				align-items: center;
				justify-content: center;

				inline-size: var( --xb-steps-circle-size );
				block-size: var( --xb-steps-circle-size );
				line-height: var( --xb-steps-circle-size );

				border-radius: 50%;

				--xb-global-color: ${ token( 'color-white' ) };
				background-color: ${ token( 'color-gray-400' ) };
				color: ${ token( 'color-white' ) };
			}

			:host( :not( :last-child ) )::after,
			:host( :not( :first-child ) )::before {
				${ transition( [ { property: 'background-color' } ] ) };

				content: '';
				position: absolute;
				display: inline-block;

				block-size: 2px;
				inline-size: 50%;
				background-color: ${ token( 'color-gray-400' ) };

				top: calc( var( --xb-steps-circle-size ) / 2 );
			}

			:host::after {
				/* half width of the container + half circle + half distance between bar and circle */
				left: calc( 50% + var( --xb-steps-circle-size ) / 2 + 8px );
			}

			:host::before {
				right: calc( 50% + var( --xb-steps-circle-size ) / 2 + 8px );
			}

			:host( [completed] )::after {
				background-color: ${ token( 'color-primary-500' ) };
			}

			:host( :is( [completed], [active] ) )::before {
				background-color: ${ token( 'color-primary-500' ) };
			}

			xb-icon[name='check'] {
				display: none;
			}

			slot:not( [name] ) {
				display: none;
			}

			:host( [completed] ) xb-icon[name='check'] {
				display: inline-flex;
			}

			:host( :is( [active], [completed] ) ) .circle {
				background-color: ${ token( 'color-primary-500' ) };
			}

			:host( :is( [active], :not( [completed] ) ) ) slot:not( [name] ) {
				display: inline-flex;
			}

			:host( :is( :focus, :focus-within, :focus-visible ) ) .circle {
				--xb-steps-circle-outline-color: ${ token( 'color-primary-200', 0.2 ) };
			}
		`,
	];
}
