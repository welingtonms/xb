import { css } from 'lit';

import m from '../../styles/margin.styles';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

export function textStyles() {
	return [
		css`
			:host {
				--xb-text-color: inherit;
				--xb-text-max-width: 100%;

				${ transition( [ { property: 'color' } ] ) };

				display: inline-block;

				${ m( toCSSResult( 'spacing-0' ) ) };

				color: var( --xb-text-color );
				font-weight: inherit;

				min-inline-size: 0;
				min-width: 0;
			}

			:host( [variant='h-1'] ) {
				${ typography( 'h-1' ) };
			}

			:host( [variant='h-2'] ) {
				${ typography( 'h-2' ) };
			}

			:host( [variant='h-3'] ) {
				${ typography( 'h-3' ) };
			}

			:host( [variant='h-4'] ) {
				${ typography( 'h-4' ) };
			}

			:host( [variant='h-5'] ) {
				${ typography( 'h-5' ) };
			}

			:host( [variant='h-6'] ) {
				${ typography( 'h-6' ) };
			}

			:host( [variant='text-xs'] ) {
				${ typography( 'text-xs' ) };
			}

			:host( [variant='text-sm'] ) {
				${ typography( 'text-sm' ) };
			}

			:host( [variant='text-md'] ) {
				${ typography( 'text-md' ) };
			}

			:host( [variant='text-lg'] ) {
				${ typography( 'text-lg' ) };
			}

			:host( [variant='text-xl'] ) {
				${ typography( 'text-xl' ) };
			}

			.text-container {
				vertical-align: middle;
			}

			:host( [ellipsize] ) .text-container {
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				max-inline-size: var( --xb-text-max-width );
			}
		`,
	];
}
