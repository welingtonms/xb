import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';

function styles() {
	return [
		css`
			:host {
				--xb-list-item-background-color: initial;
				--xb-list-item-border-color: ${ token( 'color-gray-300' ) };
				--xb-list-item-border-style: dotted;
				--xb-list-item-border-width: 1px;
				--xb-list-item-color: unset;
				--xb-list-item-gap: ${ token( 'spacing-2' ) };
				--xb-list-item-padding-x: ${ token( 'spacing-4' ) };
				--xb-list-item-padding-y: ${ token( 'spacing-2' ) };
			}

			.list-item {
				--xb-box-background-color: var( --xb-list-item-background-color );

				border-top: none;
				border-inline: none;

				--xb-box-border-style: var( --xb-list-item-border-style );
				--xb-box-color: var( --xb-list-item-color );

				--xb-box-padding-x: var( --xb-list-item-padding-x );
				--xb-box-padding-y: var( --xb-list-item-padding-y );
			}
		`,
	];
}

export default styles;
