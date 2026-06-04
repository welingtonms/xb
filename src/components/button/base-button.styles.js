import { css } from 'lit';

import { select } from '../../styles/selector';
import m from '../../styles/margin.styles';
import outline from '../../styles/outline.styles';
import p from '../../styles/padding.styles';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

export function baseButtonHostStyles() {
	const $ = select( ':host' );

	return css`
		${ $.css() } {
			--xb-button-background-color: transparent;
			--xb-button-color: black;
			--xb-button-border-color: transparent;
			--xb-button-border-radius: ${ toCSSResult( 'radius-md' ) };
			--xb-button-outline-color: transparent;
			--xb-button-outline-offset: 2px;

			--xb-button-padding-x: unset;
			--xb-button-padding-y: unset;
			--xb-button-min-height: unset;
			--xb-button-height: unset;
			--xb-button-min-width: unset;
			--xb-button-width: unset;
			--xb-button-gap: unset;

			--xb-button-text-align: center;

			display: inline-block;
			position: relative;
		}

		${ $.attr( '[size="xs"]' ).css() } {
			${ typography( 'text-xs' ) };
			font-weight: ${ toCSSResult( 'font-weight-medium' ) };
		}

		${ $.attr( '[size="sm"]' ).css() }, ${ $.not( '[size]' ).css() } {
			${ typography( 'text-sm' ) };
			font-weight: ${ toCSSResult( 'font-weight-medium' ) };
		}

		${ $.attr( '[size="md"]' ).css() } {
			${ typography( 'text-md' ) };
			font-weight: ${ toCSSResult( 'font-weight-medium' ) };
		}

		${ $.attr( '[size="lg"]' ).css() } {
			${ typography( 'text-lg' ) };
			font-weight: ${ toCSSResult( 'font-weight-medium' ) };
		}

		${ $.attr( '[size="xl"]' ).css() } {
			${ typography( 'text-xl' ) };
			font-weight: ${ toCSSResult( 'font-weight-medium' ) };
		}

		${ $.attr( '[size="2xl"]' ).css() } {
			${ typography( 'text-xl' ) };
			font-weight: ${ toCSSResult( 'font-weight-medium' ) };
		}
	`;
}

/**
 * @param {string} [selector]
 * @returns
 */
export function baseButtonStyles( selector ) {
	const $ = select( selector );

	return css`
		${ $.css() } {
			${ transition( [
				{ property: 'color' },
				{ property: 'background-color' },
				{ property: 'border-color' },
				{ property: 'outline-color' },
			] ) };

			font-family: inherit;
			font-style: inherit;
			font-stretch: inherit;
			letter-spacing: inherit;
			font-weight: inherit;
			font-size: inherit;
			line-height: inherit;
			letter-spacing: inherit;

			font-synthesis: inherit;
			text-rendering: inherit;
			-webkit-font-smoothing: inherit;
			-moz-osx-font-smoothing: inherit;
			-webkit-text-size-adjust: inherit;

			cursor: pointer;
			position: relative;

			contain: content;
			box-sizing: border-box;
			inline-size: var( --xb-button-width );
			min-inline-size: var( --xb-button-min-width );
			block-size: var( --xb-button-height );
			min-block-size: var( --xb-button-min-height );

			display: inline-flex;
			align-items: center;
			text-decoration: none;

			gap: var( --xb-button-gap );
			text-align: var( --xb-button-text-align );

			margin: 0;
			padding: var( --xb-button-padding-y ) var( --xb-button-padding-x );
			padding-block: var( --xb-button-padding-y );
			padding-inline: var( --xb-button-padding-x );

			background-color: var( --xb-button-background-color ) !important;
			border: 1px solid var( --xb-button-border-color );
			border-radius: var( --xb-button-border-radius );
			border-image: initial;
			-webkit-tap-highlight-color: transparent;

			color: var( --xb-button-color );

			/** outline: none; */
			${ outline( 'var( --xb-button-outline-color )', 'var( --xb-button-outline-offset )' ) };
		}

		${ $.disabled.css() } {
			cursor: default;
			pointer-events: none;
		}

		${ $.child( '*', '::slotted( * )' ).css() } {
			pointer-events: none;
			user-select: none;
		}

		${ $.child( '*:not(slot)' ).css() } {
			display: inline-flex;
			align-items: center;
			justify-content: center;

			${ p( toCSSResult( 'spacing-0' ) ) };
			${ m( toCSSResult( 'spacing-0' ) ) };
		}
	`;
}

/* Add pseudo-element for outline */
// ${ $.focused.css() }::after {
// 	content: '';
// 	position: absolute;
// 	inset: -4px; /* Adjust this value to control outline distance */
// 	border-radius: calc( var( --xb-button-border-radius, 8px ) + 4px );
// 	border: 2px solid var( --xb-button-outline-color, ${ toCSSResult( 'color-primary-100' ) } );
// 	pointer-events: none;
// }

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
// 	--xb-button-outline-color: ${ toCSSResult( 'color-primary-200', 0.2 ) };
// }

// :host( :active ) {
// 	--xb-button-color: ${ toCSSResult( 'color-gray-500' ) };
// }

// slot[name='leading']::slotted( * ),
// slot[name='trailing']::slotted( * ) {
// 	display: inline-flex;
// 	align-items: center;
// 	justify-content: center;

// 	${ p( toCSSResult( 'spacing-0' ) ) };
// 	${ m( toCSSResult( 'spacing-0' ) ) };
// }

// :host( [size='extra-small'] ) {
// 	${ px( toCSSResult( 'spacing-1' ) ) };

// 	font-size: ${ toCSSResult( 'font-size-xs' ) };
// }

// :host( [size='small'] ) {
// 	font-size: ${ toCSSResult( 'font-size-sm' ) };
// }

// :host( [size='medium'] ) {
// 	font-size: ${ toCSSResult( 'font-size-sm' ) };
// }

// :host( [size='large'] ) {
// 	font-size: ${ toCSSResult( 'font-size-base' ) };
// }

// ${ sizeStyles( '--xb-button-height' ) }
