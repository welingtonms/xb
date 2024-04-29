import { css } from 'lit';

// import m from '../../../styles/margin.styles';
// import outline from '../../../styles/outline.styles';
// import { disabled, focused, active, hovered } from '../../../styles/state.styles';
// import p, { px, py } from '../../../styles/padding.styles';
import token from '../../../utils/get-token';
// import transition from '../../../styles/transition.styles';
// import typography from '../../../styles/typography.styles';

// export function groupStyles() {
// 	return [
// 		css`
// 			:host {
// 				--xb-radio-group-align: flex-start;
// 				--xb-radio-group-color: unset;
// 				--xb-radio-group-gap: ${ token( 'spacing-2' ) };
// 				--xb-radio-group-justify: flex-start;
// 				--xb-radio-group-padding-x: ${ token( 'spacing-0' ) };
// 				--xb-radio-group-padding-y: ${ token( 'spacing-1' ) };

// 				--xb-radio-group-outline-color: ${ token( 'color-white', 0 ) };

// 				min-width: 100%;

// 				position: relative;

// 				${ typography( 'body-2' ) };

// 				${ m( 0 ) };
// 				${ px( 'var(--xb-radio-group-padding-x)' ) };
// 				${ py( 'var(--xb-radio-group-padding-y)' ) };

// 				display: flex;
// 				flex-direction: column;
// 				justify-content: var( --xb-radio-group-justify );
// 				align-items: var( --xb-radio-group-align );
// 				gap: var( --xb-radio-group-gap );

// 				color: var( --xb-radio-group-color );

// 				${ outline( '--xb-radio-group-outline-color' ) };
// 			}

// 			::slotted( * ) {
// 				margin-block: 0;
// 				width: 100%;
// 			}
// 		`,
// 	];
// }

export function radioStyles() {
	return css`
		:host {
			--xb-radio-height: 18px;
			/** https://accessibilityinsights.io/info-examples/web/needs-review/color-contrast/ */
			--xb-radio-background-color: ${ token( 'color-background' ) };
			--xb-radio-outline-color: ${ token( 'color-white', 0 ) };

			position: relative;
			display: inline-flex;
			align-items: center;

			cursor: pointer;
		}

		:host::before {
			content: '';
			position: absolute;
			display: inline-block;

			pointer-events: none;

			left: 0;
			right: 0;
			top: 0;
			bottom: 0;

			background-color: ${ token( 'color-white' ) };

			box-sizing: border-box;

			border-radius: 50%;

			position: relative;

			border: 4px solid ${ token( 'color-gray-100' ) };
			background-color: ${ token( 'color-white' ) };
			border-radius: calc( 0.5 * var( --xb-radio-height ) );

			box-sizing: border-box;
			block-size: calc( var( --xb-radio-height ) );
			inline-size: calc( var( --xb-radio-height ) );
		}
		:host( :hover )::before {
			border-color: ${ token( 'color-gray-300' ) };
		}

		:host( [aria-checked='true']:hover )::before {
			border-color: ${ token( 'color-primary-500' ) };
		}

		:host( [aria-checked='true'] )::before {
			border-color: ${ token( 'color-primary-300' ) };
		}

		:host( .is-focused ) {
			border-color: ${ token( 'color-secondary-300' ) };
		}
	`;
}
