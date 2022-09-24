import { css } from 'lit';

function styles() {
	return [
		css`
			.-no-t-border {
				border-top: none !important;
			}

			.-no-r-border {
				border-right: none !important;
			}

			.-no-b-border {
				border-bottom: none !important;
			}

			.-no-l-border {
				border-left: none !important;
			}

			.-no-t-padding {
				padding-top: 0 !important;
			}

			.-no-r-padding {
				padding-right: 0 !important;
			}

			.-no-b-padding {
				padding-bottom: 0 !important;
			}

			.-no-l-padding {
				padding-left: 0 !important;
			}
		`,
	];
}

export default styles;
