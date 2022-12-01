import { css } from 'lit';

import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
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
