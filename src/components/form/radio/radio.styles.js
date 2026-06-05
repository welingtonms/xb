import { css } from 'lit';

import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import p from '../../../styles/padding.styles';
import toCSSResult from '../../../utils/to-css-result';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';
import sizeStyles from '../../../styles/size.styles';
import { select } from '../../../styles/selector';

export function radioGroupStyles() {
	return [
		css`
			:host {
				--xb-radio-group-align: flex-start;
				--xb-radio-group-color: unset;
				--xb-radio-group-gap: ${ toCSSResult( 'spacing-2' ) };
				--xb-radio-group-justify: flex-start;
				--xb-radio-group-padding-x: ${ toCSSResult( 'spacing-0' ) };
				--xb-radio-group-padding-y: ${ toCSSResult( 'spacing-1' ) };

				--xb-radio-group-outline-color: ${ toCSSResult( 'color-white', 0 ) };

				min-width: 100%;

				position: relative;

				margin: 0;
				padding-inline: var( --xb-radio-group-padding-x );
				padding-block: var( --xb-radio-group-padding-y );

				display: flex;
				flex-direction: column;
				justify-content: var( --xb-radio-group-justify );
				align-items: var( --xb-radio-group-align );
				gap: var( --xb-radio-group-gap );

				color: var( --xb-radio-group-color );

				outline: none;
			}

			::slotted( * ) {
				margin-block: 0;
			}
		`,
	];
}

// export function groupStyles() {
// 	return [
// 		css`
// 			:host {
// 				--xb-radio-group-align: flex-start;
// 				--xb-radio-group-color: unset;
// 				--xb-radio-group-gap: ${ toCSSResult( 'spacing-2' ) };
// 				--xb-radio-group-justify: flex-start;
// 				--xb-radio-group-padding-x: ${ toCSSResult( 'spacing-0' ) };
// 				--xb-radio-group-padding-y: ${ toCSSResult( 'spacing-1' ) };

// 				--xb-radio-group-outline-color: ${ toCSSResult( 'color-white', 0 ) };

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
	const $ = select( ':host' );
	const input = select( '#control' );
	const button = select( '#button' );

	return css`
		${ $.css() } {
			--xb-radio-size: 16px;

			${ typography( 'text-sm' ) };
			${ transition( [
				{
					property: 'color',
				},
			] ) };

			contain: layout style;

			position: relative;

			display: grid;
			align-items: center;
			justify-content: center;
			grid-template-columns: var( --xb-radio-size ) 1fr;
			row-gap: ${ toCSSResult( 'spacing-1' ) };
			column-gap: ${ toCSSResult( 'spacing-2' ) };

			box-sizing: border-box;
			min-block-size: var( --xb-radio-size );

			font-weight: ${ toCSSResult( 'font-weight-medium' ) };

			color: ${ toCSSResult( 'color-gray-700' ) };

			outline: none;
		}

		${ $.hidden.css() } {
			display: none;
		}

		${ $.attr( '[aria-disabled="true"]' ).css() } {
			color: ${ toCSSResult( 'color-gray-300' ) };
		}

		${ $.attr( '[size="xs"]' ).css() } {
			--xb-radio-size: 12px;
		}

		${ $.attr( '[size="sm"]' ).css() } {
			--xb-radio-size: 14px;
		}

		${ $.attr( '[size="md"]', '[size]' ).css() } {
			--xb-radio-size: 16px;
		}

		${ $.attr( '[size="lg"]' ).css() } {
			--xb-radio-size: 18px;
		}

		${ $.attr( '[size="xl"]' ).css() } {
			--xb-radio-size: 20px;
		}

		${ $.attr( '[size="2xl"]' ).css() } {
			--xb-radio-size: 24px;
		}

		${ input.css() } {
			outline: none;
			box-sizing: border-box;
			opacity: 0.00001;
			z-index: 1;
			cursor: pointer;
			block-size: 100%;
			inline-size: 100%;
			margin: 0;
			padding: 0;

			position: absolute;
			overflow: visible;
		}

		${ button.css() } {
			--xb-radio-outline-color: transparent;
			--xb-radio-outline-offset: 2px;
			--xb-radio-border-color: ${ toCSSResult( 'color-gray-300' ) };
			--xb-radio-background-color: ${ toCSSResult( 'color-white' ) };
			--xb-radio-color: ${ toCSSResult( 'color-white' ) };

			${ transition( [
				{
					property: 'outline-color',
				},
				{
					property: 'border-color',
				},
				{
					property: 'background-color',
				},
			] ) };

			display: flex;
			align-items: center;
			justify-content: center;

			box-sizing: border-box;
			inline-size: 16px;
			block-size: 16px;
			flex: 0 0 16px;

			border-radius: 50%;
			border: 1px solid var( --xb-radio-border-color );
			background-color: var( --xb-radio-background-color );

			${ outline( 'var( --xb-radio-outline-color )', 'var( --xb-radio-outline-offset )' ) };
		}

		#label {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		${ $.not( '[aria-disabled="true"]' ).hovered.css() } ${ button.css() } {
			--xb-radio-border-color: ${ toCSSResult( 'color-primary-600' ) };
			--xb-radio-background-color: ${ toCSSResult( 'color-primary-50' ) };
		}

		${ $.not( '[aria-disabled="true"]' ).hovered.not( '[checked]' ).css() } ${ button.css() } {
			--xb-radio-color: ${ toCSSResult( 'color-primary-50' ) };
		}

		${ $.not( '[aria-disabled="true"]' ).focused.css() } ${ button.css() } {
			--xb-radio-border-color: ${ toCSSResult( 'color-primary-300' ) };
			--xb-radio-background-color: ${ toCSSResult( 'color-white' ) };
			--xb-radio-outline-color: ${ toCSSResult( 'color-primary-100' ) };
		}

		${ $.not( '[aria-disabled="true"]' ).checked.css() } ${ button.css() } {
			--xb-radio-border-color: ${ toCSSResult( 'color-primary-600' ) };
			--xb-radio-background-color: ${ toCSSResult( 'color-primary-50' ) };
			--xb-radio-color: ${ toCSSResult( 'color-primary-600' ) };
		}

		${ $.attr( '[aria-disabled="true"]' ).css() } ${ input.css() } {
			cursor: default;
		}

		${ $.attr( '[aria-disabled="true"]' ).css() } ${ button.css() } {
			--xb-radio-border-color: ${ toCSSResult( 'color-gray-200' ) };
			--xb-radio-background-color: ${ toCSSResult( 'color-gray-100' ) };
			--xb-radio-color: ${ toCSSResult( 'color-gray-100' ) };
		}

		${ $.attr( '[aria-disabled="true"]' ).checked.css() } ${ button.css() } {
			--xb-radio-color: ${ toCSSResult( 'color-gray-200' ) };
		}

		#check {
			pointer-events: none;
			opacity: 0;

			color: var( --xb-radio-color );
			--xb-icon-size: 12px;
		}

		${ $.checked.css() } ${ button.css() } #check {
			opacity: 1;
		}

		::slotted( [slot='description'] ) {
			font-weight: ${ toCSSResult( 'font-weight-regular' ) };
		}
	`;
}
