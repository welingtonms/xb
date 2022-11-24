import { css } from 'lit';

import { when, m, p, px, py, transition, typography } from '../../styles';

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
