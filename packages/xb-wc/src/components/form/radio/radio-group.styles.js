import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import token from '../../../utils/get-token';

function styles() {
	return [
		css`
			:host {
				--xb-radio-group-align: flex-start;
				--xb-radio-group-color: unset;
				--xb-radio-group-gap: ${ token( 'spacing-2' ) };
				--xb-radio-group-justify: flex-start;
				--xb-radio-group-padding-x: ${ token( 'spacing-0' ) };
				--xb-radio-group-padding-y: ${ token( 'spacing-1' ) };

				--xb-radio-group-outline-color: ${ token( 'color-white', 0 ) };

				min-width: 100%;

				position: relative;

				${ m( 0 ) };
				${ px( 'var(--xb-radio-group-padding-x)' ) };
				${ py( 'var(--xb-radio-group-padding-y)' ) };

				display: flex;
				flex-direction: column;
				justify-content: var( --xb-radio-group-justify );
				align-items: var( --xb-radio-group-align );
				gap: var( --xb-radio-group-gap );

				color: var( --xb-radio-group-color );

				${ outline( '--xb-radio-group-outline-color' ) };
			}

			::slotted( * ) {
				margin-block: 0;
				width: 100%;
			}
		`,
	];
}

export default styles;
