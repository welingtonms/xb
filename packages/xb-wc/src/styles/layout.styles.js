import { css } from 'lit';

function styles() {
	return [
		css`
			.-no-t-border,
			:host( :is( [borderless*='top'], [borderless*='vertical'], [borderless='all'] ) ) {
				border-top: none !important;
			}

			.-no-r-border,
			:host( :is( [borderless*='right'], [borderless*='horizontal'], [borderless='all'] ) ) {
				border-right: none !important;
			}

			.-no-b-border,
			:host( :is( [borderless*='bottom'], [borderless*='vertical'], [borderless='all'] ) ) {
				border-bottom: none !important;
			}

			.-no-l-border,
			:host( :is( [borderless*='left'], [borderless*='horizontal'], [borderless='all'] ) ) {
				border-left: none !important;
			}

			.-no-t-padding,
			:host( :is( [paddingless*='top'], [paddingless*='vertical'], [paddingless='all'] ) ) {
				padding-top: 0 !important;
			}

			.-no-r-padding,
			:host( :is( [paddingless*='right'], [paddingless*='horizontal'], [paddingless='all'] ) ) {
				padding-right: 0 !important;
			}

			.-no-b-padding,
			:host( :is( [paddingless*='bottom'], [paddingless*='vertical'], [paddingless='all'] ) ) {
				padding-bottom: 0 !important;
			}

			.-no-l-padding,
			:host( :is( [paddingless*='left'], [paddingless*='horizontal'], [paddingless='all'] ) ) {
				padding-left: 0 !important;
			}
		`,
	];
}

export default styles;
