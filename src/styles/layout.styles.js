import { css, unsafeCSS } from 'lit';

const DEFAULT_ARGS = { descendantSelector: '' };

function styles( args ) {
	const { descendantSelector } = { ...DEFAULT_ARGS, ...( args || {} ) };

	return css`
		:is( [borderless*='top'], [borderless*='vertical'], [borderless='all'] )
			${ unsafeCSS( descendantSelector ) },
			:host( :is( [borderless='all'], [borderless='top'], [borderless='vertical'] ) )
			${ unsafeCSS( descendantSelector ) } {
			border-top: none !important;
		}

		:is( [borderless*='right'], [borderless*='horizontal'], [borderless='all'] )
			${ unsafeCSS( descendantSelector ) },
			:host( :is( [borderless='all'], [borderless='right'], [borderless='horizontal'] ) )
			${ unsafeCSS( descendantSelector ) } {
			border-right: none !important;
		}

		:is( [borderless*='bottom'], [borderless*='vertical'], [borderless='all'] )
			${ unsafeCSS( descendantSelector ) },
			:host( :is( [borderless='all'], [borderless='bottom'], [borderless='vertical'] ) )
			${ unsafeCSS( descendantSelector ) } {
			border-bottom: none !important;
		}

		:is( [borderless*='left'], [borderless*='horizontal'], [borderless='all'] )
			${ unsafeCSS( descendantSelector ) },
			:host( :is( [borderless='all'], [borderless='left'], [borderless='horizontal'] ) )
			${ unsafeCSS( descendantSelector ) } {
			border-left: none !important;
		}

		:is( [paddingless*='top'], [paddingless*='vertical'], [paddingless='all'] )
			${ unsafeCSS( descendantSelector ) },
			:host( :is( [paddingless='all'], [paddingless='top'], [paddingless='vertical'] ) )
			${ unsafeCSS( descendantSelector ) } {
			padding-top: 0 !important;
		}

		:is( [paddingless*='right'], [paddingless*='horizontal'], [paddingless='all'] )
			${ unsafeCSS( descendantSelector ) },
			:host( :is( [paddingless='all'], [paddingless='right'], [paddingless='horizontal'] ) )
			${ unsafeCSS( descendantSelector ) } {
			padding-right: 0 !important;
		}

		:is( [paddingless*='bottom'], [paddingless*='vertical'], [paddingless='all'] )
			${ unsafeCSS( descendantSelector ) },
			:host( :is( [paddingless='all'], [paddingless='bottom'], [paddingless='vertical'] ) )
			${ unsafeCSS( descendantSelector ) } {
			padding-bottom: 0 !important;
		}

		:is( [paddingless*='left'], [paddingless*='horizontal'], [paddingless='all'] )
			${ unsafeCSS( descendantSelector ) },
			:host( :is( [paddingless='all'], [paddingless='left'], [paddingless='horizontal'] ) )
			${ unsafeCSS( descendantSelector ) } {
			padding-left: 0 !important;
		}
	`;
}

export default styles;
