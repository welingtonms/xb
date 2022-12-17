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
				--xb-stack-border-radius: 4px;
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
				/* font-size: 12px; */
			}

			.-required .label::before {
				${ typography( 'body-2' ) };

				color: ${ token( 'color-danger' ) };

				content: '*';
			}

			.prompt {
				font-size: 12px;
			}

			.content {
				/* display: none; */
			}

			:host( [status='danger'] ) {
				outline: 2px dotted ${ token( 'color-danger', 0.75 ) };
				outline-offset: 4px;

				border-radius: 4px;
				/* box-shadow: 0 0 0 0.2rem rgb( 53 116 172 / 25% ); */
			}

			.is-danger .prompt {
				--xb-text-color: ${ token( 'color-danger' ) };
			}
		`,
	];
}

export default styles;
