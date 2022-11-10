import { css } from 'lit';

import token from '../../utils/get-token';
import color from '../../utils/get-color-token';
import { transition, px } from '../../styles';

function styles() {
	return [
		css`
			:host {
				--xb-spinner-height: 0.25rem;

				margin: 0 auto;
				width: 100%;
			}

			.spinner {
				${ px( token( 'spacing-2' ) ) };

				position: relative;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				box-sizing: border-box;
				width: 100%;
				min-height: var( --xb-spinner-height );
			}

			.bar {
				position: absolute;

				top: 0;
				right: 100%;
				bottom: 0;
				left: 0;

				width: 0;
				height: var( --xb-spinner-height );

				background-color: ${ color( 'color-primary-100' ) };
				background-image: linear-gradient(
					90deg,
					${ color( 'color-primary-100' ) } 0%,
					${ color( 'color-secondary-100' ) } 100%
				);

				background-size: 400% 400%;

				filter: progid:dximagetransform.microsoft.gradient(startColorstr="${ color(
					'color-primary-100'
				) }",endColorstr="${ color( 'color-secondary-100' ) }",GradientType=1);
				animation: borealis-bar 2s ease infinite;
			}

			@keyframes borealis-bar {
				0% {
					width: 0%;
					background-position: 0% 50%;
				}

				30% {
					right: 0%;
					left: 0%;
					width: 100%;
				}

				50% {
					background-position: 100% 50%;
				}

				60% {
					right: 0%;
					left: 100%;
					width: 0%;
				}

				100% {
					right: 100%;
					left: 0%;
					width: 0%;
					background-position: 0% 50;
				}
			}
		`,
	];
}

export default styles;
