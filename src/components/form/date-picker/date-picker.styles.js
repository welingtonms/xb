import { css, unsafeCSS } from 'lit';

import { floatingStyles } from '../../../components/floating-element';
import { expandableStyles } from '../../../controllers/expandable';
import { visuallyHidden } from '../../../styles/a11y';
import { typography } from '../../../styles/typography.styles';
import transition from '../../../styles/transition.styles';
import outline from '../../../styles/outline.styles';
import toCSSResult from '../../../utils/to-css-result';
import { select } from '../../../styles/selector';
import { menuStyles } from '../../menu';

export const TRIGGER_SELECTOR = '[aria-haspopup="dialog"]';
export const MENU_SELECTOR = '[role="dialog"]';

export function datePickerStyles() {
	const outerContainer = select( '.outer-container' );
	const focusContainer = select( '.focus-container' );
	const menuContainer = select( MENU_SELECTOR );

	return [
		floatingStyles( {
			floatingSelector: MENU_SELECTOR,
		} ),
		expandableStyles( {
			expandableSelector: MENU_SELECTOR,
		} ),
		css`
			:host {
				--xb-date-picker-input-height: 40px;
				--xb-date-picker-border-color: ${ toCSSResult( 'color-border-primary' ) };
				--xb-date-picker-outline-color: ${ toCSSResult( 'color-white', 0 ) };
				--xb-date-picker-outline-offset: 2px;
				--xb-date-picker-placeholder-color: ${ toCSSResult( 'color-gray-400' ) };

				--m-date-picker-background-color: ${ toCSSResult( 'color-white' ) };
				--m-date-picker-border-color: ${ toCSSResult( 'color-border-primary' ) };
				--m-date-picker-height: 40px;
				--m-date-picker-placeholder-color: ${ toCSSResult( 'color-gray-400' ) };
				--m-date-picker-color: ${ toCSSResult( 'color-black' ) };
				--m-date-picker-input-width: 92px;
				--m-date-picker-outline-color: ${ toCSSResult( 'color-white', 0 ) };
				--m-date-picker-outline-offset: 2px;
				--m-date-picker-day-size: 32px;
				--m-date-picker-day-selected-bg: ${ toCSSResult( 'color-primary-500' ) };
				--m-date-picker-day-selected-color: ${ toCSSResult( 'color-white' ) };
				--m-date-picker-day-hover-bg: ${ toCSSResult( 'color-gray-200' ) };

				--xb-date-picker-padding-x: ${ toCSSResult( 'spacing-0' ) };
				--xb-date-picker-padding-l: ${ toCSSResult( 'spacing-0' ) };
				--xb-date-picker-padding-r: ${ toCSSResult( 'spacing-0' ) };
				--xb-date-picker-padding-y: ${ toCSSResult( 'spacing-0' ) };

				display: inline-flex;
				flex-direction: column;
				position: relative;
			}

			:host( [disabled] ) {
				pointer-events: none;
			}

			#picker {
				display: flex;
				flex-direction: column;
				flex-flow: row nowrap;
			}

			.outer-container {
				${ transition( [ { property: 'border-color' }, { property: 'outline-color' } ] ) };

				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				gap: ${ toCSSResult( 'spacing-2' ) };

				block-size: var( --xb-date-picker-input-height );
				box-sizing: border-box;

				border-radius: ${ toCSSResult( 'radius-md' ) };
				border: 1px solid var( --xb-date-picker-border-color );

				padding-inline: var( --xb-date-picker-padding-l ) var( --xb-date-picker-padding-r );
				padding-block: var( --xb-date-picker-padding-y );

				${ outline(
					'var( --xb-date-picker-outline-color )',
					'var( --xb-date-picker-outline-offset )'
				) };
			}

			.outer-container.-show-clear-button {
				padding-inline-end: calc( var( --xb-date-picker-padding-r ) / 2 );
			}

			.outer-container:not( .has-slotted-addon-leading ) .addon-leading {
				display: none;
			}

			.outer-container:not( .has-slotted-addon-trailing ) .addon-trailing {
				display: none;
			}

			.outer-container:not( .has-slotted-leading ) .leading {
				display: none;
			}

			.outer-container:not( .has-slotted-trailing ) .trailing {
				display: none;
			}

			.outer-container.has-slotted-addon-leading .addon-leading,
			.outer-container:not( .has-slotted-addon-trailing ) .focus-container {
				border-top-right-radius: ${ toCSSResult( 'radius-md' ) };
				border-bottom-right-radius: ${ toCSSResult( 'radius-md' ) };
			}

			.outer-container.has-slotted-addon-trailing .addon-trailing,
			.outer-container:not( .has-slotted-addon-leading ) .focus-container {
				border-top-left-radius: ${ toCSSResult( 'radius-md' ) };
				border-bottom-left-radius: ${ toCSSResult( 'radius-md' ) };
			}

			.outer-container.has-slotted-leading:not( .has-slotted-addon-leading ),
			.outer-container:not( .has-slotted-leading, .has-slotted-addon-leading ) {
				--xb-date-picker-padding-l: ${ toCSSResult( 'spacing-3' ) };
			}

			.outer-container.has-slotted-trailing:not( .has-slotted-addon-trailing ),
			.outer-container:not( .has-slotted-trailing, .has-slotted-addon-trailing ) {
				--xb-date-picker-padding-r: ${ toCSSResult( 'spacing-3' ) };
			}

			.focus-container {
				${ typography( 'text-md' ) };
				color: ${ toCSSResult( 'color-gray-600' ) };

				flex-grow: 1;
				flex-shrink: 0;

				display: flex;
				align-items: center;
				gap: ${ toCSSResult( 'spacing-1' ) };

				block-size: 100%;
			}

			input {
				${ transition( [ { property: 'color' } ] ) };

				${ typography( 'text-sm' ) };

				box-sizing: border-box;
				border: none;
				outline: none;
				block-size: 100%;
				inline-size: 86px;
				flex-grow: 0;
				flex-shrink: 0;
				text-align: center;

				padding-inline: 0 /** var( --xb-date-picker-input-padding-x )*/;
				padding-block: ${ toCSSResult( 'spacing-2' ) };

				box-sizing: border-box;

				border-radius: ${ toCSSResult( 'radius-md' ) };
				color: ${ toCSSResult( 'color-gray-900' ) };
			}

			${ outerContainer.focused.css() } {
				--xb-date-picker-outline-color: ${ toCSSResult( 'color-primary-100' ) };
				--xb-date-picker-border-color: ${ toCSSResult( 'color-primary-300' ) };
			}

			#calendar {
				position: relative;

				display: flex;
				flex-direction: column;
				align-items: stretch;
				gap: ${ toCSSResult( 'spacing-2' ) };
			}

			#controls {
				position: relative;
				display: flex;
				flex-flow: row nowrap;
			}

			.nav-btn {
				position: absolute;
				z-index: 2;
			}

			.prev-month {
				left: 0;
				top: ${ toCSSResult( 'spacing-3' ) };
				left: ${ toCSSResult( 'spacing-3' ) };
			}

			.next-month {
				right: 0;
				top: ${ toCSSResult( 'spacing-3' ) };
				right: ${ toCSSResult( 'spacing-3' ) };
			}

			.month-year-label {
				${ typography( 'text-sm' ) };

				font-weight: ${ toCSSResult( 'font-weight-bold' ) };

				display: flex;
				align-items: center;
				justify-content: center;
				block-size: 36px;

				flex-grow: 1;
				flex-shrink: 0;

				text-align: center;
				color: ${ toCSSResult( 'color-gray-600' ) };
			}

			.grids-container {
				display: flex;
				flex-flow: row nowrap;
				gap: calc( ${ toCSSResult( 'spacing-4' ) } + 1px );

				flex: 1;
			}

			.month-titles {
				display: flex;

				gap: ${ toCSSResult( 'spacing-4' ) };

				flex: 1;
			}

			.month-grid {
				position: relative;
				padding: ${ toCSSResult( 'spacing-4' ) };
			}

			.month-grid:not( :first-child )::before {
				content: '';
				display: block;
				width: 1px;
				height: 100%;
				background-color: ${ toCSSResult( 'color-gray-200' ) };
				position: absolute;
				top: 0;
				left: calc( -1 * ( ${ toCSSResult( 'spacing-2' ) } + 1px ) );
				bottom: 0;
			}

			.dialog-column:not( :first-child ) {
				border-left: 1px solid ${ toCSSResult( 'color-gray-200' ) };
			}

			[role='grid'] {
				border-collapse: collapse;
			}

			[role='grid'] th {
				${ typography( 'text-sm' ) };

				font-weight: ${ toCSSResult( 'font-weight-bold' ) };

				inline-size: 40px;
				block-size: 40px;
				text-align: center;
				vertical-align: middle;
				padding: 0;
				box-sizing: border-box;
			}

			[role='grid'] td {
				padding: 0;
				position: relative;
			}

			.day {
				--day-background-color: white;
				--day-border-color: transparent;
				--day-color: ${ toCSSResult( 'color-gray-900' ) };

				${ typography( 'text-sm' ) };

				${ transition( [
					{ property: 'background-color' },
					{ property: 'border-color' },
					{ property: 'outline-color' },
				] ) };

				position: relative;
				z-index: 1;

				border: 2px solid var( --day-border-color );
				border-radius: ${ toCSSResult( 'radius-full' ) };
				background-color: var( --day-background-color );
				color: var( --day-color );

				outline: 1px solid var( --day-outline-color );
				outline-offset: var( --day-outline-offset );

				inline-size: 40px;
				block-size: 40px;

				display: inline-flex;
				justify-content: center;
				align-items: center;
				padding: 0;
				box-sizing: border-box;

				cursor: pointer;
			}

			.day:enabled:hover {
				--day-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--day-border-color: ${ toCSSResult( 'color-gray-50' ) };
			}

			.day:enabled:active {
				--day-background-color: ${ toCSSResult( 'color-gray-100' ) };
				--day-border-color: ${ toCSSResult( 'color-gray-100' ) };
			}

			.day.-selected:enabled {
				--day-background-color: ${ toCSSResult( 'color-primary-600' ) };
				--day-border-color: ${ toCSSResult( 'color-primary-600' ) };
				--day-color: ${ toCSSResult( 'color-white' ) };
				position: relative;
				z-index: 2;
			}

			.day.-selected:enabled:hover {
				--day-background-color: ${ toCSSResult( 'color-primary-700' ) };
				--day-border-color: ${ toCSSResult( 'color-primary-700' ) };
				--day-color: ${ toCSSResult( 'color-white' ) };
			}

			.day.-in-range:enabled {
				--day-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--day-border-color: ${ toCSSResult( 'color-gray-50' ) };
				--day-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			.day.-in-range:enabled:hover {
				--day-background-color: ${ toCSSResult( 'color-gray-100' ) };
				--day-border-color: ${ toCSSResult( 'color-gray-100' ) };
				--day-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			.day.-faded {
				--day-color: ${ toCSSResult( 'color-gray-400' ) };
			}

			.day:enabled:focus-visible {
				--day-border-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			/* Background contínuo no <td> que se estende horizontalmente para conectar os dias */
			[role='grid'] td:has( .day.-in-range:enabled ),
			[role='grid']:has( .day.-range-end:enabled ) td:has( .day.-range-start:enabled ),
			[role='grid']:has( .day.-range-start:enabled ) td:has( .day.-range-end:enabled ) {
				background-color: ${ toCSSResult( 'color-gray-50' ) };
			}

			/* Ajustar bordas arredondadas nas extremidades do range */
			/* Esquerda: se tem range-start/selected OU é o primeiro td com in-range na row */
			[role='grid']:has( .day.-range-end:enabled ) td:has( .day.-range-start:enabled ),
			[role='grid'] tr td:first-child:has( .day.-in-range:enabled ) {
				border-top-left-radius: ${ toCSSResult( 'radius-full' ) };
				border-bottom-left-radius: ${ toCSSResult( 'radius-full' ) };
			}
			/* Direita: se tem range-end/selected OU é o último td com in-range na row */
			[role='grid']:has( .day.-range-start:enabled ) td:has( .day.-range-end:enabled ),
			[role='grid'] tr td:last-child:has( .day.-in-range:enabled ) {
				border-top-right-radius: ${ toCSSResult( 'radius-full' ) };
				border-bottom-right-radius: ${ toCSSResult( 'radius-full' ) };
			}

			.presets {
				--xb-menu-max-height: unset;
				--xb-menu-width: unset;
				--xb-menu-gap: 0;
				--xb-menu-border-style: none;
				--xb-menu-box-shadow: none;
			}

			.preset {
			}

			.footer {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				gap: ${ toCSSResult( 'spacing-2' ) };
				padding: ${ toCSSResult( 'spacing-3' ) };

				border-top: 1px solid ${ toCSSResult( 'color-gray-200' ) };
			}

			.events-tray {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 6px;
				display: flex;
				z-index: 1;
				justify-content: center;
				align-items: center;
				color: ${ toCSSResult( 'color-primary-600' ) };
				pointer-events: none;
			}
		`,
		menuStyles( MENU_SELECTOR ),
		css`
			:host {
				--xb-menu-max-height: unset;
				--xb-menu-align: stretch;
				--xb-menu-width: unset;
				--xb-menu-padding-x: 0;
				--xb-menu-padding-y: 0;
				--xb-menu-gap: 0;
			}

			${ menuContainer.css() } {
				outline: none;
				flex-flow: row nowrap;
			}
		`,
		visuallyHidden(),
	];
}
