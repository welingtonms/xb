import { css } from 'lit';

import { transition } from '../../styles';
import color from '../../utils/get-color-token';
import token from '../../utils/get-token';

function styles() {
	return [
		css`
			.toggle-group {
				--xb-cluster-width: max-content;
				--xb-cluster-border-color: ${ color( 'color-primary-500' ) };
				--xb-cluster-border-style: solid;
				--xb-cluster-padding-x: 2px;
				--xb-cluster-padding-y: 2px;

				${ transition( [ { property: 'border-color' } ] ) };
			}

			.toggle-group:focus-within {
				--xb-cluster-border-color: ${ color( 'color-primary-300' ) };
			}

			.-single {
				--xb-cluster-gap: ${ token( 'spacing-0' ) };
			}

			.-multiple {
				--xb-cluster-gap: 2px;
			}
		`,
	];
}

export default styles;
