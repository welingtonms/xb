import { css, unsafeCSS } from 'lit';

import { active, disabled, focused } from '../../styles/state.styles';
import m from '../../styles/margin.styles';
import outline from '../../styles/outline.styles';
import p, { px, py } from '../../styles/padding.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

import layoutStyles from '../../styles/layout.styles';
import scaleStyles from '../../styles/scale.styles';

// ${ layoutStyles() }
// TODO: preparar as utilities de style para considerar o :host
/**
 * @param {string} [selector]
 * @returns
 */
function styles( selector = 'button, :host' ) {
	return css`
		:host {
			display: inline-flex;
			contain: layout style;
			box-sizing: border-box;
			align-items: center;
		}

		:host( [hidden] ) {
			display: none;
		}

		:host( :disabled ) {
			opacity: 0.25;
		}

		${ layoutStyles() }

		${ scaleStyles( { target: selector, property: '--xb-button-height' } ) }

		${ unsafeCSS( selector ) } {
			--xb-button-background-color: ${ token( 'color-white', 0 ) };
			--xb-button-color: ${ token( 'color-gray-600' ) };
			--xb-button-border-color: ${ token( 'color-white', 0 ) };
			--xb-button-outline-color: ${ token( 'color-white', 0 ) };

			--xb-button-padding-x: ${ token( 'spacing-2' ) };
			--xb-button-padding-y: ${ token( 'spacing-1' ) };

			height: var( --xb-button-height );
			min-width: var( --xb-button-height );

			${ transition( [
				{ property: 'color' },
				{ property: 'background-color' },
				{ property: 'border-color' },
				{ property: 'outline-color' },
			] ) };

			${ typography( 'button' ) };

			cursor: pointer;
			position: relative;

			box-sizing: border-box;

			display: inline-flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			text-decoration: none;

			gap: ${ token( 'spacing-2' ) };

			margin: 0;
			padding: var( --xb-button-padding-y ) var( --xb-button-padding-x );
			padding-block: var( --xb-button-padding-y );
			padding-inline: var( --xb-button-padding-x );

			background-color: var( --xb-button-background-color ) !important;
			border: 1px solid var( --xb-button-border-color );
			border-radius: 4px;
			border-image: initial;

			color: var( --xb-button-color );
			--xb-global-color: var( --xb-button-color );

			${ outline( '--xb-button-outline-color' ) };
		}

		${ disabled( selector ) }, :host( [disabled] ) {
			opacity: 0.25;

			cursor: default;
			pointer-events: none;
		}

		${ disabled( selector ) } *, :host( [disabled] ) *,
			:host( [disabled] ) ::slotted( * ) {
			pointer-events: none;
			user-select: none;
		}

		${ focused( selector ) }, :host( :is(  :focus-visible, .is-focused ) ) {
			--xb-button-outline-color: ${ token( 'color-primary-200', 0.2 ) };
		}

		${ active( selector ) }, :host( :active ) {
			--xb-button-color: ${ token( 'color-gray-500' ) };
		}

		${ unsafeCSS( selector ) } * {
			display: inline-flex;
			align-items: center;
			justify-content: center;

			${ p( token( 'spacing-0' ) ) };
			${ m( token( 'spacing-0' ) ) };
		}

		${ unsafeCSS( selector ) }[scale='extra-small'] {
			${ px( token( 'spacing-1' ) ) };
		}
	`;
}

export default styles;

// :host( [disabled] ),
// button[is='xb-button'][disabled] {
// 	opacity: 0.25;

// 	cursor: default;
// 	pointer-events: none;
// }

// :host( [disabled] ) *,
// :host( [disabled] ) ::slotted( * ),
// button[is='xb-button'][disabled] * {
// 	pointer-events: none;
// 	user-select: none;
// }

// :host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
// 	--xb-button-outline-color: ${ token( 'color-primary-200', 0.2 ) };
// }

// :host( :active ) {
// 	--xb-button-color: ${ token( 'color-gray-500' ) };
// }

// slot[name='leading']::slotted( * ),
// slot[name='trailing']::slotted( * ) {
// 	display: inline-flex;
// 	align-items: center;
// 	justify-content: center;

// 	${ p( token( 'spacing-0' ) ) };
// 	${ m( token( 'spacing-0' ) ) };
// }

// :host( [size='extra-small'] ) {
// 	${ px( token( 'spacing-1' ) ) };

// 	font-size: ${ token( 'font-size-xs' ) };
// }

// :host( [size='small'] ) {
// 	font-size: ${ token( 'font-size-sm' ) };
// }

// :host( [size='medium'] ) {
// 	font-size: ${ token( 'font-size-sm' ) };
// }

// :host( [size='large'] ) {
// 	font-size: ${ token( 'font-size-base' ) };
// }

// ${ sizeStyles( '--xb-button-height' ) }
