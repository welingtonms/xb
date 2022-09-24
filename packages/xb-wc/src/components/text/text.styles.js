import { css } from 'lit';

import { transition, typography } from '../../styles';

function styles() {
	return [
		css`
			.text {
				${ transition( [ { property: 'color' } ] ) };

				${ typography( 'body-1' ) };

				display: inline-flex;
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
		`,
	];
}

export default styles;
