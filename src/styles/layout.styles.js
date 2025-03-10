import { css } from 'lit';

function styles() {
	return css`
		:is( [borderless*='top'], [borderless*='vertical'], [borderless='all'] ),
		:host(:is([borderless='all'], [borderless='top'], [borderless='vertical'])) {
			border-top: none !important;
		}

		:is( [borderless*='right'], [borderless*='horizontal'], [borderless='all'] ),
		:host(:is([borderless='all'], [borderless='right'], [borderless='horizontal'])) {
			border-right: none !important;
		}

		:is( [borderless*='bottom'], [borderless*='vertical'], [borderless='all'] ),
		:host(:is([borderless='all'], [borderless='bottom'], [borderless='vertical'])) {
			border-bottom: none !important;
		}

		:is( [borderless*='left'], [borderless*='horizontal'], [borderless='all'] ),
		:host(:is([borderless='all'], [borderless='left'], [borderless='horizontal'])) {
			border-left: none !important;
		}

		:is( [paddingless*='top'], [paddingless*='vertical'], [paddingless='all'] ),
		:host(:is([paddingless='all'], [paddingless='top'], [paddingless='vertical'])) {
			padding-top: 0 !important;
		}

		:is( [paddingless*='right'], [paddingless*='horizontal'], [paddingless='all'] ),
		:host(:is([paddingless='all'], [paddingless='right'], [paddingless='horizontal'])) {
			padding-right: 0 !important;
		}

		:is( [paddingless*='bottom'], [paddingless*='vertical'], [paddingless='all'] ),
		:host(:is([paddingless='all'], [paddingless='bottom'], [paddingless='vertical'])) {
			padding-bottom: 0 !important;
		}

		:is( [paddingless*='left'], [paddingless*='horizontal'], [paddingless='all'] ),
		:host(:is([paddingless='all'], [paddingless='left'], [paddingless='horizontal'])) {
			padding-left: 0 !important;
		}
	`;
}

export default styles;
