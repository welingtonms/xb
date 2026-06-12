import { css } from 'lit';

import { baseButtonStyles } from '../../button';
import { disclosureHostStyles, disclosurePanelStyles } from '../../disclosure-floating-element';
import { menuHostStyles, menuContentStyles, menuItemStyles } from '../../menu';
import { select } from '../../../styles/selector';
import outline from '../../../styles/outline.styles';
import toCSSResult from '../../../utils/to-css-result';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';
import layoutStyles from '../../../styles/layout.styles';

export function selectStyles() {
	const $ = select( ':host' );
	const trigger = select( '#trigger' );

	return [
		layoutStyles( { descendantSelector: '#picker' } ),
		disclosureHostStyles(),
		css`
			${ $.css() } {
				--xb-select-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-select-outline-color: transparent;
				--xb-select-outline-offset: 2px;

				--xb-select-picker-border-color: ${ toCSSResult( 'color-gray-300' ) };

				${ transition( [
					{
						property: 'outline-color',
					},
				] ) };

				display: inline-flex;
				min-width: 0;

				border-radius: ${ toCSSResult( 'radius-md' ) };

				${ outline( 'var( --xb-select-outline-color )', 'var( --xb-select-outline-offset )' ) };
			}

			${ $.enabled.focused.css() } {
				--xb-select-picker-border-color: ${ toCSSResult( 'color-primary-300' ) };
				--xb-select-outline-color: ${ toCSSResult( 'color-primary-100' ) };
			}

			#picker {
				${ transition( [
					{
						property: 'border-color',
					},
				] ) };

				display: flex;
				align-items: center;
				gap: ${ toCSSResult( 'spacing-1' ) };

				box-sizing: border-box;

				border: 1px solid var( --xb-select-picker-border-color );
				border-radius: ${ toCSSResult( 'radius-md' ) };
				padding-inline: ${ toCSSResult( 'spacing-3' ) } calc( ${ toCSSResult( 'spacing-3' ) } / 2 );
				padding-block: 0;

				block-size: 40px;
			}

			${ trigger.css() } {
				${ transition( [ { property: 'opacity' } ] ) };
				${ typography( 'text-sm' ) };
				opacity: 1;

				field-sizing: content;
				min-width: 40px;
				width: fit-content;
				box-sizing: border-box;

				border: none;
				height: calc( 100% - 2px );
				padding-block: ${ toCSSResult( 'spacing-2' ) };
				padding-inline: 0;
				outline: none;

				background-color: var( --xb-select-background-color );
				color: ${ toCSSResult( 'color-gray-900' ) };
				font-weight: ${ toCSSResult( 'font-weight-regular' ) };
			}

			${ trigger.disabled.css() } {
				opacity: 0.5;
			}

			#leading {
				display: inline-flex;
				align-items: center;
			}

			#leading:empty {
				display: none;
			}

			:host( [open] ) #handle xb-icon {
				transform: rotate( 180deg );
			}
		`,
	];
}

export function menuStyles() {
	return [
		menuHostStyles(),
		menuContentStyles( '[role="listbox"]' ),
		...disclosurePanelStyles( { panelSelector: '[role="listbox"]' } ),
		css``,
	];
}

export function optionStyles() {
	return [
		css`
			#check {
				margin-inline-start: auto;
				visibility: hidden;

				color: ${ toCSSResult( 'color-primary-600' ) };
			}

			:host( [selected] ) {
				--xb-item-background-color: ${ toCSSResult( 'color-gray-50' ) };
			}

			:host( [selected] ) #check {
				visibility: visible;
			}
		`,
		menuItemStyles(),
	];
}
