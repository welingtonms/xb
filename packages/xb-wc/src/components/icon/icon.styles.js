import { css } from 'lit';

import { when, transition, px, py, p, m, typography } from '../../styles';
import color from '../../utils/get-color-token';
import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--xb-icon-size: 16px;
				--xb-icon-color: var( --xb-global-color, inherit );

				display: inline-flex;
				align-items: center;
				justify-content: center;

				inline-size: var( --xb-icon-size );
				block-size: var( --xb-icon-size );
			}

			svg {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				${ transition( [ { property: 'color' }, { property: 'fill' } ] ) };

				inline-size: var( --xb-icon-size );
				block-size: var( --xb-icon-size );

				color: var( --xb-icon-color );
				fill: var( --xb-icon-color );
			}
		`,
	];
}

export default styles;
