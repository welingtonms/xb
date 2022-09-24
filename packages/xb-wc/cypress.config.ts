import { defineConfig } from 'cypress';
import { devServer } from '@cypress/webpack-dev-server';

export default defineConfig( {
	component: {
		devServer( devServerConfig ) {
			return devServer( {
				...devServerConfig,
				webpackConfig: require( './webpack.config' ),
			} );
		},
	},
	includeShadowDom: true,
	screenshotOnRunFailure: false,
	video: false,
} );
