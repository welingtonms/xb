import { css } from 'lit';

function styles() {
	return [
		css`
			:host {
				--xb-radio-height: initial;
			}

			.radio-group {
				box-sizing: border-box;

				width: 100%;
			}
		`,
	];
}

export default styles;
