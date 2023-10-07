import { css } from 'lit';

import { floatingStyles } from '../../common/floating-element';
import token from '../../utils/get-token';

function styles() {
	return [
		floatingStyles( {
			floating: "[role='listbox']",
		} ),
		css`
			.empty {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				height: 40px;

				padding: 0 ${ token( 'spacing-4' ) };
			}
		`,
	];
}

export default styles;
