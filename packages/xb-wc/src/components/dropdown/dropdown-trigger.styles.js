import { css } from 'lit';

import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
			.dropdown-trigger {
				--xb-button-padding-x: ${ token( 'spacing-4' ) };
			}

			.indicator {
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
