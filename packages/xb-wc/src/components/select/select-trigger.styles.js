import { css } from 'lit';

import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
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
