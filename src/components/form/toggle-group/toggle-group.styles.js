import { css } from 'lit';

import { baseButtonHostStyles, baseButtonStyles } from '../../button/base-button.styles';
import { select } from '../../../styles/selector';
import toCSSResult from '../../../utils/to-css-result';

export function toggleGroupStyles() {
	const $ = select( ':host' );

	return [
		css`
			${ $.css() } {
				position: relative;

				display: inline-flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: center;
				gap: 2px;

				outline: none;
			}

			${ $.child( '::slotted( * )' ).css() } {
				--xb-toggle-top-left-border-radius: 0;
				--xb-toggle-top-right-border-radius: 0;
				--xb-toggle-bottom-left-border-radius: 0;
				--xb-toggle-bottom-right-border-radius: 0;
			}

			${ $.child( '::slotted( *:first-of-type )' ).css() } {
				--xb-toggle-top-left-border-radius: var( --xb-button-border-radius );
				--xb-toggle-bottom-left-border-radius: var( --xb-button-border-radius );
			}

			${ $.child( '::slotted( *:last-of-type )' ).css() } {
				--xb-toggle-top-right-border-radius: var( --xb-button-border-radius );
				--xb-toggle-bottom-right-border-radius: var( --xb-button-border-radius );
			}

			${ $.attr( '[size="xs"]' ).child( '::slotted( * )' ).css() } {
				--xb-button-padding-x: 2px;
				--xb-button-padding-y: 2px;

				--xb-button-height: 24px;
				--xb-button-width: 24px;
			}

			${ $.attr( '[size="sm"]' ).child( '::slotted( * )' ).css() } {
				--xb-button-height: 36px;
				--xb-button-min-width: 36px;

				--xb-button-padding-x: 14px;
				--xb-button-padding-y: 8px;

				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="sm"]' ).child( '::slotted( * )' ).css() },
			${ $.not( '[size]' ).css() } {
				--xb-button-padding-x: 8px;
				--xb-button-padding-y: 8px;

				--xb-button-height: 36px;
				--xb-button-min-width: 36px;

				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="md"]' ).child( '::slotted( * )' ).css() } {
				--xb-button-height: 40px;
				--xb-button-min-width: 40px;

				--xb-button-padding-x: 16px;
				--xb-button-padding-y: 10px;

				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="lg"]' ).child( '::slotted( * )' ).css() } {
				--xb-button-height: 44px;
				--xb-button-min-width: 44px;

				--xb-button-padding-x: 18px;
				--xb-button-padding-y: 10px;

				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="xl"]' ).child( '::slotted( * )' ).css() } {
				--xb-button-height: 48px;
				--xb-button-min-width: 48px;

				--xb-button-padding-x: 20px;
				--xb-button-padding-y: 12px;

				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="2xl"]' ).child( '::slotted( * )' ).css() } {
				--xb-button-height: 60px;
				--xb-button-min-width: 60px;

				--xb-button-padding-x: 28px;
				--xb-button-padding-y: 16px;
			}
		`,
	];
}

export function toggleStyles() {
	const $ = select( ':host' );
	const button = select( 'button' );

	return [
		css`
			${ $.css() } {
				display: inline-block;
				position: relative;
				contain: layout style;

				z-index: 0;
			}

			${ $.focused.css() } {
				z-index: 1;
			}
		`,
		baseButtonHostStyles(),
		baseButtonStyles( 'button' ),
		css`
			${ button.css() } {
				justify-content: space-between;

				border-top-left-radius: var( --xb-toggle-top-left-border-radius );
				border-top-right-radius: var( --xb-toggle-top-right-border-radius );
				border-bottom-left-radius: var( --xb-toggle-bottom-left-border-radius );
				border-bottom-right-radius: var( --xb-toggle-bottom-right-border-radius );
			}

			${ button.not( '.has-slotted-content' ).css() } {
				justify-content: center;
			}

			${ button.enabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ button.enabled.hovered.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-100' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-100' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ button.enabled.focused.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-primary-100' ) };
			}

			${ button.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-25' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-25' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-300' ) };
			}

			${ $.attr( '[aria-checked="true"]' ).css() } ${ button.enabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };

				border-top-left-radius: var( --xb-toggle-top-left-border-radius );
				border-top-right-radius: var( --xb-toggle-top-right-border-radius );
				border-bottom-left-radius: var( --xb-toggle-bottom-left-border-radius );
				border-bottom-right-radius: var( --xb-toggle-bottom-right-border-radius );
			}

			${ $.attr( '[aria-checked="true"]' ).hovered.css() } ${ button.enabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-700' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-700' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };
			}

			${ $.attr( '[aria-checked="true"]' ).focused.css() } ${ button.enabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-primary-100' ) };
			}

			${ $.attr( '[aria-checked="true"]' ).css() } ${ button.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-200' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-200' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };
			}
		`,
	];
}

// :host {
// 	--xb-button-background-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-border-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-color: ${ toCSSResult( 'color-primary-500' ) };
// }

// :host( :not( :disabled ):hover ) {
// 	--xb-button-background-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-border-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-color: ${ toCSSResult( 'color-secondary-500' ) };
// }

// :host( :not( :disabled ):active ) {
// 	--xb-button-background-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-border-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-color: ${ toCSSResult( 'color-secondary-300' ) };
// 	--xb-button-outline-color: ${ toCSSResult( 'color-secondary-500', 0.2 ) };
// }

// :host( [aria-checked='true'] ) {
// 	--xb-button-background-color: ${ toCSSResult( 'color-primary-500' ) };
// 	--xb-button-border-color: ${ toCSSResult( 'color-primary-500' ) };
// 	--xb-button-color: ${ toCSSResult( 'color-white' ) };
// }

// :host( :not( :disabled )[aria-checked='true']:hover ) {
// 	--xb-button-background-color: ${ toCSSResult( 'color-secondary-500' ) };
// 	--xb-button-border-color: ${ toCSSResult( 'color-secondary-500' ) };
// 	--xb-button-color: ${ toCSSResult( 'color-white' ) };
// 	--xb-button-outline-color: ${ toCSSResult( 'color-secondary-500', 0.2 ) };
// }

// :host( :not( :disabled )[aria-checked='true']:active ) {
// 	--xb-button-background-color: ${ toCSSResult( 'color-secondary-300' ) };
// 	--xb-button-border-color: ${ toCSSResult( 'color-secondary-300' ) };
// 	--xb-button-color: ${ toCSSResult( 'color-white' ) };
// 	--xb-button-outline-color: ${ toCSSResult( 'color-secondary-500', 0.2 ) };
// }
