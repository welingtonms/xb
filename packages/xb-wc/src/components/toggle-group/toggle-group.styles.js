import { css } from 'lit';

import { transition } from '../../styles';
import color from '../../utils/get-color-token';
import token from '../../utils/get-token';

function styles() {
	return [
		css`
			.toggle-group {
				--xb-cluster-width: max-content;

				${ transition( [ { property: 'border-color' } ] ) };
			}

			.toggle-group:focus-within {
				--xb-cluster-border-color: ${ color( 'color-primary-300' ) };
			}

			.-single {
				--xb-cluster-border-color: ${ color( 'color-primary-500' ) };
				--xb-cluster-border-style: solid;

				--xb-cluster-padding-x: 2px;
				--xb-cluster-padding-y: 2px;

				--xb-cluster-gap: 2px;
			}

			.-multiple {
				--xb-cluster-padding-x: ${ token( 'spacing-0' ) };
				--xb-cluster-padding-y: ${ token( 'spacing-0' ) };

				--xb-cluster-gap: ${ token( 'spacing-1' ) };
			}
		`,
	];
}

export default styles;
