import { css } from 'lit';

import { floatingStyles } from '../../floating-element';
import toCSSResult from '../../../utils/to-css-result';
import { menuHostStyles, menuContentStyles, menuItemStyles } from '../../menu';
import { baseButtonStyles } from '../../button';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';
import outline from '../../../styles/outline.styles';
import { select } from '../../../styles/selector';

export function selectStyles() {
	const $ = select( ':host' );

	return [
		floatingStyles({
			floating: "[role='listbox']",
		}),
		css`
			${ $.css() } {
				--xb-select-outline-color: transparent;
				--xb-select-outline-offset: 0;

				--xb-select-picker-border-color: ${ toCSSResult( 'color-gray-300' ) };

				${ transition( [
					{
						property: 'outline-color',
					}
				] ) };

				display: inline-flex;
				min-width: 0;

				border-radius: 8px;

				${ outline( 'var( --xb-select-outline-color )', 'var( --xb-select-outline-offset )' ) };
			}

			${ $.enabled.focused.css() }  {
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
				gap: 8px;

				box-sizing: border-box;

				border: 1px solid var(--xb-select-picker-border-color);
				border-radius: 8px;
				padding-inline: 14px 0;
				padding-block: 0;

				block-size: 44px;
			}

			#trigger {
				${ typography( 'text-md' ) };

				flex: 1;
				box-sizing: border-box;

				border: none;
				height: 100%;
				padding-block: 10px;
				outline: none;

				color: ${ toCSSResult( 'color-gray-900' ) };
				font-weight: ${ toCSSResult( 'font-weight-regular' ) };
			}

			#leading {
				display: inline-flex;
				align-items: center;
			}

			${baseButtonStyles('#handle')}

			#handle {
				${ transition( [
					{ property: 'transform' },
					{ property: 'color' },
				] ) };

				box-sizing: border-box;

				border: none;
				height: 100%;
				padding-block: 10px;
				padding-inline: 14px;

				color: ${ toCSSResult( 'color-gray-500' ) };
			}

			:host( [open] ) #handle {
				transform: rotate( 180deg );
			}
		`,
	];
}

export function menuStyles() {
	return [
		menuHostStyles(),
		menuContentStyles('[role="listbox"]'),
		css`
			#spinner {
				visibility: hidden;
				/* --xb-floating-width: max-content;
		        --xb-floating-min-width: 16ch; */
			}

			:host([loading]) #spinner {
				visibility: visible;
			}
		`,
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

			:host([selected]) {
				--xb-item-background-color: ${toCSSResult('color-gray-50')};
			}

			:host([selected]) #check {
				visibility: visible;
			}
		`,
		menuItemStyles()
	];
}
