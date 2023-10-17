import { css } from 'lit';

import m from '../../styles/margin.styles';
import p from '../../styles/padding.styles';
import token from '../../utils/get-token';
import typography from '../../styles/typography.styles';

function styles() {
	return [
		css`
			/**
			* tooltip is a special case because the host itself is the floating part.
			* that's why we are not loading floatinStyles as we do for the other floating
			* elements.
		 	*/
			:host,
			[popover] {
				--xb-floating-background-color: ${ token( 'color-gray-800' ) };
				--xb-floating-color: ${ token( 'color-white' ) };

				--xb-floating-top: 0;
				--xb-floating-left: 0;

				--xb-floating-box-shadow: none;

				${ p( token( 'spacing-2' ) ) };
				${ m( token( 'spacing-0' ) ) };

				display: none;

				position: fixed;

				min-height: 24px;
				width: max-content;
				max-width: 40ch;

				overflow-x: hidden;

				top: var( --xb-floating-top, 0 );
				left: var( --xb-floating-left, 0 );

				border: none;
				border-top-left-radius: var( --xb-floating-border-top-left-radius );
				border-top-right-radius: var( --xb-floating-border-top-right-radius );
				border-bottom-right-radius: var( --xb-floating-border-bottom-right-radius );
				border-bottom-left-radius: var( --xb-floating-border-bottom-left-radius );

				background-color: var( --xb-floating-background-color );
				color: var( --xb-floating-color );

				box-shadow: var( --xb-floating-box-shadow );
				z-index: var( --xb-floating-z-index );
			}

			:host( [open] ) {
				display: inline-block;
			}

			::slotted( * ) {
				${ typography( 'body-2' ) };
				color: var( --xb-floating-color );
			}
		`,
	];
}

export default styles;
