import { css } from 'lit';

import { px, py } from '../../../styles/padding.styles';
import m from '../../../styles/margin.styles';
import toCSSResult from '../../../utils/to-css-result';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';

function styles() {
	return [
		layoutStyles(),
		css`
			:host {
				--xb-sidebar-background-color: initial;
				--xb-sidebar-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-sidebar-border-style: none;
				--xb-sidebar-border-width: 1px;
				--xb-sidebar-color: unset;
				--xb-sidebar-gap: ${ toCSSResult( 'spacing-4' ) };
				--xb-sidebar-padding-x: ${ toCSSResult( 'spacing-2' ) };
				--xb-sidebar-padding-y: ${ toCSSResult( 'spacing-2' ) };
				--xb-sidebar-side-width: initial;
				--xb-sidebar-min-content-width: 50%;

				width: 100%;

				${ m( toCSSResult( 'spacing-0' ) ) };

				${ px( 'var(--xb-sidebar-padding-x)' ) };
				${ py( 'var(--xb-sidebar-padding-y)' ) };

				display: flex;
				flex-flow: row wrap;
				gap: var( --xb-sidebar-gap );

				border: var( --xb-sidebar-border-width ) var( --xb-sidebar-border-style )
					var( --xb-sidebar-border-color );
				color: var( --xb-sidebar-color );
				background-color: var( --xb-sidebar-background-color );
			}

			::slotted( * ) {
				${ typography( 'text-md' ) };
			}

			:host( [side-position='left'] ) ::slotted( :first-child ) {
				flex-basis: var( --xb-sidebar-side-width );
				flex-grow: 1;
			}

			:host( [side-position='left'] ) ::slotted( :last-child ) {
				flex-basis: 0;
				flex-grow: 999;
				min-inline-size: var( --xb-sidebar-min-content-width );
			}

			:host( [side-position='right'] ) ::slotted( :first-child ) {
				flex-basis: 0;
				flex-grow: 999;
				min-inline-size: var( --xb-sidebar-min-content-width );
			}

			:host( [side-position='right'] ) ::slotted( :last-child ) {
				flex-basis: var( --xb-sidebar-side-width );
				flex-grow: 1;
			}
		`,
	];
}

export default styles;
