import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import toCSSResult from '../../utils/to-css-result';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';
import { select } from '../../styles/selector';

export function badgeStyles() {
	const $ = select( ':host' );
	return [
		css`
			${ $.css() } {
				--xb-badge-color: ${ toCSSResult( 'color-white' ) };
				--xb-badge-background-color: ${ toCSSResult( 'color-gray-600' ) };
				--xb-badge-border-width: 0;
				--xb-badge-border-style: none;
				--xb-badge-border-color: ${ toCSSResult( 'color-gray-600' ) };
				--xb-badge-height: unset;
				--xb-badge-padding-inline: unset;
				--xb-badge-padding-block: unset;
				--xb-badge-gap: 4px;

				contain: layout style;
				box-sizing: border-box;
			}

			.badge {
				${ transition( [ { property: 'background-color' }, { property: 'color' } ] ) };

				display: inline-flex;
				align-items: center;
				justify-content: center;
				gap: var( --xb-badge-gap );

				box-sizing: border-box;
				block-size: var( --xb-badge-height );
				min-inline-size: var( --xb-badge-height );
				padding-inline: var( --xb-badge-padding-inline );
				padding-block: var( --xb-badge-padding-block );

				border-radius: 16px;

				color: var( --xb-badge-color );
				background-color: var( --xb-badge-background-color );
				border-width: var( --xb-badge-border-width );
				border-style: var( --xb-badge-border-style );
				border-color: var( --xb-badge-border-color );
			}

			${ $.attr( '[scale="sm"]' ).css() } {
				${ typography( 'text-xs' ) };

				--xb-badge-height: 22px;
				--xb-badge-padding-inline: 8px;
				--xb-badge-padding-block: 2px;
			}

			${ $.attr( '[scale="sm"]', '[variant="icon"]' ).css() } {
				--xb-badge-height: 20px;
				--xb-badge-padding-inline: 2px;
				--xb-badge-padding-block: 2px;
			}

			${ $.attr( '[scale="md"]' ).css() } {
				${ typography( 'text-sm' ) };

				--xb-badge-height: 24px;
				--xb-badge-padding-inline: 10px;
				--xb-badge-padding-block: 2px;
			}

			${ $.attr( '[scale="md"]', '[variant="icon"]' ).css() } {
				--xb-badge-height: 24px;
				--xb-badge-padding-inline: 4px;
				--xb-badge-padding-block: 4px;
			}

			${ $.attr( '[scale="lg"]' ).css() } {
				${ typography( 'text-sm' ) };

				--xb-badge-height: 28px;
				--xb-badge-padding-inline: 12px;
				--xb-badge-padding-block: 4px;
			}

			${ $.attr( '[scale="lg"]', '[variant="icon"]' ).css() } {
				--xb-badge-height: 28px;
				--xb-badge-padding-inline: 6px;
				--xb-badge-padding-block: 6px;
			}

			${ $.attr( '[color="gray"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-gray-100' ) };
				--xb-badge-color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ $.attr( '[color="primary"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ $.attr( '[color="error"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-error-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-error-700' ) };
			}

			${ $.attr( '[color="warning"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-warning-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-warning-700' ) };
			}

			${ $.attr( '[color="success"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-success-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-success-700' ) };
			}

			${ $.attr( '[color="blue-gray"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-blue-gray-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-blue-gray-700' ) };
			}

			${ $.attr( '[color="blue-light"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-blue-light-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-blue-light-700' ) };
			}

			${ $.attr( '[color="blue"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-blue-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-blue-700' ) };
			}

			${ $.attr( '[color="indigo"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-indigo-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-indigo-700' ) };
			}

			${ $.attr( '[color="purple"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-purple-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-purple-700' ) };
			}

			${ $.attr( '[color="pink"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-pink-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-pink-700' ) };
			}

			${ $.attr( '[color="rose"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-rose-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-rose-700' ) };
			}

			${ $.attr( '[color="orange"]' ).css() } {
				--xb-badge-background-color: ${ toCSSResult( 'color-orange-50' ) };
				--xb-badge-color: ${ toCSSResult( 'color-orange-700' ) };
			}
		`,
	];
}
