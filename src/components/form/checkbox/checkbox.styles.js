import { css } from 'lit';

import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import p from '../../../styles/padding.styles';
import toCSSResult from '../../../utils/to-css-result';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';
import sizeStyles from '../../../styles/size.styles';
import { select } from '../../../styles/selector';

export function checkboxStyles() {
	const $ = select( ':host' );
	const input = select( '#control' );
	const button = select( '#button' );

	return css`
		${ $.css() } {
			--xb-checkbox-size: 16px;

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
			grid-template-columns: var( --xb-checkbox-size ) 1fr;
			row-gap: ${ toCSSResult( 'spacing-1' ) };
			column-gap: ${ toCSSResult( 'spacing-2' ) };

			box-sizing: border-box;
			min-block-size: var( --xb-checkbox-size );

			font-weight: ${ toCSSResult( 'font-weight-medium' ) };

			color: ${ toCSSResult( 'color-gray-700' ) };
		}

		${ $.hidden.css() } {
			display: none;
		}

		${ $.disabled.css() } {
			color: ${ toCSSResult( 'color-gray-300' ) };
		}

		${ $.attr( '[size="xs"]' ).css() } {
			--xb-checkbox-size: 12px;
		}

		${ $.attr( '[size="sm"]' ).css() } {
			--xb-checkbox-size: 14px;
		}

		${ $.attr( '[size="md"]', '[size]' ).css() } {
			--xb-checkbox-size: 16px;
		}

		${ $.attr( '[size="lg"]' ).css() } {
			--xb-checkbox-size: 18px;
		}

		${ $.attr( '[size="xl"]' ).css() } {
			--xb-checkbox-size: 20px;
		}

		${ $.attr( '[size="2xl"]' ).css() } {
			--xb-checkbox-size: 24px;
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
			--xb-checkbox-outline-color: transparent;
			--xb-checkbox-outline-offset: 2px;
			--xb-checkbox-border-color: ${ toCSSResult( 'color-gray-300' ) };
			--xb-checkbox-background-color: ${ toCSSResult( 'color-white' ) };
			--xb-checkbox-color: ${ toCSSResult( 'color-white' ) };

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
			inline-size: var( --xb-checkbox-size );
			block-size: var( --xb-checkbox-size );
			flex: 0 0 var( --xb-checkbox-size );

			border-radius: 4px;
			border: 1px solid var( --xb-checkbox-border-color );
			background-color: var( --xb-checkbox-background-color );

			${ outline( 'var( --xb-checkbox-outline-color )', 'var( --xb-checkbox-outline-offset )' ) };
		}

		#label {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		${ input.enabled.hovered.css() } ~ ${ button.css() } {
			--xb-checkbox-border-color: ${ toCSSResult( 'color-primary-600' ) };
			--xb-checkbox-background-color: ${ toCSSResult( 'color-primary-50' ) };
		}

		${ input.enabled.hovered.not( ':checked', ':indeterminate' ).css() } ~ ${ button.css() } {
			--xb-checkbox-color: ${ toCSSResult( 'color-primary-50' ) };
		}

		${ input.enabled.focused.css() } ~ ${ button.css() } {
			--xb-checkbox-border-color: ${ toCSSResult( 'color-primary-300' ) };
			--xb-checkbox-background-color: ${ toCSSResult( 'color-white' ) };
			--xb-checkbox-outline-color: ${ toCSSResult( 'color-primary-100' ) };
		}

		${ input.enabled.checked.css() } ~ ${ button.css() },
		${ input.enabled.indeterminate.css() } ~ ${ button.css() } {
			--xb-checkbox-border-color: ${ toCSSResult( 'color-primary-600' ) };
			--xb-checkbox-background-color: ${ toCSSResult( 'color-primary-600' ) };
			--xb-checkbox-color: ${ toCSSResult( 'color-white' ) };
		}

		${ input.enabled.checked.hovered.css() } ~ ${ button.css() },
		${ input.enabled.indeterminate.hovered.css() } ~ ${ button.css() } {
			--xb-checkbox-border-color: ${ toCSSResult( 'color-primary-700' ) };
			--xb-checkbox-background-color: ${ toCSSResult( 'color-primary-700' ) };
			--xb-checkbox-color: ${ toCSSResult( 'color-white' ) };
		}

		${ input.disabled.css() } {
			cursor: default;
		}

		${ input.disabled.css() } ~ ${ button.css() } {
			--xb-checkbox-border-color: ${ toCSSResult( 'color-gray-200' ) };
			--xb-checkbox-background-color: ${ toCSSResult( 'color-gray-100' ) };
			--xb-checkbox-color: ${ toCSSResult( 'color-gray-100' ) };
		}

		${ input.checked.disabled.css() } ~ ${ button.css() } {
			--xb-checkbox-color: ${ toCSSResult( 'color-gray-200' ) };
		}

		#check,
		#indeterminate {
			position: absolute;

			pointer-events: none;
			opacity: 0;

			color: var( --xb-checkbox-color );
		}

		${ input.pseudo( 'indeterminate' ).css() } ~ ${ button.css() } #indeterminate,
		${ input.checked.not( ':indeterminate' ).css() } ~ ${ button.css() } #check {
			opacity: 1;
		}

		::slotted( [slot='description'] ) {
			font-weight: ${ toCSSResult( 'font-weight-regular' ) };
		}
	`;
}
