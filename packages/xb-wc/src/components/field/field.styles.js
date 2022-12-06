import { css } from 'lit';

import typography from '../../styles/typography.styles';
import m, { mx, my, mr, ml } from '../../styles/margin.styles';
import token from '../../utils/get-token';

function styles() {
	return [
		css`
			:host {
			}

			.field {
				--xb-stack-gap: ${ token( 'spacing-1' ) };
			}

			xb-icon {
				--xb-icon-color: ${ token( 'color-gray-700' ) };
			}

			.label {
				display: flex;
				align-items: center;
			}

			.label,
			slot[name='label']::slotted( * ) {
				${ typography( 'body-2' ) };

				/* font-weight: ${ token( 'font-weight-medium' ) };*/
				font-size: 12px;
			}

			.-required .label::before {
				${ typography( 'body-2' ) };

				color: ${ token( 'color-danger' ) };

				content: '*';
			}

			.content {
				/* display: none; */
			}
		`,
	];
}

export default styles;
