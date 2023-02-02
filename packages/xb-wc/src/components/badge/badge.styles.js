import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

function styles() {
	return [
		css`
			:host {
				--xb-badge-color: ${ token( 'color-white' ) };
				--xb-badge-background-color: ${ token( 'color-gray-600' ) };
			}

			.badge {
				${ transition( [ { property: 'background-color' }, { property: 'color' } ] ) };

				${ typography( 'caption' ) };
				${ px( token( 'spacing-4' ) ) };
				${ py( token( 'spacing-0' ) ) };

				display: inline-flex;
				align-items: center;
				justify-content: center;

				height: 24px;

				border-radius: 12px;

				color: var( --xb-badge-color );
				background-color: var( --xb-badge-background-color );
			}

			.-primary {
				--xb-badge-background-color: ${ token( 'color-primary-100' ) };
			}

			.-secondary {
				--xb-badge-background-color: ${ token( 'color-secondary-500' ) };
			}

			.-tertiary {
				--xb-badge-background-color: ${ token( 'color-tertiary-500' ) };
				--xb-badge-color: ${ token( 'color-black' ) };
			}
		`,
	];
}

export default styles;
