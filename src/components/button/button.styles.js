import { css } from 'lit';

import { baseButtonHostStyles, baseButtonStyles } from './base-button.styles';
import toCSSResult from '../../utils/to-css-result';
import { select } from '../../styles/selector';
import typography from '../../styles/typography.styles';

/**
 * @param {string} [selector]
 * @returns
 */
function styles( selector = ':host' ) {
	const $ = select( selector );
	const primary = select( selector ).attr( '[variant="primary"]' );
	const secondaryColor = select( selector ).attr( '[variant="secondary-color"]' );
	const secondaryGray = select( selector ).attr( '[variant="secondary-gray"]' );
	const tertiaryColor = select( selector ).attr( '[variant="tertiary-color"]' );
	const tertiaryGray = select( selector ).attr( '[variant="tertiary-gray"]' );
	const linkColor = select( selector ).attr( '[variant="link-color"]' );
	const linkGray = select( selector ).attr( '[variant="link-gray"]' );
	const icon = select( selector ).attr( '[variant="icon"]' );

	return [
		baseButtonHostStyles(),
		baseButtonStyles( 'button' ),
		css`
			button {
				justify-content: center;
			}
		`,
		css`
			${ $.css() } {
				display: inline-block;
				position: relative;
			}

			${ $.attr( '[hidden]' ).css() } {
				display: none;
			}

			${ $.attr( '[size="xs"]' ).css() } {
				${ typography( 'text-xs' ) };

				--xb-button-height: 24px;
				--xb-button-min-width: 24px;

				--xb-button-padding-x: 8px;
				--xb-button-padding-y: 6px;
			}

			${ $.attr( '[size="xs"]' ).descendant( '.has-slotted-content' ).css() } {
				--xb-button-gap: 6px;
			}

			${ $.attr( '[size="xs"]', '[variant="icon"]' ).css() } {
				--xb-button-padding-x: 2px;
				--xb-button-padding-y: 2px;
			}

			${ $.attr( '[size="sm"]' ).css() } {
				--xb-button-height: 36px;
				--xb-button-min-width: 36px;

				--xb-button-padding-x: 14px;
				--xb-button-padding-y: 8px;
			}

			${ $.attr( '[size="sm"]' ).descendant( '.has-slotted-content' ).css() } {
				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="sm"]', '[variant="icon"]' ).css() } {
				--xb-button-padding-x: 8px;
				--xb-button-padding-y: 8px;
			}

			${ $.attr( '[size="md"]' ).css() } {
				--xb-button-height: 40px;
				--xb-button-min-width: 40px;

				--xb-button-padding-x: 16px;
				--xb-button-padding-y: 10px;
			}

			${ $.attr( '[size="md"]' ).descendant( '.has-slotted-content' ).css() } {
				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="md"]', '[variant="icon"]' ).css() } {
				--xb-button-padding-x: 10px;
				--xb-button-padding-y: 10px;
			}

			${ $.attr( '[size="lg"]' ).css() } {
				--xb-button-height: 44px;
				--xb-button-min-width: 44px;

				--xb-button-padding-x: 18px;
				--xb-button-padding-y: 10px;
			}

			${ $.attr( '[size="lg"]' ).descendant( '.has-slotted-content' ).css() } {
				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="lg"]', '[variant="icon"]' ).css() } {
				--xb-button-padding-x: 12px;
				--xb-button-padding-y: 12px;
			}

			${ $.attr( '[size="xl"]' ).css() } {
				--xb-button-height: 48px;
				--xb-button-min-width: 48px;

				--xb-button-padding-x: 20px;
				--xb-button-padding-y: 12px;
			}

			${ $.attr( '[size="xl"]' ).descendant( '.has-slotted-content' ).css() } {
				--xb-button-gap: 8px;
			}

			${ $.attr( '[size="xl"]', '[variant="icon"]' ).css() } {
				--xb-button-padding-x: 14px;
				--xb-button-padding-y: 14px;
			}

			${ $.attr( '[size="2xl"]' ).css() } {
				--xb-button-height: 60px;
				--xb-button-min-width: 60px;

				--xb-button-padding-x: 28px;
				--xb-button-padding-y: 16px;
			}

			${ $.attr( '[size="2xl"]' ).descendant( '.has-slotted-content' ).css() } {
				--xb-button-gap: 12px;
			}

			${ $.attr( '[size="2xl"]', '[variant="icon"]' ).css() } {
				--xb-button-padding-x: 16px;
				--xb-button-padding-y: 16px;
			}

			/* Variants */
			${ primary.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };
			}

			${ primary.enabled.hovered.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-700' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-700' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };
			}

			${ primary.enabled.focused.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-primary-100' ) };
			}

			${ primary.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-200' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-200' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };
			}

			${ primary.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };
			}

			${ primary.enabled.hovered.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-700' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-700' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };
			}

			${ primary.enabled.focused.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-600' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-primary-100' ) };
			}

			${ primary.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-200' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-200' ) };
				--xb-button-color: ${ toCSSResult( 'color-white' ) };
			}

			${ secondaryColor.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ secondaryColor.enabled.hovered.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-100' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-100' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ secondaryColor.enabled.focused.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-primary-100' ) };
			}

			${ secondaryColor.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-25' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-25' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-300' ) };
			}

			${ secondaryGray.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ secondaryGray.enabled.hovered.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-800' ) };
			}

			${ secondaryGray.enabled.focused.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-300' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-700' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-gray-100' ) };
			}

			${ secondaryGray.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-200' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-300' ) };
			}

			${ tertiaryColor.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ tertiaryColor.enabled.hovered.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-primary-50' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };
			}

			${ tertiaryColor.enabled.focused.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-color: ${ toCSSResult( 'color-primary-700' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-primary-100' ) };
			}

			${ tertiaryColor.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-300' ) };
			}

			${ tertiaryGray.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-600' ) };
			}

			${ tertiaryGray.enabled.hovered.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ tertiaryGray.enabled.focused.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-600' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-gray-100' ) };
			}

			${ tertiaryGray.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-300' ) };
			}

			${ icon.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-radius: 50%;
				--xb-button-color: ${ toCSSResult( 'color-gray-600' ) };
			}

			${ icon.enabled.hovered.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-gray-50' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-700' ) };
			}

			${ icon.enabled.focused.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-600' ) };

				--xb-button-outline-color: ${ toCSSResult( 'color-primary-100' ) };
			}

			${ icon.disabled.css() } {
				--xb-button-background-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-border-color: ${ toCSSResult( 'color-white' ) };
				--xb-button-color: ${ toCSSResult( 'color-gray-300' ) };
			}

			/* Link styles */
			a {
				position: absolute;
				inset: 0;
			}
		`,
	];
}

export default styles;

// ${ text.enabled.hovered.css() } {
// 	--xb-button-background-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-border-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-color: ${ toCSSResult( 'color-secondary-500' ) };
// }

// ${ text.enabled.active.css() } {
// 	--xb-button-background-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-border-color: ${ toCSSResult( 'color-white', 0 ) };
// 	--xb-button-color: ${ toCSSResult( 'color-secondary-300' ) };
// 	--xb-button-outline-color: ${ toCSSResult( 'color-secondary-500', 0.2 ) };
// }

// ${ text.enabled.focused.hovered.css() } {
// 	--xb-button-outline-color: ${ toCSSResult( 'color-secondary-500', 0.2 ) };
// }
