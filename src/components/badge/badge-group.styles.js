import { css } from 'lit';

import { select } from '../../styles/selector';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

export function badgeGroupStyles() {
	const $ = select( ':host' );
	return [
		css`
			${ $.css() } {
				--xb-badge-group-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-group-background-color: ${ toCSSResult( 'color-gray-600' ) };
				--xb-badge-group-height: unset;
				--xb-badge-group-padding-inline: unset;
				--xb-badge-group-padding-block: unset;
				--xb-badge-group-gap: 4px;

				display: inline-flex;
				contain: layout style;
				box-sizing: border-box;
				align-items: center;
			}

			.badge-group {
				${ transition( [ { property: 'background-color' }, { property: 'color' } ] ) };

				display: inline-flex;
				align-items: center;
				justify-content: center;
				gap: var( --xb-badge-group-gap );

				box-sizing: border-box;
				height: var( --xb-badge-group-height );
				min-width: var( --xb-badge-group-height );
				padding-inline: var( --xb-badge-group-padding-inline );
				padding-block: var( --xb-badge-group-padding-block );

				border-radius: 16px;

				color: var( --xb-badge-group-color );
				background-color: var( --xb-badge-group-background-color );
			}

			${ $.attr( '[scale="sm"]' ).css() } {
				${ typography( 'text-xs' ) };

				--xb-badge-group-gap: 8px;
				--xb-badge-group-height: 28px;
				--xb-badge-group-padding-inline: 4px;
				--xb-badge-group-padding-block: 4px;
			}

			${ $.attr( '[scale="sm"]', '[scale="md"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-height: 22px;
			}

			${ $.attr( '[scale="md"]' ).css() } {
				${ typography( 'text-sm' ) };

				--xb-badge-group-gap: 8px;
				--xb-badge-group-height: 30px;
				--xb-badge-group-padding-inline: 4px;
				--xb-badge-group-padding-block: 4px;
			}

			${ $.attr( '[scale="lg"]' ).css() } {
				${ typography( 'text-sm' ) };

				--xb-badge-group-gap: 12px;
				--xb-badge-group-height: 32px;
				--xb-badge-group-padding-inline: 4px;
				--xb-badge-group-padding-block: 4px;
			}

			${ $.attr( '[scale="lg"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-height: 24px;
			}

			.badge-group.-has-slotted-leading-badge:not( .-has-slotted-trailing-badge ) {
				--xb-badge-group-padding-inline: 4px 10px;
			}

			.badge-group.-has-slotted-trailing-badge:not( .-has-slotted-leading-badge ) {
				--xb-badge-group-padding-inline: 10px 4px;
			}

			${ $.attr( '[color="gray"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-gray-100' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ $.attr( '[color="gray"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ $.attr( '[color="primary"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ $.attr( '[color="primary"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-primary-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ $.attr( '[color="error"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-error-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-error-700' ) };
			}

			${ $.attr( '[color="error"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-error-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-error-700' ) };
			}

			${ $.attr( '[color="warning"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-warning-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-warning-700' ) };
			}

			${ $.attr( '[color="warning"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-warning-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-warning-700' ) };
			}

			${ $.attr( '[color="success"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-success-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-success-700' ) };
			}

			${ $.attr( '[color="success"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-success-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-success-700' ) };
			}

			${ $.attr( '[color="blue-gray"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-blue-gray-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-blue-gray-700' ) };
			}

			${ $.attr( '[color="blue-gray"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-blue-gray-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-blue-gray-700' ) };
			}

			${ $.attr( '[color="blue-light"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-blue-light-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-blue-light-700' ) };
			}

			${ $.attr( '[color="blue-light"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-blue-light-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-blue-light-700' ) };
			}

			${ $.attr( '[color="blue"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-blue-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-blue-700' ) };
			}

			${ $.attr( '[color="blue"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-blue-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-blue-700' ) };
			}

			${ $.attr( '[color="indigo"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-indigo-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-indigo-700' ) };
			}

			${ $.attr( '[color="indigo"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-indigo-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-indigo-700' ) };
			}

			${ $.attr( '[color="purple"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-purple-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-purple-700' ) };
			}

			${ $.attr( '[color="purple"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-purple-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-purple-700' ) };
			}

			${ $.attr( '[color="pink"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-pink-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-pink-700' ) };
			}

			${ $.attr( '[color="pink"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-pink-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-pink-700' ) };
			}

			${ $.attr( '[color="rose"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-rose-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-rose-700' ) };
			}

			${ $.attr( '[color="rose"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-rose-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-rose-700' ) };
			}

			${ $.attr( '[color="orange"]' ).css() } {
				--xb-badge-group-background-color: ${ toCSSResult( 'color-orange-50' ) };
				--xb-badge-group-color: ${ toCSSResult( 'color-orange-700' ) };
			}

			${ $.attr( '[color="orange"]' ).descendant( '::slotted(xb-badge)' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-border-color: ${ toCSSResult( 'color-orange-200' ) };
				--xb-badge-border-width: 1px;
				--xb-badge-border-style: solid;
				--xb-badge-color: ${ toCSSResult( 'color-orange-700' ) };
			}
		`,
	];
}
