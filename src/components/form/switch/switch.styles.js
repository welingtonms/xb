import { css } from 'lit';

import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import p from '../../../styles/padding.styles';
import toCSSResult from '../../../utils/to-css-result';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';
import sizeStyles from '../../../styles/size.styles';
import { select } from '../../../styles/selector';

export function switchStyles() {
	const $ = select( ':host' );
	const input = select( '#control' );
	const button = select( '#button' );

	return css`
		${ $.css() } {
			${ typography( 'text-sm' ) };
			${ transition( [
				{
					property: 'color',
				},
			] ) };

			contain: layout style;

			position: relative;

			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			gap: 0;

			box-sizing: border-box;
			min-block-size: 16px;

			font-weight: ${ toCSSResult( 'font-weight-medium' ) };

			color: ${ toCSSResult( 'color-gray-700' ) };
		}

		${ $.hidden.css() } {
			display: none;
		}

		${ $.disabled.css() } {
			color: ${ toCSSResult( 'color-gray-300' ) };
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
			--xb-switch-outline-color: transparent;
			--xb-switch-outline-offset: 2px;
			--xb-switch-border-color: ${ toCSSResult( 'color-gray-100' ) };
			--xb-switch-background-color: ${ toCSSResult( 'color-gray-100' ) };
			--xb-switch-color: ${ toCSSResult( 'color-white' ) };

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
			inline-size: 36px;
			block-size: 20px;
			flex: 0 0 36px;

			border-radius: 12px;
			border: 1px solid var( --xb-switch-border-color );
			background-color: var( --xb-switch-background-color );

			${ outline( 'var( --xb-switch-outline-color )', 'var( --xb-switch-outline-offset )' ) };
		}

		#label {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		${ input.enabled.hovered.css() } ~ ${ button.css() } {
			--xb-switch-border-color: ${ toCSSResult( 'color-primary-600' ) };
			--xb-switch-background-color: ${ toCSSResult( 'color-primary-50' ) };
		}

		${ input.enabled.focused.css() } ~ ${ button.css() } {
			--xb-switch-border-color: ${ toCSSResult( 'color-primary-300' ) };
			--xb-switch-background-color: ${ toCSSResult( 'color-white' ) };
			--xb-switch-outline-color: ${ toCSSResult( 'color-primary-100' ) };
		}

		${ input.enabled.checked.css() } ~ ${ button.css() } {
			--xb-switch-border-color: ${ toCSSResult( 'color-primary-600' ) };
			--xb-switch-background-color: ${ toCSSResult( 'color-primary-600' ) };
			--xb-switch-color: ${ toCSSResult( 'color-white' ) };
		}

		${ input.checked.css() } ~ ${ button.css() } #check {
			transform: translateX( 16px );
		}

		${ input.disabled.css() } {
			cursor: default;
		}

		${ input.disabled.css() } ~ ${ button.css() } {
			--xb-switch-border-color: ${ toCSSResult( 'color-gray-200' ) };
			--xb-switch-background-color: ${ toCSSResult( 'color-gray-100' ) };
			--xb-switch-color: ${ toCSSResult( 'color-gray-100' ) };
		}

		${ input.checked.disabled.css() } ~ ${ button.css() } {
			--xb-switch-color: ${ toCSSResult( 'color-gray-200' ) };
		}

		#check {
			${ transition( [
				{ property: 'background-color' },
				{ property: 'box-shadow' },
				{ property: 'transform' },
			] ) };

			position: absolute;

			pointer-events: none;

			border-radius: 50%;
			left: 4px;
			inline-size: 14px;
			block-size: 14px;
			background-color: var( --xb-switch-color );
			box-shadow: ${ toCSSResult( 'shadow-sm' ) };
		}

		::slotted( [slot='description'] ) {
			font-weight: ${ toCSSResult( 'font-weight-regular' ) };
		}
	`;
}
