const { defineConfig } = require( 'cypress' );

module.exports = defineConfig( {
	component: {
		devServer: {
			framework: undefined, // Source: https://github.com/cypress-io/cypress/blob/af415e044d39cedfb008541a609b02d8811931d3/npm/webpack-dev-server/src/devServer.ts#L132
			bundler: 'webpack',
		},
	},
	includeShadowDom: false,
	screenshotOnRunFailure: false,
	video: false,
} );
