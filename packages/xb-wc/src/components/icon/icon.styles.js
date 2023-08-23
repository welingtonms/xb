import { css } from 'lit';

import transition from '../../styles/transition.styles';

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
				${ transition( [
					{ property: 'color' },
					{ property: 'fill' },
					{ property: 'inline-size', duration: '.75s' },
					{ property: 'block-size', duration: '.75s' },
				] ) };

				inline-size: var( --xb-icon-size );
				block-size: var( --xb-icon-size );

				color: var( --xb-icon-color );
				fill: var( --xb-icon-color );
			}
		`,
	];
}

export default styles;
