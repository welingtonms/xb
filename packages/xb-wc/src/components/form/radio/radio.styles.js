import { css } from 'lit';

import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import { disabled, focused, active, hovered } from '../../../styles/state.styles';
import p, { px, py } from '../../../styles/padding.styles';
import token from '../../../utils/get-token';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';

export function groupStyles() {
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

				${ typography( 'body-2' ) };

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

export function radioStyles() {
	return css`
		input[type='radio'] {
			--xb-radio-height: 18px;
			/** https://accessibilityinsights.io/info-examples/web/needs-review/color-contrast/ */
			--xb-radio-background-color: ${ token( 'color-background' ) };
			--xb-radio-outline-color: ${ token( 'color-white', 0 ) };

			box-sizing: border-box;

			border-radius: 50%;
			appearance: none;

			${ transition( [
				{ property: 'background-color' },
				{ property: 'border-color' },
				{ property: 'outline' },
			] ) };

			${ outline( '--xb-radio-outline-color' ) };

			--xb-icon-color: ${ token( 'color-white', 0 ) };

			position: relative;

			flex-shrink: 0;
			display: inline-flex;
			justify-content: center;
			align-items: center;

			${ p( token( 'spacing-0' ) ) };
			${ m( token( 'spacing-0' ) ) };

			border: 1px solid ${ token( 'color-gray-400' ) };
			background-color: ${ token( 'color-white' ) };
			border-radius: calc( 0.5 * var( --xb-radio-height ) );

			box-sizing: border-box;
			block-size: calc( var( --xb-radio-height ) );
			inline-size: calc( var( --xb-radio-height ) );
		}

		input[type='radio']::after {
			content: '';
			position: absolute;
			display: inline-block;
			border-radius: 50%;
			pointer-events: none;

			height: 8px;
			width: 8px;

			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;

			background-color: ${ token( 'color-white' ) };
		}

		input[type='radio']:checked {
			border-color: ${ token( 'color-primary-300' ) };
			background-color: ${ token( 'color-primary-300' ) };
		}

		${ focused( "input[type='radio']" ) } {
			--xb-radio-outline-color: ${ token( 'color-primary-200', 0.2 ) };
		}

		${ disabled( "input[type='radio']" ) } {
			pointer-events: none;
			user-select: none;
			opacity: 0.25;

			cursor: default;
		}

		${ hovered( "input[type='radio']" ) } {
			border-color: ${ token( 'color-primary-500' ) };
		}

		${ hovered( "input[type='radio']:checked" ) } {
			background-color: ${ token( 'color-primary-500' ) };
		}

		${ active( "input[type='radio']" ) } {
			border-color: ${ token( 'color-primary-100' ) };
		}
	`;
}
