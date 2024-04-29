import { css } from 'lit';

function styles() {
	return css`
		:is( [borderless*='top'], [borderless*='vertical'], [borderless='all'] ) {
			border-top: none !important;
		}

		:is( [borderless*='right'], [borderless*='horizontal'], [borderless='all'] ) {
			border-right: none !important;
		}

		:is( [borderless*='bottom'], [borderless*='vertical'], [borderless='all'] ) {
			border-bottom: none !important;
		}

		:is( [borderless*='left'], [borderless*='horizontal'], [borderless='all'] ) {
			border-left: none !important;
		}

		:is( [paddingless*='top'], [paddingless*='vertical'], [paddingless='all'] ) {
			padding-top: 0 !important;
		}

		:is( [paddingless*='right'], [paddingless*='horizontal'], [paddingless='all'] ) {
			padding-right: 0 !important;
		}

		:is( [paddingless*='bottom'], [paddingless*='vertical'], [paddingless='all'] ) {
			padding-bottom: 0 !important;
		}

		:is( [paddingless*='left'], [paddingless*='horizontal'], [paddingless='all'] ) {
			padding-left: 0 !important;
		}
	`;
}

export default styles;
