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
			}

			.-h-1 {
				${ typography( 'h-1' ) };
			}

			.-h-2 {
				${ typography( 'h-2' ) };
			}

			.-h-3 {
				${ typography( 'h-3' ) };
			}

			.-h-4 {
				${ typography( 'h-4' ) };
			}

			.-h-5 {
				${ typography( 'h-5' ) };
			}

			.-h-6 {
				${ typography( 'h-6' ) };
			}

			.-subtitle-1 {
				${ typography( 'subtitle-1' ) };
			}

			.-subtitle-2 {
				${ typography( 'subtitle-2' ) };
			}

			.-body-1 {
				${ typography( 'body-1' ) };
			}

			.-body-2 {
				${ typography( 'body-2' ) };
			}

			.-button {
				${ typography( 'button' ) };
			}

			.-caption {
				${ typography( 'caption' ) };
			}

			.-overline {
				${ typography( 'overline' ) };
			}

			.text {
				${ transition( [ { property: 'color' } ] ) };

				display: inline-block;

				${ m( token( 'spacing-0' ) ) };

				color: var( --xb-text-color );
			}
		`,
	];
}

export default styles;
