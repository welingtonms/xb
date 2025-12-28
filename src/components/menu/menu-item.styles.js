import { css } from 'lit';

import { select } from '../../styles/selector';
import m from '../../styles/margin.styles';
import p, { px, py } from '../../styles/padding.styles';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';
import outline from '../../styles/outline.styles';

import sizeStyles from '../../styles/size.styles';

function styles() {
	return [
		css`
			:host {
				${ transition( [ { property: 'color' }, { property: 'background-color' }, { property: 'outline-color' } ] ) };
				${ typography( 'text-sm' ) };

				--xb-item-background-color: ${ toCSSResult( 'color-white', 0 ) };
				--xb-item-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-item-border-style: none;
				--xb-item-border-width: 1px;
				--xb-item-border-radius: ${ toCSSResult( 'radius-xxs' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-700' ) };
				--xb-item-height: initial;
				--xb-item-outline-color: transparent;
				--xb-item-outline-offset: 2px;

				cursor: pointer;
				position: relative;

				box-sizing: border-box;

				display: inline-flex;
				align-items: center;
				justify-content: flex-start;
				text-decoration: none;

				contain: layout style;

				gap: ${ toCSSResult( 'spacing-2' ) };

				padding-inline: 16px;
				padding-block: 10px;
				block-size: var( --xb-item-height );

				background-color: var( --xb-item-background-color );
				color: var( --xb-item-color );

				font-weight: ${ toCSSResult( 'font-weight-regular' ) };

				border-top: none;
				border-inline: none;
				border-bottom-width: var( --xb-item-border-width );
				border-bottom-style: var( --xb-item-border-style );
				border-bottom-color: var( --xb-item-border-color );
				border-radius: var( --xb-item-border-radius );

				z-index: 0;

				${ outline( 'var( --xb-item-outline-color )', 'var( --xb-item-outline-offset )' ) };
			}

			:host( [hidden] ) {
				display: none;
			}

			slot[name='leading']::slotted( * ),
			slot[name='trailing']::slotted( * ) {
				--xb-global-color: var( --xb-item-color );

				display: inline-flex;
				align-items: center;
				justify-content: center;

				${ p( toCSSResult( 'spacing-0' ) ) };
				${ m( toCSSResult( 'spacing-0' ) ) };
			}

			:host( :hover:not([selected], [disabled]) ) {
				--xb-item-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( [selected] ) {
				--xb-item-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( [selected]:not([disabled]):hover ) {
				--xb-item-background-color: ${ toCSSResult( 'color-gray-100' ) };
				--xb-item-color: ${ toCSSResult( 'color-gray-900' ) };
			}

			:host( :is( :focus-visible, .is-focused ) ) {
				--xb-item-outline-color: ${ toCSSResult( 'color-primary-100' ) };
				z-index: 1;
			}

			:host( [disabled] ) {
				pointer-events: none;
				user-select: none;
				opacity: 0.25;

				cursor: default;
			}

			:host( [disabled] ) ::slotted( * ) {
				pointer-events: none;
				user-select: none;
			}
		`,
	];
}

export default styles;
