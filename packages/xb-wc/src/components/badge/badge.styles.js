import { css } from 'lit';

import token from '../../utils/get-token';
import color from '../../utils/get-color-token';
import { transition, typography, px, py } from '../../styles';

function styles() {
	return [
		css`
			:host {
				--xb-badge-color: ${ color( 'color-white' ) };
				--xb-badge-background-color: ${ color( 'color-gray-600' ) };
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
				--xb-badge-background-color: ${ color( 'color-primary-100' ) };
			}

			.-secondary {
				--xb-badge-background-color: ${ color( 'color-secondary-500' ) };
			}

			.-terciary {
				--xb-badge-background-color: ${ color( 'color-terciary-500' ) };
				--xb-badge-color: ${ color( 'color-black' ) };
			}
		`,
	];
}

export default styles;
