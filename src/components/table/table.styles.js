import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';
import { baseButtonStyles, baseButtonHostStyles } from '../button';
import { select } from '../../styles/selector';

export function tableStyles() {
	return [
		css`
			:host {
				${ typography( 'text-md' ) };

				--xb-table-row-background-color: ${ toCSSResult( 'color-white' ) };

				--xb-table-cell-padding-inline: 24px;
				--xb-table-cell-padding-block: 16px;
				--xb-table-cell-color: ${ toCSSResult( 'color-gray-600' ) };

				display: block;
				width: 100%;
				background: ${ toCSSResult( 'color-white' ) };
				overflow: auto;
			}

			.table-container {
				display: block;
				width: max-content;
				min-width: 100%;
			}
		`,
	];
}

export function tableHeaderStyles() {
	return [
		css`
			:host {
				--xb-table-row-background-color: ${ toCSSResult( 'color-gray-50' ) };

				display: block;

				width: max-content;
				min-width: 100%;
				flex-shrink: 0;
			}

			.header-container {
				display: contents;
			}
		`,
	];
}

export function tableBodyStyles() {
	return [
		css`
			:host {
				display: block;

				width: max-content;
				min-width: 100%;
			}

			.body-container {
				display: contents;
			}
		`,
	];
}

export function tableCellStyles() {
	return [
		css`
			:host {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				box-sizing: border-box;
				grid-column: span var( --colspan, 1 );

				width: 100%;

				padding-inline: var( --xb-table-cell-padding-inline );
				padding-block: var( --xb-table-cell-padding-block );

				color: var( --xb-table-cell-color );
			}

			:host( [colspan] ) {
				grid-column: span var( --colspan, 1 );
			}

			:host( [role='columnheader'] ) {
				${ typography( 'text-xs' ) };

				font-weight: ${ toCSSResult( 'font-weight-medium' ) };
				block-size: 44px;
			}

			:host( [role='cell'] ) {
				${ typography( 'text-sm' ) };

				font-weight: ${ toCSSResult( 'font-weight-regular' ) };

				min-block-size: 72px;
			}

			.cell-container {
				min-width: max-content;
				width: 100%;

				display: flex;
				gap: 8px;
				align-items: center;
			}
		`,
	];
}

export function tableRowStyles() {
	return [
		css`
			:host {
				display: block;
				width: max-content;
				min-width: 100%;

				background-color: var( --xb-table-row-background-color );
			}

			.row-container {
				display: flex;
				/* align-items: flex-start; */
				width: max-content;
				min-width: 100%;
				box-sizing: border-box;

				border-bottom: 1px solid ${ toCSSResult( 'color-gray-200' ) };
			}

			.row-controls {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				max-block-size: 72px;
				margin-inline-start: 24px;
				gap: 12px;
			}

			.content-container {
				display: flex;
				flex-direction: column;
				flex: 1;
				min-width: 0;
			}

			.cells-container {
				display: grid;
			}

			.expansion-container {
				${ transition( [
					{ property: 'max-height', easing: 'ease-out' },
					{ property: 'color' },
				] ) };

				grid-column: 1 / -1;
				display: grid;
				max-height: 0;
				overflow: hidden;
			}

			.expansion-container.is-expanded {
				${ transition( [ { property: 'max-height', easing: 'ease-in' } ] ) };

				max-height: 500px;
			}
		`,
	];
}

export function tableControlExpandStyles() {
	const expandButton = select( '.expand-button' );
	return [
		baseButtonHostStyles(),
		css`
			${ baseButtonStyles( '.expand-button' ) }

			:host( [hidden] ) {
				display: unset;
				visibility: hidden;
			}

			${ expandButton.css() } {
				--xb-button-height: 36px;

				${ transition( [ { property: 'color' }, { property: 'outline-color' } ] ) };
			}

			${ expandButton.enabled.focused.css() } {
				--xb-button-outline-color: ${ toCSSResult( 'color-gray-100' ) };
			}

			.expand-button.-is-expanded #caret {
				transform: rotate( 90deg );
			}
		`,
	];
}

export function tableControlSelectStyles() {
	const checkbox = select( 'xb-checkbox' );
	return [
		css`
			:host( [hidden] ) {
				display: unset;
				visibility: hidden;
			}
		`,
	];
}
