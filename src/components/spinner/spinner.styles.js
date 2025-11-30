import { css } from 'lit';

import { px } from '../../styles/padding.styles';
import toCSSResult from '../../utils/to-css-result';

function styles() {
	return [
		css`
			:host {
				--xb-spinner-height: 0.25rem;

				margin: 0 auto;
				width: 100%;

				${ px( toCSSResult( 'spacing-2' ) ) };

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

				background-color: rgb(var(--xb-color-rose-800));
				background-image: linear-gradient( 90deg, rgb(var(--xb-color-rose-800)) 0%, rgb(var(--xb-color-rose-200)) 100% );

				background-size: 400% 400%;

				filter: progid:dximagetransform.microsoft.gradient(startColorstr="rgb(var(--xb-color-rose-800))",endColorstr="rgb(var(--xb-color-rose-200))",GradientType=1);
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
