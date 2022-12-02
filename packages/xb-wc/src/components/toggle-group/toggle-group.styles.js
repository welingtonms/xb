import { css } from 'lit';

import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
			.toggle-group {
				--xb-cluster-width: max-content;
				--xb-cluster-border-color: ${ token( 'color-primary-500' ) };
				--xb-cluster-border-style: solid;
				--xb-cluster-padding-x: 2px;
				--xb-cluster-padding-y: 2px;
				--xb-cluster-border-radius: 4px;

				${ transition( [ { property: 'border-color' } ] ) };
			}

			.toggle-group:focus-within {
				--xb-cluster-border-color: ${ token( 'color-primary-300' ) };
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
