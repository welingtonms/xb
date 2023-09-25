import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

function styles() {
	return [
		css`
			:host {
				--xb-accordion-border-radius: 4px;

				border-inline: 2px solid ${ token( 'color-primary-300' ) };
				border-block-end: 1px solid ${ token( 'color-primary-300' ) };
				border-radius: 0;

				display: flex;
				flex-direction: column;

				width: 100%;
			}
		`,
		css`
			:host( :first-child ) {
				border-block-start: 2px solid ${ token( 'color-primary-300' ) };
				border-top-left-radius: var(--xb-accordion-border-radius);
				border-top-right-radius: var(--xb-accordion-border-radius);
			}

			:host( :last-child ) {
				border-block-end: 2px solid ${ token( 'color-primary-300' ) };
				border-bottom-left-radius: var(--xb-accordion-border-radius);
				border-bottom-right-radius: var(--xb-accordion-border-radius);
			}
		`,
	];
}

export default styles;
