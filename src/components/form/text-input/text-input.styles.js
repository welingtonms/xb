import { css } from 'lit';

import { active, disabled, focused, hovered } from '../../../styles/state.styles';
import m from '../../../styles/margin.styles';
import outline from '../../../styles/outline.styles';
import p, { px, py, pl, pr } from '../../../styles/padding.styles';
import toCSSResult from '../../../utils/to-css-result';
import transition from '../../../styles/transition.styles';
import typography from '../../../styles/typography.styles';

import layoutStyles from '../../../styles/layout.styles';
import sizeStyles from '../../../styles/size.styles';
import { select } from '../../../styles/selector';

export function textInputStyles() {
	const outerContainer = select( '.outer-container' );
	const focusContainer = select( '.focus-container' );

	return [
		// layoutStyles(),
		css`
			:host {
				--xb-text-input-height: 40px;
				--xb-text-input-border-color: ${ toCSSResult( 'color-border-primary' ) };
				--xb-text-input-outline-color: ${ toCSSResult( 'color-white', 0 ) };
				--xb-text-input-outline-offset: 2px;
				--xb-text-input-placeholder-color: ${ toCSSResult( 'color-gray-400' ) };

				--xb-text-input-padding-x: ${ toCSSResult( 'spacing-0' ) };
				--xb-text-input-padding-l: ${ toCSSResult( 'spacing-0' ) };
				--xb-text-input-padding-r: ${ toCSSResult( 'spacing-0' ) };
				--xb-text-input-padding-y: ${ toCSSResult( 'spacing-0' ) };

				--xb-text-input-input-padding-x: ${ toCSSResult( 'spacing-3' ) };
			}

			:host( [disabled] ) {
				pointer-events: none;
			}

			.outer-container {
				${ transition( [ { property: 'border-color' }, { property: 'outline-color' } ] ) };

				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				gap: ${ toCSSResult( 'spacing-2' ) };

				block-size: var( --xb-text-input-height );
				box-sizing: border-box;

				border-radius: ${ toCSSResult( 'radius-md' ) };
				border: 1px solid var( --xb-text-input-border-color );

				padding-inline: var( --xb-text-input-padding-l ) var( --xb-text-input-padding-r );
				padding-block: var( --xb-text-input-padding-y );

				${ outline(
					'var( --xb-text-input-outline-color )',
					'var( --xb-text-input-outline-offset )'
				) };
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
				--xb-text-input-padding-l: ${ toCSSResult( 'spacing-3' ) };
			}

			.outer-container.has-slotted-trailing:not( .has-slotted-addon-trailing ),
			.outer-container:not( .has-slotted-trailing, .has-slotted-addon-trailing ) {
				--xb-text-input-padding-r: ${ toCSSResult( 'spacing-3' ) };
			}

			.focus-container {
				${ typography( 'text-md' ) };
				color: ${ toCSSResult( 'color-gray-600' ) };

				flex-grow: 1;
				flex-shrink: 0;

				display: flex;
				align-items: center;
				gap: ${ toCSSResult( 'spacing-2' ) };

				height: 100%;
			}

			input {
				${ transition( [ { property: 'color' } ] ) };

				${ typography( 'text-sm' ) };

				box-sizing: border-box;
				border: none;
				outline: none;
				height: 100%;
				flex-grow: 1;
				flex-shrink: 0;

				padding-inline: 0 /** var( --xb-text-input-input-padding-x )*/;
				padding-block: ${ toCSSResult( 'spacing-2' ) };

				box-sizing: border-box;

				border-radius: ${ toCSSResult( 'radius-md' ) };
				color: ${ toCSSResult( 'color-gray-900' ) };
			}

			${ outerContainer.css() }:has(${ focusContainer.focused.css() }) {
				--xb-text-input-outline-color: ${ toCSSResult( 'color-primary-100' ) };
				--xb-text-input-border-color: ${ toCSSResult( 'color-primary-300' ) };
			}

			.leading,
			.trailing {
				${ typography( 'text-md' ) };

				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
		`,
		// sizeStyles( { property: '--xb-text-input-height' } ),
	];
}

// .leading {
// 	padding-inline-start: var( --xb-text-input-input-padding-x );
// }

// .trailing {
// 	padding-inline-end: var( --xb-text-input-input-padding-x );
// }
