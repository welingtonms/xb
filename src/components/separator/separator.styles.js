import { css } from 'lit';

import toCSSResult from '../../utils/to-css-result';
import { select } from '../../styles/selector';

export function separatorStyles() {
	const $ = select( ':host' );
	return [
		css`
			${ $.css() } {
				--xb-separator-color: ${ toCSSResult( 'color-gray-200' ) };

				contain: layout style;
				box-sizing: border-box;

				display: block;

				color: var( --xb-separator-color );
			}

			hr {
				margin: 0;
				border: none;
				color: inherit;
				border-top: 1px solid currentColor;
			}
		`,
	];
}
