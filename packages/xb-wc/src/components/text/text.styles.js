import { css } from 'lit';

import m from '../../styles/margin.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

function styles() {
	return [
		css`
			:host {
				--xb-text-color: ${ token( 'color-gray-700' ) };

				${ transition( [ { property: 'color' } ] ) };

				display: inline-block;

				${ m( token( 'spacing-0' ) ) };

				color: var( --xb-text-color );
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

			:host( [variant='subtitle-1'] ) {
				${ typography( 'subtitle-1' ) };
			}

			:host( [variant='subtitle-2'] ) {
				${ typography( 'subtitle-2' ) };
			}

			:host( [variant='body-1'] ) {
				${ typography( 'body-1' ) };
			}

			:host( [variant='body-2'] ) {
				${ typography( 'body-2' ) };
			}

			:host( [variant='button'] ) {
				${ typography( 'button' ) };
			}

			:host( [variant='caption'] ) {
				${ typography( 'caption' ) };
			}

			:host( [variant='overline'] ) {
				${ typography( 'overline' ) };
			}
		`,
	];
}

export default styles;
