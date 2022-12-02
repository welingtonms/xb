import { css } from 'lit';

import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
			.select-trigger {
				--xb-text-placeholder-color: ${ token( 'color-gray-700' ) };
			}

			.indicator {
				/* --xb-icon-color: ${ token( 'color-gray-600' ) }; */

				${ transition( [
					{
						property: 'transform',
					},
				] ) };
			}

			.indicator.is-open {
				transform: rotate( 180deg );
			}
		`,
	];
}

export default styles;
