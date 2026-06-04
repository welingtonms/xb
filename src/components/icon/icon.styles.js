import { css } from 'lit';

import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
			:host {
				${ transition( [
					{ property: 'color' },
					{ property: 'fill' },
					{ property: 'opacity' },
					{ property: 'inline-size', duration: '.75s' },
					{ property: 'block-size', duration: '.75s' },
					{ property: 'transform' },
				] ) };

				--xb-icon-size: 1em;
				--xb-icon-color: currentColor;
				--xb-icon-rotate: 0deg;

				display: inline-flex;
				align-items: center;
				justify-content: center;

				inline-size: var( --xb-icon-size );
				block-size: var( --xb-icon-size );
				font-size: var( --xb-icon-size );

				color: var( --xb-icon-color );
				fill: var( --xb-icon-color );

				transform: rotate( var( --xb-icon-rotate ) );
			}

			svg {
				transition: inherit;

				display: inline-flex;
				align-items: center;
				justify-content: center;

				inline-size: var( --xb-icon-size );
				block-size: var( --xb-icon-size );
				font-size: var( --xb-icon-size );

				color: inherit !important;
				fill: inherit !important;
			}
		`,
	];
}

export default styles;
