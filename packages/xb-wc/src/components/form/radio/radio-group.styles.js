import { css } from 'lit';

import {
	when,
	transition,
	px,
	py,
	pl,
	pr,
	p,
	m,
	typography,
} from '../../../styles';
import sizeStyles from '../../../styles/size.styles';
import color from '../../../utils/get-color-token';
import token from '../../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--xb-radio-height: initial;
			}

			.radio-group {
				box-sizing: border-box;

				width: 100%;
			}
		`,
	];
}

export default styles;
