import { css } from 'lit';

import { px, py } from '../../styles/padding.styles';
import outline from '../../styles/outline.styles';
import token from '../../utils/get-token';
import transition from '../../styles/transition.styles';
import typography from '../../styles/typography.styles';

function styles() {
	return [
		css`
			:host {
				--xb-accordion-header-height: initial;
				--xb-accordion-header-background-color: ${ token( 'color-white', 0 ) };
				--xb-accordion-header-color: ${ token( 'color-primary-500' ) };
				--xb-accordion-header-border-color: ${ token( 'color-primary-500' ) };
				--xb-accordion-header-outline-color: ${ token( 'color-white', 0 ) };
				--xb-accordion-header-padding-x: ${ token( 'spacing-4' ) };
				--xb-accordion-header-padding-y: ${ token( 'spacing-1' ) };

				display: inline-flex;

				height: var( --xb-accordion-header-height );
				min-width: var( --xb-accordion-header-height );

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

				${ px( 'var(--xb-accordion-header-padding-x)' ) };
				${ py( 'var(--xb-accordion-header-padding-y)' ) };

				background-color: var( --xb-accordion-header-background-color );

				color: var( --xb-accordion-header-color );
				--xb-global-color: var( --xb-accordion-header-color );

				${ outline( '--xb-accordion-header-outline-color' ) };

				display: flex;
				justify-content: space-between;
				border-radius: 0;

				height: 64px;
			}

			:host( :hover ),
			:host( [aria-expanded='true'] ) {
				--xb-accordion-header-background-color: ${ token( 'color-primary-500' ) };
				--xb-accordion-header-border-color: ${ token( 'color-primary-500' ) };
				--xb-accordion-header-color: ${ token( 'color-white' ) };
			}

			:host( :is( :active, .is-active ) ) {
				--xb-accordion-header-background-color: ${ token( 'color-primary-300' ) };
				--xb-accordion-header-border-color: ${ token( 'color-primary-300' ) };
				--xb-accordion-header-color: ${ token( 'color-white' ) };
			}

			:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {
				--xb-accordion-header-outline-color: ${ token( 'color-primary-500', 0.2 ) };
			}

			.indicator {
				${ transition( [
					{
						property: 'transform',
					},
				] ) };
			}

			:host( [aria-expanded='true'] ) .indicator {
				transform: rotate( 180deg );
			}
		`,

	];
}

export default styles;
