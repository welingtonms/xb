import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

// experimenting with all styles in the same file
export function stepsStyles() {
	return [
		css`
			:host {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;

				width: 100%;
				gap: ${ token( 'spacing-8' ) };
			}
		`,
	];
}

export function stepStyles() {
	return [
		css`
			:host {
				--xb-steps-circle-size: 24px;

				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;

				gap: ${ token( 'spacing-4' ) };
			}

			.circle {
				display: flex;
				align-items: center;
				justify-content: center;

				inline-size: 24px;
				block-size: 24px;

				border-radius: 50%;

				--xb-icon-color: ${ token( 'color-white' ) };
				background-color: ${ token( 'color-gray-400' ) };
				color: ${ token( 'color-white' ) };
			}

			:host( :not( :last-child ) )::after,
			:host( :not( :first-child ) )::before {
				content: '';
				position: absolute;
				display: inline-block;

				block-size: 2px;
				inline-size: 50%;
				background-color: ${ token( 'color-gray-400' ) };

				top: 12px;
			}

			:host::after {
				/* half width of the container + half circle + half gap + halt distance between bar and circle */
				left: calc( 50% + 12px + 4px );
			}

			:host::before {
				right: calc( 50% + 12px + 4px );
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
		`,
	];
}
